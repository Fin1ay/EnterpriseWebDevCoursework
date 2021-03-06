import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import PrivateRoute from './auth/PrivateRoute'
import UserAdmin from './user/UsersAdmin'
import ProductList from './product/ProductList'
import ProductGrid from './product/ProductGrid'
import Menu from './core/Menu'
import Basket from './core/Basket'

const MainRouter = () => {
    return (<div>
      <Menu/>
	  <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/basket" component={Basket}/>
        <Route path="/productgrid" component={ProductGrid}/>
        <Route path="/productlist" component={ProductList}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>
        <Route path="/useradmin/:userId" component={UserAdmin}/>
     </Switch>
    </div>)
}

export default MainRouter
