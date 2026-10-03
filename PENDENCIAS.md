# Pendências · Santos Siqueira Marcenaria

O que falta confirmar com o cliente antes de o site ir ao ar. No código,
cada item tem um marcador `[[...]]`; nenhum marcador aparece para o
visitante (o `semMarcador` tira todos do texto exibido e do JSON-LD).

## Dados do negócio

| Item | Onde está | Situação |
| --- | --- | --- |
| **CNPJ** | `src/content/site.ts` (`cnpj`) | Vazio. O rodapé só mostra a linha do CNPJ quando ele for preenchido. |
| **45 anos de oficina** | `site.anos` | Veio do briefing. Aparece no hero, na faixa de números, na frase, no Sobre, no rodapé e na imagem de compartilhamento. |
| **Fundação em 1981** | `site.fundacao` | Calculada a partir dos 45 anos. Aparece no selo "desde 1981" do Sobre e no rodapé. Trocar se o ano real for outro. |
| **Domínio definitivo** | `SITE_URL` em `site.ts` | Por enquanto `www.santossiqueira.com.br`. Afeta canonical, sitemap e a imagem de compartilhamento. |
| **Faixa de preço** | `src/lib/schema.ts` (`priceRange: "$$$"`) | Só vai para o Google (JSON-LD), não aparece na página. |

## Conteúdo

- **Lista de serviços** (`src/content/servicos.ts`): os oito ambientes são a base sugerida no briefing. Banheiro e móveis corporativos aparecem como prancha desenhada porque não há foto real desses ambientes. Se o cliente mandar fotos, basta incluir `foto` no item.
- **Legendas do portfólio** (`src/content/portfolio.ts`): os materiais citados nas descrições (MDF amadeirado, palhinha, tampo de pedra) foram deduzidos das fotos. Confirmar.
- **Nilton e Diego**: uma avaliação real cita "o Sr. Nilton e seu filho Diego". Se forem os responsáveis, vale nomeá-los no Sobre (`SOBRE.paragrafos`).
- **Seção de parceiros** (§6.10, arquitetos e imobiliárias): está no site, mas o briefing marcava "confirmar se entra".
- **FAQ** (`src/content/faq.ts`): confirmar prazo médio de entrega, materiais, formas de pagamento, cidades atendidas e prazo da garantia.

## Avaliações do Google

- O perfil tem **4,7 com 15 avaliações**. O site usa exatamente isso, nunca "5,0".
- Entraram só três avaliações com texto e cinco estrelas: Amanda Ouriques, Ananda Sukhi Galheigo e Heitor Barrozo (dados brutos em `midia/google/avaliacoes-2026-10-03.json`).
- **Maicon Siqueira** ficou de fora: tem o mesmo sobrenome da marcenaria. Doze das quinze avaliações foram publicadas entre 27 e 28/04/2021, em menos de duas horas, e três autores se chamam Siqueira. Uma avaliação de família exibida no site pode pesar contra se alguém notar.
- A única avaliação recente com texto (2024) tem 1 estrela: "não entregou orçamento e não responde". Vale o cliente responder no Google.
- As fotos dos autores vêm do perfil de cada um no Google (baixadas em `public/avaliacoes/`). Heitor Barrozo não tem foto no perfil: aparece o avatar com a inicial, o mesmo que o Google mostra.

## Formulário

- `src/app/actions.ts` valida com Zod e hoje **só registra o pedido no log do servidor**. Falta escolher o destino: Resend (e-mail), Formspree ou outro serviço.
- Na prévia estática (GitHub Pages) o formulário abre o WhatsApp com o pedido já escrito (`actions-estatico.ts`, trocado pelo `npm run build:pages`).

## Publicação

- Prévia no ar: **https://abalduinojose-cmd.github.io/santossiqueira/** (repositório `abalduinojose-cmd/santossiqueira`, público, Pages servindo `main` + `/docs`).
- Para atualizar: `npm run build:pages`, commit e push. `material/verificar-estatico.mjs` confere a exportação em `/santossiqueira/` antes do push (404, imagens, vídeo certo em cada largura).
- Os vídeos do hero são de IA e foram enviados pelo próprio Anderson: o vertical vai para o celular, o horizontal para o desktop (sem o 1,5 s inicial, que tinha tarja preta).

## Números medidos (03/10/2026, build de produção, Lighthouse mobile)

- Performance **93**, LCP 1,8 s. Acessibilidade, boas práticas e SEO **100**. CLS **0**.
- JavaScript da página: **122 kB** no primeiro carregamento. A meta de 90 kB não é alcançável no Next 15: só o código-base que ele carrega em toda página já soma 103 kB.
