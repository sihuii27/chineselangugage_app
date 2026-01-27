import '../styles/resources.css';
import '../styles/profile.css'; 
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Profile = ({ setIsLoggedIn }) => {
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [joinDate] = useState('2024年1月');
  const [totalHours] = useState('45.5');
  const [completedCourses] = useState(12);
  const [streakDays] = useState(15);
  const [overallProgress] = useState(68);

  useEffect(() => {
    if (location.state?.username) {
      setUsername(location.state.username);
      setIsLoggedIn(true);
    }
  }, [location, setIsLoggedIn]);

  const stats = [
    {
      icon: '⏱️',
      label: '学习时长',
      value: totalHours,
      unit: '小时',
      variant: 'primary'
    },
    {
      icon: '🏆',
      label: '完成课程',
      value: completedCourses,
      unit: '个',
      variant: 'accent'
    },
    {
      icon: '🔥',
      label: '连续学习',
      value: streakDays,
      unit: '天',
      variant: 'secondary'
    },
    {
      icon: '📈',
      label: '平均进度',
      value: overallProgress,
      unit: '%',
      variant: 'primary'
    }
  ];

  const categories = [
    { name: '词汇', progress: 85 },
    { name: '语法', progress: 65 },
    { name: '阅读', progress: 55 },
    { name: '文化', progress: 45 }
  ];

  const achievements = [
    { icon: '🎯', name: '初学者', unlocked: true },
    { icon: '🔥', name: '连胜7天', unlocked: true },
    { icon: '📚', name: '阅读100篇', unlocked: true },
    { icon: '🎤', name: '发音大师', unlocked: false },
    { icon: '🏆', name: '完成100课', unlocked: false },
    { icon: '🌟', name: '全能学者', unlocked: false }
  ];

  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <h1 className="profile-title">Learning Progress</h1>
        <p className="profile-subtitle">View your learning statistics and achievements</p>
      </div>

      {/* User Profile Card */}
      <div className="user-profile-card fade-in">
        <div className="user-profile-header">
          <div className="user-info">
            <h2 className="user-name">{username || '学习者'}</h2>
            <p className="user-email">student@example.com</p>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="quick-info-grid">
          <div className="quick-info-item">
            <span className="quick-info-label">Date Joined</span>
            <p className="quick-info-value">{joinDate}</p>
          </div>
          <div className="quick-info-item">
            <span className="quick-info-label">Total Study Time</span>
            <p className="quick-info-value">{totalHours} 小时</p>
          </div>
          <div className="quick-info-item">
            <span className="quick-info-label">Completed Courses</span>
            <p className="quick-info-value">{completedCourses} 个</p>
          </div>
          <div className="quick-info-item">
            <span className="quick-info-label">Current Streak</span>
            <p className="quick-info-value">{streakDays} 天</p>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="stats-section">
        <h2 className="section-title">Learning Statistics</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`stat-card ${stat.variant}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="stat-icon">{stat.icon}</span>
              <p className="stat-label">{stat.label}</p>
              <div className="stat-value">{stat.value}</div>
              <span className="stat-unit">{stat.unit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="stats-section">
        <h2 className="section-title">Category Breakdown</h2>
        <div className="category-breakdown">
          {categories.map((category, index) => (
            <div key={index} className="category-item">
              <div className="category-header">
                <span className="category-name">{category.name}</span>
                <span className="category-percentage">{category.progress}%</span>
              </div>
              <div className="progress-bar-container">
                <div
                  className={`progress-bar ${category.name.toLowerCase()}`}
                  style={{ width: `${category.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
