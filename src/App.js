import './App.css';
import { FiSearch } from "react-icons/fi";
import api from './services/api';
import { useState } from 'react';

function App() {

  const [ input, setInput ] = useState('');
  const [ infos, setInfos ] = useState({});

  async function buscaCEP(){
    
    if(input === ''){
      alert('Insira um CEP para continuar...');
      return;
    }

    try{

      const res = await api.get(`${input}/json`);
      setInfos(res.data);
      setInput('');
      console.log(res.data);

    }catch{

      alert('CEP inválido, tente novamente...')
      setInput('');

    }

  }

  return (
    <div className="container">
      
      <h1 className='title'>Buscar CEP</h1>

      <div className='inputs'>

        <input type='text'
        placeholder='Digite seu CEP...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={buscaCEP}>
          <FiSearch size={25} color='white'/>
        </button>

      </div>


      {Object.keys(infos) != '' && (
        
        <div className='main'>

          <h2>CEP: {infos.cep}</h2>

          <span>{infos.logradouro}</span>
          <span>Bairro: {infos.bairro}</span>
          <span>{infos.localidade} - {infos.uf}</span>

        </div>

      )};

    </div>
  );
}

export default App;
