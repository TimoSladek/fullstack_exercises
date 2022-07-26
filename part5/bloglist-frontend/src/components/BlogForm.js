import {useState} from "react";

export const BlogForm = ({ createBlog, blogFormVisible, setBlogFormVisible }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const hideWhenVisible = {display: blogFormVisible ? 'none' : ''}
    const showWhenVisible = {display: blogFormVisible ? '' : 'none'}

    const addBlog = e => {
        e.preventDefault()
        createBlog({
            title,
            author,
            url,
            likes: 0
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    if (blogFormVisible) {
        return (
            <div>
                <h2>create new</h2>
                <form onSubmit={addBlog}>
                    <div>
                        title:
                        <input
                            value={title}
                            onChange={({target}) => setTitle(target.value)}
                        />
                    </div>
                    <div>
                        author:
                        <input
                            value={author}
                            onChange={({target}) => setAuthor(target.value)}
                        />
                    </div>
                    <div>
                        url:
                        <input
                            value={url}
                            onChange={({target}) => setUrl(target.value)}
                        />
                    </div>
                    <button type="submit">create</button>
                </form>
                <button onClick={() => setBlogFormVisible(false)}>cancel</button>
            </div>
        )
    } else {
        return (
            <div>
                <button onClick={() => setBlogFormVisible(true)}>new note</button>
            </div>
        )
    }
}
