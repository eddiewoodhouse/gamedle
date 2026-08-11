export type VideoGameGenre =
  | 'Action'
  | 'Adventure'
  | 'Role-Playing'
  | 'Sandbox'
  | 'Platformer'
  | 'Sports'
  | 'Racing'
  | 'Puzzle'
  | 'Fighting'
  | 'Social simulation'
  | 'First-person shooter'
  | 'Survival horror'
  | 'Rhythm'
  | 'Strategy'
  | 'Party';

export type VideoGamePlatform =
  | 'PC'
  | 'PlayStation'
  | 'Xbox'
  | 'Nintendo Switch'
  | 'Nintendo Wii'
  | 'Nintendo 64'
  | 'GameCube'
  | 'NES'
  | 'SNES'
  | 'Game Boy'
  | 'Sega Genesis'
  | 'Mobile';

export type VideoGamePerspective = '2D' | '3D' | 'First-person' | 'Isometric';

export interface VideoGame {
  id: number;
  title: string;
  releaseYear: number;
  /** One to three genre tags. Scored by set overlap. */
  genres: VideoGameGenre[];
  /** Platform families (ecosystems), not console generations. Scored by set overlap. */
  platforms: VideoGamePlatform[];
  localMaximumPlayers: number;
  /** Studio credited with the game. Exact-match attribute. */
  developer: string;
  /** Series the game belongs to; null for standalone titles (renders neutral). */
  franchise: string | null;
  /** Viewpoint; null when not meaningfully applicable (renders neutral). */
  perspective: VideoGamePerspective | null;
}
