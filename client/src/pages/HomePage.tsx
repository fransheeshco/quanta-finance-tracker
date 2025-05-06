import React from 'react';
import { useExpenses } from '../contexts/expenseContext';
import { useIncome } from '../contexts/incomeContext';

type Props = {};

const HomePage = (props: Props) => {
  const { expenses, loading: loadingExpenses } = useExpenses();
  const { incomes, loading: loadingIncomes } = useIncome();

  const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
  const totalExpenses = expenses?.reduce((acc, expense) => acc + expense.amount, 0);

  if (!totalExpenses || !totalIncome) {
    console.log("error");
  }

  if (loadingIncomes || loadingExpenses) return <div>Loading...</div>;

  return (
    <section className="absolute top-45 left-30 w-full h-full z-0">
      <div className='mt-4'>
        <div className='flex flex-row gap-4'>
          {/* Remaining */}
          <div className='w-[400px] h-[200px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4'>
            <h4 className='text-3xl'>Remaining</h4>
            <h5>April 01, 2025 - May 01, 2025</h5>
            <br />
            <h4 className='text-5xl'>₱{(totalIncome - totalExpenses).toFixed(2)}</h4>
            <h5 className='text-xl'>0% from last period</h5>
          </div>
          {/* Income */}
          <div className='w-[400px] h-[200px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4'>
            <h4 className='text-3xl'>Income</h4>
            <h5>April 01, 2025 - May 01, 2025</h5>
            <br />
            <h4 className='text-5xl'>₱{totalIncome.toFixed(2)}</h4>
            <h5 className='text-xl'>0% from last period</h5>
          </div>
          {/* Expenses */}
          <div className='w-[400px] h-[200px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4'>
            <h4 className='text-3xl'>Expenses</h4>
            <h5>April 01, 2025 - May 01, 2025</h5>
            <br />
            <h4 className='text-5xl'>₱{totalExpenses.toFixed(2)}</h4>
            <h5 className='text-xl'>0% from last period</h5>
          </div>
        </div>
        {/* Transactions and Statistics */}
        <div className='flex flex-row mt-5 gap-4'>
          <div className='w-[820px] h-[400px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4'>
            <h4 className='text-3xl'>Transactions</h4>
          </div>
          <div className='w-[400px] h-[400px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4'>
            <h4 className='text-3xl'>All Statistics</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
