import { useState } from "react";

export const InputFila = ({ clases, ejecutar, texto }) => {
    const [text, setText] = useState(texto);

    return (
        <input
            type="text"
            value={text}
            placeholder="Ingrese texto"
            className={clases}
            style={{ height: "30px", fontSize: "16px", borderWidth: 0 }}
            onChange={(e) => { setText(e.target.value) }}
            onKeyUp={(e) => {
                if (['Enter'].includes(e.key)) {
                    ejecutar(e.target.value);
                    setText('');
                }
            }}
        />
    )
}