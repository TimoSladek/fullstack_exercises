import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

let setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const req = await axios.post(baseUrl, newObject, config)
    return req.data
}

const update = async (id, newBlogObject) => {
    const req = await axios.put(`${baseUrl}/${id}`, newBlogObject)
    return req.data
}

const remove = async (id) => {
    const req = await axios.delete(`${baseUrl}/${id}`)
    return req.data
}



export default { getAll, create, setToken, update, remove }