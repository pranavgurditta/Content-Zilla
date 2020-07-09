import React from 'react'
import {Link,withRouter} from 'react-router-dom' //when link is used it renders pages without reloading whereas in a tag reloading is done
import {isAuthenticated,signout} from "../auth"
const isActive=(history,path) =>{
    if(history.location.pathname === path)
        return {color:"#ff9900"}
    else
        return {color:"#ffffff"}
}


const Menu=({history})=> (

<ul className="nav nav-tabs bg-primary">

  <li className="nav-item">
    <Link className="nav-link" style={isActive(history,"/")} to="/" >Home</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" style={isActive(history,"/users")}to="/users">Users</Link>
  </li>
  {!isAuthenticated() && (<> 
  <li className="nav-item">
    <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">Sign in</Link>
  </li>
  
  <li className="nav-item">
    <Link className="nav-link" style={isActive(history,"/signup")}to="/signup">Sign up</Link>
  </li>
</>)}
  {isAuthenticated() && (<>
    
  <li className="nav-item">
      
          <Link className="nav-link"  
          to ={`/user/${isAuthenticated().user._id}`} 
          style={(isActive(history,`/user/${isAuthenticated().user._id}`))}> 
          {`${isAuthenticated().user.name}'s profile`}
          </Link>
       

      </li>
      <li className="nav-item">
      
      <Link className="nav-link"  
      to ={`/findpeople`} 
      style={(isActive(history,`/findpeople`))}> 
     Find Poets
      </Link> 
      </li>

      <li className="nav-item">
      
      <Link className="nav-link"  
      to ={`/post/create`} 
      style={(isActive(history,`/post/create`))}> 
    Create Poem/Write up
      </Link> 
      </li>

      <li className="nav-item">
    <span 
      className="nav-link"
      style={isActive(history,"/signout"),
           {curser:"pointer",color:"#fff"}} 
           onClick={()=>signout(()=>history.push('/'))}
           >
             Sign out
             </span>
             </li>
            
       

</>)}

</ul>
)
export default withRouter(Menu);

//withRouter is a higher level component  as it takes another component in it 
//withRouter is used to tell the router the main link that is active that time using history of peop that is sent
