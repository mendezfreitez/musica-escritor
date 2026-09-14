import { useEffect, useRef, useState } from "react";
import { Modal } from "../Modal";
import { useModalAcordes } from "./modalAcordes";
import { acordeClasico, convertirRelativos } from "../../../acordesGuitarra";

export const ModalAcordes = ({ abierto, onCerrar, onAplicar, instrument = "guitar", size = 60 }) => {
	const {
		limpiar,
		raices,
		raiz,
		seleccionarRaiz,
		variantes,
		variante,
		seleccionarVariante,
	} = useModalAcordes();
	const previewRef = useRef(null);
	const [posicionFret, setPosicionFret] = useState(1);

	useEffect(() => {
		if (abierto) limpiar();
	}, [abierto]);

	useEffect(() => {
		const el = previewRef.current;
		if (!el) return;

		const dato = acordeClasico(variante);
		if (!dato) {
			el.chordFingers = undefined;
			el.chordBarres = [];
			setPosicionFret(1);
			return;
		}

		const { fingers, barres, position } = convertirRelativos(dato.fingers, dato.barres ?? []);
		el.chordFingers = fingers;
		el.chordBarres = barres;
		setPosicionFret(position);
	}, [variante]);

	const aplicar = () => {
		if (!variante) return;
		onAplicar(variante);
		onCerrar();
	};

	return (
		<Modal abierto={abierto} onCerrar={onCerrar} titulo="Cambiar acorde" ancho="w-[520px]">
			<div className="mb-3 flex flex-wrap gap-1">
				{raices.map((r) => (
					<button
						key={r}
						type="button"
						onClick={() => seleccionarRaiz(r)}
						className={
							"cursor-pointer rounded border px-3 py-1 text-sm font-semibold " +
							(r === raiz
								? "border-blue-600 bg-blue-600 text-white"
								: "border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200")
						}
					>
						{r}
					</button>
				))}
			</div>
			<div className="flex gap-4">
				<div className="max-h-[220px] flex-1 overflow-y-auto rounded-md border border-gray-200">
					{variantes.length === 0 && raiz && (
						<p className="p-3 text-sm text-gray-500">Sin variantes para {raiz}.</p>
					)}
					{variantes.map((v) => (
						<button
							key={v}
							type="button"
							onClick={() => seleccionarVariante(v)}
							className={
								"block w-full px-3 py-1.5 text-left text-sm cursor-pointer " +
								(v === variante ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-100")
							}
						>
							{v}
						</button>
					))}
				</div>
				<div className="relative flex w-[200px] flex-col items-center justify-center rounded-md border border-gray-200 bg-gray-50 p-2">
					{variante ? (
						<>
							<chord-diagram
								ref={previewRef}
								instrument={instrument}
								chord={variante}
								hideLabel={true}
								style={{ width: `${size + 40}px`, height: `${size + 40}px` }}
							/>
							{posicionFret > 1 && (
								<span className="absolute left-1 top-1 text-[10px] font-bold text-gray-400">
									{posicionFret}fr
								</span>
							)}
							<span className="mt-1 text-sm font-semibold text-gray-700">{variante}</span>
						</>
					) : (
						<p className="text-sm text-gray-400">Selecciona un acorde</p>
					)}
				</div>
			</div>
			<div className="mt-4 flex justify-end gap-2">
				<button
					type="button"
					onClick={onCerrar}
					className="cursor-pointer rounded border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100"
				>
					Cancelar
				</button>
				<button
					type="button"
					onClick={aplicar}
					disabled={!variante}
					className="cursor-pointer rounded bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
				>
					Aplicar
				</button>
			</div>
		</Modal>
	);
};