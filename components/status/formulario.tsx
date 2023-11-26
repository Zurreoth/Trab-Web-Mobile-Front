"use client";

import Status from '@/core/status'
import Entrada from '../formulario/entrada'
import { useState } from "react";
import Botao from "../formulario/botao" ;

interface FormularioProps {
    status: Status
    statusMudou?: (status: Status) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {

    const id = props.status?.id
    const [usuario, setUsuario] = useState(props.status?.usuario)
    const [livro, setLivro] = useState(props.status?.livro)
    const [nota, setNota] = useState(props.status?.nota)
    const [status, setStatus] = useState(props.status?.status)

    return (
        <div>
            {id ? (<Entrada texto="id" valor={id} somenteLeitura ></Entrada>) : false}
            <Entrada texto="Usuario" valor={usuario} onChange={setUsuario} tipo='number'></Entrada>
            <Entrada texto="Livro" valor={livro } onChange={setLivro } tipo='number'></Entrada>
            <Entrada texto="Nota" valor={nota } onChange={setNota } tipo='number'></Entrada>
            <Entrada texto="Status" valor={status } onChange={setStatus }></Entrada>
            <div className ="flex justify-end mt-5" >
                <Botao className ="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700" 
                        onClick={() => props.statusMudou?.(new Status(
                            id, usuario, livro, nota, status))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor="bg-gradient-to-r from-gray-500 to-gray-700" onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )}