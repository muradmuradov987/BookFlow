import { ref, computed } from "vue";
import { defineStore } from "pinia";
import booksData from "../stores/books.json";
import popularBooksData from "../stores/popularBooks.json";
import trendBooksData from "../stores/trendBooks.json";
import myBooksData from "../stores/myBooks.json";

export const useCounterStore = defineStore("counter", () => {
  ////////////////////////////STATE////////////////////////////////////////
  const auth = ref(false);

  const books = booksData;
  const popularBooks = popularBooksData;
  const trendBooks = trendBooksData;
  const myBooks = myBooksData;

 

  /////////////////////////////////////////////////////////////////////////
  ////////
  ////////
  ////////
  ////////////////////////////GETTERS////////////////////////////////////////
  // const doubleCount = computed(() => count.value * 2)

  /////////////////////////////////////////////////////////////////////////
  ////////
  ////////
  ////////
  ////////////////////////////ACTIONS////////////////////////////////////////

  // function increment() {
  //   count.value++
  // }
  //////////////////////////////////////////////////////////////////////////

  return {
    //state
    auth,
    books,
    popularBooks,
    trendBooks,
    myBooks,
    //actions
  };
});
