import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, Shield, TrendingUp, Users, Camera, Cloud, 
  BarChart3, Heart, CheckCircle, Star, ArrowRight,
  Play, Menu, X, ChevronDown
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import VideoModal from '../components/VideoModal';
import smartFarmImg from '../assets/smart-farm-img.jpg';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: Camera,
      title: 'AI-Powered Crop Monitoring',
      description: 'Detect pests, diseases, and nutrient deficiencies instantly using advanced computer vision.'
    },
    {
      icon: Cloud,
      title: 'Weather Intelligence',
      description: 'Get hyper-local weather forecasts and climate-smart farming recommendations.'
    },
    {
      icon: BarChart3,
      title: 'Yield Optimization',
      description: 'Maximize your harvest with data-driven insights and predictive analytics.'
    },
    {
      icon: Heart,
      title: 'Livestock Health Tracking',
      description: 'Monitor animal health, breeding cycles, and optimize feed management.'
    },
    {
      icon: TrendingUp,
      title: 'Market Intelligence',
      description: 'Access real-time market prices and find the best buyers for your produce.'
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Early warning system for weather risks, pest outbreaks, and market volatility.'
    }
  ];

  const stats = [
    { number: '50%', label: 'Crop Loss Reduction' },
    { number: '30%', label: 'Yield Increase' },
    { number: '10K+', label: 'Farmers Helped' },
    { number: '95%', label: 'Accuracy Rate' }
  ];

  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Organic Farmer',
      location: 'California',
      content: 'AgroNova helped me detect early blight in my tomatoes before it spread. Saved my entire crop!',
      rating: 5
    },
    {
      name: 'James Wilson',
      role: 'Dairy Farmer',
      location: 'Wisconsin',
      content: 'The livestock monitoring feature is incredible. I can track my herd\'s health remotely.',
      rating: 5
    },
    {
      name: 'Priya Patel',
      role: 'Vegetable Grower',
      location: 'Gujarat',
      content: 'Market intelligence helped me get 40% better prices by timing my sales perfectly.',
      rating: 5
    }
  ];

  const handleGetStarted = () => {
    // Always navigate to the signup page from the landing CTAs
    navigate('/signup');
  };

  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">AgroNova</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-emerald-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-emerald-600 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-emerald-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-emerald-600 transition-colors">Pricing</a>
              
              {user ? (
                <Link to="/signin" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
                  Go to Dashboard
                </Link>
              ) : (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/signin')}
                    className="text-gray-600 hover:text-emerald-600 transition-colors"
                  >
                    Sign In
                  </button>
                  <button onClick={handleGetStarted} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center">
                    Get Started Free
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-emerald-600">Features</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-emerald-600">How it Works</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-emerald-600">Testimonials</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-emerald-600">Pricing</a>
              {!user && (
                <div className="px-3 py-2 space-y-2">
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigate('/signin'); }}
                    className="block w-full text-left text-gray-600 hover:text-emerald-600"
                  >
                    Sign In
                  </button>
                  <button onClick={handleGetStarted} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center w-full">
                    Get Started Free
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-white to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                AI-Powered Farm Management for 
                <span className="text-gradient"> Modern Agriculture</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Reduce crop losses by 50%, increase yields by 30%, and make data-driven decisions 
                with our comprehensive agricultural intelligence platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button onClick={handleGetStarted} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-lg">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button onClick={() => setVideoOpen(true)} className="bg-white hover:bg-gray-50 text-emerald-600 font-semibold py-4 px-8 rounded-lg border-2 border-emerald-600 transition-all duration-200 flex items-center justify-center text-lg">
                  <Play className="mr-2 w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center mt-8 space-x-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src={smartFarmImg}
                alt="Smart farming dashboard"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">The Challenge Farmers Face Today</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">Smallholder and commercial farms are under pressure from pests, climate volatility and limited access to actionable data. These gaps lead to crop loss, reduced income and increased risk.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="text-3xl font-bold text-emerald-600 mb-2">40%</div>
              <p className="text-gray-600">Estimated crop loss due to pests and diseases annually</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="text-3xl font-bold text-emerald-600 mb-2">$5T</div>
              <p className="text-gray-600">Projected economic impact of climate change on agriculture</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <div className="text-3xl font-bold text-emerald-600 mb-2">70%</div>
              <p className="text-gray-600">Farmers globally with limited access to digital ag tech</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Solution</h3>
            <p className="text-gray-600 max-w-3xl mx-auto">AgroNova combines AI-driven image analysis, hyper-local weather intelligence, and farm management tools into a single, easy-to-use platform so farmers can detect issues earlier, act faster, and optimize yields.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h4 className="font-semibold mb-2">Detect</h4>
              <p className="text-gray-600">AI-powered detection for pests, diseases and nutrient stress from photos and sensors.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h4 className="font-semibold mb-2">Recommend</h4>
              <p className="text-gray-600">Actionable treatment plans and timing recommendations tailored to crops and conditions.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h4 className="font-semibold mb-2">Monitor</h4>
              <p className="text-gray-600">Track outcomes and long-term trends to continuously improve farm practices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Farm Management Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run a modern, efficient, and profitable farm operation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How AgroNova Works</h2>
            <p className="text-xl text-gray-600">Simple, powerful, effective</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Capture', desc: 'Take photos of crops, soil, or livestock' },
              { step: '02', title: 'Analyze', desc: 'AI processes images and data in real-time' },
              { step: '03', title: 'Insights', desc: 'Get actionable recommendations and alerts' },
              { step: '04', title: 'Action', desc: 'Implement solutions and track results' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials removed per request */}

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that fits your farm</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: 'Free',
                period: 'forever',
                features: ['Basic crop monitoring', '5 image analyses/month', 'Weather forecasts', 'Community access'],
                cta: 'Get Started',
                popular: false
              },
              {
                name: 'Professional',
                price: '$29',
                period: 'per month',
                features: ['Unlimited analyses', 'Advanced AI insights', 'Market intelligence', 'Priority support', 'Livestock tracking'],
                cta: 'Start Free Trial',
                popular: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: 'contact us',
                features: ['Custom integrations', 'Dedicated support', 'Advanced analytics', 'Multi-farm management', 'API access'],
                cta: 'Contact Sales',
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl shadow-lg border-2 ${plan.popular ? 'border-emerald-500 relative' : 'border-gray-100'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">{plan.price}</div>
                  <div className="text-gray-500">{plan.period}</div>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-emerald-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleGetStarted()} className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.popular ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl' : 'bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Farm?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of farmers who are already using AgroNova to increase yields and reduce losses.
          </p>
          <button onClick={handleGetStarted} className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg">
            Start Your Free Trial Today
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold">AgroNova</span>
              </div>
              <p className="text-gray-400">
                Empowering farmers with AI-driven insights for sustainable and profitable agriculture.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AgroNova. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />
    </div>
  );
};

export default LandingPage;