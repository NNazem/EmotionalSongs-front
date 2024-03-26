import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { handleDelete, handleInsert } from "./apiPlaylist";
import toast from "react-hot-toast";

export default function useDeleteCanzone() {
  const queryClient = useQueryClient();

  const { mutate: deleteSong, isLoading: isDeleting } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries("playlists");
      toast.success("Canzone eliminata  con successo");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteSong, isDeleting };
}
