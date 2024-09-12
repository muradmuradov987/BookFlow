<template>
    <button class="primary__btn">
      <slot></slot>
    </button>
  </template>
  
  <style lang="scss" scoped>
  .primary__btn {
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 8px !important;
    background: linear-gradient(to top, #fc4a1a, #f7b733);
    color: #fff;
    cursor: pointer;
    &:hover {
      background: linear-gradient(to top, #fc4a1a, #fc4a1a);
    }
  }
  </style>