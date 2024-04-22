
<script setup lang="ts">
import { ref } from "vue"

//Interface
interface Props {
  transactions : any
}

interface Emit {
  (e: 'deleteTransaction', value: object | any): void
}

//Props
const props = defineProps<Props>()

//emit
const emit = defineEmits<Emit>()

//Data 
const deleteDialog = ref<boolean>(false)
  const transactionToDelete = ref<number | null>(null)

// methods
const deleteTransaction = () =>{
  emit('deleteTransaction', transactionToDelete.value)
  deleteDialog.value=false
  transactionToDelete.value = null



}
const openDeleteDialog = (id: any) => {
deleteDialog.value = true
transactionToDelete.value = id
}
</script>

<template>
    <div>
        <h3>History</h3>
      <ul id="list" class="list">
        <li v-for="t in props.transactions" :key="t.id" :class="['Income', 'income'].includes(t.type) ? 'plus' : 'minus'">
          {{ t.text }} <span> {{ ['Income', 'income'].includes(t.type) ? t.amount : '-' +t.amount}}</span> 
          <VBtn variant="text"  @click="openDeleteDialog(t.id)" class="delete-icon">
            <VIcon icon="mdi-close" size="16"></VIcon>
          </VBtn>
        </li>
        
      </ul>
    </div>

    <VDialog v-model="deleteDialog" max-width="500" persistent>
      <DialogCloseBtn @click="deleteDialog = false" />
      <VCard>
        <VCardTitle class="font-weight-x-larger mt-3">
          {{
           'Delete transaction'
          }}</VCardTitle
        >
        <VCardTitle>
          {{
           'Are you sure want to delete this transaction?'
          }}</VCardTitle
        >
        <VSpacer />
        <div class="d-flex justify-end pa-3">
          <VBtn
            color="primary"
            variant="elevated"
            @click="deleteTransaction"
            class="mr-3"
          >
            Yes
          </VBtn>
          <VBtn
            variant="flat"
            color="black"
            @click="deleteDialog = false"
            class="mr-3"
          >
            Cancel
          </VBtn>
        </div>
        <VSpacer />
      </VCard>
    </VDialog>
</template>



<style scoped>

</style>