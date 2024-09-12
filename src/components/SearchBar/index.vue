<template>
    <div class="search__nav">
        <div class="container">
            <div class="search__nav-container">
                <div class="categories">
                    <h5>Levels</h5>
                    <img src="@/assets/img/plagins/book.png" alt="">
                    <ul class="categories__collapse">
                        <li>A1 starter</li>
                        <li>A2 elementary</li>
                        <li>B1 pre-intermediate</li>
                        <li>B1+ intermediate</li>
                        <li>B2+ intermediate-plus</li>
                        <li>C1 advanced</li>
                    </ul>
                </div>
                <div class="search__box">
                    <input type="text" placeholder="search book..." />
                    <img src="@/assets/img/plagins/search.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.search__nav {
    padding: 10px 0px;
    background: linear-gradient(to top, #fc4a1a, #f7b733);

    .search__nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;

        .categories {
            &:hover {
                border-bottom-left-radius: 0px;
                border-bottom-right-radius: 0px;

                .categories__collapse {
                    display: block;
                }
            }

            width: 250px;
            z-index: 2;
            padding: 0px 20px;
            border-radius: 8px;
            height: 50px;
            background-color: rgba(0, 0, 0, 0.265);
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            cursor: pointer;

            h5 {
                margin: 0;
                color: white;
            }

            img {
                width: 25px;
            }

            .categories__collapse {
                display: none;
                position: absolute;
                width: 100%;
                max-height: 300px;
                margin: 0;
                padding: 5px 15px;
                top: 50px;
                left: 0;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                backdrop-filter: blur(8px);
                background-color: rgba(0, 0, 0, 0.265);
                box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
                overflow-y: scroll;
                z-index: 1;

                &::-webkit-scrollbar {
                    width: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    background-color: #00c897;
                    border-radius: 20px;
                }

                li {
                    padding: 10px 5px;
                    transition: 0.3s ease;
                    border-radius: 5px;
                    color: white;

                    &:hover {
                        background: white;
                        color: black;
                    }
                }
            }
        }

        .search__box {
            position: relative;
            max-width: 600px;
            width: 100%;

            input {
                width: 100%;
                height: 50px;
                border-radius: 20px 0px;
                border: none;
                transition: 0.5s ease;
                outline: none;
                padding: 0px 55px 0px 20px;
                font-size: 16px;

                &:focus {
                    border-radius: 0px 20px;
                }
            }

            img {
                width: 25px;
                color: #00c897;
                position: absolute;
                top: 50%;
                right: 10px;
                cursor: pointer;
                transform: translate(-50%, -50%);
            }
        }
    }
}

@media (max-width: 768px) {
    .search__nav {
        padding: 10px 0px;
        background: linear-gradient(to top, #fc4a1a, #f7b733);

        .search__nav-container {
            flex-direction: column;
            justify-content: unset;
            align-items: unset;
            gap: 10px;

            .categories {
                width: 100%;
            }

            .search__box {
                max-width: 768px;
            }
        }
    }
}
</style>