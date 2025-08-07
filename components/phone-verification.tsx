'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Phone, MessageSquare, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react'

interface PhoneVerificationProps {
  userId: string
  currentPhone?: string
  onVerificationComplete?: () => void
}

export function PhoneVerification({ userId, currentPhone, onVerificationComplete }: PhoneVerificationProps) {
  const [phone, setPhone] = useState(currentPhone || '')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [verified, setVerified] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const sendOtp = async () => {
    if (!phone.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`

      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      })

      if (error) throw error

      setOtpSent(true)
      setResendCooldown(60) // 60 second cooldown
      
      // Start countdown
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      toast({
        title: "OTP Sent!",
        description: "Check your phone for the verification code.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+1${phone.replace(/\D/g, '')}`

      const { error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms',
      })

      if (error) throw error

      setVerified(true)
      toast({
        title: "Success!",
        description: "Phone number verified successfully!",
      })

      // Update user profile with verified phone
      await supabase
        .from('profiles')
        .update({ phone: formattedPhone, phone_verified: true })
        .eq('id', userId)

      onVerificationComplete?.()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetFlow = () => {
    setOtpSent(false)
    setOtp('')
    setVerified(false)
  }

  if (verified) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Phone Verified!</h3>
          <p className="text-gray-300 mb-4">Your phone number {phone} has been successfully verified.</p>
          <Badge className="bg-green-500/20 text-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Phone className="h-5 w-5 mr-2" />
          Phone Verification
        </CardTitle>
        <CardDescription>
          {!otpSent 
            ? "Add and verify your phone number for enhanced security" 
            : "Enter the verification code sent to your phone"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!otpSent ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <p className="text-xs text-gray-400">Include country code (e.g., +1 for US)</p>
            </div>
            <Button
              onClick={sendOtp}
              disabled={loading || !phone.trim()}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Verification Code
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <div className="text-center space-y-2">
              <MessageSquare className="h-8 w-8 text-green-400 mx-auto" />
              <p className="text-sm text-gray-300">
                Verification code sent to <span className="font-medium text-white">{phone}</span>
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-white">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="bg-slate-800 border-slate-600 text-white text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={verifyOtp}
                disabled={loading || otp.length !== 6}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
              <Button
                onClick={sendOtp}
                disabled={loading || resendCooldown > 0}
                variant="outline"
                className="border-slate-600 text-white hover:bg-slate-800"
              >
                {resendCooldown > 0 ? `${resendCooldown}s` : "Resend"}
              </Button>
            </div>
            <Button
              onClick={resetFlow}
              variant="ghost"
              className="w-full text-gray-400 hover:text-white"
            >
              Change Phone Number
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
