<template>
  <div>
    <input
      ref="fileInput"
      type="file"
      class="hidden"
      @change="handleFileUpload"
    />
    <p v-if="errorMessage" class="text-red-600 bg-red-100 border border-red-300 p-4 mt-4 rounded mb-2">
      {{ errorMessage }}
    </p>
    <div v-if="!selectedFile" class="border border-dashed border-[#e1e7eb] rounded w-full text-center cursor-pointer text-sm">
      <div
        :class="{ 'drag-over': isDragOver }"
        @dragover.prevent="dragOver"
        @dragleave="dragLeave"
        @drop.prevent="drop"
        @click="browseFiles"
      >
        <div class="h-60 flex justify-center items-center">
          <div class="p-10">
            <p>Drop your file here, or upload one from your device</p>
            <div class="flex justify-center mt-4">
              <button type="button" class="flex gap-2.5 bg-secondary-100 rounded py-2 px-8">
                <img src="/images/svg/upload.svg" alt="" />
                <p class="self-center text-[#fff]">Upload File</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div 
        class="flex justify-between border-dashed border-2 border-green-500 rounded-md p-2 mb-2"
      >
        <p class="overflow-hidden">{{ selectedFile.name }}</p>
        <p class="cursor-pointer" @click="selectedFile = null">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import JwSpinner from './JwSpinner.vue';

const emit = defineEmits(['file-selected']);
const props = defineProps({
  reset: {
    type: Boolean,
    default: false,
  },
});

const isDragOver = ref(false);
const fileInput = ref(null);
const errorMessage = ref('');
const selectedFile = ref(null);

const image = ref('');
const uploading = ref(false);



const dragOver = () => {
  isDragOver.value = true;
};

const dragLeave = () => {
  isDragOver.value = false;
};

const browseFiles = () => {
  fileInput.value.click();
};

const drop = (event) => {
  isDragOver.value = false;
  handleFile(event.dataTransfer.files[0]);
};

const handleFileUpload = () => {
  const file = fileInput.value.files[0];
  handleFile(file);
};

const validateFile = (file) => {
  if (!file) {
    errorMessage.value = '';
    return false;
  }

  // Accept only PDF and Word files (by file extensions)
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (!allowedTypes.includes(file.type)) {
    errorMessage.value = `Invalid file type: ${file.name}. Only PDF and Word documents are allowed.`;
    return false;
  }

  errorMessage.value = '';
  return true;
};

const handleFile = (file) => {
  if (!validateFile(file)) return;
 
  selectedFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    image.value = e.target.result;
  };
  reader.readAsDataURL(file);
  emit('file-selected', file);
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
