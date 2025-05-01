import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import NavBar from './components/NavBar';
import './App.css'
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import HomePageNavBar from "./components/HomePageNavBar";
import SavingsPage from './pages/SavingsPage';
import IncomePage from './pages/IncomePage';
import TransactionPage from "./pages/TransactionsPage";
import BudgetsPage from './pages/BudgetsPage';
import ExpensesPage from './pages/ExpensesPage';


function App() {
  const user = true;
  return (
    <>
      <BrowserRouter>
      {user ? <HomePageNavBar /> : <NavBar />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/budgets" element={<BudgetsPage />} />
          <Route path="/savings" element={<SavingsPage />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
