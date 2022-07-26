

const Persons = ({persons, onDeleted}) => {
    const personsToShow = persons.map(person =>
        <p key={person.id}>{person.name} {person.number} <button key={person.id} onClick={() => onDeleted(person.id)}>delete</button></p>)

    return (
        <div>
            {personsToShow}
        </div>
    )
}

export default Persons