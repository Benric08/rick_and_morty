import './App.css';
import About from './components/About';
import Cards from './components/Cards.jsx';
import Detail from './components/Detail';
import Nav from './components/Nav';
import Error from './components/Error';
import axios from 'axios'
import { useState, useEffect } from 'react';
import {Routes,Route,useLocation,useNavigate} from 'react-router-dom';
import Form from './components/Form';
import Favorites from './components/Favorites';

function App() {
   const [access,setAccess]=useState(false);
   const EMAIL="ri@pe.pe";
   const PASSWORD="actmc1";
   const navigate = useNavigate();
   const {pathname} = useLocation();
   const [characters,setCharacters]=useState([]);
   const onSearch=(id)=>{
      const duplicateCharacters=characters.filter((char)=>char.id=== parseInt(id));
      if(duplicateCharacters.length===0)
      {axios(`https://rickandmortyapi.com/api/character/${id}`)
      .then(({data})=>data.name?setCharacters([...characters,data]):window.alert("¡No hay personajes con este ID!"))}
      else{
         window.alert("el personaje ya ha sido agregado anteriormente");
      }
      //setCharacters([...characters,]);
      
   }
   const onClose=(id)=>{
      const idParsed=parseInt(id);
      setCharacters(characters.filter((char)=>char.id!==idParsed));
   }
   const login = ({email,password})=>{
      if (email===EMAIL && password===PASSWORD) {
         setAccess(true);
         navigate('/home');
      } else{
         window.alert("correo o contraseña incorrectos");
      }
   }
   const logout = ()=>{
      setAccess(false);
      navigate("/");
   }
   useEffect(() => {
      !access && navigate('/');
   }, [access]);

   return (
      <div className='App'>
         
         {pathname!=="/" && <Nav onSearch={onSearch} logout={logout}/>}
         <Routes>
            <Route path='/' element={<Form login={login}/>}/>
            <Route path='*' element={<Error/>}/>
            <Route path='/home' element={<Cards onClose={onClose} characters={characters} />}/>            
            <Route path='/about' element={<About/>}/>
            <Route path='/detail/:id' element={<Detail/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
         </Routes>
         {/* <SearchBar onSearch={(characterID) => window.alert(characterID)} /> */}
         {/*  <Cards characters={characters} onClose={onClose} /> */}
         {/* <Card
            id={Rick.id}
            name={Rick.name}
            status={Rick.status}
            species={Rick.species}
            gender={Rick.gender}
            origin={Rick.origin.name}
            image={Rick.image}
            onClose={() => window.alert('Emulamos que se cierra la card')}
         /> */}
      </div>
   );
}

export default App;
