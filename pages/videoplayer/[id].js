import { connectToDatabase } from "../../util/mongodb";
import ReactPlayer from 'react-player/youtube'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Bookmarks from '../../components/Bookmarks'
import { useState } from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    radio: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      marginRight: '10px'
    }
}))

export default function videoplayer(props) {

  const classes = useStyles();

  // getting video id from uri
  const router = useRouter()
  const { id } = router.query

  const [note, setNote] = useState(null);
  const [player, setPlayer] = useState(null);
  const [bookmarks, setbookmarks] = useState(props.video.bookmarks);
  const [delay, setDelay] = useState(0);

  const handleBookmark = async (currTime, move) => {

    let time = currTime - parseInt(move) > 0 ? currTime - parseInt(move) : 0

      const newBookmark = {
        time: time,
        note: note,
      }

      const response = await fetch('/api/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newBookmark,
          videoId: id,
          action: 'add'
        })
      })
      const data = await response.json();
      console.log([...bookmarks, newBookmark])
      setbookmarks([...bookmarks, newBookmark])

  }

  const playFromHere = (time) => {
    player.seekTo(time)
  }

  const handleChange = (event) => {
    setDelay(event.target.value)
  }

  return (
    <Container maxWidth="lg">
      <Grid spacing={1} container>
        <Grid item md={8} sm={12}>
          <ReactPlayer width="100%" ref={(player) => setPlayer(player)} url={`https://www.youtube.com/watch?v=${id}`} controls playing pip stopOnUnmount={false}/>
        </Grid>
        <Grid item md={4} sm={12}>
          <FormControl sx={{ gap: 2, width: '100%' }} variant="outlined">
            <InputLabel id="delay">Delay</InputLabel>
            <Select
              labelId="delay"
              id="delay-select"
              value={delay}
              label="Delay"
              onChange={handleChange}
            >
              <MenuItem value={0}>None</MenuItem>
              <MenuItem value={10}>10 Sec</MenuItem>
              <MenuItem value={30}>30 Sec</MenuItem>
              <MenuItem value={60}>60 Sec</MenuItem>
              <MenuItem value={120}>120 Sec</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <TextField onChange={(e)=>{setNote(e.target.value)}} style={{width: '100%'}} label="Bookmark" variant="outlined" InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton onClick={() => handleBookmark(player.getCurrentTime(), delay)} aria-label="bookmark">
                <BookmarkIcon/>
              </IconButton>
            </InputAdornment>
            }} />
          </FormControl>
          <Bookmarks playFromHere={playFromHere} id={id} bookmarks={bookmarks} />
        </Grid>
      </Grid>
    </Container>
  )
}


export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const video = await db
    .collection("videos")
    .findOne({videoId: context.params.id})
    return {
      props: {
        video: JSON.parse(JSON.stringify(video)),
      },
    };
}