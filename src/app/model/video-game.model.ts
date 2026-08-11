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
