import {useState} from 'react'
import './App.css';

const Statistics = (props) => {
    const {good, neutral, bad, count, average, positive} = props
    if (count === 0) return <p>No feedback given</p>
    return (
        <table>
            <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="count" value={count}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={positive}/>
            </tbody>
        </table>
    )
}

const StatisticLine = (props) => {
    if (props.text === "positive") {
        return (
            <tr>
                <th>{props.text}</th>
                <th>{props.value} %</th>
            </tr>
        )
    }
    return (
        <tr>
            <th>{props.text}</th>
            <th>{props.value}</th>
        </tr>
    )
}

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [count, setCount] = useState(0)

    const goodFeedback = () => {
        setGood(good + 1)
        setCount(count + 1)
    }
    const neutralFeedback = () => {
        setNeutral(neutral + 1)
        setCount(count + 1)
    }
    const badFeedback = () => {
        setBad(bad + 1)
        setCount(count + 1)
    }

    const average = ((good + bad * (-1)) / count).toFixed(1)
    const positive = (good / count * 100).toFixed(1)

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={goodFeedback} text="good"/>
            <Button onClick={neutralFeedback} text="neutral"/>
            <Button onClick={badFeedback} text="bad"/>
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} count={count} average={average} positive={positive}/>
        </div>
    )
}

export default App