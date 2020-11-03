import React, { useState } from 'react';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  scrollTop: {
    position: "fixed",
    top: 0,
    animation: "fadeIn 0.3s",
    transition: "opacity 0.4s",
  },
  button:{
    fontSize:'32px',
    color:'primary',
  }
}))


const ScrollButton = () => {
  const classes = useStyles();

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false)
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
    <IconButton color="primary" className={classes.scrollTop} onClick={scrollTop} style={{ height: 40, display: showScroll ? 'flex' : 'none' }} >
      <ArrowUpwardRoundedIcon style={{fontSize:'32px'}}/>
    </IconButton>
  );
}

export default ScrollButton;