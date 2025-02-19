document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const resultElement = document.getElementById('result-atendimento');
    const file = document.getElementById('fileInput').files[0];

    if (!file) {
        exibirMensagem(resultElement, 'Por favor, selecione um arquivo.', 'error');
        return;
    }

    try {
        const reader = new FileReader();
        reader.onload = processarArquivo;
        reader.onerror = () => exibirMensagem(resultElement, 'Erro ao ler o arquivo.', 'error');
        reader.readAsArrayBuffer(file);
    } catch (error) {
        console.error('Erro:', error);
        exibirMensagem(resultElement, 'Erro ao processar o arquivo.', 'error');
    }
});

function processarArquivo(e) {
    const resultElement = document.getElementById('result-atendimento');
    try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

        const { total, subprocessCount } = calcularTotais(jsonData);
        exibirResultados(resultElement, total, subprocessCount);
    } catch (error) {
        console.error('Erro ao processar arquivo:', error);
        exibirMensagem(resultElement, 'Erro ao processar o arquivo. Verifique se o formato está correto.', 'error');
    }
}

function calcularTotais(jsonData) {
    let total = document.getElementById('salarioBase').checked ? 1350.00 : 0;
    let subprocessCount = {};

    jsonData.forEach(row => {
        if (!Array.isArray(row)) return;
        
        row.forEach(cell => {
            if (!cell) return;
            
            const subprocess = normalizarTexto(String(cell));
            if (subprocessValues[subprocess]) {
                subprocessCount[subprocess] = (subprocessCount[subprocess] || 0) + 1;
                total += subprocessValues[subprocess].valor;
            } else {
                console.log('Subprocesso não encontrado:', subprocess);
            }
        });
    });

    return { total, subprocessCount };
}

function normalizarTexto(texto) {
    return texto.trim()
               .toUpperCase()
               .replace(/\s+/g, ' ')
               .replace(/^\s+|\s+$/g, '');
}

function exibirResultados(element, total, subprocessCount) {
    const encontrados = Object.entries(subprocessCount)
        .sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'))
        .map(([subprocess, count]) => {
            const { valor } = subprocessValues[subprocess];
            return `${subprocess}: ${count}x (R$ ${valor.toFixed(2)} cada = R$ ${(valor * count).toFixed(2)})`;
        });

    const salarioBaseChecked = document.getElementById('salarioBase').checked;
    const bonificacoes = salarioBaseChecked ? total - 1350 : total;

    element.innerHTML = `
        <div class="success">
            <p>Valor Total: R$ ${total.toFixed(2)}</p>
            ${salarioBaseChecked ? `
                <p style="font-size: 0.8em">Salário Base: R$ 1.350,00</p>
                <p style="font-size: 0.8em">Bonificações: R$ ${bonificacoes.toFixed(2)}</p>
            ` : ''}
            <p style="font-size: 0.8em">Itens encontrados:</p>
            <p style="font-size: 0.7em">${encontrados.join('<br>')}</p>
        </div>
    `;
    element.className = 'success';
}

function exibirMensagem(element, mensagem, tipo) {
    element.textContent = mensagem;
    element.className = tipo;
}