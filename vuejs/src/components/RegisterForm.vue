<template>
  <div class="register-page d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow p-4" style="width: 100%; max-width: 500px">
      <h3 class="text-center mb-4">Đăng ký tài khoản</h3>
      <form @submit.prevent="registerAccount">
        <div class="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            v-model="emailRegister"
            class="form-control"
            placeholder="Nhập email"
            required
          />
        </div>

        <div class="form-group mb-3">
          <label>Password</label>
          <input
            v-model="passwordRegister"
            type="password"
            class="form-control"
            placeholder="Mật khẩu"
            required
          />
        </div>

        <div class="form-group mb-3">
          <label>First Name</label>
          <input v-model="firstName" type="text" class="form-control" placeholder="Tên" />
        </div>

        <div class="form-group mb-3">
          <label>Last Name</label>
          <input v-model="lastName" type="text" class="form-control" placeholder="Họ" />
        </div>

        <div class="form-group mb-4">
          <label>Role</label>
          <input v-model="roleUser" type="text" class="form-control" placeholder="user / admin" />
        </div>

        <button type="submit" class="btn btn-primary w-100">Đăng ký</button>

        <div class="text-center mt-3">
          <p>Đã có tài khoản? <router-link to="/login">Đăng nhập tại đây</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";

export default {
  name: "RegisterPage",
  data() {
    return {
      emailRegister: "",
      passwordRegister: "",
      firstName: "",
      lastName: "",
      roleUser: "",
    };
  },
  methods: {
    async registerAccount() {
      const registerData = {
        email: this.emailRegister,
        password: this.passwordRegister,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.roleUser,
      };

      try {
        const response = await axios.post(config.API.REGISTER, registerData);
        const result = response.data;

        if (result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
          alert(result.msg || "Đăng ký thành công!");
          this.$router.push("/dashboard");
        } else {
          alert("Đăng ký không thành công!");
        }
      } catch (error) {
        console.error("Đăng ký thất bại:", error.response?.data || error);
        alert("Đăng ký thất bại. Vui lòng thử lại!");
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  background-color: #f8f9fa;
}
</style>
