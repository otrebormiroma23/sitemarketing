# Portfólio — Roberto Amorim Cavalcanti

Site profissional *one-page*, estático (HTML + CSS + JS puro), pronto para publicar em qualquer hospedagem.
Paleta **vermelho `#ff3131` · preto `#000000` · branco `#ffffff`**, estética minimalista, mobile-first.

---

## 📁 Estrutura

```
Site Marketing/
├── index.html          ← página única (Hero, Sobre, Qualificações, Portfólio, Contato)
├── css/styles.css      ← todo o design system
├── js/projects.js      ← detalhes dos projetos (desafio / solução / resultados)
├── js/main.js          ← interações + eventos do Google Tag Manager
├── assets/img/
│   ├── roberto-perfil.svg   ← PLACEHOLDER da sua foto (substituir)
│   ├── projeto-1..6.webp    ← capas do portfólio (substituir pelas reais)
│   └── og-capa.webp         ← imagem de compartilhamento (1200×630)
├── robots.txt
├── sitemap.xml
└── _build/             ← ferramentas de desenvolvimento (pode excluir no deploy)
    ├── covers.html     ← gerador das miniaturas de portfólio
    └── server.ps1      ← servidor local para testar (PowerShell)
```

**Rodar localmente:**

```powershell
powershell -ExecutionPolicy Bypass -File "_build\server.ps1"
# abra http://localhost:8765/
```

---

## ✅ Checklist: o que você precisa trocar (marcados com ▶ no código)

| # | Onde | O que trocar |
|---|---|---|
| 1 | `index.html` → `<head>` | **`GTM-XXXXXXX`** (2 ocorrências: script e `<noscript>`) pelo seu ID do Google Tag Manager |
| 2 | `index.html` → `<head>` | `https://seusite.com.br` no **canonical**, Open Graph, JSON-LD e `og:image` |
| 3 | `index.html` → Hero | `assets/img/roberto-perfil.svg` → sua **foto profissional** em WebP/JPG |
| 4 | `index.html` → Seção Portfólio | Títulos, descrições, categorias (`data-categories`) e imagens dos **6 projetos** |
| 5 | `js/projects.js` | Desafio, solução e **métricas** de cada projeto (usar o mesmo `id` do card) |
| 6 | `index.html` → Contato | **WhatsApp** (`https://wa.me/55SEUNUMERO...`), **e-mail**, **LinkedIn** e **Instagram** |
| 7 | `index.html` → JSON-LD | `sameAs` com o link real do LinkedIn |
| 8 | `robots.txt` / `sitemap.xml` | Domínio definitivo |
| 9 | `assets/img/` | Substituir as capas de exemplo por **fotos reais dos projetos** (WebP, 1600×1000, qualidade ~82) |

---

## 🔤 Tipografia

O PRD pedia **Bugaki** nos títulos. A Bugaki é gratuita **apenas para uso pessoal** e exige licença
para uso comercial (o seu site é de captação de clientes). Para evitar risco, o site usa:

