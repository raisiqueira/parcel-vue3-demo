<script setup>
import { reactive, ref } from "vue";
import { prettyJSON } from "../utils/pretty-json"

const form1Ref = ref();

const formModel = reactive({
  id: 1,
  name: "John Doe",
  password: "J0hnD03!x4",
  age: 35,
  skills: ["Javascript", "VueJS"],
  email: "john.doe@gmail.com",
  status: true
});


const formSchema = reactive({
  fields: [{
    type: "input",
    inputType: "text",
    label: "ID",
    model: "id",
    readonly: true,
    featured: false,
    disabled: true
  }, {
    type: "input",
    inputType: "text",
    label: "Name",
    model: "name",
    readonly: false,
    featured: true,
    required: true,
    disabled: false,
    placeholder: "User's name",
  }, {
    type: "input",
    inputType: "password",
    label: "Password",
    model: "password",
    min: 6,
    required: true,
    hint: "Minimum 6 characters",
  }, {
    type: "input",
    inputType: "number",
    label: "Age",
    model: "age",
    min: 18,
  }, {
    type: "input",
    inputType: "email",
    label: "E-mail",
    model: "email",
    placeholder: "User's e-mail address",
  }, {
    type: "checklist",
    label: "Skills",
    model: "skills",
    multi: true,
    required: true,
    multiSelect: true,
    values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"]
  }, {
    type: "switch",
    label: "Status",
    model: "status",
    multi: true,
    readonly: false,
    featured: false,
    disabled: false,
    default: true,
    textOn: "Active",
    textOff: "Inactive"
  }]
})

const formOptions = reactive({
  validateAfterLoad: true,
  validateAfterChanged: true
})

</script>
<template>
  <vue-form-generator ref="form1Ref" :schema="formSchema" :model="formModel" :options="formOptions"></vue-form-generator>
  <div>
    <h3>Native VFG debug</h3>
    <pre v-if="formModel" v-html="prettyJSON(formModel)"></pre>
  </div>
</template>