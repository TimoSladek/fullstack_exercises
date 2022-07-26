
const SumOfExercises = ({parts}) => {
    let sum = 0

    parts.map(part => sum += part.exercises)

    return (
        <p><strong>total of {sum} exercises</strong></p>
    )
}

export default SumOfExercises