import { InputFila } from "../inputFila/InputFila"
import { Carril } from "../carril/carril";

export const GrupoFilas = ({ filas, editar, guardar, cambiarBloques }) => {



    return (
        <div className="w-[90%]">
            {filas.map(el => {
                const { id, texto, edit } = el;
                return (
                    <div key={id}>
                        {edit === 0
                            ?
                            <>
                                <Carril
                                    id={id}
                                    bloques={el.bloques}
                                    onCambioBloques={(bs) => cambiarBloques(id, bs)}
                                />
                                <p className="text-[#464646]" style={{ fontSize: "20px", lineHeight: "40px" }} onClick={() => { editar(el) }}>
                                    {texto}
                                </p>
                            </>
                            : <InputFila
                                clases="rounded-md ps-1 text-[#464646] bg-gray-200 border-0 focus-visible:outline-0 focus-visible:inset-shadow-sm d-flex w-full"
                                texto={texto}
                                ejecutar={guardar}
                            />
                        }
                    </div>
                )
            })}
        </div>
    )
}