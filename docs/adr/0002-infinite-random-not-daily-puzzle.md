# Infinite random play, not a daily puzzle

Gamedle serves a fresh random Answer every round rather than one shared
seeded puzzle per day. This is a deliberate deviation from the genre norm
(Wordle, the original Gamedle, and most clones are daily), so it is recorded
here to stop a future reader assuming it was an oversight.

We chose infinite random for simplicity: no per-day seeding, streak tracking,
UTC-date handling, or "come back tomorrow" state. The trade-off accepted is
the loss of the daily social hook — no shared answer, no streaks, no
"I got it in 4/10" shareable result.

One refinement applies: the Answer picker must avoid repeating the previous
round's Answer, which uniform random selection currently permits.

If the daily hook is wanted later, it is an additive mode, not a rewrite —
but the streak/date/stats infrastructure it needs is real work, which is why
it is out of scope now.
