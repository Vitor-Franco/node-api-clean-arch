
# TSCONFIG
## Compiler Options, 
- outDir, onde os arquivos serão gerados.
- module, qual o formato do código ao ser compilado (ou seja, podemos usar a funcionalidade de import/export mas no build ser require/module.exports).
- target, qual a versão do javascript que o código será gerado. Ficar de olho em qual versão do node está sendo usada no servidor, para que não tenhamos erros na hora de compilar o código e utilizar funcionalidades n disponível naquela versão X do node.
- esModuleInterop, para os modulos externos possam utilizar o import/export.
- allowJs, para que o typescript aceite arquivos javascript.

# EslintJson
## ParserOptions
Project -> Projeto relacionado ao typescript, para que o eslint possa ler as configurações do typescript.

# Husky
- Husky, seta precondições a serem rodadas antes do git subir uma alteração ou commitar
2. Lint-staged, ajuda o husky a fazer a validação do lint dos arquivos, só que apenas validando arquivos em STAGE.
2.1 -> Passamos para o lint-staged o passo-a-passo de comandos a serem executados, e em quais arquivos serão executados

https://www.notion.so/vitor-franco/NodeJs-Patterns-e-Aplica-o-118933676aa44bcabad5c2296e9b8733

# Segurança

## Criptografia
É usado para segurança.
### Hash
1. é irreversível, não tem como voltar para o valor original
2. Ao gerar um hash, sempre teremos o mesmo valor para o mesmo dado. Exemplo, se eu gerar um hash para a palavra "teste", sempre teremos o mesmo HASH para essa palavra.
3. Pode ter uma chave secreta.
4. salt, é uma string/number aleatória que é adicionada ao dado para gerar o hash. Exemplo, se eu gerar um hash para a palavra "teste", sempre teremos o mesmo HASH para essa palavra, porém, se eu gerar um hash para a palavra "teste" + "salt", sempre teremos um HASH diferente para essa palavra.

### Encrypt
1. Sempre usa uma chave secreta, porém esse encrypt é reversível.
2. Ao encryptar, sempre teremos um valor diferente para o mesmo dado. Exemplo, se eu encryptar a palavra "teste", sempre teremos um Encrypt com valor diferente para essa palavra.

## Encoding
É usado para transferência de dados, não está preocupado com segurança. Apenas oculta as informações.

## Architecture
DataLayer, DomainLayer e Presentation -> São as camadas mais importantes.
InfraLayer - Conversa com o DataLayer (preferencial) ou o DomainLayer. É uma camada que fica na ponta da arquitetura e que conversa diretamente com uma biblioteca ou framework.
PresentationLayer - Conversa com o DomainLayer.
MainLayer - É a camada que conhece as outras camadas. 


## Deploy
rimraf -> é um pacote que remove arquivos e pastas.