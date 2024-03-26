import toast from "react-hot-toast";
import { createEditPlaylist } from "./apiPlaylist";
import { useMutation, useQueryClient } from "react-query";

export default function useEditPlaylist() {
  const queryClient = useQueryClient();

  const { mutate: editPlaylist, isLoading: isEditing } = useMutation({
    mutationFn: ({ data, id }) => createEditPlaylist(data, id),
    onSuccess: () => {
      toast.success("Playlist modificata con successo");
      queryClient.invalidateQueries({ queryKey: ["playlists"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editPlaylist, isEditing };
}
