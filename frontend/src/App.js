import './App.css';
import Header from './component/layout/Header';
import TopBanner from './component/layout/TopBanner';

import Home from './component/layout/Home.js';
import Home2 from './component/layout/Home2.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes></Routes>
      <TopBanner />
      <Header />
      <div className="h-[1500px] bg-green-500"></div>
    </Router>
  );
}

export default App;