* **Títulos/Display:** [Fraunces](https://fonts.google.com/specimen/Fraunces) — serifa display com personalidade e refinamento.
* **Corpo/UI:** [Montserrat](https://fonts.google.com/specimen/Montserrat).

**Para trocar a fonte de display:** altere a linha do `<link>` das fontes em `index.html`
e a variável `--font-display` em `css/styles.css` (linha inicial do arquivo).
Se você comprar a licença da Bugaki, basta subir os arquivos `bugaki.woff2` em `assets/fonts/`
e apontar um `@font-face` — o restante do layout não muda.

---

## 🎨 Nota sobre o vermelho (acessibilidade)

`#ff3131` puro tem contraste **3,66:1** — abaixo do mínimo AA (4,5:1) para textos pequenos.
Por isso o CSS define duas variações:

| Variável | Hex | Uso |
|---|---|---|
| `--red` | `#ff3131` | Blocos, traços, ícones, sublinhados, detalhes (não-texto) |
| `--red-ink` | `#d81e1e` | Textos vermelhos pequenos e **fundo dos botões** (contraste AA) |
| `--red-dark` | `#b81414` | Hover dos botões |

Resultado: **Lighthouse = 100 em Acessibilidade, SEO e Best Practices.**

---

## 📊 Google Tag Manager — eventos já implementados

Todos os eventos são enviados para `window.dataLayer`. No GTM crie um **Trigger → Página Vista →
Evento** para cada nome abaixo:

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `page_view` | Carregamento da página | `page_title` |
| `cta_click` | Qualquer botão CTA (header, hero, formulário) | `label` |
| `whatsapp_click` | Clique no bloco do WhatsApp | `label` |
| `social_click` | Clique no LinkedIn / Instagram | `label` (`linkedin` / `instagram`) |
| `filter_apply` | Uso dos filtros do portfólio | `filter_name`, `visible_projects` |
| `project_open` | Abertura do modal de projeto | `project_id`, `project_title` |
| `portfolio_view_time` | Tempo (em `seconds`) que o visitante dedicou à seção Portfólio | `seconds` |
| `form_validation_error` | Envio com campos inválidos | `form_name` |
| `form_submit` | Envio válido do formulário | `form_name`, `form_subject` |

> Depois de colar o ID real do GTM, valide no **Modo de Pré-visualização** do GTM
> (`gtm.html?gtm_auth=...`) ou no *Debugger* do Chrome.

---

## ✉️ Formulário de contato (sem backend)

Hoje o formulário valida, registra o evento `form_submit` e mostra mensagem de sucesso — **nenhum dado
vai para servidor**. Escolha um destino:

1. **Formspree (mais rápido):** em `index.html`, no `<form>`:
   ```html
   <form class="form" id="form-contato" action="https://formspree.io/f/SEU_ID" method="POST">
   ```
   e remova o `e.preventDefault()` do bloco `form_submit` em `js/main.js`.
2. **Netlify Forms:** adicione `data-netlify="true"` e `name="contato"` ao `<form>` (funciona direto no deploy).
3. **WhatsApp como destino:** envie os campos via `https://wa.me/55SEUNUMERO?text=...` montado no JS.
4. **E-mail via backend/hosting** (cPanel, Hostinger, etc.) — me avise que eu conecto.

---

## 🖼️ Imagens

* Capas do portfólio: **WebP 800×500** exibidas em `grayscale(100%)` e revelando a **cor original no hover**
  (`css/styles.css` → `.card__media img`).
* Todas as `<img>` do portfólio usam `loading="lazy"` + `decoding="async"` + `width`/`height`
  (sem *layout shift*).
* `og-capa.webp` (1200×630) alimenta o compartilhamento em WhatsApp/LinkedIn/Instagram.
* **Para gerar novas capas de exemplo:** abra `_build/covers.html`, ajuste os blocos `.cover` e
  capture com o DevTools (*Cmd/Ctrl+Shift+P → "Capture node screenshot"*).
* Substituindo por fotos suas: exporte em **WebP, 1600×1000, qualidade 80–85, < 150 KB**.

---

## 📱 Responsividade

* Mobile-first: grid do portfólio **1 coluna → 2 (≥640px) → 3 (≥900px)**.
* Menu vira *overlay* em telas < 900px (botão hambúrguer com `aria-expanded`).
* Título Hero usa `clamp()` (3rem → 7,2rem) para não estourar no celular.
* `prefers-reduced-motion` desliga animações para quem tem sensibilidade ao movimento.

---

## 🚀 Publicar

Arquivos estáticos — qualquer um serve:

* **Netlify / Vercel / Cloudflare Pages:** arraste a pasta ou conecte o repositório (build vazio).
* **GitHub Pages:** suba os arquivos na branch `main`.
* **Hospedagem tradicional (Hostinger, HostGator):** envie tudo para `public_html/`.

Depois do deploy: atualize `canonical`, Open Graph, JSON-LD, `robots.txt` e `sitemap.xml`
com o domínio final e envie o sitemap no **Google Search Console**.
