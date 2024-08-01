import type {ICard} from "~/components/kanban/kanban.types";

export const useDealSlideStore = defineStore('dealSlide', {
    state: (): { card: ICard | null, open: boolean } => ({
        card: null,
        open: false,
    }),
    actions: {
        close() {
            this.$reset()
        },
        open(card: ICard) {
            this.$patch({card, open: true})
        }
    }
})