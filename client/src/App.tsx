import { useState } from 'react';
import axios from 'axios';
import { BacktestForm } from './components/BacktestForm';
import { BacktestResults } from './components/BacktestResults';
import { BacktestData } from './types';
import { Binary } from 'lucide-react';
import { BacktestDetails } from './components/BactestDetailform';
// Fetch data from MongoDB and perform backtest
const fetchDataAndBacktest = async (formData: any): Promise<BacktestData> => {
  try {
    const response = await axios.get('http://localhost:8080/api/v1/backtestget', {
      params: {
        stockType: formData.stockType,
        // startDate: formData.startDate,
        // endDate: formData.endDate,
        day: formData.day,
        time: formData.time,
        strategyName: formData.strategyName,
        timeFrame: formData.timeFrame,
        result: formData.result,
        date: formData.date
      }
    });

    const results = response.data.map((entry: any) => ({
      date: entry.date,
      day: entry.day,
      time: entry.time,
      strategy: entry.strategyName,
      market: entry.stockType,
      timeFrame: entry.timeFrame,
      entryPrice: entry.entryPrice,
      closingPrice: entry.closingPrice,
      profit: entry.profit,
      result: entry.result
    }));

    const totalReturn = results.reduce((acc: number, result: any) => acc + result.profit, 0);
    const winRate = (results.filter((r: any) => r.result === 'Profit').length / results.length) * 100;
    const maxDrawdown = Math.min(...results.map((r: any) => r.profit));

    return {
      stockType: formData.stockType,
      timeFrame: formData.timeFrame,
      strategyName: formData.strategyName,
      results,
      totalReturn,
      winRate,
      maxDrawdown
    };
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    throw error;
  }
};

function App() {
  const [backtestData, setBacktestData] = useState<BacktestData | null>(null);

  const handleSubmit = async (formData: any) => {
    try {
      const data = await fetchDataAndBacktest(formData);
      setBacktestData(data);
    } catch (error) {
      console.error('Error performing backtest:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Binary className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">StockBacktest</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Market Backtesting - By Rohit Bhure</h1>
          <p className="text-gray-600">Test your trading strategies with historical data</p>
          <p className="text-gray-600 mt-4">Disclaimer: This application is intended for educational purposes only. It is not financial advice and should not be used for actual trading decisions.</p>
        </div>
        <BacktestForm onSubmit={handleSubmit} />
        <BacktestDetails onSubmit={handleSubmit} />
        
        {backtestData && <BacktestResults data={backtestData} />}
      </main>
    </div>
  );
}

export default App;