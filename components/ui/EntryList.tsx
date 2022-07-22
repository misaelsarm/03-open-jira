import { List, Paper } from '@mui/material'
import React, { FC, useContext, useMemo } from 'react'
import { EntriesContext } from '../../context/entries'
import { EntryStatus } from '../../interfaces'
import { EntryCard } from './'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries } = useContext(EntriesContext)

  const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries])

  return (
    <div>
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
          opacity: 1
        }}>
          {
            entriesByStatus.map(entry => (
              <EntryCard entry={entry} key={entry._id} />
            ))
          }
        </List>
      </Paper>
    </div>
  )
}