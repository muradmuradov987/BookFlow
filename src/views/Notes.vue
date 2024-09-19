<template>


    <!-- <Modal>
    </Modal> -->


    <section>
        <div class="container">
            <Breadcrumb>
                <template #title>
                    My notes
                </template>
                <template #breadcrumbs>
                    <router-link to="/" class="breadcrumbs__link">Home</router-link>
                    <img src="@/assets/img/plugins/right-arrow.png" alt="">
                    <router-link to="/notes" class="breadcrumbs__link">Notes</router-link>
                </template>
            </Breadcrumb>
        </div>
    </section>


    <div class="container">
        <div class="addNote__container">
            <input type="text" placeholder="Add book name or note title" v-on:keyup.enter="createNote" v-model="title">
        </div>
        <div class="note__container">
            <div class="note" v-for="note in myStore.myNotes">
                <h3 class="note__title">{{ note.title }}</h3>
                <div class="note__bottom">
                    <span class="date">{{ note.date }}</span>
                    <div class="edit">
                        <img src="@/assets/img/plugins/edit.png" alt="">
                        <img src="@/assets/img/plugins/trash.png" alt="">
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup>
import { ref } from 'vue'
import Breadcrumb from '@/components/UI/Breadcrumb.vue';
// import Modal from '@/components/Modal/index.vue';
import { useCounterStore } from "@/stores/counter";
const myStore = useCounterStore();


const title = ref('')

function createNote() {
    title.value = ''
}


</script>

<style lang="scss" scoped>
.addNote__container {
    margin-top: 20px;

    input {
        width: 35%;
        height: 30px;
        border-radius: 7px;
        border: 1px solid #00c897;
        outline: none;
        padding: 20px;
        font-size: 16px;
    }
}

.note__container {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    .note {
        max-width: 300px;
        width: 100%;
        background: #fff;
        box-shadow: 0 0 10px 4px #817d79;
        padding: 15px;
        border-radius: 10px;
        cursor: pointer;

        .note__title {
            font-size: 18px;
            line-height: 20px;
            margin-bottom: 10px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        .note__bottom {
            display: flex;
            align-items: end;
            justify-content: space-between;

            .edit {
                transition: 0.2s ease;

                img {
                    width: 25px;
                    margin-left: 5px;
                    cursor: pointer;
                }
            }
        }
    }
}


/*---------------Media Queries--------------*/
@media (max-width: 767px) {
    .addNote__container {
        input {
            width: 100%;
        }
    }

    .note__container {
        .note {
            max-width: unset;
            width: 47%;
            padding: 10px;
            border-radius: 5px;

            .note__title {
                font-size: 16px;
            }

            .note__bottom {
                .edit {
                    img {
                        width: 20px;
                    }
                }
            }
        }
    }
}
</style>