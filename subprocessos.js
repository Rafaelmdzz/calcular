const subprocessValues = {
    "AGENDAMENTO DE VISITA": {
        valor: 1.00,
        descricao: "ABERTURA DE O.S DE SERVIÇO PARA TERCEIROS"
    },
    "ASSISTENCIA ONU": {
        valor: 1.00,
        descricao: "ASSISTENCIA PRESTADA DIRETAMENTE NOS DISPOSITIVOS COMO ORIENTAÇÃO DE REINICIO, APERTO DE BOTÕES"
    },
    "ASSISTENCIA ROTEADOR": {
        valor: 2.60,
        descricao: "ASSISTENCIA PRESTADA DIRETAMENTE NOS DISPOSITIVOS COMO ORIENTAÇÃO DE REINICIO, APERTO DE BOTÕES"
    },
    "ATIVAÇÃO": {
        valor: 1.60,
        descricao: "USADO PARA PROCESSO DE ATIVAÇÃO SOLICITADA POR TECNICO"
    },
    "ATUALIZAR CADASTRO": {
        valor: 0.50,
        descricao: "ATUALIZAÇÃO DE ENDEREÇO, TELEFONE, CONSULTAS BÁSICAS DE ATENDIMENTOS E ORDEM DE SERVIÇO"
    },
    "CANCELAMENTO DE VISITA": {
        valor: 0.60,
        descricao: "CANCELAMENTO DE ORDEM DE SERVIÇO A PEDIDO DO CLIENTE OU TERCEIROS"
    },
    "CONFERMAÇÕES COMPLETA": {
        valor: 1.50,
        descricao: "AUXILIO SOBRE COMO BAIXAR E LOGAR NO APP ONNET TV"
    },
    "CONFIGURAÇÃO DE EQUIPAMENTO": {
        valor: 4.00,
        descricao: "CONFIGURAÇÃO DE ROTEADOR RESETADO ATRAVÉS DE ACESSO REMOTO PELO ANY DESK, AUXILIO SOBRE COMO CONECTAR DISPOSITIVOS NA REDE, ACESSO REMOTO PARA ALTERAR LIMITAÇÃO EM PLACA DE REDE, INSTRUÇÃO A CLIENTE SOBRE RECONFIGURAÇÃO DE ROTEADOR"
    },
    "CONFIGURAÇÃO DE REDES WI-FI": {
        valor: 3.00,
        descricao: "CONFIGURAÇÕES COMPLETAS DE REDE WIFI COMO A FIXAÇÃO DE CANAL,LARGURA, REGIÃO NOME DE REDE E SENHA "
    },
    "CONECTOR DANIFICADO": {
        valor: 1.00,
        descricao: "USADO PARA DEFEITOS NO CONECTOR,PTO E CORDÃO OPTICO"
    },
    "DESBLOQUEIO COM COMPROVANTE": {
        valor: 0.30,
        descricao: "DESBLOQUEIO APÓS ENVIO DE COMPROVANTE (NECESSARIO REALIZAR EXCESSÃO DE ANEXO DE COMPROVANTE)"
    },
    "DESBLOQUEIO DE CONFIANÇA": {
        valor: 0.30,
        descricao: "DESBLOQUEIO SEM O ENVIO DE COMPROVANTE"
    },
    "ERRO DO OPERADOR! NÃO ENCAMINHOU SUBPROCESSO.":{
        valor: -1.50,
        descricao:"subprocesso não informado"
    },
    "FINALIZADO POR OUTRO OPERADOR": {
        valor: 0.50,
        descricao: "ATENDIMENTOS TRANSFERIDOS QUE FORAM CONCLUIDOS POR OUTRO OPERADOR"
    },
    "INFORMAÇÕES DE AGENDAMENTO DE VISITA": {
        valor: 1.00,
        descricao: "INFORMAÇÕES SOBRE DATA E PERIODO DE ORDEM DE SERVIÇO JÁ ABERTA"
    },
    "INFORMAÇÕES ONNET TV": {
        valor: 0.60,
        descricao: "INFORME DE USER E SENHA ONNET TV"
    },
    "INFORMAÇÕES SOBRE CONEXÃO 2.4GHZ E 5GHZ": {
        valor: 2.60,
        descricao: "EXPLICAÇÕES SOBRE DIFERENÇAS ENTRE AMBAS REDES COMO VELOCIDADE ALCANCE E INCOMPATIBILIDADE ( rede 2.4g compativel com todos dispositivos limitada a 50/60 mb e com alcance maior/ rede 5G compativel a dispositivos AC com alcance menor referente a distancia e velocidade dependente do modelo do celular)"
    },
    "LIBERAÇÃO DE PORTAS": {
        valor: 3.50,
        descricao: "REDIRECIONAMENTO DE PORTAS PARA DVR, SERVIDORES ETC"
    },
    "LUZ VERMELHA": {
        valor: 1.00,
        descricao: "AGENDAMENTOS DE VISITA TÉCNICA PARA LUZ VERMELHA NA ONU"
    },
    "MANUTENÇÃO NA REDE": {
        valor: 1.50,
        descricao: "Manutenção geral na rede onde uma alta massa de clientes foi afetada"
    },
    "MUDANÇA DE PONTO INTERNO": {
        valor: 1.60,
        descricao: "ABERTURA DE O.S PARA ALTERAR ROTEADOR/ONU DE LOCAL NA RESIDENCIA"
    },
    "PIX - COPIA E COLA | QRCODE": {
        valor: 0.30,
        descricao: "ENVIO DE PIX PARA PAGAMENTO"
    },
    "PONTO ADICIONAL": {
        valor: 2.50,
        descricao: "ABERTURA DE O.S PARA CABEAMENTO DE DISPOSITIVOS OU ADIÇÃO DE SEGUNDO ROTEADOR"
    },
    "PROBLEMAS NA CONEXÃO": {
        valor: 2.00,
        descricao: "CONEXÃO LENTA/ OSCILANDO"
    },
    "PROBLEMAS NA REDE INTERNA": {
        valor: 2.60,
        descricao: "PROBLEMAS DE CUNHO DO CLIENTE ( Ex: aparelhos de Tv Pirata sem funcionamento, problema em somente 1 dispositivo no local etc)"
    },
    "REAGENDAMENTO DE VISITA": {
        valor: 1.00,
        descricao: "ALTERAÇÃO DE DATA E PERIODO DE VISITA TÉCNICA POR SOLICITAÇÃO DO CLIENTE"
    },
    "ROMPIMENTO DE CABO": {
        valor: 1.00,
        descricao: "AGENDAMENTOS DE VISITA TÉCNICA PARA REPARO DE ROMPIMENTO DE DROP"
    },
    "SINAL ALTO / BAIXO": {
        valor: 1.50,
        descricao: "AGENDAMENTO DE ORDEM DE SERVIÇO PARA CONFERENCIA DE SINAL APÓS CONFERIR O SINAL DE TODOS CLIENTES DO SPLITTER"
    },
    "SUPORTE TELEFONIA": {
        valor: 1.00,
        descricao: "CONFERENCIA E REPARO DE TELEFONIA FIXA"
    },
    "TESTE DE VELOCIDADE": {
        valor: 2.60,
        descricao: "USADO EM ATENDIMENTOS DE MEDIÇÃO DE VELOCIDADE ( todo teste de velocidade para clientes com plano acima de 200 mb deve ser realizado por computador ou notebook cabeado com cabo de rede Cat5e/ Cat6 e placa Giga)"
    },
    "TROCA DE ENDEREÇO FIBRA": {
        valor: 1.50,
        descricao: "MUDANÇA DE ENDEREÇO GERALMENTE EM ÁREA URBANA"
    },
    "TROCA DE ENDEREÇO RADIO": {
        valor: 1.50,
        descricao: "MUDANÇA DE ENDEREÇO GERALMENTE EM ÁREA RURAL"
    },
    "TROCA DE ROTEADOR": {
        valor: 1.20,
        descricao: "VERIFICAÇÃO E AGENDAMENTO DE TROCA DE ROTEADOR AO ALTERAR PLANO, DEFEITO OU SOLICITAÇÃO DE TERCEIROS"
    },
    "TROCA SENHA/USUARIO": {
        valor: 1.60,
        descricao: "TROCA/INFORME DE SENHA E NOME DA REDE WIFI"
    },
    "VERIFICAÇÃO CLIENTE RÁDIO": {
        valor: 1.50,
        descricao: "CONFERENCIA CLIENTES TDMA (geralmente clientes rurais)"
    },
    "VERIFICAÇÃO PREVENTIVA": {
        valor: 1.00,
        descricao: "USADO QUANDO ALGUM SUPERVISOR PASSA ALGUM CLIENTE PARA VERIFICAÇÃO"
    },
    "VERIFICAR USER E SENHA SAC": {
        valor: 0.50,
        descricao: "ENVIO DE LOGIN APP ONNET CLIENTES"
    },
    "2ª VIA FATURA": {
        valor: 0.30,
        descricao: "ENVIO DE SEGUNDA VIA"
    }
};
