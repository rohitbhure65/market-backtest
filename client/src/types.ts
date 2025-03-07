export interface BacktestResult {
  date: string;
  day: string;
  time: string;
  strategy: string;
  market: string;
  timeFrame: string;
  entryPrice: number;
  closingPrice: number;
  profit: number;
  result: 'Profit' | 'Loss' | 'Breakeven';
}

export interface BacktestData {
  stockType: string;
  timeFrame: string;
  strategyName: string;
  results: BacktestResult[];
  totalReturn: number;
  winRate: number;
  maxDrawdown: number;
}