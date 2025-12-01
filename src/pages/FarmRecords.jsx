import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Mic, MicOff, Calendar, MapPin, Users, 
  DollarSign, Camera, Clock, Filter, Search,
  Package, Wrench, TrendingUp, CheckCircle
} from 'lucide-react';

const FarmRecords = () => {
  const [activeTab, setActiveTab] = useState('log');
  const [isRecording, setIsRecording] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [formData, setFormData] = useState({
    activity: '',
    zone: '',
    crop: '',
    details: '',
    workers: '',
    cost: '',
    photos: []
  });

  const recognitionRef = useRef(null);

  const activities = [
    { id: 1, type: 'Planting', zone: 'Zone A', crop: 'Tomato', details: 'Planted 500 seedlings', workers: 3, cost: 15000, date: '2024-01-15', time: '08:30' },
    { id: 2, type: 'Pest Control', zone: 'Zone B', crop: 'Maize', details: 'Sprayed pesticide - 2 liters', workers: 2, cost: 3500, date: '2024-01-14', time: '14:20' },
    { id: 3, type: 'Fertilizer Application', zone: 'Zone C', crop: 'Pepper', details: 'Applied NPK fertilizer - 50kg', workers: 2, cost: 8500, date: '2024-01-13', time: '09:15' },
    { id: 4, type: 'Harvesting', zone: 'Zone A', crop: 'Tomato', details: 'Harvested 200kg tomatoes', workers: 4, cost: 12000, date: '2024-01-12', time: '06:00' }
  ];

  const inventory = [
    { id: 1, name: 'NPK Fertilizer', category: 'Fertilizer', stock: 25, unit: 'bags', reorderLevel: 10, lastUsed: '2024-01-13' },
    { id: 2, name: 'Pesticide (Lambda)', category: 'Pesticide', stock: 8, unit: 'liters', reorderLevel: 5, lastUsed: '2024-01-14' },
    { id: 3, name: 'Tomato Seeds', category: 'Seeds', stock: 2, unit: 'packets', reorderLevel: 3, lastUsed: '2024-01-10' },
    { id: 4, name: 'Urea', category: 'Fertilizer', stock: 15, unit: 'bags', reorderLevel: 8, lastUsed: '2024-01-11' }
  ];

  const workers = [
    { id: 1, name: 'John Doe', role: 'Farm Hand', hoursToday: 8, totalHours: 160, payment: 45000, status: 'Present' },
    { id: 2, name: 'Mary Smith', role: 'Supervisor', hoursToday: 8, totalHours: 168, payment: 65000, status: 'Present' },
    { id: 3, name: 'Peter Johnson', role: 'Farm Hand', hoursToday: 0, totalHours: 152, payment: 42000, status: 'Absent' },
    { id: 4, name: 'Sarah Wilson', role: 'Equipment Operator', hoursToday: 6, totalHours: 144, payment: 55000, status: 'Present' }
  ];

  const equipment = [
    { id: 1, name: 'Tractor John Deere', hours: 245, nextMaintenance: '2024-02-01', status: 'Active', lastUsed: '2024-01-14' },
    { id: 2, name: 'Water Pump', hours: 180, nextMaintenance: '2024-01-25', status: 'Active', lastUsed: '2024-01-15' },
    { id: 3, name: 'Sprayer', hours: 95, nextMaintenance: '2024-02-10', status: 'Maintenance', lastUsed: '2024-01-12' },
    { id: 4, name: 'Harvester', hours: 120, nextMaintenance: '2024-01-30', status: 'Active', lastUsed: '2024-01-12' }
  ];

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          parseVoiceInput(finalTranscript);
        }
      };

      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      alert('Speech recognition not supported in this browser');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const parseVoiceInput = (text) => {
    const lowerText = text.toLowerCase();
    const newFormData = { ...formData };

    // Activity type matching
    if (lowerText.includes('spray') || lowerText.includes('pesticide')) {
      newFormData.activity = 'Pest Control';
    } else if (lowerText.includes('plant') || lowerText.includes('seed')) {
      newFormData.activity = 'Planting';
    } else if (lowerText.includes('harvest')) {
      newFormData.activity = 'Harvesting';
    } else if (lowerText.includes('fertilizer') || lowerText.includes('fertilize')) {
      newFormData.activity = 'Fertilizer Application';
    }

    // Zone matching
    const zoneMatch = lowerText.match(/zone\s+([a-z])/);
    if (zoneMatch) {
      newFormData.zone = `Zone ${zoneMatch[1].toUpperCase()}`;
    }

    // Crop matching
    if (lowerText.includes('maize') || lowerText.includes('corn')) {
      newFormData.crop = 'Maize';
    } else if (lowerText.includes('tomato')) {
      newFormData.crop = 'Tomato';
    } else if (lowerText.includes('pepper')) {
      newFormData.crop = 'Pepper';
    } else if (lowerText.includes('bean')) {
      newFormData.crop = 'Beans';
    }

    // Cost matching (naira)
    const costMatch = lowerText.match(/(\d+)\s*naira/);
    if (costMatch) {
      newFormData.cost = costMatch[1];
    }

    // Details
    newFormData.details = text;

    setFormData(newFormData);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', formData);
    setShowForm(false);
    setFormData({
      activity: '',
      zone: '',
      crop: '',
      details: '',
      workers: '',
      cost: '',
      photos: []
    });
    setTranscript('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': case 'Active': return 'bg-green-100 text-green-800';
      case 'Absent': case 'Maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600">Farm Records</h1>
          <p className="text-gray-600 mt-1">Track activities, inventory, and workforce</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={isRecording ? stopRecording : startRecording}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center text-sm sm:text-base ${
              isRecording 
                ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
            {isRecording ? 'Stop Recording' : '🎤 Record Activity'}
          </button>
          <button 
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </button>
        </div>
      </div>

      {/* Voice Recording Status */}
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3"></div>
            <span className="text-red-800 font-medium">Recording... Speak your farm activity</span>
          </div>
          {transcript && (
            <div className="mt-2 text-sm text-red-700">
              <strong>Heard:</strong> "{transcript}"
            </div>
          )}
        </motion.div>
      )}

      {/* Quick Entry Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Daily Activity Log</h3>
                <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-500">×</button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Activity Type</label>
                    <select 
                      value={formData.activity}
                      onChange={(e) => setFormData({...formData, activity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      required
                    >
                      <option value="">Select Activity</option>
                      <option value="Planting">Planting</option>
                      <option value="Pest Control">Pest Control</option>
                      <option value="Fertilizer Application">Fertilizer Application</option>
                      <option value="Harvesting">Harvesting</option>
                      <option value="Irrigation">Irrigation</option>
                      <option value="Weeding">Weeding</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zone/Area</label>
                    <select 
                      value={formData.zone}
                      onChange={(e) => setFormData({...formData, zone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      required
                    >
                      <option value="">Select Zone</option>
                      <option value="Zone A">Zone A</option>
                      <option value="Zone B">Zone B</option>
                      <option value="Zone C">Zone C</option>
                      <option value="Zone D">Zone D</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Crop</label>
                    <select 
                      value={formData.crop}
                      onChange={(e) => setFormData({...formData, crop: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="">Select Crop</option>
                      <option value="Tomato">Tomato</option>
                      <option value="Maize">Maize</option>
                      <option value="Pepper">Pepper</option>
                      <option value="Beans">Beans</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Workers</label>
                    <input 
                      type="number"
                      value={formData.workers}
                      onChange={(e) => setFormData({...formData, workers: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                      placeholder="Number of workers"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                  <textarea 
                    value={formData.details}
                    onChange={(e) => setFormData({...formData, details: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    rows="3"
                    placeholder="Describe the activity..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cost (₦)</label>
                  <input 
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({...formData, cost: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter cost in Naira"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto px-4 sm:px-6">
            {[
              { id: 'log', name: 'Activity Log', icon: Clock },
              { id: 'inventory', name: 'Inventory', icon: Package },
              { id: 'workers', name: 'Workers', icon: Users },
              { id: 'equipment', name: 'Equipment', icon: Wrench }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-3 sm:py-4 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">{tab.name}</span>
                  <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === 'log' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search activities..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 whitespace-nowrap">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">{activity.type}</h4>
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                            {activity.zone}
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            {activity.crop}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{activity.details}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {activity.date} at {activity.time}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {activity.workers} workers
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            ₦{activity.cost.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                        Edit Activity
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Inventory Tracker</h3>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {inventory.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.stock <= item.reorderLevel ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {item.stock <= item.reorderLevel ? 'Low Stock' : 'In Stock'}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Category: {item.category}</div>
                      <div>Stock: {item.stock} {item.unit}</div>
                      <div>Reorder at: {item.reorderLevel} {item.unit}</div>
                      <div>Last used: {item.lastUsed}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'workers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Labor Records</h3>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Worker
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Worker</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours Today</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Hours</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {workers.map((worker) => (
                      <tr key={worker.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{worker.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{worker.hoursToday}h</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{worker.totalHours}h</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₦{worker.payment.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(worker.status)}`}>
                            {worker.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'equipment' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Equipment Log</h3>
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Equipment
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {equipment.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Usage Hours:</span>
                        <span className="font-medium">{item.hours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Maintenance:</span>
                        <span className="font-medium">{item.nextMaintenance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Used:</span>
                        <span className="font-medium">{item.lastUsed}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm hover:bg-blue-200 flex-1">
                        Log Usage
                      </button>
                      <button className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 flex-1">
                        Maintenance
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmRecords;