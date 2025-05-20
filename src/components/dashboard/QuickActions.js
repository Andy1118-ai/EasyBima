import React from 'react';
import { FaPlus, FaCreditCard, FaUserEdit, FaFileAlt, FaHeadset } from 'react-icons/fa';

function QuickActions({ onNewPolicy, onPayPremium, onUpdateProfile }) {
  return (
    <div className="card quick-actions slide-in" style={{ animationDelay: '0.1s' }}>
      <h2>Quick Actions</h2>
      <div className="action-buttons">
        <button className="action-btn primary" onClick={onNewPolicy}>
          <FaPlus /> New Policy
        </button>
        <button className="action-btn" onClick={onPayPremium}>
          <FaCreditCard /> Pay Premium
        </button>
        <button className="action-btn" onClick={onUpdateProfile}>
          <FaUserEdit /> Update Profile
        </button>
        <button className="action-btn">
          <FaFileAlt /> File Claim
        </button>
        <button className="action-btn">
          <FaHeadset /> Get Support
        </button>
      </div>
    </div>
  );
}

export default QuickActions;