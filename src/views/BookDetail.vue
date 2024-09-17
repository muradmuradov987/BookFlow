<template>
    <div class="container">
        <h1 class="book__name">{{ book?.name }}</h1>
        <section class="book__detail-cotainer">
            <div class="book__detail-top">
                <aside>
                    <div class="aside__details">
                        <div class="book__img">
                            <img :src="book?.imageSrc">
                        </div>
                    </div>
                </aside>
                <div class="book___detail">
                    <div class="book__reviews">
                        <span>Reviews</span>
                        <div>
                            <span v-for="index in 5" :key="index"
                                :class="{ 'star': true, 'filled': index <= bookRate }">
                                ★
                            </span>
                        </div>
                    </div>
                    <hr>
                    <div class="book__items">
                        <div>
                            <span>Author</span> <span>{{ book?.author }}</span>
                        </div>
                        <div>
                            <span>Level</span> <span>{{ book?.level }}</span>
                        </div>
                        <div>
                            <span>Category</span> <span>{{ book?.cat }}</span>
                        </div>
                    </div>
                    <hr>
                    <div class="book__desc">
                        <h3>Description</h3>
                        <p>{{ book?.desc }} </p>
                    </div>
                    <div class="book__btns">
                        <Secondary>Read online</Secondary>
                        <Primary @click="addToMyBokks">Add to my books</Primary>
                    </div>
                </div>
            </div>
            <WriteComment />
        </section>

        <section class="smilar__books">
            <h1 class="section__name">The most similar books</h1>
            <div class="book__list">
                <BookCard v-for="book in similarBooks" :key="book.id" :id="book.id" :imageSrc="book.imageSrc"
                    :name="book.name" :author="book.author" :level="book.level" />
            </div>
        </section>
    </div>

</template>

<script setup>

import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useCounterStore } from "@/stores/counter";
import Primary from '@/components/UI/Buttons/Primary.vue';
import Secondary from '@/components/UI/Buttons/Secondary.vue';
import BookCard from '@/components/BookCard/index.vue';
import WriteComment from '@/components/WriteComment/index.vue';
import Swal from 'sweetalert2';



const route = useRoute()
const myStore = useCounterStore();
const book = ref(null)
const bookRate = ref(0)
const bookId = ref(route.params.id)

const similarBooks = ref([])

//AllData
function getAllData(id) {
    const routeId = parseInt(route.params.id)
    book.value = myStore.books.find(item => item.id === routeId)
    calculateAverageStarValue();
    getSimilarBooks()
}


//Review stars
function calculateAverageStarValue() {
    let sum = 0
    book.value.reviews.forEach(item => {
        sum = sum + item.star
    });
    const averageStarValue = sum / book.value.reviews.length;
    bookRate.value = Math.round(averageStarValue);
}




// Add to My Bokks
function addToMyBokks() {

    const exists = myStore.myBooks.some(obj => obj.id === book.value.id);

    if (myStore.auth) {
        if (exists) {
            Swal.fire({
                title: 'Already Added',
                text: 'This book is already in your favorites. You cannot add it again.',
                icon: 'warning',
                confirmButtonColor: '#00c897',
            });
        } else {
            myStore.myBooks.unshift(book.value)
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The book added",
                showConfirmButton: false,
                timer: 1000
            });
        }
    } else {
        Swal.fire({
            title: 'Login Required!',
            text: 'If you want to save your books, you must log in first.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00c897',
            confirmButtonText: 'Go to Login',
            cancelButtonText: 'Cancel',
            cancelButtonColor: 'red',
            preConfirm: () => {
                window.location.href = '/login';
            }
        });

    }

}


//Similar Books
function getSimilarBooks() {
    const filteredBooks = myStore.books.filter(item => item.cat === book.value.cat);
    similarBooks.value = filteredBooks.slice(0, 5);
};

onMounted(async () => {
    getAllData(bookId.value)
})

watch(() => route.params.id, (newId) => {
    bookId.value = newId;
    getAllData(newId);
}

);

</script>

<style lang="scss" scoped>
.book__name {
    font-size: 50px;
    margin-top: 30px;
    text-align: center;
}

.book__detail-cotainer {
    padding: 0 100px;

    .book__detail-top {
        display: flex;
        gap: 50px;

        aside {
            max-width: 250px;
            width: 100%;

            .aside__details {
                height: 350px;

                .book__img {
                    height: 100%;
                    margin-bottom: 10px;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }
            }
        }

        .book___detail {
            width: 100%;

            .book__reviews {
                display: flex;
                justify-content: space-between;
                font-size: 20px;

                .star {
                    font-size: 24px;
                    color: lightgray;
                }

                .filled {
                    color: #fe7f02;
                }
            }

            .book__items {
                display: flex;
                flex-direction: column;
                gap: 10px;

                div {
                    display: flex;
                    justify-content: space-between;

                    span {
                        font-size: 20px;

                        &:nth-child(2) {
                            color: #fe7f02;
                        }
                    }
                }


            }

            .book__desc {
                h3 {
                    font-size: 20px;
                    margin-bottom: 10px;
                }

                p {
                    height: 112px;
                    overflow: hidden;
                }
            }

            .book__btns {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }

            hr {
                opacity: .25;
                margin: 10px 0;
            }
        }
    }




}

.smilar__books {
    .section__name {
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 30px;
    }

    .book__list {
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
    }
}


/*---------------Media Queries--------------*/
@media (max-width: 767px) {
    .book__name {
        font-size: 30px;
        margin-top: 20px;
    }

    .book__detail-cotainer {
        padding: 0;

        .book__detail-top {
            flex-direction: column;
            gap: 20px;

            aside {
                max-width: unset;

                .aside__details {
                    height: 350px;
                }
            }

            .book___detail {
                .book__reviews {
                    font-size: 18px;

                    .star {
                        font-size: 16px;
                    }
                }

                .book__items {
                    div {
                        span {
                            font-size: 18px;
                        }
                    }
                }

                .book__desc {
                    h3 {
                        font-size: 18px;
                    }

                    p {
                        text-align: justify;
                    }
                }
            }
        }
    }

    .smilar__books {
        .section__name {
            font-size: 20px;
        }

        .book__list {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
    }


}

@media (min-width: 768px) and (max-width: 1200px) {

    .book__detail-cotainer {
        padding: 0;

        .book__detail-top {
            gap: 20px;
        }

    }
}
</style>