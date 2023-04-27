<template>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in itens['data'] " :key="index">
                <td>{{ item.id }}</td>
                <td>
                    <div class="d-flex">
                        <img class="avatar__img" :src="item.avatar" :alt="item.first_name">
                        <p class="ml-2">{{ item.first_name }}{{ item.last_name }}</p>
                    </div>
                </td>
                <td>{{ item.email }}</td>
                <td>
                    <div class="d-flex ">
                        <a class="mr-2" role="button">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </a>
                        <a role="button">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </a>
                    </div>
                </td>

            </tr>
        </tbody>
    </table>
    <div class="d-flex">
        <p>Página {{ itens.page }} de {{ itens.total_pages }}</p>
        {{ paginador }}


    </div>
</template>
<script>
export default {
    name: "TableList",
    props: {

        itens: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            paginador: {
                total: 0
            }
        }
    },
    created() {
        this.paginador.total = this.itens.total_pages
    }

}
</script>

<style scoped>
table {
    border-collapse: collapse;
    width: 95%;
    margin: 25px auto;
}

th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

tr:hover {
    background-color: #f5f5f5;
}

tr.row:nth-child(even) {
    background-color: #f2f2f2;
}

.avatar__img {
    width: 5%;
    border-radius: 50%;
    object-fit: cover;
}
</style>