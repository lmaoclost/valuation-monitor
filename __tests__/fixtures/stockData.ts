/**
 * Mock stock data for tests
 * Use these fixtures to avoid repeating test data across test files
 */

export const mockStockData = [
  {
    ticker: 'PETR4',
    price: 25.5,
    pl: 8.5,
    roe: 0.15,
    lpa: 3.0,
    dy: 0.05,
    growth: 0.08,
    vpa: 15.0,
  },
  {
    ticker: 'VALE5',
    price: 40.0,
    pl: 5.0,
    roe: 0.20,
    lpa: 8.0,
    dy: 0.08,
    growth: 0.06,
    vpa: 25.0,
  },
  {
    ticker: 'ITUB4',
    price: 12.0,
    pl: 2.5,
    roe: 0.12,
    lpa: 4.8,
    dy: 0.10,
    growth: 0.04,
    vpa: 50.0,
  },
];

export const mockStockCalculations = {
  PETR4: {
    bazinFairPrice: 87.5,
    bazinCeilingPrice: 105.0,
    bazinDiscount: 0.71,
    gordonfairPrice: 92.0,
    gordonCeilingPrice: 110.4,
    gordonDiscount: 0.73,
    grahamFairPrice: 75.0,
    grahamCeilingPrice: 90.0,
    grahamDiscount: 0.66,
    peg: 2.1,
    growthAverage: 0.07,
  },
};

export const mockAPIResponseStocks = {
  success: {
    stocks: mockStockData,
    timestamp: new Date().toISOString(),
  },
  error: {
    message: 'Failed to fetch stocks',
    error: 'Internal server error',
  },
};

export const mockServiceResponse = {
  getStocks: {
    ok: true,
    status: 200,
    json: async () => mockAPIResponseStocks.success,
  },
  getStocksError: {
    ok: false,
    status: 500,
    json: async () => mockAPIResponseStocks.error,
  },
};
