import { useTresLogic } from '@/hooks';
import { useMemo } from 'react';
import { calculateScoreOverview } from '../helper';
import { ResultTable } from './result-table';
import type { Player } from '../types';

export const FrameScoreOverview = () => {
  const { players, activeGame } = useTresLogic();

  const scoreData: Player[] = useMemo(() => {
    return activeGame ? calculateScoreOverview(activeGame, players) : [];
  }, [activeGame, players]);

  return <ResultTable data={scoreData} frameNumber={2} />;
};
