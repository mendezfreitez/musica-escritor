import { useEffect, useRef, useState } from "react";

export const Carril = ({ id }) => {
    const [x, setX] = useState(0);
    const [maxX, setMaxX] = useState(0);
    const dragging = useRef(false);
    const startX = useRef(0);
    const startPosition = useRef(0);
    const containerRef = useRef(null);
    const elementoRef = useRef(null);

    const handlePointerDown = (e) => {
        dragging.current = true;

        startX.current = e.clientX;
        startPosition.current = x;

        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!dragging.current) return;
        const deltaX = e.clientX - startX.current;

        setX(Math.max(0, Math.min(maxX, startPosition.current + deltaX)));
    };

    const handlePointerUp = () => {
        dragging.current = false;
    };

    useEffect(() => {
        const actualizarLimites = () => {
            const contenedor = containerRef.current;
            const elemento = elementoRef.current;
            if (!contenedor || !elemento) return;

            setMaxX(contenedor.clientWidth - elemento.getBoundingClientRect().width);
        };

        actualizarLimites();

        const observer = new ResizeObserver(actualizarLimites);
        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="h-[80px] w-full bg-gray-100 rounded-lg flex inset-shadow-sm inset-shadow-gray-500" id={`carril_${id}`} ref={containerRef}>
            <div
                ref={elementoRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="h-full bg-gray-100 rounded-lg"
                style={{
                    width: "100px",
                    cursor: "grab",
                    transform: `translateX(${x}px)`,
                    position: "relative",
                    touchAction: "none",
                    userSelect: "none",
                    boxShadow: "rgb(0, 0, 0) 0px -1px 4px -1px inset",
                }}
            >
                Arrástrame
            </div>
        </div>
    );
}