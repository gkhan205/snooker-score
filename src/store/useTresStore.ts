import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { format } from 'date-fns';
import type { AllGamesForTheDayData, GameData, Player } from '@/feature/tres';
import {
  calculateFrameEndScore,
  endMatchCalculation,
} from '@/feature/tres/helper';
import { loadFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';

interface TresState {
  players: Player[];
  activeGame: GameData | null;
  frame: number;
  allGamesToday: GameData[];
  numberOfPlayers: number;
}

interface TresActions {
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  startGame: () => void;
  endGame: () => void;
  updateScore: (id: string, score: number) => void;
  nextFrame: () => void;
  loadTodaysGames: () => void;
  setNumberOfPlayers: (num: number) => void;
  clearGame: () => void;
  deleteGame: (gameId: string) => void;
}

type TresStore = TresState & TresActions;

export const useTresStore = create<TresStore>()(
  persist(
    (set, get) => ({
      // ── State ──────────────────────────────────────────────
      players: [],
      activeGame: null,
      frame: 1,
      allGamesToday: [],
      numberOfPlayers: 3,

      // ── Actions ────────────────────────────────────────────

      // `players`, `activeGame`, and `frame` are auto-rehydrated by Zustand
      // persist from the `tres-store` localStorage key — no manual loading needed.
      //
      // `allGamesToday` is intentionally excluded from partialize so it stays
      // in sync with the existing `gamesForTheDay` key rather than duplicating data.
      loadTodaysGames: () => {
        const today = format(new Date(), 'yyyy-MM-dd');
        const stored =
          loadFromLocalStorage<AllGamesForTheDayData>('gamesForTheDay');
        const allGamesForTheDay: AllGamesForTheDayData = stored ?? {};
        const gamesForToday = allGamesForTheDay[today] || [];
        set({ allGamesToday: gamesForToday });
      },

      setNumberOfPlayers: (num: number) => {
        set({ numberOfPlayers: num });
      },

      addPlayer: (name: string) => {
        if (name.trim() === '') return;
        const { activeGame, players } = get();
        const id = name.toLowerCase().replace(/\s+/g, '-');

        if (activeGame) {
          const newPlayer = {
            id,
            name,
            score: 0,
            finalScore: 0,
            order: players.length + 1,
          };

          const frame = activeGame.currentFrame;
          const playersInFrame =
            frame === 1
              ? activeGame.frameOnePlayers
              : activeGame.frameTwoPlayers;
          playersInFrame.push(newPlayer);

          const updatedGame: GameData = {
            ...activeGame,
            ...(frame === 1
              ? { frameOnePlayers: playersInFrame }
              : {
                  frameTwoPlayers: playersInFrame,
                  frameOnePlayers: playersInFrame,
                }),
          };

          set({ activeGame: updatedGame, players: playersInFrame });
          return;
        }

        set((state) => ({
          players: [
            ...state.players,
            {
              id,
              name,
              score: 0,
              finalScore: 0,
              order: state.players.length + 1,
            },
          ],
        }));
      },

      removePlayer: (id: string) => {
        set((state) => ({
          players: state.players.filter((p) => p.id !== id),
        }));
      },

      startGame: () => {
        const { players } = get();
        const playersInitials = players
          .map((p) => p.name.charAt(0).toUpperCase())
          .join('');

        const data: GameData = {
          id: `game-${playersInitials}-${Date.now()}`,
          frameOnePlayers: players,
          frameTwoPlayers: [],
          startedAt: new Date(),
          endedAt: null,
          loosers: [],
          currentFrame: 1,
        };

        set({ activeGame: data, frame: 1 });
      },

      endGame: () => {
        const { activeGame, allGamesToday } = get();
        if (!activeGame) return;

        const today = format(new Date(), 'yyyy-MM-dd');
        const stored =
          loadFromLocalStorage<AllGamesForTheDayData>('gamesForTheDay');
        const allGamesForTheDay: AllGamesForTheDayData = stored ? stored : {};

        const finishedGame = endMatchCalculation(activeGame) as GameData;
        const updatedToday = [finishedGame, ...allGamesToday];

        allGamesForTheDay[today] = updatedToday;
        saveToLocalStorage(allGamesForTheDay, 'gamesForTheDay');

        set({
          activeGame: finishedGame,
          players: [],
          frame: 1,
          allGamesToday: updatedToday,
        });
      },

      updateScore: (id: string, score: number) => {
        const { frame, activeGame } = get();

        const updatedPlayers = get().players.map((p) =>
          p.id === id
            ? {
                ...p,
                score: p.score + score,
                pointsHistory: [...(p.pointsHistory || []), score],
                lastPoint: score,
              }
            : p,
        );

        if (!activeGame) return;

        const updatedGame: GameData = {
          ...activeGame,
          ...(frame === 1
            ? { frameOnePlayers: updatedPlayers }
            : { frameTwoPlayers: updatedPlayers }),
        };

        set({ players: updatedPlayers, activeGame: updatedGame });
      },

      nextFrame: () => {
        const { activeGame } = get();
        if (!activeGame) return;

        const playersFinalScore = calculateFrameEndScore(
          activeGame.frameOnePlayers,
        );
        const reversedPlayers = [...activeGame.frameOnePlayers]
          .reverse()
          .map((p, index) => ({ ...p, score: 0, order: index + 1 }));

        const updatedGame: GameData = {
          ...activeGame,
          currentFrame: 2,
          frameOnePlayers: playersFinalScore,
          frameTwoPlayers: reversedPlayers,
        };

        set({
          frame: 2,
          players: reversedPlayers,
          activeGame: updatedGame,
        });
      },

      clearGame: () => {
        set({ activeGame: null, players: [], frame: 1, numberOfPlayers: 3 });
      },

      deleteGame: (gameId: string) => {
        const { allGamesToday } = get();
        const today = format(new Date(), 'yyyy-MM-dd');
        const stored =
          loadFromLocalStorage<AllGamesForTheDayData>('gamesForTheDay');
        const allGamesForTheDay: AllGamesForTheDayData = stored ? stored : {};

        const filteredGames = allGamesToday.filter(
          (game) => game.id !== gameId,
        );
        allGamesForTheDay[today] = filteredGames;
        saveToLocalStorage(allGamesForTheDay, 'gamesForTheDay');

        set({ allGamesToday: filteredGames });
      },
    }),
    {
      name: 'tres-store', // key in localStorage
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
