import { VideoGame } from '../model/video-game.model';

// generate mock data of 1000 video games using the Game model  and export it as a constant named GAMES
export const VIDEO_GAMES: VideoGame[] = [
  {
    genre: 'Action',
    title: 'Super Mario Bros.',
    releaseYear: 1985,
    platforms: ['NES'],
    localMaximumPlayers: 2,
  },
  {
    genre: 'Action',
    title: 'The Legend of Zelda',
    releaseYear: 1986,
    platforms: ['NES'],
    localMaximumPlayers: 1,
  },
  {
    genre: 'Adventure',
    title: 'Red Dead Redemption 2',
    releaseYear: 2018,
    platforms: ['PlayStation'],
    localMaximumPlayers: 1,
  },

  {
    genre: 'Action',
    title: 'The Legend of Zelda: Breath of the Wild',
    releaseYear: 2017,
    platforms: ['Nintendo Switch'],
    localMaximumPlayers: 1,
  },
  {
    genre: 'Role-Playing',
    title: 'The Witcher 3: Wild Hunt',
    releaseYear: 2015,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
    localMaximumPlayers: 1,
  },

  {
    genre: 'Sports',
    title: 'FIFA 22',
    releaseYear: 2021,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
    localMaximumPlayers: 4,
  },
  {
    genre: 'First-person shooter',
    title: 'Overwatch',
    releaseYear: 2016,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
    localMaximumPlayers: 6,
  },
  {
    genre: 'Social simulation',
    title: 'Animal Crossing: New Horizons',
    releaseYear: 2020,
    platforms: ['Nintendo Switch'],
    localMaximumPlayers: 4,
  },
  {
    genre: 'Role-Playing',
    title: 'Cyberpunk 2077',
    releaseYear: 2020,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    localMaximumPlayers: 1,
  },
  {
    genre: 'Platformer',
    title: 'Super Mario Odyssey',
    releaseYear: 2017,
    platforms: ['Nintendo Switch'],
    localMaximumPlayers: 2,
  },
  {
    genre: 'First-person shooter',
    title: 'Call of Duty: Modern Warfare',
    releaseYear: 2019,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    localMaximumPlayers: 4,
  },
  {
    genre: 'Action',
    title: 'Super Mario Bros. 2',
    releaseYear: 1988,
    platforms: ['NES'],
    localMaximumPlayers: 1,
  },
  {
    genre: 'Sandbox',
    title: 'Minecraft',
    releaseYear: 2011,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
    localMaximumPlayers: 4,
  },
  {
    genre: 'Action',
    title: 'Fortnite',
    releaseYear: 2017,
    platforms: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
    localMaximumPlayers: 4,
  },
  {
    genre: 'Action',
    title: 'Grand Theft Auto V',
    releaseYear: 2013,
    platforms: ['PC', 'PlayStation', 'Xbox'],
    localMaximumPlayers: 1,
  },
];
