'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { Target, Trophy, Flame, Star, CheckCircle, Clock, Gift, Zap, BookOpen, Code, Users } from 'lucide-react'

interface QuestSystemProps {
  userStats: any
  setUserStats: (stats: any) => void
}

const dailyQuests = [
  {
    id: 1,
    title: 'Complete a React Tutorial',
    description: 'Watch and complete a React tutorial from your roadmap',
    xp: 50,
    type: 'learning',
    difficulty: 'easy',
    timeEstimate: '30 min',
    completed: false,
    icon: <BookOpen className="h-5 w-5" />
  },
  {
    id: 2,
    title: 'Code Challenge',
    description: 'Solve a JavaScript algorithm problem',
    xp: 75,
    type: 'coding',
    difficulty: 'medium',
    timeEstimate: '45 min',
    completed: true,
    icon: <Code className="h-5 w-5" />
  },
  {
    id: 3,
    title: 'Community Interaction',
    description: 'Help answer a question in the community forum',
    xp: 25,
    type: 'social',
    difficulty: 'easy',
    timeEstimate: '15 min',
    completed: false,
    icon: <Users className="h-5 w-5" />
  }
]

const achievements = [
  {
    id: 1,
    title: 'First Steps',
    description: 'Complete your first quest',
    icon: <Target className="h-6 w-6" />,
    unlocked: true,
    rarity: 'common'
  },
  {
    id: 2,
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: <Flame className="h-6 w-6" />,
    unlocked: true,
    rarity: 'rare'
  },
  {
    id: 3,
    title: 'Code Master',
    description: 'Complete 50 coding challenges',
    icon: <Code className="h-6 w-6" />,
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 4,
    title: 'Community Hero',
    description: 'Help 100 fellow developers',
    icon: <Users className="h-6 w-6" />,
    unlocked: false,
    rarity: 'legendary'
  }
]

const rarityColors = {
  common: 'from-gray-500 to-gray-600',
  rare: 'from-blue-500 to-blue-600',
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-yellow-500 to-orange-500'
}

export function QuestSystem({ userStats, setUserStats }: QuestSystemProps) {
  const [quests, setQuests] = useState(dailyQuests)
  const { toast } = useToast()

  const completeQuest = (questId: number) => {
    const quest = quests.find(q => q.id === questId)
    if (!quest || quest.completed) return

    setQuests(prev => prev.map(q => 
      q.id === questId ? { ...q, completed: true } : q
    ))

    setUserStats((prev: any) => ({
      ...prev,
      xp: prev.xp + quest.xp,
      completedQuests: prev.completedQuests + 1
    }))

    toast({
      title: "Quest Completed! 🎉",
      description: `You earned ${quest.xp} XP for completing "${quest.title}"`,
    })
  }

  const completedQuests = quests.filter(q => q.completed).length
  const totalQuests = quests.length
  const dailyProgress = (completedQuests / totalQuests) * 100

  return (
    <div className="space-y-6">
      {/* Daily Progress */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2 text-purple-400" />
                Daily Quest Progress
              </CardTitle>
              <CardDescription>Complete all quests to maintain your streak!</CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400">{completedQuests}/{totalQuests}</div>
              <div className="text-sm text-gray-400">Quests Complete</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Daily Progress</span>
              <span>{Math.round(dailyProgress)}%</span>
            </div>
            <Progress value={dailyProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Daily Quests */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-400" />
          Today's Quests
        </h3>
        
        {quests.map((quest) => (
          <Card key={quest.id} className={`bg-white/10 backdrop-blur-sm border-white/20 ${quest.completed ? 'opacity-75' : 'hover:bg-white/15'} transition-all duration-300`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${quest.completed ? 'bg-green-500/20' : 'bg-purple-500/20'}`}>
                    {quest.completed ? <CheckCircle className="h-5 w-5 text-green-400" /> : quest.icon}
                  </div>
                  <div>
                    <h4 className={`font-semibold ${quest.completed ? 'line-through text-gray-400' : ''}`}>
                      {quest.title}
                    </h4>
                    <p className="text-sm text-gray-400">{quest.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        +{quest.xp} XP
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${
                        quest.difficulty === 'easy' ? 'border-green-500 text-green-400' :
                        quest.difficulty === 'medium' ? 'border-yellow-500 text-yellow-400' :
                        'border-red-500 text-red-400'
                      }`}>
                        {quest.difficulty}
                      </Badge>
                      <div className="flex items-center text-xs text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {quest.timeEstimate}
                      </div>
                    </div>
                  </div>
                </div>
                {!quest.completed && (
                  <Button 
                    onClick={() => completeQuest(quest.id)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    Complete
                  </Button>
                )}
                {quest.completed && (
                  <Badge className="bg-green-500/20 text-green-400">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Done
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
          Achievements
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className={`bg-white/10 backdrop-blur-sm border-white/20 ${achievement.unlocked ? '' : 'opacity-50'}`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold flex items-center">
                      {achievement.title}
                      {achievement.unlocked && <CheckCircle className="h-4 w-4 ml-2 text-green-400" />}
                    </h4>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs mt-1 border-current bg-gradient-to-r ${rarityColors[achievement.rarity as keyof typeof rarityColors]} text-white`}
                    >
                      {achievement.rarity}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Streak Bonus */}
      <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border-white/20">
        <CardContent className="p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Flame className="h-8 w-8 text-orange-400" />
          </div>
          <h3 className="text-xl font-bold mb-2">🔥 {userStats.streak} Day Streak!</h3>
          <p className="text-gray-300 mb-4">
            Keep it up! Complete today's quests to extend your streak.
          </p>
          <Badge className="bg-orange-500/20 text-orange-300">
            Next milestone: 10 days
          </Badge>
        </CardContent>
      </Card>
    </div>
  )
}
