# README do Programa de Upload de Imagens do squad: Sala 3 é demais!

Este programa é uma aplicação em React que demonstra uma solução para remover assinaturas de documentos de identidade (RG) ou carteiras de motorista (CNH). Ele utiliza processamento de imagens e integração com API para realizar essa funcionalidade.

## Começando

### 1. Clonar o Repositório

Clone este repositório em sua máquina local usando o seguinte comando:

- git clone https://github.com/JuliaPinheiro/upload-app


### 2. Instalar Dependências

Navegue até a pasta do projeto e instale as dependências necessárias com o seguinte comando:

- npm install


### 3. Executar a Aplicação

Para iniciar a aplicação, utilize o seguinte comando:

- npm run dev


Isso irá inicializar o servidor de desenvolvimento e você poderá acessar a aplicação através de um navegador.

## Funcionalidades

- **Efeito de Digitação:** A aplicação exibe um efeito de digitação que gradualmente revela o texto introdutório explicando o propósito do programa.

- **Arrastar e Soltar:** Os usuários podem arrastar e soltar uma imagem na área indicada para uma seleção rápida.

- **Upload de Imagem:** Os usuários podem escolher manualmente um arquivo de imagem do dispositivo usando o botão "Escolher Arquivo".

- **Remoção de Assinatura:** Após selecionar uma imagem, clicar no botão "Enviar imagem" aciona o processamento de imagem e a remoção da assinatura. A imagem resultante, apenas a assinatura é exibida.

## Dependências

- React: Biblioteca JavaScript para construção de interfaces de usuário.
- axios: Cliente HTTP baseado em promessas para fazer requisições à API de backend.
- @mui/material: Biblioteca de componentes React para construção da interface de usuário.
