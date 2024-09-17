<template>
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { useCounterStore } from "@/stores/counter";
import Secondary from '@/components/UI/Buttons/Secondary.vue';
import Swal from 'sweetalert2';


const route = useRoute()
const myStore = useCounterStore();

const book = ref(null)


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

    if (myStore.auth) {
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
    } else {
        Swal.fire({
            title: 'Login Required!',
            text: 'Please log in to access for write comment',
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

//Write comment tab
const choosenTab = ref('tab1')

function selectTab(tab) {
    choosenTab.value = tab
}
onMounted(() => {
    const routeId = parseInt(route.params.id)
    book.value = myStore.books.find(item => item.id === routeId)
})


</script>

<style lang="scss" scoped>
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


/*---------------Media Queries--------------*/
@media (max-width: 767px) {
    .book__detail-bottom {
        .tab__content {
            display: flex;
            flex-direction: column;
            padding: 20px 0;

            .person__comments {
                gap: 20px;

                .profile {
                    width: 80px;

                    div {
                        width: 30px;
                        height: 30px;
                    }

                    h3 {
                        font-size: 14px;
                    }

                }

                .desciption {

                    div {
                        display: flex;
                        justify-content: space-between;
                    }

                    .desc {
                        margin-top: 10px;
                        font-size: 14px;
                    }

                    .star {
                        font-size: 20px;
                    }

                    p {
                        font-size: 14px;
                    }
                }
            }

            .write__comment {
                gap: 20px;

                .comment__item {
                    h3 {
                        font-size: 18px;
                    }

                    .rate__container {
                        .star {
                            font-size: 20px;
                        }
                    }

                    textarea {
                        padding: 10px;
                    }
                }
            }

        }
    }
}
</style>