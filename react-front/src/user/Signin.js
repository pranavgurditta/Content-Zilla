import React,{Component} from 'react'
import {Redirect}  from 'react-router-dom'
import {signin,authenticate} from "../auth"
class Signin extends Component{

    constructor(){
        super();
        this.state={
     
            email:"",
            password:"",
            error:"",
            redirectToReferer:false,
            loading:false

        }
    }
//event we get when onChange is called //handle change is a hugher order function which returns another function
    handleChange=(name)=> (event) => {
        this.setState({error:""})
        this.setState(
        {[name]:event.target.value} //name has valuer of name,email and passeword
        )


    }
    
 



    signinForm=(email,password)=> (    <form> 
            
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
         const {email,password}=this.state;
         const user={
  
             email:email,
             password:password
         };
         //console.log(user);
         this.setState({
             loading:true
         })
            signin(user)
            .then(data=>{
                if(data.error)
                {
                    this.setState({error: data.error,loading:false});
                  
                }
                else{
                    //authenticate
                   authenticate(data, ()=>{
                       this.setState({redirectToReferer:true,loading:false})
                   });
                }
            }).catch(err=>console.log(err))
        }
        
     

    



    //first set of { for JSX and { for style in error
    render(){
        const {password,email,redirectToReferer,loading}=this.state;

        if(redirectToReferer){
            return <Redirect to="/"/> //component provided by react router dom package
        }
        return(

            <div className="container">
                <h2 className="mt-5 mb-5"> Signin</h2>
             
                <div className="alert alert-primary"
                 style={{display: this.state.error? "" :"none"}}>  
                         {this.state.error}
                 </div>
                 

            {loading ? (<div className="jumbotron text-centre"> Loading</div>):("")}
            {this.signinForm(email,password)}
            </div>
        )
    }
}

export default Signin;

//install react-router-dom to create pages
//json web token stored in application's local storage in browser