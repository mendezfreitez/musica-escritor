import { InputFila } from "../inputFila/InputFila"

export const GrupoFilas = ({ filas, editar, guardar }) => {



    return (
        <div>
            {filas.map(el => {
                const { id, texto, edit } = el;
                return (
                    <>
                        {edit === 0
                            ? <p className="text-[#464646]" style={{fontSize: "20px", lineHeight: "40px"}} onClick={() => { editar(el) }} key={id}>{texto}</p>
                            : <InputFila
                                clases="rounded-md ps-1 text-[#464646] bg-gray-200 border-0 focus-visible:outline-0 focus-visible:inset-shadow-sm"
                                texto={texto}
                                ejecutar={guardar}
                            />
                        }
                    </>
                )
            })}
        </div>
    )
}