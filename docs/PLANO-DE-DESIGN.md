# Plano de design: Santos Siqueira Marcenaria

Base: estrutura e layout do site da Celebrare (pedido do cliente), com a
identidade e as seções do briefing. Aguardando aprovação antes do código.

## Decisões de arquitetura

1. **Código-base da Celebrare** (Next 16 + Tailwind v4, App Router). O briefing pede Next 15; o 16 é o mesmo App Router e é o que a base usa. Rota 100% estática.
2. **Formulário:** Server Action + Zod + honeypot rodando na Vercel. A prévia no GitHub Pages não executa servidor, então lá o mesmo formulário abre o WhatsApp com os dados preenchidos.
3. **Cinco arquivos `"use client"`**, não quatro: menu mobile, lightbox, filtro do portfólio, WhatsApp flutuante **e o formulário**, porque `useActionState` só funciona no cliente. Saem os carrosséis com JS da Celebrare; depoimentos em `scroll-snap` puro.
4. **Fontes:** Fraunces nos títulos e Inter no corpo, como sugerido, via `next/font`. O mapa é o iframe do Google, carregado em modo lazy abaixo da dobra.
5. **Avaliações reais (coletadas em 03/10):** 4,7 e 15 avaliações, mas só 4 com texto. Entram Amanda Ouriques (cita Nilton e Diego), Ananda Galheigo e Heitor Barrozo. "Maicon Siqueira" fica de fora até o cliente confirmar que não é da família.
6. **Metas que não fecham:** JS inicial abaixo de 90 kB é inviável no App Router (piso medido de cerca de 103 kB gzip), e o Lighthouse 95 depende de uma foto de hero leve. Os números reais serão reportados.

## Paleta aplicada

| Token | Hex | Onde |
|---|---|---|
| brand | #614631 | botão primário, títulos fortes, fundo da faixa de parceiros |
| brand-700 | #4A3425 | hover do primário |
| accent | #FF5A36 | eyebrow grande, setas, bordas, número das etapas (nunca texto pequeno: 3,1:1) |
| star | #FFD400 | estrelas |
| surface / soft / warm | #FFFFFF / #FAF7F2 / #EDE6DD | ritmo das seções e avatar de iniciais |
| ink / muted / line | #2B1F17 / #7A6B5E / #E2D8CD | texto, apoio e fios |

Logo branco com fundo transparente: original sobre o marrom (hero, faixa de parceiros, rodapé) e recolorido em `brand` sobre o claro (cabeçalho rolado).

## Escala tipográfica (razão 1,25, corpo 17px)

| Papel | Fonte | Tamanho | Peso / entrelinha |
|---|---|---|---|
| H1 hero | Fraunces | clamp(2.75rem, 1.6rem + 4.2vw, 4.75rem) | 500 / 1.02, tracking -0.02em |
| H2 seção | Fraunces | clamp(2.1rem, 1.4rem + 2.6vw, 3.4rem) | 500 / 1.08 |
| Destaque serifado | Fraunces itálico | clamp(1.6rem, 1.2rem + 1.4vw, 2.25rem) | 400 / 1.25 |
| H3 card | Fraunces | 1.5rem | 500 / 1.2 |
| Corpo | Inter | 1.0625rem | 400 / 1.65, máximo 65ch |
| Apoio | Inter | 0.9375rem | 400 / 1.6 |
| Eyebrow | Inter | 0.75rem, tracking 0.2em, caixa alta | 600, accent |

## Hero (desktop e mobile)

```
DESKTOP ~85vh
┌──────────────────────────────────────────────────────────────────────┐
│ [MS logo]   Serviços  Projetos  Processo  Sobre  Contato  [WhatsApp] │
│                                          ┌───────────────────────────┤
│  HÁ 45 ANOS                              │                           │
│  Móveis sob medida                       │   foto de ambiente        │
│  que transformam                         │   executado (LCP),        │
│  o seu espaço                            │   sangrando até a         │
│                                          │   borda direita           │
│  Marcenaria sob medida para residências  │                           │
│  e empresas. Projeto 3D antes...         │                           │
│                                          │                           │
│  [Agende uma conversa]  (Ver projetos)   │                           │
│  ★★★★★ 4,7 no Google · 45 anos · 3D      │                           │
└──────────────────────────────────────────┴───────────────────────────┘

MOBILE
┌──────────────────────┐
│ [MS]             [≡] │
│  foto de fundo       │
│  com degradê escuro  │
│                      │
│  HÁ 45 ANOS          │
│  Móveis sob medida   │
│  que transformam     │
│  o seu espaço        │
│  subtítulo           │
│ [Agende uma conversa]│
│ (Ver projetos)       │
│ ★ 4,7 · 45 anos · 3D │
└──────────────────────┘
```

## Portfólio

```
PROJETOS                                              (sem reveal em outras seções)
Feitos na nossa oficina.
[Todos] [Cozinhas] [Dormitórios] [Closets] [Salas] [Corporativo]   ← filtro (client)

┌──────────────────────┬───────────┬───────────┐
│                      │           │           │
│   foto grande        │  foto     │  foto     │   grid 6 colunas, spans
│   (span 4×2)         ├───────────┴───────────┤   alternados; cada foto
│                      │   foto larga (4×1)    │   abre o lightbox
├───────────┬──────────┴───────────┬───────────┤   (setas, ESC, foco preso)
│  foto     │  foto                │  foto     │
└───────────┴──────────────────────┴───────────┘
Legenda no hover/foco: ambiente + material
       Quer algo assim no seu espaço? Fale com a gente →
```
