import { useState } from "react"
import LandingPage from "./landingPage";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
    const [role,setRole]= useState("");
    const [name,setName]= useState("");
    const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const navigate=useNavigate();

    const handleSignUp=async()=>
    {
        const userData={name,email,password,role};
        try{
            const response = await fetch("http://127.0.0.1:8000/signup",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                    },
                body:JSON.stringify(userData)
            })
                const data = await response.json();

                if(data.success)
                {
                    navigate("/landing");
                }
                else
                {
                    alert(data.msg)
                }
        }
        catch (error) {
        console.error(error);
    }}

    const handleLogIn=async()=>
    {
        const userData={email,password};
        try{
            const response = await fetch("http://127.0.0.1:8000/login",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                    },
                body:JSON.stringify(userData)
            })
                const data = await response.json();

                if(data.success)
                {
                    navigate("/landing");
                }
                else
                {
                    alert(data.msg)
                }
        }
        catch (error) {
        console.error(error);
    }}
    return (
        <div>
            <div>
                <h1>Sign Up</h1>
                <input placeholder="name" onChange={(e)=>setName(e.target.value)}/>
                <input placeholder="email"  onChange={(e)=>setEmail(e.target.value)}/>
                <input placeholder="password"  onChange={(e)=>setPassword(e.target.value)}/>
                <input placeholder="role"  onChange={(e)=>setRole(e.target.value)}/>
                <button onClick={handleSignUp}> Submit</button>
            </div>
            <div>
                <h1>Login</h1>
                <input placeholder="email"  onChange={(e)=>setEmail(e.target.value)}/>
                <input placeholder="password"  onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleLogIn}> Submit</button>
            </div>
        </div>
        
    )
}