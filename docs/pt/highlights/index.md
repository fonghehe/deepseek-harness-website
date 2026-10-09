---
title: 'Destaques do frontend'
description: 'Notas sobre controles, idiomas, animações, SEO e recursos.'
---

# Destaques do frontend

## 1. Hierarquia que leva a uma ação

A introdução explica o produto, as cenas tornam os recursos visíveis e os cartões permitem aprofundar antes de instalar. A página original permanece e a informação cresce com seções adicionais. Hierarquia se verifica por ritmo, espaço e contraste, não pelo número de componentes.

## 2. Componentes que possuem a interface

Cada ilustração usa React e CSS legíveis. Texto, geometria e tempos são editáveis. Capturas servem de referência temporária; não substituem componentes.

## 3. Consistência servidor/cliente

Composição, tradução e formato de datas são resolvidos uma vez no servidor. Controles de cliente acrescentam eventos sem reconstruir a estrutura inicial. Assim versões distintas de ICU não alteram datas durante a hidratação.

## 4. Melhoria progressiva

`details`, `summary`, links e botões oferecem semântica e comportamento básico. JavaScript acrescenta fechamento externo, Escape, foco e bloqueio do menu móvel. Conteúdo relevante permanece acessível sem JavaScript.

## 5. Idiomas como contrato

Um registro controla rotas, rótulos, direção, documentos e SEO. A validação compara chaves, variáveis, rich text e artigos. Tipografia também exige revisão visual: paridade de chaves não detecta textos cortados.

## 6. RTL coerente

Propriedades lógicas alinham menus e espaçamento. Árabe inverte o fluxo do documento; código e comandos mantêm a ordem. Não se inverte a marca nem se isola arbitrariamente cada palavra latina.

## 7. Movimento conforme a finalidade

Framer Motion coordena transições de interface; CSS mantém cenas repetitivas; Three.js cuida de geometria e shaders. Essa separação facilita alterar uma animação sem reconstruir as demais.

## 8. Ciclo de vida GPU explícito

Visibilidade, primeiro plano, compilação, limite de fps e limpeza controlam o custo. Movimento reduzido e fallback WebGL preservam o uso da página. Uma biblioteca conhecida não garante superar uma implementação menor.

## 9. Superfícies adaptáveis

As cenas usam geometria e consultas de contêiner para preservar proporções conforme o tamanho. A aceitação exige observar celular, desktop, quebra de texto e cada etapa da animação.

## 10. SEO observável

Títulos, descrições, canonical, alternativas, compartilhamento e dados estruturados existem no HTML inicial. Documentos trocam metadados ao navegar. A publicação estática verifica prefixo de repositório e rotas reais.

## 11. Documentação como produto

A documentação abre inglês diretamente, compartilha idiomas com o site e oferece busca e navegação por capítulo. Descreve decisões e limites deste frontend, não um manual do runtime Harness.

## 12. Verificação e propriedade

Hashes verificam recursos de entrada estáticos; testes verificam comportamento; orçamentos de payload limitam regressões. Relatórios ficam ignorados e não se substitui o baseline para ocultar crescimento. `NOTICE.md` distingue código original de marca e recursos de terceiros.

## Desempenho com evidências

A decoração aguarda as fontes e a animação de entrada do primeiro bloco, seguida de uma atualização da tela e de uma tarefa durante um período ocioso do navegador. O ramo flow-map de influência sempre nula é removido sem alterar o resultado. O contador de quadros exige ativação explícita. Pausa fora da tela e em segundo plano, 30fps, movimento reduzido e liberação de GPU permanecem. Meça Node e Pages separadamente e compare várias execuções com aparelhos reais.

- `src/components/graphics/schedule-scene.ts`, `fluid-shaders.ts`
- `src/components/graphics/particle-field.tsx`, `tile-scene.ts`
- `tests/tools/audit-performance.mjs`, `tests/fixtures/performance-budgets.json`
