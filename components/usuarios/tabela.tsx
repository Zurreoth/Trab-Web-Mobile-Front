import Usuario from "@/core/usuario"
import { iconeEditar, iconeExcluir } from "../icones/tabela"

interface TabelaProps {
    usuarios: Usuario[]
    usuarioSelecionado?: (usuario: Usuario) => void
    usuarioExcluido?: (usuario: Usuario) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.usuarioSelecionado || props.usuarioExcluido

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-3">id</th> 
                <th className="text-left p-3">nome</th> 
                {exibirAcoes ? <th className="p-3">Ações</th> : false}
            </tr>)}
    
    function renderDados() {
        return props.usuarios?.map((usuario, i) => {
            return ( 
                <tr key={usuario.id} className={`${i % 2 === 0 ? 'bg-indigo-200' : 'bg-indigo-100'} `}>
                    <td className="text-left p-3">{usuario.id}</td> 
                    <td className="text-left p-3">{usuario.nome}</td> 
                    {exibirAcoes ? renderizarAcoes(usuario) : false }
                </tr>)})}

    function renderizarAcoes(usuario: Usuario) {
        return (
            <td className="flex justify-center">
                {props.usuarioSelecionado ? ( <button onClick={() => props.usuarioSelecionado?.(usuario)}
                    className={`flex justify-center items text-green-600
                    rounded-full p-2 m-1 hover:bg-gray-100`}>{iconeEditar}</button>)
                    : false }
                {props.usuarioExcluido ? (<button onClick={() => props.usuarioExcluido?.(usuario)}
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