import { useAnecdoteActions } from '../store'

const AnecdoteForm = () => {

  const { add, setNotification } = useAnecdoteActions()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    try {
      await add(content)
      setNotification(`New anecdote ${content} added`)
    } catch {
      setNotification('Failed to create anecdote')
    }
    event.target.reset()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
            data-testid="new"
            name="anecdote"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm