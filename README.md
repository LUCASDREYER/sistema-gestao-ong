# Sistema de Gestão — ONG Vida Plena

Dashboard web para gestão de beneficiários, eventos e inscrições da ONG Vida Plena. Desenvolvido como projeto acadêmico para a disciplina de Banco de Dados Visuais e Ferramentas Integradas (UniFECAF).

## Sobre o projeto

A ONG Vida Plena atua há mais de 10 anos em comunidades periféricas da Grande São Paulo, promovendo eventos de inclusão digital, capacitação profissional e campanhas de saúde. Este sistema substitui planilhas manuais e grupos de WhatsApp por uma solução visual integrada com banco de dados na nuvem.

## Tecnologias

| Camada | Ferramenta |
|--------|-----------|
| Banco de dados | Airtable (No-Code) |
| Frontend | HTML, CSS, JavaScript (vanilla) |
| Integração | Airtable REST API |
| Hospedagem | GitHub Pages |

## Estrutura do banco de dados

Três tabelas relacionadas no Airtable:

- **Beneficiários** — Nome completo, idade, telefone, e-mail, região/bairro, situação
- **Eventos** — Nome do evento, data, tipo, local, capacidade máxima, status
- **Inscrições** — Tabela de junção entre Beneficiários e Eventos, com status da inscrição e presença

## Funcionalidades do dashboard

- Total de beneficiários cadastrados
- Total de eventos e inscrições realizadas
- Lista de próximos eventos com data, tipo, local e capacidade
- Inscrições recentes com nome do beneficiário, evento e status (Confirmada / Pendente / Cancelada)

## Arquivos

```
sistema-gestao-ong/
├── index.html   — estrutura do dashboard
├── style.css    — estilos e layout responsivo
├── script.js    — integração com a API do Airtable
└── README.md    — documentação do projeto
```

## Como executar localmente

Abra o `index.html` diretamente no navegador ou use um servidor local:

```bash
npx serve .
```

## Publicação

O projeto é publicado via **GitHub Pages**. Acesse o link público gerado nas configurações do repositório em Settings → Pages.
