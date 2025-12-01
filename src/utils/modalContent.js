// Modal content configurations for different pages and actions
export const modalContent = {
  // Dashboard modals
  dashboard: {
    viewWeatherDetails: {
      title: "Weather Forecast Details",
      content: {
        current: { temp: "72°F", humidity: "65%", windSpeed: "8 mph", pressure: "30.12 inHg" },
        forecast: [
          { day: "Today", high: "78°F", low: "65°F", condition: "Partly Cloudy", precipitation: "10%" },
          { day: "Tomorrow", high: "82°F", low: "68°F", condition: "Sunny", precipitation: "0%" },
          { day: "Wednesday", high: "75°F", low: "62°F", condition: "Light Rain", precipitation: "70%" }
        ],
        alerts: ["Frost warning for early morning", "High wind advisory 3-6 PM"]
      }
    },
    viewCropHealth: {
      title: "Crop Health Analysis",
      content: {
        overall: "Excellent",
        details: [
          { field: "North Field", crop: "Corn", health: "95%", issues: "None detected" },
          { field: "South Field", crop: "Soybeans", health: "88%", issues: "Minor nutrient deficiency" },
          { field: "East Field", crop: "Wheat", health: "92%", issues: "Slight pest activity" }
        ],
        recommendations: [
          "Apply nitrogen fertilizer to South Field",
          "Monitor pest levels in East Field",
          "Continue current care routine for North Field"
        ]
      }
    },
    quickActions: {
      title: "Quick Actions",
      content: {
        actions: [
          { name: "Schedule Irrigation", description: "Set up automated watering schedule", icon: "💧" },
          { name: "Order Supplies", description: "Restock fertilizers and seeds", icon: "📦" },
          { name: "Book Veterinarian", description: "Schedule livestock health check", icon: "🏥" },
          { name: "Market Analysis", description: "Check current crop prices", icon: "📈" }
        ]
      }
    }
  },

  // Farm Monitor modals
  farmMonitor: {
    uploadPhoto: {
      title: "AI Crop Analysis",
      content: {
        instructions: "Upload a clear photo of your crops for AI-powered analysis",
        supportedFormats: ["JPG", "PNG", "HEIC"],
        maxSize: "10MB",
        tips: [
          "Ensure good lighting for accurate analysis",
          "Include affected areas in the frame",
          "Take photos during daylight hours",
          "Avoid blurry or distant shots"
        ]
      }
    },
    setupMonitoring: {
      title: "Live Monitoring Setup",
      content: {
        steps: [
          "Connect your IoT sensors to the network",
          "Configure monitoring zones in your farm",
          "Set alert thresholds for temperature, humidity, and soil moisture",
          "Test camera feeds and positioning"
        ],
        requirements: [
          "Stable internet connection",
          "Compatible IoT devices",
          "Power supply for sensors",
          "Mobile app for notifications"
        ]
      }
    },
    viewAlerts: {
      title: "Alert Management",
      content: {
        active: [
          { type: "Pest Detection", severity: "High", location: "Field A-3", time: "2 hours ago" },
          { type: "Disease Risk", severity: "Medium", location: "Greenhouse 2", time: "5 hours ago" }
        ],
        resolved: [
          { type: "Nutrient Deficiency", severity: "Low", location: "Field B-1", resolved: "Yesterday" }
        ]
      }
    }
  },

  // Weather & Climate modals
  weather: {
    viewForecast: {
      title: "Extended Weather Forecast",
      content: {
        sevenDay: [
          { day: "Mon", high: 78, low: 65, condition: "Sunny", rain: 0 },
          { day: "Tue", high: 82, low: 68, condition: "Partly Cloudy", rain: 10 },
          { day: "Wed", high: 75, low: 62, condition: "Rainy", rain: 80 },
          { day: "Thu", high: 73, low: 60, condition: "Cloudy", rain: 40 },
          { day: "Fri", high: 79, low: 66, condition: "Sunny", rain: 0 },
          { day: "Sat", high: 81, low: 69, condition: "Partly Cloudy", rain: 20 },
          { day: "Sun", high: 84, low: 71, condition: "Sunny", rain: 0 }
        ],
        farmingTips: [
          "Perfect conditions for planting this weekend",
          "Plan indoor activities for Wednesday",
          "Good drying conditions Friday-Sunday"
        ]
      }
    },
    riskAlerts: {
      title: "Weather Risk Management",
      content: {
        currentRisks: [
          { type: "Frost Warning", probability: "High", timeframe: "Tonight", action: "Cover sensitive plants" },
          { type: "Heavy Rain", probability: "Medium", timeframe: "Wednesday", action: "Ensure proper drainage" }
        ],
        preventiveMeasures: [
          "Install frost protection systems",
          "Improve field drainage",
          "Secure loose equipment",
          "Update emergency contacts"
        ]
      }
    }
  },

  // Soil Analysis modals
  soil: {
    uploadSample: {
      title: "Soil Sample Analysis",
      content: {
        instructions: "Upload a photo of your soil sample for instant AI analysis",
        preparation: [
          "Collect soil from 6-8 inches deep",
          "Remove debris and organic matter",
          "Take photo in natural light",
          "Include a reference object for scale"
        ],
        analysisIncludes: ["pH Level", "Nutrient Content", "Organic Matter", "Soil Texture", "Moisture Level"]
      }
    },
    viewReports: {
      title: "Soil Health Reports",
      content: {
        latestReport: {
          date: "January 15, 2024",
          pH: 6.8,
          nitrogen: "Medium",
          phosphorus: "High",
          potassium: "Low",
          organicMatter: "15%"
        },
        recommendations: [
          "Apply potassium-rich fertilizer",
          "Maintain current pH levels",
          "Consider cover crops for nitrogen",
          "Test again in 3 months"
        ]
      }
    }
  },

  // Livestock Manager modals
  livestock: {
    addAnimal: {
      title: "Add New Animal",
      content: {
        form: [
          { field: "Name", type: "text", required: true },
          { field: "Species", type: "select", options: ["Cattle", "Poultry", "Swine", "Sheep", "Goats"] },
          { field: "Breed", type: "text", required: true },
          { field: "Birth Date", type: "date", required: true },
          { field: "Weight", type: "number", unit: "lbs" },
          { field: "Ear Tag", type: "text", required: true },
          { field: "Photo", type: "file", accept: "image/*" }
        ]
      }
    },
    healthCheck: {
      title: "AI Health Assessment",
      content: {
        selectedAnimals: [
          { name: "Bessie", id: "C001", species: "Cattle", lastCheck: "2 weeks ago" },
          { name: "Charlie", id: "P015", species: "Poultry", lastCheck: "1 week ago" },
          { name: "Wilbur", id: "S003", species: "Swine", lastCheck: "3 days ago" }
        ],
        checklistItems: [
          { item: "Temperature check", status: "normal", value: "101.5°F" },
          { item: "Appetite assessment", status: "good", value: "Eating normally" },
          { item: "Mobility evaluation", status: "excellent", value: "Active movement" },
          { item: "Coat/feather condition", status: "good", value: "Healthy appearance" },
          { item: "Eye and nose examination", status: "normal", value: "Clear, no discharge" },
          { item: "Weight measurement", status: "stable", value: "1,250 lbs (+5 lbs)" }
        ],
        aiRecommendations: [
          "Continue current feeding schedule",
          "Monitor weight gain trend",
          "Schedule vaccination in 2 weeks",
          "Increase exercise for optimal health"
        ],
        alerts: [
          { type: "info", message: "All animals showing healthy vital signs" },
          { type: "warning", message: "Charlie due for deworming next week" }
        ]
      }
    },
    vaccination: {
      title: "Vaccination Schedule",
      content: {
        upcoming: [
          { animal: "Bessie", vaccine: "Annual Booster", due: "Feb 15, 2024" },
          { animal: "Charlie", vaccine: "Deworming", due: "Jan 20, 2024" },
          { animal: "Henrietta", vaccine: "Newcastle Disease", due: "Mar 1, 2024" }
        ],
        completed: [
          { animal: "Wilbur", vaccine: "Swine Flu", completed: "Dec 10, 2023" }
        ]
      }
    }
  },

  // Records & Finance modals
  finance: {
    addExpense: {
      title: "Add New Expense",
      content: {
        categories: ["Seeds & Plants", "Fertilizers", "Equipment", "Labor", "Utilities", "Veterinary", "Feed", "Other"],
        form: [
          { field: "Description", type: "text", required: true },
          { field: "Category", type: "select", required: true },
          { field: "Amount", type: "number", required: true },
          { field: "Date", type: "date", required: true },
          { field: "Receipt", type: "file", accept: "image/*,application/pdf" }
        ]
      }
    },
    addRevenue: {
      title: "Record Revenue",
      content: {
        sources: ["Crop Sales", "Livestock Sales", "Dairy Products", "Eggs", "Agritourism", "Consulting", "Other"],
        form: [
          { field: "Source", type: "select", required: true },
          { field: "Amount", type: "number", required: true },
          { field: "Quantity", type: "number" },
          { field: "Unit Price", type: "number" },
          { field: "Buyer", type: "text" },
          { field: "Date", type: "date", required: true }
        ]
      }
    },
    generateReport: {
      title: "Generate Financial Report",
      content: {
        reportTypes: [
          { name: "Profit & Loss Statement", description: "Comprehensive income and expense analysis" },
          { name: "Cash Flow Report", description: "Track money in and out of your farm" },
          { name: "Crop Profitability", description: "Analyze profitability by crop type" },
          { name: "Tax Summary", description: "Prepare for tax season with organized records" }
        ],
        dateRanges: ["Last 30 Days", "Last Quarter", "Last Year", "Custom Range"]
      }
    }
  },

  // Market Intelligence modals
  market: {
    viewPrices: {
      title: "Current Market Prices",
      content: {
        commodities: [
          { name: "Corn", price: "$4.85/bushel", change: "+2.3%", trend: "up" },
          { name: "Soybeans", price: "$12.45/bushel", change: "-1.2%", trend: "down" },
          { name: "Wheat", price: "$6.20/bushel", change: "+0.8%", trend: "up" },
          { name: "Milk", price: "$18.50/cwt", change: "+1.5%", trend: "up" }
        ],
        lastUpdated: "2 minutes ago",
        marketTrends: "Corn prices rising due to export demand. Soybean futures declining on weather forecasts."
      }
    },
    findBuyers: {
      title: "Connect with Buyers",
      content: {
        nearbyBuyers: [
          { name: "Green Valley Co-op", distance: "12 miles", rating: 4.8, specialties: ["Corn", "Soybeans"] },
          { name: "Farm Fresh Distributors", distance: "18 miles", rating: 4.6, specialties: ["Organic Produce"] },
          { name: "Regional Grain Elevator", distance: "25 miles", rating: 4.9, specialties: ["Wheat", "Corn"] }
        ],
        requirements: "Verify quality standards and delivery requirements before committing to sales."
      }
    }
  },

  // Community modals
  community: {
    createPost: {
      title: "Share with Community",
      content: {
        postTypes: ["Question", "Success Story", "Alert", "Tip", "Equipment Sale"],
        guidelines: [
          "Be respectful and helpful",
          "Share accurate information",
          "Include relevant photos when possible",
          "Use appropriate tags for better visibility"
        ]
      }
    },
    joinGroup: {
      title: "Join Discussion Groups",
      content: {
        groups: [
          { name: "Organic Farming", members: 1250, description: "Sustainable farming practices and certification" },
          { name: "Livestock Health", members: 890, description: "Animal care and veterinary discussions" },
          { name: "Market Updates", members: 2100, description: "Price alerts and trading opportunities" },
          { name: "Equipment Exchange", members: 650, description: "Buy, sell, and trade farm equipment" }
        ]
      }
    }
  },

  // Settings modals
  settings: {
    farmSetup: {
      title: "Farm Configuration",
      content: {
        zones: [
          { name: "North Field", size: "25 acres", crop: "Corn", sensors: 3 },
          { name: "South Field", size: "18 acres", crop: "Soybeans", sensors: 2 },
          { name: "Greenhouse Complex", size: "2 acres", crop: "Vegetables", sensors: 8 }
        ],
        addZoneSteps: [
          "Define zone boundaries on map",
          "Assign crop types and varieties",
          "Install monitoring sensors",
          "Configure alert thresholds"
        ]
      }
    },
    notifications: {
      title: "Notification Preferences",
      content: {
        channels: [
          { type: "Email", enabled: true, frequency: "Immediate" },
          { type: "SMS", enabled: true, frequency: "Critical Only" },
          { type: "Push", enabled: true, frequency: "All Alerts" },
          { type: "Dashboard", enabled: true, frequency: "All Updates" }
        ],
        alertTypes: [
          "Weather Warnings", "Pest Detection", "Equipment Maintenance", 
          "Market Price Changes", "Vaccination Reminders", "Harvest Timing"
        ]
      }
    },
    security: {
      title: "Security Settings",
      content: {
        currentSecurity: [
          { feature: "Two-Factor Authentication", status: "Enabled", lastUpdated: "Jan 10, 2024" },
          { feature: "Password Strength", status: "Strong", lastChanged: "Dec 15, 2023" },
          { feature: "Login Alerts", status: "Enabled", notifications: "Email + SMS" }
        ],
        recommendations: [
          "Review connected devices monthly",
          "Update passwords every 90 days",
          "Enable biometric login when available",
          "Monitor account activity regularly"
        ]
      }
    }
  }
};