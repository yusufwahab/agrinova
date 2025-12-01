import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Droplets, Calendar, TrendingUp, AlertTriangle, 
  Play, Pause, Settings, MapPin, Clock, Zap,
  BarChart3, Target, CheckCircle, Bell
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SmartIrrigation = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [irrigationActive, setIrrigationActive] = useState(false);

  const zones = [
    { id: 'A', name: 'Zone A - Tomatoes', moisture: 35, status: 'low', crop: 'Tomato', area: '2.5 acres', lastWatered: '2 hours ago' },
    { id: 'B', name: 'Zone B - Maize', moisture: 65, status: 'optimal', crop: 'Maize', area: '4.0 acres', lastWatered: '1 day ago' },
    { id: 'C', name: 'Zone C - Peppers', moisture: 45, status: 'medium', crop: 'Pepper', area: '1.8 acres', lastWatered: '6 hours ago' },
    { id: 'D', name: 'Zone D - Beans', moisture: 25, status: 'critical', crop: 'Beans', area: '3.2 acres', lastWatered: '3 days ago' }
  ];

  const waterUsage = [
    { day: 'Mon', usage: 450, target: 400 },
    { day: 'Tue', usage: 380, target: 400 },
    { day: 'Wed', usage: 520, target: 400 },
    { day: 'Thu', usage: 410, target: 400 },
    { day: 'Fri', usage: 390, target: 400 },
    { day: 'Sat', usage: 460, target: 400 },
    { day: 'Sun', usage: 430, target: 400 }
  ];

  const moistureData = [
    { time: '6AM', zoneA: 30, zoneB: 60, zoneC: 40, zoneD: 20 },
    { time: '9AM', zoneA: 35, zoneB: 65, zoneC: 45, zoneD: 25 },
    { time: '12PM', zoneA: 32, zoneB: 62, zoneC: 42, zoneD: 22 },
    { time: '3PM', zoneA: 28, zoneB: 58, zoneC: 38, zoneD: 18 },
    { time: '6PM', zoneA: 35, zoneB: 65, zoneC: 45, zoneD: 25 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMoistureColor = (moisture) => {
    if (moisture >= 60) return '#10b981';
    if (moisture >= 40) return '#f59e0b';
    if (moisture >= 30) return '#f97316';
    return '#ef4444';
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600">Smart Irrigation</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">AI-powered water management system</p>
        </div>
        <div className="flex justify-center sm:justify-start">
          <button 
            onClick={() => setIrrigationActive(!irrigationActive)}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors flex items-center text-sm sm:text-base ${
              irrigationActive 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {irrigationActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {irrigationActive ? 'Stop Irrigation' : 'Start Irrigation'}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Zones</p>
              <p className="text-3xl font-bold text-gray-900">4</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Water Usage Today</p>
              <p className="text-3xl font-bold text-gray-900">430L</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">7% above target</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
              <p className="text-3xl font-bold text-red-600">2</p>
              <div className="flex items-center mt-1">
                <AlertTriangle className="w-4 h-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">Zones need water</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Efficiency Score</p>
              <p className="text-3xl font-bold text-green-600">87%</p>
              <div className="flex items-center mt-1">
                <Target className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">Excellent</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'dashboard', name: 'Zone Status', icon: MapPin },
              { id: 'scheduler', name: 'AI Scheduler', icon: Calendar },
              { id: 'usage', name: 'Water Usage', icon: BarChart3 },
              { id: 'sources', name: 'Water Sources', icon: Droplets }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
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
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Zone Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {zones.map((zone) => (
                  <motion.div
                    key={zone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-xl border-2 ${getStatusColor(zone.status)}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{zone.name}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{zone.moisture}%</div>
                        <div className="text-sm opacity-75">Moisture</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                      <div
                        className="h-3 rounded-full transition-all duration-500"
                        style={{
                          width: `${zone.moisture}%`,
                          backgroundColor: getMoistureColor(zone.moisture)
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="opacity-75">Crop:</span>
                        <div className="font-medium">{zone.crop}</div>
                      </div>
                      <div>
                        <span className="opacity-75">Area:</span>
                        <div className="font-medium">{zone.area}</div>
                      </div>
                      <div>
                        <span className="opacity-75">Last Watered:</span>
                        <div className="font-medium">{zone.lastWatered}</div>
                      </div>
                      <div>
                        <span className="opacity-75">Status:</span>
                        <div className="font-medium capitalize">{zone.status}</div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <button className="bg-white bg-opacity-50 hover:bg-opacity-75 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1">
                        Water Now
                      </button>
                      <button className="bg-white bg-opacity-50 hover:bg-opacity-75 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Moisture Trends */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Moisture Levels Today</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moistureData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="time" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Line type="monotone" dataKey="zoneA" stroke="#ef4444" strokeWidth={3} name="Zone A" />
                    <Line type="monotone" dataKey="zoneB" stroke="#10b981" strokeWidth={3} name="Zone B" />
                    <Line type="monotone" dataKey="zoneC" stroke="#f59e0b" strokeWidth={3} name="Zone C" />
                    <Line type="monotone" dataKey="zoneD" stroke="#dc2626" strokeWidth={3} name="Zone D" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === 'scheduler' && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">🤖 AI Recommendations</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-blue-900">Zone D - Critical</span>
                      <span className="text-sm text-blue-600">Immediate</span>
                    </div>
                    <p className="text-sm text-blue-700">Water immediately - moisture at 25%. Beans require 40-60% for optimal growth.</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-orange-900">Zone A - Low</span>
                      <span className="text-sm text-orange-600">Within 2 hours</span>
                    </div>
                    <p className="text-sm text-orange-700">Schedule watering - moisture at 35%. Tomatoes need consistent moisture.</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-4">Today's Schedule</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium">Zone D - Beans</div>
                        <div className="text-sm text-gray-500">30 minutes, 150L</div>
                      </div>
                      <div className="text-sm text-red-600 font-medium">Now</div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <div className="font-medium">Zone A - Tomatoes</div>
                        <div className="text-sm text-gray-500">25 minutes, 120L</div>
                      </div>
                      <div className="text-sm text-blue-600 font-medium">2:00 PM</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-4">Weather Forecast</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Today</span>
                      <span className="text-sm font-medium">Sunny, 32°C</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tomorrow</span>
                      <span className="text-sm font-medium text-blue-600">Rain, 28°C</span>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <p className="text-sm text-blue-800">💡 Reduce watering tomorrow - 15mm rain expected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Water Usage</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={waterUsage}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="day" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Actual Usage (L)" />
                    <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="Target (L)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">This Week</h4>
                  <div className="text-2xl font-bold text-blue-600">3,040L</div>
                  <p className="text-sm text-gray-600">+8% vs target</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">This Month</h4>
                  <div className="text-2xl font-bold text-green-600">12,450L</div>
                  <p className="text-sm text-gray-600">-3% vs target</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Cost Savings</h4>
                  <div className="text-2xl font-bold text-emerald-600">₦2,340</div>
                  <p className="text-sm text-gray-600">vs manual irrigation</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sources' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-blue-900">Borehole #1</h4>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Capacity:</span>
                      <span className="font-medium text-blue-900">5,000L/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Current Flow:</span>
                      <span className="font-medium text-blue-900">4,200L/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Water Level:</span>
                      <span className="font-medium text-blue-900">85%</span>
                    </div>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-4">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">River Source</h4>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Backup</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium text-gray-900">2,000L/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Distance:</span>
                      <span className="font-medium text-gray-900">1.2km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quality:</span>
                      <span className="font-medium text-gray-900">Good</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 p-6 rounded-xl">
                <h4 className="font-semibold text-emerald-900 mb-4">💡 Drip Irrigation Calculator</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-2">Area (acres)</label>
                    <input type="number" className="w-full px-3 py-2 border border-emerald-300 rounded-lg" placeholder="5.0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-emerald-800 mb-2">Crop Type</label>
                    <select className="w-full px-3 py-2 border border-emerald-300 rounded-lg">
                      <option>Tomato</option>
                      <option>Maize</option>
                      <option>Pepper</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-white rounded-lg border border-emerald-200">
                  <h5 className="font-medium text-emerald-900 mb-2">Estimated Materials:</h5>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Drip tape: 2,500m (₦125,000)</li>
                    <li>• Emitters: 1,250 units (₦37,500)</li>
                    <li>• Main line: 500m (₦45,000)</li>
                    <li>• Filters & fittings (₦25,000)</li>
                  </ul>
                  <div className="mt-3 pt-3 border-t border-emerald-200">
                    <div className="flex justify-between font-medium">
                      <span>Total Cost:</span>
                      <span>₦232,500</span>
                    </div>
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>ROI Period:</span>
                      <span>18 months</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartIrrigation;