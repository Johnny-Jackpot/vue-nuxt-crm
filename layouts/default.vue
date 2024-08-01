<script setup lang="ts">
import {account} from "~/lib/appwrite";
import {useIsLoadingStore} from "~/store/loading.store";
import {useAuthStore} from "~/store/auth.store";

const isLoadingStore = useIsLoadingStore();
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
    isLoadingStore.loading = false;
  }
})
</script>

<template>
  <LayoutLoader v-if="isLoadingStore.loading" />
  <section v-else :class="{'dashboard': authStore.isAuth}">
    <LayoutSidebar v-if="authStore.isAuth"/>
    <div>
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