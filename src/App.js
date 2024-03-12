import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/login/Login';
import Dashboard from './pages/Dashboard/Dashboad';
import './components/FontawesomeIcons'
import SideNavBar from './pages/Dashboard/Components/SideNavBar';
import './components/styles/general.css'
import SupervisorsPage from './pages/Supervisors/Supervisors';
import TestChatPage from './pages/test/TestChat';
import TestNotifyPage from './pages/test/TestNotify';
import PostsPage from './pages/Posts/PostsPage';
import ArtilcesPage from './pages/Articles/ArticlesPage';
import PostsPendingPage from './pages/PostsPending/PostsPendingPage';
import SingleArticlesPage from './pages/Articles/SingleArticle';
import PendingArticlesPage from './pages/ArticlesPending/PendingArticlesPage';
import PatientProfile from './pages/Profiles/PatientProfile';
import DoctorProfile from './pages/Profiles/DoctorProfile';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Login' element={<LoginForm/>} />
          <Route path='/*' element={
                    <>
                    <SideNavBar />
                      <Routes>
                          <Route path='/' element={<Navigate to="/dashboard"/>} />
                          <Route path='/dashboard' element={<Dashboard/>} />
                          <Route path='/supervisors' element={<SupervisorsPage/>} />
                          <Route path='/posts' element={<PostsPage/>} />
                          <Route path='/posts-pending' element={<PostsPendingPage/>} />
                          <Route path='/articles' element={<ArtilcesPage/>} />
                          <Route path='/article/:articleID' element={<SingleArticlesPage/>} />
                          <Route path='/articles-pending' element={<PendingArticlesPage/>} />
                          <Route path='/profile/patient/:patientID' element={<PatientProfile/>} />
                          <Route path='/profile/doctor/:doctorID' element={<DoctorProfile/>} />
                          {/* <Route path='/issues' element={<IssusPage/>} /> */}
                          <Route path='/test' element={<TestChatPage/>} />
                          <Route path='/testnotify' element={<TestNotifyPage/>} />
                      </Routes>
                  </>
          } />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
