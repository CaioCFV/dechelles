# Iniciando um novo projeto

## Instalação

Comece com os seguintes comandos:

`vtex login {vendorDaLoja}`
`vtex use {workspace}`

# **~**

### _Caso seja uma evolução do CMS_

> Envie um Ticket para a VTEX com o vendor da loja pedindo para instalar:
> `vtex.edition-store`
> `Tenants do Site Editor`

# **~**

`vtex install vtex.admin-search vtex.search-resolver@1.x`

Vá até o admin da loja e procure por **Busca > Conficuração de integração**

## Desenvolvimento

Inicie o projeto utilizando _NODE >= 12_ o ideal é que seja a versão _14.17.6_. Você consegue alterar a versão do node com o comando

`nvm install {versão}`
`nvm use {versão}`

_(caso não tenha o nvm instalado, você pode conseguir no seguinte link [NVM](https://github.com/nvm-sh/nvm))_

Agora basta rodar os seguintes comandos:

`yarn`

`yarn vtex:setup`

**! Altere todos os vendors dos manifests, interfaces, e contentSchemas. Para isso padronizamos os nomes para "storeVendor", você pode pesquisar esse nome em todo projeto no VS Code e alterar para o Vendo da sua loja. !**

`yarn vlink`

E em outro terminal rode:

`vtex browse`

## Deploy

Para fazer o Deploy, ou "GoLive" da loja, siga os seguintes comandos:

`cd app-custom`
`vtex release patch stable`
`vtex publish`

_A VTEX irá pedir para aguardar 7 minutos para que não ocorra nenhum erro_
_Após os 7 minutos rode:_

`vtex deploy {nome do componente}` (Normalmente a VTEX disponibiliza o comando de deploy inteiro no terminal)

**Agora com os componentes custom publicados, vamos para o deploy do Storefront**

`cd app-store`
`vtex release patch stable`
`vtex publish`

### **! É muito importante que você não rode o comando de deploy na pasta do Storefront !**

Agora crie um workspace de produção:

`vtex use deployWorkspace --production`
`cd app-custom`
`vtex install`
`cd app-store`
`vtex install`

Revise se todas as suas alterações estão de acordo:

`vtex browse`

E caso esteja:

`vtex workspace promote`
