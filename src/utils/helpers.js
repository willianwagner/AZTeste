function montarPaginacao(dados) {

    return  {
        page: dados.data.page,
        per_page: dados.data.per_page,
        total: dados.data.total,
        total_pages: dados.data.total_pages
    }

}

export { montarPaginacao }