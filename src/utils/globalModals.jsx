// Global modal content for all pages
export const getGlobalModalTitle = (modalType) => {
  const titles = {
    // Weather & Climate
    weatherForecast: 'Extended Weather Forecast',
    riskAlerts: 'Weather Risk Management',
    climateRecommendations: 'Climate-Smart Recommendations',
    
    // Soil Analysis
    uploadSoil: 'Soil Sample Analysis',
    soilReports: 'Soil Health Reports',
    nutrientAnalysis: 'Nutrient Level Analysis',
    
    // Records & Finance
    addExpense: 'Add New Expense',
    addRevenue: 'Record Revenue',
    generateReport: 'Generate Financial Report',
    loanEligibility: 'Loan Eligibility Assessment',
    
    // Market Intelligence
    viewPrices: 'Current Market Prices',
    findBuyers: 'Connect with Buyers',
    harvestTiming: 'Harvest Timing Optimizer',
    marketNews: 'Market News & Insights',
    
    // Community
    createPost: 'Share with Community',
    joinGroup: 'Join Discussion Groups',
    askQuestion: 'Ask the Community',
    
    // Settings
    farmSetup: 'Farm Configuration',
    notifications: 'Notification Preferences',
    security: 'Security Settings',
    integrations: 'Third-party Integrations',
    
    // Success Messages
    expenseSuccess: 'Expense Saved Successfully',
    revenueSuccess: 'Revenue Recorded Successfully'
  };
  return titles[modalType] || 'Information';
};

