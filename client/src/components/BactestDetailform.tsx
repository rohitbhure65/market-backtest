import React, { useState } from 'react';
import axios from 'axios';
import { Calendar, Clock, TrendingUp, Brain, BadgeIndianRupee } from 'lucide-react';

interface BacktestFormProps {
  onSubmit: (data: { [key: string]: string }) => void;
}

export function BacktestDetails({ onSubmit }: BacktestFormProps) {
  const [formData, setFormData] = useState({
    day: '',
    time: '',
    stockType: '',
    timeFrame: '',
    strategyName: '',
    date: '',
    entryPrice: '',
    closingPrice: ''
  });

  const [errors, setErrors] = useState({
    day: '',
    time: '',
    stockType: '',
    timeFrame: '',
    strategyName: '',
    date: '',
    entryPrice: '',
    closingPrice: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      day: formData.day ? '' : 'Day is required',
      time: formData.time ? '' : 'Time is required',
      stockType: formData.stockType ? '' : 'Market Type is required',
      timeFrame: formData.timeFrame ? '' : 'Time Frame is required',
      strategyName: formData.strategyName ? '' : 'Strategy Name is required',
      date: formData.date ? '' : 'Date is required',
      entryPrice: formData.entryPrice !== 0 ? '' : 'Entry Price is required',
      closingPrice: formData.closingPrice !== 0 ? '' : 'Closing Price is required'
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');

    if (!hasErrors) {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/backtestadd', formData);
        onSubmit(response.data);
      } catch (error) {
        console.error('Error saving trade details:', error);
      }
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
            <option value="">Select Day</option>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          {errors.day && <p className="text-red-500 text-sm">{errors.day}</p>}
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
            <option value="">Select Time</option>
            {times.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
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
          {errors.stockType && <p className="text-red-500 text-sm">{errors.stockType}</p>}
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
          {errors.timeFrame && <p className="text-red-500 text-sm">{errors.timeFrame}</p>}
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
          {errors.strategyName && <p className="text-red-500 text-sm">{errors.strategyName}</p>}
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
            Date
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white hover:bg-gray-100 transition-colors duration-200"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}  
          </div>

          <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <BadgeIndianRupee className="w-4 h-4 mr-2 text-blue-500" />
            Entry Price
          </label>
          <input
            type="number"
            placeholder='Enter Entry Price'
            value={formData.entryPrice}
            onChange={(e) => setFormData({ ...formData, entryPrice: Number(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white hover:bg-gray-100 transition-colors duration-200"
          />  
          {errors.entryPrice && <p className="text-red-500 text-sm">{errors.entryPrice}</p>}
          </div>

          <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <BadgeIndianRupee className="w-4 h-4 mr-2 text-blue-500" />
            Closing Price
          </label>
          <input
            type="number"
            placeholder='Enter Closing Price'
            value={formData.closingPrice}
            onChange={(e) => setFormData({ ...formData, closingPrice: Number(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white hover:bg-gray-100 transition-colors duration-200"
          />
          {errors.closingPrice && <p className="text-red-500 text-sm">{errors.closingPrice}</p>}
          </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 active:from-blue-700 active:to-purple-800 transition-colors duration-200 flex items-center justify-center"
      >
        <TrendingUp className="w-4 h-4 mr-2" />
        Add Trade
      </button>
    </form>
  );
}