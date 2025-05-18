import logo from './Logo.png';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/DashBoard'
import Job from './pages/Job'
import AppliedJobs from './pages/AppliedJobs'
import Admin from './admin/Admin'
import AdminDashboard from './admin/AdminDashboard'
import AddJob from './admin/AddJob';
function App() {

  function applied()
  {
    window.location.href = "/appliedjobs";
  }

  function logout()
  {
    localStorage.removeItem("student");
    window.location.reload(); 
  }
  function adminlogout()
  {
    localStorage.removeItem("admin");
    window.location.reload(); 
  }

  
  return (
    <>
    <div className="App">
      <header>
        <img src={logo} alt="logo" />
        <h1>
          Welcome to the On Campus Hiring Portal
        </h1>
        {
          localStorage.getItem("student")?<button className='lgoutbtn' onClick={logout}>Logout</button>:<p></p>
        }
        {
          localStorage.getItem("admin")?<button className='lgoutbtn' onClick={adminlogout}>Logout</button>:<p></p>
        }
        {
          localStorage.getItem("student")?<button className='applied' onClick={applied}>Applied Jobs</button>:<p></p>
        }
      </header>
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path ="/job/:id" element={<Job/>}/>
          <Route path="/appliedjobs" element = {<AppliedJobs/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/adminDashboard" element={<AdminDashboard/>}/>
          <Route path="/addJob" element={<AddJob></AddJob>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
