---
title: Website engineering
layout: false
search: false
head:
  - - meta
    - http-equiv: refresh
      content: '0;url=/docs/en/'
---

<script setup>
import { onMounted } from 'vue';
import { withBase } from 'vitepress';

const english = withBase('/en/');
onMounted(() => window.location.replace(english));
</script>

<p><a :href="english">Open the English website engineering documentation</a></p>
