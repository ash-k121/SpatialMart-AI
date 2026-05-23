import { useState } from "react"

export default function LoginPage(){
    const [role,setRole]= useState();
    const [name,setName]= useState();
    const [email,setEmail]= useState();
    const [password,setPassword]= useState();
    const handleUserData=async()=>
    {
        const userData={name,email,password,role};
        try{
            const response = await fetch("http://127.0.0.1:8000/login",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                    },
                body:JSON.stringify(userData)
            })
                const data = await response.json();

                console.log(data);
        }
        catch (error) {
        console.error(error);
    }}
    return (
        <div>
            <input placeholder="name" onChange={(e)=>setName(e.target.value)}/>
            <input placeholder="email"  onChange={(e)=>setEmail(e.target.value)}/>
            <input placeholder="password"  onChange={(e)=>setPassword(e.target.value)}/>
            <input placeholder="role"  onChange={(e)=>setRole(e.target.value)}/>
            <button onClick={handleUserData}> Submit</button>
        </div>
    )
}