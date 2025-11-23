const balanceElement = document.getElementById('balance');
const incomeElement = document.getElementById('income');
const expenseElement = document.getElementById('expense');
const transactionList = document.getElementById('history-list');
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

form.addEventListener('submit', addTransaction);

function addTransaction(e) {
    e.preventDefault(); // Sayfanın yenilenmesini önler
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    transactions.push({
        id:Date.now(),
        description,
        amount
    })

    localStorage.setItem('transactions', JSON.stringify(transactions));
    updateTransactionList();
    updateSummary();
    
    transactionFormEl.reset();
}

function updateTransactionList() {
    transactionList.innerHTML = '';

    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach(transaction => {
        const transactionEl = createTransactionElement(transaction);
        transactionList.appendChild(transactionEl);
    });
}

function createTransactionElement(transaction) {
    const li = document.createElement('li');
    li.classList.add(transaction.amount < 0 ? 'expense' : 'income');
    li.innerHTML = `
        <span>${transaction.description} </span>
        <span>${transaction.amount < 0 ? '-' : '+'}$${Math.abs(transaction.amount).toFixed(2)}
        <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button></span>
    `;
  
}