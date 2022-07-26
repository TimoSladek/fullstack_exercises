import {useDispatch, useSelector} from 'react-redux'
import {addVoteToAnecdote} from "../reducers/anecdoteReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)

    const vote = async (id) => {
        const anecdoteToBeUpdated = anecdotes.find(anecdote => anecdote.id === id)
        const updatedAnecdote = {...anecdoteToBeUpdated, votes: anecdoteToBeUpdated.votes + 1}
        await anecdoteService.update(id, updatedAnecdote)
        dispatch(addVoteToAnecdote(id))
    }


    const orderedAnecdotes = anecdotes.slice().sort((a, b) => {
        return b.votes - a.votes
    })

    return (
        <div>
            <h2>Anecdotes</h2>
            {orderedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList