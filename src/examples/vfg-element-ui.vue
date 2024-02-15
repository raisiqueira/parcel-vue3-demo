<script setup>
import { reactive, ref, toRaw, isProxy } from "vue";
import { prettyJSON } from "../utils/pretty-json"

const form2Ref = ref();

const elFormModel = reactive({
  name: "John Doe",
  email: "",
})

const elFormSchema = reactive({
  fields: [
    {
      type: "elInput",
      label: "Name",
      model: "name",
      prop: "name",
      readonly: false,
      disabled: false,
      placeholder: "User's name",
      min: 2,
    },
    {
      type: "elInputComposition",
      label: "Email",
      model: "email",
      prop: "email",
      readonly: false,
      disabled: false,
      placeholder: "example@mail.com",
    }
  ]
})

const formOptions = reactive({
  validateAfterLoad: true,
  validateAfterChanged: true
})

const baseRules = reactive({
  email: [
    { required: true, message: "Error! This field is required."}
  ],
})

function onConfirm() {
  console.log("form submitted");
}

const submitForm = async (formEl) => {
  debugger
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  
  if(isProxy(formEl)) {
    formEl = toRaw(formEl)
  }
  formEl.resetFields()
}
</script>
<template>
  <div>
    <el-form :model="elFormModel" :rules="baseRules" ref="form2Ref">
  <vue-form-generator :schema="elFormSchema" :model="elFormModel" :options="formOptions" :formSubmit="onConfirm"></vue-form-generator>
  <el-button type="primary" @click="submitForm(form2Ref)">Submit</el-button>
  <el-button @click="resetForm(form2Ref)">Reset</el-button>
</el-form>
  <div>
    <h3>ElementUI VFG debug</h3>
    <pre v-if="elFormModel" v-html="prettyJSON(elFormModel)"></pre>
  </div>
</div>
</template>