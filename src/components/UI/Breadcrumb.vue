<template>
    <div class="page__info">
        <h3 class="page__name">
            <slot name="title"></slot>
        </h3>

        <nav class="breadcrumb__nav">
            <slot name="breadcrumbs">
            </slot>
        </nav>
    </div>
</template>



<style lang="scss" scoped>
.page__info {
    text-align: center;
    margin-top: 20px;
    .page__name {
        display: inline-block;
        padding-bottom: 5px;
        margin-bottom: 20px;
        font-size: 30px;
        border-bottom: 2px solid #fe7f02;
        font-weight: 700;
    }

    .breadcrumb__nav {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
}
</style>
