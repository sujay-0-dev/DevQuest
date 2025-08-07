'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import { Github, Mail, Eye, EyeOff, Phone, MessageSquare, Info } from 'lucide-react'

interface AuthModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (error) throw error

      if (data.user && !data.user.email_confirmed_at) {
        toast({
          title: "Success!",
          description: "Check your email to confirm your account.",
        })
      } else {
        toast({
          title: "Success!",
          description: "Account created successfully!",
        })
      }
      
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast({
        title: "Welcome back!",
        description: "You've successfully signed in.",
      })
      onOpenChange(false)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign in. Please check your credentials.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Format phone number to E.164 format
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`

      const { data, error } = await supabase.auth.signUp({
        phone: formattedPhone,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (error) throw error

      setOtpSent(true)
      toast({
        title: "OTP Sent!",
        description: "Check your phone for the verification code.",
      })
    } catch (error: any) {
      console.error('Phone signup error:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please check your phone number.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`

      const { data, error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
      })

      if (error) throw error

      setOtpSent(true)
      toast({
        title: "OTP Sent!",
        description: "Check your phone for the verification code.",
      })
    } catch (error: any) {
      console.error('Phone signin error:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please check your phone number.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`

      const { data, error } = await supabase.auth.verifyOtp({
        phone: formattedPhone,
        token: otp,
        type: 'sms',
      })

      if (error) throw error

      toast({
        title: "Success!",
        description: "Phone number verified successfully!",
      })
      onOpenChange(false)
    } catch (error: any) {
      console.error('OTP verification error:', error)
      toast({
        title: "Error",
        description: error.message || "Invalid OTP. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGithubAuth = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const resetPhoneFlow = () => {
    setOtpSent(false)
    setOtp('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Join DevQuest
          </DialogTitle>
          <DialogDescription className="text-center text-gray-400">
            Start your developer journey today
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="email" className="text-white data-[state=active]:bg-purple-600">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </TabsTrigger>
            <TabsTrigger value="phone" className="text-white data-[state=active]:bg-purple-600">
              <Phone className="h-4 w-4 mr-1" />
              Phone
            </TabsTrigger>
            <TabsTrigger value="signin" className="text-white data-[state=active]:bg-purple-600">
              Sign In
            </TabsTrigger>
          </TabsList>

          {/* Email Sign Up */}
          <TabsContent value="email" className="space-y-4">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-white">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-white">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-600 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>

          {/* Phone Sign Up */}
          <TabsContent value="phone" className="space-y-4">
            <Alert className="bg-blue-500/10 border-blue-500/20">
              <Info className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-200">
                Phone authentication is powered by Supabase. Make sure to include your country code.
              </AlertDescription>
            </Alert>
            
            {!otpSent ? (
              <form onSubmit={handlePhoneSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-name" className="text-white">Full Name</Label>
                  <Input
                    id="phone-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-number" className="text-white">Phone Number</Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="+918145642253"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                  <p className="text-xs text-gray-400">Include country code (e.g., +91 for India, +1 for US)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone-password" className="text-white">Password</Label>
                  <div className="relative">
                    <Input
                      id="phone-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-slate-800 border-slate-600 text-white pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="text-center space-y-2">
                  <MessageSquare className="h-12 w-12 text-green-400 mx-auto" />
                  <h3 className="text-lg font-semibold text-white">Verify Your Phone</h3>
                  <p className="text-sm text-gray-400">
                    We sent a verification code to {phone}
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
                    required
                    className="bg-slate-800 border-slate-600 text-white text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Verifying..." : "Verify Phone"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={resetPhoneFlow}
                  className="w-full text-gray-400 hover:text-white"
                >
                  Change Phone Number
                </Button>
              </form>
            )}
          </TabsContent>

          {/* Sign In */}
          <TabsContent value="signin" className="space-y-4">
            <Tabs defaultValue="email-signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-slate-700">
                <TabsTrigger value="email-signin" className="text-white data-[state=active]:bg-slate-600">
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone-signin" className="text-white data-[state=active]:bg-slate-600">
                  Phone
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email-signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="text-white">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="text-white">Password</Label>
                    <div className="relative">
                      <Input
                        id="signin-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="bg-slate-800 border-slate-600 text-white pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone-signin" className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handlePhoneSignIn} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-phone" className="text-white">Phone Number</Label>
                      <Input
                        id="signin-phone"
                        type="tel"
                        placeholder="+918145642253"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                      <p className="text-xs text-gray-400">Include country code</p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      disabled={loading}
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="text-center space-y-2">
                      <MessageSquare className="h-12 w-12 text-green-400 mx-auto" />
                      <h3 className="text-lg font-semibold text-white">Enter Verification Code</h3>
                      <p className="text-sm text-gray-400">
                        Sent to {phone}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signin-otp" className="text-white">Verification Code</Label>
                      <Input
                        id="signin-otp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required
                        className="bg-slate-800 border-slate-600 text-white text-center text-lg tracking-widest"
                        maxLength={6}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      disabled={loading || otp.length !== 6}
                    >
                      {loading ? "Verifying..." : "Verify & Sign In"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={resetPhoneFlow}
                      className="w-full text-gray-400 hover:text-white"
                    >
                      Change Phone Number
                    </Button>
                  </form>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-gray-400">Or continue with</span>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={handleGithubAuth}
          disabled={loading}
          className="w-full border-slate-600 text-green hover:bg-slate-800"
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </DialogContent>
    </Dialog>
  )
}
