"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mail, Lock, User, Phone, MapPin, Upload, Camera, Info, AlertCircle, Building2, Users, Loader2 } from "lucide-react"
import Image from "next/image"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type Role = 'user' | 'organizationOwner'

export default function RegisterPage() {
    const router = useRouter()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({ latitude: null, longitude: null })
    const [profileImage, setProfileImage] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>("")
    const [locationStatus, setLocationStatus] = useState<'granted' | 'denied' | 'prompt'>('prompt')
    const [role, setRole] = useState<Role>('user')
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // Check location permission status
        if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                setLocationStatus(result.state as 'granted' | 'denied' | 'prompt')
                if (result.state === 'granted') {
                    getLocation()
                }
            })
        }
    }, [])

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    })
                    setLocationStatus('granted')
                },
                (error) => {
                    console.log("Location access denied:", error)
                    setLocation({ latitude: null, longitude: null })
                    setLocationStatus('denied')
                }
            )
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setProfileImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        if (!location.latitude || !location.longitude) {
            setError("Please enable location access to continue")
            setLoading(false)
            return
        }

        const formData = new FormData()
        const form = e.currentTarget

        // Add basic user information
        formData.append("name", form.names.value)
        formData.append("email", form.email.value)
        formData.append("password", form.password.value)
        formData.append("phoneNumber", form.phoneNumber.value)
        formData.append("role", role)

        // Add profile information
        if (profileImage) {
            formData.append("profilePicture", profileImage)
        }
        formData.append("address", form.address.value)
        formData.append("location[latitude]", location.latitude.toString())
        formData.append("location[longitude]", location.longitude.toString())

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/register`, {
                method: "POST",
                body: formData,
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || "Registration failed")
            }

            router.push(`/verify-email?email=${form.email.value}`)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 z-10" />
                <Image
                    src="/registration.png"
                    alt="Registration"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Right side - Registration form */}
            <div className="w-full lg:w-1/2 flex items-start justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto max-h-screen">
                <div className="max-w-md w-full space-y-8 py-8">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/logo.png"
                            alt="Company Logo"
                            width={120}
                            height={120}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 font-polysans">
                            Create your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 font-mosvita">
                            Join our community today
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative mb-6 font-mosvita" role="alert">
                                {error}
                            </div>
                        )}

                        {/* Role Selection */}
                        <div className="space-y-4">
                            <Label className="text-sm font-medium text-gray-700 font-polysans">Register as</Label>
                            <RadioGroup
                                value={role}
                                onValueChange={(value: Role) => setRole(value)}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div
                                    className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${role === 'user'
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <RadioGroupItem
                                        value="user"
                                        id="user"
                                        className="absolute top-2 right-2 border-gray-400 text-indigo-600"
                                    />
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className={`p-3 rounded-full ${role === 'user' ? 'bg-indigo-100' : 'bg-gray-100'
                                            }`}>
                                            <Users className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-medium text-gray-900 font-polysans">Individual User</h3>
                                            <p className="text-sm text-gray-500 mt-1 font-mosvita">Join as a regular user</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={`relative flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${role === 'organizationOwner'
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-gray-200 hover:border-indigo-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <RadioGroupItem
                                        value="organizationOwner"
                                        id="organization"
                                        className="absolute top-2 right-2 border-gray-400 text-indigo-600"
                                    />
                                    <div className="flex flex-col items-center space-y-2">
                                        <div className={`p-3 rounded-full ${role === 'organizationOwner' ? 'bg-indigo-100' : 'bg-gray-100'
                                            }`}>
                                            <Building2 className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-medium text-gray-900 font-polysans">Organization</h3>
                                            <p className="text-sm text-gray-500 mt-1 font-mosvita">Create your sports platform</p>
                                        </div>
                                    </div>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Profile Image Upload */}
                        <div className="flex flex-col items-center space-y-4">
                            <div
                                className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-dashed border-gray-300 hover:border-indigo-500 transition-colors cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {previewUrl ? (
                                    <Image
                                        src={previewUrl}
                                        alt="Profile preview"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-center space-y-2">
                                        <Camera className="h-8 w-8 text-gray-400" />
                                        <span className="text-xs text-gray-500 font-mosvita">Click to upload photo</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>

                        <div className="space-y-4">
                            {/* Form Fields */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 font-polysans">Full Name</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="names"
                                        name="names"
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 font-mosvita"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 font-polysans">Email address</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 font-mosvita"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 font-polysans">Password</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 font-mosvita"
                                        placeholder="Create a password"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 font-polysans">Phone Number</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="tel"
                                        required
                                        className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 font-mosvita"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 font-polysans">Address</label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        required
                                        className="appearance-none block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 font-mosvita"
                                        placeholder="Enter your address"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Location Status */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Info className="h-5 w-5 text-gray-400" />
                                    <span className="text-sm text-gray-600 font-mosvita">
                                        {locationStatus === 'granted' ? 'Location access granted' :
                                            locationStatus === 'denied' ? 'Location access denied' :
                                                'Location access required'}
                                    </span>
                                </div>
                                {locationStatus !== 'granted' && (
                                    <button
                                        type="button"
                                        onClick={getLocation}
                                        className="text-sm text-indigo-600 hover:text-indigo-500 font-mosvita"
                                    >
                                        {locationStatus === 'denied' ? 'Enable in settings' : 'Allow location'}
                                    </button>
                                )}
                            </div>

                            {locationStatus === 'denied' && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                                    <h4 className="text-sm font-medium text-yellow-800 mb-2 font-polysans">Location Access Required</h4>
                                    <p className="text-sm text-yellow-700 mb-2 font-mosvita">
                                        To provide you with the best experience, we need access to your location.
                                    </p>
                                    <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1 font-mosvita">
                                        <li>Open your browser settings</li>
                                        <li>Find this website in the permissions list</li>
                                        <li>Enable location access</li>
                                        <li>Refresh the page</li>
                                    </ol>
                                </div>
                            )}
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors font-polysans"
                                disabled={loading || locationStatus !== 'granted'}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    "Create account"
                                )}
                            </Button>
                            <p className="mt-4 text-center text-sm text-gray-600 font-mosvita">
                                Already have an account?{" "}
                                <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Login
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} 