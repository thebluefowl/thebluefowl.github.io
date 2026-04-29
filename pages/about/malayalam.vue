<template>
  <ManuscriptShell>
    <Folio page-label="എന്നെക്കുറിച്ച്" subtitle="ഒരു ദീർഘ പരിചയം" />

    <p class="font-malayalam text-[20px] md:text-[22px] leading-[1.6] text-black m-0 max-w-[60ch]">
      ഞാൻ <strong class="font-bold">വിഷ്ണു ജയദേവൻ</strong>, ബാംഗ്ലൂർ ആസ്ഥാനമാക്കി പ്രവർത്തിക്കുന്ന ഒരു സോഫ്റ്റ്‌വെയർ എഞ്ചിനിയറാണ്.
      <a href="https://deepsource.com" class="text-black underline underline-offset-[3px] decoration-1 hover:text-slate-500 transition-colors">DeepSource</a>-ൽ ജോലി ചെയ്യുന്നു, അവിടെ കോഡ് ക്വാളിറ്റിക്കും സെക്യൂരിറ്റിക്കുമുള്ള ടൂളുകൾ നിർമ്മിക്കുന്നു.
      ഇവിടെ ഡിസ്ട്രിബ്യൂട്ടഡ് സിസ്റ്റംസ്, സോഫ്റ്റ്‌വെയർ ആർക്കിടെക്ചർ, ഇടയ്ക്ക് ബയോകെമിസ്ട്രി, അക്വാസ്കേപ്പിങ്, യാത്ര തുടങ്ങിയവയെക്കുറിച്ച് എഴുതാറുണ്ട്.
      <em class="italic">ചില പോസ്റ്റുകൾ മലയാളത്തിലാണ്, നാട്ടിലുള്ളവർക്ക് വേണ്ടി.</em>
    </p>

    <div class="flex items-center gap-4 mt-8 pt-4 border-t border-gray-200 font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500">
      <span>Read in</span>
      <span class="flex-1 border-b border-dotted border-gray-300 h-px"></span>
      <div class="flex gap-1">
        <NuxtLink to="/about" class="px-2 py-1 hover:border hover:border-gray-200 hover:text-black transition-colors">EN</NuxtLink>
        <NuxtLink to="/about/malayalam" class="px-2 py-1 bg-black text-white">ML</NuxtLink>
      </div>
    </div>

    <SectionHead num="I">
      <span class="font-malayalam">ജോലി</span>
    </SectionHead>
    <div class="flex flex-col gap-9 font-malayalam">
      <div v-for="job in jobs" :key="job.co" class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-14 items-start">
        <div class="flex flex-col gap-1.5">
          <h3 class="font-malayalam font-bold text-[24px] md:text-[28px] leading-tight m-0">{{ job.co }}</h3>
          <div class="font-sans text-[11px] uppercase tracking-[0.18em] text-gray-500">{{ job.years }}</div>
        </div>
        <div class="flex flex-col gap-[18px]">
          <div v-for="role in job.roles" :key="role.title" class="flex flex-col gap-1">
            <div class="flex items-baseline">
              <span class="font-malayalam font-semibold text-[18px] md:text-[19px] text-black shrink-0">{{ role.title }}</span>
              <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
              <span class="font-sans text-[11px] uppercase tracking-[0.16em] text-gray-500 shrink-0">{{ role.tag }}</span>
            </div>
            <p class="font-malayalam text-[16px] md:text-[17px] leading-[1.65] text-gray-800 m-0 max-w-[60ch]">{{ role.body }}</p>
          </div>
        </div>
      </div>
    </div>

    <SectionHead num="II">
      <span class="font-malayalam">ജോലിക്കപ്പുറം</span>
    </SectionHead>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10 font-malayalam">
      <div v-for="b in beyond" :key="b.h" class="flex flex-col gap-1.5">
        <div class="flex items-baseline">
          <h3 class="font-malayalam font-bold text-[20px] md:text-[22px] m-0 shrink-0">{{ b.h }}</h3>
          <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        </div>
        <p class="font-malayalam text-[15px] md:text-[16px] leading-[1.65] text-gray-800 m-0 max-w-[60ch]">{{ b.p }}</p>
      </div>
    </div>

    <SectionHead num="III">
      <span class="font-malayalam">മറ്റിടങ്ങളിൽ</span>
    </SectionHead>
    <ul class="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-3.5">
      <li v-for="e in elsewhere" :key="e.label" class="flex items-baseline">
        <a :href="e.href" :target="e.external ? '_blank' : undefined" :rel="e.external ? 'noopener' : undefined" class="font-garamond text-[24px] font-medium text-black no-underline shrink-0 hover:text-slate-500 transition-colors">{{ e.label }}</a>
        <span class="flex-1 border-b border-dotted border-gray-300 mx-3 self-center h-px"></span>
        <span class="font-malayalam text-[14px] md:text-[15px] text-gray-600 shrink-0">{{ e.hint }}</span>
      </li>
    </ul>

    <Signoff>
      <em class="font-malayalam">വി.ജെ., ബാംഗ്ലൂർ</em>
    </Signoff>
  </ManuscriptShell>
</template>

<script setup lang="ts">
definePageMeta({ documentDriven: { page: false, surround: false } });

useSeoMeta({
  title: "എന്നെക്കുറിച്ച് | വിഷ്ണു ജയദേവൻ",
  description: "ഒരു ദീർഘ പരിചയം. ബാംഗ്ലൂരിൽ DeepSource-ൽ ജോലി ചെയ്യുന്ന സോഫ്റ്റ്‌വെയർ എഞ്ചിനിയർ.",
});

