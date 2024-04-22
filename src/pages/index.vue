<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'

import Header from '../components/Header.vue'
import Balance from '../components/Balance.vue'
import Expanse from '../components/Expanse.vue'
import TransactionHistory from '../components/TransactionHistory.vue'
import AddTransaction from '../components/AddTransaction.vue'




//data
const transaction = ref<any>([
    {
      id: 1,
      text: 'Footware',
      amount: 600,
      type:'expense'
    },
    {
      id: 2,
      text: 'Clothes',
      amount: 5000,
      type:'expense'
    },
    {
      id: 3,
      text: 'Extra',
      amount: 1500,
      type:'income'
    },
    {
      id: 4,
      text: 'Grocery',
      amount: 1000,
      type:'expense'
    },
    {
      id: 5,
      text: 'Salary',
      amount: 22000,
      type:'income'
    }
  ])

const transactions = ref<any>([])

// Computed

// total amount
const totalAmount = computed(() => {
  return transactions.value.reduce((acc: any, transaction: any) => {
    return acc + transaction.amount
  }, 0)
})

// income
const income = computed(() => {
  return transactions.value
    .filter((transaction: any) => ['Income', 'income'].includes(transaction.type))
    .reduce((acc: any, transaction: any) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})

//expenses
const expenses = computed(() => {
  return transactions.value
    .filter((transaction: any) => ['Expense', 'expense'].includes(transaction.type))
    .reduce((acc: any, transaction: any) => {
      return   acc + transaction.amount
    }, 0)
    .toFixed(2)
})

//methods 

//localStorage
const updateLocalStorage = () => {
  localStorage.setItem('transaction', JSON.stringify(transactions.value))
}

//RandomId
const generateRandomId = () => {
  return Math.floor(Math.random() *10)
}

//addTransaction
const handleTransactions = (data: any) => {
  const input = {
    id: generateRandomId(),
    text: data.text,
    amount: parseFloat(data.amount),
    type: data.type
  }
  console.log("test", input.type);
  
  transactions.value.push(input)
  toast.success('transaction added',)
  updateLocalStorage()

}

//deleteTransaction
const handleDeleteTransaction = (id: any) => {
 const index =  transactions.value.findIndex((item: any) => item.id === id);
 transactions.value.splice(index, 1)
  
  toast.success('transaction deleted')
  updateLocalStorage()
}

//hooks
onMounted(() => {
  const saveTransaction = JSON.parse(localStorage.getItem('transaction') as any)
  transactions.value = saveTransaction
  if(!saveTransaction || saveTransaction === null || saveTransaction.length === 0){
    localStorage.setItem('transaction', JSON.stringify(transaction.value))
    transactions.value = JSON.parse(localStorage.getItem('transaction') as any)

  }
})
</script>

<template>
  <Header />
  <div class="container">
    <Balance :total="totalAmount" />
    <Expanse :income="+income" :expenses="+expenses" />
    <TransactionHistory :transactions="transactions" @deleteTransaction="handleDeleteTransaction"/>
    <AddTransaction @addTransactions="handleTransactions" />
  </div>

  <RouterView />
</template>

<style scoped>
</style>
