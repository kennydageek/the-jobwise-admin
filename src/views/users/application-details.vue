<template>
  <page-heading title="Applications" />
  <div class="px-6 md:px-20 md:mt-[30px] md:pr-[200px]">
    <div>
      <button
        class="py-1 px-3 bg-primary-100 text-[#fff] rounded-[50px]"
        @click="$router.back()"
      >
        Back
      </button>
    </div>

    <div class="flex flex-col gap-[39px] mt-[32px] md:mt-[32px]">
      <div class="p-6 rounded-lg bg-[#fff] shadow-sm relative">
        <div class="flex justify-between mb-6">
          <div class="flex gap-6">
            <div class="self-center">
              <p class="mb-4 text-2xl text-[#252f48]">
                {{ applicationData?.company_name }}
              </p>
              <p class="text-[#252f48] text-sm">
                {{ applicationData?.job_title }}
              </p>
            </div>
          </div>
          <a
            :href="applicationData?.job_link"
            target="_blank"
            v-if="applicationData?.job_link"
          >
            <i class="bi bi-box-arrow-up-right"></i>
          </a>
        </div>
        <div class="flex justify-between">
          <div class="flex gap-6">
            <button class="py-1 px-4 bg-[#c3ccd2] rounded-[50px]">
              {{ applicationData?.job_level }}
            </button>
          </div>
          <p class="font-medium text-[#252f48]">
            {{ applicationData?.salary_range }}
          </p>
        </div>
        <a
          v-if="applicationData?.resume_file?.file_url"
          :href="applicationData?.resume_file?.file_url"
          target="_blank"
          class="mt-5 text-secondary-100 block"
          >View Resume Used</a
        >

        <hr
          class="border-0 border-t-2 border-t-[#d1d5db] mt-[21px] md:w-[254px] mb-5"
        />

        <section class="mb-7" v-if="applicationData?.resume_description">
          <p class="text-xl font-bold mb-3">Resume Used</p>
          <div class="h-[301px] overflow-scroll">
            <div
              v-html="applicationData.resume_description"
              class=""
              id="resume-div"
            ></div>
          </div>
        </section>

        <!-- Render the job_description HTML string -->
        <section>
          <p class="text-xl font-bold mb-3">Job Description</p>
          <div class="h-[301px] overflow-scroll">
            <div
              v-html="applicationData.job_description"
              class="job-description"
              id="application-div"
            ></div>
          </div>
        </section>

        <section class="mt-5" v-if="applicationData?.cover_letter">
          <p class="text-xl font-bold mb-3">Cover Letter</p>
          <div class="h-[301px] overflow-scroll">
            <div
              v-html="applicationData.cover_letter"
              class=""
              id="resume-div"
            ></div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import PageHeading from '@/components/PageHeading.vue';
import { JobApplicationService } from '@/services';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const applicationData = ref({});

const fetchAJobApplication = async () => {
  const data = await JobApplicationService.fetchAJobApplication(
    route.params.id
  );
  applicationData.value = data.payload;

  // Parse the job_description HTML string
  // const parser = new DOMParser();
  // const document = parser.parseFromString(
  //   applicationData.value.job_description,
  //   'text/html'
  // );

  // console.log(document);

  // // Set the parsed HTML back as a string
  // applicationData.value.job_description = document.div.innerHTML;

  applicationData.value.job_description =
    applicationData.value.job_description.replace(/&nbsp;/g, ' ');

  applicationData.value.job_description =
    applicationData.value.job_description.replace(
      /<p>/g,
      '<p style="margin-top: 20px;">'
    );

  const htmlString = applicationData.value.job_description;
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  const fragment = template.content; // This is a DocumentFragment

  // Append the fragment to the DOM
  const container = document.getElementById('application-div'); // Replace with your target element
  // container.appendChild(fragment);
  container.insertAdjacentHTML('beforeend', fragment);

  applicationData.value.cover_letter =
    applicationData.value.cover_letter.replace(/&nbsp;/g, ' ');

  applicationData.value.cover_letter =
    applicationData.value.cover_letter.replace(
      /<p>/g,
      '<p style="margin-top: 20px;">'
    );

  // console.log(container);
};

onMounted(() => {
  fetchAJobApplication();
});
</script>

<style scoped>
.job-description,
#application-div,
#resume-div {
  max-width: 100%;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  white-space: normal;
  font-size: clamp(0.9rem, 1.2vw, 1rem);
  line-height: 1.6;
}

.job-description p,
#application-div p,
#resume-div p,
.job-description span,
#application-div span,
#resume-div span {
  margin-top: 20px;
  background-color: transparent !important;
  color: inherit !important;
  display: block;
}

.job-description img,
#application-div img,
#resume-div img {
  max-width: 100%;
  height: auto;
  display: block;
}

.job-description iframe,
#application-div iframe,
#resume-div iframe {
  max-width: 100%;
  height: auto;
}

.job-description table,
#application-div table,
#resume-div table {
  width: 100%;
  overflow-x: auto;
  display: block;
}
</style>
