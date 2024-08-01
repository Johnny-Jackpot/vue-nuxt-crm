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
        set(input: IAuthStore) {
            this.$patch({user: input});
        }
    }
})