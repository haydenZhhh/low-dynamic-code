<template>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="日期" width="200">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column property="name" label="名字" width="120" />
    <el-table-column property="address" label="地址" width="300" />
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">清除选择</el-button>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { ElTable } from 'element-plus';

const multipleTableRef = ref(null);
const multipleSelection = ref([]);

const props = defineProps({
  getReturnData: Function,
});

const toggleSelection = (rows) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value.clearSelection();
  }
};
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  if (props.getReturnData) {
    props.getReturnData(val);
  }
};

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>
