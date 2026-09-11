import { useEffect, useRef, useState } from "react";

const ANCHO = 70;

export const Carril = ({ id }) => {
    const [bloques, setBloques] = useState([{ uid: 1, x: 0 }]);
    const [maxX, setMaxX] = useState(0);
    const uidRef = useRef(2);
    const containerRef = useRef(null);
    const arrastrado = useRef(null);

    const mover = (bs, uid, deseado) => {
        if (!bs.some((b) => b.uid === uid)) return bs;

        const x = Math.max(0, Math.min(maxX, deseado));
        return bs.map((b) => (b.uid === uid ? { ...b, x } : b));
    };

    const handlePointerDown = (uid, e) => {
        arrastrado.current = {
            uid,
            startX: e.clientX,
            startPos: bloques.find((b) => b.uid === uid)?.x ?? 0,
        };

        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (uid, e) => {
        const arr = arrastrado.current;
        if (!arr || arr.uid !== uid) return;

        const deseado = arr.startPos + (e.clientX - arr.startX);
        setBloques((bs) => mover(bs, uid, deseado));
    };

    const handlePointerUp = () => {
        arrastrado.current = null;
    };

    const agregar = () => {
        setBloques((bs) => {
            const ultimoX = bs.reduce((m, b) => Math.max(m, b.x + ANCHO), 0);
            return [...bs, { uid: uidRef.current++, x: Math.min(ultimoX, maxX) }];
        });
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
        setBloques((bs) =>
            bs.map((b) => ({ ...b, x: Math.max(0, Math.min(b.x, maxX)) }))
        );
    }, [maxX]);

    return (
        <div className="flex items-center w-full gap-1">
            <div
                className="h-[80px] flex-1 bg-gray-100 rounded-lg flex inset-shadow-sm inset-shadow-gray-500 relative"
                id={`carril_${id}`}
                ref={containerRef}
            >
                {bloques.map((b, idx) => (
                    <div
                        key={b.uid}
                        onPointerDown={(e) => handlePointerDown(b.uid, e)}
                        onPointerMove={(e) => handlePointerMove(b.uid, e)}
                        onPointerUp={handlePointerUp}
                        onPointerCancel={handlePointerUp}
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
                        <p className="text-center w-full text-2xl">
                        {idx}
                        </p>
                    </div>
                ))}
            </div>
            {bloques.length < 7 &&
            <button
            type="button"
            onClick={agregar}
            aria-label="Agregar recuadro"
            className="h-[48px] w-[48px] shrink-0 rounded-xl bg-gray-300 text-gray-700 text-2xl leading-none  hover:bg-gray-400 cursor-pointer select-none"
            >
                +
            </button>
            }
        </div>
    );
}