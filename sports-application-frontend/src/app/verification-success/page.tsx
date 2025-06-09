"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import confetti from 'canvas-confetti'

export default function VerificationSuccessPage() {
    const router = useRouter()

    useEffect(() => {
        // Trigger confetti animation
        const duration = 3 * 1000
        const animationEnd = Date.now() + duration

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min
        }

        const interval: any = setInterval(() => {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
                return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)

            confetti({
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                zIndex: 0,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
            confetti({
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                zIndex: 0,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        }, 250)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="text-center space-y-16 px-4">
                <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-green-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-200 rounded-full blur-2xl opacity-20 animate-ping"></div>
                        <CheckCircle2 className="h-40 w-40 text-green-500 relative animate-bounce" />
                    </div>
                </div>

                <div className="space-y-6 max-w-2xl mx-auto">
                    <h1 className="text-5xl font-bold tracking-tight text-gray-900 font-polysans animate-fade-in">
                        Email Verified Successfully!
                    </h1>
                    <p className="text-xl text-gray-600 font-mosvita animate-fade-in-delay leading-relaxed">
                        Your email has been verified. You can now access all features of your account.
                    </p>
                </div>

                <Button
                    onClick={() => router.push("/login")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-[1.02] font-polysans text-lg shadow-lg hover:shadow-xl hover:shadow-indigo-200"
                >
                    Continue to Login
                </Button>
            </div>
        </div>
    )
} 