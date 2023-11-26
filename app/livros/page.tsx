"use client";

import Botao from "@/components/livros/botao";
import Formulario from "@/components/livros/formulario";
import Layout from "@/components/livros/layout";
import Tabela from "@/components/livros/tabela";
import Livro from "@/core/livro";
import { fetchLivros, cadastrarLivro, atualizarLivro, excluirLivro } from "@/service/livroService";
import { useEffect, useState } from "react";

export default function Livros() {

    const [livros, setLivros] = useState<Livro[]>([]);
    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
    const [livro, setLivro] = useState<Livro>(Livro.vazio())

    useEffect(() => {
        if (visivel === 'tabela') {
            const loadLivros = async () => {
                try { 
                    const dados = await fetchLivros();
                    setLivros(dados);
                } catch (error) {
                    console.error("Erro ao buscar Livros:", error);
                }
            }
            loadLivros();
        } }, [visivel]);

    async function salvarLivro(livro: Livro) {
        try {
            const novoLivro = await cadastrarLivro(livro);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao salvar livro:", error);
        }
    }

    async function alterarLivro(livro: Livro) {
        try {
            const livroAtualizado = await atualizarLivro(livro);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao atualizar livro:", error);
        }
    }

    function salvarOuAlterarLivro(livro: Livro) {
        if (livro.id) {
            alterarLivro(livro)
        } else {
            salvarLivro(livro)
        }
    }

    async function livroExcluido(livro: Livro) {
        const confirmacao =
        window.confirm("Tem certeza de que deseja excluir este livro?");
        if (confirmacao) {
            try {
                if (livro.id !== null) {
                    await excluirLivro(livro.id);
                } else {
                    console.error("livroId é null!");
                }
                setLivros(prevLivros => prevLivros.filter(ev => ev.id !== livro.id));
            } catch (error) {
            console.error("Erro ao excluir livro:", error);
            }
        }
    }

    function livroSelecionado(livro: Livro) {
        setLivro(livro)
        setVisivel('form')
    }

    function novoLivro() {
        setLivro(Livro.vazio())
        setVisivel("form")
    }

    return (
        <div className={`flex justify-center items-center h-screen
                bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
                text-white`}>
            <Layout titulo="Cadastro de Livros">
                {visivel === 'tabela' ? ( 
                <>
                <div className="flex justify-end">
                    <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700" onClick={() => novoLivro()}>
                        Novo Livro
                    </Botao>
                </div>
                <Tabela livros={livros}
                livroSelecionado={livroSelecionado}
                livroExcluido={livroExcluido}></Tabela>
                </>
                ) : (
                <Formulario livro={livro} cancelado={() => setVisivel('tabela')} livroMudou={salvarOuAlterarLivro}></Formulario>
                )}
            </Layout>
        </div>
    )
}