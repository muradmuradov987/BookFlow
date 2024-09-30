<template>
  <ul class="account__setting">
    <li @click="$router.push('/register')">Register</li>
    <li @click="$router.push('/forgetten-password')">Forgotten Password</li>
    <li>My Account</li>
    <li>About Us</li>
    <li>Contact Us</li>
    <li>Brands</li>
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