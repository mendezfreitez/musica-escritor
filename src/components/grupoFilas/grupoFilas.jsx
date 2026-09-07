import { InputFila } from "../inputFila/InputFila"
import { Carril } from "../carril/carril";

export const GrupoFilas = ({ filas, editar, guardar }) => {



    return (
        <div className="w-[90%]">
            {filas.map(el => {
                const { id, texto, edit } = el;
                return (
                    <>
                        {edit === 0
                            ?
                            <>
                                {/* <div className="h-[80px] w-full bg-cyan-600 rounded-lg"> */}
                                    <Carril id={id} />
                                {/* </div> */}
                                <p className="text-[#464646]" style={{ fontSize: "20px", lineHeight: "40px" }} onClick={() => { editar(el) }} key={id}>
                                    {texto}
                                </p>
                            </>
                            : <InputFila
                                clases="rounded-md ps-1 text-[#464646] bg-gray-200 border-0 focus-visible:outline-0 focus-visible:inset-shadow-sm d-flex w-full"
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