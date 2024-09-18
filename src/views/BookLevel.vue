<template>
    <section class="container">
        <Breadcrumb>
            <template #title>
                {{ route.params.level }} books
            </template>
        </Breadcrumb>
        <div class="book__list">
            <BookCard v-for="book in bookLevelsData" :key="book.id" :id="book.id" :imageSrc="book.imageSrc"
                :name="book.name" :author="book.author" :level="book.level" />

            <h3 class="infoMsg" v-if="!bookLevelsData.length">{{ route.params.level }} level books not found</h3>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCounterStore } from "@/stores/counter";
import Breadcrumb from '@/components/UI/Breadcrumb.vue';
import BookCard from '@/components/BookCard/index.vue';

const myStore = useCounterStore();

const route = useRoute();
const bookLevelsData = ref([]);

function filteredBookLevels(newLevel) {
    bookLevelsData.value = myStore.books.filter(item => item.level == newLevel)
}


onMounted(() => {
    filteredBookLevels(route.params.level)
})

watch(() => route.params.level, (newLevel) => {
    filteredBookLevels(newLevel)
    
}
);



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