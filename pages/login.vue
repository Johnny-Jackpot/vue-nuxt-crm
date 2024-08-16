<script setup lang="ts">
import { v4 as uuid } from "uuid";
import { account } from "~/lib/appwrite";
import { useAuthStore } from "~/store/auth.store";
import { loadingKey, type TypeLoading } from "~/layouts/useLoading";

const { showLoading, hideLoading } = inject(loadingKey) as TypeLoading;

useHead({
  title: "Login",
});

const emailRef = ref("");
const passwordRef = ref("");
const nameRef = ref("");

const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
  showLoading();
  await account.createEmailPasswordSession(emailRef.value, passwordRef.value);
  const response = await account.get();

  if (response) {
    authStore.set({
      email: response.email,
      name: response.name,
      status: response.status,
    });
  }

  emailRef.value = "";
  passwordRef.value = "";
  nameRef.value = "";

  await router.push("/");
  hideLoading();
};

const register = async () => {
  await account.create(
    uuid(),
    emailRef.value,
    passwordRef.value,
    nameRef.value,
  );
  await login();
};
</script>

<template>
  <div class="flex items-center justify-center min-h-screen w-full">
    <div class="w-1/4 p-5">
      <h1 class="text-2xl font-bold text-center mb-5">Login</h1>
      <form>
        <UiInput
          v-model="emailRef"
          placeholder="Email"
          type="email"
          class="mb-3"
        />
        <UiInput
          v-model="passwordRef"
          placeholder="Password"
          type="password"
          class="mb-3"
        />
        <UiInput
          v-model="nameRef"
          placeholder="Name"
          type="text"
          class="mb-3"
        />
        <div class="flex items-center justify-center gap-5">
          <UiButton variant="outline" type="button" @click="login"
            >Login</UiButton
          >
          <UiButton variant="outline" type="button" @click="register"
            >Register</UiButton
          >
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
