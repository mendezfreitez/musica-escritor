import { useRef, useState } from "react";
import { ANCHO, POR_DEFECTO } from "../../const";
import { SlidersHorizontalIcon, Trash2 } from "lucide-react";
import { ChordDiagram } from "@parent-tobias/chord-component";

export const Recuadro = (prps) => {
    const { b, idx, bloques, onCambioBloques, maxX, editando, size = 60 } = prps;
    const [editable, setEditable] = useState(false);
    const arrastrado = useRef(null);
    const bs = bloques ?? POR_DEFECTO;

    const handlePointerDown = (uid, e) => {
        arrastrado.current = {
            uid,
            startX: e.clientX,
            startPos: bs.find((b) => b.uid === uid)?.x ?? 0,
        };

        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (uid, e) => {
        const arr = arrastrado.current;
        if (!arr || arr.uid !== uid) return;

        const deseado = arr.startPos + (e.clientX - arr.startX);
        onCambioBloques(mover(bs, uid, deseado));
    };

    const handlePointerUp = () => {
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
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
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
            <div className={`absolute flex flex-row justify-between p-0.5 h-[20px] w-full top-0 rounded-t-lg ${editando || editable ? "" : ""}`} onPointerDown={(e) => e.stopPropagation()}>
                <SlidersHorizontalIcon color="#546E7A" className="cursor-pointer" size={17} onClick={() => { alert('holis XD'); }} />
                <Trash2 color="#546E7A" className="cursor-pointer" size={17} onClick={() => { alert("eliminar"); }} />
            </div>
            <chord-diagram
                instrument="guitar"
                className="acorde m-auto mt-5"
                chord='C'
                hideLabel={true}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    alignSelf: "center",
                    // margin: "0 auto",
                    '--chord-bg-color': 'red',
                    '--chord-text-color': 'blue',
                    '--chord-border-color': 'green',
                }}
            />
        </div>
    )
}