import { GrupoFilas } from './components/grupoFilas/grupoFilas';
import { InputFila } from './components/inputFila/InputFila';
import './App.css';
import { useApp } from './useApp';
import { useState } from 'react';

function App() {
  const { filas, setFilas, editarUnaFila } = useApp();
  const [texto, setTexto] = useState('');

  return (
    <div className="flex flex-col items-center">
      <GrupoFilas
      filas={filas}
      editar={editarUnaFila}
      guardar={(val) => {
        console.log(filas);
      }}
      />
      <InputFila
        texto={texto}
        clases="rounded-md ps-1 text-[#202020] bg-gray-500 w-[90%]"
        ejecutar={(val) => { setFilas([...filas, { id: filas.length , texto: val, edit: 0 }]); }}
      />
    </div>
  )
}

export default App
