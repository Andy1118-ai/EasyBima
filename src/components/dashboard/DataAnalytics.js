import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { FaChartLine, FaChartBar, FaChartPie } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function DataAnalytics({ stats }) {
  const [chartType, setChartType] = useState('line');
  
  // Sample data - in a real app, this would come from an API
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  
  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Policy Renewals',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60],
        fill: false,
        borderColor: '#882323',
        tension: 0.4,
      },
      {
        label: 'New Policies',
        data: [28, 48, 40, 19, 86, 27, 90, 65, 59],
        fill: false,
        borderColor: '#3498db',
        tension: 0.4,
      },
    ],
  };
  
  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Claims Filed',
        data: [12, 19, 3, 5, 2, 3, 9, 7, 4],
        backgroundColor: '#882323',
      },
      {
        label: 'Claims Processed',
        data: [10, 15, 2, 4, 1, 2, 7, 5, 3],
        backgroundColor: '#3498db',
      },
    ],
  };
  
  const doughnutData = {
    labels: ['Motor', 'Health', 'Property', 'Life', 'Travel'],
    datasets: [
      {
        data: [35, 25, 15, 15, 10],
        backgroundColor: ['#882323', '#3498db', '#f1c40f', '#2ecc71', '#9b59b6'],
        borderWidth: 0,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: chartType === 'line' ? 'Policy Trends' : 
              chartType === 'bar' ? 'Claims Activity' : 'Policy Distribution',
        font: {
          size: 16,
        }
      },
    },
  };
  
  return (
    <div className="card analytics-card">
      <div className="analytics-header">
        <h2>Data Analytics</h2>
        <div className="chart-type-selector">
          <button 
            className={`chart-type-btn ${chartType === 'line' ? 'active' : ''}`}
            onClick={() => setChartType('line')}
            title="Line Chart"
          >
            <FaChartLine />
          </button>
          <button 
            className={`chart-type-btn ${chartType === 'bar' ? 'active' : ''}`}
            onClick={() => setChartType('bar')}
            title="Bar Chart"
          >
            <FaChartBar />
          </button>
          <button 
            className={`chart-type-btn ${chartType === 'doughnut' ? 'active' : ''}`}
            onClick={() => setChartType('doughnut')}
            title="Doughnut Chart"
          >
            <FaChartPie />
          </button>
        </div>
      </div>
      
      <div className="chart-container">
        {chartType === 'line' && <Line data={lineData} options={chartOptions} height={300} />}
        {chartType === 'bar' && <Bar data={barData} options={chartOptions} height={300} />}
        {chartType === 'doughnut' && <Doughnut data={doughnutData} options={chartOptions} height={300} />}
      </div>
    </div>
  );
}

export default DataAnalytics;