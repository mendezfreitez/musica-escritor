import { useState } from "react";

export const useApp = () => {
	const [filas, setFilas] = useState([]);
	const [idFilaEditada, setIdFilaEditada] = useState(undefined);

	const editarUnaFila = (obj) => {
		setIdFilaEditada(obj.id);
		const nFilas = filas.map((el) => {
			el.edit = el.id === obj.id ? 1 : 0;
			return el
		});
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