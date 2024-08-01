import type {ICard} from "~/components/kanban/kanban.types";

const initialState: { card: ICard | null, open: boolean } = {
    card: null,
    open: false,
}

export const useDealSlideStore = defineStore('dealSlide', {
    state: () => initialState,
    actions: {
        close() {
            this.$patch(initialState)
        },
        open(card: ICard) {
            this.$patch({card, open: true})
        }
    }
})