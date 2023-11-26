"use client";

import Usuario from '@/core/usuario'
import Entrada from '../formulario/entrada'
import { useState } from "react";
import Botao from "../formulario/botao" ;

interface FormularioProps {
    usuario: Usuario
    usuarioMudou?: (usuario: Usuario) => void
    cancelado?: () => void
}

export default function Formulario(props: FormularioProps) {

    const id = props.usuario?.id
    const [nome, setNome] = useState(props.usuario?.nome)
    const [senha, setSenha] = useState(props.usuario?.senha)

    return (
        <div>
            {id ? (<Entrada texto="id" valor={id} somenteLeitura ></Entrada>) : false}
            <Entrada texto="Nome" valor={nome} onChange={setNome}></Entrada>
            <Entrada texto="Senha" valor={senha } onChange={setSenha }></Entrada>
            <div className ="flex justify-end mt-5" >
                <Botao className ="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700" 
                        onClick={() => props.usuarioMudou?.(new Usuario(
                            id, nome, senha))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor="bg-gradient-to-r from-gray-500 to-gray-700" onClick={props.cancelado}>
                    Cancelar
                </Botao>
            </div>
        </div>
    )}