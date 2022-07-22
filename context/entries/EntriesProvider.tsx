import { FC, useReducer } from 'react'
import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'

import { v4 as uuidv4 } from 'uuid'

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'Pendiente: Lorem ipsum',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: 'En progreso: Lorem ipsum 2',
      status: 'in-progress',
      createdAt: Date.now() - 1_000_000
    },
    {
      _id: uuidv4(),
      description: 'Terminado: Lorem ipsum 3',
      status: 'finished',
      createdAt: Date.now() - 100_000
    },
  ]
}

interface Props {
  children: JSX.Element
}

export const EntriesProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: 'pending'
    }
    dispatch({ type: 'Entry - Add Entry', payload: newEntry })
  }

  return (
    <EntriesContext.Provider value={{
      ...state,
      addNewEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}