<template>
  <div>
    <button class="btn btn-danger" @click="logOut">Log out</button>

    <!-- Tabs để chuyển đổi giữa Dashboard 1 và 2 -->
    <div class="mb-3 tabs" v-if="isAdmin">
      <button
        class="btn btn-outline-primary btn-sm"
        :class="{ active: currentTab === 1 }"
        @click="currentTab = 1"
      >
        Dashboard 1
      </button>
      <button
        v-if="isAdmin"
        class="btn btn-outline-primary btn-sm"
        :class="{ active: currentTab === 2 }"
        @click="currentTab = 2"
      >
        Danh sách user
      </button>
    </div>

    <!-- Dashboard 2 (Danh sách user) - Chỉ hiển thị nếu là admin -->
    <div v-if="currentTab === 2 && isAdmin">
      <DashboardAdmin />
    </div>

    <!-- Dashboard 1 -->
    <div v-if="currentTab === 1">
      <!-- Form tạo bài viết -->
      <div class="container mt-4 p-4 border rounded shadow-sm">
        <h2>Tạo bài viết mới</h2>
        <form @submit.prevent="createPost">
          <div class="mb-3">
            <label for="title" class="form-label">Tiêu đề</label>
            <input
              type="text"
              id="title"
              class="form-control"
              v-model="newPost.title"
              placeholder="Nhập tiêu đề bài viết"
              required
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Mô tả</label>
            <textarea
              id="description"
              class="form-control"
              v-model="newPost.description"
              placeholder="Nhập mô tả bài viết"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Tạo bài viết</button>
        </form>
      </div>

      <!-- Danh sách bài viết -->
      <div class="table-container mt-4">
        <h2>Danh sách bài viết</h2>
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tiêu đề</th>
              <th>Mô tả</th>
              <th>Ngày tạo</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in dataZ" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.title }}</td>
              <td>{{ post.description }}</td>
              <td>{{ formatDate(post.created_at) }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="showComment(post.id)"
                >
                  <i class="fas fa-info-circle"></i> Chi tiết
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData, postData } from "../ultilies/apiHelper";
import config from "../ultilies/config";
import DashboardAdmin from "../page/DashboardAdmin.vue"; // Dashboard 2

export default {
  data() {
    return {
      currentTab: 1, // Tab hiện tại (1: Dashboard 1, 2: Dashboard 2)
      dataZ: [],
      newPost: {
        title: "", // Tiêu đề bài viết
        description: "", // Mô tả bài viết
      },
      isAdmin: false, // Biến kiểm tra role admin
      userData: null, // Dữ liệu giải mã từ accessToken
    };
  },
  components: { DashboardAdmin },
  methods: {
    // Hàm giải mã JWT token
    decodeToken(token) {
      try {
        const base64Url = token.split(".")[1]; // Lấy phần payload của JWT
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        );
        return JSON.parse(jsonPayload);
      } catch (error) {
        console.error("Lỗi giải mã token:", error);
        return null;
      }
    },

    async createPost() {
      if (!this.newPost.title.trim() || !this.newPost.description.trim()) {
        alert("Tiêu đề và mô tả không được để trống!");
        return;
      }

      const payload = {
        title: this.newPost.title,
        description: this.newPost.description,
      };

      try {
        const response = await postData({
          apiUrl: config.API.CREATE_POST,
          data: payload,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response) {
          this.newPost.title = "";
          this.newPost.description = "";
          this.LoadData();
        }
      } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error);
        alert("Đã xảy ra lỗi khi tạo bài viết!");
      }
    },

    async showComment(postId) {
      this.$router.push(`/comment/${postId}`);
    },

    formatDate(dateString) {
      if (!dateString) return "";
      try {
        return new Date(dateString).toLocaleDateString("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      } catch (error) {
        console.error("Lỗi định dạng ngày:", error);
        return dateString;
      }
    },

    async logOut() {
      localStorage.clear();
      this.$router.push("/login");
    },

    async LoadData() {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        // Giải mã token để lấy dữ liệu người dùng
        this.userData = this.decodeToken(accessToken);
        console.log("🚀 ~ Decoded User Data:", this.userData);

        // Kiểm tra role từ dữ liệu giải mã
        this.isAdmin = this.userData?.role === "admin" || false;

        this.dataZ = await fetchData({
          apiUrl: config.API.SELECT_POST,
          columns: [],
          conditions: { userId: this.userData?.id }, // Dùng id từ token
        });
      } else {
        console.warn("Không tìm thấy accessToken, chuyển hướng đến login");
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    this.LoadData();
  },
};
</script>

<style scoped>
/* Tabs */
.tabs {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.btn-outline-primary.active {
  background-color: #007bff;
  color: white;
  border: 1px solid #007bff;
}

.btn-outline-primary {
  margin: 0 10px;
}

.table-container {
  margin-top: 30px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 12px 15px;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #ddd;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.container {
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.btn-danger,
.btn-primary,
.btn-outline-primary {
  width: 100%;
}
.btn-danger {
  padding: 6px 12px; /* Kích thước nhỏ gọn */
  width: auto; /* Không full width */
  display: inline-block; /* Đảm bảo nút chỉ chiếm không gian cần thiết */
}
</style>
