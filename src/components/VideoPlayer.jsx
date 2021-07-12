import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles,Button } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import VideocamIcon from '@material-ui/icons/Videocam';

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  video: {
    outlineWidth: 'thick',
    [theme.breakpoints.down('xs')]: {
      outlineWidth: 'thick',
    },
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  buttonGridContainer: {
    outlineWidth: 'thick',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]:{
      flexDirection:'column',
      borderLeft: '2px solid black',
    borderBottom: '2px solid black',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call,toggleVideo,muteCall } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <div style={{ fontFamily: 'Avenir' }}>
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'NAME'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'NAME'}</Typography>
            <video playsInline ref={userVideo} autoPlay className={classes.video} />
          </Grid>
        </Paper>
      )}
    </Grid>
    <Grid container className={classes.gridContainer}>
        <Grid item xs={12} md={6} className={classes.buttonGridContainer}>
          <Button variant="contained" color="primary" className={classes.button} startIcon={<VideocamIcon />} onClick={toggleVideo}>
            Video
          </Button>
        </Grid>

        <Grid item xs={12} md={6} className={classes.buttonGridContainer}>
          <Button variant="contained" color="primary" className={classes.button} startIcon={<MicIcon />} onClick={muteCall}>
            Mic
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default VideoPlayer;