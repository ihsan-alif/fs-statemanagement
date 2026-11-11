import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from '../requests'

export const useAnecdotes = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes
  })

  return result
}

export default useAnecdotes