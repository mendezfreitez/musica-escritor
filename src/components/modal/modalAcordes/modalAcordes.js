import { useState } from "react";
import { acordesGuitarra } from "../../../acordesGuitarra";

const GRUPOS = {
	A: ["A", "A#"],
	B: ["B"],
	C: ["C", "C#"],
	D: ["D", "D#"],
	E: ["E"],
	F: ["F", "F#"],
	G: ["G", "G#"],
};

const raices = Object.keys(GRUPOS);

export const useModalAcordes = () => {
	const [abierto, setAbierto] = useState(false);
	const [raiz, setRaiz] = useState("");
	const [variante, setVariante] = useState("");

	const variantes = raiz
		? Object.keys(acordesGuitarra).filter((n) =>
				GRUPOS[raiz].some((k) => n.startsWith(k))
		  )
		: [];

	const abrir = () => {
		limpiar();
		setAbierto(true);
	};

	const cerrar = () => {
		setAbierto(false);
	};

	const limpiar = () => {
		setRaiz("");
		setVariante("");
	};

	const seleccionarRaiz = (r) => {
		setRaiz(r);
		setVariante("");
	};

	const seleccionarVariante = (v) => {
		setVariante(v);
	};

	const aplicar = () => {
		cerrar();
		limpiar();
	};

	return {
		abierto,
		abrir,
		cerrar,
		limpiar,
		raices,
		raiz,
		seleccionarRaiz,
		variantes,
		variante,
		seleccionarVariante,
		aplicar,
	};
};