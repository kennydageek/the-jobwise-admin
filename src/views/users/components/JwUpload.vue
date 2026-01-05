<template>
  <div
    class="border border-dashed border-[#e1e7eb] rounded w-full text-center cursor-pointer text-sm"
  >
    <div
      :class="{ 'drag-over': isDragOver }"
      @dragover.prevent="dragOver"
      @dragleave="dragLeave"
      @drop.prevent="drop"
      @click="browseFiles"
    >
      <input
        ref="fileInput"
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        class="hidden"
        @change="handleFileUpload"
      />
      <div class="h-40 flex justify-center items-center" v-if="uploading">
        <jw-spinner class="spinner-primary" />
      </div>

      <div v-else class="flex justify-center items-center">
        <div v-if="!image" class="p-10">
          <p>Drop your file here, or upload one from your device</p>
          <div class="flex justify-center mt-4">
            <button class="flex gap-2.5 bg-secondary-100 rounded py-2 px-8">
              <img src="/images/svg/upload.svg" alt="" />
              <p class="self-center text-[#fff]">{{ cta }}</p>
            </button>
          </div>
        </div>
        <div v-else class="p-2 w-full">
          CV Uploaded
          <!-- <img
            :src="image"
            alt="Uploaded Image"
            class="w-full object-cover h-full mx-auto"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import JwSpinner from '@/components/JwSpinner.vue';

const emit = defineEmits(['file-selected']);
const props = defineProps({
  cta: {
    type: String,
    default: 'Upload a word document',
  },
  reset: {
    type: Boolean,
    default: false,
  },
});

const isDragOver = ref(false);
const image = ref('');
const uploading = ref(false);
const fileInput = ref(null);
const selectedFile = ref(null);

const dragOver = () => {
  isDragOver.value = true;
};

const dragLeave = () => {
  isDragOver.value = false;
};

const drop = (event) => {
  isDragOver.value = false;
  handleFile(event.dataTransfer.files[0]);
};

const browseFiles = () => {
  fileInput.value.click();
};

const handleFileUpload = () => {
  const file = fileInput.value.files[0];
  handleFile(file);
};

const handleFile = (file) => {
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      image.value = e.target.result;
    };
    reader.readAsDataURL(file);
    emit('file-selected', file);
  }
};

// Reset the component when the `reset` prop changes
watch(
  () => props.reset,
  (newVal) => {
    if (newVal) {
      image.value = '';
      selectedFile.value = null;
      fileInput.value.value = ''; // Clear the file input
    }
  }
);
</script>

<style scoped>
.border {
  border-width: 1.5px;
}
.border-dashed {
  border-style: dashed;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.text-sm {
  font-size: 0.875rem;
}
.cursor-pointer {
  cursor: pointer;
}
.hidden {
  display: none;
}
.drag-over {
  border-color: #6772e5;
  background-color: rgba(103, 114, 229, 0.1);
}
</style>
