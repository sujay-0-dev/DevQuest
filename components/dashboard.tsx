'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RoadmapView } from '@/components/roadmap-view'
import { QuestSystem } from '@/components/quest-system'
import { ResourceLibrary } from '@/components/resource-library'
import { UserIcon, LogOut, Trophy, Target, BookOpen, Users, Settings, Flame, Star, Calendar, TrendingUp } from 'lucide-react'

interface DashboardProps {
  user: User
}

export function Dashboard({ user }: DashboardProps) {
  const [userStats, setUserStats] = useState({
    level: 5,
    xp: 1250,
    streak: 7,
    completedQuests: 23,
    totalQuests: 50,
    roadmapsStarted: 3,
    resourcesBookmarked: 15
  })
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  const progressPercentage = (userStats.xp % 500) / 500 * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
              <Target className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DevQuest
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-orange-400" />
              <span className="font-semibold">{userStats.streak} day streak</span>
            </div>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              Level {userStats.level}
            </Badge>
            <Button variant="ghost" onClick={handleSignOut} className="text-gray-300 hover:text-white">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user.user_metadata?.full_name || 'Developer'}! 👋
          </h2>
          <p className="text-gray-300">Ready to continue your quest?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Current Level</p>
                  <p className="text-2xl font-bold text-purple-400">{userStats.level}</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>XP Progress</span>
                  <span>{userStats.xp % 500}/500</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Streak</p>
                  <p className="text-2xl font-bold text-orange-400">{userStats.streak} days</p>
                </div>
                <Flame className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Quests Completed</p>
                  <p className="text-2xl font-bold text-green-400">{userStats.completedQuests}/{userStats.totalQuests}</p>
                </div>
                <Target className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Resources Saved</p>
                  <p className="text-2xl font-bold text-blue-400">{userStats.resourcesBookmarked}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="roadmaps" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur-sm">
            <TabsTrigger value="roadmaps" className="data-[state=active]:bg-purple-600">
              <BookOpen className="h-4 w-4 mr-2" />
              Roadmaps
            </TabsTrigger>
            <TabsTrigger value="quests" className="data-[state=active]:bg-purple-600">
              <Target className="h-4 w-4 mr-2" />
              Daily Quests
            </TabsTrigger>
            <TabsTrigger value="resources" className="data-[state=active]:bg-purple-600">
              <Star className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-purple-600">
              <Users className="h-4 w-4 mr-2" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roadmaps">
            <RoadmapView />
          </TabsContent>

          <TabsContent value="quests">
            <QuestSystem userStats={userStats} setUserStats={setUserStats} />
          </TabsContent>

          <TabsContent value="resources">
            <ResourceLibrary />
          </TabsContent>

          <TabsContent value="community">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Study Groups
                  </CardTitle>
                  <CardDescription>Join or create study groups</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['React Mastery', 'Backend Bootcamp', 'DevOps Journey'].map((group, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="font-medium">{group}</p>
                          <p className="text-sm text-gray-400">{Math.floor(Math.random() * 50) + 10} members</p>
                        </div>
                        <Button size="sm" variant="outline">Join</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Leaderboard
                  </CardTitle>
                  <CardDescription>Top learners this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Alex Chen', xp: 2450, rank: 1 },
                      { name: 'Sarah Kim', xp: 2380, rank: 2 },
                      { name: 'Mike Johnson', xp: 2250, rank: 3 },
                      { name: 'You', xp: userStats.xp, rank: 7 }
                    ].map((user, index) => (
                      <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${user.name === 'You' ? 'bg-purple-500/20' : 'bg-white/5'}`}>
                        <div className="flex items-center space-x-3">
                          <Badge variant={user.rank <= 3 ? 'default' : 'secondary'}>
                            #{user.rank}
                          </Badge>
                          <span className={user.name === 'You' ? 'font-bold text-purple-300' : ''}>{user.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">{user.xp} XP</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
