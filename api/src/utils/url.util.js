
function urlCompleto(baseUrl, key) {
    return `${baseUrl}/api/${key}`;
}

function urlEstaAtivo(url) {
    if (url?.clicks >= url?.acessoMaximo ||
        url?.dataExpiracao <= new Date()) {
        return false;
    }
    return (url?.ativo);
}

function motivosUrlInativo(url) {
    const motivos = [];
    if (!url?.ativo) motivos.push('Desativação manual');

    if (url?.clicks >= url?.acessoMaximo) motivos.push('A quantidade de acessos máxima foi excedida');

    if (url?.dataExpiracao <= new Date()) motivos.push('A data de expiração foi ultrapassada');

    return motivos;
}

export { urlCompleto, urlEstaAtivo, motivosUrlInativo };