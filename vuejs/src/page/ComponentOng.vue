<template>
  <div style="border: 2px solid red; padding: 10px">
    <h2>Component Ông</h2>
    <ComponentCha :tableData="dsVatTu" @chon-vat-tu="luuVatTuDaChon" />

    <div v-if="vatTuDaChon.length">
      <h3>Vật tư được chọn ở ông:</h3>
      <ul>
        <li v-for="item in vatTuDaChon" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import ComponentCha from "./ComponentCha.vue";

export default {
  name: "ComponentOng",
  components: { ComponentCha },
  data() {
    return {
      dsVatTu: [
        { id: 1, name: "Thép", selected: false },
        { id: 2, name: "Xi măng", selected: false },
        { id: 3, name: "Gạch", selected: false },
      ],
      vatTuDaChon: [],
    };
  },
  methods: {
    luuVatTuDaChon(dsChon) {
      this.vatTuDaChon = dsChon;
      console.log("Vật tư đã chọn:", dsChon);
    },
  },
};
</script>
