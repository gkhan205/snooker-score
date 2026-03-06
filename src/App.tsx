import { HashRouter, Route, Routes } from 'react-router';
import { MainLayout, NoFooterLayout } from '@/components/wrappers';
import {
  TresMatchMain,
  PlayerSetup,
  FrameScoring,
  FrameResult,
  About,
} from '@/routes/';
import { useTresLogic } from './hooks';
import { History } from './routes/history';
import { Payables } from './routes/payables';

function App() {
  const { activeGame } = useTresLogic();

  const isGameEnded = !!activeGame?.endedAt;
  const frameNumber = isGameEnded && activeGame.currentFrame === 2 ? 2 : 1;

  return (
    <HashRouter>
      <Routes>
        <Route
          index
          element={
            <MainLayout>
              <TresMatchMain />
            </MainLayout>
          }
        />
        <Route
          path='/player-setup'
          element={
            <NoFooterLayout headerName='Player Setup'>
              <PlayerSetup />
            </NoFooterLayout>
          }
        />
        <Route
          path='/frame-scoring'
          element={
            <NoFooterLayout
              headerName={`Frame ${activeGame?.currentFrame} Scoring`}>
              <FrameScoring />
            </NoFooterLayout>
          }
        />
        <Route
          path='/frame-result'
          element={
            <NoFooterLayout
              headerName={`Frame ${
                frameNumber === 2 ? 'Final' : frameNumber
              } Result`}>
              <FrameResult frameNumber={frameNumber} />
            </NoFooterLayout>
          }
        />

        <Route
          path='/history'
          element={
            <MainLayout headerName='Game History'>
              <History />
            </MainLayout>
          }
        />

        <Route
          path='/payables'
          element={
            <MainLayout headerName='Payables'>
              <Payables />
            </MainLayout>
          }
        />

        <Route
          path='/about'
          element={
            <MainLayout headerName='About'>
              <About />
            </MainLayout>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
