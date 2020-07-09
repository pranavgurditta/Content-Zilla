import React,{Component} from 'react'
import {findPeople, follow} from "./apiUser"
import {Link} from 'react-router-dom'
import {isAuthenticated} from "../auth"

import DefaultProfile from "../images/avatar.jpg"
class FindPeople extends Component {
    constructor(){
        super()
        this.state={
            users:[],
            open:false,
            error:""
        }
    }

    componentDidMount(){
        const userId=isAuthenticated().user._id
        const token=isAuthenticated().token;
        findPeople(userId,token).then(data =>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({users:data})
            }
        })
        .catch(err=>console.log(err))
    }

    clickFollow=(user,index)=>{
        
        const userId=isAuthenticated().user._id
        const token=isAuthenticated().token;
        follow(userId,token,user._id)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }
            else{
                let toFollow=this.state.users
                toFollow.splice(index,1)
                this.setState({
                    users:toFollow,
                    open:true,
                    followMessage:`following ${user.name}` 
                })
            }
        })

    }
    renderUsers=(users)=>(
        <div className="row">
                    {users.map ((user,index)=>(
        <div className="card col-md-4" style={{width:"18rem"}} key={index}>
        <img className="card-img-top" 
        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`} 
        onError={i=> (i.target.src=`${DefaultProfile}`)}
        alt={user.name}
        style={{width:'100%',height:'15vw',objectFit:'cover'}}/>
        <div className="card-body">
          <h5 className="card-title">{user.name}</h5>
          <p className="card-text"> {user.email}</p>
          <Link to={`/user/${user._id}`} class="btn btn-raised btn-primary">View Profile</Link>
        
        <button 
         onClick={()=>this.clickFollow(user,index)} className="btn btn-raised btn-info float-right">
            Follow
        </button>
        
        </div>
      </div>
                    ))}
                    </div>

                        
    )


    render()
    {
        const {users,open,followMessage}=this.state;
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">
                    Find poets
                </h2>
                
                    {open && 
                    (<div className="alert alert-success">
                        {followMessage}
                    </div>)}
                {this.renderUsers(users)}
            </div>
        )
    }

}
export default FindPeople;


