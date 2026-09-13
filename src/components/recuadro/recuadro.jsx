import { useRef, useState } from "react";
import { ANCHO, POR_DEFECTO } from "../../const";
import { Guitar, Trash2 } from "lucide-react";
import { ChordDiagram } from "@parent-tobias/chord-component";
import { useDropDown } from "../dropDownMenu/useDropDown";
import { DropDown } from "../dropDownMenu/DropDown";
import { Modal } from "../modal/Modal";

const UMBRAL = 4;

export const Recuadro = (prps) => {
    const {acorde = "C#", b, idx, bloques, onCambioBloques, maxX, editando, size = 60 } = prps;
    const [editable, setEditable] = useState(false);
    const [modalAcorde, setModalAcorde] = useState(false);
    const arrastrado = useRef(null);
    const bs = bloques ?? POR_DEFECTO;
    const { abierto, posicion, abrir, cerrar } = useDropDown();

    const eliminar = () => {
        onCambioBloques(bs.filter((bl) => bl.uid !== b.uid));
        cerrar();
    };

    const cambiarAcorde = () => {
        cerrar();
        setModalAcorde(true);
    };

    const handlePointerDown = (uid, e) => {
        if (e.button !== 0) return;

        arrastrado.current = {
            uid,
            startX: e.clientX,
            startY: e.clientY,
            startPos: bs.find((b) => b.uid === uid)?.x ?? 0,
            arrastrando: false,
        };

        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (uid, e) => {
        const arr = arrastrado.current;
        if (!arr || arr.uid !== uid) return;

        const distancia = Math.hypot(e.clientX - arr.startX, e.clientY - arr.startY);
        if (!arr.arrastrando) {
            if (distancia <= UMBRAL) return;
            arr.arrastrando = true;
        }

        const deseado = arr.startPos + (e.clientX - arr.startX);
        onCambioBloques(mover(bs, uid, deseado));
    };

    const handlePointerUp = (uid, e) => {
        const arr = arrastrado.current;
        if (arr && arr.uid === uid && !arr.arrastrando) {
            const rect = e.currentTarget.getBoundingClientRect();
            abrir(rect.left, rect.top);
        }
        arrastrado.current = null;
    };

    const mover = (lista, uid, deseado) => {
        if (!lista.some((b) => b.uid === uid)) return lista;

        const x = Math.max(0, Math.min(maxX, deseado));
        return lista.map((b) => (b.uid === uid ? { ...b, x } : b));
    };

    return (
        <div
            key={b.uid}
            onPointerDown={(e) => handlePointerDown(b.uid, e)}
            onPointerMove={(e) => handlePointerMove(b.uid, e)}
            onPointerUp={(e) => handlePointerUp(b.uid, e)}
            onPointerCancel={(e) => handlePointerUp(b.uid, e)}
            onDoubleClick={() => { alert('Se va a editar'); }}
            onContextMenu={(e) => {
                e.preventDefault();
            }}
            onMouseOver={() => { setEditable(true); }}
            onMouseLeave={() => { setEditable(false); }}
            className="h-full bg-gray-100 rounded-lg absolute left-0 top-0 flex items-center"
            style={{
                width: `${ANCHO}px`,
                cursor: "grab",
                transform: `translateX(${b.x}px)`,
                touchAction: "none",
                userSelect: "none",
                boxShadow: "rgb(0, 0, 0) 0px -1px 4px -1px inset",
            }}
        >
            <div className={`absolute flex flex-row justify-between ps-0.5 pt-0 h-[20px] w-full top-0 rounded-t-lg ${editando || editable ? "" : ""}`} onPointerDown={(e) => e.stopPropagation()}>
                {/* <Menu color="#546E7A" className="cursor-pointer" size={16} onClick={() => { alert('holis XD'); }} /> */}
                <p className="items-end text-sm flex">{acorde}</p>
            </div>
            <chord-diagram
                instrument="guitar"
                className="acorde m-auto mt-3"
                chord={acorde}
                hideLabel={true}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    alignSelf: "center",
                }}
            />
            <DropDown
                x={posicion.x}
                y={posicion.y}
                abierto={abierto}
                onCerrar={cerrar}
                opciones={[
                    { id: "eliminar", label: "Eliminar", icono: <Trash2 size={16} />, accion: eliminar },
                    { id: "acorde", label: "Cambiar acorde", icono: <div className="text-sm">{acorde}</div>, accion: cambiarAcorde },
                ]}
            />
            <Modal
                abierto={modalAcorde}
                onCerrar={() => setModalAcorde(false)}
                titulo="Cambiar acorde"
            >
                <p className="text-sm text-gray-600">Seleccionar acorde — en desarrollo.</p>
            </Modal>
        </div>
    )
}