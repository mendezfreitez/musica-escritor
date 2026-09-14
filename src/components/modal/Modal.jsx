import { useEffect } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ abierto, onCerrar, titulo, children, ancho = "w-[320px]" }) => {
	useEffect(() => {
		if (!abierto) return;

		const handleKey = (e) => {
			if (e.key === "Escape") onCerrar();
		};

		document.addEventListener("keydown", handleKey);
		return () => document.removeEventListener("keydown", handleKey);
	}, [abierto, onCerrar]);

	if (!abierto) return null;

	return createPortal(
		<div
			className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
			onMouseDown={onCerrar}
			onPointerDown={(e) => e.stopPropagation()}
			onPointerMove={(e) => e.stopPropagation()}
			onPointerUp={(e) => e.stopPropagation()}
			onPointerCancel={(e) => e.stopPropagation()}
		>
			<div
				className={`${ancho} rounded-lg bg-white p-4 shadow-xl`}
				onMouseDown={(e) => e.stopPropagation()}
			>
				<div className="mb-3 flex items-center justify-between">
					<h3 className="text-lg text-gray-800">{titulo}</h3>
					<button
						type="button"
						aria-label="Cerrar"
						className="cursor-pointer text-gray-400 hover:text-gray-600 text-xl leading-none"
						onClick={onCerrar}
					>
						&times;
					</button>
				</div>
				{children}
			</div>
		</div>,
		document.body
	);
};