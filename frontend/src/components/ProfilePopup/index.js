import React from 'react';
import ProfileView from '../../components/ProfileView';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  author: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  popOver: {
    pointerEvents: "none"
  }
}));

export default function ProfilePopup(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const open = Boolean(anchorEl);


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className={classes.author}>
      <Box
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        pl={2}
      >
        <Avatar src={props.pic} alt={props.user} />
        <Popover
          id='mouse-over-popover'
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            style: { width: 299 },
          }}
          className={classes.popOver}
        >
          {
            !props.authorEmail ?
              <Typography className={classes.typography}>This user's information could not be displayed</Typography> :
              <ProfileView authorEmail={props.authorEmail} />
          }
        </Popover>
      </Box>
    </div>
  )
}