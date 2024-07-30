import {useQuery} from "@tanstack/vue-query";
import {DB} from "~/lib/appwrite";
import {COLLECTION_DEALS, DB_ID} from "~/app.constants";
import {KANBAN_DATA} from "~/components/kanban/kanban.data";
import type {IDeal} from "~/types/deals.types";
import type {IColumn} from "~/components/kanban/kanban.types";

export function useKanbanQuery() {
    return useQuery({
        queryKey: ['deals'],
        queryFn: () => DB.listDocuments(DB_ID, COLLECTION_DEALS),
        select(data) {
            const newBoard = [...KANBAN_DATA]
            const newBoardMap: Map<string, IColumn> = new Map();
            for (const column of newBoard) {
                newBoardMap.set(column.id, column);
            }

            const deals = data.documents as unknown as IDeal[];
            for (const deal of deals) {
                const column = newBoardMap.get(deal.status);
                if (!column) {
                    continue;
                }

                column.items.push({
                    $createdAt: deal.$createdAt,
                    id: deal.$id,
                    name: deal.name,
                    price: deal.price,
                    companyName: deal.customer.name,
                    status: deal.status
                });
            }
        }
    });
}