# 🚀 Rocket Launch System

<div align="left">
    <img src="https://img.shields.io/badge/language-typescript-blue">
    <img src="https://img.shields.io/badge/backend-express-brightgreen">
    <img src="https://img.shields.io/badge/database-postgres-red">
</div>

---

Trabalho Prático da disciplina de de Engenharia de Software 2 da UFMG

## Grupo

- Gabriel Camatta Zanotelli - 2018020140
- Lucas de Almeida Martins - 2018020328
- Nander Santos do Carmo - 2018019931

## Explicação do sistema

Esse sistema simples simula uma aplicação responsável por catalogar lançamentos de foguetes. Cada um desses lançamentos sendo relacionados a um foguete único e podendo conter uma tripulação (lançamento tripulado). Essa tripulação por sua vez contém alguns triupulantes que possuem patentes ou "cargos". 

O sistema em si se trata de uma API REST simples, capaz de realizar todas as ações de CRUD (Create, Read, Update, Delete) para todas essas entidades descritas acima e representadas abaixo nesse diagrama relacional abaixo:

![Diagrama de Entidades](./resources/entities.png)

## Tecnologias utilizadas

Para o desenvolvimento desse sistema optou-se por utilizar as seguintes tecnologias:

- **Linguagem de Programação**: Typescript
- **Framework da API**: Express
- **Banco de dados**: PostgresSql


## Relatório inicial do Lizard

O relatório inicial gerado pela ferramenta Lizard está integralmente mostrado em um arquivo PDF dentro da pasta `reports` deste repositório. Além de estar melhor representaod como um arquivo MD nesse mesmo diretório.

Você pode acessar o relatório em PDF clicando [aqui](/reports/TP1%20-%20Entrega%20Parcial%201.pdf).

Você pode acessar o arquivo MD com os relatórios de saída do Lizard formatada de forma a faciltiar a leitura clicando [aqui](/reports/lizard.md).

## Identificação das funções mais complexas

Do relatório de complexidade do sistema realizado pela ferramenta Lizard, pôde-se retirar que as três funções mais complexas do sistema são as seguintes:

| NLOC | CCN | token | PARAM | length | location                                     |
|------|-----|-------|-------|--------|----------------------------------------------|
|   20 |   9 |   140 |     1 |     26 | launchServiceCreateLaunch@22-47@src/service/LaunchService.ts |
|   20 |  10 |   216 |     2 |     27 | launchServiceUpdateLaunch@49-75@src/service/LaunchService.ts |
|   13 |   4 |   102 |     2 |     19 | crewServiceUpdateCrew@41-59@src/service/CrewService.ts |

### Refatorações

- [Refatoração 1: extração de métodos na função LaunchService::launchServiceCreateLaunch](https://github.com/nandercarmo/engsoft2/commit/08140ba852c94d2f6c101e4a071cd93497e7486e):

	Nessa refatoração, o que foi identificado é que uma parte da lógica interna da função `launchServiceCreateLaunch` dentro do arquivo `src/service/LaunchService.ts` poderia ser extraída para uma função auxiliar, uma vez que se tratava de uma série de regras para a criação de uma nova instância da entidade `Launch`. Dessa forma foi criada a função `buildNewLaunch` de forma a encapsular essas regras.

	OBS: Temos ciência de que uma forma melhor de lidar com essa criação de um objeto complexo seria pela utilziação do design pattern Builder, por exemplo, mas por ora, preferimos seguir nesse caminho por simplicidade.

- [Refatoração 2: extração de métodos na função LaunchService::launchServiceUpdateLaunch](https://github.com/nandercarmo/engsoft2/commit/b9d85d691b3b004b11b48c33ec9eb14a9a263961):

	Nessa refatoração, o que foi identificado é que uma parte da lógica interna da função `launchServiceUpdateLaunch` dentro do arquivo `src/service/LaunchService.ts` poderia ser extraída para uma função auxiliar, uma vez que se tratava de uma série de regras de atualização da entidade `Launch`. Dessa forma foi criada a função `update` de forma a encapsular essas regras.

- [Refatoração 3: extração de métodos na função CrewService::crewServiceUpdateCrew](https://github.com/nandercarmo/engsoft2/commit/bea68de762850d11f320e97e0f2abe2602e018bc):

	Nessa refatoração, o que foi identificado é que uma parte da lógica interna da função `crewServiceUpdateCrew` dentro do arquivo `src/service/CrewService.ts` poderia ser extraída para uma função auxiliar, uma vez que se tratava de uma série de regras para buscar também infromações da entidade `Crewman` que não fazem sentido estarem dentro do código da função de criação de um `Crew`.