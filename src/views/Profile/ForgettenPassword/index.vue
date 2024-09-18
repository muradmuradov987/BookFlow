<template>
    <div>
        <Breadcrumb>
            <template #title>
                Forgot Your Password?
            </template>
            <template #breadcrumbs>
                <router-link to="/" class="breadcrumbs__link">Home</router-link>
                <img src="@/assets/img/plugins/right-arrow.png" alt="">
                <router-link to="/forgetten-password" class="breadcrumbs__link">Forgot password</router-link>
            </template>
        </Breadcrumb>
        <div class="container">
            <section class="reset__container">
                <div class="reset__password">
                    <p>
                        Enter the e-mail address associated with your account. Click submit
                        to have your password e-mailed to you.
                    </p>
                    <h4>Your E-Mail Address</h4>
                    <div class="d-flex flex-column">
                        <label>Email address</label>
                        <input type="email" placeholder="Enter email" />
                    </div>
                    <Primary class="mr-3" @click="$router.push('/login')">Back</Primary>
                    <Secondary>Continiue</Secondary>
                </div>
                <div class="right__aside">
                    <AccountSetting />
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>

import Breadcrumb from '@/components/UI/Breadcrumb.vue';
import AccountSetting from '@/components/AccountSetting/index.vue';
import Primary from '@/components/UI/Buttons/Primary.vue';
import Secondary from '@/components/UI/Buttons/Secondary.vue';



</script>

<style lang="scss" scoped>
.reset__container {
    display: flex;
    justify-content: space-between;





    .reset__password {
        p {
            font-size: 12px;
        }

        h4 {
            font-size: 24px;
            margin: 20px 0;
            font-weight: 700;
        }

        label {
            font-size: 12px;
            display: flex;
            margin-bottom: 5px;

            &::before {
                content: "* ";
                color: red;
            }
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

        .mr-3 {
            margin-right: 20px;
        }
    }

    .right__aside {
        width: 20%;
    }
}

@media (max-width: 768px) {
    .reset__container {
        justify-content: unset;
        flex-direction: column;
        gap: 30px;
        .right__aside {
            width: 100%;
        }
    }
}

@media (min-width: 768px) and (max-width: 1200px) {
    .reset__container {
        .reset__password {
            width: 50%;
        }

        .right__aside {
            width: 30%;
        }
    }


}
</style>