export const renderGlobalModalContent = (modalType, closeModal, openModal) => {
  switch (modalType) {
    case 'weatherForecast':
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-blue-900 mb-2">Hyper-Local Weather Intelligence</h4>
            <p className="text-sm text-blue-700">AI-powered forecasts with precision farming recommendations</p>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[
              { day: 'Mon', temp: 78, icon: '☀️', rain: 0, wind: '5 mph' },
              { day: 'Tue', temp: 82, icon: '⛅', rain: 10, wind: '8 mph' },
              { day: 'Wed', temp: 75, icon: '🌧️', rain: 80, wind: '12 mph' },
              { day: 'Thu', temp: 73, icon: '🌧️', rain: 70, wind: '10 mph' },
              { day: 'Fri', temp: 79, icon: '☀️', rain: 0, wind: '6 mph' },
              { day: 'Sat', temp: 81, icon: '☀️', rain: 5, wind: '4 mph' },
              { day: 'Sun', temp: 84, icon: '☀️', rain: 0, wind: '7 mph' }
            ].map((forecast, index) => (
              <div key={forecast.day} className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="text-sm font-medium text-gray-900">{forecast.day}</div>
                <div className="text-2xl my-2">{forecast.icon}</div>
                <div className="text-sm font-bold text-gray-900">{forecast.temp}°F</div>
                <div className="text-xs text-blue-600">{forecast.rain}% rain</div>
                <div className="text-xs text-gray-500">{forecast.wind}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">🌱 Planting Window</h4>
              <p className="text-sm text-green-700">Optimal: Friday-Sunday (dry conditions, moderate temps)</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">💧 Irrigation Alert</h4>
              <p className="text-sm text-yellow-700">Skip Wed-Thu watering (heavy rain expected)</p>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">📊 Weekly Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>Avg Temp: <span className="font-bold">78°F</span></div>
              <div>Total Rain: <span className="font-bold">2.1 inches</span></div>
              <div>Sunny Days: <span className="font-bold">4 of 7</span></div>
            </div>
          </div>
        </div>
      );

    case 'uploadSoil':
      return (
        <div className="space-y-4">
          <div className="bg-emerald-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-emerald-900 mb-2">🧪 AI Soil Laboratory</h4>
            <p className="text-sm text-emerald-700">Get lab-quality results in seconds with computer vision analysis</p>
          </div>
          <div className="border-2 border-dashed border-emerald-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
            <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl">📷</span>
            </div>
            <p className="text-gray-700 mb-2 font-medium">Upload Soil Sample Photo</p>
            <p className="text-sm text-gray-500 mb-4">Drag & drop or click to select • JPG, PNG up to 10MB</p>
            <div className="bg-gray-100 rounded-lg p-3 text-xs text-gray-600">
              💡 Best results: Clear lighting, 6-inch soil depth, remove debris
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📊 Analysis Results</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• pH Level: 6.8 (Optimal)</li>
                <li>• Nitrogen: 45 ppm (Medium)</li>
                <li>• Phosphorus: 78 ppm (High)</li>
                <li>• Potassium: 120 ppm (Low)</li>
                <li>• Organic Matter: 3.2%</li>
              </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">🎯 Recommendations</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Add potassium fertilizer</li>
                <li>• Maintain current pH</li>
                <li>• Consider cover crops</li>
                <li>• Retest in 3 months</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">Analyze Sample</button>
          </div>
        </div>
      );

    case 'addExpense':
      return (
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-red-900 mb-2">💰 Expense Tracker</h4>
            <p className="text-sm text-red-700">Smart categorization with tax deduction optimization</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="e.g., Organic fertilizer purchase" defaultValue="John Deere tractor maintenance" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" defaultValue="Equipment">
                <option value="">Select category</option>
                <option value="Seeds">Seeds & Plants ($2,450 YTD)</option>
                <option value="Fertilizers">Fertilizers ($3,200 YTD)</option>
                <option value="Equipment">Equipment ($8,900 YTD)</option>
                <option value="Labor">Labor ($12,500 YTD)</option>
                <option value="Utilities">Utilities ($1,800 YTD)</option>
                <option value="Feed">Animal Feed ($4,100 YTD)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input type="number" className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="0.00" defaultValue="450.00" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" defaultValue="2024-01-15" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Receipt Upload</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <span className="text-2xl mb-2 block">📄</span>
              <p className="text-sm text-gray-500">Drag receipt or click to upload</p>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">💡 Tax Deductible:</span>
              <span className="font-bold text-green-900">Yes (100%)</span>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
            <button onClick={() => { closeModal(); openModal('expenseSuccess'); }} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">Save Expense</button>
          </div>
        </div>
      );

    case 'addRevenue':
      return (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-green-900 mb-2">💵 Revenue Tracker</h4>
            <p className="text-sm text-green-700">Record farm income with automatic profit calculations</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Revenue Source *</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" defaultValue="Crop Sales">
                <option value="">Select source</option>
                <option value="Crop Sales">Crop Sales (Vegetables, Grains)</option>
                <option value="Livestock Sales">Livestock Sales (Cattle, Poultry)</option>
                <option value="Dairy Products">Dairy Products (Milk, Cheese)</option>
                <option value="Eggs">Egg Sales</option>
                <option value="Agritourism">Agritourism & Tours</option>
                <option value="Equipment Rental">Equipment Rental</option>
                <option value="Consulting">Consulting Services</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="e.g., Tomato harvest - Local market" defaultValue="Organic tomato sales to Green Valley Market" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="e.g., 500" defaultValue="1200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" defaultValue="lbs">
                <option value="lbs">Pounds (lbs)</option>
                <option value="kg">Kilograms (kg)</option>
                <option value="bushels">Bushels</option>
                <option value="tons">Tons</option>
                <option value="gallons">Gallons</option>
                <option value="heads">Heads/Units</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per Unit *</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input type="number" step="0.01" className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="0.00" defaultValue="2.50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount *</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input type="number" className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 bg-gray-50" placeholder="0.00" defaultValue="3000.00" readOnly />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Buyer/Customer</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="e.g., Green Valley Market" defaultValue="Green Valley Market" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sale Date *</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" defaultValue="2024-01-15" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">📈 Revenue Analytics</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">This Month:</span>
                  <span className="font-bold text-blue-900">$18,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">YTD Total:</span>
                  <span className="font-bold text-blue-900">$125,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Avg/Sale:</span>
                  <span className="font-bold text-blue-900">$2,840</span>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">🎯 Market Insights</h4>
              <div className="space-y-1 text-sm text-yellow-700">
                <div>• Tomato prices up 15% this month</div>
                <div>• Peak demand season approaching</div>
                <div>• Consider premium pricing for organic</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-700">📊 Profit Margin:</span>
              <span className="font-bold text-green-900">68% (Above average)</span>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
            <button onClick={() => { closeModal(); openModal('revenueSuccess'); }} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">Record Revenue</button>
          </div>
        </div>
      );

    case 'viewPrices':
      return (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-green-900 mb-2">📈 Live Market Data</h4>
            <p className="text-sm text-green-700">Real-time commodity prices updated every 15 minutes</p>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Corn', price: '$4.85', unit: '/bushel', change: '+2.3%', trend: 'up', volume: '2.1M bu' },
              { name: 'Soybeans', price: '$12.45', unit: '/bushel', change: '-1.2%', trend: 'down', volume: '890K bu' },
              { name: 'Wheat', price: '$6.20', unit: '/bushel', change: '+0.8%', trend: 'up', volume: '1.5M bu' },
              { name: 'Milk', price: '$18.50', unit: '/cwt', change: '+1.5%', trend: 'up', volume: '45K cwt' }
            ].map((commodity, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-white border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xl">{index === 0 ? '🌽' : index === 1 ? '🫘' : index === 2 ? '🌾' : '🥛'}</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{commodity.name}</div>
                    <div className="text-sm text-gray-500">Volume: {commodity.volume}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">{commodity.price}<span className="text-sm font-normal">{commodity.unit}</span></div>
                  <div className={`text-sm font-medium ${commodity.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {commodity.trend === 'up' ? '↗' : '↘'} {commodity.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">🎯 Market Insights</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Corn prices rising due to export demand surge</li>
              <li>• Optimal selling window: Next 2-3 weeks</li>
              <li>• Weather concerns supporting grain prices</li>
            </ul>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">Close</button>
            <button onClick={() => openModal('priceAlerts')} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">Set Price Alerts</button>
          </div>
        </div>
      );

    case 'findBuyers':
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-blue-900 mb-2">🤝 Buyer Network</h4>
            <p className="text-sm text-blue-700">Connect with verified buyers in your region</p>
          </div>
          <div className="space-y-4">
            {[
              { 
                name: 'Green Valley Co-op', 
                distance: '12 miles', 
                rating: 4.8, 
                specialties: ['Organic Vegetables', 'Grains'], 
                contact: '(555) 123-4567',
                lastOrder: '$15,000 - Tomatoes',
                paymentTerms: 'Net 30 days',
                verified: true
              },
              { 
                name: 'Farm Fresh Distributors', 
                distance: '18 miles', 
                rating: 4.6, 
                specialties: ['Dairy Products', 'Eggs'], 
                contact: '(555) 987-6543',
                lastOrder: '$8,500 - Milk',
                paymentTerms: 'Net 15 days',
                verified: true
              },
              { 
                name: 'Regional Grain Elevator', 
                distance: '25 miles', 
                rating: 4.9, 
                specialties: ['Corn', 'Soybeans', 'Wheat'], 
                contact: '(555) 456-7890',
                lastOrder: '$22,000 - Corn',
                paymentTerms: 'Cash on delivery',
                verified: true
              }
            ].map((buyer, index) => (
              <div key={index} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{buyer.name}</h4>
                      {buyer.verified && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">✓ Verified</span>}
                    </div>
                    <div className="text-sm text-gray-500">{buyer.distance} away • ⭐ {buyer.rating}/5.0</div>
                  </div>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm">Contact</button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 mb-1">Specialties:</div>
                    <div className="flex flex-wrap gap-1">
                      {buyer.specialties.map((specialty, i) => (
                        <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">{specialty}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Last Order:</div>
                    <div className="font-medium">{buyer.lastOrder}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Contact:</div>
                    <div className="font-medium">{buyer.contact}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 mb-1">Payment Terms:</div>
                    <div className="font-medium">{buyer.paymentTerms}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-900 mb-2">💡 Tips for Success</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Verify quality standards before committing to sales</li>
              <li>• Negotiate payment terms that work for your cash flow</li>
              <li>• Build long-term relationships with reliable buyers</li>
              <li>• Keep detailed records of all transactions</li>
            </ul>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">Close</button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Add New Buyer</button>
          </div>
        </div>
      );

    case 'priceAlerts':
      return (
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-orange-900 mb-2">🔔 Price Alert System</h4>
            <p className="text-sm text-orange-700">Get notified when commodity prices hit your target levels</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Commodity</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                <option>Corn</option>
                <option>Soybeans</option>
                <option>Wheat</option>
                <option>Milk</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                <option>Price Above</option>
                <option>Price Below</option>
                <option>Price Change %</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Price</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input type="number" step="0.01" className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="5.00" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notification Method</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                <option>Email + SMS</option>
                <option>Email Only</option>
                <option>SMS Only</option>
                <option>Push Notification</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Active Price Alerts</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <div>
                  <div className="font-medium">Corn - Above $5.00/bushel</div>
                  <div className="text-sm text-gray-500">Current: $4.85 • Email + SMS</div>
                </div>
                <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
              </div>
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <div>
                  <div className="font-medium">Soybeans - Below $12.00/bushel</div>
                  <div className="text-sm text-gray-500">Current: $12.45 • Email Only</div>
                </div>
                <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">📈 Market Trends</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-blue-700">Corn trend: ↗ Bullish</div>
                <div className="text-blue-700">Resistance: $5.20</div>
              </div>
              <div>
                <div className="text-blue-700">Soybeans trend: ↘ Bearish</div>
                <div className="text-blue-700">Support: $11.80</div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg">Create Alert</button>
          </div>
        </div>
      );

    case 'createPost':
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-blue-900 mb-2">👥 Community Sharing</h4>
            <p className="text-sm text-blue-700">Connect with 15,000+ farmers worldwide</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Post Type</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 mb-4" defaultValue="Question">
              <option value="Question">❓ Question (Get help from community)</option>
              <option value="Success">🎉 Success Story (Share your wins)</option>
              <option value="Alert">⚠️ Alert (Warn about issues)</option>
              <option value="Tip">💡 Tip (Share knowledge)</option>
              <option value="Sale">💰 Equipment Sale</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 mb-4" placeholder="What's on your mind?" defaultValue="Best organic pest control for tomatoes?" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="Share details, ask questions, or provide helpful information..." defaultValue="I'm dealing with aphids on my tomato plants and looking for organic solutions. What has worked best for you? I've tried neem oil but results are mixed."></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="organic, pest-control, tomatoes" defaultValue="organic, pest-control, tomatoes" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location (Optional)</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500" placeholder="Your region" defaultValue="California, USA" />
            </div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-sm text-yellow-700">💡 Posts with photos get 3x more responses!</p>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button onClick={closeModal} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">Post to Community</button>
          </div>
        </div>
      );

    case 'expenseSuccess':
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Expense Saved Successfully!</h3>
          <p className="text-gray-600 mb-6">Your expense has been recorded and added to your financial records.</p>
          <button onClick={closeModal} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">Close</button>
        </div>
      );

    case 'revenueSuccess':
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-2xl">✅</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Recorded Successfully!</h3>
          <p className="text-gray-600 mb-6">Your revenue has been recorded and added to your financial records.</p>
          <button onClick={closeModal} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg">Close</button>
        </div>
      );

    default:
      return (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🚧</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Feature In Development</h3>
          <p className="text-gray-600">This {modalType} feature is being built with advanced functionality and will be available soon.</p>
        </div>
      );
  }
};