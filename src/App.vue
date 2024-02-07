<script>
import { computed, toRaw } from "vue";
export default {
  name: "MainApp",
  // data() {
  //   return {
  //     state: {
  //       count: 0,
  //       double: computed(() => this.state.count * 2),
  //     },
  //     form1Ref: null,
  //     form2Ref: null,
  //     formModel: {
  //       id: 1,
  //       name: "John Doe",
  //       password: "J0hnD03!x4",
  //       age: 35,
  //       skills: ["Javascript", "VueJS"],
  //       email: "john.doe@gmail.com",
  //       status: true
  //     },
  //     elFormModel: {
  //       name: "John Doe",
  //       email: "",
  //     },
  //     elFormSchema: {
  //       fields: [
  //         {
  //           type: "elInput",
  //           label: "Name",
  //           model: "name",
  //           prop: "name",
  //           readonly: false,
  //           disabled: false,
  //           placeholder: "User's name",
  //           min: 2,
  //         },
  //         {
  //           type: "elInputComposition",
  //           label: "Email",
  //           model: "email",
  //           prop: "email",
  //           readonly: false,
  //           disabled: false,
  //           placeholder: "example@mail.com",
  //         }
  //       ]
  //     },
  //     formSchema: {
  //       fields: [{
  //         type: "input",
  //         inputType: "text",
  //         label: "ID",
  //         model: "id",
  //         readonly: true,
  //         featured: false,
  //         disabled: true
  //       }, {
  //         type: "input",
  //         inputType: "text",
  //         label: "Name",
  //         model: "name",
  //         readonly: false,
  //         featured: true,
  //         required: true,
  //         disabled: false,
  //         placeholder: "User's name",
  //       }, {
  //         type: "input",
  //         inputType: "password",
  //         label: "Password",
  //         model: "password",
  //         min: 6,
  //         required: true,
  //         hint: "Minimum 6 characters",
  //       }, {
  //         type: "input",
  //         inputType: "number",
  //         label: "Age",
  //         model: "age",
  //         min: 18,
  //       }, {
  //         type: "input",
  //         inputType: "email",
  //         label: "E-mail",
  //         model: "email",
  //         placeholder: "User's e-mail address",
  //       }, {
  //         type: "checklist",
  //         label: "Skills",
  //         model: "skills",
  //         multi: true,
  //         required: true,
  //         multiSelect: true,
  //         values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"]
  //       }, {
  //         type: "switch",
  //         label: "Status",
  //         model: "status",
  //         multi: true,
  //         readonly: false,
  //         featured: false,
  //         disabled: false,
  //         default: true,
  //         textOn: "Active",
  //         textOff: "Inactive"
  //       }]
  //     },
  //     formOptions: {
  //       validateAfterLoad: true,
  //       validateAfterChanged: true
  //     }
  //   };
  // },
  // methods: {
  //   increment() {
  //     this.state.count++;
  //   },
  //   onValidateForm2(isValid, errors) {
  //     console.log({ isValid, errors });
  //   },
  //   onConfirm() {
  //     console.log("form submitted");
  //   },
  //   prettyJSON(json) {
  //     if (json) {
  //       json = JSON.stringify(json, undefined, 4);
  //       json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
  //       return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
  //         var cls = 'number';
  //         if (/^"/.test(match)) {
  //           if (/:$/.test(match)) {
  //             cls = 'key';
  //           } else {
  //             cls = 'string';
  //           }
  //         } else if (/true|false/.test(match)) {
  //           cls = 'boolean';
  //         } else if (/null/.test(match)) {
  //           cls = 'null';
  //         }
  //         return '<span class="' + cls + '">' + match + '</span>';
  //       });
  //     }
  //   },
  //   async submitForm(formEl) {
  //     const form = this.$refs[formEl];
  //     if (!form) return
  //     await form.validate((valid, fields) => {
  //       if (valid) {
  //         console.log('submit!')
  //       } else {
  //         console.log('error submit!', fields)
  //       }
  //     })
  //   },
  //   resetForm(formEl) {
  //     const form = this.$refs[formEl];
  //     if (!form) return
  //     const x = toRaw(form)
  //     debugger
  //     form.resetFields()
  //   }
  // },
}
</script>
<script setup>
import { reactive, computed, ref, isProxy } from "vue";

const state = reactive({
  count: 0,
  double: computed(() => state.count * 2),
});

const form1Ref = ref();
const form2Ref = ref();

const formModel = reactive({
  id: 1,
  name: "John Doe",
  password: "J0hnD03!x4",
  age: 35,
  skills: ["Javascript", "VueJS"],
  email: "john.doe@gmail.com",
  status: true
});

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

const baseRules = reactive({
  email: [
    { required: true, message: "Error! This field is required."}
  ],
})

function increment() {
  state.count++;
}

function prettyJSON(json) {
  if (json) {
    json = JSON.stringify(json, undefined, 4);
    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }
}

function onValidateForm2(isValid, errors) {
  console.log({ isValid, errors });
}

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
  <h1>Hello</h1>
  <el-button @click="increment">
    Count is: {{ state.count }} Double is: {{
      state?.double }}
  </el-button>
  <vue-form-generator ref="form1Ref" :schema="formSchema" :model="formModel" :options="formOptions"></vue-form-generator>
  
  <el-form :model="elFormModel" :rules="baseRules" ref="form2Ref">
  <vue-form-generator :schema="elFormSchema" :model="elFormModel" :options="formOptions" :formSubmit="onConfirm"></vue-form-generator>
  <el-button type="primary" @click="submitForm(form2Ref)">Submit</el-button>
  <el-button @click="resetForm(form2Ref)">Reset</el-button>
</el-form>
  <div>
    <h3>Default VFG</h3>
    <pre v-if="formModel" v-html="prettyJSON(formModel)"></pre>
  </div>
  <div>
    <h3>ElementUI VFG</h3>
    <pre v-if="formModel" v-html="prettyJSON(elFormModel)"></pre>
  </div>
</template>