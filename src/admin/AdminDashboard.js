import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function AdminDashboard()
{
    useEffect(() => {
            if(!localStorage.getItem("admin"))
            {
                navigate("/admin");
            }
        });

    const navigate = useNavigate();
   return (
        <div className="dashboard">
            <h2>Welcome Admin</h2>
            <div className="job-cards-container">
                        <div className="job-card">
                            <h3>Add Job</h3>
                            <button onClick={() => navigate(`/addJob`)}>Add Job</button>
                        </div>
                        <div className="job-card">
                            <h3>Delete Job</h3>
                            <button onClick={() => navigate(`/deleteJob`)}>Delete Job</button>
                        </div>
            </div>
        </div>
    );
}

export default AdminDashboard;