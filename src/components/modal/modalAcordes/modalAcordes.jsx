import { Modal } from "../Modal";

export const ModalAcordes = ({ abierto, onCerrar }) => {
	return (
		<Modal abierto={abierto} onCerrar={onCerrar} titulo="Cambiar acorde">
			<p className="text-sm text-gray-600">Seleccionar acorde — en desarrollo.</p>
		</Modal>
	);
};