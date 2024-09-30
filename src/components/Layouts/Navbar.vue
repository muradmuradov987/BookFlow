<template>
    <div class="container">
        <nav>
            <router-link to="/">
                <div class="logo">
                    <img src="@/assets/img/logo.webp" alt="" />
                    <h1>Book<span>Flow</span></h1>
                </div>
            </router-link>

            <div class="navbar__menu">
                <div class="mobile__menu" :class="{ showMenu: showMobile }">
                    <img @click="showMobile = !showMobile" class="close__btn" src="../../assets/img/plugins/close.png"
                        alt="ss">
                    <router-link to="/" class="nav__items ">
                        <img class="home_icon" src="../../assets/img/plugins/home.png" alt="">
                    </router-link>
                    <router-link to="/library" class="nav__items">
                        Library
                    </router-link>
                    <router-link to="/my-books" class="nav__items">
                        My books <span class="mybook__list" v-if="myStore.auth">({{ myStore.myBooks?.length }})</span>
                    </router-link>
                    <router-link to="/translate" class="nav__items">
                        Translate
                    </router-link>
                    <div class="social__network">
                        <img src="../../assets/img/plugins/facebook.png" alt="">
                        <img src="../../assets/img/plugins/twitter.png" alt="">
                        <img src="../../assets/img/plugins/youtube.png" alt="">
                    </div>
                </div>
                <router-link to="/login" class="nav__items login" v-if="!myStore.auth">
                    Login
                </router-link>
                <div class="profile nav__items" v-if="myStore.auth">
                    <img src="../../assets/img/plugins/user.png" alt="ss">
                    <div class="profile__menu-container">
                        <div class="profile__menu">
                            <router-link to="/account" class="profile__menu-link">
                                Account
                            </router-link>
                            <router-link to="/dictionary" class="profile__menu-link">
                                Dictionary
                            </router-link>
                            <router-link to="/notes" class="profile__menu-link">
                                Notes
                            </router-link>
                            <router-link @click="logOut" to="/" class="profile__menu-link">
                                Log out
                            </router-link>
                        </div>
                    </div>
                </div>
                <img @click="showMobile = !showMobile" class="burger-menu"
                    src="../../assets/img/plugins/burger-menu.png" alt="">
            </div>
        </nav>
    </div>


</template>

<script setup>
import { ref } from "vue"
import { useCounterStore } from "@/stores/counter";

const myStore = useCounterStore();
const showMobile = ref(false)

function logOut() {
    myStore.auth = false
}

</script>

<style lang="scss" scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    padding: 20px 0px;

    .logo {
        display: flex;
        align-items: center;
        gap: 5px;

        h1 {
            font-size: 20px;
            color: #00c897;

            span {

                color: #fe7f02
            }
        }

        img {
            width: 70px;
            height: 70px;
            border-radius: 50%;

            object-fit: cover;
        }
    }

    .navbar__menu {
        display: flex;
        align-items: center;

        .mobile__menu {
            display: flex;
            align-items: center;

            .social__network {
                display: none;
            }
        }

        .nav__items {
            margin: 0 12px;
            font-size: 18px;
            position: relative;

            .home_icon {
                width: 20px;
            }

            .mybook__list {
                color: #fe7f02;
            }

            &:hover {
                color: #00c897;
            }
        }

        .login {
            color: #00c897;
            transition: all 0.3s ease;

            &:hover {
                background-color: #051367;
                padding: 10px;
                border-radius: 5px;
                color: #fff;
            }
        }

        .profile {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #00c897;
            position: relative;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            img {
                width: 23px;
            }

            &:hover {
                .profile__menu-container {
                    display: block;
                }
            }

            .profile__menu-container {
                position: absolute;
                top: calc(100%);
                padding-top: 15px;
                min-height: 100px;
                width: 150px;
                z-index: 5;
                display: none;

                .profile__menu {
                    border-radius: 7px;
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                    backdrop-filter: blur(8px);
                    background-color: rgba(0, 0, 0, 0.265);
                    box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
                    z-index: 1;

                    .profile__menu-link {
                        color: #fff;
                        padding: 5px;
                        border-radius: 5px;

                        &:hover {
                            background: white;
                            color: black;
                        }
                    }
                }
            }
        }

        .burger-menu {
            margin-left: 20px;
            display: none;
        }

        .close__btn {
            display: none;
        }
    }

    // .router-link-active {
    //     border-bottom: 2px solid #00c897;
    // }
}

@media (max-width: 768px) {
    nav {
        height: 60px;
        padding: 20px 0px;

        .logo {
            h1{
                font-size: 16px;
            }
            img {
                width: 45px;
                height: 45px;
            }
        }

        .navbar__menu {
            .mobile__menu {
                position: absolute;
                align-items: flex-start;
                flex-direction: column;
                top: 0;
                right: 0;
                width: 50%;
                min-height: 40vh;
                display: none;
                padding: 20px;
                z-index: 5;
                border-bottom-left-radius: 30px;
                transition: 0.3s ease;
                background-color: #051367;
                box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;

                .nav__items {
                    color: white;
                    margin: 0px 0px 20px 0px;
                }

                .close__btn {
                    position: absolute;
                    right: 20px;
                    display: block;
                    width: 20px;
                }

                .social__network {
                    position: absolute;
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    img {
                        width: 20px;
                    }
                }
            }

            .showMenu {
                display: flex;
            }

            .profile {
                width: 30px;
                height: 30px;

                .profile__menu-container {
                    .profile__menu {
                        backdrop-filter: blur(15x);
                        background-color: #051367;
                        border: none;
                        box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;

                        .profile__menu-link {
                            color: #fff;
                        }
                    }
                }
            }

            .burger-menu {
                display: block;
                margin-left: 0px;
            }
        }
    }
}

@media (max-width: 1000px) {}
</style>