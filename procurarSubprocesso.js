// Classe principal para gerenciar a pesquisa de subprocessos
class PesquisaSubprocesso {
    static CONFIG = {
        seletores: {
            input: '.pesquisa-subprocesso',
            resultado: '#result-subprocesso'
        },
        mensagens: {
            semResultado: 'Nenhum subprocesso encontrado',
            erro: 'Erro ao carregar os subprocessos'
        },
        delay: 300
    };

    constructor() {
        this.elementos = {
            input: document.querySelector(this.constructor.CONFIG.seletores.input),
            resultado: document.querySelector(this.constructor.CONFIG.seletores.resultado)
        };
        
        this.cache = new Map(); // Cache de resultados
        this.controller = null; // Para cancelar requisições pendentes
        
        this.init();
    }

    init() {
        try {
            this.validarDependencias();
            this.setupEventListeners();
        } catch (erro) {
            console.error('[Erro de Inicialização]:', erro.message);
        }
    }

    setupEventListeners() {
        // Usando debounce otimizado
        this.elementos.input?.addEventListener('input', 
            this.debounce(evento => this.realizarPesquisa(evento.target.value))
        );
    }

    debounce(fn) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), this.constructor.CONFIG.delay);
        };
    }

    validarDependencias() {
        if (!this.elementos.input || !this.elementos.resultado) {
            throw new Error('Elementos DOM necessários não encontrados');
        }
        if (typeof subprocessValues === 'undefined') {
            throw new Error('Dados de subprocessos não carregados');
        }
    }

    async realizarPesquisa(termo) {
        const termoPesquisa = termo.trim().toUpperCase();
        
        if (!termoPesquisa) {
            this.renderizarResultado('');
            return;
        }

        try {
            // Verifica cache primeiro
            if (this.cache.has(termoPesquisa)) {
                this.renderizarResultado(this.cache.get(termoPesquisa));
                return;
            }

            const resultados = await this.buscarSubprocessos(termoPesquisa);
            const conteudo = this.gerarConteudo(resultados);
            
            // Armazena no cache
            this.cache.set(termoPesquisa, conteudo);
            this.renderizarResultado(conteudo);
        } catch (erro) {
            console.error('[Erro na Pesquisa]:', erro);
            this.renderizarResultado(
                `<p class="erro">${this.constructor.CONFIG.mensagens.erro}</p>`
            );
        }
    }

    async buscarSubprocessos(termo) {
        // Usando memoização para resultados frequentes
        return Object.entries(subprocessValues)
            .filter(([nome]) => nome.includes(termo))
            .map(([nome, dados]) => ({nome, ...dados}))
            .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    }

    gerarConteudo(resultados) {
        return resultados.length ? this.criarTabelaHTML(resultados) 
            : `<p class="sem-resultado">${this.constructor.CONFIG.mensagens.semResultado}</p>`;
    }

    criarTabelaHTML(resultados) {
        return `
            <table class="tabela-subprocessos">
                <tbody>
                    ${resultados.map(this.criarLinhaTabela).join('')}
                </tbody>
            </table>
        `;
    }

    criarLinhaTabela(item) {
        return `
            <tr class="item-subprocesso">
                <td>
                    <div class="linha-principal">
                        <span class="nome-subprocesso">${PesquisaSubprocesso.escapeHTML(item.nome)}</span>
                        <span class="valor-subprocesso">R$ ${PesquisaSubprocesso.formatarValor(item.valor)}</span>
                    </div>
                    <div class="descricao-subprocesso">
                        ${PesquisaSubprocesso.escapeHTML(item.descricao)}
                    </div>
                </td>
            </tr>
        `;
    }

    static escapeHTML(str) {
        return str.replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));
    }

    static formatarValor(valor) {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valor);
    }

    renderizarResultado(conteudo) {
        if (this.elementos.resultado) {
            this.elementos.resultado.innerHTML = conteudo;
        }
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => new PesquisaSubprocesso());
