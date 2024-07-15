import './App.css';
import './components/styles/general.css'
import './components/FontawesomeIcons'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm            from './pages/login/Login';
import SuperSignupForm            from './pages/SuperLogin/SuperSignup';
import Dashboard            from './pages/Dashboard/Dashboad';
import SideNavBar           from './components/SideNavBar';
import SupervisorsPage      from './pages/Supervisors/Supervisors';
import PostsPage            from './pages/Posts/PostsPage';
import PostsPendingPage     from './pages/PostsPending/PostsPendingPage';
import ArtilcesPage         from './pages/Articles/ArticlesPage';
import SingleArticlesPage   from './pages/Articles/SingleArticle';
import PatientProfile       from './pages/Profiles/PatientProfile';
import DoctorProfile        from './pages/Profiles/DoctorProfile';
import TestChatPage         from './pages/test/TestChat';
import TestNotifyPage       from './pages/test/TestNotify';
import TestPayment from './pages/test/TestPayment';
import AI_Chat from './components/AI_Chat';
import Firebaselogin from './pages/test/Flogin';
import DoctorsPage from './pages/Doctors/DoctorsPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Login' element={<LoginForm/>} />
          <Route path='/supersignup/:token' element={<SuperSignupForm/>} />
          <Route path='/*' element={
                    <>
                    <SideNavBar />
                      <Routes>
                          <Route path='/' element={<Navigate to="/dashboard"/>} />
                          <Route path='/dashboard' element={<Dashboard/>} />
                          {localStorage.getItem('role') === "admin" ?<Route path='/supervisors' element={<SupervisorsPage/>} />:null}
                          {localStorage.getItem('role') === "admin" ?<Route path='/doctors' element={<DoctorsPage/>} />:null}
                          <Route path='/posts' element={<PostsPage/>} />
                          <Route path='/posts-pending' element={<PostsPendingPage/>} />
                          <Route path='/articles' element={<ArtilcesPage/>} />
                          <Route path='/articles/:articleID' element={<SingleArticlesPage/>} />
                          <Route path='/profile/patient/:patientID' element={<PatientProfile/>} />
                          <Route path='/profile/doctor/:doctorID' element={<DoctorProfile/>} />
                          <Route path='/test' element={<TestChatPage/>} />
                          <Route path='/testnotify' element={<TestNotifyPage/>} />
                          <Route path='/testPay' element={<TestPayment/>} />
                          <Route path='/testlogin' element={<Firebaselogin/>} />
                      </Routes>
                      {/* <AI_Chat/> */}
                  </>
          } />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
