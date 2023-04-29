import {useState} from "react";
import "../Login.css"

function AdminSignIn(){
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")

    async function handleAdminForm(e){
        e.preventDefault()
        const response = await fetch('/api/blog/loginAdmin', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({email,password})
        })
        const data = await response.json()

        if (data.user){
            localStorage.setItem("adminToken", data.user)
            alert("You are successfully logged in as an Admin, please press ok to proceed")
            window.location.href = "/admin-blog"
        }else{
            alert("Please check credentials or contact support")
        }
    }

    return(
        <div>
            <div className="wrapper">
                <h2 className="title">Admin Login</h2>
            <form onSubmit={handleAdminForm}>
                <div className="field">
                <label>Email:</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div className="field">
                <label>Password:</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                </div>

                <div className="container">
                    <button className="loginButton" type="submit">Login</button>
                </div>
            </form>
            </div>

        </div>
    )
}

export default AdminSignIn