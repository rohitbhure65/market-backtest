import { Line } from 'react-chartjs-2';
import { Banknote, HandCoins, IndianRupee, Activity } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { BacktestData } from '../types';
import { TrendingUp, Target } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface BacktestResultsProps {
  data: BacktestData;
}

export function BacktestResults({ data }: BacktestResultsProps) {
  const chartData = {
    labels: data.results.map(r => new Date(r.date).toISOString().slice(0, 10)),
    datasets: [
      {
        label: 'Portfolio Value',
        data: data.results.map(r => r.closingPrice),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#4B5563',
        },
      },
      title: {
        display: true,
        text: 'Backtest Performance',
        font: {
          size: 18,
          weight: 'bold',
        },
        color: '#1F2937',
      },
      tooltip: {
        backgroundColor: 'rgba(31, 41, 55, 0.8)',
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        footerFont: {
          size: 9,
        },
        cornerRadius: 4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#6B7280',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(209, 213, 219, 0.3)',
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#6B7280',
        },
      },
    },
  };

  const totalInvestment = data.results.reduce((sum, r) => sum + r.entryPrice, 0);
  const totalGain = data.results.reduce((sum, r) => sum + r.closingPrice, 0);
  const totalTrades = data.results.length;
  const tradesWon = data.results.filter(r => r.profit >= 40).length;
  const tradesLost = totalTrades - tradesWon;
  const totalProfit = data.results.reduce((sum, r) => sum + r.profit, 0) - (totalTrades * 40);

  const winRate = (tradesWon / totalTrades) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-6 h-6 text-blue-600 mr-4" />
            <h3 className="text-lg font-semibold text-gray-800">Total Return</h3>
          </div>
          <p className="text-3xl font-bold text-gray-600">
            {data.totalReturn.toFixed(2)}%
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-2">
            <Target className="w-6 h-6 text-blue-600 mr-4" />
            <h3 className="text-lg font-semibold text-gray-800">Win Rate</h3>
          </div>
          <p className="text-3xl font-bold text-gray-600">
            {winRate.toFixed(2)}%
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-2">
            <IndianRupee className="w-6 h-6 text-blue-600 mr-4" />
            <h3 className="text-lg font-semibold text-gray-800">Total Profit</h3>
          </div>
          <p className="text-3xl font-bold text-gray-600">
            {totalProfit.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-2">
            <HandCoins className="w-6 h-6 text-blue-600 mr-4" />
            <h3 className="text-lg font-semibold text-gray-800">Total Investment</h3>
          </div>
          <p className="text-3xl font-bold text-gray-600">
            Rs {totalInvestment.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-2">
            <Banknote className="w-6 h-6 text-blue-600 mr-4" />
            <h3 className="text-lg font-semibold text-gray-800">Total Gain</h3>
          </div>
          <p className="text-3xl font-bold text-gray-600">
            Rs {totalGain.toFixed(2)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-2">
            <Activity className="w-6 h-6 text-blue-600 mr-4" />
            <h3 className="text-lg font-semibold text-gray-800">Total Trades</h3>
          </div>
          <p className="text-3xl font-bold text-gray-600">
            {totalTrades}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-2">
            <Activity className="w-6 h-6 text-blue-600 mr-4" />
            <h3 className="text-lg font-semibold text-gray-800">Trades Won</h3>
          </div>
          <p className="text-3xl font-bold text-gray-600">
            {tradesWon}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-2">
            <Activity className="w-6 h-6 text-blue-600 mr-4" />
            <h3 className="text-lg font-semibold text-gray-800">Trades Lost</h3>
          </div>
          <p className="text-3xl font-bold text-gray-600">
            {tradesLost}
          </p>
        </div>

      </div>

      <div className="flex justify-center h-[400px] mb-40 mt-40">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Trade History</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strategy</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Frame</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closing Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.results.map((result, index) => {
                const isLoss = result.profit < 40;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(result.date).toLocaleDateString('en-CA')}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{result.day}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{result.time}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{result.strategy}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{result.market}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{result.timeFrame}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Rs {result.entryPrice.toFixed(2)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Rs {result.closingPrice.toFixed(2)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Rs {result.profit.toFixed(2)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${isLoss ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                        {isLoss ? 'Loss' : 'Profit'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}