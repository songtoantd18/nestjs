import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import LoginPage from "../page/LoginPage.vue";
import RegisterPage from "../page/RegisterPage.vue";
import DashboardPage from "../page/dashboardPage.vue";
import config from "../ultilies/config";
import CommentPage from "../page/commentPage.vue";
import ComponentCha from "@/page/ComponentCha.vue";

const routes = [
  { path: "/login", component: LoginPage },
  { path: "/componentcha", component: ComponentCha },

  { path: "/comment/:postId", component: CommentPage },

  { path: "/register", component: RegisterPage },
  {
    path: "/dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true }, // cần đăng nhập
  },
  { path: "/", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Hàm kiểm tra token hợp lệ không
async function isTokenValid() {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    await axios.get(config.API.CURRENT_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true; // Token hợp lệ nếu request thành công
  } catch (error) {
    console.error("❌ Token không hợp lệ:", error.response?.status);
    return false; // Token không hợp lệ nếu có lỗi
  }
}

// ✅ Navigation Guard hoàn chỉnh
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = token && (await isTokenValid());

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Chưa đăng nhập mà vào route yêu cầu auth
    next("/login");
  } else if ((to.path === "/login" || to.path === "/register") && isLoggedIn) {
    // Đã đăng nhập mà vào login/register
    next("/dashboard");
  } else {
    // Cho phép đi tiếp
    next();
  }
});

export default router;
