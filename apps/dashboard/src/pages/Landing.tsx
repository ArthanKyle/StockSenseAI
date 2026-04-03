import { Link } from "react-router-dom";
import {
  Brain,
  TrendingUp,
  Package,
  AlertCircle,
  BarChart3,
  CheckCircle,
  Sparkles,
  ArrowRight,
  DollarSign,
  Target,
  Clock
} from "lucide-react";
import '../styles/Landing.css';

export function Landing() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="landing-nav-container">
          <div className="landing-nav-content">
            <Link to="/" className="landing-logo">
              <div className="landing-logo-icon">
                <Brain size={20} />
              </div>
              <span className="landing-logo-text">StockSenseAI</span>
            </Link>
            <div className="landing-nav-buttons">
              <Link to="/login">
                <button className="btn btn-ghost">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn btn-primary">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-container">
          <div className="landing-hero-grid">
            <div>
              <div className="landing-badge">
                <Sparkles />
                AI-Powered Inventory Management
              </div>
              <h1 className="landing-hero-title">
                Stop Losing Money on Poor{" "}
                <span className="landing-gradient-text">
                  Inventory Decisions
                </span>
              </h1>
              <p className="landing-hero-description">
                StockSenseAI uses advanced machine learning to predict demand, recommend optimal restocking, and detect slow-moving items—helping small businesses maximize profits.
              </p>
              <div className="landing-cta-buttons">
                <Link to="/register">
                  <button className="btn btn-primary btn-lg btn-full">
                    Start Free Trial
                    <ArrowRight />
                  </button>
                </Link>
                <Link to="/dashboard">
                  <button className="btn btn-outline btn-lg btn-full">
                    View Demo Dashboard
                  </button>
                </Link>
              </div>
              <div className="landing-trust-indicators">
                <div className="landing-trust-item">
                  <CheckCircle />
                  <span>No credit card required</span>
                </div>
                <div className="landing-trust-item">
                  <CheckCircle />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
            <div className="landing-hero-preview">
              <div className="landing-preview-bg"></div>
              <div className="landing-preview-card">
                <div className="landing-preview-stats">
                  <div className="landing-stat-card blue">
                    <div>
                      <p className="landing-stat-label">Total Inventory Value</p>
                      <p className="landing-stat-value">$167,000</p>
                    </div>
                    <TrendingUp className="landing-stat-icon blue" size={32} />
                  </div>
                  <div className="landing-stat-card purple">
                    <div>
                      <p className="landing-stat-label">AI Predictions Active</p>
                      <p className="landing-stat-value">8 Items</p>
                    </div>
                    <Brain className="landing-stat-icon purple" size={32} />
                  </div>
                  <div className="landing-stat-card green">
                    <div>
                      <p className="landing-stat-label">Potential Savings</p>
                      <p className="landing-stat-value">$12,400</p>
                    </div>
                    <DollarSign className="landing-stat-icon green" size={32} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="landing-problem">
        <div className="landing-container">
          <div className="landing-section-header">
            <div className="landing-badge red">
              <AlertCircle />
              The Problem
            </div>
            <h2 className="landing-section-title">
              Small Businesses Lose Money Daily
            </h2>
            <p className="landing-section-description">
              Poor inventory management costs SMEs thousands in lost revenue, wasted stock, and missed opportunities.
            </p>
          </div>
          <div className="landing-cards-grid">
            <div className="landing-card">
              <div className="landing-card-icon red">
                <Package />
              </div>
              <h3 className="landing-card-title">Overstocking</h3>
              <p className="landing-card-text">
                Capital tied up in slow-moving inventory, wasting storage space and cash flow.
              </p>
            </div>
            <div className="landing-card">
              <div className="landing-card-icon orange">
                <AlertCircle />
              </div>
              <h3 className="landing-card-title">Stockouts</h3>
              <p className="landing-card-text">
                Lost sales and disappointed customers when popular items run out unexpectedly.
              </p>
            </div>
            <div className="landing-card">
              <div className="landing-card-icon yellow">
                <Clock />
              </div>
              <h3 className="landing-card-title">Manual Tracking</h3>
              <p className="landing-card-text">
                Hours wasted on spreadsheets and guesswork instead of data-driven decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="landing-solution">
        <div className="landing-container">
          <div className="landing-section-header">
            <div className="landing-badge green">
              <Sparkles />
              Our Solution
            </div>
            <h2 className="landing-section-title">
              AI-Powered Intelligence for Your Inventory
            </h2>
            <p className="landing-section-description">
              Make smarter decisions with machine learning that predicts, recommends, and optimizes your stock.
            </p>
          </div>
          <div className="landing-cards-grid">
            <div className="landing-card blue-border">
              <div className="landing-card-icon blue">
                <TrendingUp />
              </div>
              <h3 className="landing-card-title">Predict Demand</h3>
              <p className="landing-card-text">
                Advanced time-series forecasting analyzes patterns to predict future demand with high accuracy.
              </p>
              <ul className="landing-feature-list">
                <li className="landing-feature-item">
                  <CheckCircle />
                  <span>87% prediction accuracy</span>
                </li>
                <li className="landing-feature-item">
                  <CheckCircle />
                  <span>Seasonal trend analysis</span>
                </li>
              </ul>
            </div>
            <div className="landing-card purple-border">
              <div className="landing-card-icon purple">
                <Target />
              </div>
              <h3 className="landing-card-title">Smart Restocking</h3>
              <p className="landing-card-text">
                Get AI-powered recommendations on when and how much to reorder, optimized for your business.
              </p>
              <ul className="landing-feature-list">
                <li className="landing-feature-item">
                  <CheckCircle />
                  <span>Optimal order quantities</span>
                </li>
                <li className="landing-feature-item">
                  <CheckCircle />
                  <span>Reorder point alerts</span>
                </li>
              </ul>
            </div>
            <div className="landing-card green-border">
              <div className="landing-card-icon green">
                <BarChart3 />
              </div>
              <h3 className="landing-card-title">Detect Slow Movers</h3>
              <p className="landing-card-text">
                Identify items that aren't selling and get actionable insights to free up capital.
              </p>
              <ul className="landing-feature-list">
                <li className="landing-feature-item">
                  <CheckCircle />
                  <span>Anomaly detection</span>
                </li>
                <li className="landing-feature-item">
                  <CheckCircle />
                  <span>Performance insights</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="landing-impact">
        <div className="landing-container">
          <div className="landing-section-header">
            <h2 className="landing-section-title">
              Direct Financial Impact for SMEs
            </h2>
            <p className="landing-section-description">
              See real results from day one
            </p>
          </div>
          <div className="landing-metrics-grid">
            <div className="landing-metric">
              <div className="landing-metric-value blue">34%</div>
              <p className="landing-metric-label">Reduction in overstocking</p>
            </div>
            <div className="landing-metric">
              <div className="landing-metric-value purple">28%</div>
              <p className="landing-metric-label">Fewer stockouts</p>
            </div>
            <div className="landing-metric">
              <div className="landing-metric-value green">$12K</div>
              <p className="landing-metric-label">Average monthly savings</p>
            </div>
            <div className="landing-metric">
              <div className="landing-metric-value orange">87%</div>
              <p className="landing-metric-label">Prediction accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="landing-cta-content">
          <h2 className="landing-cta-title">
            Ready to Transform Your Inventory?
          </h2>
          <p className="landing-cta-description">
            Join hundreds of SMEs making smarter inventory decisions with AI.
          </p>
          <div className="landing-cta-buttons-center">
            <Link to="/register">
              <button className="btn btn-primary btn-lg btn-full">
                Start Free Trial
                <ArrowRight />
              </button>
            </Link>
            <Link to="/login">
              <button className="btn btn-outline btn-lg btn-full">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-content">
          <Link to="/" className="landing-logo">
            <div className="landing-logo-icon">
              <Brain size={20} />
            </div>
            <span className="landing-logo-text">StockSenseAI</span>
          </Link>
          <p className="landing-footer-text">
            © 2026 StockSenseAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
