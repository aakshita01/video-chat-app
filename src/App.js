import React from 'react';
import { Typography, AppBar,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: '30px 100px',
    display: 'inline',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    outlineWidth: 'thick',
    borderLeft: '2px solid black',
    borderBottom: '2px solid black',

    [theme.breakpoints.down('xs')]: {
     outlineWidth: 'thick',
    },
  },
  image: {
    marginTop: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    outlineWidth: 'thick',
    
  },
}));





const App = () => {
  const classes = useStyles();
 
  return (
    <div className={classes.wrapper} style={{ fontFamily: 'Avenir' }}>
      <Button variant="contained" color="primary" startIcon={<ExitToAppIcon />} onClick={event =>  window.location.href= "http://localhost:5000"}>LOGOUT</Button>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h3" align="center">VIDEO APP</Typography>
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  );
};

export default App;