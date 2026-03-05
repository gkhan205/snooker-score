import type { GameData, Player } from './types';

export const calculateFrameEndScore = (players: Player[] = []) => {
  const finalScore = [];

  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const nextPlayer = players[i + 1];

    if (nextPlayer) {
      finalScore.push({
        ...player,
        finalScore: player.score - nextPlayer.score,
      });
    } else {
      const firstPlayer = players[0];

      finalScore.push({
        ...player,
        finalScore: player.score - firstPlayer.score,
      });
    }
  }

  return finalScore;
};

const getLoosers = (players: Player[]) => {
  const sortedPlayers = [...players].sort(
    (a, b) => b.finalScore! - a.finalScore!,
  );

  if (sortedPlayers.length < 5) {
    return [sortedPlayers[sortedPlayers.length - 1]];
  }

  if (sortedPlayers.length === 5) {
    return [sortedPlayers[3], sortedPlayers[4]];
  }
};

export const endMatchCalculation = (game: GameData) => {
  const secondFrameFinalScore = calculateFrameEndScore(game.frameTwoPlayers);
  const matchEndScore = secondFrameFinalScore.map((player) => {
    const firstFramePlayer = game.frameOnePlayers.find(
      (p) => p.id === player.id,
    );

    return {
      id: player.id,
      name: player.name,
      frameOneScore: firstFramePlayer?.finalScore || 0,
      frameTwoScore: player.finalScore!,
      finalScore: (firstFramePlayer?.finalScore || 0) + player.finalScore!,
    };
  });

  const loosers = getLoosers(matchEndScore as unknown as Player[]);

  return {
    ...game,
    frameTwoPlayers: secondFrameFinalScore,
    matchEndScore,
    loosers: loosers || [],
    endedAt: new Date(),
  };
};
