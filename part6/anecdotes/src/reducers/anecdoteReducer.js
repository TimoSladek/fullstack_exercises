import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        addVoteToAnecdote(state, action) {
            const id = action.payload
            const anecdoteToChanged = state.find(a => a.id === id)
            const changedAnecdote = {
                ...anecdoteToChanged,
                votes: anecdoteToChanged.votes++
            }
            state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload
        }
    }
})

export const { addVoteToAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.create(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export default anecdoteSlice.reducer