import type { AllGamesForTheDayData, GameData } from '@/feature/tres';
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';
import { useTresStore } from '@/store/useTresStore';
import { eachDayOfInterval, format, subDays } from 'date-fns';
import { useEffect } from 'react';

/**
 * Thin wrapper kept for backward compatibility.
 * Prefer importing `useTresStore` directly in new components.
 */
export const useTresLogic = () => {
  const store = useTresStore();

  const clearArchivedGames = () => {
    const allGames =
      loadFromLocalStorage<AllGamesForTheDayData>('gamesForTheDay') || {};

    const today = new Date();
    const sixDaysAgo = subDays(today, 3);

    const lastSevenDays = eachDayOfInterval({
      start: sixDaysAgo,
      end: today,
    });
    const formattedDates = lastSevenDays.map((date) =>
      format(date, 'yyyy-MM-dd'),
    );

    const filtered = Object.keys(allGames).filter((date) =>
      formattedDates.includes(date),
    );

    const filteredGames: AllGamesForTheDayData = {};
    filtered.forEach((date) => {
      filteredGames[date] = allGames[date];
    });

    saveToLocalStorage(filteredGames, 'gamesForTheDay');
  };

  useEffect(() => {
    store.loadTodaysGames();
    clearArchivedGames();
  }, []);

  const handleFilterGamesByDate = (date: Date): GameData[] => {
    const dateToFilter = format(date, 'yyyy-MM-dd');
    const allGames =
      loadFromLocalStorage<AllGamesForTheDayData>('gamesForTheDay') || {};
    const filteredGames = allGames[dateToFilter] || [];
    return filteredGames;
  };

  return {
    players: store.players,
    activeGame: store.activeGame,
    allGamesToday: store.allGamesToday,
    numberOfPlayers: store.numberOfPlayers,
    onAddPlayer: store.addPlayer,
    onRemovePlayer: store.removePlayer,
    onUpdateScore: store.updateScore,
    onStartGame: store.startGame,
    onEndGame: store.endGame,
    onNextFrame: store.nextFrame,
    onSetNumberOfPlayers: store.setNumberOfPlayers,
    onClearGame: store.clearGame,
    onFilterByDate: handleFilterGamesByDate,
    onDeleteGame: store.deleteGame,
  };
};
