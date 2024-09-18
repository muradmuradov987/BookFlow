<template>
    <div class="container">
        <Breadcrumb>
            <template #title>
                Register Account
            </template>
            <template #breadcrumbs>
                <router-link to="/" class="breadcrumbs__link">Home</router-link>
                <img src="@/assets/img/plugins/right-arrow.png" alt="">
                <router-link to="/register" class="breadcrumbs__link">Create account</router-link>
            </template>
        </Breadcrumb>


        <div class="container">
            <section class="account__content">
                <div class="registration__form">
                    <p>
                        If you already have an account with us, please login at the login
                        page.
                    </p>
                    <div>
                        <h4>Your Personal Details</h4>
                        <div class="form-group">
                            <label class="important">First Name</label>
                            <input type="text" placeholder="First Name" />
                        </div>
                        <div class="form-group">
                            <label class="important">Last Name</label>
                            <input type="text" class="form-control" placeholder="Last Name" />
                        </div>
                        <div class="form-group">
                            <label class="important">Email address</label>
                            <input type="email" class="form-control" placeholder="Enter email" />
                        </div>
                        <div class="form-group">
                            <label class="important">Password</label>
                            <input type="password" class="form-control" placeholder="Password" />
                        </div>
                        <div class="form-group">
                            <label class="important">Password Confirm</label>
                            <input type="text" class="form-control" placeholder="Password Confirm" />
                        </div>

                    </div>
                    <div class="confirm">
                        <label for="agree" class="important"> I have read and agree to the Privacy Policy</label>
                        <input type="checkbox" id="agree" />
                    </div>
                    <Primary @click="register">Register</Primary>
                </div>

                <div class="right__aside">
                    <AccountSetting />
                </div>
            </section>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCounterStore } from "@/stores/counter";

import Breadcrumb from '@/components/UI/Breadcrumb.vue';
import AccountSetting from '@/components/AccountSetting/index.vue';
import Primary from '@/components/UI/Buttons/Primary.vue';
const router = useRouter();
const myStore = useCounterStore();

function register() {
    myStore.auth = true
    router.push('/')
}
</script>

<style lang="scss" scoped>
.account__content {
    display: flex;
    justify-content: space-between;

    .registration__form {
        p {
            font-size: 18px;
            margin-bottom: 20px;
        }

        h4 {
            font-size: 24px;
            margin-bottom: 20px;
        }

        label {
            font-size: 12px;
            padding: 5px 0px;
        }

        .form-group {
            display: flex;
            flex-direction: column;

            label {
                font-size: 12px;
                margin-bottom: 5px;
            }

            input {
                width: 100%;
                border: 1px solid #051367;
                border-radius: 8px;
                padding: 10px 20px;
                margin-bottom: 20px;

                &:focus {
                    border: 1px solid #fe7f02;
                }
            }

            .important {
                &::before {
                    content: "* ";
                    color: red;
                }
            }

        }

        .confirm {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;

            label {
                cursor: pointer;
            }

            .important {
                &::before {
                    content: "* ";
                    color: red;
                }
            }
        }
    }

    .right__aside {
        width: 20%;
    }
}


@media (max-width: 1000px) {
    .account__content {
        flex-direction: column;
        justify-content: unset;
        gap: 30px;

        .registration__form {
            p {
                font-size: 18px;
                margin-bottom: 20px;
            }

            h4 {
                font-size: 24px;
                margin-bottom: 20px;
            }

            label {
                font-size: 12px;
                padding: 5px 0px;
            }

            .form-group {
                display: flex;
                flex-direction: column;

                label {
                    font-size: 12px;
                    margin-bottom: 5px;
                }

                input {
                    width: 100%;
                    border: 1px solid #051367;
                    border-radius: 8px;
                    padding: 10px 20px;
                    margin-bottom: 20px;

                    &:focus {
                        border: 1px solid #fe7f02;
                    }
                }

                .important {
                    &::before {
                        content: "* ";
                        color: red;
                    }
                }

            }

            .confirm {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-bottom: 20px;

                label {
                    cursor: pointer;
                }

                .important {
                    &::before {
                        content: "* ";
                        color: red;
                    }
                }
            }
        }

        .right__aside {
            width: 100%;
        }
    }
}
</style>