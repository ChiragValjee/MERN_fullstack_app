import {useState} from "react";
import AdminSignIn from "../components/adminSignIn";
import '../Login.css'
import GoogleLogin from "../components/googleLogin";
import GoogleSignIn from "../components/googleLogin";
import FacebookSignIn from "../components/facebookLogin";

function Index() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    async function loginForm(e) {
        e.preventDefault()
        const response = await fetch('/api/blog/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })
        const data= await response.json()
        if(data.user){
            localStorage.setItem("token", data.user)
            alert("You are successfully logged in, please press ok to proceed")
            window.location.href= "/user-blog"
        }else{
            alert("Incorrect credentials. Try again or contact support")
        }


    }

    function showAdminLogin() {
        setIsAdmin(true)
    }

    function createAccount(){
        window.location.href="/register"
    }

    return (
        <div className="loginDetails">
            {isAdmin ? (
                <div>
                    <AdminSignIn/>
                </div>) : (
                <div className="wrapper">



                    <h2 className="title">Login</h2>

                    <form onSubmit={loginForm} className="loginForm">
                        <div className="field">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-Mail"
                        />
                        </div>
                        <div className="field">

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        </div>


                        <div className="container">
                        <button className="loginButton" type="submit">Login</button>
                        </div>

                    </form>
                    <div className="facebookGoogleButtons">
                        <div className="googleButton">
                        <GoogleSignIn/>
                        </div>
                       <FacebookSignIn/>
                    </div>

                    <div className="containerTwo">
                    <button className="createAccountButton" type="button" onClick={createAccount}>Create an account</button>
                    <button className="adminLoginButton" type="button" onClick={showAdminLogin}>Admin Login</button>
                    </div>

                </div>)}

        </div>
    )
}

export default Index