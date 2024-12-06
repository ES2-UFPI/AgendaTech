# Changelog

Todas as mudanças notáveis neste projeto serão documentadas aqui.

O formato segue as convenções de [Keep a Changelog](https://keepachangelog.com/) e este projeto adota [Semantic Versioning](https://semver.org/).

---

## [Unreleased]
### Adicionado
- **Frontend:** Estrutura inicial do projeto em React com rotas utilizando React Router.
- **Backend:** Estrutura inicial do projeto em Django com suporte ao Django REST Framework.
- **Integração:** Configuração de CORS para permitir a comunicação entre React e Django.
- **Recursos:** 
  - Cadastro e exibição de eventos.
  - Suporte para recorte de imagem ao cadastrar eventos.
  - Upload de imagens para o diretório `/media/eventos` no backend.
  - Paginação de eventos no frontend com suporte a backend.
  - Tema dinâmico (claro, escuro e automático) utilizando Bootstrap.
  - Tela de criação de eventos com validação de campos e tratamento de erros específicos.
  - Tela de listagem de eventos na página principal.
  - Integração com SQLite para persistência de dados.

### Alterado
- **Estrutura:** Migração do protótipo HTML estático para um sistema React + Django totalmente integrado.
- **Banco de Dados:** 
  - IDs redefinidos para reiniciar após limpeza do banco.
  - Imagens salvas diretamente no diretório `/media/eventos` em vez de armazenadas como blobs no banco de dados.
  - Remoção da tabela `agenda_palestrante` e referências relacionadas.
- **Backend:** 
  - Endpoint `/api/cadastrar_evento/` atualizado para aceitar imagens e outros dados via `FormData`.
  - Melhorias no gerenciamento de erros nos endpoints.
- **Frontend:** 
  - Melhoria no fluxo de comunicação com o backend, incluindo mensagens de erro detalhadas.
  - Atualização da exibição de eventos na página inicial para suportar dados paginados.

### Removido
- **Estrutura:** Protótipos HTML e CSS usados na fase inicial foram substituídos.
- **Banco de Dados:** Tabela `agenda_palestrante` removida do projeto e do banco de dados.

---

## [0.1.0] - 2024-12-02
### Adicionado
- **Inicialização:** Criação do protótipo inicial em HTML e CSS com layout básico.
- **Estrutura:** Planejamento inicial do projeto com foco na exibição de eventos de tecnologia.

---

Este changelog é um resumo de todas as mudanças significativas realizadas no projeto. Para detalhes técnicos, consulte o repositório Git.
