interface IAuthStore {
    email: string
    name: string
    status: boolean
}

export const useAuthStore = defineStore('auth', {
    state: (): {user: IAuthStore} => ({
        user: {
            email: '',
            name: '',
            status: false,
        }
    }),
    getters: {
        isAuth: state => state.user.status,
    },
    actions: {
        clear() {
            this.$reset();
        },
        set(input: IAuthStore) {
            this.$patch({user: input});
        }
    }
})