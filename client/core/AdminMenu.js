// import React from 'react'
// import AppBar from '@material-ui/core/AppBar'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import IconButton from '@material-ui/core/IconButton'
// import HomeIcon from '@material-ui/icons/Home'
// import Button from '@material-ui/core/Button'
// import auth from './../auth/auth-helper'
// import {Link, withRouter} from 'react-router-dom'
// import {listadmin} from './../user/api-user.js'
// import Paper from '@material-ui/core/Paper'
//
//
//
// export default function Menu({match}){
//   console.log("hello")
//
// const isActive = (history, path) => {
//   if (history.location.pathname == path)
//     return {color: '#ff4081'}
//   else
//     return {color: '#ffffff'}
// }
// const jwt = auth.isAuthenticated()
//
// const Menu = withRouter(({history}) => (
//   <AppBar position="static">
//     <Toolbar>
//       <Typography variant="h6" color="inherit">
//       Enterprise Web Development
//       </Typography>
//       <Link to="/">
//         <IconButton aria-label="Home" style={isActive(history, "/")}>
//           <HomeIcon/>
//         </IconButton>
//       </Link>
//       {
//         !auth.isAuthenticated() && (<span>
//           <Link to="/signup">
//             <Button style={isActive(history, "/signup")}>Sign up
//             </Button>
//           </Link>
//           <Link to="/signin">
//             <Button style={isActive(history, "/signin")}>Sign In
//             </Button>
//           </Link>
//         </span>)
//       }
//       {
//         auth.isAuthenticated() && (<span>
//           <Link to={"/user/" + auth.isAuthenticated().user._id}>
//             <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
//           </Link>
//           <Button color="inherit" onClick={() => {
//               auth.clearJWT(() => history.push('/'))
//             }}>Sign out</Button>
//         </span>),
//         auth.isAuthenticated() && (<span>
//           <Link to={"/useradmin/" + auth.isAuthenticated().user._id}>
//             <Button style={isActive(history, "/useradmin/" + auth.isAuthenticated().user._id)}>Admin Users?</Button>
//           </Link>
//           <Button color="inherit" onClick={() => {
//               auth.clearJWT(() => history.push('/'))
//             }}>Sign out</Button>
//         </span>)
//       }
//       {
//         listadmin({userId: match.params.userId}, {t: jwt.token}, signal).then((data) => {
//           if (data && data.error) {
//           console.log(data.error)
//         } else {
//           (<span>
//             <Link to="/users">
//               <Button style={isActive(history, "/users")}>Users
//               </Button>
//             </Link>
//           </span>)
//         }
//       })
//       }
//
//   }
//   </Toolbar>
//   </AppBar>
// ))
// return Menu
// }
