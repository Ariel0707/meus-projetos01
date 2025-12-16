function () {
    const out = document.getElementById('output');
    const hist = document.getElementById('history');
    const container = document.querySelector('button');

    let current = '0';
    let previous = null;
    let operation = null;
    let justEvaluated = false;

    function updateDisplay() {
        out.textContent = current;
        hist.textContent = previous ? `${previous} ${operation || ''}` : '';
    }
}