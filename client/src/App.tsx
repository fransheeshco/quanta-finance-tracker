// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { UserProvider } from './contexts/authContext';
import { AccountProvider } from './contexts/accountContext';

import Layouts from './components/Layouts';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import SavingsPage from './pages/SavingsPage';
import IncomePage from './pages/IncomePage';
import TransactionPage from './pages/TransactionsPage';
import BudgetsPage from './pages/BudgetsPage';
import ExpensesPage from './pages/ExpensesPage';
import TransferPage from './pages/TransferPage';
import AccountsPage from './pages/AccountsPage';
import ProtectedRoute from './Routes/ProtectedRoutes';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AccountProvider>
        <Routes>
          <Route element={<Layouts />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><TransactionPage /></ProtectedRoute>} />
            <Route path="/budgets" element={<ProtectedRoute><BudgetsPage /></ProtectedRoute>} />
            <Route path="/savings" element={<ProtectedRoute><SavingsPage /></ProtectedRoute>} />
            <Route path="/income" element={<ProtectedRoute><IncomePage /></ProtectedRoute>} />
            <Route path="/expenses" element={<ProtectedRoute><ExpensesPage /></ProtectedRoute>} />
            <Route path="/transfers" element={<ProtectedRoute><TransferPage /></ProtectedRoute>} />
            <Route path="/accounts" element={<ProtectedRoute><AccountsPage /></ProtectedRoute>} />
          </Route>
        </Routes>
        <ToastContainer />
        </AccountProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
