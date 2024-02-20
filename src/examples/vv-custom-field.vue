<script setup>
import { useForm, Form } from 'vee-validate';
import * as zod from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { fieldElText, fieldElCheckbox } from '../components/vee-validate/fields';

const schema = toTypedSchema(
  zod.object({
    name: zod.string().min(1, { message: 'Name is required' }),
    email: zod.string().email().min(1, { message: 'Email address is required' }),
    terms: zod.boolean().refine(value => value === true, { message: 'You must accept the terms and conditions' }),
  })
);

const { meta, handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "joe@doe.com.br",
  },
});

const onSubmit = handleSubmit(values => {
  console.log("form submitted!", JSON.stringify(values, null, 2));
})
</script>
<template>
  <el-form @submit="onSubmit" label-position="top">
    <fieldElText name="name" label="Username" />
  <fieldElText name="email" label="Email" />
  <fieldElCheckbox name="terms" label="Accept the terms" />
  <div>
      <el-button type="primary" native-type="submit">Submit</el-button>
      <el-button type="outline" native-type="button" @click="resetForm()">
        Reset
      </el-button>
  </div>
  </el-form>
  <strong>Meta</strong>
  <pre>{{ JSON.stringify(meta, null, 2) }}</pre>
</template>