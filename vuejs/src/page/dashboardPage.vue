<template>
  <div>
    <h2>đây là dashboard</h2>
    <button @click="logOut">log out</button>

    <div class="table-container">
      <h2>Danh sách bài viết</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tiêu đề</th>
            <th>Mô tả</th>
            <th>Ngày tạo</th>
            <th>Ngày cập nhật</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in this.dataZ" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.description }}</td>
            <td>{{ formatDate(post.created_at) }}</td>
            <td>{{ formatDate(post.updated_at) }}</td>
            <td>
              <button @click="showComment(post.id)">chi tiết</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { fetchData } from "../ultilies/apiHelper";
import config from "../ultilies/config";
export default {
  data() {
    return {
      dataZ: [],
    };
  },
  methods: {
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
  computed: {},
  watch: {},
  mounted() {
    this.LoadData();
  },
};
</script>

<style scoped>
.table-container {
  margin: 20px;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
