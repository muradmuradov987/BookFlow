<template>
    <div class="book__card">
        <RouterLink :to="{ name: 'book-detail', params: { id: id } }">
            <div class="book__img">
                <img :src="imageSrc" alt="" />
                <img src="@/assets/img/plugins/trash.png" class="removeBtn" v-if="showDeleteButton" @click="deleteBook">
            </div>
            <h4 class="book__name">{{ name }} </h4>
            <p class="book__author">{{ author }}</p>
            <p class="book__level">{{ level }}</p>
        </RouterLink>

    </div>
</template>

<script setup>

import { defineProps } from 'vue'
import { useCounterStore } from "@/stores/counter";
const myStore = useCounterStore();


const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    showDeleteButton: {
        type: Boolean,
        default: false
    },
})

const deleteBook = (e) => {
    e.preventDefault()
    const index = myStore.myBooks.findIndex(item => item.id === props.id)
    if (index !== -1) {
        myStore.myBooks.splice(index, 1);
    }
};


</script>

<style lang="scss" scoped>
.book__card {
    max-width: 190px;
    width: 100%;
    .book__img {
        height: 290px;
        box-shadow: 0 0 10px 4px #817d79;
        overflow: hidden;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .removeBtn {
            position: absolute;
            top: -25px;
            right: 0;
            cursor: pointer;
            width: 25px;
            height: 25px;
            transition: 0.5s ease;
        }

        &:hover {
            .removeBtn {
                top: 5px;
            }
        }
    }

    .book__name {
        margin-top: 10px;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 25px;
    }

    .book__author {
        margin-top: 5px;
        font-size: 14px;
        color: #C0C0C0;
    }

    .book__level {
        margin-top: 5px;
        font-size: 12px;
        color: #C0C0C0;
    }


}


@media (max-width: 767px) {
    .book__card {
        max-width: unset;
        width: 47%;

        .book__img {
            height: 300px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .book__name {
            margin-top: 5px;
            font-size: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 25px;
        }

        .book__author {
            margin-top: 5px;
            font-size: 14px;
            color: #C0C0C0;
        }

        .book__level {
            margin-top: 5px;
            font-size: 12px;
            color: #C0C0C0;
        }
    }
}
</style>