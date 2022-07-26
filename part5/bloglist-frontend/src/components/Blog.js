const Blog = ({blog, addLike, onDelete }) => (
    <div>
        {`${blog.title} - ${blog.author} - likes ${blog.likes}`}
        <br/>
        <button onClick={addLike}>like</button>
        <button onClick={onDelete}>delete</button>
    </div>
)

export default Blog