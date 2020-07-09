import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Home from './core/Home';
import Signup from './user/Signup';
import Profile from './user/Profile';
import Menu from './core/Menu'
import FindPeople from "./user/FindPeople"
import Users from './user/Users'
import Signin from "./user/Signin"
import EditProfile from "./user/EditProfile"
import PrivateRoute from "./auth/PrivateRoute"
import NewPost from "./post/NewPost"
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';
const MainRouter=()=> (
    <div>
        <Menu/>
        <Switch>
        
            <Route exact path='/' component={Home}/>
            <PrivateRoute exact path='/post/create' component={NewPost}/>
            <PrivateRoute exact path='/post/edit/:postId' component={EditPost}/>
        
            <Route exact path='/post/:postId' component={SinglePost}/>
            
            <Route exact path='/signup' component={Signup}/>
            <Route exact path='/signin' component={Signin}/>
            <Route exact path='/users' component={Users}/>          
            <PrivateRoute exact path='/findpeople' component={FindPeople}/>
         
           <PrivateRoute exact path='/user/:userId' component={Profile}/>
             <PrivateRoute exact path='/user/edit/:userId' component={EditProfile}/>
{/*exact is used to match the full URL*/}

        </Switch>
    </div>
)

export default MainRouter;


// A switch has a lot of routes
