import { useMutation, useQueryClient } from '@tanstack/react-query'
import { update } from '../requests'
import useNotify from './useNotify'

const useUpdateAnecdote = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useNotify()

  const mutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
      setNotification(`anecdote '${updatedAnecdote.content}' voted`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
  })

  return mutation
}

export default useUpdateAnecdote