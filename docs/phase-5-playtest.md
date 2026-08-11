# Phase 5 — Playtest & tune

Closes [`improvement-plan.md`](./improvement-plan.md) Phase 5: *"Play rounds
against the new model; tune close windows and the guess budget from observed
win-rate."* Rather than hand-play a handful of rounds (tiny sample), the model
was exercised by a Monte-Carlo harness that plays the **real scoring engine**
(`guess-scoring.ts`, mirrored with parameterized windows) across **all 300
answers**.

## Method

Two solver profiles, both starting from the full 300-game candidate set and, on
each turn, removing every candidate whose scored comparison against the guess
doesn't match the answer's:

- **Greedy** — each turn guesses the still-consistent game that minimises the
  expected size of the next candidate set (information-maximising). Represents a
  **skill ceiling**: perfect recall + perfect constraint-tracking.
- **Casual** — each turn guesses a *random* still-consistent game. Represents a
  lower-effort but still logical player. 25 seeded trials per answer.

Plus a **close-window sweep** (casual solver over eight `(year, players)` window
pairs) and a **verdict-frequency tally** over 300k random guess/answer pairs.

> **Caveat.** Both solvers assume perfect game knowledge — they can always name a
> game consistent with the clues. Real players are bounded by *recall* (which
> games exist, which share a developer/franchise), which the harness cannot
> model. So these numbers measure the model's **information content**, i.e. a
> skill *ceiling* — a real player's budget needs headroom above them.

## Results (shipped windows: year ±3, players ±1)

| Solver | median | p90 | p95 | max | win@6 | win@8 | win@10 |
|--------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Greedy (ceiling) | 3 | 3 | 4 | **4** | 100% | 100% | 100% |
| Casual (random valid) | 3 | 4 | 5 | **8** | 100% | 100% | 100% |

Optimal greedy opener: **Watch Dogs** (a maximally "median" game — mid-2010s,
multi-platform, common genres/perspective — so it splits the field evenly).

### Close-window sweep (casual solver)

Win-rate is **invariant** to the windows — developer and franchise are so
discriminating that the candidate set collapses regardless of numeric tolerance:

| Windows | median | p90 | win@8 | win@10 |
|---------|:---:|:---:|:---:|:---:|
| year±1 players±0 | 3 | 5 | 100% | 100% |
| year±3 players±1 (shipped) | 3 | 4 | 100% | 100% |
| year±10 players±4 | 3 | 4 | 100% | 100% |

### Verdict frequency (random guess vs answer)

| Field | correct | close | wrong | neutral |
|-------|:---:|:---:|:---:|:---:|
| releaseYear (±3) | 3.3% | 18.0% | 78.7% | — |
| localMaximumPlayers (±1) | 51.5% | 25.7% | 22.9% | — |
| genres | 4.5% | 12.4% | 83.1% | — |
| platforms | 8.4% | 39.6% | 51.9% | — |
| developer | 2.4% | — | 97.6% | — |
| franchise | 0.7% | — | 97.5% | 1.9% |
| perspective | 33.8% | — | 66.2% | 0.0% |

## Conclusions

1. **The Phase-1 fixes landed.** `platforms` now yields a graded overlap signal
   (close 39.6%, not a binary superset test), `releaseYear` is directional and
   informative, and `localMaximumPlayers` is no longer near-noise.
2. **Close windows stay `year ±3` / `players ±1`.** They don't move win-rate, so
   they're chosen purely for UX signal quality (per [ADR 0001](./adr/0001-attribute-deduction-scoring-model.md)).
   No change.
3. **Guess budget stays 10.** The sim shows even random-but-logical play never
   exceeds 8 *with perfect recall*; a general audience needs slack above that for
   recall gaps. 10 is a forgiving, welcoming budget — kept deliberately.

### Observation for the backlog (no change now)

`localMaximumPlayers` is the **weakest attribute**: it scores "correct" 51.5% of
the time simply because single-player games dominate the dataset, so it rarely
discriminates. It remains a valid tiebreaker; a future tightening could weight
the dataset toward more multiplayer titles, but that's out of scope here.
