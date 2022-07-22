import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

  const [inputValue, setInputValue] = useState('')

  const [touched, setTouched] = useState(false)

  const { addNewEntry } = useContext(EntriesContext)

  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSave = () => {

    const description = inputValue.trim()

    if (description.length === 0) return

    addNewEntry(description)
    setInputValue('')
    setTouched(false)
  }

  return (
    <Box
      sx={{
        marginBottom: 2,
        paddingX: 1
      }}
    >
      {
        isAddingEntry ?
          <>
            <TextField
              fullWidth
              sx={{
                marginTop: 2,
                marginBottom: 1
              }}
              placeholder='Nueva entrada'
              autoFocus
              multiline
              error={inputValue.trim().length <= 0 && touched}
              label='Nueva entrada'
              helperText={inputValue.trim().length <= 0 && touched && 'Ingresa un valor'}
              value={inputValue}
              onChange={onTextChange}
              onBlur={() => {
                setTouched(true)
              }}
            />
            <Box
              display='flex'
              justifyContent='space-between'
            >
              <Button
                onClick={() => {
                  setIsAddingEntry(false)
                  setInputValue('')
                  setTouched(false)
                }}
                variant='text'
              >Cancelar</Button>
              <Button
                onClick={onSave}
                color='primary'
                variant='outlined'
                endIcon={
                  <SaveOutlinedIcon />
                }
              >Guardar</Button>
            </Box>
          </> :
          <Button
            onClick={() => {
              setIsAddingEntry(true)
            }}
            startIcon={<AddCircleOutlineOutlinedIcon />}
            fullWidth
            variant='outlined'
          >
            Agregar tarea
          </Button>
      }
    </Box>
  )
}
