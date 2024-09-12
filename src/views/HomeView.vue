<template>
    <section class="subscribe">
        <div class="container">
            <div class="subscribe__container">

                <div class="subscribe__content">
                    <img src="@/assets/img/Plagins/icon-newsletter.png" alt="" />
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

import Primary from '@/components/UI/Buttons/Primary.vue'

</script>


<style lang="scss" scoped>
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

@media (max-width: 768px) {
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
</style>
