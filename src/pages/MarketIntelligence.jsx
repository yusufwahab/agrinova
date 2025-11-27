import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, MapPin, 
  Calendar, Bell, Truck, Thermometer, Users,
  MessageCircle, Star, Phone, Mail, Filter,
  Target, Clock, BarChart3, AlertCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MarketIntelligence = () => {
  const [selectedCrop, setSelectedCrop] = useState('tomatoes');
  const [priceAlerts, setPriceAlerts] = useState([]);

  const marketPrices = [
    {
      crop: 'Tomatoes',
      currentPrice: 2.45,
      change: +0.15,
      changePercent: 6.5,
      market: 'Local Farmers Market',
      lastUpdated: '2 hours ago',
      trend: 'up'
    },
    {
      crop: 'Corn',
      currentPrice: 4.20,
      change: -0.08,
      changePercent: -1.9,
      market: 'Commodity Exchange',
      lastUpdated: '1 hour ago',
      trend: 'down'
    },
    {
      crop: 'Lettuce',
      currentPrice: 1.85,
      change: +0.05,
      changePercent: 2.8,
      market: 'Wholesale Market',
      lastUpdated: '3 hours ago',
      trend: 'up'
    },
    {
      crop: 'Carrots',
      currentPrice: 1.20,
      change: 0,
      changePercent: 0,
      market: 'Regional Co-op',
      lastUpdated: '4 hours ago',
      trend: 'stable'
    }
  ];

  const priceHistory = [
    { date: '1/1', tomatoes: 2.20, corn: 4.10, lettuce: 1.70, carrots: 1.15 },
    { date: '1/2', tomatoes: 2.25, corn: 4.15, lettuce: 1.75, carrots: 1.18 },
    { date: '1/3', tomatoes: 2.30, corn: 4.20, lettuce: 1.72, carrots: 1.20 },
    { date: '1/4', tomatoes: 2.35, corn: 4.25, lettuce: 1.78, carrots: 1.22 },
    { date: '1/5', tomatoes: 2.40, corn: 4.28, lettuce: 1.80, carrots: 1.20 },
    { date: '1/6', tomatoes: 2.45, corn: 4.20, lettuce: 1.85, carrots: 1.20 }
  ];

  const demandForecast = [
    { month: 'Feb', demand: 85, supply: 78, price: 2.40 },
    { month: 'Mar', demand: 92, supply: 85, price: 2.55 },
    { month: 'Apr', demand: 88, supply: 90, price: 2.35 },
    { month: 'May', demand: 95, supply: 88, price: 2.65 },
    { month: 'Jun', demand: 100, supply: 95, price: 2.50 }
  ];

  const harvestOptimization = {
    currentCrops: [
      {
        crop: 'Tomatoes',
        zone: 'Zone A',
        plantingDate: '2023-10-15',
        expectedHarvest: '2024-01-20',
        currentMaturity: 85,
        optimalHarvestWindow: '2024-01-18 - 2024-01-25',
        expectedYield: 2400,
        predictedPrice: 2.55,
        estimatedRevenue: 6120,
        recommendation: 'Wait 3 days for optimal pricing'
      },
      {
        crop: 'Corn',
        zone: 'Zone B',
        plantingDate: '2023-09-01',
        expectedHarvest: '2024-01-15',
        currentMaturity: 95,
        optimalHarvestWindow: '2024-01-15 - 2024-01-22',
        expectedYield: 1800,
        predictedPrice: 4.30,
        estimatedRevenue: 7740,
        recommendation: 'Harvest immediately - peak pricing'
      }
    ]
  };

  const buyers = [
    {
      id: 1,
      name: 'Green Valley Co-op',
      type: 'Cooperative',
      location: 'Sacramento, CA',
      distance: '15 miles',
      rating: 4.8,
      crops: ['Tomatoes', 'Lettuce', 'Carrots'],
      priceRange: '$2.20 - $2.60',
      paymentTerms: 'Net 15',
      contact: {
        phone: '(555) 123-4567',
        email: 'buyers@greenvalley.coop'
      },
      lastOrder: '2024-01-10',
      totalVolume: '12,000 lbs'
    },
    {
      id: 2,
      name: 'Fresh Market Distributors',
      type: 'Distributor',
      location: 'San Francisco, CA',
      distance: '45 miles',
      rating: 4.5,
      crops: ['Tomatoes', 'Corn', 'Lettuce'],
      priceRange: '$2.40 - $2.80',
      paymentTerms: 'Net 30',
      contact: {
        phone: '(555) 987-6543',
        email: 'procurement@freshmarket.com'
      },
      lastOrder: '2024-01-08',
      totalVolume: '8,500 lbs'
    },
    {
      id: 3,
      name: 'Local Restaurants Group',
      type: 'Restaurant Chain',
      location: 'Bay Area, CA',
      distance: '25 miles',
      rating: 4.6,
      crops: ['Tomatoes', 'Lettuce', 'Herbs'],
      priceRange: '$2.60 - $3.00',
      paymentTerms: 'Net 7',
      contact: {
        phone: '(555) 456-7890',
        email: 'sourcing@localrestaurants.com'
      },
      lastOrder: '2024-01-12',
      totalVolume: '3,200 lbs'
    }
  ];

  const logistics = [
    {
      id: 1,
      company: 'Farm Fresh Transport',
      type: 'Refrigerated Truck',
      capacity: '5,000 lbs',
      rate: '$0.85/mile',
      rating: 4.7,
      availability: 'Available',
      specialties: ['Cold Chain', 'Organic Certified'],
      contact: '(555) 111-2222'
    },
    {
      id: 2,
      company: 'Valley Logistics',
      type: 'Standard Truck',
      capacity: '8,000 lbs',
      rate: '$0.65/mile',
      rating: 4.4,
      availability: 'Available Tomorrow',
      specialties: ['Bulk Transport', 'Same Day'],
      contact: '(555) 333-4444'
    }
  ];

  const marketNews = [
    {
      id: 1,
      title: 'Organic Produce Demand Surges 15% in Q4',
      summary: 'Consumer preference for organic vegetables continues to drive premium pricing...',
      source: 'AgriNews Today',
      timestamp: '2 hours ago',
      impact: 'positive',
      relevantCrops: ['Tomatoes', 'Lettuce']
    },
    {
      id: 2,
      title: 'New Export Opportunities to Asian Markets',
      summary: 'Trade agreements open new channels for fresh produce exports...',
      source: 'Farm Business Weekly',
      timestamp: '5 hours ago',
      impact: 'positive',
      relevantCrops: ['Corn', 'Soybeans']
    },
    {
      id: 3,
      title: 'Weather Concerns Impact Midwest Corn Prices',
      summary: 'Drought conditions in key growing regions push commodity prices higher...',
      source: 'Commodity Report',
      timestamp: '1 day ago',
      impact: 'neutral',
      relevantCrops: ['Corn']
    }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'border-green-200 bg-green-50';
      case 'negative': return 'border-red-200 bg-red-50';
      default: return 'border-blue-200 bg-blue-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Market Intelligence</h1>
          <p className="text-gray-600 mt-1">Real-time pricing, demand forecasts, and buyer network</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="btn btn-ghost">
            <Bell className="w-4 h-4 mr-2" />
            Price Alerts
          </button>
          <button className="btn btn-primary">
            <Target className="w-4 h-4 mr-2" />
            Find Buyers
          </button>
        </div>
      </div>

      {/* Market Prices Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Current Market Prices</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: 2 hours ago</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {marketPrices.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{item.crop}</h4>
                {getTrendIcon(item.trend)}
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-1">
                ${item.currentPrice}
                <span className="text-sm font-normal text-gray-500">/lb</span>
              </div>
              
              <div className={`text-sm font-medium ${getTrendColor(item.trend)} mb-2`}>
                {item.change > 0 ? '+' : ''}${item.change} ({item.changePercent > 0 ? '+' : ''}{item.changePercent}%)
              </div>
              
              <div className="text-xs text-gray-500">
                <div className="flex items-center mb-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {item.market}
                </div>
                <div>{item.lastUpdated}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Price Trends & Demand Forecast */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Trends (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                formatter={(value) => [`$${value}`, '']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="tomatoes" stroke="#ef4444" strokeWidth={2} name="Tomatoes" />
              <Line type="monotone" dataKey="corn" stroke="#f59e0b" strokeWidth={2} name="Corn" />
              <Line type="monotone" dataKey="lettuce" stroke="#10b981" strokeWidth={2} name="Lettuce" />
              <Line type="monotone" dataKey="carrots" stroke="#3b82f6" strokeWidth={2} name="Carrots" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Demand Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demandForecast}>
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
              <Bar dataKey="demand" fill="#10b981" name="Demand" />
              <Bar dataKey="supply" fill="#3b82f6" name="Supply" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Harvest Timing Optimizer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Harvest Timing Optimizer</h3>
        
        <div className="space-y-6">
          {harvestOptimization.currentCrops.map((crop, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">{crop.crop}</h4>
                  <p className="text-gray-600">{crop.zone} • Planted {crop.plantingDate}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">
                    ${crop.estimatedRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Estimated Revenue</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Maturity Status</h5>
                  <div className="relative">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${crop.currentMaturity}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{crop.currentMaturity}% mature</div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Optimal Window</h5>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center mb-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      {crop.optimalHarvestWindow}
                    </div>
                    <div>Expected: {crop.expectedYield.toLocaleString()} lbs</div>
                    <div>Price: ${crop.predictedPrice}/lb</div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-3">AI Recommendation</h5>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start">
                      <Target className="w-4 h-4 text-blue-600 mr-2 mt-0.5" />
                      <span className="text-sm text-blue-800">{crop.recommendation}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Buyer Network */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Buyer Network</h3>
          <div className="flex items-center space-x-3">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
              <option>All Crops</option>
              <option>Tomatoes</option>
              <option>Corn</option>
              <option>Lettuce</option>
            </select>
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buyers.map((buyer) => (
            <div key={buyer.id} className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{buyer.name}</h4>
                  <p className="text-sm text-gray-600">{buyer.type}</p>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900 ml-1">{buyer.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {buyer.location} ({buyer.distance})
                </div>
                <div>Price Range: {buyer.priceRange}</div>
                <div>Payment: {buyer.paymentTerms}</div>
                <div>Volume: {buyer.totalVolume}</div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {buyer.crops.map((crop, index) => (
                  <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                    {crop}
                  </span>
                ))}
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm hover:bg-emerald-200 transition-colors">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Message
                </button>
                <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Logistics & Market News */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Logistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Logistics Partners</h3>
          <div className="space-y-4">
            {logistics.map((provider) => (
              <div key={provider.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{provider.company}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    provider.availability === 'Available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {provider.availability}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div>
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-1" />
                      {provider.type}
                    </div>
                    <div>Capacity: {provider.capacity}</div>
                  </div>
                  <div>
                    <div>Rate: {provider.rate}</div>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      {provider.rating}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {provider.specialties.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>

                <button className="w-full btn-secondary text-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact: {provider.contact}
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Market News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market News & Insights</h3>
          <div className="space-y-4">
            {marketNews.map((news) => (
              <div key={news.id} className={`border rounded-lg p-4 ${getImpactColor(news.impact)}`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm leading-tight">{news.title}</h4>
                  <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{news.timestamp}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{news.summary}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {news.relevantCrops.map((crop, index) => (
                      <span key={index} className="px-2 py-1 bg-white bg-opacity-50 text-xs rounded-full">
                        {crop}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">{news.source}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketIntelligence;