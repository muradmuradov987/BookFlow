import { ref, computed } from "vue";
import { defineStore } from "pinia";
import booksData from "../stores/books.json";
import popularBooksData from "../stores/popularBooks.json";
import trendBooksData from "../stores/trendBooks.json";
import myBooksData from "../stores/myBooks.json";
import myNotesData from "../stores/myNotes.json";

export const useCounterStore = defineStore("counter", () => {
  ////////////////////////////STATE////////////////////////////////////////
  const auth = ref(true);

  const books = booksData;
  const popularBooks = popularBooksData;
  const trendBooks = trendBooksData;
  const myBooks = myBooksData;
  const myNotes = myNotesData;

  const isModalVisible = false;

  const modal = {
    show: false,
    name: "",
    title: "",
  };
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

  function closeModal(note) {
    this.modal.show = false;
    this.modal.title = "";
    this.modal.noteName = note.noteName;
  }

  //////////////////////////////////////////////////////////////////////////

  return {
    //state
    auth,
    books,
    popularBooks,
    trendBooks,
    myBooks,
    myNotes,
    isModalVisible,
    modal,
    //actions
    closeModal,
  };
});
