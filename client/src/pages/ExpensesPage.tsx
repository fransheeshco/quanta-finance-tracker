import React, { useEffect, useState } from 'react';
import { useExpenses } from '../contexts/expenseContext'; // adjust path
import ExpensesForm from '../components/AddExpenseForm'; // adjust path

type Props = {};

const ExpensesPage = (props: Props) => {
  const [showForm, setShowForm] = useState(false);
  const { expenses, fetchExpenses } = useExpenses();  // Access expenses from context

  useEffect(() => {
    fetchExpenses(); // Fetch expenses when component mounts
  }, [fetchExpenses]);

  return (
    <section className="absolute top-45 left-25 z-0">
      {showForm && <ExpensesForm onClose={() => setShowForm(false)} />}

      <div className="mt-4 flex justify-center">
        <div className="flex flex-col gap-4 w-[1225px] bg-white border border-[#A64DFF] rounded-2xl p-6">

          {/* Top Row */}
          <div className="flex justify-between items-center">
            <h1 className="text-4xl">Expense History</h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#A64DFF] px-5 py-2 rounded-2xl text-white text-lg"
            >
              + ADD NEW
            </button>
          </div>

          {/* Summary / Filters Section */}
          <div className="w-full h-[50px] bg-white border border-[#A64DFF] rounded-xl p-4">
            Summary / Filters
          </div>

          {/* Data Table / Entries */}
          <div className="w-full h-[300px] bg-white border border-[#A64DFF] rounded-xl p-4">
            {/* Displaying Expenses */}
            {expenses ? (
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((expense) => (
                    <tr key={expense.expenseID}>
                      <td>{expense.title}</td>
                      <td>{expense.amount}</td>
                      <td>{new Date(expense.date).toLocaleDateString()}</td>
                      <td>{expense.categoryID}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading expenses...</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-end w-full">
            <div className="flex gap-4">
              <button className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF]">Prev</button>
              <button className="text-white px-5 py-2 rounded-2xl text-xl bg-[#A64DFF]">Next</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExpensesPage;
