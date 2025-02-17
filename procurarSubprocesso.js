document.addEventListener('DOMContentLoaded', () => {
    const inputPesquisa = document.querySelector('.pesquisa-subprocesso');
    const resultadoDiv = document.getElementById('result-subprocesso');

    if (!inputPesquisa || !resultadoDiv) {
        console.error('Elementos não encontrados');
        return;
    }

    if (typeof subprocessValues === 'undefined') {
        console.error('subprocessValues não está definido');
        return;
    }

    inputPesquisa.addEventListener('input', () => {
        const termoPesquisa = inputPesquisa.value.trim().toUpperCase();
        console.log('Pesquisando por:', termoPesquisa);

        if (termoPesquisa === '') {
            resultadoDiv.innerHTML = '';
            return;
        }

        const resultados = Object.entries(subprocessValues)
            .filter(([nome]) => nome.includes(termoPesquisa))
            .map(([nome, dados]) => ({nome, ...dados}))
            .sort((a, b) => a.nome.localeCompare(b.nome));

        console.log('Resultados encontrados:', resultados);

        if (resultados.length === 0) {
            resultadoDiv.innerHTML = '<p class="sem-resultado">Nenhum subprocesso encontrado</p>';
            return;
        }

        const tabela = `
            <table class="tabela-subprocessos">
                <tbody>
                    ${resultados.map(item => `
                        <tr class="item-subprocesso">
                            <td>
                                <div class="linha-principal">
                                    <span class="nome-subprocesso">${item.nome}</span>
                                    <span class="valor-subprocesso">R$ ${item.valor.toFixed(2)}</span>
                                </div>
                                <div class="descricao-subprocesso">
                                    ${item.descricao}
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        resultadoDiv.innerHTML = tabela;
    });
});
