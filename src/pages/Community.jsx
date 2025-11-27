import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageCircle, Users, MapPin, Calendar, 
  ThumbsUp, Share, Bookmark, Search, Filter,
  Plus, Camera, Mic, Send, AlertTriangle,
  Award, TrendingUp, Eye, Clock, Star
} from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('forum');
  const [newPost, setNewPost] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);

  const forumPosts = [
    {
      id: 1,
      author: 'Maria Santos',
      avatar: '/api/placeholder/40/40',
      location: 'California',
      timestamp: '2 hours ago',
      title: 'Organic pest control methods that actually work',
      content: 'After years of trial and error, I\'ve found these natural methods to be most effective against common garden pests. Neem oil has been a game-changer for aphids...',
      image: '/api/placeholder/400/200',
      likes: 24,
      comments: 8,
      shares: 3,
      tags: ['organic', 'pest-control', 'sustainable'],
      category: 'Tips & Advice'
    },
    {
      id: 2,
      author: 'James Wilson',
      avatar: '/api/placeholder/40/40',
      location: 'Wisconsin',
      timestamp: '4 hours ago',
      title: 'Soil moisture sensors - worth the investment?',
      content: 'Thinking about upgrading my irrigation system with smart sensors. Has anyone tried the new wireless soil moisture monitors? Looking for honest reviews...',
      likes: 15,
      comments: 12,
      shares: 2,
      tags: ['technology', 'irrigation', 'sensors'],
      category: 'Equipment'
    },
    {
      id: 3,
      author: 'Priya Patel',
      avatar: '/api/placeholder/40/40',
      location: 'Gujarat, India',
      timestamp: '6 hours ago',
      title: 'Record tomato harvest this season! 🍅',
      content: 'Just finished harvesting 3,200 lbs of tomatoes from my 2-acre plot. The key was consistent watering and companion planting with basil. Happy to share my techniques!',
      image: '/api/placeholder/400/200',
      likes: 45,
      comments: 18,
      shares: 12,
      tags: ['success-story', 'tomatoes', 'harvest'],
      category: 'Success Stories'
    }
  ];

  const localAlerts = [
    {
      id: 1,
      type: 'pest',
      title: 'Aphid Outbreak Reported',
      location: 'Sacramento County, CA',
      severity: 'medium',
      description: 'Multiple farmers reporting increased aphid activity on tomato crops',
      reportedBy: '12 farmers',
      timestamp: '3 hours ago',
      affectedCrops: ['Tomatoes', 'Peppers'],
      coordinates: { lat: 38.5816, lng: -121.4944 }
    },
    {
      id: 2,
      type: 'weather',
      title: 'Frost Warning',
      location: 'Central Valley, CA',
      severity: 'high',
      description: 'Temperatures expected to drop below 32°F tonight',
      reportedBy: 'Weather Service',
      timestamp: '1 hour ago',
      affectedCrops: ['All tender crops'],
      coordinates: { lat: 36.7783, lng: -119.4179 }
    },
    {
      id: 3,
      type: 'success',
      title: 'Excellent Corn Yields',
      location: 'Fresno County, CA',
      severity: 'low',
      description: 'Farmers reporting 20% above average corn yields this season',
      reportedBy: '8 farmers',
      timestamp: '2 days ago',
      affectedCrops: ['Corn'],
      coordinates: { lat: 36.7378, lng: -119.7871 }
    }
  ];

  const knowledgeBase = [
    {
      id: 1,
      title: 'Complete Guide to Crop Rotation',
      category: 'Soil Management',
      readTime: '8 min read',
      difficulty: 'Beginner',
      rating: 4.8,
      views: 2340,
      author: 'Dr. Sarah Johnson',
      summary: 'Learn the fundamentals of crop rotation to improve soil health and increase yields.',
      tags: ['soil-health', 'rotation', 'planning']
    },
    {
      id: 2,
      title: 'Integrated Pest Management Strategies',
      category: 'Pest Control',
      readTime: '12 min read',
      difficulty: 'Intermediate',
      rating: 4.9,
      views: 1890,
      author: 'Prof. Michael Chen',
      summary: 'Comprehensive approach to managing pests using biological, cultural, and chemical methods.',
      tags: ['ipm', 'pest-control', 'sustainable']
    },
    {
      id: 3,
      title: 'Water-Efficient Irrigation Techniques',
      category: 'Water Management',
      readTime: '6 min read',
      difficulty: 'Beginner',
      rating: 4.7,
      views: 3120,
      author: 'Lisa Rodriguez',
      summary: 'Maximize water efficiency with drip irrigation, mulching, and smart scheduling.',
      tags: ['irrigation', 'water-conservation', 'efficiency']
    }
  ];

  const successStories = [
    {
      id: 1,
      farmer: 'Roberto Martinez',
      location: 'Texas',
      crop: 'Organic Vegetables',
      achievement: 'Increased yields by 40% using AgroGuard AI',
      beforeImage: '/api/placeholder/200/150',
      afterImage: '/api/placeholder/200/150',
      story: 'By implementing AI-driven pest detection and soil analysis, I was able to optimize my farming practices and achieve record yields while reducing pesticide use by 60%.',
      metrics: {
        yieldIncrease: '40%',
        pesticideReduction: '60%',
        profitIncrease: '35%'
      },
      timeline: '6 months'
    },
    {
      id: 2,
      farmer: 'Anna Kowalski',
      location: 'Poland',
      crop: 'Wheat & Barley',
      achievement: 'Reduced crop losses from 15% to 3%',
      beforeImage: '/api/placeholder/200/150',
      afterImage: '/api/placeholder/200/150',
      story: 'Early disease detection helped me prevent major crop losses. The weather alerts saved my harvest during unexpected frost conditions.',
      metrics: {
        lossReduction: '80%',
        earlyDetection: '95%',
        costSavings: '$12,000'
      },
      timeline: '1 year'
    }
  ];

  const chatbotMessages = [
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m your AI Agronomist. How can I help you today?',
      timestamp: new Date()
    }
  ];

  const [messages, setMessages] = useState(chatbotMessages);
  const [chatInput, setChatInput] = useState('');

  const quickActions = [
    { icon: Camera, text: 'Identify Pest', action: 'pest-id' },
    { icon: MessageCircle, text: 'Crop Advice', action: 'crop-advice' },
    { icon: AlertTriangle, text: 'Weather Tips', action: 'weather-tips' },
    { icon: Users, text: 'Soil Help', action: 'soil-help' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-400 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-400 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-green-400 bg-green-50 text-green-800';
      default: return 'border-blue-400 bg-blue-50 text-blue-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      message: chatInput,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setChatInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        message: 'I understand you\'re asking about ' + chatInput + '. Let me help you with that. Based on your location and current season, here are my recommendations...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community & Knowledge Hub</h1>
          <p className="text-gray-600 mt-1">Connect with farmers, share knowledge, and get AI-powered advice</p>
        </div>
        <button 
          onClick={() => setShowChatbot(!showChatbot)}
          className="btn btn-primary mt-4 lg:mt-0"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          AI Agronomist
        </button>
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'forum', name: 'Community Forum', icon: MessageCircle },
              { id: 'alerts', name: 'Local Alerts', icon: AlertTriangle },
              { id: 'knowledge', name: 'Knowledge Base', icon: Award },
              { id: 'stories', name: 'Success Stories', icon: Star }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'forum' && (
            <div className="space-y-6">
              {/* Create Post */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <img
                    src="/api/placeholder/40/40"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share your farming experience, ask questions, or offer advice..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3">
                        <button className="flex items-center text-gray-500 hover:text-gray-700">
                          <Camera className="w-4 h-4 mr-1" />
                          Photo
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-gray-700">
                          <MapPin className="w-4 h-4 mr-1" />
                          Location
                        </button>
                      </div>
                      <button className="btn btn-primary">
                        <Plus className="w-4 h-4 mr-2" />
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Forum Posts */}
              <div className="space-y-6">
                {forumPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start space-x-3 mb-4">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{post.author}</h4>
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                            {post.category}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 space-x-2">
                          <MapPin className="w-3 h-3" />
                          <span>{post.location}</span>
                          <span>•</span>
                          <span>{post.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.content}</p>

                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post image"
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center text-gray-500 hover:text-emerald-600 transition-colors">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {post.likes}
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-emerald-600 transition-colors">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.comments}
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-emerald-600 transition-colors">
                          <Share className="w-4 h-4 mr-1" />
                          {post.shares}
                        </button>
                      </div>
                      <button className="text-gray-500 hover:text-emerald-600 transition-colors">
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'alerts' && (
            <div className="space-y-6">
              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive map showing local alerts</p>
                  <p className="text-sm text-gray-500">Click on markers to view details</p>
                </div>
              </div>

              {/* Alert List */}
              <div className="space-y-4">
                {localAlerts.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`alert-card ${getSeverityColor(alert.severity)}`}
                  >
                    <div className="flex items-start">
                      <AlertTriangle className="w-5 h-5 mr-3 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{alert.title}</h4>
                          <span className="text-xs opacity-75">{alert.timestamp}</span>
                        </div>
                        <div className="flex items-center text-sm mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {alert.location}
                        </div>
                        <p className="text-sm opacity-90 mb-3">{alert.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm">
                            <span>Reported by: {alert.reportedBy}</span>
                            <span>Affects: {alert.affectedCrops.join(', ')}</span>
                          </div>
                          <button className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-sm transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search knowledge base..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <select className="border border-gray-300 rounded-lg px-3 py-2">
                    <option>All Categories</option>
                    <option>Soil Management</option>
                    <option>Pest Control</option>
                    <option>Water Management</option>
                  </select>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              {/* Knowledge Articles */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {knowledgeBase.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:border-emerald-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                        {article.category}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(article.difficulty)}`}>
                        {article.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{article.summary}</p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {article.readTime}
                      </div>
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {article.views.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium">{article.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">by {article.author}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stories' && (
            <div className="space-y-8">
              {successStories.map((story) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-8"
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src="/api/placeholder/60/60"
                          alt={story.farmer}
                          className="w-15 h-15 rounded-full"
                        />
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{story.farmer}</h3>
                          <p className="text-gray-600">{story.location} • {story.crop}</p>
                        </div>
                      </div>

                      <div className="bg-emerald-100 border border-emerald-200 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-emerald-800 mb-2">Achievement</h4>
                        <p className="text-emerald-700">{story.achievement}</p>
                      </div>

                      <p className="text-gray-700 leading-relaxed mb-6">{story.story}</p>

                      <div className="grid grid-cols-3 gap-4">
                        {Object.entries(story.metrics).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-2xl font-bold text-emerald-600">{value}</div>
                            <div className="text-sm text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-3">Before & After</h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Before</p>
                            <img
                              src={story.beforeImage}
                              alt="Before"
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">After</p>
                            <img
                              src={story.afterImage}
                              alt="After"
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{story.timeline}</div>
                          <div className="text-sm text-gray-600">Timeline to Success</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Chatbot */}
      {showChatbot && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">AI Agronomist</h4>
                <p className="text-xs text-green-600">Online</p>
              </div>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
                >
                  <action.icon className="w-3 h-3 mr-1" />
                  {action.text}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about farming..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Community;