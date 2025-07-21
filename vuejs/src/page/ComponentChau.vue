<template>
  <div style="border: 1px solid green; padding: 10px; margin: 10px">
    <h4>Component Cháu</h4>
    <ul>
      <li v-for="item in tableData" :key="item.id">
        <input type="checkbox" v-model="item.selected" />
        {{ item.name }}
      </li>
    </ul>
    <button @click="xacNhan">Xác nhận chọn vật tư</button>
  </div>
</template>

<script>
export default {
  name: "ComponentChau",
  props: ["tableData"],
  methods: {
    xacNhan() {
      const selected = this.tableData.filter((item) => item.selected);
      this.$emit("chon-vat-tu", selected); // Gửi dữ liệu lên component cha
    },
  },
};
</script>
