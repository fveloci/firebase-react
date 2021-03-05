import React, {useState} from 'react'
import {auth} from '../firebaseconfig'
import {useHistory} from 'react-router-dom'

const Login = () => {
    const historial = useHistory()
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[msgerror, setMsgError] = useState(null)
    const RegistrarUsuario = (e) => {
        e.preventDefault()
        
            auth.createUserWithEmailAndPassword(email,password)
                .then( r => {
                    setEmail('')
                    setPassword('')
                    historial.push('/')
                })
                .catch( e => {
                    // auth/invalid-email
                    // auth/weak-password
                    if(e.code === 'auth/invalid-email'){
                        setMsgError(e.message)
                    }
                    if(e.code === 'auth/weak-password'){
                        setMsgError(e.message)            
                    }
                }

                )            
            
        
            
    }

    const LoginUsuario = () => {
        setMsgError(null)
        auth.signInWithEmailAndPassword(email,password)
            .then((r) => {
                historial.push('/')
            })
            .catch( (error) => {
                // auth/wrong-password
                console.log(error.code)
                if(error.code === 'auth/wrong-password'){
                    setMsgError('Contraseña incorrecta')
                }
            })
    }

    return (
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={RegistrarUsuario} className="form-group">
                    <input 
                        onChange={(e) => {setEmail(e.target.value)}}
                        className="form-control"                       
                        placeholder="Introduce el email" 
                        type="email"/>
                    <input     
                        onChange={(e) => {setPassword(e.target.value)}} 
                        className="form-control mt-4"                  
                        placeholder="Introduce la contraseña" 
                        type="password"/>
                    <input
                        className="btn btn-dark btn-block mt-4"
                        value="Registrar usuario" 
                        type="submit"/>                        
                </form>
                <button onClick={LoginUsuario} className="btn btn-success btn-block">
                    Iniciar sesión
                </button>
                {
                    msgerror != null ? 
                    (
                        <div className="alert alert-danger">
                            {msgerror}
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
            <div className="col"></div>            
        </div>
    )
}

export default Login
