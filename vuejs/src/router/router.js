import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import LoginPage from "../page/LoginPage.vue";
import RegisterPage from "../page/RegisterPage.vue";
import DashboardPage from "../page/dashboardPage.vue";
import config from "../config";
const routes = [
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  {
    path: "/dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true }, // route này cần login
  },
  { path: "/", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Hàm kiểm tra token có hợp lệ không
async function isTokenValid() {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const response = await axios.get(config.API.CURRENT_USER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("🚀 ~ isTokenValid ~ response:", response);

    // Nếu có user trả về => token hợp lệ
    return !!response.data;
  } catch (error) {
    console.error("Token không hợp lệ hoặc hết hạn:", error.response?.status);
    return false;
  }
}

// ✅ Navigation Guard
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const valid = await isTokenValid();

    if (!valid) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
