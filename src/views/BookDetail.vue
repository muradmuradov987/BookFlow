<template>

    <div class="container">
        <section class="book__detail-cotainer">
            <aside>
                <div class="aside__details">
                    <div class="book__img">
                        <img :src="book?.imageSrc">
                    </div>
                    <h1>{{ book?.id }}</h1>
                </div>
            </aside>
            <div class="book___detail">

            </div>
        </section>
    </div>

</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useCounterStore } from "@/stores/counter";


const route = useRoute()
const myStore = useCounterStore();
const book = ref(null)

onMounted(async () => {
    const bookId = parseInt(route.params.id)
    book.value = myStore.books.find(item => item.id === bookId)
})
</script>

<style lang="scss" scoped>
.book__detail-cotainer {
    display: flex;

    aside {
        max-width: 250px;
        width: 100%;

        .aside__details {
            height: 300px;
            border: 1px solid red;

            .book__img {
                height: 100%;
                margin-bottom: 10px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain
                }
            }
        }
    }
}
</style>