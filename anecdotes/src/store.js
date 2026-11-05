import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = anecdote => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0
// })

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  notification: '',

  actions: {
    add: async anecdote => {
      const newAnecdote = await anecdoteService.createNew(anecdote)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },

    vote: async id => {
      const anecdote = useAnecdoteStore.getState().anecdotes.find(n => n.id === id)
      const updated = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 })

      set(state => ({
        anecdotes: state.anecdotes.map(n => n.id === id ? updated : n)
      }))
    },
    
    setFilter: filter => set({ filter }),

    setNotification: message => {
      set({ notification: message })

      setTimeout(() => {
        set({ notification: '' })
      }, 5000)
    },

    remove: async id => {
      await anecdoteService.deleteAnecdote(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter(n => n.id !== id)
      }))
    },

    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export default useAnecdoteStore

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  
  if (filter) return anecdotes.filter(n => (
    n.content.toLowerCase().includes(filter.toLowerCase())
  ))

  return anecdotes
}

export const useFilter = () => useAnecdoteStore((state) => state.filter)

export const useAnecdotesNotification = () => useAnecdoteStore((state) => state.notification)

export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)