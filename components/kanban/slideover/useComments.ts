import { useDealSlideStore } from "~/store/deal-slide.store";
import { useQuery } from "@tanstack/vue-query";
import { DB } from "~/lib/appwrite";
import { COLLECTION_DEALS, DB_ID } from "~/app.constants";

export function useComments() {
  const dealSlideStore = useDealSlideStore();
  const cardId = dealSlideStore.card?.id || "";

  return useQuery({
    queryKey: ["deal", cardId],
    queryFn: () => DB.getDocument(DB_ID, COLLECTION_DEALS, cardId),
  });
}
