# Contribuindo com o Projeto

  

Antes de dar qualquer contribuição, verifique as `issues` desse repositório para que você saiba com o que contribuir. 😉

  

## Começando a Contribuir

  

Dê um `fork` nesse repositório e clone para sua máquina local:

  

```bash

git clone https://github.com/<seu-nome-de-usuario-github>/limos-hackathon.git

```

  

## Antes de dar Commits

  

Devido ao escasso tempo para disponibilizar a aplicação em produção, definimos algumas regras para dar `commits`:

  
  

- A `master` será usada para o `deploy` da aplicação.

- Qualquer alteração será feita em um `branch` separado.

- Após dar `fork` e clonar esse repositório, crie um `branch` com o seu nome de usuário do `github` e o título da tarefa que está executando:

  

```bash

#Exemplo:

git checkout -b i-am-groot_style-form-components

```

  

- Qualquer alteração feita por você, deverá ser feita dentro desse branch.

  

## Commits

  

Depois de fazer suas contribuição, chegou a hora dos commits. Pedimos que:

  

- o texto do `commit` esteja em inglês

- estamos vendo alguma forma de padronização dos textos dos `commits`. Até lá, pedimos para que vocês sigam um modelo semelhante ao [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

  

## Dando Commits

  

Na `branch` com seu nome e tarefa, faça os commits e envie seu branch e atualizações para a sua cópia do repositório, ou seja, aquele que você deu `fork`, através dos comandos:

  

```bash

git push

```

  

### Pull Request(PR)

  

Depois dos `commits`, chegou a hora do `Pull Request`. Aguarde o `code review`. Se estiver tudo certo, daremos um `merge` e você será notificado. Caso não tenha nenhuma alteração a ser feita, seu `branch` poderá ser deletado com segurança.

  

Caso contrário, você receberá uma mensagem de quem está fazendo o `code-review`. Veja o que precisa ser feito, faça as alterações, se necessário, e dê o `PR` de novo. Isso será feito até que sua contribuição seja aprovada.

  

## Atualizando o seu repositório local

  

Caso deseje continuar contribuindo, além de seguir os passos anteriores, sugerimos fortemente que você sempre atualize o seu repositório local, especialmente antes de começar a trabalhar em uma nova tarefa.

  

Existem algumas formas de fazer, mas vou deixar uma sugestão de comandos e passos para seguir:

  

Entre na pasta do projeto e, no `branch master`, adicione como repositório remoto aquele de onde virá a atualização, no caso este aqui:

  

```bash

git remote add upstream https://github.com/maikvinicius/limos-hackathon.git

```

  

Busque pela atualizações:

  

```bash

git fetch upstream

```

  

Nesse ponto, você pode usar os comandos de `merge` ou `rebase`. Aqui vamos usar `rebase`:

  

```bash

git rebase upstream/master

```

  

Envie as atualizações para o seu repositório no GitHub(`origin`):

  

```bash

git push origin master

```

  

## Antes de abrir uma `issue`

  

Na aba `issues`, verifique se já não existe uma `issue` similar ao problema/sugestão que deseja reportar.

---
Page create by [vanribeiro](https://github.com/vanribeiro)
