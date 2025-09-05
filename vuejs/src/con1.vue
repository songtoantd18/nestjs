<template>
  <div>
    <h3>Đây là Con</h3>
    <p>Con nhận từ Cha: {{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "ChildComponent",

  props: {
    message: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      localMessage: "",
    };
  },

  // 🔥 lifecycle hooks của Con
  beforeCreate() {
    console.log("CON 👉 beforeCreate");
  },
  created() {
    console.log("CON 👉 created, prop message:", this.message);
    this.localMessage = this.message;
  },
  beforeMount() {
    console.log("CON 👉 beforeMount");
  },
  mounted() {
    console.log("CON 👉 mounted");
  },
  beforeUpdate() {
    console.log("CON 👉 beforeUpdate");
  },
  updated() {
    console.log("CON 👉 updated, prop message:", this.message);
  },
  beforeDestroy() {
    console.log("CON 👉 beforeDestroy");
  },
  destroyed() {
    console.log("CON 👉 destroyed");
  },

  watch: {
    message(newVal) {
      console.log("CON 👉 watch message thay đổi:", newVal);
      this.localMessage = newVal;
    },
  },
};
</script>
