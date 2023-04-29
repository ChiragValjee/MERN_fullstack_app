// import GoogleLogin from "react-google-login";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {useEffect} from "react";

function GoogleSignIn(){

const handleCallbackResponse = (response) => {
    console.log(response)
    let userCredentials = jwt_decode(response.credential)
    let userEmail = userCredentials.email
    console.log(userEmail)
    axios({
        method: "POST",
        url: "/api/blog/googleLogin",
        data: {userName: userEmail}
    }).then(response => {
        if(response.data.existingUser){
            localStorage.setItem("token", response.data.existingUser)
            alert("Google login successful")
            window.location.href ='/user-blog'
        } else{
            alert("your Google account is not registered as a user")
        }
        }
    )}


    useEffect(()=> {
        /* global google */
        function renderButton() {
            if (typeof google !== 'undefined') {
                google.accounts.id.initialize({
                    client_id: "803762574211-h0t59lbnd7mrrnog9qic18fvj0il90e4.apps.googleusercontent.com",
                    callback: handleCallbackResponse
                })
                google.accounts.id.renderButton(document.getElementById("googleSignIn"),
                    {
                        theme: "outline",
                        size: "extra large"
                    })
            } else {
                setTimeout(renderButton, 100);
            }
        }
        renderButton();
    }, [])

const responseErrorGoogle = (response) => {

    console.log(response)

}


    return(
        <div>
            <div id="googleSignIn">

            </div>

            {/*<GoogleLogin*/}
            {/*    clientId="803762574211-h0t59lbnd7mrrnog9qic18fvj0il90e4.apps.googleusercontent.com"*/}
            {/*    buttonText="Index with google"*/}
            {/*    onSuccess={responseSuccessGoogle}*/}
            {/*    onFailure={responseErrorGoogle}*/}
            {/*    cookiePolicy={'single_host_origin'}*/}
            {/*/>*/}
        </div>
    )
}

export default GoogleSignIn