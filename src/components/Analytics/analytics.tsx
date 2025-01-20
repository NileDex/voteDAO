import { PureComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import './css/AnalyticsPage.css'; // Assuming the updated CSS is saved here

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

class ChartComponent extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fill: '#6a93d4' }} />
          <YAxis tick={{ fill: '#6a93d4' }} />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: 8, color: '#fff' }} />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#6a93d4"
            fill="url(#colorUv)"
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6a93d4" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6a93d4" stopOpacity={0} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

const AnalyticsPage = () => {
  return (
    <div className="analytics-container">
      <div className="analytics-card">
        <h1 className="analytics-title">Data Insights</h1>
        <p className="analytics-description">
          Visualize and track key metrics with this analytics dashboard.
        </p>
        <div className="chart-wrapper">
          <ChartComponent />
        </div>
        <button className="analytics-button">Discover More</button>
      </div>
    </div>
  );
};

export default AnalyticsPage;
