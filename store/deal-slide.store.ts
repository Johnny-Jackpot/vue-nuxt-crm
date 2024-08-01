import type {ICard} from "~/components/kanban/kanban.types";

export const useDealSlideStore = defineStore('dealSlide', {
    state: (): { card: ICard | null, isOpen: boolean } => ({
        card: null,
        isOpen: false,
    }),
    actions: {
        close() {
            this.$reset()
        },
        open(card: ICard) {
            this.$patch({card, isOpen: true})
        }
    }
})