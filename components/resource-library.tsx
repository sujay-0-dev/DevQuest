'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search, BookOpen, Video, FileText, ExternalLink, Star, Heart, Filter, TrendingUp, Clock, User } from 'lucide-react'

const resources = [
  {
    id: 1,
    title: 'React Hooks Complete Guide',
    description: 'Master React Hooks with practical examples and best practices',
    type: 'article',
    category: 'Frontend',
    difficulty: 'intermediate',
    readTime: '15 min',
    rating: 4.8,
    bookmarked: true,
    trending: true,
    author: 'Dan Abramov',
    url: '#'
  },
  {
    id: 2,
    title: 'Node.js Crash Course',
    description: 'Learn Node.js from scratch with this comprehensive video series',
    type: 'video',
    category: 'Backend',
    difficulty: 'beginner',
    readTime: '2 hours',
    rating: 4.9,
    bookmarked: false,
    trending: false,
    author: 'Traversy Media',
    url: '#'
  },
  {
    id: 3,
    title: 'Docker for Developers',
    description: 'Complete guide to containerization with Docker',
    type: 'course',
    category: 'DevOps',
    difficulty: 'intermediate',
    readTime: '4 hours',
    rating: 4.7,
    bookmarked: true,
    trending: true,
    author: 'Docker Inc.',
    url: '#'
  },
  {
    id: 4,
    title: 'Machine Learning Basics',
    description: 'Introduction to ML concepts and algorithms',
    type: 'article',
    category: 'AI/ML',
    difficulty: 'beginner',
    readTime: '20 min',
    rating: 4.6,
    bookmarked: false,
    trending: false,
    author: 'Andrew Ng',
    url: '#'
  },
  {
    id: 5,
    title: 'CSS Grid Layout Masterclass',
    description: 'Master CSS Grid with real-world examples',
    type: 'video',
    category: 'Frontend',
    difficulty: 'intermediate',
    readTime: '1.5 hours',
    rating: 4.8,
    bookmarked: true,
    trending: true,
    author: 'Wes Bos',
    url: '#'
  }
]

const categories = ['All', 'Frontend', 'Backend', 'DevOps', 'AI/ML', 'Mobile']
const types = ['All', 'article', 'video', 'course', 'tutorial']
const difficulties = ['All', 'beginner', 'intermediate', 'advanced']

export function ResourceLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState('All')
  const [bookmarkedResources, setBookmarkedResources] = useState(
    resources.filter(r => r.bookmarked).map(r => r.id)
  )

  const toggleBookmark = (resourceId: number) => {
    setBookmarkedResources(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    )
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
    const matchesType = selectedType === 'All' || resource.type === selectedType
    const matchesDifficulty = selectedDifficulty === 'All' || resource.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesType && matchesDifficulty
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />
      case 'article': return <FileText className="h-4 w-4" />
      case 'course': return <BookOpen className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'border-green-500 text-green-400'
      case 'intermediate': return 'border-yellow-500 text-yellow-400'
      case 'advanced': return 'border-red-500 text-red-400'
      default: return 'border-gray-500 text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Category</label>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-slate-800">{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Type</label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
                >
                  {types.map(type => (
                    <option key={type} value={type} className="bg-slate-800 capitalize">{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Difficulty</label>
                <select 
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff} className="bg-slate-800 capitalize">{diff}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm">
          <TabsTrigger value="all" className="data-[state=active]:bg-purple-600">
            All Resources
          </TabsTrigger>
          <TabsTrigger value="bookmarked" className="data-[state=active]:bg-purple-600">
            Bookmarked
          </TabsTrigger>
          <TabsTrigger value="trending" className="data-[state=active]:bg-purple-600">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(resource.type)}
                        <h3 className="text-lg font-semibold">{resource.title}</h3>
                        {resource.trending && (
                          <Badge className="bg-orange-500/20 text-orange-300 text-xs">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-300 mb-3">{resource.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {resource.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {resource.readTime}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          {resource.rating}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-3">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                          {resource.category}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(resource.id)}
                        className={bookmarkedResources.includes(resource.id) ? 'text-red-400' : 'text-gray-400'}
                      >
                        <Heart className={`h-4 w-4 ${bookmarkedResources.includes(resource.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bookmarked">
          <div className="space-y-4">
            {filteredResources.filter(r => bookmarkedResources.includes(r.id)).map((resource) => (
              <Card key={resource.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(resource.type)}
                        <h3 className="text-lg font-semibold">{resource.title}</h3>
                        <Heart className="h-4 w-4 text-red-400 fill-current" />
                      </div>
                      
                      <p className="text-gray-300 mb-3">{resource.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {resource.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {resource.readTime}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          {resource.rating}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-3">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                          {resource.category}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(resource.id)}
                        className="text-red-400"
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filteredResources.filter(r => bookmarkedResources.includes(r.id)).length === 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-12 text-center">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Bookmarked Resources</h3>
                  <p className="text-gray-400">Start bookmarking resources to build your personal library!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="trending">
          <div className="space-y-4">
            {filteredResources.filter(r => r.trending).map((resource) => (
              <Card key={resource.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(resource.type)}
                        <h3 className="text-lg font-semibold">{resource.title}</h3>
                        <Badge className="bg-orange-500/20 text-orange-300 text-xs">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{resource.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {resource.author}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {resource.readTime}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1 text-yellow-400" />
                          {resource.rating}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-3">
                        <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                          {resource.category}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(resource.id)}
                        className={bookmarkedResources.includes(resource.id) ? 'text-red-400' : 'text-gray-400'}
                      >
                        <Heart className={`h-4 w-4 ${bookmarkedResources.includes(resource.id) ? 'fill-current' : ''}`} />
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Resource CTA */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border-white/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Found a Great Resource?</h3>
          <p className="text-gray-300 mb-4">
            Share it with the community and help fellow developers learn!
          </p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
            Submit Resource
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
