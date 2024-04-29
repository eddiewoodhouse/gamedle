/**
 * Represents a game.
 */
export interface VideoGame {
  genre: VideoGameGenre;
  title: string;
  releaseYear: number;
  platforms: VideoGamePlatform[];
  localMaximumPlayers: number;
}

export type VideoGameGenre =
  | 'Action'
  | 'Adventure'
  | 'Role-Playing'
  | 'Sandbox'
  | 'Platformer'
  | 'Sports'
  | 'Social simulation'
  | 'First-person shooter';
export type VideoGamePlatform =
  | 'PC'
  | 'PlayStation'
  | 'Xbox'
  | 'Nintendo Switch'
  | 'Nintendo Wii'
  | 'NES';
