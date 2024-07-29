export const useIsLoadingStore = defineStore('isLoading', {
    state: () => ({
        loading: true,
    }),
    actions: {
        set(data: boolean) {
            this.loading = data;
        }
    }
});