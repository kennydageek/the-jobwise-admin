<template>
  <!-- <page-heading title="CV" /> -->

  <!-- <div class="px-6 md:px-20 md:pr-[200px] mt-[42px] md:mt-[92px]"></div> -->
  <div class="mt-4">
    <!-- <div class="md:px-20 md:pr-[200px]"> -->
    <!-- <div class="md:gap-20 rounded-lg md:bg-[#fff] md:shadow-md"> -->
    <!-- <p class="text-primary-100 font-semibold text-2xl mb-8">Upload New CV</p> -->
    <jw-input
      label="CV Name"
      placeholder="UI Designer CV"
      type="tel"
      class="mb-8"
      v-model="title"
      @input="handleInput"
    />

    <div class="mt-8">
      <p class="text-[#252f48] font-medium">Upload your CV (résumé)</p>
      <p class="text-xs text-[#6d7a8d]">
        Select the file to use for your résumé
      </p>

      <jw-upload
        class="mt-5"
        @file-selected="handleFileSelected"
        :reset="resetUpload"
      />
      <!-- </div> -->
    </div>
  </div>
  <div class="flex justify-end mt-10">
    <!-- <div class="px-6 md:px-20 md:pr-[200px]">
      <button
        class="py-4 px-8 gap-2.5 flex bg-primary-100 rounded text-[#fff]"
        @click="handleSubmit"
      >
        <jw-spinner v-if="loading" />
        <p v-else>Submit</p>
      </button>
    </div> -->
  </div>
  <!-- </div> -->
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import JwUpload from './JwUpload.vue';
import JwInput from './JwInput.vue';
import JwSpinner from '@/components/JwSpinner.vue';
import { useToast } from 'vue-toastification';

import { ref } from 'vue';
import axios from 'axios';
import { ResumeService } from '@/services';
import { useRouter } from 'vue-router';

const router = useRouter();
const emit = defineEmits(['uploaded']);

const file_key = ref('');
const title = ref('');
const resetUpload = ref(false);
const selectedFile = ref(null);
const loading = ref(false);
const toast = useToast();

const handleFileSelected = (file) => {
  selectedFile.value = file;
  resetUpload.value = false;
  console.log(selectedFile.value);
  emit('uploaded', { file: selectedFile.value });
};

const handleInput = (e) => {
  emit('title-updated', e);
};

// const
</script>

<style lang="scss" scoped></style>
