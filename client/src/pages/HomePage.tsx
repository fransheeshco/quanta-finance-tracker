import { useExpenses } from '../contexts/expenseContext';
import { useIncome } from '../contexts/incomeContext';
import ExpenseChart from '../components/ChartComponent'; // Import the ExpenseChart component

type Props = {};

const HomePage = (_props: Props) => {
  const { expenses, loading: loadingExpenses } = useExpenses();
  const { incomes, loading: loadingIncomes } = useIncome();

  // Fallback to an empty array if expenses or incomes is null or undefined
  const totalIncome = (incomes || []).reduce((acc, income) => acc + income.amount, 0);
  const totalExpenses = (expenses || []).reduce((acc, expense) => acc + expense.amount, 0);

  if (loadingIncomes || loadingExpenses) return <div>Loading...</div>;

  // If there's no data, we can handle it accordingly.
  if (!totalIncome || !totalExpenses) {
    console.log("error");
  }

  return (
    <section className="absolute top-45 left-30 w-full h-full z-0">
      <div className="mt-4">
        <div className="flex flex-row gap-4">
          {/* Remaining */}
          <div className="w-[400px] h-[200px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4">
            <h4 className="text-3xl">Remaining</h4>
            <br />
            <h4 className="text-5xl">₱{(totalExpenses - totalExpenses).toFixed(2)}</h4>
          </div>
          {/* Income */}
          <div className="w-[400px] h-[200px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4">
            <h4 className="text-3xl text-blue-950">Income</h4>
            <br />
            <h4 className="text-5xl">₱{totalIncome.toFixed(2)}</h4>
          </div>
          {/* Expenses */}
          <div className="w-[400px] h-[200px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4">
            <h4 className="text-3xl">Expenses</h4>
            <br />
            <h4 className="text-5xl">₱{totalExpenses.toFixed(2)}</h4>
          </div>
        </div>

        <div className="flex flex-row mt-5">
          <div className="w-[1230px] h-[400px] flex-col bg-white border border-[#A64DFF] rounded-2xl p-4">
            <p className="flex justify-center text-xl">Expenses</p>
            <div className="w-full h-full">
              <ExpenseChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
