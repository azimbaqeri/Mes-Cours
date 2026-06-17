import { useState } from 'react';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Total from './components/Total';
import Footer from './components/Footer';

function App() {
  const [expenses, setExpenses] = useState([]);

  const onAddExpenseHandler = (expenseDate) => {
    setExpenses(prev =>[
      {...expenseDate, id: Math.random().toString() },
      ...prev
    ]);
  };

  const onDeleteExpenseHandler = (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };


  
  return (
    <>
    <Header />
      <div className="container">
        <ExpenseForm onAddExpense={onAddExpenseHandler}/>
        <ExpenseList items={expenses} onDeleteExpense={onDeleteExpenseHandler} />
        <Total expenses={expenses} />
      </div>
    <Footer />
    </>
  );
}

export default App
 