import './App.css';
import Header from './component/layout/Header';
import TopBanner from './component/layout/TopBanner';

import Home from './component/layout/Home.js';
import HomePage from './component/layout/HomePage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <TopBanner />
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
        
      </Routes>
      
      
    </Router>
  );
}

export default App;
