import { useState } from "react";

export const useDropDown = () => {
	const [abierto, setAbierto] = useState(false);
	const [posicion, setPosicion] = useState({ x: 0, y: 0 });

	const abrir = (x, y) => {
		setPosicion({ x, y });
		setAbierto(true);
	};

	const cerrar = () => {
		setAbierto(false);
	};

	return {
		abierto,
		posicion,
		abrir,
		cerrar,
	};
};