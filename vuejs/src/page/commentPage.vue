<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-header bg-primary text-white">
        <h2 class="mb-0">Đây là trang bình luận của bài viết</h2>
      </div>
      <div class="card-body">
        <h3 v-if="titleComment.length" class="text-success">
          {{ titleComment.title }}
        </h3>
        <h3 v-else class="text-warning">Đang tải dữ liệu...</h3>

        <!-- Form tạo bình luận -->
        <form @submit.prevent="createComment">
          <div class="mb-3">
            <label class="form-label">Viết bình luận</label>
            <textarea
              v-model="newComment"
              class="form-control"
              rows="3"
              placeholder="Nhập bình luận của bạn..."
            ></textarea>
          </div>
          <button type="submit" class="btn btn-success">Gửi</button>
        </form>

        <ul v-if="dataComment.length" class="list-group mt-3">
          <li
            v-for="(comment, index) in dataComment.slice().reverse()"
            :key="comment.id"
            class="list-group-item"
          >
            <div class="d-flex align-items-center">
              <div class="flex-grow-1">
                <h5 class="mb-1 text-primary">
                  #{{ index + 1 }} - {{ comment.user.email }} ---{{ comment.user.lastName }}
                </h5>
                <p class="mb-1">{{ comment.content }}</p>
                <small class="text-muted">Ngày tạo: {{ formatDate(comment.created_at) }}</small>
              </div>
            </div>
          </li>
        </ul>
        <p v-else class="text-danger mt-3">Không có bình luận nào.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData, postData } from "../ultilies/apiHelper";
import config from "../ultilies/config";

export default {
  data() {
    return {
      postId: "",
      dataComment: "",
      newComment: "", // Lưu nội dung comment mới
      titleComment: "",
    };
  },
  methods: {
    async loadTitleComment() {
      console.log("🚀 ~ LoadComment ~ postId:", this.postId);

      this.titleComment = await fetchData({
        apiUrl: `${config.API.TITLE_COMMENT}/${this.postId}`,
      });
      console.log("🚀 ~ loadTitleComment ~ this.titleComment:", this.titleComment);
    },
    async LoadComment() {
      console.log("🚀 ~ LoadComment ~ postId:", this.postId);

      this.dataComment = await fetchData({
        apiUrl: `${config.API.SELECT_COMMENT}/${this.postId}`,
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString("vi-VN");
    },
    async createComment() {
      if (!this.newComment.trim()) {
        alert("Bình luận không được để trống!");
        return;
      }

      const payload = {
        content: this.newComment,
        postId: this.postId,
      };

      try {
        const response = await postData({
          apiUrl: config.API.CREATE_COMMENT,
          data: payload,
        });
        console.log("🚀 ~ createComment ~ response:", response);

        if (response) {
          this.newComment = ""; // Xóa nội dung trong ô input
          this.LoadComment(); // Cập nhật lại danh sách bình luận
        }
      } catch (error) {
        console.error("Lỗi khi gửi bình luận:", error);
        alert("Đã xảy ra lỗi khi gửi bình luận!");
      }
    },
  },
  mounted() {
    this.postId = this.$route.params.postId;
    this.LoadComment();
    this.loadTitleComment();
  },
};
</script>
