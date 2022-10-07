
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