import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/login/Login';
import Dashboard from './pages/Dashboard/Dashboad';
import './components/FontawesomeIcons'
import SideNavBar from './pages/Dashboard/Components/SideNavBar';
import './components/styles/general.css'
import SupervisorsPage from './pages/Supervisors/Supervisors';
import TestChatPage from './pages/test/TestChat';
import TestNotifyPage from './pages/test/TestNotify';
function App() {
  return (
    <div className="App">
        <Router>
          <SideNavBar />
            <Routes>
                <Route path='/Login' element={<LoginForm/>} />
                <Route path='/dashboard' element={<Dashboard/>} />
                <Route path='/supervisors' element={<SupervisorsPage/>} />
                <Route path='/test' element={<TestChatPage/>} />
                <Route path='/testnotify' element={<TestNotifyPage/>} />
            </Routes>
        </Router>
    </div>
  );
}

export default App;
