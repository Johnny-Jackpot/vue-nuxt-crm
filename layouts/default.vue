<script setup lang="ts">
import {account} from "~/lib/appwrite";
import {useAuthStore} from "~/store/auth.store";
import {useLoading} from "~/layouts/useLoading";

const {loading, hideLoading} = useLoading()
const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
  try {
    const user = await account.get();
    if (user) {
      authStore.set({
        email: user.email,
        name: user.name,
        status: user.status
      });
    }
  } catch (e) {
    await router.push('/login');
  } finally {
    hideLoading();
  }
})
</script>

<template>
  <LayoutLoader v-if="loading" />
  <section v-else :class="{'dashboard': authStore.isAuth}">
    <LayoutSidebar v-if="authStore.isAuth"/>
    <div class="p-10">
      <slot/>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 1fr 6fr;
  min-height: 100vh;
}
</style>