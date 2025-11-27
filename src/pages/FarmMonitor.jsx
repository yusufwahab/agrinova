import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, Upload, AlertTriangle, CheckCircle, 
  Eye, Search, Filter, Calendar, MapPin,
  Bug, Leaf, Shield, Zap, Clock, Star
} from 'lucide-react';

const FarmMonitor = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const detectionCategories = [
    { id: 'pests', name: 'Pests', icon: Bug, count: 12 },
    { id: 'diseases', name: 'Diseases', icon: Leaf, count: 8 },
    { id: 'intrusions', name: 'Intrusions', icon: Shield, count: 3 },
    { id: 'equipment', name: 'Equipment', icon: Zap, count: 2 },
    { id: 'livestock', name: 'Livestock', icon: Eye, count: 5 }
  ];

  const alertHistory = [
    {
      id: 1,
      type: 'pest',
      name: 'Aphid Infestation',
      image: '/api/placeholder/100/100',
      severity: 'high',
      confidence: 94,
      location: 'Zone A - Tomato Field',
      timestamp: '2 hours ago',
      status: 'active',
      description: 'Large colony of aphids detected on tomato plants. Immediate action required.',
      recommendations: [
        'Apply neem oil spray immediately',
        'Introduce ladybugs as biological control',
        'Monitor daily for 1 week',
        'Consider systemic insecticide if infestation spreads'
      ]
    },
    {
      id: 2,
      type: 'disease',
      name: 'Early Blight',
      image: '/api/placeholder/100/100',
      severity: 'medium',
      confidence: 87,
      location: 'Zone B - Potato Field',
      timestamp: '5 hours ago',
      status: 'resolved',
      description: 'Early stage blight symptoms detected on potato leaves.',
      recommendations: [
        'Remove affected leaves immediately',
        'Apply copper-based fungicide',
        'Improve air circulation',
        'Reduce overhead watering'
      ]
    },
    {
      id: 3,
      type: 'intrusion',
      name: 'Wildlife Damage',
      image: '/api/placeholder/100/100',
      severity: 'low',
      confidence: 76,
      location: 'Zone C - Corn Field',
      timestamp: '1 day ago',
      status: 'active',
      description: 'Deer tracks and crop damage detected in corn field perimeter.',
      recommendations: [
        'Install motion-activated lights',
        'Set up wildlife deterrent fencing',
        'Use scent-based repellents',
        'Monitor entry points'
      ]
    }
  ];

  const mockAnalysis = {
    detected: 'Colorado Potato Beetle',
    confidence: 92,
    severity: 'high',
    category: 'pest',
    description: 'Adult Colorado potato beetles detected on potato plants. These pests can cause significant defoliation if left untreated.',
    recommendations: [
      'Hand-pick beetles and egg masses immediately',
      'Apply Bacillus thuringiensis (Bt) spray',
      'Use row covers to prevent further infestation',
      'Monitor weekly during growing season',
      'Consider crop rotation next season'
    ],
    treatmentUrgency: 'Immediate action required',
    estimatedDamage: 'Potential 30-50% yield loss if untreated'
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        // Don't trigger analysis yet - wait for Start Scan button click
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = () => {
    setAnalyzing(true);
    setAnalysisResult(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult(mockAnalysis);
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100';
  };

  // Handle camera access for New Scan
  const handleNewScan = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanModalOpen(true);
        // Start scan progress animation
        simulateScanProgress();
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Please allow camera access to use this feature.');
    }
  };

  // Simulate scan progress
  const simulateScanProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setScanProgress(progress);
    }, 300);
  };

  // Capture photo from video and trigger analysis
  const handleStartScan = () => {
    if (canvasRef.current && videoRef.current) {
      // Camera capture from modal
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL('image/jpeg');
      setUploadedImage(imageData);
      setScanModalOpen(false);
      // Stop camera stream
      if (videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
    // Trigger analysis for both file upload and camera capture
    handleAnalysis();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-600">Farm Monitor</h1>
          <p className="text-gray-600 mt-1">Real-time monitoring and threat detection</p>
        </div>
        <button 
          onClick={handleNewScan}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center mt-4 lg:mt-0">
          <Camera className="w-4 h-4 mr-2" />
          New Scan
        </button>
      </div>

      {/* Detection Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {detectionCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-6 h-6 text-emerald-600" />
                <span className="text-2xl font-bold text-gray-900">{category.count}</span>
              </div>
              <div className="text-sm font-medium text-gray-900">{category.name}</div>
              <div className="text-xs text-gray-500">Active alerts</div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'scan', name: 'Manual Scanning', icon: Camera },
              { id: 'live', name: 'Live Monitoring', icon: Eye },
              { id: 'history', name: 'Alert History', icon: Clock }
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
          {activeTab === 'scan' && (
            <div className="space-y-6">
              {/* Upload Section */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Image for Analysis</h3>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                  >
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="max-w-full h-48 object-cover rounded-lg mx-auto"
                        />
                        <p className="text-sm text-gray-600">Click to upload a different image</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-lg font-medium text-gray-900">Upload Photo</p>
                          <p className="text-sm text-gray-500">Drag and drop or click to select</p>
                          <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG up to 10MB</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white hover:bg-gray-50 text-emerald-600 font-semibold py-3 px-6 rounded-lg border-2 border-emerald-600 transition-all duration-200 flex items-center justify-center flex-1"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </button>
                    <button 
                      onClick={handleStartScan}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center flex-1"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Start Scan
                    </button>
                  </div>
                </div>

                {/* Analysis Results */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Analysis Results</h3>
                  {analyzing ? (
                    <div className="bg-gray-50 rounded-xl p-8 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-600">Analyzing image with AI...</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                        <div className="bg-emerald-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                  ) : analysisResult ? (
                    <div className="space-y-4">
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-semibold text-gray-900">{analysisResult.detected}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(analysisResult.severity)}`}>
                              {analysisResult.severity.toUpperCase()}
                            </span>
                            <span className="text-sm text-gray-500">{analysisResult.confidence}% confidence</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{analysisResult.description}</p>
                        
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                          <div className="flex items-center mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                            <span className="font-medium text-red-800">{analysisResult.treatmentUrgency}</span>
                          </div>
                          <p className="text-red-700 text-sm">{analysisResult.estimatedDamage}</p>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-3">Recommended Actions:</h5>
                          <ul className="space-y-2">
                            {analysisResult.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex space-x-3 mt-6">
                          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center flex-1">
                            Send Alert
                          </button>
                          <button className="bg-white hover:bg-gray-50 text-emerald-600 font-semibold py-3 px-6 rounded-lg border-2 border-emerald-600 transition-all duration-200 flex items-center justify-center flex-1">
                            Save to Records
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-8 text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Upload an image to start analysis</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Scan Modal */}
          {scanModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
                  onClick={() => setScanModalOpen(false)}
                />
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Live Camera Scan</h3>
                    <button
                      onClick={() => setScanModalOpen(false)}
                      className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Camera View */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="bg-black rounded-xl overflow-hidden relative"
                    >
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-96 object-cover"
                      />
                      <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </motion.div>

                    {/* Scan Analysis Ongoing Animation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200"
                    >
                      <div className="flex items-center justify-center mb-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"
                        />
                      </div>
                      <motion.h4
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg font-semibold text-gray-900 text-center mb-2"
                      >
                        Scan Analysis Ongoing
                      </motion.h4>
                      <p className="text-gray-600 text-center text-sm mb-4">
                        Analyzing image with AI-powered detection...
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${scanProgress}%` }}
                          className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2"
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        {Math.round(scanProgress)}% Complete
                      </p>

                      {/* Scan Details */}
                      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Detection Models</p>
                          <p className="font-semibold text-gray-900">5</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Processing</p>
                          <p className="font-semibold text-gray-900">AI Engine</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Accuracy</p>
                          <p className="font-semibold text-gray-900">94%</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={handleStartScan}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Capture & Analyze
                      </button>
                      <button
                        onClick={() => setScanModalOpen(false)}
                        className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg border-2 border-gray-300 transition-all duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === 'live' && (
            <div className="space-y-6">
              <div className="text-center py-12">
                <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Monitoring Setup</h3>
                <p className="text-gray-600 mb-6">Connect cameras and IoT devices for real-time farm monitoring</p>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
                  <Camera className="w-4 h-4 mr-2" />
                  Setup Cameras
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search alerts..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Last 30 days</span>
                </div>
              </div>

              {/* Alert History List */}
              <div className="space-y-4">
                {alertHistory.map((alert) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={alert.image}
                        alt={alert.name}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{alert.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                              {alert.status}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {alert.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {alert.timestamp}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            {alert.confidence}% confidence
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{alert.description}</p>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900 mb-2">Recommendations:</h5>
                          <ul className="space-y-1">
                            {alert.recommendations.slice(0, 2).map((rec, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                {rec}
                              </li>
                            ))}
                            {alert.recommendations.length > 2 && (
                              <li className="text-sm text-emerald-600 font-medium">
                                +{alert.recommendations.length - 2} more recommendations
                              </li>
                            )}
                          </ul>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                            View Details
                          </button>
                          <div className="flex space-x-2">
                            {alert.status === 'active' && (
                              <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm hover:bg-emerald-200 transition-colors">
                                Mark Resolved
                              </button>
                            )}
                            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                              Export Report
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmMonitor;