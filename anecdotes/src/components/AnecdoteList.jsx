import { useAnecdotes, useAnecdoteActions } from '../store'

const AnecdoteList = () => {

  const anecdotes = useAnecdotes()
  const { vote, remove, setNotification } = useAnecdoteActions()

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  const handleVote = async (anecdote) => {
    try {
      await vote(anecdote.id)
      setNotification(`you voted '${anecdote.content}'`)
    } catch {
      setNotification('Voting failed')
    }
  }

  const handleDelete = async (anecdote) => {
    try {
      await remove(anecdote.id)
      setNotification(`Anecdote ${anecdote.content} deleted`)
    } catch {
      setNotification('Failed to delete anecdote')
    }
  }

  return (
    <div>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id} data-testid='anecdote'>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && (
              <button onClick={() => handleDelete(anecdote)}>delete</button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList