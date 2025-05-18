import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function AddJob() {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem("admin"))
        {
            navigate("/admin");
        }
    })

    const [companyName, setCompanyName] = useState("");
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("");
    const [rCPI, setRCPI] = useState("");
    const [ctc, setCtc] = useState("");
    const [interviewDate, setInterviewDate] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [interviewRounds, setInterviewRounds] = useState("");
    const [conditions, setConditions] = useState("");

    


    const handleSubmit = async (e) => {
        e.preventDefault();
        const job = {
            companyName,
            location,
            role,
            rCPI,
            ctc,
            interviewDate,
            joiningDate,
            interviewRounds,
            conditions
        }

        const formData = new FormData();
        formData.append("job", JSON.stringify(job));

        try {
            const response = await fetch("https://ochp-backend.onrender.com/admin/addJob", {
                method: "POST",
                body: formData
            })

            if (response.ok) {
                alert("Job addition Successful");
                navigate("/adminDashboard");
            }

            else {
                alert("Something went wrong");
                navigate("/adminDashboard");
            }
            // const data = await response.json();
            // console.log("Response: ",data);

        }
        catch (err) {
            console.error("Error: ", err);
            alert("Something went wrong");
            navigate("/adminDashboard");
        }
        // alert(`The name is:  ${name}`);
    }


    return (
        <>
            <title>Job Form</title>
            <form onSubmit={handleSubmit}>
                <div>Job Addition</div>
                <label>Company Name: </label><input type='text' value={companyName} onChange={(e) => setCompanyName(e.target.value)} required></input>
                <label>Location: </label><input type='text' value={location} onChange={(e) => setLocation(e.target.value)} required></input>
                <label>Role: </label><input type='text' value={role} onChange={(e) => setRole(e.target.value)} required></input>
                <label>Required CPI: </label><input type='text' value={rCPI} onChange={(e) => setRCPI(e.target.value)} required></input>
                <label>CTC: </label><input type='text' value={ctc} onChange={(e) => setCtc(e.target.value)} required></input>
                <label>Interview Date: </label><input type='text' value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} required></input>
                <label>Joining Date: </label><input type='text' value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} required></input>
                <label>Interview Rounds:</label><input type='text' value={interviewDate} onChange={(e) => setInterviewRounds(e.target.value)} required></input>
                <label>Conditions: </label><input type='text' value={conditions} onChange={(e) => setConditions(e.target.value)} required></input>
                <button type='submit'>Add Job</button>

            </form>
        </>
    )
}

export default AddJob;