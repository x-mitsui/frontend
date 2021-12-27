<template>
  <div>
    <h2>home</h2>
    <hr />

    <router-link to="/home/message">消息</router-link>
    <router-link to="/home/shops">商品</router-link>
    <router-link to="/home/moment">动态</router-link>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
