import React,{Component} from 'react'
import { signup } from "../auth/"
import {Link } from 'react-router-dom'
class Signup extends Component{

    constructor(){
        super();
        this.state={
            name:"",
            email:"",
            password:"",
            error:"",
            open:false
        }
    }
//event we get when onChange is called //handle change is a hugher order function which returns another function
    handleChange=(name)=> (event) => {
        this.setState({error:""})
        this.setState(
        {[name]:event.target.value} //name has valuer of name,email and passeword
        )

    }
    signupForm=(name,email,password)=> (    <form> 
            <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input onChange={this.handleChange("name")}  value={name} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="text-muted">Email</label>
                    <input onChange={this.handleChange("email")} value={email}  type="email" className="form-control"/>
                </div>
                <div className="form-group">
                    <label className="text-muted">password</label>
                    <input onChange={this.handleChange("password")} value={password} type="password" className="form-control"/>
                </div>
                
                <button onClick={this.clickSubmit}className="btn btn-raised btn-primary">SUBMIT</button>
            </form>
    )            

     clickSubmit=event =>{
         event.preventDefault()// prevents page reloaad
         const {name,email,password}=this.state;
         const user={
             name:name,
             email:email,
             password:password
         };

            signup(user)
            .then(data=>{
                console.log(data);
                if(data.error)
                {
                    this.setState({error: "USEr cannot SIGNUP"});
                  
                }
                else{
                    this.setState({
                        name:"",
                        error:"",
                        email:"",
                        password:"",
                        open:true
                    })
                }
            })
        }
        
  
      

    //first set of { for JSX and { for style in error
    render(){
        const {name,password,email}=this.state;
        return(

            <div className="container">
                <h2 className="mt-5 mb-5"> Signup</h2>
             
                <div className="alert alert-primary"
                 style={{display: this.state.error? "" :"none"}}>  
                         {this.state.error}
                 </div>
                 <div className="alert alert-info"
                 style={{display: this.state.open? "" :"none"}}>  
                        New Account is created. Please 
                        <Link to ='/signin'> Sign in </Link>
                 </div>
            {this.signupForm(name,email,password)}
            </div>
        )
    }
}

export default Signup;

//install react-router-dom to create pages
