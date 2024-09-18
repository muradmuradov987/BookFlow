<template>
    <div>
        <Breadcrumb>
            <template #title>
                Account Login
            </template>
            <template #breadcrumbs>
                <router-link to="/" class="breadcrumbs__link">Home</router-link> <img
                    src="../../assets/img/plugins/right-arrow.png" alt=""> <router-link to="/login"
                    class="breadcrumbs__link">Login</router-link>
            </template>
        </Breadcrumb>

        <div class="container">
            <section class="account__content">
                <div class="register__account">
                    <h4>New Customer</h4>
                    <h6>Register Account</h6>
                    <p>
                        By creating an account you will be able to shop faster, be up to
                        date on an order's status, and keep track of the orders you have
                        previously made.
                    </p>
                    <Primary @click="$router.push('/register')">Create Your Account</Primary>
                </div>
                <div class="login__form">
                    <h4>Returning Customer</h4>
                    <h6>I am a returning customer</h6>
                    <div class="form-group">
                        <label>Email address</label>
                        <input type="email" placeholder="Enter email" v-model="email" />
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" v-model="password" />
                        <span @click="$router.push('/forgetten-password')">Forgotten Password</span>
                    </div>
                    <Primary @click="login">Login</Primary>
                </div>
                <div class="right__aside">
                    <AccountSetting />
                </div>
            </section>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from "@/stores/counter";
import Breadcrumb from '@/components/UI/Breadcrumb.vue';
import AccountSetting from '@/components/AccountSetting/index.vue';
import Primary from '@/components/UI/Buttons/Primary.vue';


const myStore = useCounterStore();
const router = useRouter();

const email = ref('test@bookstore.com')
const password = ref(12345678)


function login(){
    myStore.auth = true
    router.push('/')
}
</script>

<style lang="scss" scoped>
.account__content {
    display: flex;
    justify-content: space-between;
    gap: 50px;

    .register__account {
        width: 30%;

        h4 {
            margin-bottom: 20px;
            font-size: 25px;
        }

        h6 {
            font-size: 18px;
            margin-bottom: 15px;
        }

        p {
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 30px;
        }
    }

    .login__form {
        width: 35%;

        h4 {
            margin-bottom: 20px;
            font-size: 25px;
        }

        h6 {
            font-size: 18px;
            margin-bottom: 15px;
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

            span {
                cursor: pointer;
                color: #00c897;
                font-size: 12px;
                margin-bottom: 40px;

                &:hover {
                    color: #019267;
                }
            }
        }
    }

    .right__aside {
        width: 20%;
    }
}



/*---------------Media Queries--------------*/
@media (max-width: 767px) {

    .account__content {
        flex-direction: column;
        justify-content: unset;
        gap: 30px;

        .register__account {
            width: 100%;

            p {

                margin-bottom: 20px;
            }
        }

        .login__form {
            width: 100%;

            h6 {
                margin-bottom: 15px;
            }

            .form-group {
                span {
                    margin-bottom: 20px;
                }
            }
        }

        .right__aside {
            width: 100%;
        }
    }


}

@media (min-width: 768px) and (max-width: 1200px) {

    .account__content {
        flex-direction: column;
        justify-content: unset;

        .register__account {
            width: 100%;

            p {
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 10px;
            }
        }

        .login__form {
            width: 50%;

            h4 {
                margin-bottom: 20px;
                font-size: 25px;
            }

            h6 {
                font-size: 18px;
                margin-bottom: 15px;
            }

            .form-group {
                span {
                    margin-bottom: 20px;
                }
            }
        }

        .right__aside {
            width: 50%;
        }
    }

}
</style>