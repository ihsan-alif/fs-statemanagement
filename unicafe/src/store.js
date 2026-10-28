import { create } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const useFeedbackStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,

  actions: {
    good: () => set(state => ({ good: state.good + 1 })),
    neutral: () => set(state => ({ neutral: state.neutral + 1 })),
    bad: () => set(state => ({ bad: state.bad + 1 }))
  } 
}))

export const useFeedBackValues = () =>
  useFeedbackStore(
    useShallow(state => ({
      good: state.good,
      neutral: state.neutral,
      bad: state.bad
    }))
  )

export const useFeedBackActions = () =>
  useFeedbackStore(state => state.actions)