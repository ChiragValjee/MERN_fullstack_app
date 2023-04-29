import axios from "axios";
import FacebookLogin from "react-facebook-login";
import "../Login.css"
import library from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";



function FacebookSignIn(){


    const responseFacebook = (response) => {
        console.log(response)
        axios({
            method: "POST",
            url: "/api/blog/facebookLogin",
            data: {username: response.email}
        }).then(response => {
            if(response.data.existingUser){
                localStorage.setItem("token", response.data.existingUser)
                alert("facebook login successful")
                window.location.href ='/user-blog'
            } else{
                alert("your facebook account is not registered as a user")
            }
            }
        )}
    return(
        <div>
            <FacebookLogin
                appId="199754669497226"
                fields= "name, email"
                autoLoad={false}
                callback={responseFacebook}
                icon="fa-facebook"
                size="small"
                width={"40%"}
            />
        </div>
    )
}

export default FacebookSignIn
