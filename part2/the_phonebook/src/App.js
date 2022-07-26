import {useState, useEffect} from 'react'
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import numberService from './services/numbers'
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        numberService
            .getAll()
            .then(res => {
                setPersons(res.data)
            })
    }, [])

    const handleNameChange = (e) => {
        setNewName(e.target.value)
    }
    const handleNumberChange = (e) => {
        setNewNumber(e.target.value)
    }

    const deletePerson = id => {
        if (window.confirm("Delete this user?")) {
            numberService
                .remove(id)
                .then(res => {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(err => console.log(err))
        }
    }


    const addNewName = (e) => {
        e.preventDefault()
        const names = persons.map(person => person.name)
        const nameExists = names.includes(newName)
        if (nameExists) return alert(`${newName} is already added to phonebook`)
        if (!newName || !newNumber) return alert('missing name or phone number')
        const newPerson = {
            name: newName,
            number: newNumber
        }
        numberService
            .create(newPerson)
            .then(res => {
                setPersons(persons.concat(res.data))
                setNewName('')
                setNewNumber('')
            })
        setErrorMessage(
            `Added ${newPerson.name}`
        )
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={errorMessage}/>
            <h3>Add a new</h3>
            <PersonForm addNewName={addNewName}
                        newName={newName}
                        newNumber={newNumber}
                        handleNameChange={handleNameChange}
                        handleNumberChange={handleNumberChange}/>
            <h2>Numbers</h2>
            <Persons persons={persons} onDeleted={deletePerson}/>
        </div>
    )
}

export default App