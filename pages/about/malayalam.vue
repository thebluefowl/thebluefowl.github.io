<template>
  <NuxtLayout>
    <template #header>
      <PageTitle title="About" :breadcrumbs="computedBreadcrumbs" />
    </template>
    <template #body>
      <div class="font-sans tracking-wider mb-2">
        <nuxt-link class="cursor-pointer" to="/about">EN</nuxt-link>
        <span class="mx-2">|</span>
        <nuxt-link class="cursor-pointer" to="/about/malayalam">ML</nuxt-link>
      </div>
      <div class="pb-8">
        <div class="mb-8 font-malayalam">
          <div class="text-xl font-light leading-relaxed">
            ഞാൻ <span class="font-bold">വിഷ്ണു ജയദേവൻ</span>. ബെംഗളൂരുവിൽ ഒരു
            സോഫ്റ്റ്‌വെയർ എഞ്ചിനീയർ ആയി ജോലി ചെയ്യുന്നു. ഈ വെബ്സൈറ്റ്
            ഇന്റർനെറ്റ് എന്ന വലിയ വായനശാലയിലെ എന്റെ ഒരു ചെറിയ പുസ്തകം. മുഴുവൻ
            വെബ്സൈറ്റ് ഇംഗ്ലീഷിൽ ആണെങ്കിലും വല്ലപ്പോഴും മലയാളത്തിൽ എന്തെങ്കിലും
            ഒക്കെ കുത്തി കുറിക്കാം എന്ന് ആലോചിക്കുന്നു. ഇംഗ്ലീഷിൽ ഉള്ള ബ്ലോഗിൽ
            സോഫ്റ്റ്‌വെയർ എഞ്ചിനീയറിംഗ് ലേഖനങ്ങൾ, എന്റെ യാത്രകൾ,
            ആരോഗ്യപരീക്ഷണങ്ങൾ എന്ന വിഷയങ്ങളിലുള്ള ലേഖനങ്ങൾ ആയിരിക്കും.
          </div>
        </div>
        <h2 class="text-4xl mb-4">തൊഴിൽ</h2>
        <div class="mb-8 pl-8 grid lg:grid-cols-2 gap-y-4">
          <div class="flex items-center">
            <div>
              <h3>ഡീപ്പ്‌സോഴ്‌സ്</h3>
              <div>(2024-ഇന്നുവരെ)</div>
            </div>
            <span class="flex-grow hidden lg:block">
              <svg
                viewBox="0 0 100 10"
                xmlns="http://www.w3.org/2000/svg"
                class="w-full h-2"
              >
                <path
                  d="M0,5 C10,0 20,10 30,5 C40,0 50,10 60,5 C70,0 80,10 90,5"
                  stroke="black"
                  fill="transparent"
                />
              </svg>
            </span>
          </div>
          <div>
            <h4 class="text-lg font-semibold">സ്റ്റാഫ് എഞ്ചിനീയർ</h4>
            <p>
              മാനേജ്മെന്റിൽ നിന്നും തിരിച്ചു ടെവേലോപ്മെന്റിലേക്ക് വന്നു. ഇപ്പോൾ
              ഡീപ്‌സോഴ്സ് പുതിയതായി നിർമിക്കുന്ന സോഫ്റ്റ്‌വെയർ കോംപോസിഷൻ
              അനാലിസിസ് പ്രൊഡക്ടിന്റെ നിർമാണത്തിൽ ഏർപ്പെട്ടിരിക്കുന്നു.
            </p>
            <hr class="my-2" />
            <h4 class="text-lg font-semibold">എഞ്ചിനീയറിംഗ് മാനേജർ</h4>
            <p>
              പ്രോഡക്റ്റ്, പ്ലാറ്റഫോം, സെക്യൂരിറ്റി എഞ്ചിനീയറിംഗ് ടീമുകൾ
              സ്ഥാപിക്കുകയും പിന്നീട് നയിക്കുകയും ചെയ്തു. ഇതിന്റെ ഭാഗമായി മറ്റു
              എഞ്ചിനീയറിംഗ് ടീമുകൾക്ക് ആവിശ്യമായ ഡിപ്ലോയ്മെന്റ് ടൂളുകളും
              സെക്യൂരിറ്റി പ്ലാറ്റുഫോമുകളും നിർമിച്ചു.
            </p>
            <hr class="my-2" />
            <h4 class="text-lg font-semibold">Technical Lead</h4>
            <p>
              ഡീപ്‌സോഴ്സ് നിർമിച്ച പല പ്രൊഡക്ടുകളുടെയും നിർമാണ ചുമതല വഹിച്ചു.
            </p>
          </div>
          <hr />
          <hr class="hidden sm:block" />
          <div class="flex items-center">
            <div>
              <h3>എക്സോട്ടൽ</h3>
              <div>(2015-2019)</div>
            </div>
            <span class="flex-grow hidden lg:block">
              <svg
                viewBox="0 0 100 10"
                xmlns="http://www.w3.org/2000/svg"
                class="w-full h-2"
              >
                <path
                  d="M0,5 C10,0 20,10 30,5 C40,0 50,10 60,5 C70,0 80,10 90,5"
                  stroke="black"
                  fill="transparent"
                />
              </svg>
            </span>
          </div>
          <div>
            <h4 class="text-lg font-semibold">
              സീനിയർ സോഫ്റ്റ്‌വെയർ എഞ്ചിനീയർ - പ്രോഡക്റ്റ് എഞ്ചിനീയറിംഗ്
            </h4>
            <p>പ്രധാന API പ്ലാറ്റഫോമിന്റെ നിർമാണത്തിൽ മുഖ്യ പങ്ക് വഹിച്ചു.</p>
            <hr class="my-2" />
            <h4 class="text-lg font-semibold">
              സോഫ്റ്റ്‌വെയർ ഡിവെലപ്മൻറ്റ് എഞ്ചിനീയർ | എന്റർപ്രൈസ് ടെക്നോളജി
            </h4>
            <p>
              എന്റർപ്രൈസ് എങ്ങിനെയറിങ് പ്ലാറ്റഫോമിന്റെ നിർമാണത്തിൽ പങ്കുവഹിച്ചു.
              LeadAssist, എന്ന നൂതനമായ പ്രോഡക്റ്റ് വികസിപ്പിക്കുകയും, പേറ്റന്റ്
              ചെയ്യുകയും ചെയ്തു. എന്റർപ്രൈസ് കമ്പനികൾക്കായുള്ള ക്‌ളൗഡ്‌ ടെലിഫോണി
              സൊല്യൂഷനകുൽ നിർമിക്കുന്നതിൽ പ്രധാന പങ്കുവഹിച്ചു.
            </p>
            <hr class="my-2" />
            <h4 class="text-lg font-semibold">
              സോഫ്റ്റ്‌വെയർ ഡിവെലപ്മൻറ്റ് എഞ്ചിനീയർ | പ്രോഡക്റ്റ് എഞ്ചിനീയറിംഗ്
            </h4>
            <p>
              എക്സോടലിൽ ഇന്റെർണൽ ടൂൾസ് വികസിപ്പുക്കന്ന ടീമിൽ ജോലി ഫുൾ സ്റ്റാക്ക്
              ഡെവലപ്പേർ ആയി ജോലി ചെയ്തു.
            </p>
          </div>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { BreadCrumb } from "~/components/PageTitle.vue";

definePageMeta({
  title: "About",
  description: "About Vishnu Jayadevan",
  documentDriven: {
    page: false,
    surround: false,
  },
});

const computedBreadcrumbs = computed((): BreadCrumb[] => {
  return [{ label: "~", to: "/" }];
});
</script>
