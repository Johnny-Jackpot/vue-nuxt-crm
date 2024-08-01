<script setup lang="ts">
import {useAuthStore} from "~/store/auth.store";
import {account} from "~/lib/appwrite";
import {loadingKey, type TypeLoading} from "~/layouts/useLoading";

const {showLoading, hideLoading} = inject(loadingKey) as TypeLoading

const logoWidth = 50;

const authStore = useAuthStore();
const router = useRouter();
const logout = async () => {
  showLoading()
  await account.deleteSession('current');
  authStore.$reset();
  await router.push('/login');
  hideLoading()
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