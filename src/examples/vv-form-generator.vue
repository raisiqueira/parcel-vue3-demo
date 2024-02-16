<script setup lang="ts">
 import { formGenerator, type FormGeneratorSchema } from "../components/form-generator"

 const schema: FormGeneratorSchema = {
  serializer: "Campaign",
   fields: [
     {
       name: "name",
       as: "text",
       label: "Login",
       initialValue: "johnDoe",
     },
     {
       name: "description",
       as: "text",
       label: "Campaign Description",
     },
    //  {
    //   name: "terms",
    //   as: "checkbox",
    //   label: "I accept the terms and conditions",
    //   initialValue: true,
    //  }
    ],
 };

 const onSubmit = (values: Record<string, any>) => {
   console.log("form submitted from form-gen component!", JSON.stringify(values, null, 2));
 }
</script>
<template>
  <form-generator :schema="schema" :on-submit="onSubmit" />
</template>