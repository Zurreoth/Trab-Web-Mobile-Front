"use client";

import Botao from "@/components/formulario/botao";
import Formulario from "@/components/usuarios/formulario";
import Layout from "@/components/layout/layout";
import Tabela from "@/components/usuarios/tabela";
import Usuario from "@/core/usuario";
import { fetchUsuarios, cadastrarUsuario, atualizarUsuario, excluirUsuario } from "@/service/usuarioService";
import { useEffect, useState } from "react";

export default function Usuarios() {

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
    const [usuario, setUsuario] = useState<Usuario>(Usuario.vazio())

    useEffect(() => {
        if (visivel === 'tabela') {
            const loadUsuarios = async () => {
                try { 
                    const dados = await fetchUsuarios();
                    setUsuarios(dados);
                } catch (error) {
                    console.error("Erro ao buscar Usuarios:", error);
                }
            }
            loadUsuarios();
        } }, [visivel]);

    async function salvarUsuario(usuario: Usuario) {
        try {
            const novoUsuario = await cadastrarUsuario(usuario);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao salvar usuario:", error);
        }
    }

    async function alterarUsuario(usuario: Usuario) {
        try {
            const usuarioAtualizado = await atualizarUsuario(usuario);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao atualizar usuario:", error);
        }
    }

    function salvarOuAlterarUsuario(usuario: Usuario) {
        if (usuario.id) {
            alterarUsuario(usuario)
        } else {
            salvarUsuario(usuario)
        }
    }

    async function usuarioExcluido(usuario: Usuario) {
        const confirmacao =
        window.confirm("Tem certeza de que deseja excluir este usuario?");
        if (confirmacao) {
            try {
                if (usuario.id !== null) {
                    await excluirUsuario(usuario.id);
                } else {
                    console.error("usuarioId é null!");
                }
                setUsuarios(prevUsuarios => prevUsuarios.filter(ev => ev.id !== usuario.id));
            } catch (error) {
            console.error("Erro ao excluir usuario:", error);
            }
        }
    }

    function usuarioSelecionado(usuario: Usuario) {
        setUsuario(usuario)
        setVisivel('form')
    }

    function novoUsuario() {
        setUsuario(Usuario.vazio())
        setVisivel("form")
    }

    return (
        <div className={`flex justify-center items-center h-screen
                bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
                text-white`}>
            <Layout titulo="Cadastro de Usuarios">
                {visivel === 'tabela' ? ( 
                <>
                <div className="flex justify-end">
                    <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700" onClick={() => novoUsuario()}>
                        Novo Usuario
                    </Botao>
                </div>
                <Tabela usuarios={usuarios}
                usuarioSelecionado={usuarioSelecionado}
                usuarioExcluido={usuarioExcluido}></Tabela>
                </>
                ) : (
                <Formulario usuario={usuario} cancelado={() => setVisivel('tabela')} usuarioMudou={salvarOuAlterarUsuario}></Formulario>
                )}
            </Layout>
        </div>
    )
}