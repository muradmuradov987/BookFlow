<template>
    <section>
        <div class="container">
            <h1 class="book__name">Book Name</h1>
            <div class="read__book">
                <aside>
                    <div class="trasnlate__container"></div>
                    <div class="note__container"></div>
                </aside>
                <div class="book__content">
                    <h1>{{bookData?.book}}</h1>
                    <img :src="bookData?.book" >
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useCounterStore } from "@/stores/counter";

const route = useRoute()
const myStore = useCounterStore();

const bookData = ref(null)

onMounted(() => {
    const routeId = parseInt(route.params.id)
    bookData.value = myStore.books.find(item => item.id === routeId)
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
        height: 70vh;
        background: grey;
    }
}
</style>