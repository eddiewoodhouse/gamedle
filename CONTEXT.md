# Gamedle

A Wordle-style deduction game: identify a hidden video game by guessing other
games and reading attribute-by-attribute feedback. This glossary fixes the
vocabulary of the game's domain — scoring, attributes, and verdicts.

## Language

**Answer**:
The hidden game a player is trying to identify in a round.
_Avoid_: target, solution.

**Guess**:
A game the player submits, scored against the Answer one attribute at a time.

**Round**:
A single play-through, up to 10 Guesses. Ends on a correct Guess or when the
Guess budget is exhausted.
_Avoid_: game (ambiguous with the video-game entities), session.

**Answer pool**:
The full set of games eligible to be chosen as the Answer. The same list a
Guess must be drawn from.

### Scoring

**Verdict**:
The result of comparing one attribute of a Guess to the Answer. One of
**Correct** (green), **Close** (yellow), **Wrong** (grey), or **Neutral**.
_Avoid_: score, match, result.

**Neutral verdict**:
The Verdict shown when an attribute is N/A on both sides. It never counts as
Correct — an empty-vs-empty match must never masquerade as a real hit.

**Close window**:
The per-field numeric tolerance within which a non-exact numeric Guess scores
Close. Tuned per field: release year ±3, player count ±1.

**Direction hint**:
The ↑ / ↓ shown on a numeric attribute meaning the Answer's value is
higher / lower than the Guess's. Shown on every non-exact numeric Verdict.

**Set attribute**:
A multi-value attribute (Genre, Platform) scored by overlap: identical set =
Correct, any shared value = Close, no overlap = Wrong.

### Attributes

**Platform family**:
A coarse platform ecosystem (PlayStation, Xbox, Nintendo Switch, PC, Mobile,
and retro systems like NES/SNES/Genesis) — deliberately **not** specific
console generations. A Set attribute.
_Avoid_: console, system (when you mean a generation).

**Genre**:
One to three genre tags per game. A Set attribute. Curated to a consistent
taxonomy (e.g. all mainline Zelda titles share tags rather than being split).

**Perspective**:
The game's viewpoint — 2D, 3D, First-person, Isometric. Single-value;
N/A permitted.

**Franchise**:
The series a game belongs to; N/A for standalone titles.
_Avoid_: series (use Franchise), saga.

**Developer**:
The studio credited with the game. Exact-match attribute (Correct or Wrong).
_Avoid_: publisher (a distinct concept we do not currently model), studio.

**N/A value**:
An explicit "does not apply" value for an attribute (a standalone game's
Franchise, an abstract game's Perspective). Always renders as a Neutral
verdict.
