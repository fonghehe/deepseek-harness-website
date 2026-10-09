---
title: 'Frontendové postupy'
description: 'Poznámky k ovládání, jazykům, animacím, SEO a zdrojům.'
---

# Frontendové postupy

## Informace a ovládání

Postupujte od přínosu přes příklad a podrobnosti k akci. Používejte skutečné odkazy a prvky HTML. Prověřte klávesnici, Escape, návrat fokusu, úzké nabídky a práci bez JavaScriptu.

## Jazyky a SEO

Slovníky, přístupné popisky, metadata, navigace a články musí být sladěné. RTL vyžaduje logické CSS; kód zůstává LTR. Canonical, hreflang, strukturovaná data a metadata sdílení sledují aktuální stránku i po klientské navigaci.

## Zdroje a důkazy

Komponenty, shadery, CSS, Markdown a statické vstupy jsou spravované zdroje. `tests/fixtures/assets.json` kontroluje integritu; `.next`, `public/docs` a zprávy jsou výstupy. Značky a licence popisuje `NOTICE.md`.

Opakovaně měřte objem dat, LCP, CLS a blokování, také na skutečných zařízeních. Nenahrazujte baseline pro zakrytí regrese. Místní test, vzdálené CI a ruční kontrola jazyka nebo přístupnosti představují různé důkazy.

[Architektura](../architecture/) · [Požadavky webu](../requirements/) · [Studijní cesta](../learning/)

<WebsiteLink locale="cs">Web</WebsiteLink>
