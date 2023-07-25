# API

- [Autenticação](#autenticacao)
- [Links](#links)
  - [Criar link](#criar-link)
  - [Buscar links](#buscar-links)
  - [Buscar link](#buscar-link)
  - [Ativar/Desativar link](#ativar-desativar-link)
- [Categorias](#categorias)
  - [Buscar categorias](#buscar-categorias)
  - [Ativar/Desativar categoria](#ativar-desativar-categoria)


## Links
&nbsp;
### Criar link
*Cria uma nova url encurtada*
#### Request
```js
POST /urls
```
```json
{
    "url": "string: url original",
    "descricao": "string: descrição do link para controle",
    "dataExpiracao": "date: data de expiracao para url",
    "acessoMaximo": "int: quantidade total de acessos",
    "categorias": [
        {
            "id": "string: id da categoria (se vazio ou não encontrado, criar)",
            "nome": "string: nome da categoria (desnecessário se id for passado)"
        },
        ...
    ]
}
```

#### Response
*Url não existente e request válido (sem erros de excução)*
```js
201 Created
```
```json
"https://localhost:5000/url-encurtada"
```
#
### Buscar links
*Buscar todos os links existentes*
#### Request
```js
GET /urls?categoria={categ}
```
#### Response
*Alguma url existente para o filtro passado*
```js
200 Ok
```
```json
{
    "quantidade": "int: quantidade de urls retornada",
    "urls": [
        {
            "url": "string: url original",
            "descricao": "string: descrição do link para controle",
            "dataExpiracao": "date: data de expiracao para url",
            "acessoMaximo": "int: quantidade total de acessos",
            "categorias": [
                {
                    "id": "string: chave única da categoria",
                    "nome": "string: nome da categoria"
                },
                ...
            ],
            "ativo": "bool: status atual do link",
            "quantidadeAcessos": "int: quantidade de acessos ao link"
        },
        ...
    ]
}
```
*Nenhuma url existente para o filtro passado*
```js
404 Not Found
```
#
### Buscar link
*Busca um único link pelo seu ID*
#### Request
```js
GET /urls/{id}
```
#### Response
*Url existente e ativa para o id*
```js
200 Ok
```
```json
{
    "url": "string: url original"
}
```
*Url inexistente ou inativa*
```js
404 NotFound
```
#
### Ativar Desativar link
*Ativar ou desativar link (depende do status atual)*
#### Request
```js
UPDATE /urls/{id}/ativar-desativar
```
#### Response
```js
200 Ok
```
#
## Categorias
&nbsp;

### Buscar categorias
*Buscar categorias existentes*
#### Request
```js
GET /categorias?nome={nome}&ativas={bool}
```
#### Response
```js
200 Ok
```
```json
{
    "quantidade": "int: quantidade de categorias encontradas",
    "categorias": [
        {
            "id": "string: palavra chave da categoria",
            "nome": "string: nome da categoria"
        },
        ...
    ]
}
```
#
### Ativar Desativar categoria
*Ativar ou desativar categoria (depende do status atual)*
#### Request
```js
UPDATE /categorias/{id}
```
#### Response
```js
200 Ok
```
