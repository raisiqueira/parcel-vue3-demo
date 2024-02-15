
<script setup lang="ts">
import { FieldContextKey, useForm } from 'vee-validate';
import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { inject } from 'vue';

const schema = toTypedSchema(
  zod.object({
  email: zod.string().email().min(1, { message: 'Email address is required' }),
  fullName: zod.string().min(1, { message: 'Full name is required' }),
  password: zod.string().min(6, { message: 'Password must be at least 6 characters' }),
  passwordConfirm: zod.string().min(1, { message: 'Password confirmation is required' }),
  terms: zod.boolean().refine(val => val === true, { message: 'You must agree to terms and conditions' }),
  type: zod.string().min(1, { message: 'Account type is required' }),
})
);

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    terms: false,
  },
});

const elPlusConfig = (state) => ({
  props: {
    validateEvent: false,
    error: state.errors[0],
    required: state.required,
  },
});

const [fullName, fullNameProps] = defineField('fullName', elPlusConfig);
const [email, emailProps] = defineField('email', elPlusConfig);
const [password, passwordProps] = defineField('password', elPlusConfig);
const [passwordConfirm, passwordConfirmProps] = defineField(
  'passwordConfirm',
  elPlusConfig
);
const [terms, termsProps] = defineField('terms', elPlusConfig);
const [type, typeProps] = defineField('type', elPlusConfig);

const onSubmit = handleSubmit((values) => {
  console.log('Submitted with', values);
});

const options = ['Enterprise', 'Pro', 'Freelance'];
const fieldContext = inject(FieldContextKey);
console.log('fieldContext', fieldContext);
</script>

<template>
  <el-form @submit="onSubmit">
    <el-form-item v-bind="emailProps" label="Email">
      <el-input placeholder="Email Address" v-model="email" />
    </el-form-item>

    <el-form-item v-bind="fullNameProps" label="Full name">
      <el-input placeholder="Full name" v-model="fullName" />
    </el-form-item>

    <el-form-item v-bind="passwordProps" label="Password">
      <el-input placeholder="Password" v-model="password" />
    </el-form-item>

    <el-form-item v-bind="passwordConfirmProps" label="Password confirmation">
      <el-input placeholder="Confirm password" v-model="passwordConfirm" />
    </el-form-item>

    <el-form-item v-bind="typeProps" label="Type">
      <el-select v-model="type" class="m-2" placeholder="Select" label="Type">
        <el-option
          v-for="item in options"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>

    <el-form-item v-bind="termsProps">
      <el-checkbox v-model="terms"> Agree to terms and conditions </el-checkbox>
    </el-form-item>

    <div>
      <el-button type="primary" native-type="submit">Submit</el-button>
      <el-button type="outline" native-type="button" @click="resetForm()">
        Reset
      </el-button>
    </div>
  </el-form>
</template>
