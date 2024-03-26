import { useQuery } from "react-query";
import { getPlaylist } from "./apiPlaylist";
import { useParams } from "react-router";

export default function usePlaylist() {
  const { playlistId } = useParams();
  const {
    isLoading,
    data: playlist,
    error,
  } = useQuery({
    queryKey: ["playlist"],
    queryFn: () => getPlaylist(playlistId),
    retry: false,
  });

  return { isLoading, error, playlist };
}
