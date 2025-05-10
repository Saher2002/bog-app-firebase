import { login,logout,loggedInUserDisplayName } from "../services/authService";

export function SignIn(){
    return <button onClick={login}>Sign in</button>
}

export function SignOut({user}){
    return (
        <div className="userLogin">
         <img src={user.photoURL} alt="User" style={{ width: "40px",height:"40px", borderRadius: "50%"}} />
         <span>{loggedInUserDisplayName()}</span> 
            <button onClick={logout}>Sign Out</button>
        </div>
    );
}