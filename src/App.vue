<template>
  <el-form>
    <el-form-item label="规格" style="display: flex">
      <el-row>
        <el-col :span="6">
          <el-input v-model="width" placeholder="请输入长度" />
        </el-col>
        <el-col :span="1" :offset="1">*</el-col>
        <el-col :span="6">
          <el-input v-model="height" placeholder="请输入高度" />
        </el-col>
        <el-col :span="8" :offset="2">
          <el-radio-group v-model="radio">
            <template v-for="item in spec_data">
              <el-radio :label="item.value">{{ item.label }}</el-radio>
            </template>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="数量">
      <el-row>
        <el-col :span="6">
          <el-input v-model="quantity" placeholder="请输入数量" />
        </el-col>
        <el-col :span="6" :offset="2">
          <el-input v-model="unit" placeholder="请输入单位" />
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="产品名称">
      <el-input v-model="product" placeholder="请输入产品名称" />
    </el-form-item>
    <el-form-item label="产品材质">
      <el-input v-model="mate" placeholder="请输入产品材质" />
    </el-form-item>
    <el-form-item label="产品工艺">
      <el-input v-model="craft" placeholder="请输入产品工艺" />
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model="account" placeholder="请输入账号名称" />
    </el-form-item>
    <el-input type="textarea" v-model="memo" readonly resize="none"></el-input>

    <el-button size="large" style="margin-top: 20px" @click="handleSubmit">
      复制备注
    </el-button>
  </el-form>
</template>

<script setup>
import { ref, watch } from "vue";
import clipboard3 from "vue-clipboard3";
import { ElMessage } from "element-plus";

const { toClipboard } = clipboard3();

const spec_data = [
  { label: "mm", value: "mm" },
  { label: "cm", value: "cm" },
];
const width = ref("");
const height = ref("");
const radio = ref("mm");
const quantity = ref("");
const product = ref("");
const mate = ref("");
const unit = ref("张");
const craft = ref("");
const account = ref("");
const memo = ref("");

watch(
  [width, height, radio, quantity, product, mate, unit, craft, account],
  (newVal, oldVal) => {
    if (!width.value || !height.value) {
      return;
    }
    if (width.value && height.value) {
      memo.value = `${width.value}x${height.value}${radio.value}`;
    }
    if (!quantity.value) {
      return;
    }
    if (quantity.value) {
      memo.value += `-${quantity.value}${unit.value}`;
    }
    if (!product.value) {
      return;
    }
    if (product.value) {
      memo.value += `-${product.value}`;
    }
    if (!mate.value) {
      return;
    }
    if (mate.value) {
      memo.value += `-${mate.value}`;
    }
    if (craft.value) {
      memo.value += `-${craft.value}`;
    }
    if (account.value) {
      memo.value += `-${account.value}`;
    }
  },
  { deep: true, immediate: true }
);

async function handleSubmit() {
  try {
    await toClipboard(memo.value);
    ElMessage({
      message: "复制成功",
      type: "success",
    });
  } catch (error) {
    console.log("🚀 ~ file: App.vue:116 ~ handleSubmit ~ error:", error);
    ElMessage({
      message: "复制失败",
      type: "error",
    });
  }
}
</script>

<style></style>
