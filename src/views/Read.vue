<template>
    <section>
        <div class="container">
            <h1 class="book__name">{{ bookData?.name }}</h1>
            <div class="read__book">
                <aside>
                    <div class="translate__container">
                        <h3>Translate</h3>
                        <div class="textarea">
                            <div class="textarea__nav">
                                <div class="select">
                                    <select v-model="lang" @change="translateText">
                                        <option selected value="ru">Ru</option>
                                        <option value="tr">Tr</option>
                                        <option value="fr">Fr</option>
                                        <option value="De">Gr</option>
                                        <option value="it">It</option>
                                    </select>
                                </div>
                                <img src="@/assets/img/plugins/clear.png" @click="clear">
                            </div>
                            <textarea v-model="word" @keyup="debouncedTranslateText"></textarea>
                        </div>
                        <div class="output__container">

                            <div class="output">
                                {{ output }}
                                <img class="copy" v-if="output" src="@/assets/img/plugins/copy.png" @click="copy">
                                <img class="star" v-if="output && myStore.auth" src="@/assets/img/plugins/star.png"
                                    @click="addToDictionaryList">
                                <div class="select__dictionary" v-if="showDictionary && output">
                                    <img src="@/assets/img/plugins/close.png" @click="closeDictionaryList">
                                    <div v-if="myStore?.myDictionary.length == 0">
                                        <h3>Write dictionary name</h3>
                                        <input type="text" v-model="dictionaryName">
                                        <div class="validation__info"
                                            v-if="validationField.dictionaryTitle && !dictionaryName">
                                            Can't be empty</div>
                                    </div>
                                    <div v-if="myStore?.myDictionary.length">
                                        <h3>Select dictionary</h3>
                                        <select v-model="dictionarySelect" v-if="myStore?.myDictionary.length">
                                            <option value="" disabled selected hidden>Please Choose...</option>
                                            <option :value="item.id" v-for="item in myStore.myDictionary">{{
                                                item?.dictionaryName }}
                                            </option>
                                        </select>
                                        <div class="validation__info"
                                            v-if="validationField.dictionarySelect && !dictionarySelect">
                                            Can't be empty</div>
                                    </div>
                                    <Secondary @click="saveDictionary">Add</Secondary>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="note__container">
                        <h3>Add note</h3>
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
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useCounterStore } from "@/stores/counter";
import VueReader from 'vue-reader';
import Secondary from '@/components/UI/Buttons/Secondary.vue';
import debounce from 'lodash/debounce';
import Swal from 'sweetalert2';
const route = useRoute()
const myStore = useCounterStore();




const word = ref('')
const output = ref('')
const lang = ref('ru')

const dictionaryName = ref('')
const dictionarySelect = ref('')

