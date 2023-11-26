"use client";

import Botao from "@/components/formulario/botao";
import Formulario from "@/components/status/formulario";
import Layout from "@/components/layout/layout";
import Tabela from "@/components/status/tabela";
import StatusEnt from "@/core/status";
import { fetchStatus, cadastrarStatus, atualizarStatus, excluirStatus } from "@/service/statusService";
import { useEffect, useState } from "react";

export default function Status() {

    const [listaStatus, setListaStatus] = useState<StatusEnt[]>([]);
    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
    const [status, setStatus] = useState<StatusEnt>(StatusEnt.vazio())

    useEffect(() => {
        if (visivel === 'tabela') {
            const loadStatus = async () => {
                try { 
                    const dados = await fetchStatus();
                    setListaStatus(dados);
                } catch (error) {
                    console.error("Erro ao buscar Status:", error);
                }
            }
            loadStatus();
        } }, [visivel]);

    async function salvarStatus(status: StatusEnt) {
        try {
            const novoStatus = await cadastrarStatus(status);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao salvar status:", error);
        }
    }

    async function alterarStatus(status: StatusEnt) {
        try {
            const statusAtualizado = await atualizarStatus(status);
            setVisivel("tabela");
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
        }
    }

    function salvarOuAlterarStatus(status: StatusEnt) {
        if (status.id) {
            alterarStatus(status)
        } else {
            salvarStatus(status)
        }
    }

    async function statusExcluido(status: StatusEnt) {
        const confirmacao =
        window.confirm("Tem certeza de que deseja excluir este status?");
        if (confirmacao) {
            try {
                if (status.id !== null) {
                    await excluirStatus(status.id);
                } else {
                    console.error("statusId é null!");
                }
                setListaStatus(prevStatus => prevStatus.filter(ev => ev.id !== status.id));
            } catch (error) {
            console.error("Erro ao excluir status:", error);
            }
        }
    }

    function statusSelecionado(status: StatusEnt) {
        setStatus(status)
        setVisivel('form')
    }

    function novoStatus() {
        setStatus(StatusEnt.vazio())
        setVisivel("form")
    }

    return (
        <div className={`flex justify-center items-center h-screen
                bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
                text-white`}>
            <Layout titulo="Cadastro de Status">
                {visivel === 'tabela' ? ( 
                <>
                <div className="flex justify-end">
                    <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700" onClick={() => novoStatus()}>
                        Novo Status
                    </Botao>
                </div>
                <Tabela status={listaStatus}
                statusSelecionado={statusSelecionado}
                statusExcluido={statusExcluido}></Tabela>
                </>
                ) : (
                <Formulario status={status} cancelado={() => setVisivel('tabela')} statusMudou={salvarOuAlterarStatus}></Formulario>
                )}
            </Layout>
        </div>
    )
}