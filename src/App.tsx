import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import './App.css';
import { Home } from './pages/Home';

function App() {
  return (
    <div>
      <Home />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
