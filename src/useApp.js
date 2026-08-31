import { useState } from "react";

export const useApp = () => {
	const [filas, setFilas] = useState([]);

	const editarUnaFila = (obj) => {
		console.log(obj.id);

		filas[obj.id].edit = 1;
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
		editarUnaFila
	}
}