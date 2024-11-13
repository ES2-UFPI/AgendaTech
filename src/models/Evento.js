class Evento {
    constructor(id, titulo, data, local, link, descricao, categoria) {
        this.id = id;
        this.titulo = titulo;
        this.data = data;
        this.local = local;
        this.link = link;
        this.descricao = descricao;
        this.categoria = categoria;
    }
}

module.exports = Evento;