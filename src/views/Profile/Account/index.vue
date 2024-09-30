<template>
    <div>
        <Breadcrumb>
            <template #title>
                Account
            </template>
            <template #breadcrumbs>
                <router-link to="/" class="breadcrumbs__link">Home</router-link> <img
                    src="@/assets/img/plugins/right-arrow.png" alt=""> <router-link to="/account"
                    class="breadcrumbs__link">Account</router-link>
            </template>
        </Breadcrumb>
    </div>
</template>

<script setup>
import Breadcrumb from '@/components/UI/Breadcrumb.vue';
</script>

<style lang="scss" scoped></style>