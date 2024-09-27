<template>
    <Modal>
        <template #default v-if="myStore.modal.title === 'dictionaryCard'">
            <!-- <input class="noteInput" type="text" v-on:keyup.enter="addNote" v-model="note" placeholder="add note..."> -->
            <p v-if="!tempDictionaryData.dictionaryList.length">There is no dictionary list</p>
            <div class="dictionary__list" v-for="item in tempDictionaryData.dictionaryList"
                v-if="tempDictionaryData?.dictionaryList.length">
                <p>{{ item.input }}</p>
                <span>|</span>
                <p>{{ item.output }}</p>
                <img @click="deleteNote(item.id)" src="@/assets/img/plugins/trash.png" alt="">
            </div>
        </template>
    </Modal>

    <section>
        <div class="container">
            <Breadcrumb>
                <template #title>
                    My dictionary
                </template>
                <template #breadcrumbs>
                    <router-link to="/" class="breadcrumbs__link">Home</router-link>
                    <img src="@/assets/img/plugins/right-arrow.png" alt="">
                    <router-link to="/dictionary" class="breadcrumbs__link">Dictionary</router-link>
                </template>
            </Breadcrumb>
        </div>
    </section>


    <div class="container">
        <div class="addDictionary__container">
            <input type="text" placeholder="Add book name or dictionary title" v-on:keyup.enter="createDictionary"
                v-model="dictionary">
        </div>
        <section class="dictionaryInfo" v-if="!myStore.myDictionary.length">
            <h3>No dictionary available. Please add some dictionary to get started!</h3>
        </section>
        <div class="dictionary__container">
            <div class="dictionary" @click="openDictionaryCard(dictionary)" v-for="dictionary in myStore.myDictionary"
                :key="dictionary.id" :style="{ backgroundImage: getRandomColor() }">
                <h3 class="dictionary__title">{{ dictionary?.dictionaryName }}</h3>
                <div class="dictionary__view">
                    <p class="dictionary__view-info" v-if="!dictionary?.dictionaryList.length">Dictionary list is
                        empty...
                    </p>
                    <div v-for="item in dictionary.dictionaryList" v-if="dictionary?.dictionaryList.length">
                        <p>{{ item.input }}</p>
                        <span>|</span>
                        <p>{{ item.output }}</p>
                    </div>
                </div>
                <div class="dictionary__bottom">
                    <span class="date">{{ dictionary?.date }}</span>
                    <img @click="deleteDictionaryCard(dictionary.id)" src="@/assets/img/plugins/trash.png" alt="">
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import Breadcrumb from '@/components/UI/Breadcrumb.vue';
import Modal from "@/components/Modal/index.vue";
import Swal from 'sweetalert2';
import { useCounterStore } from "@/stores/counter";
const myStore = useCounterStore();


const colors = [
    'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(101,9,121,0.7) 35%, rgba(201,0,255,0.7) 100%)',
    'linear-gradient(to top, #0f2027, #203a43, #2c5364)',
    'linear-gradient(to top, #373b44, #4286f4)',
    'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(126,142,41,0.7) 43%, rgba(123,176,4,0.7) 100%)',
    'linear-gradient(to top, #200122, #6f0000)',
    'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(153,0,0,0.7) 51%, rgba(190,11,78,0.7) 100%)',
    'linear-gradient(to bottom, #00bf8f, #001510)',
    'linear-gradient(to bottom, #870000, #190a05)',
    'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,0.7) 35%, rgba(0,212,255,0.7) 100%)',
    'linear-gradient(to bottom, #536976, #292e49)',
    'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(6,120,107,0.7) 41%, rgba(0,194,255,0.7) 100%)',
    'linear-gradient(to bottom, #780206, #061161)',
];

//Random Colors
const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};


let dictionary = ''
const formattedDate = ref(null)

//Set current date
function currentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    formattedDate.value = `${day}.${month}.${year}`;
}

//Create dictionary card
function createDictionary() {
    let dictionaryData = {
        "id": Date.now(),
        "dictionaryName": dictionary,
        "date": formattedDate.value,
        "dictionaryList": []
    }
    myStore.myDictionary.unshift(dictionaryData)
    dictionary = ''
}

//Delete dictionary card
function deleteDictionaryCard(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00c897",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            myStore.myDictionary = myStore.myDictionary.filter(item => item.id !== id)
            Swal.fire({
                title: "Deleted!",
                text: "Your notes has been deleted.",
                icon: "success"
            });
        }
    });



}

