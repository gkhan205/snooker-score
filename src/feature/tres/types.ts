export type Player = {
  id: string;
  name: string;
  score: number;
  finalScore?: number;
  order: number;
  frameOneScore?: number;
  frameTwoScore?: number;
  pointsHistory?: number[];
  lastPoint?: number;
};

export type GameData = {
  id: string;
  frameOnePlayers: Player[];
  frameTwoPlayers: Player[];
  startedAt: Date;
  endedAt: Date | null;
  loosers: Player[];
  currentFrame: 1 | 2;
  matchEndScore?: Player[];
};

export type AllGamesForTheDayData = Record<string, GameData[]>;
