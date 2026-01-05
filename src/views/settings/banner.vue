<template>
  <div class="mt-4">
    <div class="mt-8">
      <p class="text-[#252f48] font-medium">Upload banner image</p>
      <p class="text-xs text-[#6d7a8d]">Select a banner image</p>

      <jw-upload
        class="mt-5"
        @file-selected="handleFileSelected"
        :reset="resetUpload"
        cta="Upload Image"
      />
    </div>
    <div class="flex justify-end mt-10">
      <button
        class="py-4 px-8 gap-2.5 flex bg-primary-100 rounded text-[#fff]"
        @click="handleSubmit"
      >
        <jw-spinner v-if="loading" />
        <p v-else>Submit</p>
      </button>
    </div>
  </div>
</template>

<script setup>
import JwUpload from '@/components/JwUpload.vue';
import { ref } from 'vue';
import axios from 'axios';
import { SettingService } from '@/services';
import { useToast } from 'vue-toastification';
import JwSpinner from '@/components/JwSpinner.vue';

const toast = useToast();
const selectedFile = ref(null);
const file_key = ref(null);
const loading = ref(false);
const resetUpload = ref(false);

const handleFileSelected = (file) => {
  selectedFile.value = file;
  resetUpload.value = false;
  console.log(selectedFile.value);
};

const handleSubmit = async () => {
  loading.value = true;
  if (selectedFile.value) {
    const formData = new FormData();
    const token = localStorage.getItem('access_token');
    formData.append('file', selectedFile.value);

    let requestObj = {
      url: `https://the-jobwise-backend.onrender.com/api/v1/file-upload`,
      method: 'POST',
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios(requestObj);
      file_key.value = response.data.payload.file_key;

      const payload = {
        file_key: file_key.value,
      };
      const data = await SettingService.createBanner(payload);
      toast.success(data.message);
      resetUpload.value = true;
      selectedFile.value = null; // Clear the selected file
      loading.value = false;
    } catch (error) {
      loading.value = false;
      console.error('Error uploading file:', error);
      resetUpload.value = true;
      selectedFile.value = null;
    }
  } else {
    toast.error('No file selected');
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
