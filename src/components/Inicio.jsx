import React, {useState, useEffect} from 'react'
import {store} from '../firebaseconfig'

const Inicio = () => {
    const[modoEdicion, setModoEdicion] = useState(null)
    const[idUsuario, setIdUsuario] = useState('')
    const[nombre, setNombre] = useState('')
    const[telefono, setTelefono] = useState('')
    const[error, setError] = useState(null)
    const[usuarios, setUsuarios] = useState([])

    useEffect(() => {
        const getUsuarios = async () => {
            const {docs} = await store.collection('agenda').get()
            const nuevoArray = docs.map((item) => ({id:item.id, ...item.data()}))
            setUsuarios(nuevoArray)
        }
        getUsuarios()
    }, [])

    const setUsuario = async (e) => {
        e.preventDefault()
        setError(null)
        if(!nombre.trim()){
            setError('El campo nombre esta vacio')
            return
        }
        if(!telefono.trim()){
            setError('El campo telefono esta vacio')
            return
        }
        const usuario = {
            nombre: nombre,
            telefono: telefono
        }
        try {
           const data = await store.collection('agenda').add(usuario)
           const {docs} = await store.collection('agenda').get()
           const nuevoArray = docs.map((item) => ({id:item.id, ...item.data()}))
           setUsuarios(nuevoArray)
            
        } catch (error) {
            console.log(error)
        }
        setNombre('')
        setTelefono('')
    }

    const deleteUsuario = async (id) => {
        try {
            await store.collection('agenda').doc(id).delete()
            const {docs} = await store.collection('agenda').get()
            const nuevoArray = docs.map((item) => ({id:item.id, ...item.data()}))
            setUsuarios(nuevoArray)
        } catch (error) {
            console.log(error)
        }
    }

    const updateUsuario = async (id) => {
        try {
            const data = await store.collection('agenda').doc(id).get()
            const {nombre,telefono} = data.data()            
            setNombre(nombre)
            setTelefono(telefono)
            setIdUsuario(id)
            setModoEdicion(true)
        } catch (error) {
            console.log(error)   
        }
        
    }
    const setUpdate = async (e,id) => {
        e.preventDefault()
        setError(null)
        if(!nombre.trim()){
            setError('El campo nombre esta vacio')
            return
        }
        if(!telefono.trim()){
            setError('El campo telefono esta vacio')
            return
        }

        const userUpdate = {
            nombre: nombre,
            telefono: telefono
        }

        try {
            await store.collection('agenda').doc(idUsuario).set(userUpdate)
            const {docs} = await store.collection('agenda').get()
            const nuevoArray = docs.map((item) => ({id:item.id, ...item.data()}))
            setUsuarios(nuevoArray)

            
        } catch (error) {
            
        }
        setNombre('')
        setTelefono('')
        setIdUsuario('')
        setModoEdicion(false)
    }
 
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h2>Formulario de usuarios</h2>
                    <form onSubmit={modoEdicion ? setUpdate : setUsuario} className="form-group">
                        <input
                            value={nombre}
                            onChange={(e) => {setNombre(e.target.value)}}
                            className="form-control"
                            placeholder="Introduce el nombre" 
                            type="text"
                        />
                        <input
                            value={telefono}
                            onChange={(e) => {setTelefono(e.target.value)}}
                            className="form-control mt-2"
                            placeholder="Introduce el número" 
                            type="text"
                        />
                        {
                            modoEdicion ?
                            (
                                <input 
                                    className="btn btn-dark btn-block mt-2"
                                    value="Editar"
                                    type="submit"
                                />
                            )
                            :
                            (
                                <input 
                                    className="btn btn-dark btn-block mt-2"
                                    value="Registrar"
                                    type="submit"
                                />
                            )
                        }
                        
                    </form>
                    {
                        error ? 
                        (
                            <div className="alert alert-danger">
                                <p>{error}</p>
                            </div>
                        )
                        : 
                        (
                            <span></span>
                        )
                    }
                </div>
                <div className="col">
                    <h2>Agenda</h2>
                    <ul className="list-group">
                    {
                        usuarios.length !== 0 ?
                        (
                            usuarios.map( item => (
                                <li className="list-group-item" key={item.id}>{item.nombre} -- {item.telefono}                                    
                                    <button onClick={(id) => {deleteUsuario(item.id)}} className="btn btn-danger float-right">Eliminar</button>
                                    <button onClick={(e,id) => {updateUsuario(item.id)}} className="btn btn-info float-right mr-1">Editar</button>
                                </li>
                            ))
                        )
                        :
                        (
                            <span className="alert alert-info">
                                No hay usuarios en tu agenda
                            </span>
                        )
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Inicio
