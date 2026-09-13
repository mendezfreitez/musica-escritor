import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const DropDown = ({ x, y, abierto, onCerrar, opciones }) => {
	const ref = useRef(null);

	useEffect(() => {
		if (!abierto) return;

		const handleClick = (e) => {
			if (ref.current && !ref.current.contains(e.target)) onCerrar();
		};
		const handleKey = (e) => {
			if (e.key === "Escape") onCerrar();
		};

		document.addEventListener("mousedown", handleClick);
		document.addEventListener("keydown", handleKey);
		return () => {
			document.removeEventListener("mousedown", handleClick);
			document.removeEventListener("keydown", handleKey);
		};
	}, [abierto, onCerrar]);

	if (!abierto) return null;

	return createPortal(
		<div
			ref={ref}
			className="fixed z-[999] flex flex-row items-center gap-1 rounded-md border border-gray-300 bg-white p-0.5 shadow-lg"
			style={{ left: x, top: y }}
			onPointerDown={(e) => e.stopPropagation()}
			onPointerUp={(e) => e.stopPropagation()}
		>
			{opciones.map((op) => (
				<button
					key={op.id}
					type="button"
					title={op.label}
					aria-label={op.label}
					className="cursor-pointer rounded p-1.5 text-gray-700 hover:bg-gray-600 hover:text-gray-100"
					onClick={op.accion}
				>
					{op.icono}
				</button>
			))}
		</div>,
		document.body
	);
};