
import './App.css';
import Header from './component/layout/Header.js'
import Home from './component/layout/Home.js'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route index element={<Home />}>
        </Route>
      </Routes>
    </Router>
    
    
  );
}

export default App;
