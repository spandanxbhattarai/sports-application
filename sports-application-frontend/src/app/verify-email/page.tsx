"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mail, RefreshCw, Loader2 } from "lucide-react"
import Image from "next/image"

export default function VerifyEmailPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [resendSuccess, setResendSuccess] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        // Initialize refs array
        inputRefs.current = inputRefs.current.slice(0, 6)
    }, [])

    const handleCodeChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(0, 1)
        }

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            // Move to previous input on backspace if current input is empty
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").slice(0, 6).split("")
        const newCode = [...code]

        pastedData.forEach((char, index) => {
            if (index < 6) {
                newCode[index] = char
            }
        })

        setCode(newCode)

        // Focus the next empty input or the last input
        const nextEmptyIndex = newCode.findIndex(char => !char)
        if (nextEmptyIndex !== -1) {
            inputRefs.current[nextEmptyIndex]?.focus()
        } else {
            inputRefs.current[5]?.focus()
        }
    }

    const handleResendCode = async () => {
        if (!email) return
        setResendLoading(true)
        setResendSuccess(false)
        setError("")

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/resend-verification`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || "Failed to resend verification code")
            }

            setResendSuccess(true)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setResendLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        const verificationCode = code.join("")
        if (verificationCode.length !== 6) {
            setError("Please enter the complete verification code")
            setLoading(false)
            return
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    confirmationCode: verificationCode,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || "Verification failed")
            }

            router.push("/verification-success")
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    if (!email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
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
                    <h2 className="text-2xl font-bold text-gray-900 font-polysans">Invalid verification link</h2>
                    <p className="mt-2 text-gray-600 font-mosvita">Please use the link from your email to verify your account.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 z-10" />
                <Image
                    src="/otp-verification.png"
                    alt="Email Verification"
                    fill
                    className="object-contain"
                    priority
                />
            </div>

            {/* Right side - Verification form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 py-8">
                    <div>
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
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 font-polysans">
                            Verify your email
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600 font-mosvita">
                            We sent a verification code to {email}
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative mb-6 font-mosvita" role="alert">
                                {error}
                            </div>
                        )}
                        {resendSuccess && (
                            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded relative mb-6 font-mosvita" role="alert">
                                Verification code has been resent. Please check your email.
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 font-polysans mb-2 text-center">Verification Code</label>
                                <div className="flex justify-center space-x-2">
                                    {code.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => {
                                                inputRefs.current[index] = el;
                                            }}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleCodeChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={handlePaste}
                                            className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-md focus:border-indigo-500 focus:outline-none text-black font-mosvita uppercase"
                                            autoComplete="off"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 space-y-4">
                            <Button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md transition-colors font-polysans"
                                disabled={loading || code.some(digit => !digit)}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span>Verifying...</span>
                                    </div>
                                ) : (
                                    "Verify Email"
                                )}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleResendCode}
                                disabled={resendLoading}
                                className="w-full flex items-center justify-center space-x-2 hover:text-black border-gray-300 hover:bg-gray-50 font-mosvita"
                            >
                                <RefreshCw className={`h-4 w-4 ${resendLoading ? 'animate-spin' : ''}`} />
                                <span>{resendLoading ? "Resending..." : "Resend Code"}</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
} 