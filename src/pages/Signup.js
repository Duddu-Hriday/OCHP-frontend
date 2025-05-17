import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Signup() {
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("student"))
        {
            navigate("/dashboard");
        }
    })

    const [name, setName] = useState("");
    const [roll, setRoll] = useState("");
    const [phone, setPhone] = useState("");
    const [cemail, setCemail] = useState("");
    const [pemail, setPemail] = useState("");
    const [cpi, setCpi] = useState("");
    const [spi, setSpi] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [resume, setResume] = useState(null);
    const [photo, setPhoto] = useState(null);

    

    const handleRedirect = (e) => {
        e.preventDefault();
        navigate('/login');
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            alert("Passwords didnot match!!");
            return;
        }
        const phoneregex = /^\d{10}$/;
        if (!phoneregex.test(phone)) {
            alert("Phone number need to be of 10-digits");
            return;
        }

        const student = {
            id: roll,
            name,
            roll,
            cemail,
            pemail,
            cpi,
            spi,
            password
        }

        const formData = new FormData();
        formData.append("student", JSON.stringify(student));
        formData.append("resume", resume);
        formData.append("photo", photo);

        try {
            const response = await fetch("https://ochp-backend.onrender.com/api/addStudent", {
                method: "POST",
                body: formData
            })

            if (response.ok) {
                alert("Registration Successful");
                navigate("/login");
            }
            else if (response.status === 400) {
                alert("Student Data exists");
                navigate("/login");
            }
            else {
                alert("Something went wrong");
                navigate("/login");
            }
            // const data = await response.json();
            // console.log("Response: ",data);

        }
        catch (err) {
            console.error("Error: ", err);
            alert("Something went wrong");
        }
        // alert(`The name is:  ${name}`);
    }

    const handleResumeUpload = (e) => {
        setResume(e.target.files[0]);
    }

    const handlePhotoUpload = (e) => {
        setPhoto(e.target.files[0]);
    }

    return (
        <>
            <title>Sign Form</title>
            <form onSubmit={handleSubmit}>
                <div>Student Registration</div>
                <label>Name: </label><input type='text' value={name} onChange={(e) => setName(e.target.value)} required></input>
                <label>Roll No: </label><input type='text' value={roll} onChange={(e) => setRoll(e.target.value)} required></input>
                <label>Phone Number: </label><input type='number' value={phone} onChange={(e) => setPhone(e.target.value)} required></input>
                <label>Email(College): </label><input type='email' value={cemail} onChange={(e) => setCemail(e.target.value)} required></input>
                <label>Email(Personal): </label><input type='email' value={pemail} onChange={(e) => setPemail(e.target.value)} required></input>
                <label>CPI: </label><input type='text' value={cpi} onChange={(e) => setCpi(e.target.value)} required></input>
                <label>SPI(Last semester): </label><input type='text' value={spi} onChange={(e) => setSpi(e.target.value)} required></input>
                <label>Password:</label><input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <label>Retype Password:</label><input type='password' value={cpassword} onChange={(e) => setCpassword(e.target.value)} required></input>
                <label>Resume: </label><input type='file' onChange={handleResumeUpload} required></input>
                <label>Photo: </label><input type='file' onChange={handlePhotoUpload} required></input>
                <button type='submit'>Register</button>
                <button onClick={handleRedirect}>Login</button>

            </form>
        </>
    )
}

export default Signup