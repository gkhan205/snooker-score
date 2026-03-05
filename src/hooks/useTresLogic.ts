import { useTresStore } from '@/store/useTresStore';

/**
 * Thin wrapper kept for backward compatibility.
 * Prefer importing `useTresStore` directly in new components.
 */
export const useTresLogic = () => {
  const store = useTresStore();

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
  };
};
