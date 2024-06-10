<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// Interface
interface Props {
    total : Number
}

//Props
const props = defineProps<Props>()

</script>

<template>
  <div>
    <h3>Your Balance</h3>
    <h2 id="balance">{{ props.total }}</h2>
  </div>
</template>



<style scoped>
</style>