<template>

    <section class="container">
        <Breadcrumb>
            <template #title>
                My books
            </template>
            <template #breadcrumbs>
                <router-link to="/" class="breadcrumbs__link">Home</router-link>
                <img src="@/assets/img/plagins/right-arrow.png" alt="">
                <router-link to="/my-books" class="breadcrumbs__link">My books</router-link>
            </template>
        </Breadcrumb>

        <section>
            <h3 class="infoMsg" v-if="!myStore.auth">If you want to save your books, you must log in first.</h3>
            <h3 class="infoMsg" v-if="myStore.auth && !myStore.myBooks?.length">You don't have any books</h3>
        </section>

        <div class="book__list" v-if="myStore.auth">
            <BookCard v-for="book in myStore.myBooks" :key="book.id" :id="book.id" :imageSrc="book.imageSrc"
                :name="book.name" :author="book.author" :level="book.level" />
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

.infoMsg {
    font-size: 20px;
    height: 25vh;
}

@media (max-width: 767px) {
    .book__list {
        gap: 15px;
    }
}
</style>