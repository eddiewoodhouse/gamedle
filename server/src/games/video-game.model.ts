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

export interface VideoGame {
  id: number;
  genre: VideoGameGenre;
  title: string;
  releaseYear: number;
  platforms: VideoGamePlatform[];
  localMaximumPlayers: number;
}
