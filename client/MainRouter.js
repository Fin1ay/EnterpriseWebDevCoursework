import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import UserAdmin from './user/UsersAdmin'
import Product from './product/Product'
import Menu from './core/Menu'
import GridSelection from './core/GridSelection'
import ListSelection from './core/ListSelection'

const MainRouter = () => {
    return (<div>
      <Menu/>
	  <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/gridselection" component={GridSelection}/>
        <Route path="/listselection" component={ListSelection}/>
        <Route path="/product" component={Product}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route path="/useradmin/:userId" component={UserAdmin}/>
     </Switch>
    </div>)
}

export default MainRouter
