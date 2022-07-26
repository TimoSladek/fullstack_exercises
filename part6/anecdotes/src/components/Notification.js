import {useSelector} from 'react-redux'
import {useState} from "react";

const Notification = () => {
    const [message, setMessage] = useState('')
    const anecdote = useSelector(state => state.anecdotes[state.anecdotes.length - 1].content)
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    }

    return (
        <div style={style}>
            {`you voted '${anecdote}'`}
        </div>
    )
}

export default Notification