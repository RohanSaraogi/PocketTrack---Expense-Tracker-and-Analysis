document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expense-form');
    const expenseInput = document.getElementById('expense');
    const amountInput = document.getElementById('amount');
    const chartCanvas = document.getElementById('expense-chart').getContext('2d');
    
    let expenses = [];
    
    expenseForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const expenseName = expenseInput.value.trim();
        const expenseAmount = parseFloat(amountInput.value);
        
        if (expenseName !== '' && !isNaN(expenseAmount)) {
            expenses.push({ name: expenseName, amount: expenseAmount });
            
            updateChart();
            
            // Clear input fields
            expenseInput.value = '';
            amountInput.value = '';
        }
    });
    
    function updateChart() {
        const labels = expenses.map(expense => expense.name);
        const data = expenses.map(expense => expense.amount);
        
        const chartData = {
            labels: labels,
            datasets: [{
                label: 'Expenses',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                data: data,
            }]
        };
        
        const chartOptions = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
        
        if(window.expenseChart) {
            window.expenseChart.destroy();
        }
        
        window.expenseChart = new Chart(chartCanvas, {
            type: 'bar',
            data: chartData,
            options: chartOptions,
        });
    }
});
