import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import Button from '@material-ui/core/Button'
import auth from './../auth/auth-helper'
import {Link, withRouter} from 'react-router-dom'
import {listadmin} from './../user/api-user.js'

const isActive = (history, path) => {
  if (history.location.pathname == path)
  return {color: '#ff4081'}
  else
  return {color: '#ffffff'}
}

const Menu = withRouter(({history}) => (
  <AppBar position="static">
  <Toolbar>
  <Typography variant="h6" color="inherit">
  AutoMobile Storehouse
  </Typography>
  <Link to="/">
  <IconButton aria-label="Home" style={isActive(history, "/")}>
  <HomeIcon/>
  </IconButton>
  </Link>
  <ul className="right">
  {
    //checks if user is not signed into account
    !auth.isAuthenticated() && (<span>
      <Link to="/signup">
      <Button style={isActive(history, "/signup")}>Sign up
      </Button>
      </Link>
      <Link to="/signin">
      <Button style={isActive(history, "/signin")}>Sign In
      </Button>
      </Link>
      </span>)
    }
    {
    //checks if user is signed in and is admin
    (auth.isAuthenticated() && auth.isAuthenticated().user.admin) &&(<span>
      <Link to={"/useradmin/" + auth.isAuthenticated().user._id}>
      <Button style={isActive(history, "/useradmin/" + auth.isAuthenticated().user._id)}>All Users</Button>
      </Link>
      </span>)
    }
    {
      //checks if user is signed in and is not admin
      (auth.isAuthenticated() && !auth.isAuthenticated().user.admin) && (<span>
        <Link to={"/user/" + auth.isAuthenticated().user._id}>
        <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
        </Link>
        </span>)
      }
      {
      auth.isAuthenticated() && (<span>
        <Link to={"/basket/"}>
        <Button style={isActive(history, "/basket/" + auth.isAuthenticated().user._id)}>Basket</Button>
        </Link>
        <Button color="inherit" onClick={() => {
          auth.clearJWT(() => history.push('/'))
        }}>Sign out</Button>
        </span>)
    }
    </ul>
      </Toolbar>
      </AppBar>
    ))

      export default Menu
