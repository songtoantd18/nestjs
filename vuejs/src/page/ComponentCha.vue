<template>
  <div style="border: 1px solid blue; padding: 10px; margin: 10px">
    <h3>Component Cha</h3>
    <ComponentChau :tableData="tableData" @chon-vat-tu="chuyenLenOng" />
  </div>
</template>

<script>
import ComponentChau from "./ComponentChau.vue";

export default {
  name: "ComponentCha",
  components: { ComponentChau },
  props: ["tableData"],
  methods: {
    chuyenLenOng(dsVatTu) {
      this.$emit("chon-vat-tu", dsVatTu); // Truyền tiếp dữ liệu lên ông
    },
  },
};
</script>
