import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, MapPin, Bell, Shield, CreditCard, 
  Globe, Smartphone, Mail, Key, Download,
  Trash2, Save, Camera, Edit, Plus, X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    farmName: user?.farmName || '',
    location: user?.location || '',
    farmSize: '50 acres',
    mainCrops: ['Tomatoes', 'Corn', 'Lettuce'],
    bio: 'Sustainable farming enthusiast with 15 years of experience in organic vegetable production.'
  });

  const [farmZones, setFarmZones] = useState([
    { id: 1, name: 'Zone A - North Field', crop: 'Tomatoes', size: '15 acres' },
    { id: 2, name: 'Zone B - South Field', crop: 'Corn', size: '20 acres' },
    { id: 3, name: 'Zone C - East Field', crop: 'Lettuce', size: '10 acres' }
  ]);

  const [notifications, setNotifications] = useState({
    pestAlerts: true,
    weatherWarnings: true,
    marketPrices: false,
    taskReminders: true,
    communityUpdates: true,
    inApp: true,
    email: true,
    sms: false,
    whatsapp: true,
    quietHours: { start: '22:00', end: '07:00' }
  });

  const [connectedServices, setConnectedServices] = useState([
    { name: 'Weather Service', status: 'connected', icon: '🌤️' },
    { name: 'Bank Account', status: 'connected', icon: '🏦' },
    { name: 'IoT Sensors', status: 'disconnected', icon: '📡' }
  ]);

  const handleProfileUpdate = () => {
    // Handle profile update
    console.log('Profile updated:', profileData);
  };

  const handleNotificationUpdate = () => {
    // Handle notification settings update
    console.log('Notifications updated:', notifications);
  };

  const addFarmZone = () => {
    const newZone = {
      id: farmZones.length + 1,
      name: `Zone ${String.fromCharCode(65 + farmZones.length)} - New Field`,
      crop: '',
      size: ''
    };
    setFarmZones([...farmZones, newZone]);
  };

  const removeFarmZone = (id) => {
    setFarmZones(farmZones.filter(zone => zone.id !== id));
  };

  const updateFarmZone = (id, field, value) => {
    setFarmZones(farmZones.map(zone => 
      zone.id === id ? { ...zone, [field]: value } : zone
    ));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-600">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account, farm configuration, and preferences</p>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-4 px-4 overflow-x-auto no-scrollbar -mx-4 scroll-hint scroll-hint-dark">
            {[
              { id: 'profile', name: 'Profile', icon: User },
              { id: 'farm', name: 'Farm Setup', icon: MapPin },
              { id: 'notifications', name: 'Notifications', icon: Bell },
              { id: 'security', name: 'Security', icon: Shield },
              { id: 'billing', name: 'Billing', icon: CreditCard },
              { id: 'integrations', name: 'Integrations', icon: Globe }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center shrink-0 whitespace-nowrap py-4 px-3 border-b-2 font-medium text-sm ${
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
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img
                    src={user?.avatar || '/api/placeholder/100/100'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{profileData.name}</h3>
                  <p className="text-gray-600">{profileData.farmName}</p>
                  <button className="mt-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Name
                  </label>
                  <input
                    type="text"
                    value={profileData.farmName}
                    onChange={(e) => setProfileData({...profileData, farmName: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Farm Size
                  </label>
                  <input
                    type="text"
                    value={profileData.farmSize}
                    onChange={(e) => setProfileData({...profileData, farmSize: e.target.value})}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  rows={4}
                  className="input-field"
                  placeholder="Tell us about your farming experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Crops
                </label>
                <div className="flex flex-wrap gap-2">
                  {profileData.mainCrops.map((crop, index) => (
                    <span key={index} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm flex items-center">
                      {crop}
                      <button
                        onClick={() => {
                          const newCrops = profileData.mainCrops.filter((_, i) => i !== index);
                          setProfileData({...profileData, mainCrops: newCrops});
                        }}
                        className="ml-2 text-emerald-600 hover:text-emerald-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-emerald-300 hover:text-emerald-600 transition-colors">
                    <Plus className="w-3 h-3 mr-1 inline" />
                    Add Crop
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={handleProfileUpdate} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'farm' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Farm Zones</h3>
                <button onClick={addFarmZone} className="btn btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Zone
                </button>
              </div>

              <div className="space-y-4">
                {farmZones.map((zone) => (
                  <div key={zone.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid md:grid-cols-4 gap-4 items-center">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Zone Name
                        </label>
                        <input
                          type="text"
                          value={zone.name}
                          onChange={(e) => updateFarmZone(zone.id, 'name', e.target.value)}
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Current Crop
                        </label>
                        <select
                          value={zone.crop}
                          onChange={(e) => updateFarmZone(zone.id, 'crop', e.target.value)}
                          className="input-field"
                        >
                          <option value="">Select crop</option>
                          <option value="Tomatoes">Tomatoes</option>
                          <option value="Corn">Corn</option>
                          <option value="Lettuce">Lettuce</option>
                          <option value="Carrots">Carrots</option>
                          <option value="Potatoes">Potatoes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Size
                        </label>
                        <input
                          type="text"
                          value={zone.size}
                          onChange={(e) => updateFarmZone(zone.id, 'size', e.target.value)}
                          className="input-field"
                          placeholder="e.g., 15 acres"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => removeFarmZone(zone.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Farm Map Integration</h4>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Upload farm boundary map</p>
                    <button className="mt-2 btn-secondary">
                      Upload Map
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alert Types</h3>
                <div className="space-y-4">
                  {[
                    { key: 'pestAlerts', label: 'Pest & Disease Alerts', description: 'Get notified about pest outbreaks and disease detection' },
                    { key: 'weatherWarnings', label: 'Weather Warnings', description: 'Receive alerts for severe weather conditions' },
                    { key: 'marketPrices', label: 'Market Price Changes', description: 'Updates on commodity price fluctuations' },
                    { key: 'taskReminders', label: 'Task Reminders', description: 'Reminders for scheduled farm activities' },
                    { key: 'communityUpdates', label: 'Community Updates', description: 'New posts and discussions in your area' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.label}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={notifications[item.key]}
                          onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { key: 'inApp', label: 'In-App Notifications', icon: Bell },
                    { key: 'email', label: 'Email', icon: Mail },
                    { key: 'sms', label: 'SMS', icon: Smartphone },
                    { key: 'whatsapp', label: 'WhatsApp', icon: MessageCircle }
                  ].map((channel) => {
                    const Icon = channel.icon;
                    return (
                      <div key={channel.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <Icon className="w-5 h-5 text-gray-500 mr-3" />
                          <span className="font-medium text-gray-900">{channel.label}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[channel.key]}
                            onChange={(e) => setNotifications({...notifications, [channel.key]: e.target.checked})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quiet Hours</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={notifications.quietHours.start}
                        onChange={(e) => setNotifications({
                          ...notifications,
                          quietHours: {...notifications.quietHours, start: e.target.value}
                        })}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={notifications.quietHours.end}
                        onChange={(e) => setNotifications({
                          ...notifications,
                          quietHours: {...notifications.quietHours, end: e.target.value}
                        })}
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={handleNotificationUpdate} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Password & Authentication</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                    <div className="flex items-center">
                      <Key className="w-5 h-5 text-gray-500 mr-3" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Change Password</div>
                        <div className="text-sm text-gray-600">Last changed 3 months ago</div>
                      </div>
                    </div>
                    <Edit className="w-4 h-4 text-gray-400" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-gray-500 mr-3" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                        <div className="text-sm text-gray-600">Add an extra layer of security</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                      Recommended
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
                <div className="space-y-4">
                  <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                    <div className="flex items-center">
                      <Download className="w-5 h-5 text-gray-500 mr-3" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Download Your Data</div>
                        <div className="text-sm text-gray-600">Export all your farm data</div>
                      </div>
                    </div>
                  </button>

                  <button className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:border-red-300 transition-colors text-red-600">
                    <div className="flex items-center">
                      <Trash2 className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">Delete Account</div>
                        <div className="text-sm">Permanently delete your account and data</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'billing' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-900">Free Plan</h3>
                    <p className="text-emerald-700">You're currently on the free plan</p>
                  </div>
                  <button className="btn btn-primary">
                    Upgrade Plan
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">5</div>
                    <div className="text-sm text-gray-600">Image analyses this month</div>
                    <div className="text-xs text-gray-500 mt-1">5 of 5 used</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">∞</div>
                    <div className="text-sm text-gray-600">Weather forecasts</div>
                    <div className="text-xs text-gray-500 mt-1">Unlimited</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">✓</div>
                    <div className="text-sm text-gray-600">Community access</div>
                    <div className="text-xs text-gray-500 mt-1">Included</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
                <div className="text-center py-8 text-gray-500">
                  <CreditCard className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>No billing history available</p>
                  <p className="text-sm">You're on the free plan</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'integrations' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Services</h3>
                <div className="space-y-4">
                  {connectedServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{service.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{service.name}</div>
                          <div className={`text-sm ${service.status === 'connected' ? 'text-green-600' : 'text-gray-500'}`}>
                            {service.status === 'connected' ? 'Connected' : 'Not connected'}
                          </div>
                        </div>
                      </div>
                      <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        service.status === 'connected'
                          ? 'bg-red-100 text-red-700 hover:bg-red-200'
                          : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                      }`}>
                        {service.status === 'connected' ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Integrations</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'John Deere Operations Center', description: 'Sync equipment data and field operations' },
                    { name: 'Climate FieldView', description: 'Import field maps and yield data' },
                    { name: 'FarmLogs', description: 'Sync planting and harvest records' },
                    { name: 'Granular', description: 'Import financial and operational data' }
                  ].map((integration, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">{integration.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                      <button className="btn-secondary w-full">
                        Connect
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">API Access</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">API Key</h4>
                      <p className="text-sm text-gray-600">Use this key to access AgroGuard API</p>
                    </div>
                    <button className="btn-secondary">
                      Generate Key
                    </button>
                  </div>
                  <div className="bg-white border border-gray-200 rounded p-3 font-mono text-sm text-gray-500">
                    No API key generated
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;