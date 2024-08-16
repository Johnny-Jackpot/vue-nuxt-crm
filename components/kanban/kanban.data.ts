import type { IColumn } from "~/components/kanban/kanban.types";
import { EnumStatus } from "~/types/deals.types";

export const KANBAN_DATA: IColumn[] = [
  {
    id: EnumStatus.todo,
    name: "TODO",
    items: [],
  },
  {
    id: EnumStatus.toBeAgreed,
    name: "To be agreed",
    items: [],
  },
  {
    id: EnumStatus.inProgress,
    name: "In progress",
    items: [],
  },
  {
    id: EnumStatus.produced,
    name: "Produced",
    items: [],
  },
  {
    id: EnumStatus.done,
    name: "Done",
    items: [],
  },
];