const translateText = async () => {
    if (!word.value.trim()) {
        output.value = '';
        return;
    }
    try {
        dictionarySelect.value = ''
        output.value = ''
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word.value)}&langpair=en|${lang.value}`);
        const data = await response.json();
        if (data.responseStatus == 200) {
            output.value = data.responseData.translatedText;
            showDictionary.value = false
        } else {
            output.value = ''
        }
    } catch (error) {
        console.error(error);
    }
};

const debouncedTranslateText = debounce(translateText, 200,);

function clear() {
    word.value = ''
    showDictionary.value = false
    dictionarySelect.value = ''
    output.value = ''
}

function copy() {
    navigator.clipboard.writeText(output.value);
}

const showDictionary = ref(true)

function addToDictionaryList() {
    showDictionary.value = true
}
function closeDictionaryList() {
    showDictionary.value = false
    validationField.value.dictionarySelect = false;
    validationField.value.dictionaryTitle = false;
    dictionaryName.value = ''
    dictionarySelect.value = ''
}

function saveDictionary() {
    if (myStore.myDictionary.length) {
        if (!dictionarySelect.value) {
            validationField.value.dictionarySelect = true;
            return
        } else {
            let data = myStore.myDictionary.find(item => item.id == dictionarySelect.value)
            data.dictionaryList.unshift({
                id: new Date(),
                input: word.value,
                output: output.value
            })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The dictionary added",
                showConfirmButton: false,
                timer: 1000
            });
            showDictionary.value = false
            dictionarySelect.value = ''
        }
    } else {
        if (!dictionaryName.value) {
            validationField.value.dictionaryTitle = true;
            return
        } else {
            myStore.myDictionary.unshift({
                id: new Date(),
                dictionaryName: dictionaryName.value,
                date: formattedDate.value,
                dictionaryList: [{
                    id: new Date(),
                    input: word.value,
                    output: output.value
                }]
            })
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "New dictionary created",
                showConfirmButton: false,
                timer: 1000
            });
            showDictionary.value = false
            dictionaryName.value = ''
            dictionarySelect.value = ''

        }
    }
}


watch(word, debouncedTranslateText);





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
    if (myStore.auth) {
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
    } else {
        Swal.fire({
            title: 'Login Required!',
            text: 'Please log in to access for write comment',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00c897',
            confirmButtonText: 'Go to Login',
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'red',
            preConfirm: () => {
                window.location.href = '/login';
            }
        });
    }
}

const validationField = ref({
    noteTitle: false,
    noteSelect: false,
    note: false,
    dictionaryTitle: false,
    dictionarySelect: false,
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

        .translate__container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            background: #fff;
            box-shadow: 0 0 10px 4px #817d79;
            border-radius: 10px;
            padding: 20px 10px;

            h3 {
                font-size: 25px;
                text-align: center;
            }

            .textarea {
                .textarea__nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .select {
                        select {
                            height: 30px;
                            padding: 0px 20px;
                            border-radius: 8px;
                            font-size: 14px;
                            border: 1px solid #051367;
                            font-weight: 700;

                            &:focus {
                                border: 1px solid #fe7f02;
                            }

                            option {
                                color: #fe7f02;
                                font-size: 14px;
                            }
                        }
                    }

                    img {
                        width: 25px;
                        height: auto;
                        cursor: pointer;
                    }
                }

                textarea {
                    width: 100%;
                    min-height: 120px;
                    margin-top: 20px;
                    border: 1px solid #051367;
                    border-radius: 8px;
                    padding: 10px 20px;
                    resize: none;
                    font-size: 16px;
                    overflow-y: auto;
                    line-height: 30px;
                    font-size: 25px;

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


            }

            .output__container {
                .output {
                    min-height: 180px;
                    background: #c0c0c079;
                    border-radius: 8px;
                    padding: 10px 20px 30px 10px;
                    line-height: 30px;
                    font-size: 25px;
                    overflow: hidden;
                    position: relative;

                    .copy {
                        width: 25px;
                        position: absolute;
                        right: 10px;
                        bottom: 5px;
                        cursor: pointer;
                        transition: 0.3s ease;

                        &:active {
                            transform: translateY(4px);
                        }
                    }

                    .star {
                        width: 20px;
                        position: absolute;
                        right: 45px;
                        bottom: 8px;
                        cursor: pointer;
                        transition: 0.3s ease;

                        &:active {
                            transform: translateY(4px);
                        }
                    }

                    .select__dictionary {
                        width: 200px;
                        min-height: 120px;
                        background: #fff;
                        border-radius: 10px;
                        position: absolute;
                        bottom: 45px;
                        right: 25px;
                        padding: 10px 15px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        &::before {
                            content: '';
                            width: 0px;
                            height: 0px;
                            border-width: 10px 10px 0 10px;
                            border-style: solid;
                            border-color: #Fff transparent transparent transparent;
                            position: absolute;
                            bottom: -9px;
                            right: 25px;
                        }

                        h3 {
                            font-size: 14px;
                            font-weight: 700;
                            text-align: center;
                            line-height: 20px;
                        }

                        select {
                            width: 100%;
                            height: 25px;
                            padding: 0px 10px;
                            border-radius: 8px;
                            font-size: 12px;
                            border: 1px solid #051367;
                            font-weight: 700;

                            &:focus {
                                border: 1px solid #fe7f02;
                            }

                            option {
                                color: #fe7f02;
                                font-size: 14px;
                            }
                        }

                        input {
                            width: 100%;
                            height: 25px;
                            padding: 0px 10px;
                            border-radius: 8px;
                            font-size: 12px;
                            border: 1px solid #051367;
                            font-weight: 700;

                            &:focus {
                                border: 1px solid #fe7f02;
                            }
                        }


                        button {
                            padding: 5px;
                            font-size: 14px;
                            font-weight: 700;
                        }

                        img {
                            width: 15px;
                            position: absolute;
                            right: 5px;
                            top: 5px;
                            cursor: pointer;
                        }
                    }
                }
            }

            .validation__info {
                color: red;
                font-size: 12px;
                padding: 3px;
                line-height: 10px;
            }
        }

        hr {
            width: 100%;
        }

        .note__container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            background: #fff;
            box-shadow: 0 0 10px 4px #817d79;
            border-radius: 10px;
            padding: 20px 10px;

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
        height: 700px;
        box-shadow: 0 0 10px 4px #817d79;
        border-radius: 10px;
        overflow: hidden;

        .container {
            padding: 0;
        }
    }


}

@media (max-width: 850px) {
    .read__book {
        flex-direction: column-reverse;
        justify-content: unset;

        aside {
            width: 100%;

            .translate__container {
                display: flex;
                flex-direction: column;
                gap: 20px;
                background: #fff;
                box-shadow: 0 0 10px 4px #817d79;
                border-radius: 10px;
                padding: 20px 10px;

                h3 {
                    font-size: 25px;
                    text-align: center;
                }

                .textarea {
                    .textarea__nav {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .select {
                            select {
                                height: 30px;
                                padding: 0px 20px;
                                border-radius: 8px;
                                font-size: 14px;
                                border: 1px solid #051367;
                                font-weight: 700;

                                &:focus {
                                    border: 1px solid #fe7f02;
                                }

                                option {
                                    color: #fe7f02;
                                    font-size: 14px;
                                }
                            }
                        }

                        img {
                            width: 25px;
                            height: auto;
                            cursor: pointer;
                        }
                    }

                    textarea {
                        width: 100%;
                        min-height: 120px;
                        margin-top: 20px;
                        border: 1px solid #051367;
                        border-radius: 8px;
                        padding: 10px 20px;
                        resize: none;
                        font-size: 16px;
                        overflow-y: auto;
                        line-height: 30px;
                        font-size: 25px;

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


                }

                .output__container {
                    .output {
                        min-height: 180px;
                        background: #c0c0c079;
                        border-radius: 8px;
                        padding: 10px 20px 30px 10px;
                        line-height: 30px;
                        font-size: 25px;
                        overflow: hidden;
                        position: relative;

                        .copy {
                            width: 25px;
                            position: absolute;
                            right: 10px;
                            bottom: 5px;
                            cursor: pointer;
                            transition: 0.3s ease;

                            &:active {
                                transform: translateY(4px);
                            }
                        }

                        .star {
                            width: 20px;
                            position: absolute;
                            right: 45px;
                            bottom: 8px;
                            cursor: pointer;
                            transition: 0.3s ease;

                            &:active {
                                transform: translateY(4px);
                            }
                        }

                        .select__dictionary {
                            width: 200px;
                            min-height: 120px;
                            background: #fff;
                            border-radius: 10px;
                            position: absolute;
                            bottom: 45px;
                            right: 25px;
                            padding: 10px 15px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;

                            &::before {
                                content: '';
                                width: 0px;
                                height: 0px;
                                border-width: 10px 10px 0 10px;
                                border-style: solid;
                                border-color: #Fff transparent transparent transparent;
                                position: absolute;
                                bottom: -9px;
                                right: 25px;
                            }

                            h3 {
                                font-size: 14px;
                                font-weight: 700;
                                text-align: center;
                                line-height: 20px;
                            }

                            select {
                                width: 100%;
                                height: 25px;
                                padding: 0px 10px;
                                border-radius: 8px;
                                font-size: 12px;
                                border: 1px solid #051367;
                                font-weight: 700;

                                &:focus {
                                    border: 1px solid #fe7f02;
                                }

                                option {
                                    color: #fe7f02;
                                    font-size: 14px;
                                }
                            }

                            input {
                                width: 100%;
                                height: 25px;
                                padding: 0px 10px;
                                border-radius: 8px;
                                font-size: 12px;
                                border: 1px solid #051367;
                                font-weight: 700;

                                &:focus {
                                    border: 1px solid #fe7f02;
                                }
                            }


                            button {
                                padding: 5px;
                                font-size: 14px;
                                font-weight: 700;
                            }

                            img {
                                width: 15px;
                                position: absolute;
                                right: 5px;
                                top: 5px;
                                cursor: pointer;
                            }
                        }
                    }
                }

                .validation__info {
                    color: red;
                    font-size: 12px;
                    padding: 3px;
                    line-height: 10px;
                }
            }
        }

        .book__content {
            width: 100%;
            height: 600px;
        }
    }
}
</style>