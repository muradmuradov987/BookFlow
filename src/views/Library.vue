<template>

    <section class="container">
        <Breadcrumb>
            <template #title>
                Library
            </template>
            <template #breadcrumbs>
                <router-link to="/" class="breadcrumbs__link">Home</router-link>
                <img src="@/assets/img/plugins/right-arrow.png" alt="">
                <router-link to="/library" class="breadcrumbs__link">Library</router-link>
            </template>
        </Breadcrumb>

        <div class="book__list">
            <BookCard v-for="book in myStore.books" :key="book.id" :id="book.id" :imageSrc="book.imageSrc" :name="book.name"
                :author="book.author" :level="book.level" />
        </div>

    </section>


</template>

<script setup>

import Breadcrumb from '@/components/UI/Breadcrumb.vue';
import BookCard from '@/components/BookCard/index.vue';
import { useCounterStore } from "@/stores/counter";
const myStore = useCounterStore();


</script>

<style lang="scss" scoped>
.book__list {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    margin-top: 50px;
}

@media (max-width: 767px) {
    .book__list {
        gap: 15px;
    }
}
</style>