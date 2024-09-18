<template>
    <div class="hero__slider">
        <Swiper :modules="[Pagination, Autoplay]" pagination grabCursor autoplay loop>
            <SwiperSlide>
                <div class="slide__img">
                    <img src="@/assets/img/hero-slider/slider-1.jpg" alt="">
                    <div class="overlay">
                        <h1>LOTS OF EBOOKS. 100 % FREE</h1>
                        <p>Welcome to your friendly neighborhood library. We have more than 50,000 free ebooks waiting
                            to be discovered.</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="slide__img">
                    <img src="@/assets/img/hero-slider/slider-2.jpg" alt="">
                    <div class="overlay">
                        <h1>FREE AND DISCOUNTED BESTSELLERS</h1>
                        <p>Join 150,000+ fellow readers. Get free and discounted bestsellers straight to your inbox with
                            the ManyBooks eBook deals newsletter.</p>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div class="slide__img">
                    <img src="@/assets/img/hero-slider/slider-3.jpg" alt="">
                    <div class="overlay">
                        <h1>The Ultimate Guide to Free eBooks</h1>
                        <p>Not sure what to read next? Explore our catalog of public domain books with our editors. Some
                            real gems are hidden in our library. </p>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    </div>

    <section class="books__section">
        <div class="container">
            <h1 class="section__name">Popular at online reader</h1>
            <div class="book__list">
                <BookCard v-for="book in myStore.popularBooks" :id="book.id" :link="book.link"
                    :imageSrc="book.imageSrc" :name="book.name" :author="book.author" :level="book.level" />
            </div>
        </div>
    </section>

    <section class="books__section">
        <div class="container">
            <h1 class="section__name">Trending books</h1>
            <div class="book__list">
                <BookCard v-for="book in myStore.trendBooks" :id="book.id" :link="book.link" :imageSrc="book.imageSrc"
                    :name="book.name" :author="book.author" :level="book.level" />
            </div>

        </div>
    </section>




    <section class="subscribe">
        <div class="container">
            <div class="subscribe__container">

                <div class="subscribe__content">
                    <img src="@/assets/img/plugins/icon-newsletter.png" alt="" />
                    <div class="subscribe__text">
                        <h4>Subscribe to our newsletter</h4>
                        <p>Sign up to get discount for next order</p>
                    </div>
                </div>


                <div class="mail__content">
                    <input type="text" placeholder="e-mail" />
                    <Primary>OK</Primary>
                </div>

            </div>
        </div>
    </section>
</template>


<script setup>
import { ref } from 'vue';
import Primary from '@/components/UI/Buttons/Primary.vue'
import BookCard from '@/components/BookCard/index.vue';
import { useCounterStore } from "@/stores/counter";


import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


const myStore = useCounterStore();




</script>


<style lang="scss" scoped>
.hero__slider {
    .slide__img {
        height: 350px;
        position: relative;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .overlay {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translate(-50%, 0%);
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 30px;

            h1 {
                color: #fff;
                font-size: 35px;
                line-height: 50px;
                font-weight: 700;
            }

            p {
                color: #fff;
                font-size: 20px;
                line-height: 25px;
            }
        }
    }
}


.books__section {
    .section__name {
        font-size: 30px;
        font-weight: 700;
        text-align: center;
        margin-bottom: 30px;
    }

    .book__list {
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
    }
}


.subscribe {
    height: 120px;
    display: flex;
    position: relative;
    background: url(@/assets/img/bg-subscribe.jpg);

    .subscribe__container {
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(3.2px);
        height: 100%;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .subscribe__content {
            display: flex;
            align-items: center;

            img {
                width: 60px;
                height: 60px;
            }

            .subscribe__text {
                display: flex;
                align-items: center;

                h4 {
                    font-size: 24px;
                    margin: 0px 20px;
                    font-weight: 700;
                }

                p {
                    margin: 0px 20px;
                }
            }
        }

        .mail__content {
            display: flex;
            max-width: 350px;
            width: 100%;

            input {
                width: 100%;
                outline: none;
                margin-right: 10px;
                border-radius: 20px 0px;
                border: none;
                padding: 0px 20px;
                transition: 0.3s ease;

                &:focus {
                    box-shadow: none;
                    border: 1px solid #f7b733;
                    border-radius: 0px 20px;
                }
            }
        }
    }
}

@media (max-width: 767px) {
    .hero__slider {
        .slide__img {
            height: 250px;

            .overlay {
                width: 100%;
                padding: 0 16px;
                gap: 20px;

                h1 {
                    font-size: 25px;
                    line-height: 30px;
                }

                p {
                    color: #fff;
                    font-size: 16px;
                    line-height: 20px;
                }
            }
        }
    }

    .books__section {
        .section__name {
            font-size: 25px;
        }

        .book__list {
            gap: 15px;
        }
    }


    .subscribe {
        height: unset;
        display: flex;

        .subscribe__container {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(3.2px);
            height: 100%;
            padding: 10px 20px;
            justify-content: unset;
            align-items: unset;
            flex-direction: column;
            gap: 20px;

            .subscribe__content {
                img {
                    width: 30px;
                    height: 30px;
                }

                .subscribe__text {
                    display: flex;
                    align-items: center;

                    h4 {
                        font-size: 18px;
                        margin: 0px 10px;
                        font-weight: 700;
                    }

                    p {
                        font-size: 12px;
                        margin: 0px 10px;
                    }
                }
            }

            .mail__content {
                display: flex;
                max-width: unset;
                width: 100%;
            }
        }
    }
}



@media (min-width: 768px) and (max-width: 1200px) {}
</style>
