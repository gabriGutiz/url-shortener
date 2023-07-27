
function urlCompleto(baseUrl, key) {
    return `${baseUrl}/${key}`;
}

function urlEstaAtivo(url) {
    if (url?.clicks >= url?.acessoMaximo ||
        url?.dataExpiracao <= new Date()) {
        return false;
    }
    return (url?.ativo);
}

export { urlCompleto, urlEstaAtivo };