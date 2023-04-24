import React from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { useState,useEffect } from 'react'
export default function Detail() {
    const {id} = useParams();
    const [character,setCharacter] = useState({});
    useEffect(()=>{
        axios(`https://rickandmortyapi.com/api/character/${id}`)
        .then(({data})=>{
            if (data.name) {setCharacter(data);}
            else {window.alert('No hay personajes con ese ID');} 
        });
        return setCharacter({});
    },[id]); 
    
  
        return (
            <div>
                
                    <h1>{character?.name}</h1>
                    <h3>STATUS: {character?.status}</h3>
                    <h3>FENDER: {character?.gender}</h3>
                    <h3>SPECIE: {character?.specie}</h3>
                    <h3>ORIGIN: {character?.origin?.name}</h3>
                    <img src={character?.image} alt={character?.name} />
                         
            </div>
        )
    
}
