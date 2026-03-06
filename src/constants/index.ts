type BallColor = {
  name: string;
  points: number;
};

export const BALL_COLORS: BallColor[] = [
  { name: 'red', points: 1 },
  { name: 'yellow', points: 2 },
  { name: 'green', points: 3 },
  { name: 'brown', points: 4 },
  { name: 'blue', points: 5 },
  { name: 'pink', points: 6 },
  { name: 'black', points: 7 },
] as const;

export const COST_PER_HOUR: number = 250;