//Save temporary Dictionary Data
const tempDictionaryData = ref(null)

// Open Dictionary Card modal
function openDictionaryCard(dictionary) {
    myStore.modal.show = true
    myStore.modal.title = 'dictionaryCard'
    myStore.modal.name = dictionary.dictionaryName
    tempDictionaryData.value = dictionary
}

// Delet Dictionary list
function deleteNote(id) {
    tempDictionaryData.value.dictionaryList = tempDictionaryData.value.dictionaryList.filter(item => item.id !== id)
}


onMounted(() => {
    currentDate()
})


</script>

<style lang="scss" scoped>
.addDictionary__container {
    margin-top: 20px;
    margin-bottom: 40px;

    input {
        width: 35%;
        height: 30px;
        border-radius: 7px;
        border: 1px solid #00c897;
        outline: none;
        padding: 20px;
        font-size: 16px;
    }
}

.dictionaryInfo {
    height: 10vh;

    h3 {
        font-size: 25px;
    }
}

.dictionary__container {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding-bottom: 70px;

    .dictionary {
        max-width: 300px;
        width: 100%;
        background: #fff;
        box-shadow: 0 0 10px 4px #817d79;
        padding: 15px;
        border-radius: 10px;
        cursor: pointer;
        transition: 0.3s ease;

        &:hover {
            transform: translate(0, -10px);
        }

        .dictionary__title {
            font-size: 18px;
            line-height: 20px;
            margin-bottom: 15px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            color: #fff;
        }

        .dictionary__view {
            height: 108px;
            overflow: hidden;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            gap: 5px;

            .dictionary__view-info {
                color: #fff;
                font-style: italic;
                font-size: 14px;
            }

            div {
                display: flex;
                justify-content: space-between;
                gap: 10px;
                border-bottom: 1px solid #fff;
                padding: 3px;

                span {
                    color: #fff;
                }

                p {
                    width: 50%;
                    color: #fff;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: 14px;

                    &:nth-child(3) {
                        text-align: end;
                    }
                }
            }
        }

        .dictionary__bottom {
            display: flex;
            align-items: end;
            justify-content: space-between;

            .date {
                color: #fff;

            }

            img {
                width: 25px;
                margin-left: 5px;
                cursor: pointer;
                position: relative;
            }
        }
    }
}



.dictionary__list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #051367;
    padding: 8px;
    position: relative;

    p {
        width: 50%;
        font-size: 16px;
        color: #00c897;

        &:nth-child(3) {
            text-align: end;
            padding-right: 25px;
            color: #051367;
            font-style: italic;
        }
    }

    img {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
    }
}




/*---------------Media Queries--------------*/
@media (max-width: 650px) {
    .addDictionary__container {
        input {
            width: 100%;
        }
    }

    .dictionary__container {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        padding-bottom: 70px;
        .dictionary {
            max-width: unset;
            width: 100%;
            background: #fff;
            box-shadow: 0 0 10px 4px #817d79;
            padding: 15px;
            border-radius: 10px;
            cursor: pointer;
            transition: 0.3s ease;

            &:hover {
                transform: translate(0, -10px);
            }

            .dictionary__title {
                font-size: 18px;
                line-height: 20px;
                margin-bottom: 15px;
                text-align: center;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #fff;
            }

            .dictionary__view {
                height: 108px;
                overflow: hidden;
                margin-bottom: 10px;
                display: flex;
                flex-direction: column;
                gap: 5px;

                .dictionary__view-info {
                    color: #fff;
                    font-style: italic;
                    font-size: 14px;
                }

                div {
                    display: flex;
                    justify-content: space-between;
                    gap: 10px;
                    border-bottom: 1px solid #fff;
                    padding: 3px;

                    span {
                        color: #fff;
                    }

                    p {
                        width: 50%;
                        color: #fff;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-size: 14px;

                        &:nth-child(3) {
                            text-align: end;
                        }
                    }
                }
            }

            .dictionary__bottom {
                display: flex;
                align-items: end;
                justify-content: space-between;

                .date {
                    color: #fff;

                }

                img {
                    width: 25px;
                    margin-left: 5px;
                    cursor: pointer;
                    position: relative;
                }
            }
        }
    }



}
</style>