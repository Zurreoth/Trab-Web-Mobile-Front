import Status from "@/core/status"
import { iconeEditar, iconeExcluir } from "../icones/tabela"

interface TabelaProps {
    status: Status[]
    statusSelecionado?: (status: Status) => void
    statusExcluido?: (status: Status) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.statusSelecionado || props.statusExcluido

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-3">id</th> 
                <th className="text-left p-3">Usuario</th> 
                <th className="text-left p-3">Livro</th> 
                <th className="text-left p-3">Nota</th> 
                <th className="text-left p-3">Status</th> 
                {exibirAcoes ? <th className="p-3">Ações</th> : false}
            </tr>)}
    
    function renderDados() {
        return props.status?.map((status, i) => {
            return ( 
                <tr key={status.id} className={`${i % 2 === 0 ? 'bg-indigo-200' : 'bg-indigo-100'} `}>
                    <td className="text-left p-3">{status.id}</td> 
                    <td className="text-left p-3">{status.usuario}</td> 
                    <td className="text-left p-3">{status.livro}</td> 
                    <td className="text-left p-3">{status.nota}</td> 
                    <td className="text-left p-3">{status.status}</td> 
                    {exibirAcoes ? renderizarAcoes(status) : false }
                </tr>)})}

    function renderizarAcoes(status: Status) {
        return (
            <td className="flex justify-center">
                {props.statusSelecionado ? ( <button onClick={() => props.statusSelecionado?.(status)}
                    className={`flex justify-center items text-green-600
                    rounded-full p-2 m-1 hover:bg-gray-100`}>{iconeEditar}</button>)
                    : false }
                {props.statusExcluido ? (<button onClick={() => props.statusExcluido?.(status)}
                    className={`flex justify-center items text-red-600
                    rounded-full p-2 m-1 hover:bg-gray-100`}>{iconeExcluir}</button>)
                    : false}
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`text-gray-100
                bg-gradient-to-r from-indigo-500 to-indigo-800`}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderDados()}
            </tbody>
        </table>
    )
}