---
title: 'Requisitos do site'
description: 'Verificações de layout, navegação, acessibilidade, publicação e desempenho.'
---

# Requisitos do site

## Aceitação visual e funcional

Uma recriação de componentes só é aceita após comparar geometria, fontes, espaços, camadas, controles e etapas de animação com a referência. Teste os quatro demos, cópia de comandos, downloads e cabeçalho em 0, 80 e mais de 80 pixels. Uma captura do estado final não basta.

No celular verifique menus, rolagem e áreas de toque. Com teclado verifique foco, Escape e ativação nativa. Em árabe revise leitura e código LTR. O rodapé chinês abre o QR; os demais idiomas levam ao X. O seletor deve caber no viewport e permitir rolar por todas as opções.

## Contrato de conteúdo

Cada idioma precisa de dicionário, cartões, rótulos acessíveis, metadados, navegação e cinco artigos. Preserve placeholders e tags de rich text. As descrições de frontmatter correspondem a `docs/descriptions.json`. Inglês permanece a entrada da documentação; mudar idioma preserva o artigo.

## Fonte e saídas

Mantenha `src`, Markdown, configuração e recursos de entrada estáticos. Ignore dependências, caches, relatórios, `.next`, `.pages-build`, `public/docs` e `out`. Não envie arquivos privados nem acrescente HTML ou chunks capturados. Hashes demonstram integridade, não licença.

## Publicar no Pages

Adicione o remote, envie a branch padrão e selecione **Settings → Pages → Build and deployment → GitHub Actions**. O workflow `Publish website` obtém a URL, verifica código, compila o site, valida links locais, envia o artefato e publica no ambiente `github-pages`.

Para reproduzir uma URL com subdiretório:

```sh
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

Um site raiz usa uma URL sem nome de repositório. Pages não executa Node.js: metadados são gerados no build e não se aplica o cache dinâmico do Next.js. O workflow fornece a URL pública no resultado; um build local não comprova deploy remoto.

## Entrega Next.js

Para servidor Node.js use `pnpm build` e `pnpm start`, com `SITE_URL` correspondente ao domínio público. Inclua todo `public/docs` gerado. Verifique headers, ETags, erros de rota e canonical no domínio publicado.

## Medição e colaboração

Execute `pnpm verify`, testes de navegador e orçamentos conforme a alteração. Não afrouxe a linha base para obter sucesso. Lighthouse descreve o ambiente medido; complemente com dispositivos reais e revisão humana. Use templates de issues e PR, respeite `CONTRIBUTING.md` e comunique vulnerabilidades em privado conforme `SECURITY.md`.

## Validação manual

Verifique teclado, Escape e retorno de foco nos menus e avisos de cópia com leitor de tela. Em um celular, examine rolagem e etapas animadas. Repita em árabe com textos longos e comandos bidirecionais. Registre aparelho, navegador, preferência de movimento e evidências. As traduções precisam de revisão por falantes nativos.

```sh
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
SITE_URL=https://example.github.io/repository/ pnpm perf:pages
```
