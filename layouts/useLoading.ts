export type TypeLoading = {
  loading: Ref<boolean>;
  showLoading: Function;
  hideLoading: Function;
};

export const loadingKey = Symbol() as InjectionKey<TypeLoading>;

export function useLoading(): TypeLoading {
  const loading = ref(true);

  function showLoading() {
    loading.value = true;
  }

  function hideLoading() {
    loading.value = false;
  }

  provide(loadingKey, { loading, showLoading, hideLoading });

  return { loading, showLoading, hideLoading };
}
