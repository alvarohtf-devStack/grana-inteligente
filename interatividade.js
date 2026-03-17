function calcularLucro() {
    // Entradas básicas
    const venda = parseFloat(document.getElementById('valorVenda').value) || 0;
    const custoProduto = parseFloat(document.getElementById('custoProduto').value) || 0;
    
    // Custos Invisíveis (O diferencial)
    const imposto = parseFloat(document.getElementById('imposto').value) || 0;
    const taxaAdm = parseFloat(document.getElementById('taxaMaquina').value) || 0;
    const taxaAntecipacao = parseFloat(document.getElementById('taxaAntecipacao').value) || 0;
    const marketing = parseFloat(document.getElementById('marketing').value) || 0;
    const frete = parseFloat(document.getElementById('frete').value) || 0;

    if (venda <= 0) {
        alert("Insira o valor da venda para calcular.");
        return;
    }

    // Lógica Avançada
    const totalTaxasPercentual = imposto + taxaAdm + taxaAntecipacao;
    const valorDescontosPercentuais = venda * (totalTaxasPercentual / 100);
    const custosFixosVenda = marketing + frete + custoProduto;
    
    const lucroLiquido = venda - valorDescontosPercentuais - custosFixosVenda;
    const margemPercentual = (lucroLiquido / venda) * 100;

    // Exibição do Resultado
    const resultDiv = document.getElementById('resultadoCalculo');
    resultDiv.style.display = 'block';
    
    const corStatus = lucroLiquido > 0 ? '#27ae60' : '#e74c3c';

    resultDiv.innerHTML = `
        <div style="border-bottom: 2px solid #ddd; margin-bottom: 10px; padding-bottom: 10px;">
            <h4 style="margin:0; color: ${corStatus}">Resultado Final: R$ ${lucroLiquido.toFixed(2)}</h4>
            <small>Sua margem real é de: <strong>${margemPercentual.toFixed(2)}%</strong></small>
        </div>
        <div style="font-size: 0.85rem; color: #555;">
            <strong>Raio-X dos Custos Invisíveis:</strong><br>
            • Impostos e Taxas (ADM + Antecipação): R$ ${valorDescontosPercentuais.toFixed(2)}<br>
            • Marketing e Logística: R$ ${(marketing + frete).toFixed(2)}<br>
            • Custo da Mercadoria: R$ ${custoProduto.toFixed(2)}<br>
        </div>
        <div style="margin-top:10px; padding:10px; background:#fff; border-radius:5px; border-left: 4px solid ${corStatus}">
            <small>${gerarDicaSniper(margemPercentual)}</small>
        </div>
    `;
}

function gerarDicaSniper(margem) {
    if (margem > 30) return "🔥 <strong>Top!</strong> Sua margem está excelente para escala.";
    if (margem > 15) return "✅ <strong>Saudável.</strong> Mas monitore os custos fixos mensalmente.";
    if (margem > 0) return "⚠️ <strong>Atenção!</strong> Margem muito apertada. Qualquer oscilação gera prejuízo.";
    return "🚨 <strong>Perigo!</strong> Você está pagando para trabalhar. Revise seus preços urgente!";
}


function construirPrompt() {
    // Captura os valores
    const venda = document.getElementById('p_venda').value || "[VALOR NÃO INFORMADO]";
    const custo = document.getElementById('p_custo').value || "[CUSTO NÃO INFORMADO]";
    const ads = document.getElementById('p_ads').value || "0";
    const qtdVendas = document.getElementById('p_vendas_qtd').value || "1";
    const objetivo = document.getElementById('p_objetivo').value;

    // Cálculo simples de CAC para o prompt ficar mais inteligente
    const cac = (ads / qtdVendas).toFixed(2);

    // Template do Prompt
    const promptFinal = `Atue como um CFO (Diretor Financeiro) especialista em pequenas empresas e análise de dados. 
Preciso de uma análise sobre o seguinte cenário:
- Preço de Venda Unitário: R$ ${venda}
- Custo por Unidade: R$ ${custo}
- Investimento em Marketing: R$ ${ads}
- Total de Vendas no período: ${qtdVendas}
- Meu Custo de Aquisição de Cliente (CAC) atual é de aproximadamente R$ ${cac} por venda.

Meu objetivo principal é: ${objetivo.toUpperCase()}.

Com base nesses números, faça uma auditoria rápida:
1. Calcule minha margem de contribuição real após o marketing.
2. Identifique se estou 'trocando dinheiro' ou se a operação é saudável.
3. Me dê 3 passos práticos para melhorar meus resultados com base no objetivo que selecionei acima.
Seja direto, técnico e use o Princípio de Pareto (80/20) para priorizar suas sugestões.`;

    // Exibe e copia
    const box = document.getElementById('box_prompt');
    const areaTexto = document.getElementById('resultado_prompt');
    
    areaTexto.value = promptFinal;
    box.style.display = 'block';
    
    areaTexto.select();
    navigator.clipboard.writeText(promptFinal);
}

/* Cotações em tempo real - Sniper Edition */
async function atualizarCotacoes() {
    const tickerContainer = document.getElementById('ticker-data');
    
    // Se o container não existir na página, para a execução para não dar erro
    if (!tickerContainer) return;

    try {
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL');
        const data = await response.json();

        const dolar = parseFloat(data.USDBRL.bid).toFixed(2);
        const euro = parseFloat(data.EURBRL.bid).toFixed(2);
        const btcValue = parseFloat(data.BTCBRL.bid).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

        // --- PAINEL DE CONTROLE ESTRATÉGICO (Valores Reais 2026) ---
        const selicAtual = "15,00%"; 
        const petroleoBrent = "US$ 102.45"; 
        const minerioFerro = "US$ 115.80";
        // ---------------------------------------------------------

        tickerContainer.innerHTML = `
            <div class="ticker-item"><span class="ticker-label">💵 DÓLAR:</span> <span class="ticker-value">R$ ${dolar}</span></div>
            <div class="ticker-item"><span class="ticker-label">💶 EURO:</span> <span class="ticker-value">R$ ${euro}</span></div>
            <div class="ticker-item"><span class="ticker-label">₿ BITCOIN:</span> <span class="ticker-value">${btcValue}</span></div>
            <div class="ticker-item"><span class="ticker-label">🛢️ BRENT:</span> <span class="ticker-value">${petroleoBrent} <small>▲</small></span></div>
            <div class="ticker-item"><span class="ticker-label">🏗️ MINÉRIO:</span> <span class="ticker-value">${minerioFerro} <small>▲</small></span></div>
            <div class="ticker-item"><span class="ticker-label">📈 SELIC:</span> <span class="ticker-value">${selicAtual} <small>▲</small></span></div>
            <div class="ticker-item"><span class="ticker-label">🛡️ STATUS:</span> <span class="ticker-value">Monitorando Reino...</span></div>
        `;
    } catch (error) {
        console.error("Erro ao carregar cotações:", error);
        tickerContainer.innerHTML = `<span>⚠️ Terminal em manutenção...</span>`;
    }
}

/* --- GATILHOS DE EXECUÇÃO --- */

// 1. Liga o terminal assim que o HTML carregar
document.addEventListener('DOMContentLoaded', () => {
    atualizarCotacoes();
    
    // 2. Atualiza os dados a cada 5 minutos (300.000 ms)
    setInterval(atualizarCotacoes, 300000);
});