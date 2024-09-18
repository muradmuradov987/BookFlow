<template>
    <footer>
        <div class="container">
            <div class="footer__container">
                <div class="contact__info">
                    <div class="phone__number">
                        <img src="@/assets/img/plugins/phone.png" alt="">
                        <h5>+48 500-500-500 / toll free</h5>
                    </div>
                    <div class="contact__mail">
                        <img src="@/assets/img/plugins/letter.png" alt="">
                        <h5>contact@example.com</h5>
                    </div>
                    <div class="support__mail">
                        <img src="@/assets/img/plugins/support.png" alt="">
                        <h5>support@example.com</h5>
                    </div>
                </div>
                <img class="live__chat" src="@/assets/img/live__chat.png" alt="">


                <div class="footer__bottom">
                    <div class="information">
                        <h5>Information</h5>
                        <p>About Us</p>
                        <p>Delivery Information</p>
                        <p>Privacy Policy</p>
                        <p>Terms & Conditions</p>
                    </div>
                    <div class="customer">
                        <h5>Customer</h5>
                        <p>Contact Us</p>
                        <p>Returns</p>
                        <p>Site Map</p>
                    </div>
                    <div class="extras">
                        <h5>Extras</h5>
                        <p>Brands</p>
                        <p>Gift Vouchers</p>
                        <p>Affiliates</p>
                        <p>Specials</p>
                    </div>
                    <div class="my__account">
                        <h5>My Account</h5>
                        <p>My Account</p>
                        <p>Order History</p>
                        <p>Wish List</p>
                        <p>Newsletter</p>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="container nocopy">
            <p >Powered By Vue BookStore © 2024</p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
footer {
    margin-top: 50px;

    .footer__container {
        .contact__info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;

            .phone__number,
            .contact__mail,
            .support__mail {
                display: flex;
                align-items: center;

                h5 {
                    font-size: 18px;
                }

                img {
                    width: 20px;
                    margin-right: 10px;
                }
            }

            .phone__number {
                h5 {
                    color: #00c897;
                }
            }

            .contact__mail {
                h5 {
                    color: #fe7f02;
                }
            }
        }

        .live__chat {
            width: 100%;
            height: 100px;
        }

        .footer__bottom {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;

            .information,
            .customer,
            .extras,
            .my__account {

                h5 {
                    padding-bottom: 10px;
                    margin-bottom: 20px;
                    border-bottom: 2px solid #fe7f02;
                    display: inline-block;
                    font-size: 24px;
                }

                p {
                    font-size: 16px;
                    transition: 0.3s ease;
                    cursor: pointer;
                    margin-bottom: 10px;

                    &:hover {
                        color: #fe7f02;
                    }
                }
            }
        }

    }

.nocopy{
    p{
        padding: 15px 0;
        font-weight: 700;
    }
}

}

@media (max-width: 768px) {
    footer {
        margin-top: 30px;

        .footer__container {
            .contact__info {
                justify-content: unset;
                flex-direction: column;
                gap: 10px;
            }

            .live__chat {
                width: 100%;
                min-height: 40px;
                height: 100%;
            }

            .footer__bottom {
                flex-wrap: wrap;
                gap: 30px;

                .information,
                .customer,
                .extras,
                .my__account {
                    h5 {
                        padding-bottom: 10px;
                        margin-bottom: 20px;
                        border-bottom: 2px solid #fe7f02;
                        display: inline-block;
                        font-size: 24px;
                    }

                    p {
                        font-size: 16px;
                        transition: 0.3s ease;
                        cursor: pointer;
                        margin-bottom: 10px;

                        &:hover {
                            color: #fe7f02;
                        }
                    }
                }
            }

        }



    }
}
</style>