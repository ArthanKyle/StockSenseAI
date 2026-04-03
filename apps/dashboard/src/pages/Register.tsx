import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import { Checkbox } from "../components/ui/checkbox";
import { Brain, Mail, Lock, User, Building, AlertCircle, CheckCircle } from "lucide-react";
import '../styles/Register.css';

const API_URL = 'http://localhost:5000';

export default function Register() {
  const navigate = useNavigate();
  const setAuth = useAuthStore(state => state.setAuth);
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Please agree to the terms and conditions");
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`, {
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
        businessName: formData.company || formData.fullName + "'s Business"
      });
      
      setAuth(data.token, data.user);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Logo */}
        <div className="register-logo-section">
          <Link to="/" className="register-logo-link">
            <div className="register-logo-icon">
              <Brain size={28} />
            </div>
            <span className="register-logo-text">StockSenseAI</span>
          </Link>
          <p className="register-logo-description">Start your 14-day free trial. No credit card required.</p>
        </div>

        <div className="register-grid">
          {/* Benefits Sidebar */}
          <div className="register-benefits">
            <h3 className="register-benefits-title">What you'll get:</h3>
            <ul className="register-benefits-list">
              <li className="register-benefit-item">
                <CheckCircle size={20} className="register-benefit-icon" />
                <span>AI-powered demand predictions with 87% accuracy</span>
              </li>
              <li className="register-benefit-item">
                <CheckCircle size={20} className="register-benefit-icon" />
                <span>Smart restocking recommendations</span>
              </li>
              <li className="register-benefit-item">
                <CheckCircle size={20} className="register-benefit-icon" />
                <span>Real-time inventory analytics</span>
              </li>
              <li className="register-benefit-item">
                <CheckCircle size={20} className="register-benefit-icon" />
                <span>Slow-moving item detection</span>
              </li>
              <li className="register-benefit-item">
                <CheckCircle size={20} className="register-benefit-icon" />
                <span>14-day free trial, no credit card</span>
              </li>
            </ul>
          </div>

          {/* Registration Form */}
          <div className="register-form-card">
            <div className="register-form-header">
              <h2 className="register-form-title">Create Your Account</h2>
              <p className="register-form-description">Get started with StockSenseAI in minutes</p>
            </div>
            
            <div className="register-form-content">
              <form onSubmit={handleSubmit} className="register-form">
                {error && (
                  <div className="register-error">
                    <AlertCircle />
                    <span>{error}</span>
                  </div>
                )}

                <div className="register-fields-row">
                  <div className="register-field">
                    <label htmlFor="fullName" className="register-label">Full Name *</label>
                    <div className="register-input-wrapper">
                      <User className="register-input-icon" />
                      <input
                        id="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="register-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="register-field">
                    <label htmlFor="company" className="register-label">Company Name</label>
                    <div className="register-input-wrapper">
                      <Building className="register-input-icon" />
                      <input
                        id="company"
                        placeholder="Acme Inc."
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="register-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="register-field">
                  <label htmlFor="email" className="register-label">Email Address *</label>
                  <div className="register-input-wrapper">
                    <Mail className="register-input-icon" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="register-input"
                      required
                    />
                  </div>
                </div>

                <div className="register-field">
                  <label htmlFor="password" className="register-label">Password *</label>
                  <div className="register-input-wrapper">
                    <Lock className="register-input-icon" />
                    <input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="register-input"
                      required
                    />
                  </div>
                  <p className="register-password-hint">At least 6 characters</p>
                </div>

                <div className="register-field">
                  <label htmlFor="confirmPassword" className="register-label">Confirm Password *</label>
                  <div className="register-input-wrapper">
                    <Lock className="register-input-icon" />
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="register-input"
                      required
                    />
                  </div>
                </div>

                <div className="register-terms">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, agreeToTerms: checked as boolean })
                    }
                  />
                  <label htmlFor="terms" className="register-terms-label">
                    I agree to the{" "}
                    <a href="#" className="register-terms-link">Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" className="register-terms-link">Privacy Policy</a>
                  </label>
                </div>

                <button type="submit" className="register-submit-btn" disabled={loading}>
                  {loading ? "Creating Account..." : "Create Account"}
                </button>

                <div className="register-divider">
                  <div className="register-divider-line"></div>
                  <div className="register-divider-text">
                    <span>Or sign up with</span>
                  </div>
                </div>

                <div className="register-social-buttons">
                  <button type="button" className="register-social-btn">
                    <svg viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </button>
                  <button type="button" className="register-social-btn">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </button>
                </div>
              </form>

              <div className="register-signin-section">
                <span className="register-signin-text">Already have an account?</span>
                <Link to="/login" className="register-signin-link">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
