<template>
  <button class="btn btn-danger" @click="logOut">Log out</button>

  <!-- Tabs để chuyển đổi giữa Dashboard 1 và 2 -->
  <div class="mb-3 tabs">
    <button
      class="btn btn-outline-primary btn-sm"
      :class="{ active: currentTab === 1 }"
      @click="currentTab = 1"
    >
      Dashboard 1
    </button>
    <button
      class="btn btn-outline-primary btn-sm"
      :class="{ active: currentTab === 2 }"
      @click="currentTab = 2"
    >
      Danh sách user
    </button>
  </div>
  <div v-if="currentTab === 2"><DashboardAdmin /></div>

  <!-- Dashboard 1 -->
  <div v-if="currentTab === 1">
    <h2>Đây là Dashboard 1</h2>

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
          <tr v-for="post in this.dataZ" :key="post.id">
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

  <!-- Dashboard 2 -->
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
    };
  },
  components: { DashboardAdmin },
  methods: {
    async createPost() {
      // Kiểm tra nếu tiêu đề hoặc mô tả rỗng
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

        console.log("🚀 ~ createPost ~ response:", response);

        if (response) {
          this.newPost.title = ""; // Reset form
          this.newPost.description = ""; // Reset form
          this.LoadData(); // Cập nhật lại danh sách bài viết
        }
      } catch (error) {
        console.error("Lỗi khi tạo bài viết:", error);
        alert("Đã xảy ra lỗi khi tạo bài viết!");
      }
    },

    async showComment(postId) {
      console.log("🚀 ~ showComment ~ postId:", postId);
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
      localStorage.removeItem("accessToken");
      localStorage.removeItem("responseData");
      this.$router.push("/login");
    },

    async LoadData() {
      const responseData = JSON.parse(localStorage.getItem("responseData") || "{}");

      this.dataZ = await fetchData({
        apiUrl: config.API.SELECT_POST,
        columns: [],
        conditions: { userId: responseData.id },
      });
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
</style>
