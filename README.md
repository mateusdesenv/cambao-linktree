# Árvore de Links — Cambão

Projeto estático, responsivo e mobile-first criado com HTML, CSS e JavaScript puro.

## Estrutura

- `index.html`: estrutura e conteúdo da página.
- `styles.css`: identidade visual gamer em verde neon.
- `script.js`: configuração e criação dos links, compartilhamento e microinterações.
- `assets/cambao-profile.png`: imagem principal do perfil.
- `assets/favicon.svg`: ícone da página.

## Configurar os links reais

Abra o arquivo `script.js` e altere o objeto `PROFILE.links`:

```js
{
  platform: "Instagram",
  handle: "@usuario_real",
  url: "https://www.instagram.com/usuario_real/",
  icon: "instagram",
}
```

Repita o processo para TikTok e YouTube.

## Executar localmente

É possível abrir o `index.html` diretamente no navegador. Para testar com servidor local:

```bash
python3 -m http.server 8080
```

Depois, abra `http://localhost:8080`.

## Publicação

O projeto pode ser publicado diretamente na Vercel, Netlify, GitHub Pages ou qualquer hospedagem estática.
