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
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in this.dataZ" :key="post.id">
            <td>{{ post.id }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.description }}</td>
            <td>{{ formatDate(post.created_at) }}</td>
            <td>{{ formatDate(post.updated_at) }}</td>
            <td>{{ post.userId }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from "../ultilies/config";
export default {
  data() {
    return {
      dataZ: [],
    };
  },
  methods: {
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
      try {
        const responseData = JSON.parse(localStorage.getItem("responseData") || "{}");
        const token = localStorage.getItem("accessToken");
        // Define the columns array
        // const columns = ["id", "title", "description"];
        const columns = [];
        // Create conditions object
        const conditions = { userId: responseData.id || 53 }; // Using 53 as fallback if responseData.id is undefined

        console.log("🚀 ~ LoadData ~ responseData:", responseData);

        // Construct the URL with query parameters
        const url = `${config.API.SELECT_POST}?columns=${encodeURIComponent(
          JSON.stringify(columns)
        )}&conditions=${encodeURIComponent(JSON.stringify(conditions))}`;
        console.log("🚀 ~ LoadData ~ url:", url);

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.dataZ = response.data;
        console.log("🚀 ~ LoadData ~ this.dataZ:", this.dataZ);
      } catch (error) {
        console.error("Error in LoadData:", error);
      }
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
