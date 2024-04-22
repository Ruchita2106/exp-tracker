

<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  integerValidator,
  validateWithFieldName,
} from "../utils/validators";
// Interface
interface Emit {
(e: 'addTransactions', value: object | any): void
}

//Emit
const emit = defineEmits<Emit>()

// Data
const text = ref<string>('')
const amount = ref<string>('')
const refVForm = ref<any>();
const type = ref<any>([]);
const transactionDialog = ref<boolean>(false)

// Methods
const createTransaction = () => {
  refVForm.value?.validate().then((res: any) => {
    if (res.valid) {
      const input = {
        text: text.value,
        amount: parseFloat(amount.value),
        type: type.value
      }
      emit('addTransactions', input);
      text.value = '';
      amount.value = '';
      type.value = ''; 
          transactionDialog.value = false
    }

  }).catch((error: any) => {
    console.error('Validation error:', error)
  })
}

//watchers
watch(transactionDialog, (val: any)=>{
  if(!val){
    text.value = '';
      amount.value = '';
      type.value = ''; 
  }
})
</script>

<template>
  <div>
    <h3>Add new transaction</h3>
    <div>
<VBtn color="primary" @click="transactionDialog=true">Add New transaction</VBtn>
</div>
    <VDialog v-model="transactionDialog" max-width="800">
      <DialogCloseBtn @click="transactionDialog = false" />
      <VCard>
        <VCardText>
          <span class="headline-employee">
            {{
              'Add transaction'
            }}
          </span>
        </VCardText>
        <VCardText>
          <span>
            {{ `Enter Transaction  Details` }}
          </span>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm">
            <VRow>
             
              <VCol cols="12">
                <VTextField
                  
                  class="custom-field"
                  v-model="text"
                  :rules="[
                    validateWithFieldName(
                      text,
                      ('This field is required')
                    ),
                  ]"
                  placeholder="Enter text"
                />
              </VCol>
              <VCol cols="12">
                <VSelect
                 
                 class="custom-field"
                  v-model="type"
                  :items="['Income', 'Expense']"
                  :rules="[
                    validateWithFieldName(
                      type,
                      ('This field is required')
                    ),
                  ]"
                  placeholder="Select type"
                >
                </VSelect>
              </VCol>
              <VCol cols="12">
                <VTextField
                  
                  class="custom-field"
                  v-model="amount"
                  :rules="[
                    integerValidator(
                      amount,
                     
                    ),
                    validateWithFieldName(
                      amount,
                      ('This field is required')
                    ),
                  ]"
                  placeholder="Enter Amount"
                />
              </VCol>
             
            </VRow>
          </VForm>
        </VCardText>

        <VCardActions>
          <VSpacer />
          <VRow>
            <VCol cols="12">
              <VBtn
                class="mb-6 w150 dark-shadow"
                color="black"
                variant="flat"
                @click="createTransaction"
              >
                {{ ("Add") }}
              </VBtn>
            </VCol>
          </VRow>
        </VCardActions>
      </VCard>
    </VDialog>


    <!-- <VForm  ref="refVForm" >
      <div class="form-control">
        <label for="text">Text</label>
        <VTextField class="custom-field" v-model="text" placeholder="Enter text..." 
        :rules="[
                    validateWithFieldName(
                      text,
                      ('This field is required')
                    ),
                  ]"
           />
      </div>
      <div class="form-control">
        <label for="amount"
          >Type
        </label
        >
        <v-select
        v-model="type"
  :items="['Income', 'Expense']"
  class="custom-field"
  placeholder="Type"
  :rules="[
                    validateWithFieldName(
                      type,
                      ('This field is required')
                    ),
                  ]"
></v-select>
      </div>
     
      <div>
        <label for="amount"
          >Amount
        </label
        >
        
        <VTextField class="custom-field" v-model="amount" placeholder="Enter amount..."
        :rules="[
                    integerValidator(
                      amount,
                     
                    ),
                    validateWithFieldName(
                      amount,
                      ('This field is required')
                    ),
                  ]"
        />

      </div>
      <button class="btn" @click="submitForm">Add transaction</button>
    </VForm> -->
  </div>
</template>


<style>
/* .custom-field.v-select .v-field .v-field__input > input {
  opacity: 0 !important;
} */
.custom-field.v-text-field input{
  border: none !important;
}
</style>