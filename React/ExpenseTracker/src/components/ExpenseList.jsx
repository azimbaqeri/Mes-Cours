function ExpenseList({items, onDeleteExpense}) {
    const onDeleteExpenseHandler = (id) => {
        onDeleteExpense(id);
    }
    return (
    
        <div className="expense-list">
            <h2>Your Expenses</h2>
            {items.length === 0 && <p>No expenses found.</p>}
            
            {items.map((expense) => (
                <div key={expense.id} className="expense-item">
                    <h3>{expense.title}</h3> 
                    <p>
                        ${expense.amount.toFixed(2)}
                    </p>
                    <button className="delete-button" onClick={() => onDeleteExpenseHandler(expense.id)} >Delete</button>

                </div>
            ))}
        </div>
    ); 
}

export default ExpenseList;