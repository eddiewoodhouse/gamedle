# Gamedle

A Wordle-like game where you guess a video game. Each guess compares release
year, genre, platforms, and local max players against the answer, with
correct/close/wrong feedback — 8 guesses per round.

## Stack

- `src/` — Angular 22 frontend (standalone components, native signals for state)
- `server/` — NestJS API (game sessions, guess scoring, the game dataset)

The API picks the answer and scores guesses server-side, so the answer is
never sent to the client until a round ends. In production, NestJS serves
the built Angular app as static files alongside its own `/api/*` routes —
one process, one deploy.

## Local development

Run the API and the Angular dev server in two terminals:

```bash
npm run server:install
npm run server:build
npm run render-start
```

```bash
npm start
```

`ng serve` proxies `/api/*` requests to the NestJS server at `localhost:3000`
(see `proxy.conf.json`), so the app behaves the same as it will in
production. Open `http://localhost:4200`.

## Production build

```bash
npm run render-build
npm run render-start
```

This builds the Angular app, builds the NestJS server, and starts a single
process serving both on `$PORT` (defaults to 3000).

## Deployment

`render.yaml` defines a single Render web service that runs the commands
above. Connect the repo on Render and it picks up the Blueprint automatically.
