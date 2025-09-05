<template>
  <div>
    <h2>Đây là Cha</h2>
    <p>Cha message: {{ parentMessage }}</p>
    <button @click="updateMessage">Đổi message</button>

    <!-- Truyền dữ liệu xuống Con -->
    <ChildComponent :message="parentMessage" />
  </div>
</template>

<script>
import ChildComponent from "./con1.vue";

export default {
  name: "ParentComponent",
  components: { ChildComponent },

  data() {
    return {
      parentMessage: "Hello từ Cha",
    };
  },

  methods: {
    updateMessage() {
      this.parentMessage = "Message mới từ Cha " + Date.now();
    },
  },

  // 🔥 lifecycle hooks của Cha
  beforeCreate() {
    console.log("CHA 👉 beforeCreate");
  },
  created() {
    console.log("CHA 👉 created");
  },
  beforeMount() {
    console.log("CHA 👉 beforeMount");
  },
  mounted() {
    console.log("CHA 👉 mounted");
  },
  beforeUpdate() {
    console.log("CHA 👉 beforeUpdate");
  },
  updated() {
    console.log("CHA 👉 updated");
  },
  beforeDestroy() {
    console.log("CHA 👉 beforeDestroy");
  },
  destroyed() {
    console.log("CHA 👉 destroyed");
  },
};
</script>
