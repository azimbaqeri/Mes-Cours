function Total ({ expenses }) {
  const totalAmount = expenses.reduce((acc, expense) => {
    return acc + expense.amount;
    }, 0);

    return (
        <div className="total-expenses">
            <h2>Total Expenses: ${totalAmount.toFixed(2)}</h2>
        </div>
    );
}   

export default Total;