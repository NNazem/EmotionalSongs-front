import { useQuery } from "react-query";
import { getPlaylists } from "./apiPlaylist";

export default function usePlaylists() {
  const {
    isLoading,
    data: playlists,
    error,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => getPlaylists(),
    retry: false,
  });

  return { isLoading, error, playlists };
}
