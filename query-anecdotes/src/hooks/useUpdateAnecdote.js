import { useMutation, useQueryClient } from '@tanstack/react-query'
import { update } from '../requests'

const useUpdateAnecdote = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
    }
  })

  return mutation
}

export default useUpdateAnecdote