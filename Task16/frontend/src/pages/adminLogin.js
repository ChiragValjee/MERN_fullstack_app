import {useState} from "react";
import '../Login.css'


function AdminLogin(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function loginForm(e) {
        e.preventDefault()
    }
    return(
        <div>
            <div className="loginDetails">
                <div className="wrapper">
                    <h2 className="title">Admin Login</h2>
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
                </div>


            </div>

        </div>
    )
}

export default AdminLogin
