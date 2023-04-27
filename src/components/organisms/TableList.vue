<template>
    <table v-if="isLoad">
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
                        <p class="ml-2">{{ item.first_name }} {{ item.last_name }}</p>
                    </div>
                </td>
                <td>{{ item.email }}</td>
                <td>
                    <div class="d-flex">
                        <a class="mr-2" role="button" @click="confirmarEdicao(item)">
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                        </a>
                        <a role="button" @click="confirmarExlusao(item)">
                            <i class="fa fa-trash color-danger" aria-hidden="true"></i>
                        </a>
                    </div>
                </td>

            </tr>
        </tbody>

    </table>
    <div class="d-flex justify-center" v-else>
        <LoadIcon />
    </div>
    <div class="d-flex">
        <p>Página {{ itens.page }} de {{ itens.total_pages }}</p>
        {{ paginador }}


        <ModalAz :show="modalExcluir.exibir" titulo="Excluir Candidato">
            <template v-slot:body>
                <i class="fa-solid fa-triangle-exclamation fa-2x color-danger font-large"></i>
                <p>Tem certeza que deseja excluir {{ modalExcluir.descricao }} ?</p>

            </template>

            <template v-slot:footer>
                <button class="btn mr-2" @click="modalExcluir.exibir = false">Fechar</button>
                <button class="btn btn__danger" @click="excluirItem(modalExcluir.id)">Excluir</button>
            </template>
        </ModalAz>

        <ModalAz :show="modalEditar.exibir" titulo="Editar Candidato">
            <template v-slot:body>

                <div class="box__input">
                    <label for="nome">Nome</label>
                    <input type="text" name="nome" v-model="modalEditar.form.first_name" placeholder="Informe o nome">

                </div>
                <div class="box__input">
                    <label for="nome">Sobrenome</label>
                    <input type="text" name="nome" v-model="modalEditar.form.last_name" placeholder="Informe o sobrenome">

                </div>
                <div class="box__input">
                    <label for="job">Vaga</label>
                    <input type="text" name="job" v-model="modalEditar.form.job" placeholder="Informe a vaga">
                </div>

            </template>

            <template v-slot:footer>
                <button class="btn mr-2" @click="modalEditar.exibir = false">Fechar</button>
                <button class="btn btn__primary" @click="editarItem(modalEditar.form)">Alterar</button>
            </template>
        </ModalAz>

  
    </div>
</template>
<script>
import ModalAz from '@/components/atoms/ModalAz.vue';
import LoadIcon from '@/components/atoms/LoadIcon.vue';
import httpClient from '@/constants';


export default {
    name: "TableList",
    components: { ModalAz, LoadIcon },
    props: {
        itens: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isLoad: true,
            notificacao: {},
            modalExcluir: {
                exibir: false,
                descricao: '',
                id: ''
            },
            modalEditar: {
                exibir: false,
                form: {}
            },
            paginador: {
                total: 0
            }
        };
    },
    created() {
        this.paginador.total = this.itens.total_pages;
    },
    methods: {
        confirmarExlusao(item) {

            this.modalExcluir.exibir = true
            this.modalExcluir.descricao = item.first_name
            this.modalExcluir.id = item.id

        },
        confirmarEdicao(item) {
            this.modalEditar.exibir = true
            this.modalEditar.form = item
            console.log(this.modalEditar)

        },

        async excluirItem(item) {
            this.notificacao = {
                tipo: 'success',
                texto: 'Item excluído com sucesso'
            }
            this.isLoad = !this.isLoad
            this.modalExcluir.exibir = false
            try {
                await httpClient.delete('/users', item);
                this.$store.dispatch('notificarUsuario', this.notificacao)
                this.isLoad = !this.isLoad
                this.modalExcluir.exibir = false


            } catch (error) {
                console.error(error);
                this.notificacao = {
                    tipo: 'danger',
                    texto: 'Algo deu errado'
                }

                this.$store.dispatch('notificarUsuario', this.notificacao)

            }
        },

        async editarItem(item) {
            this.notificacao = {
                tipo: 'success',
                texto: `O candidato ${item.id} atualizado com sucesso`
            }

            this.isLoad = !this.isLoad
            this.modalEditar.exibir = false
            try {
                await httpClient.delete('/users', item);
                this.$store.dispatch('notificarUsuario', this.notificacao)
                this.isLoad = !this.isLoad
                this.modalEditar.exibir = false


            } catch (error) {
                console.error(error);
                this.notificacao = {
                    tipo: 'danger',
                    texto: 'Algo deu errado'
                }

                this.$store.dispatch('notificarUsuario', this.notificacao)

            }
        }
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