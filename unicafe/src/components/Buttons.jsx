import { useFeedBackActions } from '../store'

const Buttons = () => {

  const { good: giveGood, neutral: giveNeutral, bad: giveBad } = useFeedBackActions()

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={giveGood}>good</button>
      <button onClick={giveNeutral}>neutral</button>
      <button onClick={giveBad}>bad</button>
    </div>
  )
}

export default Buttons
