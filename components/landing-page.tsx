'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AuthModal } from '@/components/auth-modal'
import { Rocket, Brain, Target, Users, Trophy, BookOpen, Code, Zap, Star, ArrowRight, Github, Globe, Database } from 'lucide-react'

export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Interactive Roadmaps",
      description: "Visual learning paths for Frontend, Backend, DevOps, AI/ML, and more",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Daily Quests",
      description: "Gamified learning with streaks, XP, and achievement badges",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Learning",
      description: "Join study groups, share resources, and learn together",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Curated Resources",
      description: "Hand-picked tutorials, articles, and projects for each topic",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Progress Tracking",
      description: "Detailed analytics and progress visualization",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Smart Recommendations",
      description: "AI-powered suggestions based on your learning style",
      color: "from-indigo-500 to-purple-500"
    }
  ]

  const roadmaps = [
    { name: "Frontend", icon: <Globe className="h-5 w-5" />, count: "12 topics" },
    { name: "Backend", icon: <Database className="h-5 w-5" />, count: "15 topics" },
    { name: "DevOps", icon: <Zap className="h-5 w-5" />, count: "10 topics" },
    { name: "AI/ML", icon: <Brain className="h-5 w-5" />, count: "8 topics" },
  ]

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
              <Rocket className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            DevQuest
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The Ultimate Developer Roadmap & Resource Explorer. Navigate your coding journey with 
            interactive roadmaps, daily quests, and a thriving community of developers.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
              onClick={() => setShowAuthModal(true)}
            >
              Start Your Quest <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3"
            >
              View Demo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            { label: "Active Learners", value: "10K+" },
            { label: "Learning Paths", value: "50+" },
            { label: "Resources", value: "1000+" },
            { label: "Success Rate", value: "95%" }
          ].map((stat, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">DevQuest?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Roadmaps */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Popular <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Roadmaps</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmaps.map((roadmap, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {roadmap.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{roadmap.name}</h3>
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {roadmap.count}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-white/20 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Level Up Your Skills?</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Join thousands of developers who are already on their quest to mastery.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-12 py-4 text-lg"
                onClick={() => setShowAuthModal(true)}
              >
                Begin Your Journey <Rocket className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </div>
  )
}
