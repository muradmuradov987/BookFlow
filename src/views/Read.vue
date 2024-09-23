<template>
    <section>
        <div class="container">
            <h1 class="book__name">{{bookData.name}}</h1>
            <div class="read__book">
                <aside>
                    <div class="trasnlate__container"></div>
                    <div class="note__container"></div>
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
const route = useRoute()
const myStore = useCounterStore();


const bookData = ref(null)


const epubPath = ref('');

onMounted(() => {
    const routeId = parseInt(route.params.id)
    bookData.value = myStore.books.find(item => item.id === routeId)

    if (bookData.value) {
        epubPath.value = new URL(`../assets/ebooks/${bookData.value.book}`, import.meta.url).href;
    }
})
</script>

<style lang="scss" scoped>
.book__name {
    font-size: 35px;
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

        .trasnlate__container {
            height: 300px;
            background-color: red;
        }

        .note__container {
            margin-top: 30px;
            height: 300px;
            background: black;
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