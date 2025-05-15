import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    Filler,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import type { ChartData } from 'chart.js';
  import { useExpenses } from '@/contexts/expenseContext';
  import { useState, useEffect } from 'react';
  

// Register required elements
ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ExpenseChart = () => {
  const { expenses, loading } = useExpenses();
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [] as string[], 
    datasets: [],
  });

  useEffect(() => {
    if (!loading && expenses) {
      const dateToTotal: { [key: string]: number } = {};

      expenses.forEach((expense) => {
        const date = new Date(expense.date).toLocaleDateString();
        dateToTotal[date] = (dateToTotal[date] || 0) + expense.amount;
      });

      const sortedDates = Object.keys(dateToTotal).sort(
        (a, b) => new Date(a).getTime() - new Date(b).getTime()
      );

      const totals = sortedDates.map((date) => dateToTotal[date]);

      setChartData({
        labels: sortedDates,
        datasets: [
          {
            label: 'Expenses',
            data: totals,
            fill: true,
            borderColor: '#A64DFF',
            backgroundColor: 'rgba(166, 77, 255, 0.2)',
            tension: 0.4,
          },
        ],
      });
    }
  }, [expenses, loading]);

  const options = {
    responsive: true,
    maintainAspectRatio: false as const,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Total Expenses by Day',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-full">
      {chartData.labels?.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div className="w-full h-[340px]">
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;
