<script setup>
import Navbar from '@/components/Layouts/Navbar.vue'
import SearchBar from '@/components/SearchBar/index.vue'
import Footer from '@/components/Layouts/Footer.vue'
// import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <Navbar />
  <SearchBar />
 
  <RouterView />
  <Footer />
</template>

<style scoped></style>
