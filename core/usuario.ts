export default class Usuario {
    id: number | null;
    nome: string;
    senha: string;
    
    constructor(id: number | null, nome: string, senha: string) {

        this.id = id;
        this.nome = nome;
        this.senha = senha;

    }

    static vazio(): Usuario {
        return new Usuario(null, "", "");
    }
}