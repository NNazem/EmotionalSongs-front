import { useQuery, useQueryClient } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { fetchVisualizzaEmozioni } from "./apiSongs";
import { useUser } from "../login/useUser";

export default function useEmozioni() {
  const queryClient = useQueryClient();
 
  const { songId } = useParams();
  const { isAuthenticated } = useUser();

  const {
    isLoading,
    data: emozioni,
    error,
  } = useQuery({
    queryKey: ["emozioni"],
    queryFn: () => fetchVisualizzaEmozioni(songId, isAuthenticated),
    retry: false,
  });

  return { emozioni, isLoading, error };
}
