import { useState } from 'react';
function ExpenseForm({onAddExpense}) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
     const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount) {
            alert("Please fill in both fields.");
            return;
        }
        const newExpense = {
            id: Math.random(),
            title: title,
            amount: +amount
        }
        onAddExpense(newExpense);
        setTitle('');
        setAmount(''); 
     }
    return (

        <form className="expense-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Expense Title</label>
                <input type="text" id="title" name="title" placeholder="Enter title" value={title} onChange={(e) =>setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" value={amount} onChange={(e)=>setAmount(e.target.value)} name="amount" placeholder="Enter amount" />
            </div>
            <button type="submit">Add Expense</button>
        </form>
    );
}

export default ExpenseForm;