import { useAnecdoteActions } from '../store'

const Filter = () => {

  const { setFilter } = useAnecdoteActions()

  const handleChange = (event) => {
    event.preventDefault()

    const value = event.target.value
    setFilter(value)
  }

  const style = { marginBottom: 10 }

  return (
    <div style={style}>
        filter <input onChange={handleChange} data-testid='filter' />
    </div>
  )
}

export default Filter