import { useMutation, useQueryClient } from "react-query";
import { createEditPlaylist } from "./apiPlaylist";
import toast from "react-hot-toast";

export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  const { mutate: createPlaylist, isLoading: isCreating } = useMutation({
    mutationFn: createEditPlaylist,
    onSuccess: () => {
      toast.success("Playlist creata con successo");
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createPlaylist, isCreating };
}
