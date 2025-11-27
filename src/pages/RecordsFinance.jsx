import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, Plus, TrendingUp, TrendingDown, 
  Receipt, Download, Calendar, Filter, Search,
  PieChart, BarChart3, FileText, CreditCard,
  Banknote, ShoppingCart, Tractor, Sprout
} from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RecordsFinance = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddRevenue, setShowAddRevenue] = useState(false);

  const financialSummary = {
    totalRevenue: 125000,
    totalExpenses: 87500,
    netProfit: 37500,
    roi: 42.8
  };

  const expenseCategories = [
    { name: 'Seeds & Plants', amount: 15000, color: '#10b981', percentage: 17.1 },
    { name: 'Fertilizers', amount: 22000, color: '#3b82f6', percentage: 25.1 },
    { name: 'Labor', amount: 18000, color: '#f59e0b', percentage: 20.6 },
    { name: 'Equipment', amount: 12000, color: '#ef4444', percentage: 13.7 },
    { name: 'Fuel & Energy', amount: 8500, color: '#8b5cf6', percentage: 9.7 },
    { name: 'Insurance', amount: 6000, color: '#06b6d4', percentage: 6.9 },
    { name: 'Other', amount: 6000, color: '#84cc16', percentage: 6.9 }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'expense',
      category: 'Fertilizers',
      description: 'Organic Compost - 50 bags',
      amount: 750,
      date: '2024-01-15',
      receipt: true
    },
    {
      id: 2,
      type: 'revenue',
      category: 'Crop Sales',
      description: 'Tomato harvest - Local Market',
      amount: 2400,
      date: '2024-01-14',
      receipt: false
    },
    {
      id: 3,
      type: 'expense',
      category: 'Equipment',
      description: 'Irrigation system repair',
      amount: 320,
      date: '2024-01-13',
      receipt: true
    },
    {
      id: 4,
      type: 'revenue',
      category: 'Livestock',
      description: 'Milk sales - Dairy Co-op',
      amount: 1800,
      date: '2024-01-12',
      receipt: false
    },
    {
      id: 5,
      type: 'expense',
      category: 'Seeds & Plants',
      description: 'Corn seeds - Spring planting',
      amount: 450,
      date: '2024-01-11',
      receipt: true
    }
  ];

  const monthlyData = [
    { month: 'Jul', revenue: 18000, expenses: 12000, profit: 6000 },
    { month: 'Aug', revenue: 22000, expenses: 14000, profit: 8000 },
    { month: 'Sep', revenue: 25000, expenses: 15000, profit: 10000 },
    { month: 'Oct', revenue: 28000, expenses: 16000, profit: 12000 },
    { month: 'Nov', revenue: 16000, expenses: 15000, profit: 1000 },
    { month: 'Dec', revenue: 16000, expenses: 15500, profit: 500 }
  ];

  const cropProfitability = [
    { crop: 'Tomatoes', revenue: 45000, expenses: 28000, profit: 17000, margin: 37.8 },
    { crop: 'Corn', revenue: 32000, expenses: 22000, profit: 10000, margin: 31.3 },
    { crop: 'Lettuce', revenue: 28000, expenses: 20000, profit: 8000, margin: 28.6 },
    { crop: 'Carrots', revenue: 20000, expenses: 17500, profit: 2500, margin: 12.5 }
  ];

  const loanEligibility = {
    score: 78,
    factors: [
      { name: 'Credit History', score: 85, status: 'good' },
      { name: 'Cash Flow', score: 72, status: 'fair' },
      { name: 'Debt-to-Income', score: 80, status: 'good' },
      { name: 'Farm Assets', score: 75, status: 'good' }
    ],
    recommendations: [
      'Improve cash flow consistency',
      'Reduce existing debt by 10%',
      'Maintain current credit practices'
    ]
  };

  const harvestRecords = [
    {
      id: 1,
      crop: 'Tomatoes',
      zone: 'Zone A',
      quantity: 2400,
      unit: 'lbs',
      quality: 'Grade A',
      date: '2024-01-10',
      pricePerUnit: 2.50
    },
    {
      id: 2,
      crop: 'Corn',
      zone: 'Zone B',
      quantity: 1800,
      unit: 'bushels',
      quality: 'Grade A',
      date: '2024-01-08',
      pricePerUnit: 4.20
    },
    {
      id: 3,
      crop: 'Lettuce',
      zone: 'Zone C',
      quantity: 800,
      unit: 'heads',
      quality: 'Grade B',
      date: '2024-01-05',
      pricePerUnit: 1.80
    }
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Records & Finance</h1>
          <p className="text-gray-600 mt-1">Track expenses, revenue, and farm profitability</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button 
            onClick={() => setShowAddExpense(true)}
            className="btn btn-ghost"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </button>
          <button 
            onClick={() => setShowAddRevenue(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Revenue
          </button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="metric-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${financialSummary.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+12% from last year</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
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
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-3xl font-bold text-gray-900">${financialSummary.totalExpenses.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600 ml-1">+8% from last year</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Receipt className="w-6 h-6 text-red-600" />
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
              <p className="text-sm font-medium text-gray-600">Net Profit</p>
              <p className="text-3xl font-bold text-gray-900">${financialSummary.netProfit.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+18% from last year</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Banknote className="w-6 h-6 text-emerald-600" />
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
              <p className="text-sm font-medium text-gray-600">ROI</p>
              <p className="text-3xl font-bold text-gray-900">{financialSummary.roi}%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 ml-1">+5.2% from last year</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'expenses', name: 'Expenses', icon: Receipt },
              { id: 'revenue', name: 'Revenue', icon: DollarSign },
              { id: 'reports', name: 'Reports', icon: FileText },
              { id: 'loans', name: 'Loans & Credit', icon: CreditCard },
              { id: 'harvest', name: 'Harvest Records', icon: Sprout }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Expense Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Breakdown</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={expenseCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="amount"
                      >
                        {expenseCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {expenseCategories.map((item, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-600 truncate">{item.name}</span>
                        <span className="ml-auto font-medium">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly Profit/Loss */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Profit & Loss</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, '']}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                      <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                      <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    View All
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {transaction.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <span className={transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'}>
                              {transaction.type === 'revenue' ? '+' : '-'}${transaction.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {transaction.receipt ? (
                              <Receipt className="w-4 h-4 text-green-500" />
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              {/* Crop Profitability */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Profitability Analysis</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Crop
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Expenses
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Profit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Margin
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cropProfitability.map((crop, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {crop.crop}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${crop.revenue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${crop.expenses.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            ${crop.profit.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {crop.margin}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Export Options */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Export Reports</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                    <Download className="w-5 h-5 mr-2 text-emerald-600" />
                    <span className="font-medium">Profit & Loss Statement</span>
                  </button>
                  <button className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                    <Download className="w-5 h-5 mr-2 text-emerald-600" />
                    <span className="font-medium">Expense Report</span>
                  </button>
                  <button className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-colors">
                    <Download className="w-5 h-5 mr-2 text-emerald-600" />
                    <span className="font-medium">Tax Summary</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'loans' && (
            <div className="space-y-6">
              {/* Loan Eligibility Score */}
              <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Loan Eligibility Score</h3>
                    <p className="text-gray-600">Based on your farm's financial health</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-600">{loanEligibility.score}</div>
                    <div className="text-sm text-gray-600">out of 100</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Score Factors</h4>
                    <div className="space-y-4">
                      {loanEligibility.factors.map((factor, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{factor.name}</span>
                              <span className={`text-sm font-semibold ${getScoreColor(factor.score)}`}>
                                {factor.score}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${factor.score}%` }}
                              />
                            </div>
                          </div>
                          <span className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(factor.status)}`}>
                            {factor.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Improvement Recommendations</h4>
                    <ul className="space-y-2">
                      {loanEligibility.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Loan Applications */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Applications</h3>
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No active loan applications</p>
                  <button className="btn-primary">
                    Apply for Farm Loan
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'harvest' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Harvest Records</h3>
                <button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Log Harvest
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Crop
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Zone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quality
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price/Unit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {harvestRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {record.crop}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.zone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {record.quantity.toLocaleString()} {record.unit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                            {record.quality}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${record.pricePerUnit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          ${(record.quantity * record.pricePerUnit).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordsFinance;