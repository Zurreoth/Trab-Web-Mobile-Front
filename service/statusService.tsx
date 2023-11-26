import axios from 'axios';
import Status from '../core/status';



const BASE_URL = 'http://localhost:8080';

export const fetchStatus = async (): Promise<Status[]> => {
    try {
        const response = await axios.get<Status[]>(`${BASE_URL}/status`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar status');
    }
};

export const cadastrarStatus = async (status: Status): Promise<Status> => {
    try {
        const response = await axios.post<Status>(`${BASE_URL}/status`, status);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar Status:", error);
        throw error;
    }
};

export const atualizarStatus = async (status: Status): Promise<Status> => {
    try {
        const response = await axios.put<Status>(
        `${BASE_URL}/status/${status.id}`, status);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        throw error;
    }
};

export const excluirStatus = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/status/${id}`);
    } catch (error) {
        console.error("Erro ao excluir status:", error);
        throw error;
    }
};