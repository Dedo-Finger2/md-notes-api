# 📝 MD Notes

![cover](https://raw.githubusercontent.com/Dedo-Finger2/md-notes-api/master/public/cover.png)

<h3 align="center">📝 Veja suas anotações em qualquer lugar e a qualquer momento 📝</h3>

---

<p align="center">
    <img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
  <img src="https://img.shields.io/badge/Obsidian-%23483699.svg?style=for-the-badge&logo=obsidian&logoColor=white"/>
</p>

[![GitHub license](https://badgen.net/github/license/Dedo-Finger2/nlw-journey-node)](https://github.com/Dedo-Finger2/nlw-journey-node/blob/master/LICENSE)
[![GitHub latest commit](https://badgen.net/github/last-commit/Dedo-Finger2/nlw-journey-node)](https://github.com/Dedo-Finger2/nlw-journey-node/commit/)

Este projeto é uma API de um projeto que, com auxilio da API REST oficial do GitHub, permite aos usuários acessar e gerenciar suas anotações em Markdown armazenadas em qualquer repositório do usuário de forma prática e eficiente. 

O projeto é ideal para usuários que utilizam o GitHub como um repositório de backups e sincronização para anotações, como os usuários do Obsidian ou LogSeq. Ambos apps com funções de sincronização de arquivos pagas, porém com plugins que tornam a sincronização através do GitHub possível.

Através do MD Notes, você pode acessar suas anotações de qualquer dispositivo, seja um smartphone ou outro computador. Com simplicidade e facilidade uso.

---

### 🎯 Objetivo

O objetivo principal do **MD Notes** é oferecer uma maneira intuitiva de acessar e, brevemente, gerenciar suas anotações armazenadas em repositórios do GitHub, podendo então acessar tais anotações escritas em markdown através de qualquer dispositivo de forma gratuita e facilitadora.

---

### 😓 Dor Enfrentada

Muitos usuários enfrentam limitações com softwares de anotações em markdown que possuem um plano pago para dar acesso a funcionalidade de sincronização entre dispositivos. O **MD Notes** visa resolver este problema ao proporcionar uma integração direta com o GitHub, atuando como um micro-serviço entre o GitHub e o seu software de anotações favorito, permitindo a leitura e gestão dos arquivos Markdown de maneira descomplicada.

---

### 📋 Requisitos

#### Funcionais

- [x] **Registro de Dados**: Permitir o registro dos dados necessários para o uso da API do GitHub.
- [x] **Listagem de Arquivos**: Exibir a lista de arquivos presentes no repositório do GitHub.
- [x] **Listagem de Pastas**: Exibir a lista de pastas presentes no repositório do GitHub.
- [x] **Navegação em Pastas**: Permitir o acesso e visualização de arquivos dentro das pastas.
- [x] **Acesso a Arquivos Markdown**: Exibir o conteúdo dos arquivos Markdown (apenas leitura).

---

#### Não Funcionais

- [x] **Segurança dos Dados**: Armazenar dados do usuário em cookies HTTP Only para garantir segurança.
- [x] **Arquitetura Escalável**: Construir a aplicação com uma arquitetura que permita futuras expansões e melhorias.
- [x] **Documentação Completa**: Garantir que a API esteja totalmente documentada para fácil integração e uso.

---

#### Regras de Negócio

- [x] **Validação de Dados**: Rejeitar requisições com dados inválidos para a API do GitHub.
- [x] **Descriptografia**: Garantir que o conteúdo dos arquivos Markdown seja descriptografado corretamente para exibição.
- [x] **Suporte Exclusivo**: Suportar apenas arquivos Markdown.

---

### Arquitetura do projeto

*COMING SOON...*

---

### 🖥️ Tecnologias usadas

|Tecnologia|Uso|
|---|---|
|JavaScript|Linguagem usada|
|NodeJS|Runtime JS usada|
|Express|Servidor HTTP|
|Valibot|Validação de alguns dados|
|Eslint|Formatação e padronização de código|
|Prettier|Formatação e padronização de código|
|Husky|Execução de comandos antes de commits|
|Lint-Staged|Execução de scripts somente em arquivos staged|

---

### 🗎 Documentação da API

A documentação da API pode ser acessada através da rota `/api/docs` na porta padrão do projeto (3000).

> OBS: A documentação está na versão inicial, sendo assim será atualizada após a refatoração do código.

![api-docs](https://github.com/Dedo-Finger2/md-notes-api/blob/master/public/md-notes-api-docs.png?raw=true)

---

### 📱 Contato

- LinkedIn: www.linkedin.com/in/antonio-mauricio-4645832b3
- Instagram: https://www.instagram.com/antonioalmeida2003/
- Email: antonioimportant@gmail.com
