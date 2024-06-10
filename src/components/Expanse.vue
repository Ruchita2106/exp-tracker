<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// Interface
interface Props {
  income: Number,
  expenses: Number
}

//Props
const props = defineProps<Props>()
</script>

<template>
  <div>
    <!-- <div class="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p id="money-plus" class="money plus">{{ props.income }}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p id="money-minus" class="money minus">{{ props.expenses }}</p>
      </div>
    </div> -->
    <VRow class="inc-exp-container mt-5">
      <VCol cols="12">
        <h4>Income</h4>
        <span id="money-plus" class="money plus">{{ props.income }}</span>
      </VCol>
      
      <VCol cols="12">
        <h4>Expense</h4>
        <span id="money-minus" class="money minus">{{props.expenses }}</span>
</VCol>
    </VRow>
  </div>
</template>



<style scoped>
</style>