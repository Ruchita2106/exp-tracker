
<script setup lang="ts">
import { computed, ref } from "vue"
import Datepicker from 'vue3-datepicker'

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
const selectedMonth = ref<any>('');
const formattedMonth = ref('');

// eslint-disable-next-line vue/return-in-computed-property
const sortedAndFilteredTransactions = computed(() =>{
  if(!selectedMonth.value){
    return [...props.transactions].sort((a, b) => new Date(b.createdAt) as any - new Date(a.createdAt));
  }
  const selectedDate = new Date(selectedMonth.value);
      const selectedYear = selectedDate.getFullYear();
      const selectedMonthIndex = selectedDate.getMonth();

      return props.transactions.filter((transaction:any) => {
        const transactionDate = new Date(transaction.expanseDate);
        return (
          transactionDate.getFullYear() === selectedYear &&
          transactionDate.getMonth() === selectedMonthIndex
        );
      });

})

// const sortedAndFilteredTransactions = computed(() => {
//       // Sort transactions by createdAt in descending order
//       const sortedTransactions = [...props.transactions].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
//       console.log('sortedTransactions: ', sortedTransactions);

//       if (!selectedMonth.value) {
//         return sortedTransactions;
//       }

//       const selectedDate = new Date(selectedMonth.value);
//       const selectedYear = selectedDate.getFullYear();
//       const selectedMonthIndex = selectedDate.getMonth();

//       // Filter transactions by the selected month and year
//       return sortedTransactions.filter(transaction => {
//         const transactionDate = new Date(transaction.createdAt);
//         return (
//           transactionDate.getFullYear() === selectedYear &&
//           transactionDate.getMonth() === selectedMonthIndex
//         );
//       });
//     });


// methods
const handleMonthChange = (date: any) => {
      if (date) {
        formattedMonth.value = formatMonth(new Date(date));
      } else {
        formattedMonth.value = '';
      }
    };

    const formatMonth = (date: any) => {
      const options = { year: 'numeric', month: 'short' };
      return date.toLocaleDateString('en-US', options);
    };

const deleteTransaction = () =>{
  emit('deleteTransaction', transactionToDelete.value)
  deleteDialog.value=false
  transactionToDelete.value = null



}
// const openDeleteDialog = (id: any) => {
// deleteDialog.value = true
// transactionToDelete.value = id
// }
</script>

<template>
    <div>
        <h3>History</h3>
        <VCol cols="12"  class="tra-history">
          
          <Datepicker
      v-model="selectedMonth"
      placeholder="Pick a month"
      minimumView="month"
      :clearable="true"
      @update:model-value="handleMonthChange"
      class="tra-history"
    >
   
  </Datepicker>
              </VCol> 
      <ul id="list" class="list">
        <div class="history-header">
        <span>content</span>
        <span>date</span>
        <span>amount</span>
        <span></span>

      </div>

        <li  v-for="t in sortedAndFilteredTransactions" :key="t.id" :class="['Income', 'income'].includes(t.type) ? 'plus' : 'minus'" class="history">
          {{ t.text }} <span style="font-size: 14px; ">{{ t.expanseDate }} </span><span> {{ ['Income', 'income'].includes(t.type) ? t.amount : '-' +t.amount}}</span> 
          <!-- <VBtn  variant="text"  @click="openDeleteDialog(t.id)" class="delete-icon">
            <VIcon icon="mdi-close" size="16"></VIcon>
          </VBtn> -->
       <!-- <span style="font-size: 12px;"> {{ t.createdAt }}</span> -->
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