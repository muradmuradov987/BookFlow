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
                        <Primary>Add to my books</Primary>
                    </div>
                </div>
            </div>
            <div class="book__detail-bottom">
                <ul class="tab__nav">
                    <li @click="selectTab('tab1')" :class="{ 'active__link': choosenTab === 'tab1' }">Reviews
                        ({{ book?.reviews?.length }})</li>
                    <li @click="selectTab('tab2')" :class="{ 'active__link': choosenTab === 'tab2' }">Write comment</li>
                </ul>
                <div v-if="choosenTab === 'tab1'" class="tab__content">
                    <div class="person__comments" v-for="item in book?.reviews">
                        <div class="profile">
                            <div>
                                <img src="@/assets/img/plagins/user.png" alt="">
                            </div>
                            <h3>{{ item?.personName }}</h3>
                        </div>
                        <div class="desciption">
                            <div>
                                <div>
                                    <div class="stars">
                                        <span v-for="index in 5" :key="index"
                                            :class="{ 'star': true, 'filled': index <= item?.star }">
                                            ★
                                        </span>
                                    </div>
                                </div>
                                <p>{{ item?.date }}</p>
                            </div>
                            <p class="desc">{{ item?.comment }}</p>
                        </div>
                    </div>
                    <p v-if="!book?.reviews?.length">No reviews</p>
                </div>
                <div v-if="choosenTab === 'tab2'" class="tab__content">
                    <div class="write__comment">
                        <div class="comment__item">
                            <h3>Rating</h3>
                            <div class="rate__container">
                                <div v-for="star in 5" class="star"
                                    :class="{ hover: hoverRating >= star, selected: rating >= star }"
                                    @mouseenter="handleMouseEnter(star)" @mouseleave="handleMouseLeave"
                                    @click="handleClick(star)">
                                    ★
                                </div>
                            </div>
                        </div>
                        <div class="comment__item">
                            <h3>Your Review</h3>
                            <textarea placeholder="Your Review" v-model="yourReview"></textarea>
                        </div>
                        <div>
                            <Secondary @click="addReview">Add review</Secondary>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
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


const route = useRoute()
const myStore = useCounterStore();
const book = ref(null)
const bookRate = ref(0)
const bookId = ref(route.params.id)



const similarBooks = ref([])


const rating = ref(0);
const hoverRating = ref(0);
const yourReview = ref("");




//Rate star
const handleMouseEnter = (value) => {
    hoverRating.value = value;
};
const handleMouseLeave = () => {
    hoverRating.value = 0;
};
const handleClick = (value) => {
    rating.value = value;
};
function addReview() {
    const today = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);
    let obj = {
        "personName": "Username",
        "star": rating.value,
        "date": formattedDate,
        "comment": yourReview.value
    }
    book.value.reviews.unshift(obj)
    rating.value = 0
    yourReview.value = ""
}




//AllData
function getAllData(id) {
    const bookId = parseInt(route.params.id)
    book.value = myStore.books.find(item => item.id === bookId)
    calculateAverageStarValue();
    getSimilarBooks()
}

//Write comment tab
const choosenTab = ref('tab1')
function selectTab(tab) {
    choosenTab.value = tab
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

    .book__detail-bottom {
        margin-top: 50px;

        .tab__nav {
            display: flex;
            justify-content: center;
            border-bottom: 1px solid #0514671a;

            li {
                padding: 10px;
                cursor: pointer;
            }

            .active__link {
                border: 1px solid #0514671a;
                color: #fe7f02;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                border-bottom: 1px solid #fff;
                margin-bottom: -1px;
            }
        }

        .tab__content {
            display: flex;
            flex-direction: column;
            gap: 40px;
            padding: 30px 0;

            .person__comments {
                display: flex;
                gap: 40px;

                .profile {
                    width: 150px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;

                    div {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        border: 1px solid #00c897;
                        padding: 5px;

                        img {
                            width: 100%;
                        }
                    }

                    h3 {
                        margin-top: 10px;
                    }

                }

                .desciption {
                    width: 100%;

                    div {
                        display: flex;
                        justify-content: space-between;
                    }

                    .desc {
                        margin-top: 20px;
                        color: #C0C0C0;
                        font-style: italic;
                        line-height: 20px;
                    }



                    .star {
                        font-size: 24px;
                        color: lightgray;
                        margin: 0 2px;
                    }

                    .filled {
                        color: #fe7f02;
                    }
                }
            }

            .write__comment {
                display: flex;
                flex-direction: column;
                gap: 40px;

                .comment__item {
                    h3 {
                        font-size: 20px;
                        margin-bottom: 10px;
                    }

                    .rate__container {
                        display: flex;
                        gap: 5px;

                        .star {
                            font-size: 25px;
                            cursor: pointer;
                            color: #ccc;
                            display: flex;
                        }

                        .star.hover,
                        .star.selected {
                            color: #fe7f02;
                        }
                    }

                    textarea {
                        width: 100%;
                        height: 100px;
                        resize: none;
                        font-size: 14px;
                        border-radius: 8px;
                        padding: 10px 20px;

                        &:focus {
                            box-shadow: none;
                            border: 1px solid #fe7f02;
                        }
                    }
                }
            }

        }

        hr {
            opacity: 0.25;
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
</style>