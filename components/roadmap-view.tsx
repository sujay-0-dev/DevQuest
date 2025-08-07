'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Globe, Database, Zap, Brain, Smartphone, Shield, Play, CheckCircle, Circle, BookOpen, ExternalLink } from 'lucide-react'

const roadmaps = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Master modern web development with React, Vue, and more',
    icon: <Globe className="h-6 w-6" />,
    progress: 65,
    totalTopics: 12,
    completedTopics: 8,
    color: 'from-blue-500 to-cyan-500',
    topics: [
      { name: 'HTML & CSS Fundamentals', completed: true, resources: 5 },
      { name: 'JavaScript ES6+', completed: true, resources: 8 },
      { name: 'React Basics', completed: true, resources: 12 },
      { name: 'State Management', completed: false, resources: 6 },
      { name: 'Testing', completed: false, resources: 4 }
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Build scalable server-side applications and APIs',
    icon: <Database className="h-6 w-6" />,
    progress: 40,
    totalTopics: 15,
    completedTopics: 6,
    color: 'from-green-500 to-emerald-500',
    topics: [
      { name: 'Node.js Fundamentals', completed: true, resources: 7 },
      { name: 'Express.js', completed: true, resources: 9 },
      { name: 'Database Design', completed: false, resources: 6 },
      { name: 'Authentication', completed: false, resources: 8 },
      { name: 'API Security', completed: false, resources: 5 }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    description: 'Learn deployment, CI/CD, and cloud infrastructure',
    icon: <Zap className="h-6 w-6" />,
    progress: 25,
    totalTopics: 10,
    completedTopics: 3,
    color: 'from-orange-500 to-red-500',
    topics: [
      { name: 'Docker Basics', completed: true, resources: 6 },
      { name: 'Kubernetes', completed: false, resources: 8 },
      { name: 'CI/CD Pipelines', completed: false, resources: 7 },
      { name: 'AWS Fundamentals', completed: false, resources: 10 },
      { name: 'Monitoring', completed: false, resources: 5 }
    ]
  },
  {
    id: 'aiml',
    title: 'AI & Machine Learning',
    description: 'Dive into artificial intelligence and data science',
    icon: <Brain className="h-6 w-6" />,
    progress: 15,
    totalTopics: 8,
    completedTopics: 1,
    color: 'from-purple-500 to-pink-500',
    topics: [
      { name: 'Python for AI', completed: true, resources: 8 },
      { name: 'Machine Learning Basics', completed: false, resources: 12 },
      { name: 'Neural Networks', completed: false, resources: 10 },
      { name: 'Deep Learning', completed: false, resources: 15 },
      { name: 'AI Ethics', completed: false, resources: 4 }
    ]
  }
]

export function RoadmapView() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<string | null>(null)

  const selectedRoadmapData = roadmaps.find(r => r.id === selectedRoadmap)

  if (selectedRoadmap && selectedRoadmapData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedRoadmap(null)}
            className="text-purple-400 hover:text-purple-300"
          >
            ← Back to Roadmaps
          </Button>
          <Badge className="bg-purple-500/20 text-purple-300">
            {selectedRoadmapData.completedTopics}/{selectedRoadmapData.totalTopics} completed
          </Badge>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full bg-gradient-to-r ${selectedRoadmapData.color}`}>
                {selectedRoadmapData.icon}
              </div>
              <div>
                <CardTitle className="text-2xl">{selectedRoadmapData.title}</CardTitle>
                <CardDescription>{selectedRoadmapData.description}</CardDescription>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Overall Progress</span>
                <span>{selectedRoadmapData.progress}%</span>
              </div>
              <Progress value={selectedRoadmapData.progress} className="h-3" />
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Learning Path</h3>
          {selectedRoadmapData.topics.map((topic, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {topic.completed ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400" />
                    )}
                    <div>
                      <h4 className="font-semibold text-lg">{topic.name}</h4>
                      <p className="text-sm text-gray-400">{topic.resources} resources available</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Resources
                    </Button>
                    {!topic.completed && (
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                        <Play className="h-4 w-4 mr-2" />
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Learning Roadmaps</h2>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
          Create Custom Roadmap
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roadmaps.map((roadmap) => (
          <Card 
            key={roadmap.id} 
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedRoadmap(roadmap.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${roadmap.color} group-hover:scale-110 transition-transform duration-300`}>
                    {roadmap.icon}
                  </div>
                  <div>
                    <CardTitle>{roadmap.title}</CardTitle>
                    <CardDescription className="text-gray-300">
                      {roadmap.description}
                    </CardDescription>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white font-medium">{roadmap.completedTopics}/{roadmap.totalTopics} topics</span>
                </div>
                <Progress value={roadmap.progress} className="h-2" />
                <div className="flex justify-between items-center">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {roadmap.progress}% complete
                  </Badge>
                  <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300">
                    Continue →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Need a Custom Path?</h3>
          <p className="text-gray-300 mb-4">
            Create your own learning roadmap tailored to your goals and interests.
          </p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
            Build Custom Roadmap
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
