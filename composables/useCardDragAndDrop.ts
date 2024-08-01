import type {ICard, IColumn} from "~/components/kanban/kanban.types";

export function useCardDragAndDrop(onDrop: (card: ICard, targetColumn: IColumn) => void) {
    const dragCardRef = ref<ICard | null>(null)
    const sourceColumnRef = ref<IColumn | null>(null)

    function handleDragStart(card: ICard, column: IColumn) {
        dragCardRef.value = card
        sourceColumnRef.value = column
    }

    function handleDragOver(event: DragEvent) {
        event.preventDefault()
    }

    function handleDrop(targetColumn: IColumn) {
        if (dragCardRef.value && sourceColumnRef.value) {
            onDrop(dragCardRef.value, targetColumn)
        }
    }

    return {handleDragStart, handleDragOver, handleDrop}
}