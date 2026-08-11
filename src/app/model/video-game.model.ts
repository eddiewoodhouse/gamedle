/**
 * Represents a game.
 */
export interface VideoGame {
  id: number;
  title: string;
  releaseYear: number;
  genres: VideoGameGenre[];
  platforms: VideoGamePlatform[];
  localMaximumPlayers: number;
  developer: string;
  franchise: string | null;
  perspective: VideoGamePerspective | null;
}

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
  | 'Party'
  | 'Metroidvania'
  | 'Roguelike'
  | 'Simulation'
  | 'Open world'
  | 'MMORPG'
  | 'Battle Royale'
  | 'MOBA'
  | 'Visual novel'
  | "Beat 'em up"
  | 'Stealth';

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
  | 'Game Boy Advance'
  | 'Nintendo DS'
  | 'Nintendo 3DS'
  | 'PSP'
  | 'PlayStation Vita'
  | 'Sega Genesis'
  | 'Sega Dreamcast'
  | 'Sega Saturn'
  | 'Arcade'
  | 'Atari 2600'
  | 'Mobile';

export type VideoGamePerspective = '2D' | '3D' | 'First-person' | 'Isometric';
