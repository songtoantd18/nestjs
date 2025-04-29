<template>
  <div class="container mt-4">
    <div class="card">
      <!-- Header -->
      <div class="card-header bg-primary text-white">
        <h2 class="mb-0">Bình luận bài viết</h2>
      </div>

      <div class="card-body">
        <!-- Post Title -->
        <div class="mb-4">
          <h3 v-if="postTitle" class="text-success">
            {{ postTitle }}
          </h3>
          <h3 v-else class="text-warning">Đang tải dữ liệu...</h3>
        </div>

        <!-- Comment Form -->
        <form @submit.prevent="handleSubmitComment" class="mb-4">
          <div class="mb-3">
            <label class="form-label">Viết bình luận</label>
            <textarea
              v-model="commentContent"
              class="form-control"
              rows="3"
              placeholder="Nhập bình luận của bạn..."
              :disabled="isSubmitting"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-success" :disabled="isSubmitting">
            {{ isSubmitting ? "Đang gửi..." : "Gửi bình luận" }}
          </button>
        </form>

        <!-- Comments List -->
        <div class="comments-section">
          <h4 class="mb-3">Danh sách bình luận</h4>

          <div v-if="isLoading" class="text-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Đang tải...</span>
            </div>
          </div>

          <ul v-else-if="comments.length" class="list-group">
            <li
              v-for="(comment, index) in sortedComments"
              :key="comment.id"
              class="list-group-item"
            >
              <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                  <h5 class="mb-1 text-primary">
                    #{{ comments.length - index }} - {{ comment.user.email }}
                    <span class="text-muted">({{ comment.user.lastName }})</span>
                  </h5>
                  <p class="mb-1">{{ comment.content }}</p>
                  <small class="text-muted">
                    {{ formatDate(comment.created_at) }}
                  </small>
                </div>
              </div>
            </li>
          </ul>

          <p v-else class="text-muted">Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData, postData } from "../ultilies/apiHelper";
import config from "../ultilies/config";

export default {
  name: "CommentPage",

  data() {
    return {
      postId: "",
      comments: [],
      commentContent: "",
      postTitle: "",
      isLoading: true,
      isSubmitting: false,
    };
  },

  computed: {
    sortedComments() {
      return [...this.comments].reverse();
    },
  },

  methods: {
    async fetchPostTitle() {
      try {
        const response = await fetchData({
          apiUrl: `${config.API.TITLE_COMMENT}/${this.postId}`,
        });
        this.postTitle = response?.title || "";
      } catch (error) {
        console.error("Lỗi khi tải tiêu đề bài viết:", error);
        this.postTitle = "";
      }
    },

    async fetchComments() {
      this.isLoading = true;
      try {
        const response = await fetchData({
          apiUrl: `${config.API.SELECT_COMMENT}/${this.postId}`,
        });
        this.comments = response || [];
      } catch (error) {
        console.error("Lỗi khi tải bình luận:", error);
        this.comments = [];
      } finally {
        this.isLoading = false;
      }
    },

    formatDate(dateString) {
      return new Date(dateString).toLocaleString("vi-VN");
    },

    async handleSubmitComment() {
      if (!this.commentContent.trim()) {
        alert("Vui lòng nhập nội dung bình luận!");
        return;
      }

      this.isSubmitting = true;
      try {
        const response = await postData({
          apiUrl: config.API.CREATE_COMMENT,
          data: {
            content: this.commentContent,
            postId: this.postId,
          },
        });

        if (response) {
          this.commentContent = "";
          await this.fetchComments();
        }
      } catch (error) {
        console.error("Lỗi khi gửi bình luận:", error);
        alert("Đã xảy ra lỗi khi gửi bình luận!");
      } finally {
        this.isSubmitting = false;
      }
    },
  },

  async mounted() {
    this.postId = this.$route.params.postId;
    await Promise.all([this.fetchPostTitle(), this.fetchComments()]);
  },
};
</script>

<style scoped>
.comments-section {
  margin-top: 2rem;
}

.list-group-item {
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}
</style>
