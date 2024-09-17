<template>
    <div>
        <h1>{{ bookLevelsData }}</h1>
        <!-- <li v-for="item in filteredBookLevels" :key="item.id">{{ item.name }}</li> -->
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCounterStore } from "@/stores/counter";
const myStore = useCounterStore();

const route = useRoute();


const bookLevel = ref(route.params.level)

const bookLevelsData = ref([]);


function filteredBookLevels(newLevel) {
    bookLevelsData.value = myStore.books.filter(item => item.level == newLevel)
}


onMounted(async () => {
    filteredBookLevels(bookLevel)
    console.log(bookLevel.value);
    
})

watch(() => route.params.level, (newLevel) => {
    filteredBookLevels(newLevel)
}
);



</script>

<style lang="scss" scoped></style>