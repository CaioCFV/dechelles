# Checkout UI Settings

## Instalação

Comece com os seguintes comandos:

`vtex login {vendorDaLoja}`
`vtex use {workspace}`

## Desenvolvimento

`yarn`

`yarn dev`

## Funcionamento

Ao linkar a pasta no seu workspace, os compiladores irão gerar versões minificadas do código na pasta _checkout-ui-custom_

Toda alteração feita nesse código ficará apenas no seu Workspace de desenvolvedor. Isso previne que alterações sejam feitas no checkout em produção, e permite que o cliente valide mais facilmente as alterações.

**Importante, dentro do header e footer no admin da VTEX, passe o ID `header-ui-adv` e `footer-ui-adv` o container com esse ID deverá cubrir todo o conteúdo de header e footer.**

## Deploy

**CSS**

Para fazer o deploy de css, basta copiar os conteúdos gerados no arquivo .css da pasta _checkout-ui-custom_ e colocar no arquivo de mesmo nome dentro do admin da VTEX pelo caminho:

`CONFIGURAÇÕES DA LOJA > Checkout > {Checkout ativo da loja} > Código > {arquivo}`

**JS**

Para fazer o deploy de JS, apague o arquivo _templates-checkout.js_ e retire as importações dele de dentro do arquivo _checkout6-custom.js_, salve o arquivo e copie os conteúdos gerados no arquivo .js da pasta _checkout-ui-custom_ e coloque no arquivo de mesmo nome dentro do admin da VTEX como no passo acima.

**HTML**

Copie os conteúdos de header e footer na pasta _templates_ e coloque nos arquivos de mesmo nome dentro do admin da VTEX.
