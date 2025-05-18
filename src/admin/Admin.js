import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Admin() {

    useEffect(() => {
        if(localStorage.getItem("admin"))
        {
            navigate("/adminDashboard");
        }
    })

    const [password, setPassword] = new useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const admin = {
            name:"Admin",
            password
        }

        const formData = new FormData();
        formData.append("admin", JSON.stringify(admin));

        try {
            const response = await fetch("http://localhost:8080/admin/verifyAdmin", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const admin = await response.json();
                // console.log(student.roll);
                localStorage.setItem("admin", admin.name)
                alert("Login Successful");
                window.location.reload(); 
                navigate("/adminDashboard");
            } else if (response.status === 401) {
                alert("Invalid credentials. Please try again.");
            } else if (response.status === 404) {
                alert("Admin not found.");
            } else {
                const errorText = await response.text();
                console.error("Server error:", errorText);
                alert("Server error: " + errorText);
            }
        }

        catch (e) {
            console.error("Error: ", e);
            alert("Something went wrong");
        }

    }
    return (
        <>
            <title>Admin Login</title>
            <form onSubmit={handleSubmit}>
                <div>Admin Login</div>
                <label>Password:</label><input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default Admin;