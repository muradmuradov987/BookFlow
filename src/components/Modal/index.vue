<template>
    <modal :width="width" :height="height" :scrollable="scrollable">
        <div class="modal-content border-0">
            <div class="modal-header border-bottom" >
                <!-- <button type="button" class="close" aria-label="Close" @click="closeModal">
                    aaaaaa
                </button> -->
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
        </div>
    </modal>
</template>

<script setup>
import { defineProps } from 'vue'
import { useCounterStore } from "@/stores/counter";
const myStore = useCounterStore();

const props = defineProps({

    height: {
        type: [String, Number],
    },
    width: {
        type: [String, Number]
    },
    scrollable: {
        type: Boolean,
        default: false
    },
})


function closeModal() {
    myStore.isModalVisible = false
}


</script>

<style lang="scss" scoped></style>