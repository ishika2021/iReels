import React, { useContext, useEffect, useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from '@material-ui/core/Badge';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from '@material-ui/core/Avatar';
import logo from './logomain.png';
import MoreIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";
import Box from '@material-ui/core/Box';
import Upload from "./Upload";
import { AuthContext } from "../Context/AuthProvider";
import ForumIcon from '@material-ui/icons/Forum';
import { database, storage } from '../Firebase';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  input: {
    display: "none"
  },
  nameFont:{
    fontFamily: 'Pacifico, cursive',
    fontSize:'1.8rem',
    color:"#BDBDBD",
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#121212",
      color:'#e8e8e8',
    }
  }
  

}));

export default function Header() {
  const classes = useStyles();
  const {currentUser}=useContext(AuthContext);
  const [userData,setUserData]=useState(null);
  const history=useHistory();
  const {logout}=useContext(AuthContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const goToHome=()=>{
    history.replace('/');
  }
  const goToChat=()=>{
    history.replace('/chat');
  }
  const handleLogout=async()=>{
    await logout();
    history.replace('/main');
  }
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={()=>{history.push('/profile')}}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      className={classes.menu}
      onClose={handleMobileMenuClose}
      
    >
      <MenuItem >
        <IconButton>
          <HomeIcon style={{ color: '#BDBDBD' }} onClick={goToHome} />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem >
        <IconButton>
          <ForumIcon style={{ color: '#BDBDBD' }} onClick={goToChat} />
        </IconButton>
        <p>Chat</p>
      </MenuItem>
      <MenuItem >
        <Upload userData={userData} />
        <p>Upload</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen} style={{background:'#121212'}}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle style={{ color: '#BDBDBD' }} />
        </IconButton>
        <p style={{color:'white'}}>Profile</p>
      </MenuItem>
    </Menu>
  );
  
  useEffect(()=>{
    const unsubscribe=database.users.doc(currentUser.uid).onSnapshot((doc)=>{
        setUserData(doc.data());
    })
  },[currentUser])
  return (
    <div className={classes.grow}>
      <AppBar position="fixed"  style={{background:'#1d1c21'}}>
        <Toolbar>
        <Box display="flex" alignItems="center">
          <Avatar alt="Remy Sharp" src={logo} style={{marginRight:'0.3em'}}/>
            <Typography className={classes.nameFont} noWrap>
              iReels
            </Typography>
        </Box>
        

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <IconButton aria-label="show 4 new mails" color="inherit" onClick={goToHome} >
              <Badge color="secondary" >
               <HomeIcon size="large" />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit" onClick={goToChat} >
              <Badge color="secondary" >
               <ForumIcon size="large" />
              </Badge>
            </IconButton>
            <Upload userData={userData}/>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar src={userData?.profileURL} style={{height:'1.7rem',width:'1.7rem'}}  />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
