import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/login/Login';
import Dashboard from './pages/Dashboard/Dashboad';

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path='/Login' element={<LoginForm/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
