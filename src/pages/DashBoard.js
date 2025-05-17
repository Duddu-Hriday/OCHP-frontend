import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function DashBoard() {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("student"))
        {
            navigate("/login");
        }
    })
    const [jobs, setJobs] = useState([]);
    

    useEffect(() => {
        fetch("https://ochp-backend.onrender.com/api/jobs")
            .then((res) => res.json())
            .then((data) => {
                // console.log('Fetched jobs:', data);
                setJobs(data)
            })
            .catch(
                (err) => console.error(err)
            );
    }, []);

    return (
        <div className="dashboard">
            <h2>Available Jobs</h2>
            <div className="job-cards-container">
                {jobs.length === 0 ? (
                    <p>No jobs available</p>
                ) : (
                    jobs.map((job, index) => (
                        <div className="job-card" key={index}>
                            <h3>{job.role}</h3>
                            <p><strong>Company:</strong> {job.companyName}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Interview Date:</strong> {job.interviewDate}</p>
                            <button onClick={() => navigate(`/job/${job.id}`)}>View Details</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

}

export default DashBoard;