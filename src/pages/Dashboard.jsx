import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, AlertTriangle, Cloud, CheckCircle, 
  Camera, TestTube, TrendingUp,
  ArrowUp, Plus, Eye
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Modal from '../components/Modal';

const Dashboard = () => {
  const [farmHealthScore] = useState(85);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(null);
  
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Aphid Detection in Tomato Field',
      description: 'Early stage infestation detected in Zone A',
      time: '2 hours ago',
      severity: 'medium',
      action: 'Apply organic pesticide'
    },
    {
      id: 2,
      type: 'info',
      title: 'Optimal Harvest Window',
      description: 'Corn in Zone B ready for harvest in 3-5 days',
      time: '4 hours ago',
      severity: 'low',
      action: 'Schedule harvest crew'
    },
    {
      id: 3,
      type: 'success',
      title: 'Soil Moisture Optimal',
      description: 'All zones showing healthy moisture levels',
      time: '6 hours ago',
      severity: 'low',
      action: 'Continue current irrigation'
    }
  ]);

  const yieldData = [
    { month: 'Jan', yield: 2400, target: 2800 },
    { month: 'Feb', yield: 1398, target: 2800 },
    { month: 'Mar', yield: 9800, target: 2800 },
    { month: 'Apr', yield: 3908, target: 2800 },
    { month: 'May', yield: 4800, target: 2800 },
    { month: 'Jun', yield: 3800, target: 2800 }
  ];

  const weatherData = [
    { day: 'Mon', temp: 72, humidity: 65 },
    { day: 'Tue', temp: 75, humidity: 70 },
    { day: 'Wed', temp: 78, humidity: 68 },
    { day: 'Thu', temp: 74, humidity: 72 },
    { day: 'Fri', temp: 71, humidity: 75 },
    { day: 'Sat', temp: 69, humidity: 80 },
    { day: 'Sun', temp: 73, humidity: 65 }
  ];

  const expenseData = [
    { name: 'Seeds', value: 2400, color: '#10b981' },
    { name: 'Fertilizer', value: 4567, color: '#3b82f6' },
    { name: 'Labor', value: 1398, color: '#f59e0b' },
    { name: 'Equipment', value: 9800, color: '#ef4444' },
    { name: 'Other', value: 3908, color: '#8b5cf6' }
  ];

  const recentActivities = [
    { type: 'scan', title: 'Pest scan completed', time: '30 minutes ago', status: 'success' },
    { type: 'weather', title: 'Weather alert received', time: '1 hour ago', status: 'warning' },
    { type: 'record', title: 'Fertilizer application logged', time: '2 hours ago', status: 'info' },
    { type: 'harvest', title: 'Harvest completed - Zone C', time: '4 hours ago', status: 'success' },
    { type: 'expense', title: 'Equipment purchase recorded', time: '6 hours ago', status: 'info' }
  ];

  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'info': return Shield;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-red-400 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-400 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-green-400 bg-green-50 text-green-800';
      default: return 'border-blue-400 bg-blue-50 text-blue-800';
    }
  };

  const handleDismiss = (id) => {
    setAlerts((prev) => prev.filter(a => a.id !== id));
  };

  const handleTakeAction = (alert) => {
    setSelectedAlert(alert);
    setActionModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-600">Farm Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening on your farm today.</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <div className="text-sm text-gray-500">Last updated: 5 minutes ago</div>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
            <Plus className="w-4 h-4 mr-2" />
            Quick Action
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Farm Health Score</p>
              <p className="text-3xl font-bold text-gray-900">{farmHealthScore}</p>
              <div className="flex items-center mt-1">
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+5% from last week</span>
              </div>
            </div>
            <Shield className="w-12 h-12 text-emerald-600" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <p className="text-sm font-medium text-gray-600">Active Alerts</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{alerts.length}</p>
          <p className="text-sm text-yellow-600 mt-1">2 require attention</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <p className="text-sm font-medium text-gray-600">Yield This Month</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">4,250 kg</p>
          <p className="text-sm text-green-600 mt-1">↑ 12% vs last month</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <p className="text-sm font-medium text-gray-600">Soil Health</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">8.2/10</p>
          <p className="text-sm text-emerald-600 mt-1">Excellent condition</p>
        </motion.div>
      </div>

      {/* Alerts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Alerts</h3>
          <div className="space-y-4">
            {alerts.map((alert) => {
              const Icon = getAlertIcon(alert.type);
              return (
                <div key={alert.id} className={`alert-card ${getAlertColor(alert.severity)} p-4 rounded-lg border`}>
                  <div className="flex items-start">
                    <Icon className="w-5 h-5 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-sm opacity-90 mt-1">{alert.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs font-medium">Recommended: {alert.action}</span>
                        <div className="flex space-x-2">
                          <button onClick={() => handleDismiss(alert.id)} className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition-colors">
                            Dismiss
                          </button>
                          <button onClick={() => handleTakeAction(alert)} className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-full transition-colors hover:bg-emerald-700">
                            Take Action
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="space-y-3">
            {[
              { icon: Camera, title: 'Scan Crop', desc: 'Take a photo for AI analysis' },
              { icon: TestTube, title: 'Soil Health', desc: 'Upload soil sample image' },
              { icon: Cloud, title: 'Weather', desc: 'View 7-day forecast' },
              { icon: TrendingUp, title: 'Analytics', desc: 'View farm metrics' }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <button key={index} className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-2 text-emerald-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{action.title}</div>
                      <div className="text-xs text-gray-500">{action.desc}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Crop Yield Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yieldData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Line type="monotone" dataKey="yield" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Weather Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={weatherData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Area type="monotone" dataKey="temp" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Activity & Expenses */}
      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mr-4 ${
                  activity.status === 'success' ? 'bg-green-500' :
                  activity.status === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.title}</div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </div>
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={expenseData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-4">
            {expenseData.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">${item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Action Modal */}
      <Modal isOpen={actionModalOpen} onClose={() => setActionModalOpen(false)} title={selectedAlert ? selectedAlert.title : 'Action'}>
        <div className="space-y-4">
          <p className="text-gray-700">{selectedAlert?.description}</p>
          <p className="text-sm text-gray-600">Recommended: <strong>{selectedAlert?.action}</strong></p>
          <div className="flex justify-end mt-4 space-x-2">
            <button onClick={() => setActionModalOpen(false)} className="btn btn-ghost">Close</button>
            <button onClick={() => { setActionModalOpen(false); handleDismiss(selectedAlert?.id); }} className="btn btn-primary">Mark Resolved</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
