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
                    <select v-model="lang">
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
                    <img class="star" v-if="output" src="@/assets/img/plugins/star.png" @click="copy">
                    <div class="select__dictionary">
                        <h3>Select dictionary</h3>
                        <select name="" id="">
                            <option value="">ss</option>
                            <option value="">ss</option>
                            <option value="">ss</option>
                        </select>
                        <Secondary>Add</Secondary>
                    </div>
                </div>
            </div>
        </section>
    </div>



</template>

<script setup>
import { ref, watch } from 'vue';
import { useCounterStore } from "@/stores/counter";
import Breadcrumb from '@/components/UI/Breadcrumb.vue';
import Secondary from '@/components/UI/Buttons/Secondary.vue';
import debounce from 'lodash/debounce';


const word = ref('')
const output = ref('')
const lang = ref('ru')



const translateText = async () => {
    if (!word.value.trim()) {
        output.value = '';
        return;
    }
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word.value)}&langpair=en|${lang.value}`);
        const data = await response.json();
        if (data.responseStatus == 200) {
            output.value = data.responseData.translatedText;
        } else {
            output.value = ''
        }
    } catch (error) {
        console.error(error);
    }
};

const debouncedTranslateText = debounce(translateText, 300);

function clear() {
    word.value = ''
}

function copy() {
    navigator.clipboard.writeText(output.value);
}


watch(word, debouncedTranslateText);



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
            min-height: 150px;
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
            min-height: 150px;
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
                height: 110px;
                background: #fff;
                border-radius: 10px;
                position: absolute;
                top: 5px;
                right: 25px;
                padding: 10px;
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
                    font-size: 18px;
                    font-weight: 700;
                    text-align: center;
                    line-height: 20px;
                }

                select {
                    width: 100%;
                    height: 25px;
                    padding: 0px 10px;
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

                button {
                    padding: 5px;
                    font-size: 14px;
                    font-weight: 700;
                }
            }

        }
    }
}
</style>