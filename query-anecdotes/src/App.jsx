import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import useAnecdotes from './hooks/useAnecdotes'
import useUpdateAnecdote from './hooks/useUpdateAnecdote'

const App = () => {

  const result = useAnecdotes()
  const updateAnecdoteMutation = useUpdateAnecdote()

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const anecdotes = result.data

  if (result.isLoading) {
    return <div>loading...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App