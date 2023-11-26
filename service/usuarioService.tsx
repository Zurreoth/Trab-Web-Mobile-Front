import axios from 'axios';
import Usuario from '../core/usuario';



const BASE_URL = 'http://localhost:8080';

export const fetchUsuarios = async (): Promise<Usuario[]> => {
    try {
        const response = await axios.get<Usuario[]>(`${BASE_URL}/usuarios`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar usuarios');
    }
};

export const cadastrarUsuario = async (usuario: Usuario): Promise<Usuario> => {
    try {
        const response = await axios.post<Usuario>(`${BASE_URL}/usuarios`, usuario);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar Usuario:", error);
        throw error;
    }
};

export const atualizarUsuario = async (usuario: Usuario): Promise<Usuario> => {
    try {
        const response = await axios.put<Usuario>(
        `${BASE_URL}/usuarios/${usuario.id}`, usuario);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar usuario:", error);
        throw error;
    }
};

export const excluirUsuario = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/usuarios/${id}`);
    } catch (error) {
        console.error("Erro ao excluir usuario:", error);
        throw error;
    }
};