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