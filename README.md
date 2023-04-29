Company Blog App

How to use the app: 

Register:
The user can register by navigating to the registration page and filling out the form with their name, email, and password.
After submitting the form, if the registration is successful, the user will be redirected to the login page.

Login:
On the login page, the user can enter their email and password and click the "Login" button to log in.
Alternatively, the user can choose to log in with their Google or Facebook account by clicking the respective buttons.
If the login is successful, the user will be redirected to the company blog page.

View company blog:
On the company blog page, the user will be able to view the company's blog and read posts.
Overall, the user journey of your app involves registering, logging in, and viewing the company blog. The app provides multiple ways for the user to log in, including traditional email/password login and social media login with Google or Facebook. 
The company blog page allows the user to read posts that the company admin has created.

Modyfying a mongoURI:
Locate the MongoDB URI.
Obtain the new MongoDB URI: You will need to obtain the new URI from your new MongoDB instance. This is hosted by Mongo Atlas.
Update the URI in your codebase: Once you have the new URI, replace the old URI with the new one in your codebase. 
Test the connection: After updating the URI, test the connection to ensure that your app can connect to the new MongoDB instance. You can do this by running your app and checking the logs for any connection errors.
Update any other necessary configuration: If you have any other configuration that is tied to your MongoDB instance, such as database names or user credentials, make sure to update those as well.
Installing, testing and running the code Installing Clone/Download the project to your computer Open the command prompt/terminal and navigate to the backend folder Run npm install Open another command prompt/terminal navigate to the frontend folder Run npm install

Testing To test the backend: Open the command prompt/terminal and navigate to the backend folder Run npm start to start the server Open another command prompt/terminal without closing the other one and navigate to the backend folder Run npm test to run the backend test(s)

To test the frontend Open the command prompt/terminal and navigate to the frontend folder Run npm test to run the frontend test(s)

Running the code Open the command prompt/terminal and navigate to the backend folder Run npm start Open another command prompt/terminal without closing the other one and navigate to the frontend folder Run npm start Open http://localhost:3000 to view the application in your browser

Third party API's used:
Google Login and Facebook Login are third-party authentication APIs that allow users to log in to websites or apps using their Google or Facebook account credentials, respectively. 
These APIs provide an easy and secure way for users to authenticate themselves without having to remember yet another username and password combination.
When a user chooses to log in using one of these third-party services, the website or app redirects them to the Google or Facebook website to enter their credentials. 
After the user successfully logs in, the third-party service generates an authentication token that can be used to authenticate the user on the original website or app.

Security This application has been secured using Helmet.
Helmet is a middleware for Express.js that helps secure your web applications by setting various HTTP headers. 
It adds an extra layer of security to your app by protecting it from common vulnerabilities like Cross-Site Scripting (XSS), Clickjacking, and other attacks.

