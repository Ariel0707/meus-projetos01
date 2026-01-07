(function () {
    const out = document.getElementById('output');
    const hist = document.getElementById('history');
    const container = document.querySelector('.pad');

    let current = '0';
    let previous = null;
    let operation = null;
    let justEvaluated = false;

    function update() {
        out.textContent = current;
        hist.textContent = previous ? (previous + (operation || '')) : '';
    }

    function inputDigit(d) {
        if (justEvaluated) {
            current = d === '.' ? '0.' : d;
            justEvaluated = false;
            return;
        }
        if (d === '.') {
            if (current.includes('.')) return;
            current += '.';
            return;
        }
        if (current === '0') {
            current = d;
        } else {
            current += d;
        }
    }

    function chooseOP(op) {
        if (op === '%') {
            current = String(parseFloat(current || 0) / 100);
            return;
        }
        // If there's an existing operation pending, calculate it first
        if (operation && !justEvaluated) {
            compute();
        }
        operation = op;
        previous = current;
        justEvaluated = true; // Prevents clearing current immediately so user sees what they typed
    }

    function compute() {
        if (operation === null || previous === null) return;
        
        let res;
        const a = parseFloat(previous);
        const b = parseFloat(current);

        if (isNaN(a) || isNaN(b)) return;

        switch (operation) {
            case '+': res = a + b; break;
            case '-': res = a - b; break;
            case '×': res = a * b; break;
            case '÷': res = a / b; break;
            default: return;
        }

        current = String(res);
        operation = null;
        previous = null;
        justEvaluated = true;
    }

    function clearAll() {
        current = '0';
        previous = null;
        operation = null;
        justEvaluated = false;
    }

    function backspace() {
        if (justEvaluated) {
            current = '0';
            justEvaluated = false;
            return;
        }
        current = current.length > 1 ? current.slice(0, -1) : '0';
    }

    container.addEventListener('click', (e) => {
        const t = e.target;
        if (!t.matches('button')) return;

        if (t.hasAttribute('data-num')) {
            inputDigit(t.textContent.trim());
        } else {
            const action = t.getAttribute('data-action');
            if (action === 'limpar') clearAll();
            if (action === 'apaga') backspace();
            if (action === 'porcentagem') chooseOP('%');
            if (action === 'op') chooseOP(t.textContent.trim());
            if (action === 'igual') compute();
        }
        update();
    });

    window.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') inputDigit(e.key);
        else if (e.key === '.') inputDigit('.');
        else if (e.key === 'Backspace') backspace();
        else if (e.key === 'Escape') clearAll();
        else if (e.key === 'Enter' || e.key === '=') compute();
        else if (['+', '-', '*', '/'].includes(e.key)) {
            const map = { '+': '+', '-': '-', '*': '×', '/': '÷' };
            chooseOP(map[e.key]);
        }
        update();
    });

    update();
})();
