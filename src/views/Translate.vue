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
            <textarea v-model="word"></textarea>
            <div class="output__container">
                <div class="select">
                    <select v-model="lang">
                        <option selected value="en">ensss</option>
                        <option value="a">aaa</option>
                        <option value="v">aaa</option>
                    </select>
                </div>
                <div class="output">
                    {{ output }}
                </div>
            </div>
        </section>
    </div>



</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCounterStore } from "@/stores/counter";
import Breadcrumb from '@/components/UI/Breadcrumb.vue';
const myStore = useCounterStore();


const word = ref('hello')
const output = ref('')
const lang = ref('en')

const key = ref("AQVN3o4qbIdVhkrYcVa18DoJeZoLSutuUgVnRR-J")




const translateText = async () => {
    // try {
    //     const response = await fetch(`https://translate.api.cloud.yandex.net/translate/v2/translate?key=${key.value}&text=${encodeURIComponent(word.value)}&lang=en-ru`);
    //     const data = await response.json();

    //     if (!response.ok) {
    //         throw new Error(data.message || 'Çeviri hatası');
    //     }

    //     console.log(data);
        
    //     // translatedText.value = data.text[0];


    // } catch (error) {
    //     console.error('Çeviri hatası:', error);
    // }
};


onMounted(() => {
    translateText()

})

</script>

<style lang="scss" scoped>
.translate__container {
    display: flex;
    gap: 30px;
    padding: 0 100px;

    textarea {
        margin-top: 50px;
        width: 50%;
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

    .output__container {
        width: 50%;
        height: 100%;

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
        }
    }
}
</style>