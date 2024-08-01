<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";
import {useIsLoadingStore} from "~/store/loading.store";
import {account} from "~/lib/appwrite";

const logoWidth = 50;

const authStore = useAuthStore();
const isLoadingStore = useIsLoadingStore();
const router = useRouter();
const logout = async () => {
  isLoadingStore.loading = true;
  await account.deleteSession('current');
  authStore.clear();
  await router.push('/login');
  isLoadingStore.loading = false;
}
</script>

<template>
  <aside class="px-5 py-8 relative h-full w-full border-r-2">
    <NuxtLink to="/" class="block mb-10 mx-auto w-fit">
      <NuxtImg
          src="/logo.svg"
          alt="logo"
          :placeholder="[logoWidth, logoWidth]"
          :width="logoWidth"
      />
    </NuxtLink>
    <button class="absolute top-2 right-3 hover:text-active" @click="logout">
      <Icon name="line-md:logout" size="20" />
    </button>
    <LayoutMenu />
  </aside>
</template>

<style scoped>

</style>