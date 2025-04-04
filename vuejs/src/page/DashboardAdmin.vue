<template>
  <div class="dashboard-admin">
    <h1>Danh sách Users</h1>
    <div class="accordion" id="userAccordion">
      <div v-for="(user, userIndex) in combinedData" :key="user.id" class="accordion-item">
        <!-- User Accordion Header với STT -->
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#user' + userIndex"
          >
            {{ userIndex + 1 }}. {{ user.name || "User " + user.id }}
          </button>
        </h2>

        <!-- User Accordion Content -->
        <div
          :id="'user' + userIndex"
          class="accordion-collapse collapse"
          data-bs-parent="#userAccordion"
        >
          <div class="accordion-body">
            <div v-if="user.posts.length > 0" class="accordion" :id="'postAccordion' + userIndex">
              <div v-for="(post, postIndex) in user.posts" :key="post.id" class="accordion-item">
                <!-- Post Accordion Header với STT -->
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    :data-bs-target="'#post' + userIndex + '-' + postIndex"
                  >
                    {{ postIndex + 1 }}. {{ post.title || "Post " + post.id }}
                  </button>
                </h2>

                <!-- Post Accordion Content -->
                <div
                  :id="'post' + userIndex + '-' + postIndex"
                  class="accordion-collapse collapse"
                  :data-bs-parent="'#postAccordion' + userIndex"
                >
                  <div class="accordion-body">
                    {{ post.description || "No description available" }}
                    <ul class="list-group mt-2">
                      <li
                        v-for="(comment, commentIndex) in post.comments"
                        :key="commentIndex"
                        class="list-group-item"
                      >
                        {{ comment.content || "No comment content" }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-muted">Không có bài viết nào cho user này.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchData } from "../ultilies/apiHelper";
import config from "../ultilies/config";

export default {
  data() {
    return {
      combinedData: [], // Dữ liệu gộp
    };
  },
  methods: {
    async loadAllData() {
      // Lấy dữ liệu từ API
      const users = await fetchData({
        apiUrl: config.API.SHOW_ALL_USER,
        columns: [],
        conditions: { role: "user" },
      });
      const posts = await fetchData({
        apiUrl: config.API.SHOW_ALL_POST,
      });
      const comments = await fetchData({
        apiUrl: config.API.SHOW_ALL_COMMENT,
      });

      // Gộp dữ liệu
      this.combinedData = users.map((user) => {
        console.log("🚀 ~ User:", user);

        const userPosts = posts
          .filter((post) => post.userId === user.id)
          .map((post) => {
            console.log("🚀 ~ Post for user", user.id, ":", post);

            const postComments = comments
              .filter((comment) => comment.postId === post.id)
              .map((comment) => {
                console.log("🚀 ~ Comment for post", post.id, ":", comment);
                return {
                  id: comment.id,
                  content: comment.content || "No comment content",
                };
              });

            return {
              id: post.id,
              title: post.title,
              description: post.description,
              comments: postComments,
            };
          });

        console.log("🚀 ~ Posts for user", user.id, ":", userPosts);

        return {
          id: user.id,
          name: `${user.firstName}`,
          posts: userPosts,
        };
      });

      console.log("🚀 ~ Combined Data:", this.combinedData);
    },
  },
  mounted() {
    this.loadAllData();
  },
};
</script>

<style scoped>
.dashboard-admin {
  padding: 20px;
}
</style>
