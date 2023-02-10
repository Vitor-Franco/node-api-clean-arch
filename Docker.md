#### Docker 

- Docker, isola todas as dependências do seu projeto em um container, para que você possa rodar seu projeto em qualquer lugar, sem precisar instalar nada além do Docker.
- Mantém todas as versões iguais entre os desenvolvedores, evitando problemas de compatibilidade.
- Faz testes de upgrade de versões de dependências, e validar se vale a atualização.

#### Instalação

1. `docker build -t clean-node-api .`
1. `t => tag`
1. `. => caminho do Dockerfile` (dentro da onde o comando está sendo executado)

#### Visualizar a imagem
1. `docker run -it clean-node-api sh`
1. `i => interactive`
1. `t => tty`
1. `sh => shell`
1. `exit => sair do container`

#### Executar imagem
1. `docker run -p 5000:5000 clean-node-api`
1. `p => port`
1. `5000:5000 => porta local:porta container`