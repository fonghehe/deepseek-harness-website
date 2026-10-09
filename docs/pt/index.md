---
title: 'Visão geral do projeto'
description: 'Estrutura, implementação e testes do site que recria o DeepSeek Harness.'
---

# Visão geral do projeto

Este repositório recria o site DeepSeek Harness com Next.js e React. A documentação descreve páginas, componentes, idiomas, animações e testes. Os artigos são gerados com VitePress.

## Experiência e limites

A página preserva introdução, quatro demonstrações, cartões de recursos, instalação e rodapé. As demonstrações apresentam conversa, plugins, arquivos e tarefas agendadas; o rastro acrescenta uma visão de execução. São ilustrações, não um agente real: não instalam plugins nem executam comandos.

O cabeçalho se recolhe após 80 pixels de rolagem. Até esse ponto você pode mudar de idioma; quando o recolhimento começa, o seletor fecha e desaparece. Menu móvel, downloads, cópia de comandos e pausa das cenas têm estados explícitos. O rodapé chinês apresenta WeChat; os demais idiomas levam à DeepSeek no X.

## O que um engenheiro frontend pode aprender

- Compor HTML de servidor e controles de cliente sem duplicar a interface.
- Manter geometria complexa com CSS, consultas de contêiner e componentes semânticos.
- Separar movimento de interface com Framer Motion, linhas do tempo CSS e gráficos Three.js.
- Tratar idiomas, acessibilidade e SEO como contratos compartilhados.
- Entregar documentação VitePress em um site React e verificar navegação e metadados.
- Distinguir recursos fonte, saídas geradas, cache e orçamentos mensuráveis.

## Uma base para vários idiomas

`src/i18n/locales.json` define rótulos nativos, rotas, direção e tags de idioma. Inglês é o idioma principal da documentação, aberto diretamente em `/docs/`. Espanhol e português complementam inglês, chinês, japonês, francês, alemão, coreano, russo e árabe. Cobertura ampla não representa todos os países; traduções precisam de revisão humana.

Árabe usa RTL; código permanece LTR. Links de idioma preservam consultas e fragmentos. Todos os idiomas mantêm cinco artigos, com navegação, descrições e links alternativos correspondentes.

## Entrega e propriedade

O servidor Next.js entrega HTML por solicitação e documentos com ETag e cache limitado. GitHub Pages recebe uma exportação estática independente, com prefixo de repositório e sem precisar de Node.js em produção. No Pages os metadados são definidos na compilação; o cache de servidor existe apenas no deploy Next.js.

Mantemos componentes, shaders, CSS, Markdown e recursos de entrada estáticos. `.next`, `public/docs`, `.pages-build` e `out` são saídas ignoradas. O material de marca continua pertencendo a terceiros; consulte `NOTICE.md`.

## Evidência antes de afirmações

`pnpm verify` verifica formato, lint, contratos, tipos e compilação. Playwright observa hidratação, controles, idiomas, acessibilidade e gráficos. Lighthouse fornece medições de laboratório, não garantias de velocidade. Usar Three.js ou Framer Motion não demonstra melhoria de desempenho nem fidelidade de pixels.

Continue em [Arquitetura](./architecture/), [Destaques](./highlights/), [Requisitos](./requirements/) e [Trilha de aprendizado](./learning/).