const jobs = [
  {
    co: "DeepSource",
    years: "2020 to present",
    roles: [
      {
        title: "സ്റ്റാഫ് എഞ്ചിനിയർ",
        tag: "2024 to present",
        body: "മാനേജ്മെന്റ് വിട്ട് വീണ്ടും IC-യിലേക്ക് മടങ്ങി. കലണ്ടറിനേക്കാൾ കീബോർഡ് ഉപയോഗിച്ച് കൂടുതൽ പ്രയോജനം ചെയ്യാനാകുമെന്ന് മനസ്സിലായി. ഡിസ്ട്രിബ്യൂട്ടഡ് സിസ്റ്റംസും സ്കെയ്‌ലിങ് പ്രശ്നങ്ങളും കൈകാര്യം ചെയ്യുന്നു.",
      },
      {
        title: "എഞ്ചിനിയറിങ് മാനേജർ",
        tag: "2022 to 2024",
        body: "പ്രൊഡക്റ്റ്, പ്ലാറ്റ്ഫോം, സെക്യൂരിറ്റി എഞ്ചിനിയറിങ് ടീമുകൾ കെട്ടിപ്പടുത്തു. കൂടുതൽ സമയം ഹയറിങ്ങിലും, സാങ്കേതിക ദിശ നിശ്ചയിക്കുന്നതിലും, ടീമിന്റെ വഴിയിൽ നിൽക്കാതിരിക്കാൻ ശ്രമിക്കുന്നതിലും ചെലവഴിച്ചു.",
      },
      {
        title: "ടെക്നിക്കൽ ലീഡ്",
        tag: "2020 to 2022",
        body: "സീറോ-ടു-വൺ ഘട്ടം. ഫ്രണ്ട്എൻഡ് വീണ്ടും എഴുതി, റിപ്പോർട്ടിങ്, പബ്ലിക് API, CLI എന്നിവ നിർമ്മിച്ചു, എന്റർപ്രൈസ് കസ്റ്റമേഴ്സിനായി ഓൺ-പ്രെം ഡിപ്ലോയ്മെന്റുകൾ സജ്ജീകരിച്ചു.",
      },
    ],
  },
  {
    co: "Exotel",
    years: "2015 to 2019",
    roles: [
      {
        title: "സീനിയർ സോഫ്റ്റ്‌വെയർ എഞ്ചിനിയർ",
        tag: "2015 to 2019",
        body: "കോളേജിന് ശേഷമുള്ള ആദ്യ ജോലി. 21-ാം വയസ്സിൽ ചേർന്നു, ഇന്റേണൽ ടൂളുകൾ നിർമ്മിച്ചു, പിന്നീട് ബില്യൺ കണക്കിന് കോളുകൾ കൈകാര്യം ചെയ്യുന്ന ഒരു ടെലിഫോണി പ്ലാറ്റ്ഫോം നിർമ്മിക്കുന്നതിൽ സഹായിച്ചു. അതിൽ നിന്ന് ഒരു പേറ്റന്റ് ലഭിച്ചു.",
      },
    ],
  },
];

const beyond = [
  { h: "വായനയും എഴുത്തും", p: "ഒരു റണ്ണിങ് വായനാ ലിസ്റ്റ് സൂക്ഷിക്കുന്നു, കൂടുതലും ഫിക്ഷൻ. മലയാളത്തിലും കുറച്ച് എഴുതാറുണ്ട്, പതുക്കെ." },
  { h: "അക്വാസ്കേപ്പിങ്", p: "വീട്ടിൽ ഒരു പ്ലാന്റഡ് അക്വേറിയം പരിപാലിക്കുന്നു. ഒരു ചില്ലുപാത്രത്തിൽ പ്രതീക്ഷിച്ചതിലും കൂടുതൽ ജീവശാസ്ത്രവും രസതന്ത്രവുമുണ്ട്, ഒടുവിൽ ആൽഗ ജയിക്കും." },
  { h: "ബയോകെമിസ്ട്രി", p: "വിശ്രമത്തിന് പേപ്പറുകളും പാഠപുസ്തകങ്ങളും വായിക്കുന്നു. കൂടുതലും മോളിക്യുലാർ ബയോളജിയും മെറ്റബോളിസവും. ജോലിയിൽ ചെയ്യുന്നതുമായി ബന്ധമില്ല, അതാണ് ആകർഷണം." },
  { h: "യാത്ര", p: "വേഗതയേറിയ വിമാനങ്ങളെക്കാൾ പതുക്കെയുള്ള ട്രെയിനുകൾ. ശ്രദ്ധിക്കുന്നതെന്തും കുറിച്ചുവെക്കും. ചിലപ്പോൾ അവ ഒരു പോസ്റ്റാകും." },
];

const elsewhere = [
  { label: "GitHub", hint: "@thebluefowl, കോഡിനായി", href: "https://github.com/thebluefowl", external: true },
  { label: "LinkedIn", hint: "ദീർഘ-ഫോം CV", href: "https://www.linkedin.com/in/vishnujayadevan/", external: true },
  { label: "Email", hint: "ഹായ് പറയാൻ ആഗ്രഹിക്കുന്നുണ്ടെങ്കിൽ", href: "mailto:hi@vishnujayadevan.com", external: false },
];
</script>
