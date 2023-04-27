<template>
    <div v-if="isLoad">
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
                <tr v-for="(item, index) in itensTabela.data " :key="index">
                    <td width="3%">{{ item.id }}</td>
                    <td width="57%">
                        <div class="d-flex">
                            <img class="avatar__img" :src="item.avatar" :alt="item.first_name">
                            <p class="ml-2">{{ item.first_name }} {{ item.last_name }}</p>
                        </div>
                    </td>
                    <td width="35%">{{ item.email }}</td>
                    <td width="5%">
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
        <div class="d-flex align-items-center justify-end mr-2">
            <p>Página {{ itensTabela.page }} de {{ itensTabela.total_pages }}</p>

            <ul class="d-flex">
                <li class="btn btn__sm" @click="alterarPagina(item.valor)" :class="[item.ativo ? 'btn__primary' : '']"
                    v-for="(item, index) in paginador" :key="index"> {{ item.valor }}</li>
            </ul>

        </div>
    </div>
    <div class="d-flex justify-center" v-else>
        <LoadIcon />
    </div>


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
</template>
<script>
import ModalAz from '@/components/atoms/ModalAz.vue';
import LoadIcon from '@/components/atoms/LoadIcon.vue';
import httpClient from '@/constants';
import { montarPaginacao } from '@/utils/helpers'


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
            itensTabela: this.itens,
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
            paginador: []
        };
    },
    created() {
        this.criarPaginacao()

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
        },
        criarPaginacao() {
            const dadosPaginacao = this.$store.getters.getPaginacao
            for (let i = 0; i < dadosPaginacao.total_pages; i++) {
                let item = {
                    valor: i + 1,
                    ativo: dadosPaginacao.page == i + 1 ? true : false
                }
                this.paginador.push(item)

            }
    
        },
        async alterarPagina(pagina) {

            this.isLoad = !this.isLoad
            try {
                const response = await httpClient.get(`/users?page=${pagina}`);
                this.itensTabela = response.data
                const dadosPagicacao = montarPaginacao(response)
                this.$store.dispatch('atualizarPaginacao', dadosPagicacao)

                this.isLoad = !this.isLoad

                this.paginador.forEach((item) => {
                    if (item.valor === dadosPagicacao.page) {
                        item.ativo = true;
                    } else {
                        item.ativo = false;
                    }
                });

            } catch (error) {
                console.error(error);

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