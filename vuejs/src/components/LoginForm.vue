<template>
  <div id="app">
    <div>
      <div class="container">
        <div>
          <div>
            <div>
              <h1>Sign In</h1>
              <form @submit.prevent="doLogin">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    v-model="emailLogin"
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    v-model="passwordLogin"
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                  />
                </div>
                <input type="submit" class="btn btn-primary" value="Sign In" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config";
export default {
  data() {
    return {
      emailLogin: "",
      passwordLogin: "",
    };
  },
  methods: {
    async doLogin() {
      console.log("đây là login");
      console.log("this.passwordLogin:", this.passwordLogin);
      console.log("🚀 ~ doLogin ~ this.emailLogin:", this.emailLogin);

      const loginData = {
        email: this.emailLogin,
        password: this.passwordLogin,
      };

      try {
        const response = await axios.post(config.API.LOGIN, loginData);
        console.log("🚀 ~ doLogin ~ response:", response);
        const result = response.data;
        console.log("Login successful:", result);

        // Lưu accessToken vào localStorage
        if (result.accessToken) {
          localStorage.setItem("accessToken", result.accessToken);
          console.log("Access token saved:", result.accessToken);
        }

        // Hiển thị thông báo thành công
        alert(result.msg);

        // Chuyển hướng (nếu dùng Vue Router)
        this.$router.push("/dashboard");
      } catch (error) {
        alert("tài khoản này không tồn tại");
        console.error("Error during login:", error.response ? error.response.data : error);
      }
    },
  },
  computed: {},
  watch: {},
  mounted() {},
};
</script>
