# NotedAPP Interview

APP desenvolvido com Framework Ionic 3 com Capacitor e nodeJS versão 14.17.6

## Configurando o APP para acessar a API

No projeto existe uma variavel de ambiente que guarda o endereço da API
Ela se encontra em **src\providers\environment.ts**
Essa variável de ambiente tem o formato
```typescript
const production = false;

environment = {
  url: production? 'url_producao':'url_local',
  token: "token"
}
```

Para configurar o APP para acessar uma API rodando localmente altere o valor de production para **false** e onde se oncontra **url_local** insira o endereço configurado ao rodar o projeto [NodeAPI](https://github.com/claudio-henriq/NotedAPI)

Para configurar o APP para acessar uma API rodando em produção altere o valor de production para **true** e onde se oncontra **url_producao** insira o endereço do servidor que está rodando o projeto [NodeAPI](https://github.com/claudio-henriq/NotedAPI)

## Instalando o APP e Testando

Para criar uma build desse projeto acesse a pasta raiz do projeto (ex. **NotedAPP**) e execute os seguintes passos:

* Atualize o NodeJS para uma versão LTS recente
* Instale o Ionic CLI
```bash
$ npm install -g ionic@latest
```
* Na pasta raiz instale os pacotes Node
```bash
$ npm install
```
* Adicione uma plataforma para o sistema de deseja executar [Android/IOS]
```bash
$ ionic capacitor add android
```

Caso deseje rodar no modo WEB execute o comando
```bash
$ ionic serve
```

Para rodar num dispositivo movel conecte um aparelho com o modo depuração ativado e execute:
```bash
$ ionic capacitor run android
```

Para gerar uma Build  execute
```bash
$ ionic capacitor run android --prod
```
