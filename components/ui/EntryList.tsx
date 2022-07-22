import { List, Paper } from '@mui/material'
import React, { DragEvent, FC, useContext, useMemo } from 'react'
import { EntriesContext } from '../../context/entries'
import { UIContext } from '../../context/ui'
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './'
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext(EntriesContext)

  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

  const onDrop = (event: DragEvent) => {
    const id = event.dataTransfer.getData('text')

    const entry = entries.find(e => e._id === id)!
    entry.status = status
    updateEntry(entry)
    endDragging()
  }

  const allowDrop = (event: DragEvent) => {
    event.preventDefault()
  }

  return (
    <div
      className={
        isDragging ? styles.dragging : undefined
      }
      onDrop={onDrop}
      onDragOver={allowDrop}
    >
      <Paper
        sx={{
          height: 'calc(100vh - 250px)',
          overflow: 'auto',
          backgroundColor: 'transparent',
          padding: '10px'
        }}
      >
        {/* Todo: cambiara dependiendo si estoy haciendo drag o no */}

        <List sx={{
          opacity: isDragging ? 0.2 : 1,
          transition: 'all 0.3s'
        }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard entry={entry} key={entry._id} />
            ))
          }
        </List>
      </Paper>
    </div >
  )
}