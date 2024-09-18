<template>
    <div class="search__nav">
        <div class="container">
            <div class="search__nav-container">
                <div class="categories">
                    <h5>Levels</h5>
                    <img src="@/assets/img/plugins/book.png" alt="">
                    <ul class="categories__collapse">
                        <li @click="navigateToLevel('Starter')">Starter</li>
                        <li @click="navigateToLevel('Elementary')">Elementary</li>
                        <li @click="navigateToLevel('Pre-intermediate')">Pre-intermediate</li>
                        <li @click="navigateToLevel('Intermediate')">Intermediate</li>
                        <li @click="navigateToLevel('Intermediate-plus')">Intermediate-plus</li>
                        <li @click="navigateToLevel('Advanced')">Advanced</li>
                    </ul>
                </div>
                <div class="search__box-container">
                    <input type="text" placeholder="search book..." v-model="searchQuery"
                        :class="{ activeSearch: filteredBooks.length > 0 }" />
                    <div class="search__result" v-if="filteredBooks.length > 0">
                        <RouterLink class="result__book" v-for="item in filteredBooks" :key="item.id"
                            :to="{ name: 'book-detail', params: { id: item.id } }">
                            <div class="book__item">
                                <div class="book__img">
                                    <img :src="item.imageSrc">
                                </div>
                                <div class="book__author">
                                    <h3>{{ item.name }}</h3>
                                    <p>{{ item.author }}</p>
                                </div>
                            </div>
                            <div class="book__level">
                                <h3>{{ item.cat }}</h3>
                                <p>{{ item.level }}</p>
                            </div>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import { useCounterStore } from "@/stores/counter";
const myStore = useCounterStore();
const router = useRouter();
const route = useRoute()


const navigateToLevel = (level) => {
    router.push({ name: 'book-level', params: { level } });
};

const searchQuery = ref('');


const filteredBooks = computed(() => {
    if (!searchQuery.value) return [];
    return myStore.books.filter(book =>
        book.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

watch(() => route.params.id, (newId) => {
    if (newId) {
        searchQuery.value = ''
    }
}
);



</script>

<style lang="scss" scoped>
.search__nav {
    padding: 5px 0px;
    background: linear-gradient(to top, #fc4a1a, #f7b733);

    .search__nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;

        .categories {
            width: 250px;
            z-index: 2;
            padding: 0px 20px;
            border-radius: 8px;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.265);
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            cursor: pointer;

            h5 {
                margin: 0;
                color: white;
            }

            img {
                width: 25px;
            }

            .categories__collapse {
                display: none;
                position: absolute;
                width: 100%;
                max-height: 300px;
                margin: 0;
                padding: 5px 15px;
                top: 40px;
                left: 0;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                backdrop-filter: blur(8px);
                background-color: rgba(0, 0, 0, 0.265);
                box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
                overflow-y: scroll;
                z-index: 1;

                &::-webkit-scrollbar {
                    width: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    background-color: #00c897;
                    border-radius: 20px;
                }

                li {
                    padding: 10px 5px;
                    transition: 0.3s ease;
                    border-radius: 5px;
                    color: white;

                    &:hover {
                        background: white;
                        color: black;
                    }
                }
            }

            &:hover {
                border-bottom-left-radius: 0px;
                border-bottom-right-radius: 0px;

                .categories__collapse {
                    display: block;
                }
            }


        }

        .search__box-container {
            position: relative;
            max-width: 400px;
            width: 100%;

            input {
                width: 100%;
                height: 30px;
                border-radius: 7px;
                border: none;
                transition: 0.5s ease;
                outline: none;
                padding: 20px;
                font-size: 16px;

            }

            .activeSearch {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
            }

            .search__result {
                position: absolute;
                width: 100%;
                max-height: 300px;
                background-color: #fff;
                box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
                overflow-y: auto;
                z-index: 2;
                border-bottom-left-radius: 7px;
                border-bottom-right-radius: 7px;
                display: flex;
                flex-direction: column;
                gap: 10px;

                &::-webkit-scrollbar {
                    width: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    background-color: #00c897;
                    border-radius: 20px;
                }

                .result__book {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px;
                    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
                    transition: 0.2s ease;

                    &:hover {
                        background-color: rgba(0, 0, 0, 0.165);
                    }

                    .book__item {
                        display: flex;
                        gap: 10px;

                        .book__img {
                            width: 40px;
                            height: 70px;

                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                        }

                        .book__author {
                            h3 {
                                font-size: 18px;
                            }

                            p {
                                margin-top: 10px;
                                color: #fc4a1a;
                            }
                        }

                    }

                    .book__level {
                        h3 {
                            font-size: 18px;
                        }

                        p {
                            margin-top: 10px;
                            color: #fc4a1a;
                        }
                    }
                }
            }
        }


    }
}

@media (max-width: 768px) {
    .search__nav {
        padding: 10px 0px;
        background: linear-gradient(to top, #fc4a1a, #f7b733);

        .search__nav-container {
            flex-direction: column;
            justify-content: unset;
            align-items: unset;
            gap: 10px;

            .categories {
                width: 100%;
            }

            .search__box {
                max-width: 768px;
            }
        }
    }
}
</style>