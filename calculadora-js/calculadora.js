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
        hist.textContent = previous ? (previous+ (operation || '')) : '';
        }
    
        function inputDigit(d) {
            if (justEvaluated) {
                current = d === '.' ? '0.' : d; justEvaluated = false; return;
            }
            if (d === '.' ){
                if (current.includes('.')) return;
                current += '.';
                return;
            }
            if (current === '0') {
                current = d; current += d;
            }
        }
            function chooseOP(op) {
                if (op == '%') { 
                    current = String(parseFloat(current || 0 ) / 100); update();
                     return;
                    }
                     if(operation && !justEvaluated){
                     compute();
                     }
                     operation = op;
                     previous = current;
                        current = '0';

             }
            function compute() {
                let result;
                const prev = parseFloat(previous);
                const curr = parseFloat(current);
                if (isNaN(a) || isNaN(b)) return;
                let res;
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
            if (justEvaluated){
            current = '0'; 
            justEvaluated = false;
            return;
            } 
            current = current.length > 1 ? current.slice(0, -1) : '0';
        }
    container.addEventListener('click', (e)=> {
        const t = e.target;
        if (!t.matches('button')) return;
        if (t.hasAttribute('data-num')) {
            inputDigit(t.textContent.trim());
            update();
            return;
        }
            const action = t.getAttribute('data-action');
            if (action === 'limpar') {
                clearAll();
                update();
                return;
            }
                if (action === 'apaga') {
                    backspace();
                    update();
                    return;
                }
                    
                 if (action === 'porcentagem') {
                    chooseOP('%');
                    return;
                }
                 if(action === 'op') {
                    chooseOP(t.textContent.trim());
                    compute();
                    update();
                    return;
                }     
                 if(action === 'igual') {
                    compute();
                    update();
                    return;
                }  
});    
    window.addEventListener ('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            inputDigit(e.key);
            update();
            return;
        }
        
        
        
        if (e.key === '.' || e.key === '.') {
            inputDigit(e.key);
            update();
            return;
        }

      
        if (e.key === 'Backspace') {
            backspace();
            update();
            return;
        }
        if (e.key === 'Escape') {
            clearAll();
            update();
            return;
        }
         if (e.key === 'Enter' || e.key === '=') {
            compute();
            update();
            return;
        }
        if ([ '+', '-', '*', '/' ].includes(e.key)) {
            const map = {'+': '+', '-': '-', '*': '×', '/': '÷'};
            chooseOP(map[e.key]);
            update();
            return;
        }
    });
    update();
})();