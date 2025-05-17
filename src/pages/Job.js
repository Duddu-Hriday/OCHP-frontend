import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Job() {

    const navigate = useNavigate();
     useEffect(() => {
        if(!localStorage.getItem("student"))
        {
            navigate("/login");
        }
    })

    const { id } = useParams();

    const handleApply = async (e) => {
        const jobApplication = {
            roll:localStorage.getItem("student"),
            jobId: id
        }
        const formData = new FormData();
        formData.append("jobApplication", JSON.stringify(jobApplication));
        try {
            const response = await fetch("http://localhost:8080/api/addApplication", {
                method: "POST",
                body: formData
            })

            if (response.ok) {
                alert("Applied");
                navigate("/appliedjobs");
            }
            else if (response.status === 400) {
                alert("Already Applied to this Job");
                navigate("/appliedjobs");
            }
            else {
                alert("Something went wrong");
                navigate("/dashboard");
            }
            // const data = await response.json();
            // console.log("Response: ",data);

        }
        catch(err)
        {
            console.error("Error: ", err);
            alert("Something went wrong");
            navigate("/dashboard");
        }
        
    }
    const [job, setJob] = useState("");


    // const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8080/api/job/${id}`)
            .then((res) => res.json())
            .then((data) => {
                // console.log('Fetched jobs:', data);
                setJob(data)
            })
            .catch(
                (err) => console.error(err)
            );
    }, [id]);

    return (
        <div className="jobdashboard">
            <h2>{job.role}</h2>
            <p><strong>Company:</strong> {job.companyName}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Required CPI:</strong> {job.rCPI}</p>
            <p><strong>CTC:</strong> {job.ctc}</p>
            <p><strong>Interview Date:</strong> {job.interviewDate}</p>
            <p><strong>Joining Date:</strong> {job.joiningDate}</p>
            <p><strong>No of Interview Rounds:</strong> {job.interviewRounds}</p>
            <p><strong>Additional Conditions:</strong> {job.conditions}</p>
            <button onClick={handleApply}>Apply</button>
        </div>
    );

}

export default Job;
