<template>
  <div>
    <h2>Login</h2>
    <button @click="loginClick">登录</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const loginClick = () => {
      window.localStorage.setItem("token", "123");
      router.push({
        path: "/home",
      });
    };
    return {
      loginClick,
    };
  },
};
</script>

<style scoped></style>
