import { useState } from "react";

export const useApp = () => {
	const [filas, setFilas] = useState([]);
	const [idFilaEditada, setIdFilaEditada] = useState(undefined);

	const editarUnaFila = (obj) => {
debugger
		setIdFilaEditada(obj.id);

		// filas[obj.id].edit = 1;
		const nFilas = filas.map((el) => {
			el.edit = el.id === obj.id ? 1 : 0;
			return el
		})
		// console.log(nFilas);
		// return;
		setFilas(nFilas);
	}

	return {
		filas,
		setFilas,
		editarUnaFila,
		idFilaEditada,
		setIdFilaEditada,
	}
}