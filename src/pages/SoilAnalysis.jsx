import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  TestTube, Upload, Camera, MapPin, Calendar,
  TrendingUp, TrendingDown, AlertCircle, CheckCircle,
  Droplets, Zap, Leaf, BarChart3, Target, Clock
} from 'lucide-react';
import { RadialBarChart, RadialBar, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SoilAnalysis = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const fileInputRef = useRef(null);

  const soilHealthScore = 78;
  
  const nutrientLevels = [
    { name: 'Nitrogen (N)', current: 65, optimal: [60, 80], unit: 'ppm', status: 'good' },
    { name: 'Phosphorus (P)', current: 45, optimal: [50, 70], unit: 'ppm', status: 'low' },
    { name: 'Potassium (K)', current: 85, optimal: [70, 90], unit: 'ppm', status: 'good' },
    { name: 'pH Level', current: 6.2, optimal: [6.0, 7.0], unit: '', status: 'good' },
    { name: 'Organic Matter', current: 3.2, optimal: [3.0, 5.0], unit: '%', status: 'good' },
    { name: 'Moisture', current: 25, optimal: [20, 30], unit: '%', status: 'good' }
  ];

  const soilComposition = [
    { name: 'Sand', value: 40, color: '#f59e0b' },
    { name: 'Silt', value: 35, color: '#10b981' },
    { name: 'Clay', value: 25, color: '#3b82f6' }
  ];

  const analysisHistory = [
    {
      id: 1,
      date: '2024-01-15',
      location: 'Zone A - North Field',
      healthScore: 82,
      soilType: 'Loamy Sand',
      mainIssue: 'Low Phosphorus',
      image: '/src/assets/Soil1.jpg'
    },
    {
      id: 2,
      date: '2024-01-10',
      location: 'Zone B - South Field',
      healthScore: 75,
      soilType: 'Clay Loam',
      mainIssue: 'High pH',
      image: '/src/assets/Soil3.jpg'
    },
    {
      id: 3,
      date: '2024-01-05',
      location: 'Zone C - East Field',
      healthScore: 88,
      soilType: 'Sandy Loam',
      mainIssue: 'Optimal',
      image: '/src/assets/Soil1.jpg'
    }
  ];

  const trendData = [
    { month: 'Jul', nitrogen: 58, phosphorus: 42, potassium: 78, ph: 6.1 },
    { month: 'Aug', nitrogen: 61, phosphorus: 44, potassium: 80, ph: 6.0 },
    { month: 'Sep', nitrogen: 63, phosphorus: 43, potassium: 82, ph: 6.1 },
    { month: 'Oct', nitrogen: 65, phosphorus: 45, potassium: 85, ph: 6.2 },
    { month: 'Nov', nitrogen: 64, phosphorus: 46, potassium: 83, ph: 6.2 },
    { month: 'Dec', nitrogen: 65, phosphorus: 45, potassium: 85, ph: 6.2 }
  ];

  const cropRecommendations = {
    tomato: {
      suitability: 85,
      requirements: {
        nitrogen: [60, 80],
        phosphorus: [50, 70],
        potassium: [70, 90],
        ph: [6.0, 6.8]
      },
      recommendations: [
        'Increase phosphorus levels before planting',
        'Maintain consistent moisture levels',
        'Add organic compost to improve soil structure',
        'Monitor for calcium deficiency during fruit development'
      ]
    },
    corn: {
      suitability: 92,
      requirements: {
        nitrogen: [80, 120],
        phosphorus: [40, 60],
        potassium: [80, 120],
        ph: [6.0, 6.8]
      },
      recommendations: [
        'Excellent soil conditions for corn',
        'Side-dress with nitrogen at V6 stage',
        'Ensure adequate drainage',
        'Consider cover crops for soil health'
      ]
    }
  };

  const mockSoilAnalysis = {
    healthScore: 78,
    soilType: 'Sandy Loam',
    confidence: 89,
    characteristics: [
      'Well-draining soil with good aeration',
      'Moderate water retention capacity',
      'Easy to work and cultivate',
      'Good for root crop development'
    ],
    nutrients: {
      nitrogen: 65,
      phosphorus: 45,
      potassium: 85,
      ph: 6.2,
      organicMatter: 3.2,
      moisture: 25
    },
    recommendations: [
      'Add phosphorus-rich fertilizer (10-20-10)',
      'Apply 2-3 inches of organic compost',
      'Consider lime application to raise pH slightly',
      'Implement cover cropping for nitrogen fixation'
    ],
    bestCrops: ['Corn', 'Soybeans', 'Carrots', 'Potatoes'],
    estimatedCost: '$45-65 per acre for recommended treatments'
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        handleAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = () => {
    setAnalyzing(true);
    setAnalysisResult(null);
    
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult(mockSoilAnalysis);
    }, 3000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'low': return 'text-red-600 bg-red-100';
      case 'high': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getNutrientBarColor = (current, optimal) => {
    if (current >= optimal[0] && current <= optimal[1]) return '#10b981';
    if (current < optimal[0]) return '#ef4444';
    return '#f59e0b';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-emerald-600 mb-2">Soil & Crop Health Analysis</h1>
              <p className="text-gray-600 text-lg">AI-powered soil analysis and crop optimization</p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center mt-6 lg:mt-0">
              <TestTube className="w-5 h-5 mr-3" />
              New Analysis
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-2">Soil Health Score</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">{soilHealthScore}</p>
                <div className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600 ml-2 font-medium">+3 from last test</span>
                </div>
              </div>
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeDasharray={`${soilHealthScore}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <TestTube className="w-7 h-7 text-emerald-600" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-2">Nutrient Balance</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">Good</p>
                <div className="flex items-center">
                  <span className="text-sm text-yellow-600 font-medium">1 deficiency detected</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <Zap className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-2">Moisture Level</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">25%</p>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600 ml-2 font-medium">Optimal range</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-semibold text-gray-600 mb-2">pH Level</p>
                <p className="text-4xl font-bold text-gray-900 mb-2">6.2</p>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600 ml-2 font-medium">Slightly acidic</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main Analysis Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto px-4 sm:px-8 py-2">
              {[
                { id: 'upload', name: 'New Analysis', icon: Upload },
                { id: 'nutrients', name: 'Nutrient Levels', icon: Zap },
                { id: 'trends', name: 'Trends', icon: TrendingUp },
                { id: 'history', name: 'History', icon: Clock }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-3 sm:py-4 px-2 sm:px-4 border-b-3 font-medium text-sm sm:text-base transition-all duration-200 whitespace-nowrap ${
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

          <div className="p-4 sm:p-8">
            {activeTab === 'upload' && (
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Upload Section */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Soil Sample</h3>
                    <p className="text-gray-600 mb-6">Take a clear photo of your soil sample for AI analysis</p>
                  </div>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-300"
                  >
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img
                          src={uploadedImage}
                          alt="Uploaded soil sample"
                          className="max-w-full h-48 object-cover rounded-lg mx-auto"
                        />
                        <p className="text-sm text-gray-600">Click to upload a different image</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <TestTube className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-lg font-medium text-gray-900">Upload Soil Photo</p>
                          <p className="text-sm text-gray-500">Take a clear photo of your soil sample</p>
                          <p className="text-xs text-gray-400 mt-2">Best results: 6-inch deep sample, good lighting</p>
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
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center flex-1"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center flex-1">
                      <Camera className="w-4 h-4 mr-2" />
                      Take Photo
                    </button>
                  </div>

                  {/* Location & Crop Selection */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sample Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="text"
                          placeholder="e.g., Zone A - North Field"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Intended Crop
                      </label>
                      <select
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="tomato">Tomato</option>
                        <option value="corn">Corn</option>
                        <option value="wheat">Wheat</option>
                        <option value="soybean">Soybean</option>
                        <option value="potato">Potato</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Analysis Results */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Analysis Results</h3>
                    <p className="text-gray-600 mb-6">AI-powered soil composition and health analysis</p>
                  </div>
                  {analyzing ? (
                    <div className="bg-gray-50 rounded-xl p-8 text-center">
                      <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-600">Analyzing soil composition...</p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                        <div className="bg-emerald-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                  ) : analysisResult ? (
                    <div className="space-y-6">
                      {/* Soil Type & Health Score */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xl font-semibold text-gray-900">{analysisResult.soilType}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-emerald-600">{analysisResult.healthScore}</span>
                            <span className="text-sm text-gray-500">/ 100</span>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-500 mb-4">{analysisResult.confidence}% confidence</div>
                        
                        <div className="space-y-2 mb-4">
                          <h5 className="font-medium text-gray-900">Soil Characteristics:</h5>
                          <ul className="space-y-1">
                            {analysisResult.characteristics.map((char, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-start">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-2 shrink-0"></span>
                                {char}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                          <h5 className="font-medium text-emerald-800 mb-2">Best Crops for This Soil:</h5>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.bestCrops.map((crop, index) => (
                              <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                                {crop}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-900 mb-3">Recommended Treatments:</h5>
                          <ul className="space-y-2">
                            {analysisResult.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" />
                                <span className="text-sm text-gray-600">{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm text-blue-800">
                            <strong>Estimated Cost:</strong> {analysisResult.estimatedCost}
                          </div>
                        </div>

                        <div className="flex space-x-3 mt-6">
                          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-1">
                            Save Analysis
                          </button>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex-1">
                            Generate Report
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-8 text-center">
                      <TestTube className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Upload a soil sample to start analysis</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'nutrients' && (
              <div className="space-y-6">
                {/* Nutrient Levels */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Nutrient Levels</h3>
                    <div className="space-y-6">
                      {nutrientLevels.map((nutrient, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{nutrient.name}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-gray-900">
                                {nutrient.current}{nutrient.unit}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(nutrient.status)}`}>
                                {nutrient.status}
                              </span>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div
                                className="h-3 rounded-full transition-all duration-500"
                                style={{
                                  width: `${Math.min((nutrient.current / Math.max(...nutrient.optimal)) * 100, 100)}%`,
                                  backgroundColor: getNutrientBarColor(nutrient.current, nutrient.optimal)
                                }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>0</span>
                              <span className="text-emerald-600">
                                Optimal: {nutrient.optimal[0]}-{nutrient.optimal[1]}{nutrient.unit}
                              </span>
                              <span>{Math.max(...nutrient.optimal)}{nutrient.unit}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Soil Composition */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Soil Composition</h3>
                    <div className="flex items-center justify-center mb-6">
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={soilComposition}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {soilComposition.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3">
                      {soilComposition.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Soil Classification</h4>
                      <p className="text-sm text-blue-800">
                        Based on composition: <strong>Sandy Loam</strong>
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        Excellent drainage, good for most crops
                      </p>
                    </div>
                  </div>
                </div>

                {/* Crop Suitability */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Suitability Analysis</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Crop</label>
                      <select
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="tomato">Tomato</option>
                        <option value="corn">Corn</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-emerald-600">
                          {cropRecommendations[selectedCrop]?.suitability}%
                        </div>
                        <div className="text-sm text-gray-600">Suitability Score</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 mb-3">Recommendations for {selectedCrop}:</h4>
                    <ul className="space-y-2">
                      {cropRecommendations[selectedCrop]?.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <Target className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" />
                          <span className="text-sm text-gray-600">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trends' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Nutrient Trends (Last 6 Months)</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line type="monotone" dataKey="nitrogen" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="phosphorus" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="potassium" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }} />
                    <Line type="monotone" dataKey="ph" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
                
                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Nitrogen</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Phosphorus</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Potassium</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">pH Level</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Analysis History</h3>
                    <p className="text-gray-600">Review past soil analyses and track improvements</p>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200">
                    Export All Reports
                  </button>
                </div>
                
                <div className="grid gap-6">
                  {analysisHistory.map((analysis, index) => (
                    <motion.div
                      key={analysis.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg hover:border-emerald-300 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={analysis.image}
                          alt="Soil sample"
                          className="w-20 h-20 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-gray-900">{analysis.location}</h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-emerald-600">{analysis.healthScore}</span>
                              <span className="text-sm text-gray-500">/ 100</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {analysis.date}
                            </div>
                            <div className="flex items-center">
                              <TestTube className="w-4 h-4 mr-1" />
                              {analysis.soilType}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-sm text-gray-600">Main Issue: </span>
                              <span className={`text-sm font-medium ${
                                analysis.mainIssue === 'Optimal' ? 'text-green-600' : 'text-yellow-600'
                              }`}>
                                {analysis.mainIssue}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm hover:bg-emerald-200 transition-colors">
                                View Details
                              </button>
                              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                                Download Report
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
    </div>
  );
};

export default SoilAnalysis;