<template>
    <section>
        <div class="container">
            <h1 class="book__name">{{ bookData?.name }}</h1>
            <div class="read__book">
                <aside>
                    <div class="trasnlate__container">
                        <h3>Translate</h3>
                    </div>
                    <hr>
                    <div class="note__container">
                        <h3>Add note</h3>
                        <RouterLink to="/notes">Notes</RouterLink>
                        <div v-if="myStore.myNotes.length == 0">
                            <input class="noteTitle" v-model="noteTitle" type="text" placeholder="Write note title...">
                            <div class="validation__info" v-if="validationField.noteTitle && !noteTitle">Can't be
                                empty</div>
                        </div>
                        <div v-if="myStore.myNotes.length > 0">
                            <select v-model="noteSelect">
                                <option value="" disabled selected hidden>Please Choose...</option>
                                <option :value="item.id" v-for="item in myStore.myNotes">{{ item?.noteName }}</option>
                            </select>
                            <div class="validation__info" v-if="validationField.noteSelect && !noteSelect">Can't be
                                empty</div>
                        </div>
                        <div>
                            <textarea v-model="note"></textarea>
                            <div class="validation__info" v-if="validationField.note && !note">Can't be empty</div>
                        </div>
                        <Secondary @click="saveNote">Save note</Secondary>
                    </div>
                </aside>
                <div class="book__content">
                    <vue-reader v-if="epubPath" :url="epubPath" />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useCounterStore } from "@/stores/counter";
import VueReader from 'vue-reader';
import Secondary from '@/components/UI/Buttons/Secondary.vue';
import Swal from 'sweetalert2';
const route = useRoute()
const myStore = useCounterStore();


const bookData = ref(null)

const epubPath = ref('');

const formattedDate = ref(null)

function currentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    formattedDate.value = `${day}.${month}.${year}`;
}


const noteTitle = ref('')
const noteSelect = ref('')
const note = ref('')

function saveNote() {

    if (!myStore.myNotes.length) {
        const isNoteTitleEmpty = !noteTitle.value
        const isNoteEmpty = !note.value
        if (isNoteTitleEmpty || isNoteEmpty) {
            validationField.value.noteTitle = isNoteTitleEmpty;
            validationField.value.note = isNoteEmpty;
            return;
        }
        myStore.myNotes.unshift({
            id: new Date(),
            noteName: noteTitle.value,
            date: formattedDate.value,
            notes: [{
                id: new Date(),
                note: note.value
            }]
        })

        resetFields();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "The note added",
            showConfirmButton: false,
            timer: 1000
        });

    } else {
        const isNoteSelectEmpty = !noteSelect.value
        const isNoteEmpty = !note.value
        if (isNoteSelectEmpty || isNoteEmpty) {
            validationField.value.noteSelect = isNoteSelectEmpty;
            validationField.value.note = isNoteEmpty;
            return;
        }
        const selectedNote = myStore.myNotes.find(item => item.id === noteSelect.value)
        selectedNote.notes.unshift({
            id: new Date(),
            note: note.value
        })

        resetFields();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "The note added",
            showConfirmButton: false,
            timer: 1000
        });
    }
}

const validationField = ref({
    noteTitle: false,
    noteSelect: false,
    note: false,
})

function resetFields() {
    noteSelect.value = '';
    note.value = '';
    validationField.value.noteTitle = false;
    validationField.value.noteSelect = false;
    validationField.value.note = false;
}

onMounted(() => {
    const routeId = parseInt(route.params.id)
    bookData.value = myStore.books.find(item => item.id === routeId)

    if (bookData.value) {
        epubPath.value = new URL(`../assets/ebooks/${bookData.value.book}`, import.meta.url).href;
    }
    currentDate() 
})
</script>

<style lang="scss" scoped>
.book__name {
    font-size: 35px;
    font-weight: 700;
    text-align: center;
}

.read__book {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    margin-top: 30px;
    padding-bottom: 20px;

    aside {
        width: 30%;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .trasnlate__container {
            height: 300px;
            background-color: rgb(243, 135, 135);

            h3 {
                font-size: 25px;
                text-align: center;
                margin-bottom: 20px;
            }
        }

        hr {
            width: 100%;
        }

        .note__container {
            display: flex;
            flex-direction: column;
            gap: 20px;

            h3 {
                font-size: 25px;
                text-align: center;
                margin-bottom: 20px;
            }

            .noteTitle {
                width: 100%;
                border: 1px solid #051367;
                border-radius: 8px;
                padding: 10px 20px;

                &::placeholder {
                    color: #051367;
                }

                &:focus {
                    border: 1px solid #fe7f02;
                }
            }

            select {
                width: 100%;
                height: 40px;
                padding: 0px 20px;
                border-radius: 8px;
                font-size: 14px;
                border: 1px solid #051367;

                &:focus {
                    border: 1px solid #fe7f02;
                }

                &::placeholder {
                    color: red !important;
                }

                option {
                    color: #fe7f02;
                    font-size: 14px;
                }
            }

            textarea {
                width: 100%;
                border: 1px solid #051367;
                border-radius: 8px;
                padding: 10px 20px;
                height: 150px;
                resize: none;
                overflow-y: auto;

                &::-webkit-scrollbar {
                    width: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    background-color: #00c897;
                    border-radius: 20px;
                }

                &:focus {
                    border: 1px solid #fe7f02;
                }
            }

            .validation__info {
                color: red;
                font-size: 14px;
                padding: 10px;
            }
        }

    }

    .book__content {
        width: 70%;
        height: 80vh;
        box-shadow: 0 0 10px 4px #817d79;
        border-radius: 10px;
        overflow: hidden;

        .container {
            padding: 0;
        }
    }
}
</style>