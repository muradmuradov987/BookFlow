<template>
  <button class="secondary__btn">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.secondary__btn {
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 8px !important;
  background: linear-gradient(to top, #019267, #00C897);
  color: #fff;
  cursor: pointer;
  &:hover {
    background: linear-gradient(to top, #019267, #019267);
  }
}
</style>