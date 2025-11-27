import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cloud, Sun, CloudRain, CloudSnow, Wind, 
  Thermometer, Droplets, Eye, Sunrise, Sunset,
  AlertTriangle, CheckCircle, Calendar, MapPin,
  TrendingUp, TrendingDown, RefreshCw, Bell
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeatherClimate = () => {
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 74,
    feelsLike: 78,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 8,
    pressure: 30.15,
    visibility: 10,
    uvIndex: 6,
    sunrise: '6:24 AM',
    sunset: '7:45 PM',
    lastUpdated: '5 minutes ago'
  });

  const hourlyForecast = [
    { time: '12 PM', temp: 74, icon: 'sun', precipitation: 0 },
    { time: '1 PM', temp: 76, icon: 'sun', precipitation: 0 },
    { time: '2 PM', temp: 78, icon: 'cloud', precipitation: 10 },
    { time: '3 PM', temp: 79, icon: 'cloud', precipitation: 20 },
    { time: '4 PM', temp: 77, icon: 'rain', precipitation: 60 },
    { time: '5 PM', temp: 75, icon: 'rain', precipitation: 80 },
    { time: '6 PM', temp: 73, icon: 'cloud', precipitation: 30 },
    { time: '7 PM', temp: 71, icon: 'cloud', precipitation: 10 }
  ];

  const weeklyForecast = [
    { day: 'Today', high: 79, low: 65, condition: 'Partly Cloudy', precipitation: 20, icon: 'cloud' },
    { day: 'Tomorrow', high: 82, low: 68, condition: 'Sunny', precipitation: 0, icon: 'sun' },
    { day: 'Wednesday', high: 85, low: 70, condition: 'Sunny', precipitation: 0, icon: 'sun' },
    { day: 'Thursday', high: 78, low: 64, condition: 'Thunderstorms', precipitation: 90, icon: 'rain' },
    { day: 'Friday', high: 72, low: 58, condition: 'Rainy', precipitation: 70, icon: 'rain' },
    { day: 'Saturday', high: 75, low: 61, condition: 'Partly Cloudy', precipitation: 30, icon: 'cloud' },
    { day: 'Sunday', high: 80, low: 66, condition: 'Sunny', precipitation: 10, icon: 'sun' }
  ];

  const riskAlerts = [
    {
      id: 1,
      type: 'frost',
      title: 'Frost Warning',
      risk: 'high',
      timeframe: 'Tonight (2 AM - 6 AM)',
      impact: 'Potential damage to tender crops and seedlings',
      recommendations: [
        'Cover sensitive plants with frost cloth',
        'Run sprinkler systems if available',
        'Harvest mature crops before evening',
        'Move potted plants to protected areas'
      ]
    },
    {
      id: 2,
      type: 'drought',
      title: 'Drought Conditions',
      risk: 'medium',
      timeframe: 'Next 2 weeks',
      impact: 'Increased irrigation needs, stress on crops',
      recommendations: [
        'Implement water conservation measures',
        'Increase irrigation frequency',
        'Apply mulch to retain soil moisture',
        'Monitor soil moisture levels daily'
      ]
    }
  ];

  const smartRecommendations = [
    {
      id: 1,
      priority: 'high',
      action: 'Delay fertilizer application by 2 days',
      reason: 'Heavy rain expected Thursday-Friday',
      impact: 'Prevent nutrient runoff and waste',
      completed: false
    },
    {
      id: 2,
      priority: 'medium',
      action: 'Harvest Zone A corn within 24 hours',
      reason: 'Strong winds forecasted for tomorrow',
      impact: 'Prevent lodging and crop loss',
      completed: false
    },
    {
      id: 3,
      priority: 'low',
      action: 'Apply protective covering tonight',
      reason: 'Frost warning in effect',
      impact: 'Protect tender seedlings',
      completed: true
    }
  ];

  const historicalData = [
    { month: 'Jan', rainfall: 2.1, avgTemp: 45, thisYear: 1.8, lastYear: 2.4 },
    { month: 'Feb', rainfall: 1.8, avgTemp: 48, thisYear: 2.2, lastYear: 1.5 },
    { month: 'Mar', rainfall: 3.2, avgTemp: 55, thisYear: 2.8, lastYear: 3.6 },
    { month: 'Apr', rainfall: 2.8, avgTemp: 62, thisYear: 3.1, lastYear: 2.5 },
    { month: 'May', rainfall: 4.1, avgTemp: 70, thisYear: 3.8, lastYear: 4.4 },
    { month: 'Jun', rainfall: 3.6, avgTemp: 78, thisYear: 4.2, lastYear: 3.0 }
  ];

  const farmingCalendar = [
    { date: '15', activity: 'Plant Summer Crops', type: 'planting', optimal: true },
    { date: '18', activity: 'Fertilize Corn', type: 'maintenance', optimal: false },
    { date: '22', activity: 'Harvest Lettuce', type: 'harvest', optimal: true },
    { date: '25', activity: 'Pest Control Spray', type: 'maintenance', optimal: true },
    { date: '28', activity: 'Soil Testing', type: 'analysis', optimal: false }
  ];

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sun': return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloud': return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rain': return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'snow': return <CloudSnow className="w-8 h-8 text-blue-300" />;
      default: return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'border-red-400 bg-red-50 text-red-800';
      case 'medium': return 'border-yellow-400 bg-yellow-50 text-yellow-800';
      case 'low': return 'border-green-400 bg-green-50 text-green-800';
      default: return 'border-blue-400 bg-blue-50 text-blue-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Weather & Climate Intelligence</h1>
          <p className="text-gray-600 mt-1">Hyper-local forecasts and climate-smart recommendations</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800">
            <MapPin className="w-4 h-4 mr-2" />
            Change Location
          </button>
          <button className="btn btn-ghost">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Current Weather Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span className="text-blue-100">Green Valley Farm, CA</span>
            </div>
            <div className="flex items-center space-x-6">
              <div>
                <div className="text-6xl font-bold">{currentWeather.temperature}°</div>
                <div className="text-blue-100">Feels like {currentWeather.feelsLike}°F</div>
              </div>
              <div className="text-center">
                <Cloud className="w-16 h-16 text-blue-200 mx-auto mb-2" />
                <div className="text-lg font-medium">{currentWeather.condition}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Droplets className="w-5 h-5 mr-2 text-blue-200" />
                <span className="text-blue-100">Humidity</span>
              </div>
              <span className="font-semibold">{currentWeather.humidity}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Wind className="w-5 h-5 mr-2 text-blue-200" />
                <span className="text-blue-100">Wind</span>
              </div>
              <span className="font-semibold">{currentWeather.windSpeed} mph</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Thermometer className="w-5 h-5 mr-2 text-blue-200" />
                <span className="text-blue-100">Pressure</span>
              </div>
              <span className="font-semibold">{currentWeather.pressure} in</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-blue-200" />
                <span className="text-blue-100">Visibility</span>
              </div>
              <span className="font-semibold">{currentWeather.visibility} mi</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sunrise className="w-5 h-5 mr-2 text-blue-200" />
                <span className="text-blue-100">Sunrise</span>
              </div>
              <span className="font-semibold">{currentWeather.sunrise}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sunset className="w-5 h-5 mr-2 text-blue-200" />
                <span className="text-blue-100">Sunset</span>
              </div>
              <span className="font-semibold">{currentWeather.sunset}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-sm text-blue-100">
          Last updated: {currentWeather.lastUpdated}
        </div>
      </motion.div>

      {/* Hourly Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">24-Hour Forecast</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {hourlyForecast.map((hour, index) => (
            <div key={index} className="flex flex-col items-center min-w-0 flex-shrink-0 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="text-sm text-gray-500 mb-2">{hour.time}</div>
              {getWeatherIcon(hour.icon)}
              <div className="text-lg font-semibold text-gray-900 mt-2">{hour.temp}°</div>
              <div className="text-xs text-blue-600 mt-1">{hour.precipitation}%</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 7-Day Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">7-Day Forecast</h3>
        <div className="space-y-3">
          {weeklyForecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-16 text-sm font-medium text-gray-900">{day.day}</div>
                {getWeatherIcon(day.icon)}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{day.condition}</div>
                  <div className="text-sm text-blue-600">{day.precipitation}% chance of rain</div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{day.high}°</div>
                  <div className="text-sm text-gray-500">{day.low}°</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Risk Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Risk Alerts</h3>
        <div className="space-y-4">
          {riskAlerts.map((alert) => (
            <div key={alert.id} className={`alert-card ${getRiskColor(alert.risk)}`}>
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 mr-3 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{alert.title}</h4>
                    <span className="text-xs font-medium uppercase">{alert.risk} Risk</span>
                  </div>
                  <div className="text-sm mb-2">
                    <strong>Timeframe:</strong> {alert.timeframe}
                  </div>
                  <div className="text-sm mb-3">
                    <strong>Impact:</strong> {alert.impact}
                  </div>
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
                      <Bell className="w-3 h-3 mr-1 inline" />
                      Remind Me
                    </button>
                    <button className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-sm transition-colors">
                      Mark as Addressed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Smart Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Climate-Smart Recommendations</h3>
        <div className="space-y-3">
          {smartRecommendations.map((rec) => (
            <div key={rec.id} className="flex items-start p-4 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                    {rec.priority.toUpperCase()}
                  </span>
                  {rec.completed && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
                <div className="font-medium text-gray-900 mb-1">{rec.action}</div>
                <div className="text-sm text-gray-600 mb-2">{rec.reason}</div>
                <div className="text-sm text-emerald-600">{rec.impact}</div>
              </div>
              <div className="ml-4">
                {!rec.completed ? (
                  <button className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm hover:bg-emerald-200 transition-colors">
                    Mark Complete
                  </button>
                ) : (
                  <span className="text-green-600 text-sm font-medium">Completed</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Historical Data & Farming Calendar */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Historical Weather Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Weather Patterns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historicalData}>
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
              <Area type="monotone" dataKey="thisYear" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="lastYear" stackId="2" stroke="#6b7280" fill="#6b7280" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              <span className="text-gray-600">This Year</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Last Year</span>
            </div>
          </div>
        </motion.div>

        {/* Farming Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather-Optimized Farming Calendar</h3>
          <div className="space-y-3">
            {farmingCalendar.map((item, index) => (
              <div key={index} className="flex items-center p-3 rounded-lg border border-gray-200">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                  <span className="font-bold text-emerald-600">{item.date}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.activity}</div>
                  <div className="text-sm text-gray-500 capitalize">{item.type}</div>
                </div>
                <div className="ml-4">
                  {item.optimal ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Optimal</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-yellow-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Caution</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WeatherClimate;