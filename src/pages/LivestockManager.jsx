import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, Plus, Search, Filter, Grid, List,
  Calendar, Syringe, Scale, Baby, Bell,
  Camera, QrCode, TrendingUp, AlertTriangle,
  Eye, Edit, MoreVertical, Milk, Egg
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Modal from '../components/Modal';
import { modalContent } from '../utils/modalContent';

const LivestockManager = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  const openModal = (modalType, data = null) => {
    setActiveModal(modalType);
    setModalData(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

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
      image: '/src/assets/Cattle1.jpg',
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
      image: '/src/assets/Cattle2.jpg',
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
      image: '/src/assets/Cattle3.jpg',
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
      image: '/src/assets/Cattle4.jpg',
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

  const getModalTitle = (modalType) => {
    const titles = {
      addAnimal: 'Add New Animal',
      animalOverview: 'Animal Overview',
      healthAlerts: 'Health Alerts & Notifications',
      vaccination: 'Vaccination Schedule',
      breedingSchedule: 'Breeding Management',
      healthCheck: 'Health Assessment',
      scanQR: 'QR Code Scanner',
      productionReport: 'Production Analytics',
      recordWeight: 'Record Weight',
      schedule: 'Schedule Management'
    };
    return titles[modalType] || 'Information';
  };

  const renderModalContent = (modalType) => {
    switch (modalType) {
      case 'addAnimal':
        return (
          <div className="space-y-6">
            <p className="text-gray-600">Add a new animal to your livestock registry with complete health and production tracking.</p>
            
            {/* Image Upload Section */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Animal Photo</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors">
                  <Camera className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">Take Photo</span>
                </button>
                <button className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-colors">
                  <Plus className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-600">Choose Image</span>
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Upload a clear photo for easy identification</p>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Animal Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="Enter name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ear Tag/ID</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="e.g., C001" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Species</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option>Cattle</option>
                  <option>Poultry</option>
                  <option>Swine</option>
                  <option>Sheep</option>
                  <option>Goats</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="Enter breed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="e.g., 2 years" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="e.g., 1200 lbs" />
              </div>
            </div>

            {/* Health Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">Health Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Health Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                    <option>Healthy</option>
                    <option>Needs Attention</option>
                    <option>Sick</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Checkup</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
              <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg">Cancel</button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">Add Animal</button>
            </div>
          </div>
        );
      
      case 'healthAlerts':
        return (
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">Current health alerts and notifications requiring attention.</p>
            {healthAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(alert.severity)}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{alert.animalName} - {alert.type}</h4>
                  <span className="text-xs opacity-75">{alert.timestamp}</span>
                </div>
                <p className="text-sm mb-3">{alert.description}</p>
                <div className="space-y-1">
                  {alert.recommendations.map((rec, index) => (
                    <div key={index} className="text-sm flex items-start">
                      <span className="w-1.5 h-1.5 bg-current rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {rec}
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700">Schedule Vet</button>
                  <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300">Mark Resolved</button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'animalOverview':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Healthy Animals</h4>
                <div className="text-2xl font-bold text-green-600">42</div>
                <p className="text-sm text-green-700">89% of total livestock</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Need Attention</h4>
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <p className="text-sm text-yellow-700">Monitoring required</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Milk Producers</h4>
                <div className="text-2xl font-bold text-blue-600">18</div>
                <p className="text-sm text-blue-700">Avg 6.2 gal/day</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Breeding Age</h4>
                <div className="text-2xl font-bold text-purple-600">12</div>
                <p className="text-sm text-purple-700">Ready for breeding</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">Recent Activity</h4>
              <div className="space-y-2 text-sm">
                <div>• Bessie - Health check completed (2 hours ago)</div>
                <div>• Charlie - Vaccination scheduled for Jan 20</div>
                <div>• Henrietta - Egg production increased 15%</div>
              </div>
            </div>
          </div>
        );
      
      case 'vaccination':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-3">Upcoming Vaccinations</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div>
                    <div className="font-medium">Bessie - Annual Booster</div>
                    <div className="text-sm text-gray-500">Holstein Cattle • C001</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">Feb 15, 2024</div>
                    <div className="text-xs text-gray-500">In 18 days</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                  <div>
                    <div className="font-medium">Charlie - Deworming</div>
                    <div className="text-sm text-gray-500">Angus Cattle • C002</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-red-600">Jan 20, 2024</div>
                    <div className="text-xs text-red-500">Overdue by 2 days</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Recent Vaccinations</h4>
              <div className="text-sm text-green-700">Wilbur - Swine Flu vaccination completed (Dec 10, 2023)</div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">Close</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Schedule New</button>
            </div>
          </div>
        );
      
      case 'breedingSchedule':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-900 mb-2">Active Cycles</h4>
                <div className="text-2xl font-bold text-pink-600">5</div>
                <p className="text-sm text-pink-700">Currently breeding</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Expected Births</h4>
                <div className="text-2xl font-bold text-purple-600">3</div>
                <p className="text-sm text-purple-700">Next 60 days</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Daisy (C003)</div>
                    <div className="text-sm text-gray-500">Holstein • Bred on Nov 15, 2023</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-600">Due: Aug 15, 2024</div>
                    <div className="text-xs text-gray-500">Day 68 of pregnancy</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-white border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Molly (C004)</div>
                    <div className="text-sm text-gray-500">Jersey • Heat cycle detected</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-blue-600">Ready for breeding</div>
                    <div className="text-xs text-gray-500">Optimal window: 2 days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'scanQR':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">Position QR code within the frame to scan animal information</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">QR Code Features:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Instant animal identification</li>
                <li>• Access complete health records</li>
                <li>• View vaccination history</li>
                <li>• Update production data</li>
              </ul>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">Start Camera</button>
            </div>
          </div>
        );
      
      case 'productionReport':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Milk Production</h4>
                <div className="text-2xl font-bold text-blue-600">1,247 gal</div>
                <p className="text-sm text-blue-700">This month (+12%)</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-2">Egg Production</h4>
                <div className="text-2xl font-bold text-yellow-600">892 eggs</div>
                <p className="text-sm text-yellow-700">This month (+8%)</p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Top Performers</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bessie (Milk)</span>
                  <span className="text-sm font-medium text-green-600">7.2 gal/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Henrietta (Eggs)</span>
                  <span className="text-sm font-medium text-green-600">1.3 eggs/day</span>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">Close</button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">Export Report</button>
            </div>
          </div>
        );
      
      case 'healthCheck':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-semibold text-blue-900 mb-2">🩺 AI Health Assessment</h4>
              <p className="text-sm text-blue-700">Comprehensive health evaluation with AI-powered recommendations</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { name: 'Bessie', id: 'C001', species: 'Cattle', lastCheck: '2 weeks ago' },
                { name: 'Charlie', id: 'P015', species: 'Poultry', lastCheck: '1 week ago' },
                { name: 'Wilbur', id: 'S003', species: 'Swine', lastCheck: '3 days ago' }
              ].map((animal, index) => (
                <div key={index} className="bg-white border rounded-lg p-3 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                  <div className="font-medium text-gray-900">{animal.name}</div>
                  <div className="text-xs text-gray-500">{animal.id} • {animal.species}</div>
                  <div className="text-xs text-blue-600 mt-1">{animal.lastCheck}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Health Checklist</h4>
              {[
                { item: 'Temperature check', status: 'normal', value: '101.5°F' },
                { item: 'Appetite assessment', status: 'good', value: 'Eating normally' },
                { item: 'Mobility evaluation', status: 'excellent', value: 'Active movement' },
                { item: 'Coat/feather condition', status: 'good', value: 'Healthy appearance' },
                { item: 'Eye and nose examination', status: 'normal', value: 'Clear, no discharge' },
                { item: 'Weight measurement', status: 'stable', value: '1,250 lbs (+5 lbs)' }
              ].map((check, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      check.status === 'excellent' ? 'bg-green-500' :
                      check.status === 'good' || check.status === 'normal' || check.status === 'stable' ? 'bg-green-400' :
                      'bg-yellow-400'
                    }`} />
                    <span className="text-sm font-medium text-gray-900">{check.item}</span>
                  </div>
                  <span className="text-sm text-gray-600">{check.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🤖 AI Recommendations</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Continue current feeding schedule</li>
                <li>• Monitor weight gain trend</li>
                <li>• Schedule vaccination in 2 weeks</li>
                <li>• Increase exercise for optimal health</li>
              </ul>
            </div>

            <div className="bg-yellow-50 p-3 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-700">Charlie due for deworming next week</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">Close</button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Schedule Vet Visit</button>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-600">Modal content for {modalType} is being developed.</p>
          </div>
        );
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
          <h1 className="text-3xl font-bold text-emerald-600">Livestock Manager</h1>
          <p className="text-gray-600 mt-1">Monitor animal health, breeding, and production</p>
        </div>
        <button 
          onClick={() => openModal('addAnimal')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center mt-4 lg:mt-0"
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
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => openModal('animalOverview')}
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
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => openModal('healthAlerts')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Health Alerts</p>
              <p className="text-3xl font-bold text-red-600">{livestockSummary.healthAlerts}</p>
              <div className="flex items-center mt-1">
                <span className="text-sm text-red-600">Require attention</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => openModal('vaccination')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Vaccinations</p>
              <p className="text-3xl font-bold text-blue-600">{livestockSummary.upcomingVaccinations}</p>
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
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => openModal('breedingSchedule')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Breeding Schedule</p>
              <p className="text-3xl font-bold text-purple-600">{livestockSummary.breedingSchedule}</p>
              <div className="flex items-center mt-1">
                <Baby className="w-4 h-4 text-purple-500 mr-1" />
                <span className="text-sm text-purple-600">Active cycles</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Baby className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={() => openModal('healthCheck')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <Heart className="w-4 h-4 mr-2" />
          Health Check
        </button>
        <button 
          onClick={() => openModal('scanQR')}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <QrCode className="w-4 h-4 mr-2" />
          Scan QR Code
        </button>
        <button 
          onClick={() => openModal('productionReport')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Production Report
        </button>
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
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Animal Registry</h3>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search animals..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div className="flex gap-2">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap">
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
        <Modal
          isOpen={true}
          onClose={() => setSelectedAnimal(null)}
          title={`${selectedAnimal.name} - ${selectedAnimal.breed}`}
          size="lg"
        >
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
                  <button 
                    onClick={() => openModal('healthCheck')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Camera className="w-4 h-4 mr-1" />
                    Health Check
                  </button>
                  <button 
                    onClick={() => openModal('recordWeight')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Scale className="w-4 h-4 mr-1" />
                    Record Weight
                  </button>
                  <button 
                    onClick={() => openModal('vaccination')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Syringe className="w-4 h-4 mr-1" />
                    Vaccination
                  </button>
                  <button 
                    onClick={() => openModal('schedule')}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Content Renderer */}
      {activeModal && (
        <Modal
          isOpen={true}
          onClose={closeModal}
          title={getModalTitle(activeModal)}
          size="md"
        >
          {renderModalContent(activeModal)}
        </Modal>
      )}
    </div>
  );
};

export default LivestockManager;