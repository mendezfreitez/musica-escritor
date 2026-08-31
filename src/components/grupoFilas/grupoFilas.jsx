import { InputFila } from "../inputFila/InputFila"

export const GrupoFilas = ({ filas, editar, guardar }) => {



    return (
        <div>
            {filas.map(el => {
                const { id, texto, edit } = el;
                return (
                    <>
                        {edit === 0
                            ? <p onClick={() => { editar(el) }} key={id}>{texto}</p>
                            : <InputFila
                                clases="rounded-md ps-1 text-[#202020] bg-gray-500 w-[90%]"
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