<template>
    <Breadcrumb>
        <template #title>
            Translate
        </template>
        <template #breadcrumbs>
            <router-link to="/" class="breadcrumbs__link">Home</router-link>
            <img src="@/assets/img/plugins/right-arrow.png" alt="">
            <router-link to="/translate" class="breadcrumbs__link">Translate</router-link>
        </template>
    </Breadcrumb>
    <div class="container">
        <section class="translate__container">
            <div class="textarea">
                <img src="@/assets/img/plugins/clear.png" @click="clear">
                <textarea v-model="word" @keyup="debouncedTranslateText"></textarea>
            </div>
            <div class="output__container">
                <div class="select">
                    <select v-model="lang" @change="translateText">
                        <option selected value="ru">Ru</option>
                        <option value="tr">Tr</option>
                        <option value="fr">Fr</option>
                        <option value="De">Gr</option>
                        <option value="it">It</option>
                    </select>
                </div>
                <div class="output">
                    {{ output }}
                    <img class="copy" v-if="output" src="@/assets/img/plugins/copy.png" @click="copy">
                    <img class="star" v-if="output" src="@/assets/img/plugins/star.png" @click="addToDictionaryList">
                    <div class="select__dictionary" v-if="showDictionary && output">
                        <img src="@/assets/img/plugins/close.png" @click="closeDictionaryList">
                        <div v-if="myStore?.myDictionary.length == 0">
                            <h3>Write dictionary name</h3>
                            <input type="text" v-model="dictionaryName">
                            <div class="validation__info" v-if="validationField.dictionaryTitle && !dictionaryName">
                                Can't be empty</div>
                        </div>
                        <div v-if="myStore?.myDictionary.length">
                            <h3>Select dictionary</h3>
                            <select v-model="dictionarySelect" v-if="myStore?.myDictionary.length">
                                <option value="" disabled selected hidden>Please Choose...</option>
                                <option :value="item.id" v-for="item in myStore.myDictionary">{{ item?.dictionaryName }}
                                </option>
                            </select>
                            <div class="validation__info" v-if="validationField.dictionarySelect && !dictionarySelect">
                                Can't be empty</div>
                        </div>

                        <Secondary @click="saveDictionary">Add</Secondary>
                    </div>
                </div>
            </div>
        </section>
    </div>



</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useCounterStore } from "@/stores/counter";
import Breadcrumb from '@/components/UI/Breadcrumb.vue';
import Secondary from '@/components/UI/Buttons/Secondary.vue';
import debounce from 'lodash/debounce';
import Swal from 'sweetalert2';

const myStore = useCounterStore();


const formattedDate = ref(null)

function currentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    formattedDate.value = `${day}.${month}.${year}`;
}

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

const debouncedTranslateText = debounce(translateText, 100,);


function clear() {
    word.value = ''
    showDictionary.value = false
    dictionarySelect.value = ''
    output.value = ''
}

function copy() {
    navigator.clipboard.writeText(output.value);
}

const validationField = ref({
    dictionaryTitle: false,
    dictionarySelect: false,
})

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
        }
    }
}


watch(word, debouncedTranslateText);


onMounted(() => {
    currentDate()
})
</script>

<style lang="scss" scoped>
.translate__container {
    display: flex;
    gap: 30px;
    padding: 0 100px;

    .textarea {
        width: 50%;
        position: relative;

        textarea {
            width: 100%;
            min-height: 180px;
            margin-top: 50px;
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

        img {
            position: absolute;
            width: 25px;
            top: 20px;
            right: 0;
            cursor: pointer;
        }
    }

    .output__container {
        width: 50%;

        .select {
            text-align: end;
            margin-bottom: 10px;

            select {
                width: 50%;
                height: 40px;
                padding: 0px 20px;
                border-radius: 8px;
                font-size: 14px;
                border: 1px solid #051367;
                font-weight: 700;

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
        }

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

/*---------------Media Queries--------------*/
@media (max-width: 767px) {
    .translate__container {
        flex-direction: column;
        padding: 0;

        .textarea {
            width: 100%;
        }

        .output__container {
            width: 100%;

            .select {
                text-align: end;
                margin-bottom: 10px;

                select {
                    width: 25%;
                }
            }
        }
    }
}
</style>