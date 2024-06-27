// Variable declarations
let num1 = 0;
let num2 = 0;
let result = 0;
const operationHistory = {
    add: [],
    subtract: [],
    multiply: [],
    divide: []
};

// Function definitions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

// DOM manipulation and event handling
function performOperation(operation) {
    num1 = parseFloat(document.getElementById('num1').value);
    num2 = parseFloat(document.getElementById('num2').value);

    try {
        switch (operation) {
            case 'add':
                result = add(num1, num2);
                break;
            case 'subtract':
                result = subtract(num1, num2);
                break;
            case 'multiply':
                result = multiply(num1, num2);
                break;
            case 'divide':
                result = divide(num1, num2);
                break;
        }

        document.getElementById('result').textContent = `Result: ${result}`;
        document.getElementById('result').style.color = 'green';

        // Update operation history
        operationHistory[operation].push(result);

        // Update chart
        updateChart();

        console.log(`Operation: ${operation}, Result: ${result}`);
    } catch (error) {
        document.getElementById('result').textContent = `Error: ${error.message}`;
        document.getElementById('result').style.color = 'red';
        console.error(error);
    }
}

// Chart.js implementation
let chart;

function initChart() {
    const ctx = document.getElementById('operationsChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Add', 'Subtract', 'Multiply', 'Divide'],
            datasets: [{
                label: 'Operation Results',
                data: [0, 0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function updateChart() {
    chart.data.datasets[0].data = [
        operationHistory.add.length > 0 ? operationHistory.add[operationHistory.add.length - 1] : 0,
        operationHistory.subtract.length > 0 ? operationHistory.subtract[operationHistory.subtract.length - 1] : 0,
        operationHistory.multiply.length > 0 ? operationHistory.multiply[operationHistory.multiply.length - 1] : 0,
        operationHistory.divide.length > 0 ? operationHistory.divide[operationHistory.divide.length - 1] : 0
    ];
    chart.update();
}

// Initialize the chart when the page loads
window.onload = initChart;