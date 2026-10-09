---
title: 'Trilha de aprendizado'
description: 'Ordem de leitura do código e seis exercícios para alterar e verificar o site.'
---

# Trilha de aprendizado

Abra o site e localize o código que gera a página. Os seis exercícios tratam de cartões, idiomas, cache, animações, metadados dos artigos e recursos.

## Primeiro observe e trace

Abra inglês e árabe, mude o tamanho da tela, navegue com teclado e ative movimento reduzido. Anote estados do cabeçalho, menus e demonstrações. Depois siga `page.tsx` → `layout.tsx` → `landing-page.tsx` → componentes → dicionário → metadata. Explique qual HTML o servidor produz e o que os eventos do cliente acrescentam.

## Exercício 1: Um cartão compartilhado

Altere um cartão em `site-content.json` em todos os idiomas. Preserve ID estável e destino. Verifique conteúdo antes e depois da hidratação, sem JavaScript e em árabe móvel. O resultado deve usar a mesma árvore JSX e preservar demonstrações originais.

## Exercício 2: Um idioma de ponta a ponta

Siga espanhol do registro até menu, layout, dicionário, cinco documentos e sitemap. Mude idioma com query e fragmento. Abra um capítulo e mude para português preservando o capítulo. Verifique canonical e direção após navegar. Explique por que traduzir um JSON não completa a localização.

## Exercício 3: Entrega e cache

No modo servidor solicite `/docs/en/architecture/`, reutilize seu ETag real e observe um `304` vazio. Sem `SITE_URL`, mude o host de preview e verifique isolamento de origem. Leia `document-cache.ts`: entradas limitadas, agrupamento de promessas, expiração e remoção de falhas.

Compare com o mesmo artigo exportado para Pages. Explique o que o build decide e o que o servidor controlava; não espere que Pages reproduza ETags da aplicação.

## Exercício 4: Uma regressão de movimento

Pause e retome uma cena. Mova-a para fora do viewport, troque de aba e ative movimento reduzido. Observe se mantém progresso e se o fundo GPU deixa de trabalhar. Identifique o responsável entre `use-demo-scene`, CSS, Framer Motion e Three.js. Uma captura não comprova esses estados.

## Exercício 5: SEO durante a navegação

Melhore uma descrição em `docs/descriptions.json` e no frontmatter correspondente. Construa docs, mude de capítulo e idioma e conte os nós canonical e alternativos. Verifique se os metadados antigos desaparecem e as URLs usam origem e prefixo publicados.

## Exercício 6: Propriedade e publicação

Leia o inventário de recursos, altere um input apenas quando necessário e revise seu hash. Exporte com prefixo de repositório, execute `check:pages` e verifique fonts, favicon, cenas e docs. Distinga `.pages-build`, `out`, código original e material de terceiros.

## Verifique e explique o resultado

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm perf:check
pnpm check:links --strict
```

Use uma porta livre e um build de produção para o navegador. Resultados locais e de GitHub Actions são evidências distintas. Uma explicação profissional conecta problema do visitante, limite do código, cenário testado e limitação pendente. Não apresenta uma lista de bibliotecas como prova de desempenho, acessibilidade ou fidelidade.

## Acompanhar uma melhoria completa

Localize uma tarefa longa nos arquivos abaixo, faça uma alteração limitada e compare bytes, interação e capturas. Guarde relatórios fora das fontes versionadas. Revise diferenças antes de atualizar referências; imagens locais não comprovam fidelidade pixel a pixel ao original.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Termo             | Significado                                         |
| ----------------- | --------------------------------------------------- |
| SSR               | Renderização no servidor                            |
| Hydration         | Hidratação: adicionar interação ao HTML do servidor |
| Reduced motion    | Preferência por movimento reduzido                  |
| RTL               | Layout da direita para a esquerda                   |
| Visual regression | Testes de regressão visual                          |
| Resource budget   | Orçamento de recursos                               |
