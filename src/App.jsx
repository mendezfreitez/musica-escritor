import { GrupoFilas } from './components/grupoFilas/grupoFilas';
import { InputFila } from './components/inputFila/InputFila';
import './App.css';
import { useApp } from './useApp';
import { useState } from 'react';

function App() {
  const { filas, setFilas, editarUnaFila, idFilaEditada, setIdFilaEditada } = useApp();
  const [texto, setTexto] = useState('');

  return (
    <div className="flex flex-col items-center">
      <GrupoFilas
        filas={filas}
        editar={editarUnaFila}
        guardar={(val) => {
          const otraFilas = filas.map((el) => {
            if (el.id === idFilaEditada) { el.texto = val; el.edit = 0; }
            return el;
          });
          setIdFilaEditada(undefined);
          setFilas(otraFilas)
        }}
      />
      {idFilaEditada === undefined &&
        <InputFila
          texto={texto}
          clases="rounded-md ps-1 text-[#464646] bg-gray-200 w-[90%] border-0 focus-visible:outline-0 focus-visible:inset-shadow-sm"
          ejecutar={(val) => { setFilas([...filas, { id: filas.length, texto: val, edit: 0 }]); }}
        />
      }
    </div>
  )
}

export default App
