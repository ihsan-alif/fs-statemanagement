import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../requests'
import useNotify from '../hooks/useNotify'

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const { setNotification } = useNotify()

  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`New anecdote ${newAnecdote.content} created`)
    },
    onError: () => {
      setNotification('too short anecdote, must have length 5 or more')
    }
  })

  setTimeout(() => {
    setNotification('')
  }, 5000)

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm