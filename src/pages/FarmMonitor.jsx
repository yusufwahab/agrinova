import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, Upload, AlertTriangle, CheckCircle, 
  Eye, Search, Filter, Calendar, MapPin,
  Bug, Leaf, Shield, Zap, Clock, Star, Volume2
} from 'lucide-react';
import Modal from '../components/Modal';

const FarmMonitor = () => {
  const [activeTab, setActiveTab] = useState('scan');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const openModal = (modalType, data = null) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

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
      image: '/src/assets/Pest1.jpg',
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
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = () => {
    setAnalyzing(true);
    setAnalysisResult(null);
    
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

  const handleNewScan = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanModalOpen(true);
        simulateScanProgress();
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Please allow camera access to use this feature.');
    }
  };

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

  const handleStartScan = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL('image/jpeg');
      setUploadedImage(imageData);
      setScanModalOpen(false);
      if (videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    }
    handleAnalysis();
  };

  const getModalTitle = (modalType) => {
    const titles = {
      newScan: 'AI Crop Scanner',
      categoryDetails: 'Detection Category Details',
      alertDetails: 'Alert Details & Recommendations',
      setupCameras: 'Live Monitoring Setup'
    };
    return titles[modalType] || 'Information';
  };

  const renderModalContent = (modalType) => {
    switch (modalType) {
      case 'newScan':
        return (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">Use AI-powered analysis to detect pests, diseases, and crop health issues instantly.</p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { closeModal(); handleNewScan(); }}
                className="p-6 border-2 border-emerald-300 rounded-lg hover:bg-emerald-50 transition-colors text-center"
              >
                <Camera className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">Camera Scan</div>
                <div className="text-sm text-gray-500">Use device camera</div>
              </button>
              <button 
                onClick={() => { closeModal(); fileInputRef.current?.click(); }}
                className="p-6 border-2 border-blue-300 rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="font-medium text-gray-900">Upload Photo</div>
                <div className="text-sm text-gray-500">Select from gallery</div>
              </button>
            </div>
          </div>
        );
      
      case 'categoryDetails':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">{modalData?.count || 0}</div>
              <p className="text-gray-600">Active {modalData?.name?.toLowerCase()} alerts requiring attention</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Feature coming soon!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-2">Farm Monitor</h1>
              <p className="text-gray-600">AI-powered real-time monitoring and threat detection</p>
            </div>
            <button 
              onClick={() => openModal('newScan')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center mt-6 lg:mt-0">
              <Camera className="w-5 h-5 mr-3" />
              New Scan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {detectionCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => openModal('categoryDetails', category)}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-emerald-100 rounded-xl">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-3xl font-bold text-gray-900">{category.count}</span>
                </div>
                <div className="text-base font-semibold text-gray-900 mb-1">{category.name}</div>
                <div className="text-sm text-gray-500">Active alerts</div>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex flex-col sm:flex-row sm:space-x-8 px-4 sm:px-8 py-2">
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
                    className={`flex items-center py-3 sm:py-4 px-2 border-b-3 font-semibold text-sm sm:text-base transition-all duration-200 w-full sm:w-auto justify-center sm:justify-start ${
                      activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    <span className="hidden sm:inline">{tab.name}</span>
                    <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'scan' && (
              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Upload Image for Analysis</h3>
                      <p className="text-gray-600 mb-4 lg:mb-6">Upload a clear photo of your crops for AI-powered analysis</p>
                    </div>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300"
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

                  <div className="space-y-4 lg:space-y-6">
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">Analysis Results</h3>
                      <p className="text-gray-600 mb-4 lg:mb-6">AI-powered detection and recommendations</p>
                    </div>
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
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                            <h4 className="text-lg sm:text-xl font-semibold text-gray-900">{analysisResult.detected}</h4>
                            <div className="flex items-center space-x-2 flex-wrap">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(analysisResult.severity)}`}>
                                {analysisResult.severity.toUpperCase()}
                              </span>
                              <span className="text-sm text-gray-500">{analysisResult.confidence}% confidence</span>
                              <button 
                                onClick={() => {
                                  if (isReading) {
                                    window.speechSynthesis.cancel();
                                    setIsReading(false);
                                  } else {
                                    const text = `${analysisResult.detected}. ${analysisResult.description} ${analysisResult.treatmentUrgency}. Recommendations: ${analysisResult.recommendations.join('. ')}`;
                                    if ('speechSynthesis' in window) {
                                      const utterance = new SpeechSynthesisUtterance(text);
                                      utterance.onend = () => setIsReading(false);
                                      window.speechSynthesis.speak(utterance);
                                      setIsReading(true);
                                    }
                                  }
                                }}
                                className={`p-2 rounded-lg transition-colors ${
                                  isReading 
                                    ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                }`}
                                title={isReading ? 'Stop reading' : 'Read analysis aloud'}
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
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

                          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 sm:px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center flex-1">
                              Send Alert
                            </button>
                            <button className="bg-white hover:bg-gray-50 text-emerald-600 font-semibold py-3 px-4 sm:px-6 rounded-lg border-2 border-emerald-600 transition-all duration-200 flex items-center justify-center flex-1">
                              Save to Records
                            </button>
                            <button 
                              onClick={() => {
                                if (isReading) {
                                  window.speechSynthesis.cancel();
                                  setIsReading(false);
                                } else {
                                  const text = `${analysisResult.detected}. ${analysisResult.description} ${analysisResult.treatmentUrgency}. Recommendations: ${analysisResult.recommendations.join('. ')}`;
                                  if ('speechSynthesis' in window) {
                                    const utterance = new SpeechSynthesisUtterance(text);
                                    utterance.onend = () => setIsReading(false);
                                    window.speechSynthesis.speak(utterance);
                                    setIsReading(true);
                                  }
                                }
                              }}
                              className={`font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center ${
                                isReading 
                                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                              }`}
                              title={isReading ? 'Stop reading' : 'Read analysis aloud'}
                            >
                              <Volume2 className="w-4 h-4" />
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

            {activeTab === 'live' && (
              <div className="space-y-6">
                <div className="text-center py-12">
                  <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Monitoring Setup</h3>
                  <p className="text-gray-600 mb-6">Connect cameras and IoT devices for real-time farm monitoring</p>
                  <button 
                    onClick={() => openModal('setupCameras')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Setup Cameras
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Alert History</h3>
                  <p className="text-gray-600 mb-6">Review past detections and their resolutions</p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search alerts..."
                          className="pl-12 pr-4 py-3 w-full sm:w-80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <button className="flex items-center px-6 py-3 border border-gray-300 rounded-xl hover:bg-white transition-colors">
                        <Filter className="w-5 h-5 mr-2" />
                        Filter
                      </button>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Calendar className="w-5 h-5" />
                      <span className="font-medium">Last 30 days</span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6">
                  {alertHistory.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 hover:shadow-lg hover:border-emerald-300 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                        <img
                          src={alert.image}
                          alt={alert.name}
                          className="w-full h-32 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-2 sm:space-y-0">
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900">{alert.name}</h4>
                            <div className="flex items-center space-x-2 flex-wrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                                {alert.severity}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                                {alert.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="truncate">{alert.location}</span>
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

                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-3 sm:space-y-0">
                            <button 
                              onClick={() => openModal('alertDetails', alert)}
                              className="text-emerald-600 hover:text-emerald-700 text-sm font-medium text-left"
                            >
                              View Details
                            </button>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                              {alert.status === 'active' && (
                                <button className="px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm hover:bg-emerald-200 transition-colors">
                                  Mark Resolved
                                </button>
                              )}
                              <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
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

      {activeModal && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title={getModalTitle(activeModal)}
          size={activeModal === 'newScan' ? 'lg' : 'md'}
        >
          {renderModalContent(activeModal)}
        </Modal>
      )}
    </div>
  );
};

export default FarmMonitor;