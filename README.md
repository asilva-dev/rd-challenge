# Javascript

## Como rodar os testes

No terminal, execute os comandos:

```bash
cd javascript
yarn
yarn test
```

Ou usando o NPM:

```bash
cd javascript
npm install
npm test
```

# RD Challenge

## Nossas expectativas

A equipe de engenharia da RDStation tem alguns princípios onde baseamos nosso trabalho diário. Um deles é: Projete seu código para ser mais fácil de entender, não mais fácil de escrever.

Portanto, para nós é mais importante um código de fácil leitura do que um que utilize recursos complexos e/ou desnecessários.

O que gostariamos de ver:

- O código deve ser fácil de ler. [Clean Code](https://medium.com/rd-shipit/clean-code-23580b4e556c) pode te ajudar
- Notas gerais e informações sobre a versão da linguagem e outras informações importantes para executar seu código.
- Código que se preocupa com a performance (Complexidade de Algoritmo)
- O seu código deve cobrir todo os casos de usos presentes no README, mesmo que não haja um teste implementado para tal.
- Você deve enviar para nós `um arquivo zip` contendo o código-fonte da solução e as instruções para rodá-lo ou pode fazer
  o upload da solução para repositórios públicos (GitHub, BitBucket, etc) e nos enviar o link de acesso.
- Testes. Você pode adicionar novos testes, mas sem alterar o pacote original

## O Desafio - CustomerSuccess Balancing

Este desafio consiste em um sistema de balanceamento entre clientes e Customer Success (CSs). Os CSs são os Gerentes de Sucesso, são responsáveis pelo acompanhamento estratégico dos clientes.

Dependendo do tamanho do cliente - aqui nos referimos ao tamanho da empresa - nós temos que colocar CSs mais experientes para atendê-los.

Um CS pode atender mais de um cliente, além disso os CSs também podem sair de férias, tirar folga, ou mesmo ficarem doentes, então é preciso levar esses critérios em conta na hora de rodar a distribuição.

Dado este cenário, o sistema distribui os clientes com os CSs de capacidade de atendimento mais próxima (maior) ao tamanho do cliente.

### Exemplo

Se temos 6 clientes com os seguintes níveis: 20, 30, 35, 40, 60, 80 e dois CSs de níveis 50 e 100, o sistema deveria distribui-los da seguinte forma:

- 20, 30, 35, 40 para o CS de nível 50
- 60 e 80 para o CS de nível 100

Sendo `n` o número de CSs, `m` o número de clientes e `t` o número de abstenções de CSs, calcular quais clientes serão atendidos por quais CSs de acordo com as regras apresentadas.

### Premissas

- Todos os CSs têm níveis diferentes
- Não há limite de clientes por CS
- Clientes podem ficar sem serem atendidos
- Clientes podem ter o mesmo tamanho
- 0 < n < 1.000
- 0 < m < 1.000.000
- 0 < id do cs < 1.000
- 0 < id do cliente < 1.000.000
- 0 < nível do cs < 10.000
- 0 < tamanho do cliente < 100.000
- Valor máximo de t = n/2 arredondado para baixo

## Input

A função `customerSuccessBalancing()` recebe 3 parâmetros:

- id e nivel da experiencia do CS
- id e nivel de experiência dos Clientes
- ids dos CustomerSuccess indisponíveis

## Output

O resultado esperado deve ser o id do CS que atende mais clientes. Com esse valor a empresa poderá fazer um plano de ação para contratar mais CS's de um nível aproximado.

Em caso de empate retornar `0`.

### Exemplo

No input de exemplo, CS's 2 e 4 estão de folga, sendo assim o CS 1 vai atender os clientes de tamanho até 60 (clientes 2, 4, 5, 6), enquanto o CS 3 vai atender os clientes 1 e 3.

Para este exemplo o retorno deve ser `1`, que é o id do CS que atende 4 clientes:

```
1
```

### Explicação

Pensando na separação de responsabilidades, foi criado um arquivo de testes, separado do do principal.

1. A função customerSuccessBalancing recebe três parâmetros: customerSuccess (um array que representa os CustomerSuccess), customers (um array que representa os clientes) e customerSuccessAway (um array opcional que representa os CustomerSuccess ausentes).
2. Primeiro, o código mapeia o array customerSuccess para criar um novo array allCss, que contém objetos com as propriedades id e score de cada CustomerSuccess.
3. A variável csAway é definida como o parâmetro customerSuccessAway ou um array vazio, caso não seja fornecido.
4. O array availableCSs é criado a partir do allCss filtrando os CustomerSuccess cujos IDs não estão presentes no array csAway.
5. Os arrays csScores e customerScores são ordenados em ordem crescente com base no score, utilizando a função sort e uma função de comparação.
6. Em seguida, são definidas três variáveis para controlar os índices enquanto percorremos os arrays: csIndex para o índice do availableCSs, customerIndex para o índice dos customers e customerCountByCS, que é um array preenchido com zeros para armazenar o número de clientes atribuídos a cada CustomerSuccess.
7. O código entra em um loop while para distribuir os clientes com base nos scores. Ele compara o score do cliente atual (customerScores[customerIndex].score) com o score do CustomerSuccess atual (csScores[csIndex].score). Se o score do cliente for menor ou igual ao score do CustomerSuccess, o contador correspondente no array customerCountByCS é incrementado e passamos para o próximo cliente. Caso contrário, passamos para o próximo CustomerSuccess.
8. Após o loop, a função determina qual CustomerSuccess recebeu o maior número de clientes. Ela encontra o máximo número de clientes atribuídos (maxCustomerCount) usando Math.max no array customerCountByCS. Se houver mais de um CustomerSuccess com o mesmo máximo número de clientes, a função retorna 0 (indicando um empate). Caso contrário, ela encontra o índice do CustomerSuccess com o máximo número de clientes usando findIndex e retorna o ID desse CustomerSuccess.
9. Por fim, a função exporta o objeto { customerSuccessBalancing }, tornando-a acessível para outros módulos.
