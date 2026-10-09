---
title: 'Arquitetura'
description: 'Componentes React, rotas Next.js, animações e entrega de artigos VitePress.'
---

# Arquitetura

## Da URL ao HTML

Os grupos `src/app/(chinese)` e `src/app/(localized)` selecionam idioma e documento raiz. `/` e `/harness/` preservam a entrada chinesa; os demais idiomas usam `/<locale>/harness/`. O layout define `lang` e `dir`. A página obtém o dicionário e compõe `src/components/landing-page.tsx` no servidor.

`website-metadata.ts` gera título, descrição, canonical, hreflang, Open Graph e dados estruturados. Em produção `SITE_URL` determina a origem; previews do servidor usam a solicitação. HTML e conteúdo hidratado compartilham dados: não há adaptadores de HTML capturado nem alterações de Flight.

## Diretórios com responsabilidades

| Diretório                       | Responsabilidade                           |
| ------------------------------- | ------------------------------------------ |
| `components/layout`             | Cabeçalho, rodapé e marca                  |
| `components/controls`           | Idiomas, downloads, cópia e contato        |
| `components/sections`           | Composição das demonstrações e cartões     |
| `components/previews`           | Ilustrações e linhas do tempo              |
| `components/motion`             | Entradas e movimento ligado à rolagem      |
| `components/graphics`           | Three.js, GLSL e geometria                 |
| `components/shared`, `styles`   | Texto enriquecido e estilos comuns         |
| `i18n`, `config`                | Idiomas, conteúdo e destinos do produto    |
| `lib`                           | SEO e entrega de documentos                |
| `tests/tools`, `tests/fixtures` | Verificação e recursos de entrada de teste |

Imports diretos preservam limites servidor/cliente e carregamento adiado. Não há uma camada `harness` envolvendo todos os componentes ou recursos públicos.

## Três tipos de movimento

Framer Motion controla entradas de seções e molas do cabeçalho e das superfícies. Linhas do tempo CSS preservam a progressão das demonstrações quando pausadas. `use-demo-scene.ts` coordena pausa do usuário, viewport, aba ativa e movimento reduzido. As tarefas mudam de cenário ao iterar sua animação, sem um relógio separado.

Three.js desenha fundos próprios com shaders GLSL, um triângulo de tela cheia no hero e geometria instanciada na chamada final. Os módulos carregam quando necessários, compilam antes do ciclo, limitam o render a 30 fps e liberam recursos. O fundo final fica desativado no celular; movimento reduzido evita inicializar decoração GPU. Se WebGL falhar, permanecem fundos CSS e controles nativos.

## Documentação e cache

VitePress usa Vue para construir cinco artigos por idioma. Next.js lê esses HTML em `public/docs`, acrescenta SEO por origem e entrega por uma rota própria. O cache inclui origem e caminho, agrupa renders concorrentes, limita 128 entradas por cinco minutos e remove falhas. Desenvolvimento evita resultados antigos; ETag permite `304` sem corpo.

O tema VitePress atualiza direção e SEO depois de navegar. Não pode manter metadados do capítulo anterior. Chunks com hash têm cache imutável; HTML e recursos de entrada estáveis precisam de outra política.

## Exportação para GitHub Pages

`tests/tools/build-pages.mjs` cria `.pages-build` com nosso código-fonte. Lá predefine rotas, remove a rota documental de servidor e usa `output: export` com imagens sem otimizador. O build acrescenta o prefixo do repositório aos recursos e links, gera VitePress e Next.js e copia o resultado para `out`. Por fim remove o diretório temporário, mesmo se houver falha.

Isso preserva o servidor de desenvolvimento. Pages entrega documentos diretamente: não executa cache ETag próprio nem rotas por solicitação. `check:pages` verifica rotas, metadados e destinos locais antes de enviar o artefato. O workflow obtém a URL real do Pages para repositórios, sites raiz e domínios personalizados.

## Configuração de ferramentas

`AGENTS.md` concentra instruções compartilhadas. Cursor o referencia; Claude importa esse arquivo; Codex usa descoberta normal e configuração local mínima. Preferências privadas, tokens, MCP e estado de execução ficam fora do Git. Oxlint e Oxfmt são as ferramentas de lint e formato.

## Limites de renderização e publicação

As ilustrações estáticas de arquivos e rastros são renderizadas no servidor. Os controles e o workflow com cenários variáveis são componentes cliente. A grande árvore SVG de plugins mantém uma fronteira cliente para limitar a serialização HTML/RSC. Compare HTML e scripts antes de mover uma fronteira.

```text
locale registry → deployment paths → Next.js / VitePress → metadata
server content → client controls → CSS playback / Three.js lifecycle
verify:full → Pages export → static tests + budgets → publish artifact
```

- `src/config/deployment.ts`, `src/i18n/locales.ts`
- `src/components/sections/capability-demos.tsx`, `capability-demo.tsx`
- `src/components/previews/plugins-demo.tsx`, `workflow-preview.tsx`
- `tests/tools/build-pages.mjs`, `.github/workflows/quality.yml`
