# Extended platform and genre taxonomy

Expanding the dataset toward 300+ games (Phase 4) exposed that the original
enums could not describe common games accurately: there was no handheld
platform family (Fire Emblem: Awakening was mislabelled onto Switch because
the 3DS did not exist in the enum), and no genre tags for whole categories
(roguelikes, MMOs, sims, battle royales).

We extended both enums rather than force-fit new games onto wrong values:

- **Platforms** gained handheld and older families — Game Boy Advance,
  Nintendo DS, Nintendo 3DS, PSP, PlayStation Vita, Sega Dreamcast, Sega
  Saturn, Arcade, Atari 2600. These stay at the **family / ecosystem** grain
  set by [ADR 0001](./0001-attribute-deduction-scoring-model.md) — they are
  more ecosystems, not console generations of an existing family.
- **Genres** gained Metroidvania, Roguelike, Simulation, Open world, MMORPG,
  Battle Royale, MOBA, Visual novel, Beat 'em up, and Stealth.

## Consequences

Genre matching scores by set overlap, so a richer vocabulary lets accurate
multi-tagging (e.g. Hollow Knight = Metroidvania + Action) without fragmenting
the "any overlap = close" signal. The trade-off is a longer curated list to
keep consistent as the dataset grows.
