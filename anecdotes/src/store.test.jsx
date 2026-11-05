import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act, render, screen, cleanup } from '@testing-library/react'
import AnecdoteList from './components/AnecdoteList'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    deleteAnecdote: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

afterEach(() => cleanup())

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('renders anecdotes sorted by votes', () => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: 1, content: 'A', votes: 2},
        { id: 2, content: 'B', votes: 5},
        { id: 3, content: 'C', votes: 3},
      ],
    })

    render(<AnecdoteList />)

    const anecdotes = screen.getAllByTestId('anecdote')

    expect(anecdotes[0].textContent).toContain('B')
    expect(anecdotes[1].textContent).toContain('C')
    expect(anecdotes[2].textContent).toContain('A')
  })

  it('renders only anecdotes matching the filter', () => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: 1, content: 'first', votes: 2},
        { id: 2, content: 'second', votes: 5},
        { id: 3, content: 'third', votes: 3},
      ],
      filter: 'first',
    })

    render(<AnecdoteList />)

    expect(screen.getAllByTestId('anecdote')).toHaveLength(1)

    expect(screen.getByText('first')).toBeInTheDocument()
    expect(screen.queryByText('second')).not.toBeInTheDocument()
    expect(screen.queryByText('third')).not.toBeInTheDocument()
  })

  it('add appends a new anecdote', async () => {
    const newAnecdote = { id: 2, content: 'New anecdote', votes: 0 }
    anecdoteService.createNew.mockResolvedValue(newAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.add('New anecdote')
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toContainEqual(newAnecdote)
  })

  it('update votes when clicked', async () => {
    const anecdote = { id: 1, content: 'Test', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [anecdote] })
    anecdoteService.update.mockResolvedValue({ ...anecdote, votes: anecdote.votes + 1 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote(1)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current[0].votes).toBe(1)
  })

  it('delete anecdote when clicked', async () => {
    const anecdote = { id: 1, content: 'Test', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [anecdote] })
    anecdoteService.deleteAnecdote.mockResolvedValue(anecdote.id)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.remove(anecdote.id)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).not.toContainEqual(anecdote)
  })
})

describe('useAnecdotes filtering', () => {
  const anecdotes = [
    { id: 1, content: 'A', votes: 0 },
    { id: 2, content: 'B', votes: 0 },
  ]

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes })
  })

  it('returns all anecdotes with no filter', () => {
    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toHaveLength(2)
  })

  it('returns anecdote with filter', () => {
    useAnecdoteStore.setState({ filter: 'A' })
    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toEqual([anecdotes[0]])
  })
})