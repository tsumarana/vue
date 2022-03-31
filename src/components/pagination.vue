<template>
  <div class="pagination-block">
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";

const props = defineProps({
  totalCount: Number,
});

let currentPage = ref(1);
let pageSize = ref(20);
const emit = defineEmits(["currentPageChange", "pageSizeChange"]);
const handleSizeChange = (val) => {
  pageSize = val;
  emit("pageSizeChange", val);
};
const handleCurrentChange = (val) => {
  currentPage = val;
  emit("currentPageChange", val);
};
</script>

<style scoped>
.pagination-block {
  margin-top: 10px;
  margin-bottom: 16px;
  margin-left: 30%;
}
</style>
