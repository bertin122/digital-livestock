import React, { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Download } from "lucide-react";

interface SalesData {
  month: string;
  sales: number;
  revenue: number;
  customers: number;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
  growth: number;
}

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Mock data
  const salesData: SalesData[] = [
    { month: "Jan", sales: 45, revenue: 67500, customers: 120 },
    { month: "Feb", sales: 52, revenue: 78000, customers: 135 },
    { month: "Mar", sales: 48, revenue: 72000, customers: 128 },
    { month: "Apr", sales: 61, revenue: 91500, customers: 142 },
    { month: "May", sales: 55, revenue: 82500, customers: 138 },
    { month: "Jun", sales: 67, revenue: 100500, customers: 156 },
  ];

  const topProducts: TopProduct[] = [
    { name: "Holstein Cow", sales: 23, revenue: 34500, growth: 12.5 },
    { name: "Angus Cow", sales: 18, revenue: 36000, growth: 8.3 },
    { name: "Jersey Cow", sales: 15, revenue: 18000, growth: -2.1 },
    { name: "Hereford Cow", sales: 12, revenue: 16800, growth: 15.7 },
    { name: "Charolais Cow", sales: 8, revenue: 12000, growth: 5.2 },
  ];

  const summaryStats = {
    totalRevenue: 450000,
    totalSales: 348,
    totalCustomers: 819,
    averageOrderValue: 1293,
    growthRate: 8.5,
  };

  const getMetricValue = (data: SalesData) => {
    switch (selectedMetric) {
      case "sales":
        return data.sales;
      case "customers":
        return data.customers;
      default:
        return data.revenue;
    }
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case "sales":
        return "Sales Volume";
      case "customers":
        return "Customer Count";
      default:
        return "Revenue ($)";
    }
  };

  const formatValue = (value: number) => {
    if (selectedMetric === "revenue") {
      return `$${value.toLocaleString()}`;
    }
    return value.toString();
  };

  const exportReport = () => {
    // Simple CSV export
    const csvContent = [
      ["Month", "Sales", "Revenue", "Customers"],
      ...salesData.map((item) => [
        item.month,
        item.sales,
        item.revenue,
        item.customers,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales_report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-600">
            Comprehensive business insights and performance metrics
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={exportReport}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${summaryStats.totalRevenue.toLocaleString()}
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +{summaryStats.growthRate}%
                </span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                {summaryStats.totalSales}
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                <span className="text-sm font-medium text-blue-600">+5.2%</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Customers
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {summaryStats.totalCustomers}
              </p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
                <span className="text-sm font-medium text-purple-600">
                  +8.1%
                </span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Avg Order Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${summaryStats.averageOrderValue}
              </p>
              <div className="flex items-center mt-1">
                <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                <span className="text-sm font-medium text-red-600">-1.3%</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-orange-100">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Metric
            </label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="revenue">Revenue</option>
              <option value="sales">Sales Volume</option>
              <option value="customers">Customers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {getMetricLabel()} Trend
          </h2>
          <div className="space-y-4">
            {salesData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 text-sm font-medium text-gray-600">
                    {data.month}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (getMetricValue(data) /
                              Math.max(
                                ...salesData.map((d) => getMetricValue(d))
                              )) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-900 w-20 text-right">
                  {formatValue(getMetricValue(data))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Top Performing Products
          </h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {product.sales} sales
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">
                    ${product.revenue.toLocaleString()}
                  </div>
                  <div
                    className={`text-sm flex items-center ${
                      product.growth >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.growth >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {Math.abs(product.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Sales Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Detailed Sales Data
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Order Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {salesData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {data.month} 2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.sales}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${data.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {data.customers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${Math.round(data.revenue / data.sales).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
