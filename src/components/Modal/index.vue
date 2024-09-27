<template>
    <div class="modal__backdrop" v-if="myStore.modal.show" @click="closeBackdrop">
        <div class="modal__container">
            <div class="modal__header">
                <h5 class="modal__noteName">{{ myStore.modal.name }}</h5>
            </div>
            <div class="modal__body">
                <img class="closeBtn" src="@/assets/img/plugins/close.png" @click="myStore.closeModal" alt="">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
const myStore = useCounterStore();





</script>

<style lang="scss" scoped>
.modal__backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.55);
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;

    .modal__container {
        max-width: 600px;
        width: 100%;
        max-height: 550px;
        overflow-y: auto;
        background: rgb(255, 255, 255);
        z-index: 5;
        border-radius: 10px;
        position: relative;
        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #00c897;
            border-radius: 20px;
        }

        .modal__header {
            display: flex;
            justify-content: space-between;
            padding: 20px;
            padding-bottom: 0;

            .modal__noteName {
                font-size: 25px;
            }
        }

        .modal__body {
            padding: 20px;


        }

        .closeBtn {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 25px;
            cursor: pointer;
        }
    }
}

@media (max-width: 767px) {
    .modal__backdrop {
        padding: 50px 20px;

        .modal__container {
            width: 100%;
            border-radius: 7px;

            .modal__header {
                padding: 15px;
            }

            .modal__body {
                padding: 15px;
            }
        }
    }
}
</style>