import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import {LoginForm} from './components/LoginForm'
import {BlogForm} from "./components/BlogForm";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [blogFormVisible, setBlogFormVisible] = useState(false)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async e => {
        e.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log(`error: ${exception}`)
        }
        console.log('logging in with', username, password)
    }

    const addBlog = async blogObject => {
        try {
            const newBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(newBlog))
            setBlogFormVisible(false)
        } catch (e) {
            console.log(`error: ${e}`)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        window.location.reload()
    }

    if (user === null) {
        return (
            <LoginForm handleLogin={handleLogin}
                       username={username}
                       password={password}
                       setUsername={setUsername}
                       setPassword={setPassword}
            />
        )
    }

    const addLike = async id => {
        const blog = blogs.find(blog => blog.id === id)
        const changedBlog = {...blog, likes: blog.likes + 1, user: blog.user.id}

        try {
            const updatedBlog = await blogService.update(id, changedBlog)
            setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
            // window.location.reload()
        } catch (e) {
            console.log(`error: ${e}`)
        }
    }

    const onDelete = async id => {
        if (window.confirm("Delete this blog?")) {
            try {
                await blogService
                    .remove(id)
                    setBlogs(blogs.filter(blog => blog.id !== id))
            } catch (e) {
                console.log(`error: ${e}`)
            }
        }
    }

    return (
        <div>
            <h2>blogs</h2>
            <p>
                {user.name} logged in
                <button onClick={logout}>logout</button>
            </p>
            <BlogForm createBlog={addBlog}
                      blogFormVisible={blogFormVisible}
                      setBlogFormVisible={setBlogFormVisible}
            />
            {blogs.map(blog =>
                <Blog key={blog.id}
                      blog={blog}
                      addLike={() => addLike(blog.id)}
                      onDelete={() => onDelete(blog.id)}/>
            )}
        </div>
    )
}

export default App