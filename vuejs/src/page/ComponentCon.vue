<template>
  <div>
    <h3>đây là con Con</h3>
    <ul>
      <li v-for="item in materialList" :key="item.id">
        <label>
          <input
            type="checkbox"
            :checked="selectedIds.includes(item.id)"
            @change="handleCheckboxChange(item)"
          />
          {{ item.material_num }} - {{ item.material_desc }} ({{ item.uom }})
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    materialList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedIds: [],
    };
  },
  methods: {
    handleCheckboxChange(item) {
      const index = this.selectedIds.indexOf(item.id);
      if (index > -1) {
        this.selectedIds.splice(index, 1); // Bỏ chọn
      } else {
        this.selectedIds.push(item.id); // Chọn thêm
      }

      // Lấy danh sách item được chọn
      const selectedItems = this.materialList.filter((m) => this.selectedIds.includes(m.id));

      // Emit danh sách đã chọn về cha
      this.$emit("selection-change", selectedItems);
    },
  },
};
</script>
