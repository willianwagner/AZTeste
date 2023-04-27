<template>
    <div class="d-flex justify-between acoes__view">
        <div class="d-flex p-2 btn__adicionar">
            <a role="button" @click="showModal = true"> <i class="fa fa-plus-circle" aria-hidden="true"></i> Adicionar</a>
        </div>
        <div class="px-2">
            <LoadIcon v-if="isLoad"></LoadIcon>
        </div>
    </div>
    <TableList v-if="listaCandidatos" :itens="listaCandidatos"></TableList>
    <SemLista v-else></SemLista>
    <ModalAz :show="showModal" titulo="Adicionar Candidato">
        <template v-slot:body>
            <div class="box__input">
                <label for="nome">Nome*</label>
                <input type="text" name="nome" v-model="form.name" placeholder="Informe o nome">

            </div>
            <div class="box__input">
                <label for="job">Vaga*</label>
                <input type="text" name="job" v-model="form.job" placeholder="Informe a vaga">
            </div>
            <div class="form__erro" v-if="form.erro">Preencha dos dados obrigatórios</div>

        </template>

        <template v-slot:footer>
            <button class="btn" @click="fecharModal">Fechar</button>
            <button class="btn btn__primary" @click="AdicionarCandidato">Adicionar</button>
        </template>
    </ModalAz>
</template>

<script>
import ModalAz from '@/components/atoms/ModalAz.vue';
import LoadIcon from '@/components/atoms/LoadIcon.vue';
import httpClient from '@/constants';
import TableList from '@/components/organisms/TableList.vue';
import SemLista from '@/components/atoms/SemLista.vue';
import {montarPaginacao} from '@/utils/helpers'

export default {
    name: 'IndexCandidatos',
    components: {
        ModalAz,
        LoadIcon,
        TableList,
        SemLista
    },
    data() {
        return {
            showModal: false,
            isLoad: false,
            form: {
                erro: false,
                name: '',
                job: ''
            },
            notificacao: {
                tipo: 'success',
                texto: 'Cadastro realizado com sucesso.'
            },
            listaCandidatos: null,
        }
    },
    created() {
        this.getCandidatos()
    },
    methods: {
        async AdicionarCandidato() {
            this.validarDados()

            if (this.form.erro) {
                return
            }

            this.isLoad = !this.isLoad
            this.showModal = false

            try {
                await httpClient.post('/users', this.form);
                this.$store.dispatch('notificarUsuario', this.notificacao)
                this.isLoad = !this.isLoad
                this.form = {}

            } catch (error) {
                console.error(error);
                this.notificacao = {
                    tipo: 'danger',
                    texto: 'Algo deu errado'
                }

                this.$store.dispatch('notificarUsuario', this.notificacao)

            }

        },
        async getCandidatos() {
            this.isLoad = !this.isLoad
            try {
                const response = await httpClient.get('/users');
                this.listaCandidatos = response.data
                const dadosPagicacao = montarPaginacao(response)          
                this.$store.dispatch('atualizarPaginacao', dadosPagicacao)
                this.isLoad = !this.isLoad


            } catch (error) {
                console.error(error);

            }
        },

        validarDados() {
            const regex = /^[\p{L}]+$/u;
            this.form.erro = false
            if (!regex.test(this.form.name)) {
                this.form.erro = true
                return
            }

            if (!regex.test(this.form.job)) {
                this.form.erro = true
                return

            }
            this.form.erro = false
        },
        fecharModal() {
            this.showModal = false
            this.form = {}
        }


    }

}
</script>


