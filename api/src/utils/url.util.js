
function urlCompleto(baseUrl, key) {
    return `${baseUrl}/${key}`;
}

function verificaUrlAtivo(url) {
    return (url?.clicks >= url?.acessoMaximo ||
        url?.dataExpiracao <= new Date() ||
        url?.ativo);
}

export { urlCompleto, verificaUrlAtivo };