import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, TrendingUp, Brain } from 'lucide-react';

interface BacktestFormProps {
  onSubmit: (data: any) => void;
}

export function BacktestDetails({ onSubmit }: BacktestFormProps) {
  const [formData, setFormData] = useState({
    day: '',
    time: '',
    stockType: '',
    timeFrame: '',
    strategyName: '',
    result: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/trades', formData);
      onSubmit(response.data);
    } catch (error) {
      console.error('Error saving trade details:', error);
    }
  };

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 5) {
      const hour = h.toString().padStart(2, '0');
      const minute = m.toString().padStart(2, '0');
      times.push(`${hour}:${minute}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            Day
          </label>
          <select
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white hover:bg-gray-100 transition-colors duration-200"
          >
            <option value="All">All Days</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            Time
          </label>
          <select
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white hover:bg-gray-100 transition-colors duration-200"
          >
            <option value="All">All Times</option>
            {times.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
            Market Type
          </label>
          <select
            value={formData.stockType}
            onChange={(e) => setFormData({ ...formData, stockType: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white hover:bg-gray-100 transition-colors duration-200"
          >
            <option value="">Select Market Type</option>
            <option value="Crypto">Crypto</option>
            <option value="Stock">Stock</option>
            <option value="Options">Options</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4 mr-2 text-blue-500" />
            Time Frame
          </label>
          <select
            value={formData.timeFrame}
            onChange={(e) => setFormData({ ...formData, timeFrame: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white hover:bg-gray-100 transition-colors duration-200"
          >
            <option value="">Select Time frame</option>
            <option value="1m">1 Minute</option>
            <option value="5m">5 Minutes</option>
            <option value="15m">15 Minutes</option>
            <option value="30m">30 Minutes</option>
            <option value="1h">1 Hour</option>
            <option value="4h">4 Hours</option>
            <option value="1d">1 Day</option>
            <option value="1w">1 Week</option>
            <option value="1mo">1 Month</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Brain className="w-4 h-4 mr-2 text-blue-500" />
            Strategy Name
          </label>
          <select
            value={formData.strategyName}
            onChange={(e) => setFormData({ ...formData, strategyName: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white hover:bg-gray-100 transition-colors duration-200"
          >
            <option value="">Select Strategy</option>
            <option value="SMA Crossover">SMA Crossover</option>
            <option value="RSI Strategy">RSI Strategy</option>
            <option value="MACD Strategy">MACD Strategy</option>
            <option value="Bollinger Bands">Bollinger Bands</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
            Result Type
          </label>
          <select
            value={formData.result}
            onChange={(e) => setFormData({ ...formData, result: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white hover:bg-gray-100 transition-colors duration-200"
          >
            <option value="">All Results</option>
            <option value="Profit">Profit</option>
            <option value="Loss">Loss</option>
            <option value="Breakeven">Breakeven</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Add Trade
      </button>
    </form>
  );
}