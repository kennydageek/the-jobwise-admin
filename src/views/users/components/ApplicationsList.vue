<template>
  <div>
    <user-application-table
      :items="applicationData"
      @view-details="handleViewDetails"
      @edit-application="handleEditApplication"
    />

    <jw-pagination
      class="mt-10 font-sm"
      v-if="pagination.total"
      :current-page="pagination.current_page"
      :total-records="pagination.total"
      :per-page="pagination.perPage"
      @onchange="fetchApplications"
    />
  </div>
</template>

<script setup>
import { JobApplicationService } from '@/services';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import UserApplicationTable from './UserApplicationTable.vue';
import JwPagination from '@/components/JwPagination.vue';

const route = useRoute();
const router = useRouter();
const pagination = ref({
  total: 40,
  current_page: 1,
  perPage: 20,
});

const applicationData = ref([]);

const fetchApplications = async (e) => {
  const data = await JobApplicationService.fetchApplications({
    user_id: route.params.id,
    page: e,
  });
  applicationData.value = data.payload.rows;
  pagination.value = data.payload.paging;
  console.log(data);
};

const handleViewDetails = (application) => {
  router.push(`/application/${application.job_application_id}/details`);
  console.log(application);
};

const handleEditApplication = (application) => {
  router.push(`/application/${application.job_application_id}/edit`);

  console.log(application);
};

onMounted(() => {
  fetchApplications();
});
</script>

<style lang="scss" scoped></style>
