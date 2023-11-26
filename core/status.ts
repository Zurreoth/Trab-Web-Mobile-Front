export default class Status {
    id: number | null;
    usuario: String;
    livro: String;
    nota: number | null;
    status: String;
    
    constructor(id: number | null, usuario: String, livro: String, nota: number | null, status: String) {

        this.id = id;
        this.usuario = usuario;
        this.livro = livro;
        this.nota = nota;
        this.status = status;

    }

    static vazio(): Status {
        return new Status(null, "", "", null, "");
    }
}