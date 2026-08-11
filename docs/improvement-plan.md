# Gamedle improvement plan

Derived from playing two live rounds (lost both) and a grilling session on the
design. Decisions are recorded in [ADR 0001](./adr/0001-attribute-deduction-scoring-model.md),
[ADR 0002](./adr/0002-infinite-random-not-daily-puzzle.md), and the glossary in
[CONTEXT.md](../CONTEXT.md).

## The flaws (evidence from play)

| # | Flaw | Evidence |
|---|------|----------|
| 1 | No direction on numeric fields | Round 1 (answer Persona 5): locked genre+platform+players by guess 2, still lost — no ↑/↓ to triangulate the year. |
| 2 | Player count is near-noise | Round 2: `players=close` fired on almost every guess (range 1–6, window ±4). |
| 3 | Platform "correct" is a superset test | FF7 (PlayStation+PC) scored `correct` against PlayStation-only Persona 5 — false confidence. |
| 4 | Genre is single-value exact-match | Zelda titles split Action/Adventure; BioShock tagged Role-Playing; no partial credit. |
| 5 | Data errors | Platform families mislabel history (Silent Hill 2 on Xbox, RE4 list); approximate release years. |
| 6 | Too few / weak attributes | Went 0/2; not enough discriminating signal to finish in 8. |
| 7 | No repeat-avoidance | `pickRandom` can serve the same answer twice in a row. |

## Decisions

- **Model**: attribute-deduction, sharpened (not image-guessing).
- **Attributes (7)**: release year, genre (multi), platform family (multi),
  player count, developer, franchise, perspective.
- **Verdicts**: per ADR 0001 — directional numerics with per-field close
  windows (year ±3, players ±1), symmetric set-overlap for genre & platform,
  exact for developer/franchise/perspective, N/A always Neutral.
- **Play mode**: infinite random, no-repeat (ADR 0002).
- **Guess budget**: 10.
- **Dataset**: grow to 300+ games; draft each from knowledge and verify the
  error-prone fields (year, developer, platforms), flagging low-confidence
  entries for review; fix existing errors in the same pass.

## Phases

### Phase 1 — Scoring engine (server)
Rework `guess-scoring.ts` and `video-game.model.ts`:
- Add `developer`, `franchise` (nullable), `perspective` (nullable) fields;
  make `genre` an array.
- New verdict type carrying direction (`higher` | `lower` | null) for numerics.
- Symmetric set-overlap for genre & platform. Per-field close windows.
- Neutral verdict for N/A-vs-N/A.
- Unit tests covering each verdict path and the empty-value trap.

### Phase 2 — Feedback UI (client)
- Mirror the model/verdict types in the store.
- Render ↑/↓ arrows on numeric rows, a yellow "close" state, and a neutral
  grey for N/A. Add a legend explaining Correct / Close / Wrong / N/A.

### Phase 3 — Round rules
- Raise guess budget to 10 (`MAX_GUESSES_PER_GAME`, and the client defaults).
- No-repeat answer selection.

### Phase 4 — Data expansion & correction
- Backfill the three new fields and multi-genre on all existing games; fix the
  known factual errors.
- Grow to 300+ games in review-able batches, verifying shaky fields.

### Phase 5 — Playtest & tune
- Play rounds against the new model; tune close windows and the guess budget
  from observed win-rate.

## Explicitly out of scope
- Image/cover-guessing mode.
- Daily puzzle, streaks, shareable results (ADR 0002).
- Specific console generations (platform stays at family grain).
- Publisher as a distinct attribute.
