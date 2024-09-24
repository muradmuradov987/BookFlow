import { createRouter, createWebHistory } from "vue-router";
import { useCounterStore } from "@/stores/counter";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Profile/Login.vue"),
    },
    {
      path: "/forgetten-password",
      name: "forgetten-password",
      component: () => import("../views/Profile/ForgettenPassword/index.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Profile/Register/index.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profile/Account/index.vue"),
    },
    {
      path: "/my-books",
      name: "my-books",
      component: () => import("../views/MyBooks.vue"),
    },
    {
      path: "/library",
      name: "library",
      component: () => import("../views/Library.vue"),
    },
    {
      path: "/book-detail/:id",
      name: "book-detail",
      component: () => import("../views/BookDetail.vue"),
      props: true,
    },
    {
      path: "/book-level/:level",
      name: "book-level",
      component: () => import("../views/BookLevel.vue"),
    },
    {
      path: "/book-detail/:id/read",
      name: "read",
      component: () => import("../views/Read.vue"),
      props: true,
    },
    {
      path: "/notes",
      name: "notes",
      component: () => import("../views/Notes.vue"),
    },
    {
      path: "/dictionary",
      name: "dictionary",
      component: () => import("../views/Dictionary.vue"),
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useCounterStore();

  if (to.name === "profile" && !authStore.auth) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
