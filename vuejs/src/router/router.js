// import { createRouter, createWebHistory } from "vue-router";
// import LoginPage from "../page/LoginPage.vue";
// import RegisterPage from "../page/RegisterPage.vue";
// import DashboardPage from "../page/dashboardPage.vue";

// const routes = [
//   { path: "/login", component: LoginPage },
//   { path: "/register", component: RegisterPage },
//   { path: "/dashboard", component: DashboardPage },
//   { path: "/", redirect: "/login" },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// export default router;
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../page/LoginPage.vue";
import RegisterPage from "../page/RegisterPage.vue";
import DashboardPage from "../page/dashboardPage.vue";

const routes = [
  { path: "/login", component: LoginPage },
  { path: "/register", component: RegisterPage },
  {
    path: "/dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true }, // <-- đánh dấu route cần auth
  },
  { path: "/", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 💡 Navigation Guard
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Nếu chưa login mà vào route cần auth -> chuyển hướng về login
    next("/login");
  } else {
    // Cho phép đi tiếp
    next();
  }
});

export default router;
