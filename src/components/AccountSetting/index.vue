<template>
    <ul class="account__setting">
      <li @click="$router.push('/register')">Register</li>
      <li @click="$router.push('/forgetten-password')">Forgotten Password</li>
      <li  @click="$router.push('/profile')">My Account</li>
      <li>Address Book</li>
      <li  @click="$router.push('/basket')">Basket</li>
      <li>Order History</li>
      <li>Recurring payments</li>
      <li>Reward Points</li>
      <li>Transactions</li>
      <li>Newsletter</li>
    </ul>
  </template>
  
  <style lang="scss">
  .account__setting {
    width: 100%;
    border: 2px solid #00c876;
    border-radius: 5px;
    li {
      padding: 10px 20px;
      cursor: pointer;
      transition: 0.3s ease;
      &:hover {
        background: #00c876;
        color: #fff;
      }
    }
  }
  </style>