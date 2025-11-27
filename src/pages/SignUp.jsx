import { useState } from 'react';
import { Leaf } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', farmName: '', location: '' });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signup(formData);
      // After successful signup navigate user to sign in page
      navigate('/signin');
    } catch (err) {
      setError('Sign up failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex w-1/2 bg-emerald-600 text-white items-center justify-center p-12">
        <div className="max-w-md">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">AgroGuard AI</h1>
          </div>
          <h2 className="text-4xl font-bold leading-tight">
            AI-Powered Farm Management for
            <span className="block text-white/90">Modern Agriculture</span>
          </h2>
          <p className="mt-6 text-white/90">Reduce crop losses, increase yields and make data-driven decisions with actionable intelligence tailored for farms.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Create your account</h3>

          {error && <div className="text-red-600 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="you@farm.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Create a password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
              <input
                type="text"
                name="farmName"
                required
                value={formData.farmName}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Your farm's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                className="input-field"
                placeholder="City, State/Country"
              />
            </div>

            <button type="submit" disabled={loading} className="w-full btn btn-primary mt-4">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Already have an account? <Link to="/signin" className="text-emerald-600 font-medium">Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
