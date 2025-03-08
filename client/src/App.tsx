import { useState } from 'react';
import axios from 'axios';
import { BacktestForm } from './components/BacktestForm';
import { BacktestResults } from './components/BacktestResults';
import { BacktestData } from './types';
import { Binary } from 'lucide-react';
import { BacktestDetails } from './components/BactestDetailform';
import { DNA } from 'react-loader-spinner';

// Fetch data from MongoDB and perform backtest
const fetchDataAndBacktest = async (formData: any): Promise<BacktestData> => {
  try {
    const response = await axios.get('https://market-backtest.onrender.com/api/v1/backtestget', {
      params: {
        stockType: formData.stockType,
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    try {
      const data = await fetchDataAndBacktest(formData);
      setBacktestData(data);
    } catch (error) {
      console.error('Error performing backtest:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock Market Backtesting - Developed by Rohit Bhure</h1>
          <p className="text-gray-600">Test your trading strategies with historical data</p>
        </div>
        <BacktestForm onSubmit={handleSubmit} />
        <BacktestDetails onSubmit={handleSubmit} />

        <div className="flex justify-center items-center">
          {loading ? (
            <DNA
              visible={true}
              height="150"
              width="150"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          ) : (
            backtestData && <BacktestResults data={backtestData} />
          )}
        </div>
        
        <div className="mb-8 mt-8">
          <p className="text-gray-600 mt-4">Note: Even if you see a profit of less than 40 Rs, it might still appear as a loss due to brokerage charges, which can be a minimum of 40 Rs. Therefore, if you are earning less than 40 Rs, you are still at a loss.</p>
          <p className="text-gray-600 mt-4"><b>Disclaimer</b>: This application is intended for educational purposes only. It is not financial advice and should not be used for actual trading decisions.This application is intended for educational purposes only. It is not financial advice and should not be used for actual trading decisions. This application is designed to improve your stock market testing and accuracy. If you are investing or planning to invest in the stock market or crypto, this application can be very helpful for you as it provides many options such as creating and testing your own strategy. Note that the stock market is not always suitable for day trading, and only those who are investing can understand this.</p>
          <p className="text-gray-600 mt-4">This application will undergo many changes. We will improve it significantly by implementing features such as sentiment analysis and machine learning, as well as incorporating data analysis.</p>
        </div>
      </main>

      <footer className="bg-black shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide text-white lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span className="ml-2 text-white">This is an open-source project, and you can contribute to the project.This is an open-source project, and you can contribute to the project.</span>
          </div>
          <a
            href="https://github.com/rohitbhure65/market-backtest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:underline"
          >
            Contribute
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;