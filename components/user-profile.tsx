'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { PhoneVerification } from '@/components/phone-verification'
import { useToast } from '@/hooks/use-toast'
import { UserIcon, Mail, Phone, CheckCircle, AlertCircle, Edit, Save, X } from 'lucide-react'

interface UserProfileProps {
  user: User
}

interface Profile {
  id: string
  full_name: string | null
  username: string | null
  phone: string | null
  phone_verified: boolean
  avatar_url: string | null
  website: string | null
}

export function UserProfile({ user }: UserProfileProps) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    website: ''
  })
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  useEffect(() => {
    fetchProfile()
  }, [user.id])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setProfile(data)
        setFormData({
          full_name: data.full_name || '',
          username: data.username || '',
          website: data.website || ''
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...formData,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      setProfile(prev => prev ? { ...prev, ...formData } : null)
      setEditing(false)
      toast({
        title: "Success!",
        description: "Profile updated successfully.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const cancelEdit = () => {
    setFormData({
      full_name: profile?.full_name || '',
      username: profile?.username || '',
      website: profile?.website || ''
    })
    setEditing(false)
  }

  if (loading && !profile) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-white/10 rounded-lg"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-white">
              <UserIcon className="h-5 w-5 mr-2" />
              Profile Information
            </CardTitle>
            {!editing ? (
              <Button
                onClick={() => setEditing(true)}
                variant="outline"
                size="sm"
                className="border-slate-600 text-white hover:bg-slate-800"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button
                  onClick={updateProfile}
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-500"
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  onClick={cancelEdit}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-white hover:bg-slate-800"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Full Name</Label>
              {editing ? (
                <Input
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-gray-300 p-2 bg-slate-800/50 rounded">
                  {profile?.full_name || 'Not set'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-white">Username</Label>
              {editing ? (
                <Input
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="Choose a username"
                />
              ) : (
                <p className="text-gray-300 p-2 bg-slate-800/50 rounded">
                  {profile?.username || 'Not set'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-white">Email</Label>
              <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">{user.email}</span>
                {user.email_confirmed_at ? (
                  <Badge className="bg-green-500/20 text-green-300 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge variant="destructive" className="text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Unverified
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Phone</Label>
              <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">
                  {profile?.phone || 'Not set'}
                </span>
                {profile?.phone_verified ? (
                  <Badge className="bg-green-500/20 text-green-300 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : profile?.phone ? (
                  <Badge variant="destructive" className="text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Unverified
                  </Badge>
                ) : null}
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label className="text-white">Website</Label>
              {editing ? (
                <Input
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white"
                  placeholder="https://your-website.com"
                />
              ) : (
                <p className="text-gray-300 p-2 bg-slate-800/50 rounded">
                  {profile?.website || 'Not set'}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phone Verification */}
      {(!profile?.phone_verified) && (
        <PhoneVerification
          userId={user.id}
          currentPhone={profile?.phone || ''}
          onVerificationComplete={fetchProfile}
        />
      )}

      {/* Account Security */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Account Security</CardTitle>
          <CardDescription>Manage your account security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-400">
                {profile?.phone_verified 
                  ? "SMS-based 2FA is available with your verified phone number"
                  : "Verify your phone number to enable SMS-based 2FA"
                }
              </p>
            </div>
            <Badge 
              className={profile?.phone_verified 
                ? "bg-green-500/20 text-green-300" 
                : "bg-yellow-500/20 text-yellow-300"
              }
            >
              {profile?.phone_verified ? "Available" : "Setup Required"}
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div>
              <h4 className="font-medium text-white">Email Verification</h4>
              <p className="text-sm text-gray-400">
                {user.email_confirmed_at 
                  ? "Your email address is verified"
                  : "Please check your email and click the verification link"
                }
              </p>
            </div>
            <Badge 
              className={user.email_confirmed_at 
                ? "bg-green-500/20 text-green-300" 
                : "bg-red-500/20 text-red-300"
              }
            >
              {user.email_confirmed_at ? "Verified" : "Unverified"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
