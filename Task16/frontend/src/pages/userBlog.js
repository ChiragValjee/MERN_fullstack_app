import {useEffect} from "react";
import {useState} from "react";
import "../UserBlog.css"

function UserBlog(){
    const [blogs, setBlogs] = useState("")


    useEffect(() => {
        async function getBlogs() {
            const response = await fetch('/api/blog')
            const data = await response.json()

            if (response.ok){
                setBlogs(data)
            }
            const token = localStorage.getItem("token")
            if(!token){
                window.location.href="/"
            }
        }
        getBlogs()
    }, [blogs])

    return(
        <div className="blogs">
            <div className="heading">
            <h1>Welcome to Porto Rio</h1>
            <h2>We will keep you up to date with the latest news here</h2>
            </div>
            {blogs && blogs.map((blog) => (
                <div key={blog._id} className="blog">
                    <h5 className="title">{blog.title}</h5>
                    <p className="blogInfo">{blog.description}</p>
                </div>
            ))}
        </div>
    )
}

export default UserBlog