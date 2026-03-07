import { calculateCost } from '@/lib/utils';
import type { GameData, Player } from './types';
import { differenceInMinutes } from 'date-fns';

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

  const total = sortedPlayers.length;

  if (total === 0) return [];

  const baseLoserCount = total < 5 ? 1 : 2;

  const thresholdScore = sortedPlayers[total - baseLoserCount].finalScore;

  return sortedPlayers.filter((p) => p.finalScore! <= thresholdScore!);
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

export const calculatePayablePerPlayer = (games: GameData[]) => {
  const playerPayables: Record<string, number> = {};
  const allPlayers: Player[] = [];

  games.forEach((game) => {
    const totalMinutes = differenceInMinutes(
      new Date(game?.endedAt || game.startedAt),
      new Date(game.startedAt),
    );
    const totalAmount = calculateCost(totalMinutes);
    const amountPerPlayer = totalAmount / game.loosers.length;
    allPlayers.push(...(game.matchEndScore || []));

    game.loosers.forEach((looser) => {
      if (playerPayables[looser.id]) {
        playerPayables[looser.id] += amountPerPlayer;
      } else {
        playerPayables[looser.id] = amountPerPlayer;
      }
    });
  });

  return Object.keys(playerPayables)
    .map((playerId) => {
      const player = allPlayers.find((p) => p.id === playerId);
      return {
        id: playerId,
        name: player?.name || 'Unknown',
        amount: playerPayables[playerId],
      };
    })
    .sort((a, b) => b.amount - a.amount);
};

export const calculateScoreOverview = (
  game: GameData,
  currentPlayers: Player[],
) => {
  const { frameOnePlayers } = game;
  const calculatedCurrentPlayers = calculateFrameEndScore(currentPlayers);

  return calculatedCurrentPlayers.map((current) => {
    const frameOnePlayer = frameOnePlayers.find((p) => p.id === current.id);

    return {
      id: current.id,
      name: current.name,
      score: current.score,
      order: current.order,
      frameOneScore: frameOnePlayer?.finalScore || 0,
      frameTwoScore: current.finalScore,
      finalScore: (frameOnePlayer?.finalScore || 0) + current.finalScore,
    };
  });
};
