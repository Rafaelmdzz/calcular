document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const resultElement = document.getElementById('result-atendimento');
    const file = document.getElementById('fileInput').files[0];

    if (!file) {
        resultElement.textContent = 'Por favor, selecione um arquivo.';
        resultElement.className = 'error';
        return;
    }

    try {
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, {type: 'array'});
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

                let total = 0;
                let subprocessCount = {};

                if (document.getElementById('salarioBase').checked) {
                    total += 1350.00;
                }

                // Processar cada linha da planilha
                jsonData.forEach(row => {
                    if (Array.isArray(row)) {
                        row.forEach(cell => {
                            if (cell) {
                                // Normaliza o texto removendo espaços extras e convertendo para maiúsculas
                                const subprocess = String(cell).trim().toUpperCase()
                                    .replace(/\s+/g, ' ') // Remove espaços extras entre palavras
                                    .replace(/^\s+|\s+$/g, ''); // Remove espaços no início e fim

                                // Verifica se o subprocesso existe no objeto subprocessValues
                                if (subprocessValues.hasOwnProperty(subprocess)) {
                                    subprocessCount[subprocess] = (subprocessCount[subprocess] || 0) + 1;
                                    total += subprocessValues[subprocess].valor;
                                } else {
                                    console.log('Subprocesso não encontrado:', subprocess);
                                }
                            }
                        });
                    }
                });

                // Ordena os subprocessos em ordem alfabética
                let encontrados = Object.entries(subprocessCount)
                    .sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'))
                    .map(([subprocess, count]) => {
                        const valor = subprocessValues[subprocess].valor;
                        const valorTotal = valor * count;
                        return `${subprocess}: ${count}x (R$ ${valor.toFixed(2)} cada = R$ ${valorTotal.toFixed(2)})`;
                    });

                resultElement.innerHTML = `
                    <div class="success">
                        <p>Valor Total: R$ ${total.toFixed(2)}</p>
                        ${document.getElementById('salarioBase').checked ? 
                            `<p style="font-size: 0.8em">Salário Base: R$ 1.350,00</p>
                             <p style="font-size: 0.8em">Bonificações: R$ ${(total - 1350).toFixed(2)}</p>` 
                            : ''}
                        <p style="font-size: 0.8em">Itens encontrados:</p>
                        <p style="font-size: 0.7em">${encontrados.join('<br>')}</p>
                    </div>
                `;
                resultElement.className = 'success';
            } catch (error) {
                console.error('Erro ao processar arquivo:', error);
                resultElement.textContent = 'Erro ao processar o arquivo. Verifique se o formato está correto.';
                resultElement.className = 'error';
            }
        };

        reader.onerror = function() {
            resultElement.textContent = 'Erro ao ler o arquivo.';
            resultElement.className = 'error';
        };

        reader.readAsArrayBuffer(file);
    } catch (error) {
        console.error('Erro:', error);
        resultElement.textContent = 'Erro ao processar o arquivo.';
        resultElement.className = 'error';
    }
});