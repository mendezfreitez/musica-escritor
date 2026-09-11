import { InputFila } from "../inputFila/InputFila"
import { Carril } from "../carril/carril";

export const GrupoFilas = ({ filas, editar, guardar, cambiarBloques }) => {

    const editando = filas.some((el) => el.edit === 1);

    return (
        <div className="w-[90%] relative">
            {editando && (
                <div className="fixed inset-0 bg-gray-400/20 z-0" />
            )}
            {filas.map(el => {
                const { id, texto, edit } = el;
                const destacada = edit === 1;
                const zIndex = destacada ? "relative z-10" : (editando ? "relative z-[-1]" : "");
                return (
                    <div key={id} className={zIndex}>
                        <div className={destacada ? "rounded-lg bg-teal-500 shadow-lg p-2" : ""}>
                            <Carril
                                id={id}
                                bloques={el.bloques}
                                onCambioBloques={(bs) => cambiarBloques(id, bs)}
                            />
                            {destacada
                                ? <InputFila
                                    clases="rounded-md ps-1 text-[#464646] bg-gray-200 border-0 focus-visible:outline-0 focus-visible:inset-shadow-sm d-flex w-full"
                                    texto={texto}
                                    ejecutar={guardar}
                                />
                                : <p className="text-[#464646] cursor-pointer" style={{ fontSize: "20px", lineHeight: "40px" }} onClick={() => { editar(el) }}>
                                    {texto}
                                </p>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}