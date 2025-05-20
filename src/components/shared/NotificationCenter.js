import React from 'react';
import { format } from 'date-fns';
import { FaTimes, FaCheck, FaCheckDouble } from 'react-icons/fa';

function NotificationCenter({ show, notifications, onClose, onMarkAsRead, onMarkAllAsRead }) {
  if (!show) return null;
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'policy': return '📋';
      case 'payment': return '💰';
      case 'claim': return '🛡️';
      case 'system': return '⚙️';
      case 'alert': return '⚠️';
      default: return '📌';
    }
  };
  
  return (
    <div className="notification-center-overlay" onClick={onClose}>
      <div className="notification-center" onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <h2>Notifications</h2>
          <div className="notification-actions">
            <button className="mark-all-read" onClick={onMarkAllAsRead}>
              <FaCheckDouble /> Mark all as read
            </button>
            <button className="close-notifications" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
        </div>
        
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">
              <p>No new notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <p className="notification-text">{notification.message}</p>
                  <span className="notification-time">
                    {format(new Date(notification.timestamp), 'MMM d, h:mm a')}
                  </span>
                </div>
                {!notification.read && (
                  <button 
                    className="mark-read-btn" 
                    onClick={() => onMarkAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <FaCheck />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationCenter;