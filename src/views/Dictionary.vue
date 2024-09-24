<template>
    <Modal>
        <template #default v-if="myStore.modal.title === 'noteCard'">
            <input class="noteInput" type="text" v-on:keyup.enter="addNote" v-model="note" placeholder="add note...">
            <p v-if="!tempNoteData.notes.length">There is no note</p>
            <div class="modalNote" v-for="item in tempNoteData?.notes" :key="item.id">
                <span>{{ item.note }}</span>
                <img @click="deleteNote(item.id)" src="@/assets/img/plugins/trash.png" alt="">
            </div>
        </template>
    </Modal>

    <section>
        <div class="container">
            <Breadcrumb>
                <template #title>
                    My dictionary
                </template>
                <template #breadcrumbs>
                    <router-link to="/" class="breadcrumbs__link">Home</router-link>
                    <img src="@/assets/img/plugins/right-arrow.png" alt="">
                    <router-link to="/dictionary" class="breadcrumbs__link">Dictionary</router-link>
                </template>
            </Breadcrumb>
        </div>
    </section>


    <!-- <div class="container">
        <div class="addNote__container">
            <input type="text" placeholder="Add book name or note title" v-on:keyup.enter="createNote" v-model="title">
        </div>
        <section class="noteInfo" v-if="!myStore.myNotes.length">
            <h3>No notes available. Please add some notes to get started!</h3>
        </section>
        <div class="note__container">
            <div class="note" v-for="note in myStore.myNotes" :key="note.id" @click="openNoteCard(note)">
                <h3 class="note__title">{{ note?.noteName }}</h3>
                <div class="note__bottom">
                    <span class="date">{{ note?.date }}</span>
                    <img @click="deleteNoteCard(note.id)" src="@/assets/img/plugins/trash.png" alt="">
                </div>
            </div>
        </div>
    </div> -->

</template>

<script setup>
import { ref,computed, onMounted } from 'vue'
import Breadcrumb from '@/components/UI/Breadcrumb.vue';
import Modal from "@/components/Modal/index.vue";
import Swal from 'sweetalert2';
import { useCounterStore } from "@/stores/counter";
const myStore = useCounterStore();


const title = ref('')
const formattedDate = ref(null)

function currentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    formattedDate.value = `${day}.${month}.${year}`;
}

function createNote() {
    let note = {
        "id": Date.now(),
        "noteName": title.value,
        "date": formattedDate.value,
        "notes": []
    }
    myStore.myNotes.unshift(note)
    title.value = ''
}


function deleteNoteCard(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00c897",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            myStore.myNotes = myStore.myNotes.filter(item => item.id !== id)
            Swal.fire({
                title: "Deleted!",
                text: "Your notes has been deleted.",
                icon: "success"
            });
        }
    });



}


computed(()=>{
    return 
})

function openNoteCard(note) {
    myStore.modal.show = true
    myStore.modal.title = 'noteCard'
    myStore.modal.noteName = note.noteName
    tempNoteData.value = note

}


const tempNoteData = ref(null)
const note = ref('')
function addNote() {
    tempNoteData.value.notes.unshift({
        id: Date.now(),
        note: note.value
    })
    note.value = ''
}

function deleteNote(id) {
    tempNoteData.value.notes = tempNoteData.value.notes.filter(item => item.id !== id)
    console.log(id);

}

onMounted(() => {
    currentDate()
})


</script>

<style lang="scss" scoped>
.addNote__container {
    margin-top: 20px;
    margin-bottom: 40px;

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

.noteInfo {
    height: 10vh;

    h3 {
        font-size: 25px;
    }
}

.note__container {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-bottom: 70px;

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

            img {
                width: 25px;
                margin-left: 5px;
                cursor: pointer;
                position: relative;
            }
        }
    }
}

.noteInput {
    width: 50%;
    border-radius: 7px;
    border: 1px solid #00c897;
    outline: none;
    padding: 5px;
    font-size: 16px;
    margin-bottom: 20px;
}

.modalNote {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    position: relative;
    padding-left: 20px;
    border-bottom: 1px solid #00c897;
    margin-bottom: 15px;

    &::before {
        content: '';
        width: 12px;
        height: 12px;
        background: #00c897;
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 5px;
    }

    span {
        line-height: 20px;
        font-size: 14px;
        font-style: italic;
    }

    img {
        width: 20px;
        cursor: pointer;
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