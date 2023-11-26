export default class Livro {
    id: number | null;
    nome: string;
    autor: string;
    resenha: string;
    
    constructor(id: number | null, nome: string, autor: string,
        resenha: string) {

        this.id = id;
        this.nome = nome;
        this.autor = autor;
        this.resenha = resenha;

    }

    static vazio(): Livro {
        return new Livro(null, "", "", "");
    }
}