import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import React from 'react';

export default function AddVideo(props) {
  const [message, setMessage] = useState("");

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath + '#videos');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'add',
        cat: props.cat,
        id: e.target[0].value
      })
    })
    const status = await response.text()
    setMessage(status)
    refreshData()
  }

  return (
    <div>
      <form onSubmit={e => { handleSubmit(e) }} style={{ width: '350px', display: 'flex', justifyContent: "space-evenly", margin: "20px auto" }}>
        <TextField required id="videoLink" label={`Add ${props.cat} Video`} style={{ width: '100%', marginRight: '10px' }} variant="outlined" />
        <Button type="submit" size="small" variant="contained" color="primary">
          submit
        </Button>
      </form>
      <h4>{message}</h4>
    </div>
  )
}