function verificarRisco() {
    const nome = document.getElementById('ben_nome').value.toLowerCase();
    const origem = document.getElementById('origem_cobranca').value;
    const resultado = document.getElementById('resultado_risco');
    
    let nivelRisco = "Baixo";
    let recomendacao = "";
    let corDestaque = "#27ae60"; // Verde

    // Lógica de análise Sniper
    if (origem === "email_estranho" || origem === "whatsapp") {
        nivelRisco = "ALTO";
        corDestaque = "#e74c3c"; // Vermelho
        recomendacao = "CUIDADO! Órgãos oficiais e grandes empresas não enviam cobranças por WhatsApp ou e-mails gratuitos. Não pague!";
    } else if (nome.length > 0 && (nome.includes("ltda") || nome.includes("sa")) === false) {
        nivelRisco = "MÉDIO";
        corDestaque = "#f39c12"; // Laranja
        recomendacao = "SUSPEITO. O beneficiário parece ser uma Pessoa Física (CPF), mas a cobrança é para seu CNPJ. Verifique no seu DDA bancário.";
    } else {
        recomendacao = "Aparentemente seguro, mas sempre confira se você realmente contratou este serviço ou comprou este produto.";
    }

    resultado.style.display = 'block';
    resultado.style.backgroundColor = corDestaque + "22"; // Cor suave de fundo
    resultado.style.borderLeft = `5px solid ${corDestaque}`;
    
    resultado.innerHTML = `
        <h4 style="color: ${corDestaque}; margin-top:0;">Nível de Risco: ${nivelRisco}</h4>
        <p>${recomendacao}</p>
    `;
}