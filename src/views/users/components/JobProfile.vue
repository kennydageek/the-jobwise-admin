<template>
  <div>
    <div class="flex flex-col mt-[5px]">
      <div class="flex flex-col gap-8 mb-8 shadow-md rounded-lg p-6 bg-[#fff]">
        <div class="mb-6">
          <p class="text-[#252f48] text-2xl font-semibold mb-2">
            {{ jobProfile.job_title }}
          </p>
          <p class="text-sm text-[#252f48]">Job Title</p>
        </div>

        <hr class="border-t-[2px] md:w-[254px]" />

        <div class="flex flex-col gap-4">
          <div>
            <p>Resume</p>
            <div v-if="jobProfile.resume?.file">
              <a
                :href="jobProfile.resume.file.file_url"
                target="_blank"
                class="text-[#021863] underline"
              >
                View Resume
              </a>
            </div>
          </div>
          <div class="">
            <p class="mb-2">Search Info</p>
            <hr class="border-t-[2px] md:w-[100px]" />
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">
              <!-- {{ jobProfile.job_type }} -  -->
              {{ jobProfile.city }}
              {{ jobProfile.country }}
            </p>
            <p class="text-sm">Job Location</p>
          </div>

          <div class="text-[#252f48]">
            <div class="flex gap-2 flex-wrap">
              <p
                class="font-semibold"
                v-for="board in jobProfile.job_board"
                :key="board"
              >
                {{ board }}
              </p>
            </div>
            <p class="text-sm">Job Board Platform</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.experience_level }}</p>
            <p class="text-sm">Experience</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.years_of_experience }}</p>
            <p class="text-sm">Years Of Experience</p>
          </div>

          <div class="text-[#252f48]">
            <div class="flex gap-2 flex-wrap">
              <p class="font-semibold" v-for="(type, i) in jobProfile.job_type">
                {{ type }}
              </p>
            </div>
            <p class="text-sm">Job Type</p>
          </div>

          <div class="text-[#252f48]">
            <div
              v-for="industry in jobProfile.preferred_industries"
              :key="industry"
            >
              <p class="font-semibold">{{ industry }}</p>
            </div>
            <p class="text-sm">Preferred Industries</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">
              {{ formatAsMoney(jobProfile.annual_rate) }}
            </p>
            <p class="text-sm">Annual Rate</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">
              {{ formatAsMoney(jobProfile.hourly_rate) }}
            </p>
            <p class="text-sm">Hourly Rate</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">
              {{ formatAsMoney(jobProfile.lowest_salary_range) }}
            </p>
            <p class="text-sm">Lowest Salary Range</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">
              {{ formatAsMoney(jobProfile.lowest_hourly_rate) }}
            </p>
            <p class="text-sm">Lowest Hourly Rate</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.work_authorization }}</p>
            <p class="text-sm">Work Authorization</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.social_media_urls }}</p>
            <p class="text-sm">Social Media URLs</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">
              {{ jobProfile.security_clearance }}
            </p>
            <p class="text-sm">Security Clearance</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.school_name }}</p>
            <p class="text-sm">School Name</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.graduation_date }}</p>
            <p class="text-sm">Graduation Date</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.email }}</p>
            <p class="text-sm">Email</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.email_password }}</p>
            <p class="text-sm">Email Password</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.race }}</p>
            <p class="text-sm">Race</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">
              {{ jobProfile.preferred_interview_time }}
            </p>
            <p class="text-sm">Preferred Interview Time</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.school_name }}</p>
            <p class="text-sm">Security Clearance</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.address }}</p>
            <p class="text-sm">Address</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.country }}</p>
            <p class="text-sm">Country</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.state }}</p>
            <p class="text-sm">State</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.city }}</p>
            <p class="text-sm">City</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.school_name }}</p>
            <p class="text-sm">Security Clearance</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.postal_code }}</p>
            <p class="text-sm">Postal Code</p>
          </div>

          <!-- <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.is_remote_only }}</p>
            <p class="text-sm">Remote Only Jobs</p>
          </div> -->

          <!-- <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.auto_send_emails }}</p>
            <p class="text-sm">Auto Send Email</p>
          </div> -->

          <!-- <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile.auto_fill_applications }}</p>
            <p class="text-sm">AutoFill Applications</p>
          </div> -->
        </div>
      </div>

      <div class="flex flex-col gap-8 shadow-md rounded-lg mb-8 p-6 bg-[#fff]">
        <div class="flex flex-col gap-4">
          <!-- <div class="">
            <p class="mb-2">Customer Info</p>
            <hr class="border-t-[2px] md:w-[100px]" />
          </div> -->

          <!-- <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile?.user?.phone_number }}</p>
            <p class="text-sm">Phone umber</p>
          </div> -->

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile?.resume?.title }}</p>
            <p class="text-sm">Uploaded Cv</p>
          </div>

          <div class="text-[#252f48]">
            <p class="font-semibold">{{ jobProfile?.user?.email }}</p>
            <p class="text-sm">Personal email</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Helper } from '@/utils/helpers';

const props = defineProps({
  jobProfile: {
    type: Object,
    default: {},
  },
});

const formatAsMoney = Helper.formatAsMoney;
</script>

<style scoped></style>
