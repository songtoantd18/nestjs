<template>
  <div class="login-page d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow p-4" style="width: 100%; max-width: 400px">
      <h3 class="text-center mb-4">Đăng nhập</h3>
      <LoginForm />

      <div class="text-center mt-3">
        <p class="mb-1">Chưa có tài khoản?</p>
        <router-link to="/register" class="btn btn-outline-primary btn-sm">
          Đăng ký ngay
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginPage",
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login-page {
  background: #f8f9fa;
}
</style>
