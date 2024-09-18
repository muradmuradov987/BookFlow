<template>
    <div>
        <Breadcrumb>
            <template #title>
               Profile
            </template>
            <template #breadcrumbs>
                <router-link to="/" class="breadcrumbs__link">Home</router-link> <img
                    src="@/assets/img/plugins/right-arrow.png" alt=""> <router-link to="/profile"
                    class="breadcrumbs__link">Profile</router-link>
            </template>
        </Breadcrumb>
    </div>
</template>

<script setup>
import Breadcrumb from '@/components/UI/Breadcrumb.vue';
</script>

<style lang="scss" scoped></style>