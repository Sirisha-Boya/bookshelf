import { Grid, Paper } from '@mui/material'
import React from 'react'

const PreviewBook = () => {
  return (
    <Paper elevation={6}>
        <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
                <h1>Preview</h1>
            </Grid>
        </Grid>
    </Paper>
  )
}

export default PreviewBook