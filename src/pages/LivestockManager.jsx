import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Plus, Search, Filter, Grid, List,
  Calendar, Syringe, Scale, Baby, Bell,
  Camera, QrCode, TrendingUp, AlertTriangle,
  Eye, Edit, MoreVertical, Milk, Egg
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LivestockManager = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const livestockSummary = {
    totalAnimals: 47,
    healthAlerts: 3,
    upcomingVaccinations: 8,
    breedingSchedule: 5
  };

  const animals = [
    {
      id: 1,
      name: 'Bessie',
      species: 'Cattle',
      breed: 'Holstein',
      age: '3 years',
      weight: '1,200 lbs',
      healthStatus: 'healthy',
      lastCheckup: '2024-01-10',
      nextVaccination: '2024-02-15',
      image: '/api/placeholder/200/200',
      earTag: 'C001',
      production: { type: 'milk', daily: '6.5 gal' }
    },
    {
      id: 2,
      name: 'Charlie',
      species: 'Cattle',
      breed: 'Angus',
      age: '2 years',
      weight: '1,100 lbs',
      healthStatus: 'attention',
      lastCheckup: '2024-01-08',
      nextVaccination: '2024-01-20',
      image: '/api/placeholder/200/200',
      earTag: 'C002',
      production: null
    },
    {
      id: 3,
      name: 'Henrietta',
      species: 'Poultry',
      breed: 'Rhode Island Red',
      age: '1 year',
      weight: '6 lbs',
      healthStatus: 'healthy',
      lastCheckup: '2024-01-12',
      nextVaccination: '2024-03-01',
      image: '/api/placeholder/200/200',
      earTag: 'P001',
      production: { type: 'eggs', daily: '1 egg' }
    },
    {
      id: 4,
      name: 'Wilbur',
      species: 'Swine',
      breed: 'Yorkshire',
      age: '8 months',
      weight: '180 lbs',
      healthStatus: 'healthy',
      lastCheckup: '2024-01-05',
      nextVaccination: '2024-02-05',
      image: '/api/placeholder/200/200',
      earTag: 'S001',
      production: null
    }
  ];

  const healthAlerts = [
    {
      id: 1,
      animalName: 'Charlie',
      type: 'Health Check',
      severity: 'medium',
      description: 'Slight limp observed in left rear leg',
      timestamp: '2 hours ago',
      recommendations: ['Schedule veterinary examination', 'Limit movement', 'Monitor closely']
    },
    {
      id: 2,
      animalName: 'Daisy',
      type: 'Vaccination Due',
      severity: 'low',
      description: 'Annual vaccination due in 3 days',
      timestamp: '1 day ago',
      recommendations: ['Schedule vaccination appointment', 'Prepare vaccination records']
    }
  ];

  const productionData = [
    { month: 'Jul', milk: 180, eggs: 28 },
    { month: 'Aug', milk: 185, eggs: 30 },
    { month: 'Sep', milk: 175, eggs: 29 },
    { month: 'Oct', milk: 190, eggs: 31 },
    { month: 'Nov', milk: 195, eggs: 32 },
    { month: 'Dec', milk: 200, eggs: 30 }
  ];

  const weightData = [
    { week: 'W1', weight: 1180 },
    { week: 'W2', weight: 1185 },
    { week: 'W3', weight: 1190 },
    { week: 'W4', weight: 1195 },
    { week: 'W5', weight: 1200 }
  ];

  const getHealthStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'attention': return 'bg-yellow-100 text-yellow-800';
      case 'sick': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-400 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-400 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-green-400 bg-green-50 text-green-800';
      default: return 'border-blue-400 bg-blue-50 text-blue-800';
    }
  };

  const AnimalCard = ({ animal }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-all"
      onClick={() => setSelectedAnimal(animal)}
    >
      <div className="relative">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(animal.healthStatus)}`}>
            {animal.healthStatus}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {animal.earTag}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{animal.name}</h3>
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600">
          <div>{animal.breed} • {animal.age}</div>
          <div className="flex items-center">
            <Scale className="w-3 h-3 mr-1" />
            {animal.weight}
          </div>
          {animal.production && (
            <div className="flex items-center">
              {animal.production.type === 'milk' ? 
                <Milk className="w-3 h-3 mr-1" /> : 
                <Egg className="w-3 h-3 mr-1" />
              }
              {animal.production.daily}
            </div>
          )}
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Last checkup: {animal.lastCheckup}</span>
            <span>Next vaccination: {animal.nextVaccination}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const AnimalRow = ({ animal }) => (
    <motion.tr
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="hover:bg-gray-50 cursor-pointer"
      onClick={() => setSelectedAnimal(animal)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <img className="h-12 w-12 rounded-full object-cover" src={animal.image} alt={animal.name} />
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{animal.name}</div>
            <div className="text-sm text-gray-500">{animal.earTag}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{animal.species}</div>
        <div className="text-sm text-gray-500">{animal.breed}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{animal.age}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{animal.weight}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(animal.healthStatus)}`}>
          {animal.healthStatus}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{animal.lastCheckup}</td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button className="text-emerald-600 hover:text-emerald-900">View</button>
      </td>
    </motion.tr>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Livestock Manager</h1>
          <p className="text-gray-600 mt-1">Monitor animal health, breeding, and production</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary mt-4 lg:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Animal
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="metric-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Animals</p>
              <p className="text-3xl font-bold text-gray-900">{livestockSummary.totalAnimals}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="metric-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Health Alerts</p>
              <p className="text-3xl font-bold text-gray-900">{livestockSummary.healthAlerts}</p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-yellow-600">Require attention</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="metric-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Vaccinations</p>
              <p className="text-3xl font-bold text-gray-900">{livestockSummary.upcomingVaccinations}</p>
              <div className="flex items-center mt-1">
                <Calendar className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">Next 30 days</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Syringe className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="metric-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Breeding Schedule</p>
              <p className="text-3xl font-bold text-gray-900">{livestockSummary.breedingSchedule}</p>
              <div className="flex items-center mt-1">
                <Baby className="w-4 h-4 text-pink-500 mr-1" />
                <span className="text-sm text-pink-600">Active cycles</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
              <Baby className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Health Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Health Alerts & Reminders</h3>
          <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {healthAlerts.map((alert) => (
            <div key={alert.id} className={`alert-card ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 mr-3 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{alert.animalName} - {alert.type}</h4>
                    <span className="text-xs opacity-75">{alert.timestamp}</span>
                  </div>
                  <p className="text-sm opacity-90 mb-3">{alert.description}</p>
                  <div>
                    <div className="text-sm font-medium mb-2">Recommended Actions:</div>
                    <ul className="space-y-1">
                      {alert.recommendations.map((rec, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <span className="w-1.5 h-1.5 bg-current rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <button className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-sm transition-colors">
                      Mark Complete
                    </button>
                    <button className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-sm transition-colors">
                      Schedule Vet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Animal Registry */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <h3 className="text-lg font-semibold text-gray-900">Animal Registry</h3>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search animals..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {animals.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Animal
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Species/Breed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weight
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Health Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Checkup
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {animals.map((animal) => (
                    <AnimalRow key={animal.id} animal={animal} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Production Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Production Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productionData}>
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
              <Line type="monotone" dataKey="milk" stroke="#10b981" strokeWidth={3} name="Milk (gal)" />
              <Line type="monotone" dataKey="eggs" stroke="#f59e0b" strokeWidth={3} name="Eggs (dozen)" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Tracking - Bessie</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="weight" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Animal Profile Modal */}
      {selectedAnimal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
              onClick={() => setSelectedAnimal(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedAnimal.image}
                    alt={selectedAnimal.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedAnimal.name}</h3>
                    <p className="text-gray-600">{selectedAnimal.breed} • {selectedAnimal.earTag}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100">
                    <QrCode className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedAnimal(null)}
                    className="p-2 text-gray-400 hover:text-gray-500 rounded-lg hover:bg-gray-100"
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Basic Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Species:</span>
                        <span className="font-medium">{selectedAnimal.species}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Breed:</span>
                        <span className="font-medium">{selectedAnimal.breed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium">{selectedAnimal.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight:</span>
                        <span className="font-medium">{selectedAnimal.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Health Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(selectedAnimal.healthStatus)}`}>
                          {selectedAnimal.healthStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Health Records</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Checkup:</span>
                        <span className="font-medium">{selectedAnimal.lastCheckup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Vaccination:</span>
                        <span className="font-medium">{selectedAnimal.nextVaccination}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {selectedAnimal.production && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Production Records</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium capitalize">{selectedAnimal.production.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Daily Average:</span>
                          <span className="font-medium">{selectedAnimal.production.daily}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="btn btn-ghost text-sm py-2">
                        <Camera className="w-4 h-4 mr-1" />
                        Health Check
                      </button>
                      <button className="btn btn-ghost text-sm py-2">
                        <Scale className="w-4 h-4 mr-1" />
                        Record Weight
                      </button>
                      <button className="btn btn-ghost text-sm py-2">
                        <Syringe className="w-4 h-4 mr-1" />
                        Vaccination
                      </button>
                      <button className="btn btn-ghost text-sm py-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LivestockManager;