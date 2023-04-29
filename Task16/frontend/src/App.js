import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Index from "./pages";
import Registration from "./pages/registration";
import UserBlog from "./pages/userBlog";
import AdminBlog from "./pages/adminBlog";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
              path='/'
              element={<Index/>}
        />

          <Route
            path='/register'
            element={<Registration/>}
            />

          <Route
            path='/user-blog'
            element={<UserBlog/>}
            />
          <Route
            path='/admin-blog'
            element={<AdminBlog/>}
            />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
