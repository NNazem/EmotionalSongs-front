import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getSong } from "./apiSongs";

export default function useSong() {
  const { songId } = useParams();

  const {
    isLoading,
    data: song,
    error,
  } = useQuery({
    queryKey: ["song"],
    queryFn: () => getSong(songId),
    retry: false,
  });

  return { isLoading, error, song };
}
