import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {

    useEffect(() => {
        if(localStorage.getItem("student"))
        {
            navigate("/dashboard");
        }
    })

    const [roll, setRoll] = new useState("");
    const [password, setPassword] = new useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRedirect = (e) => {
        e.preventDefault();
        navigate('/signup');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const student = {
            roll,
            password
        }

        const formData = new FormData();
        formData.append("student", JSON.stringify(student));

        try {
            const response = await fetch("https://ochp-backend.onrender.com/api/verifyStudent", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                const student = await response.json();
                // console.log(student.roll);
                localStorage.setItem("student", student.roll)
                alert("Login Successful");
                window.location.reload(); 
                navigate("/dashboard");
            } else if (response.status === 401) {
                alert("Invalid credentials. Please try again.");
            } else if (response.status === 404) {
                alert("Student not found.");
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

        finally {
        setLoading(false);  // Stop loading
    }

    }
    return (
        <>
            <title>Login Form</title>
            <form onSubmit={handleSubmit}>
                <div>Student Login</div>
                <label>Roll No: </label><input type='text' value={roll} onChange={(e) => setRoll(e.target.value)}></input>
                <label>Password:</label><input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <button type='submit' disabled={loading}>{loading ? <span className="spinner"></span> : "Login"}</button>
                <button onClick={handleRedirect}>New Student</button>

            </form>
        </>
    )
}

export default Login