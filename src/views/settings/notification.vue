<template>
  <form class="mt-10">
    <jw-input label="Title" v-model="form.title" type="text" />
    <jw-textarea label="Message Body" class="mt-6" v-model="form.message" />
  </form>

  <section class="mt-10">
    <p class="text-2xl font-semibold text-primary-100">All Users</p>
    <div class="flex justify-end relative mt-10">
      <!-- <p class="text-primary-100 mt-4 mb-2.5">October 28, 2024</p> -->
      <!-- <div class="self-center flex gap-[15px]">
        <p class="text-[#343A40] text-[18px]">All(6)</p>
        <img src="@/assets/images/svg/arrow_drop_down.svg" alt="" />
      </div> -->
      <div class="bg-[#F4F4F4] rounded-[32px] w-[425px] p-3 flex items-center">
        <img src="/images/svg/search.svg" alt="" />
        <input
          type="text"
          class="w-full focus:outline-0 text-[#1C1B1FCC] px-4 border-0 bg-transparent"
          placeholder="Search"
        />
        <img
          src="/images/svg/filter.svg"
          alt="Filter"
          class="cursor-pointer"
          @click="toggleDatePicker"
        />
      </div>
      <div v-if="showDatePicker" class="absolute right-0 top-10">
        <vue-date-picker v-model="date" />
      </div>
    </div>

    <user-table :items="userData" @update-recipients="updateRecipientList" />

    <div class="mt-10 flex justify-end">
      <button
        class="bg-[#021863] text-[#fff] py-4 px-8 rounded text-xs flex gap-2.5"
        @click="sendNotifications"
      >
        <jw-spinner v-if="loading" />
        <p class="self-center text-base font-semibold" v-else>
          Send Notifications ({{ recipients.length }})
        </p>
      </button>
    </div>
  </section>
</template>

<script setup>
import JwInput from './components/JwInput.vue';
import JwSelect from './components/JwSelect.vue';
import JwTextarea from '@/components/JwTextarea.vue';
import UserTable from './components/UserTable.vue';
import Avatar from '/images/svg/staff-avatar.svg';
import JwSpinner from '@/components/JwSpinner.vue';

import { onMounted, ref } from 'vue';
import { SettingService, UserService } from '@/services';

const form = ref({
  title: '',
  message: '',
});

const recipients = ref([]);
const loading = ref(false);
const userData = ref([]);

const sendNotifications = async () => {
  try {
    loading.value = true;
    const payload = {
      recipients: recipients.value,
      data: {
        title: form.value.title,
        message: form.value.message,
      },
    };
    const data = await SettingService.createNotifications(payload);
    console.log(data);
    loading.value = false;
  } catch (error) {
    loading.value = true;
  }
};

const fetchUsers = async () => {
  const data = await UserService.fetchUsers();
  userData.value = data.payload.rows;
  console.log(data);
};

const updateRecipientList = (e) => {
  console.log(e);
  recipients.value = e;
};

onMounted(() => {
  fetchUsers();
});
</script>

<style lang="scss" scoped></style>
