# Attribute-deduction scoring model

Gamedle is an attribute-deduction game (guess the game from per-attribute
feedback), not an image/cover-guessing game. We chose to sharpen this model
rather than pivot to image-guessing because the flaws are fixable and it reuses
the existing code and dataset.

A Guess is scored against the Answer across **seven** attributes, each with
defined verdict semantics:

- **Release year** (numeric): exact = Correct; within ±3 = Close; otherwise
  Wrong. A ↑/↓ direction hint is shown on every non-exact verdict.
- **Player count** (numeric): exact = Correct; within ±1 = Close; otherwise
  Wrong. Direction hint shown. (Close windows are per-field: 4 years is too
  tight to ever fire, 4 players covers nearly the whole domain — a single
  shared window was the original mistake.)
- **Genre** (set, 1–3 tags): identical set = Correct; any overlap = Close;
  none = Wrong.
- **Platform** (set of Platform families): identical set = Correct; any
  overlap = Close; none = Wrong. Matching is **symmetric** — the old code
  scored Correct whenever the guess was a *superset* of the answer's
  platforms, which misleadingly greened a broad multi-platform guess against a
  single-platform answer.
- **Developer** (exact): Correct or Wrong.
- **Franchise** (exact, N/A allowed): Correct or Wrong; N/A on both sides is
  Neutral, never Correct.
- **Perspective** (single value, N/A allowed): Correct or Wrong; N/A is
  Neutral.

An **N/A value never scores Correct.** An empty-vs-empty match (two standalone
games sharing "no franchise") must render Neutral, so it can never be mistaken
for a real hit — the failure mode that made the original platform superset
scoring misleading.

## Consequences

Every game in the Answer pool — existing and new — must carry all seven
fields accurately, including the newly added Developer, Franchise, and
Perspective. This is the main cost of the richer model and drives the data
work in the improvement plan.
