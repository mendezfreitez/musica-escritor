import { useEffect, useRef, useState } from "react";
import { Recuadro } from "../recuadro/recuadro";
import { PlusIcon } from "lucide-react";
import { ANCHO, POR_DEFECTO } from "../../const";

export const Carril = ({ id, bloques, onCambioBloques, editando, size = 60 }) => {
    const [maxX, setMaxX] = useState(0);
    const containerRef = useRef(null);

    const bs = bloques ?? POR_DEFECTO;

    const agregar = () => {
        const nuevoUid = bs.reduce((m, b) => Math.max(m, b.uid), 0) + 1;
        const ultimoX = bs.reduce((m, b) => Math.max(m, b.x + ANCHO), 0);
        onCambioBloques([...bs, { uid: nuevoUid, x: Math.min(ultimoX, maxX) }]);
    };

    useEffect(() => {
        const actualizarLimites = () => {
            const contenedor = containerRef.current;
            if (!contenedor) return;

            setMaxX(contenedor.clientWidth - ANCHO);
        };

        actualizarLimites();

        const observer = new ResizeObserver(actualizarLimites);
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (maxX <= 0) return;

        const nuevos = bs.map((b) => ({
            ...b,
            x: Math.max(0, Math.min(b.x, maxX)),
        }));
        const cambio = nuevos.some((b, i) => b.x !== bs[i].x);
        if (cambio) onCambioBloques(nuevos);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxX]);

    return (
        <div className="flex items-center w-full gap-1">
            <div
                className="h-[80px] flex-1 bg-gray-100 rounded-lg flex inset-shadow-sm inset-shadow-gray-500 relative"
                id={`carril_${id}`}
                ref={containerRef}
            >
                {bs.map((b, idx) => (
                    <Recuadro key={idx} b={b} idx={idx} bloques={bloques} onCambioBloques={onCambioBloques} maxX={maxX} editando={editando} size={size} />
                ))}
            </div>
            {bs.length < 7 &&
                <button
                    type="button"
                    onClick={agregar}
                    aria-label="Agregar recuadro"
                    className="h-[48px] w-[48px] shrink-0 rounded-xl bg-gray-300 text-gray-700 text-2xl leading-none  hover:bg-gray-400 cursor-pointer select-none flex justify-center items-center"
                >
                    <PlusIcon />
                </button>
            }
        </div>
    );
}