<template>
    <div class="modal" v-if="show">
        <div class="modal-content">
            <div class="modal-header">
                {{ titulo }}
            </div>
            <div class="modal-body">
                <slot name="body"></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';

export default {
  name: 'ModalAz',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    titulo: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const showModal = ref(props.show);    
    return {
      showModal
    }
  }
}
</script>
  

  