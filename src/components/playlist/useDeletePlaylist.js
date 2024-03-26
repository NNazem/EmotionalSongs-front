import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { deletePlaylist as deletePlaylistAPI } from "./apiPlaylist";

export function useDeletePlaylist() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deletePlaylist } = useMutation({
    mutationFn: deletePlaylistAPI,
    onSuccess: () => {
      toast.success("Playlist eliminata con successo!");
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleting, deletePlaylist };
}
