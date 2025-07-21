<template>
  <div>
    <h2>Cha</h2>
    <ComponentCon :materialList="materialList" @selection-change="handleSelectedMaterials" />

    <h3>Danh sách đã chọn ở cha :</h3>
    <h4>{{ selectedMaterials.length }}</h4>
    <h4>{{ selectedMaterials }}</h4>
  </div>
</template>

<script>
import ComponentCon from "./ComponentCon.vue";
import { materialList111 } from "./data.js";

export default {
  components: {
    ComponentCon,
  },
  data() {
    return {
      materialList: materialList111,
      selectedMaterials: [],
    };
  },
  methods: {
    handleSelectedMaterials(listFromChild) {
      this.selectedMaterials = listFromChild;
    },
  },
};
</script>
