import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { handleInsert } from "./apiPlaylist";
import toast from "react-hot-toast";

export default function usePostCanzone() {
  const queryClient = useQueryClient();

  const { mutate: insert, isLoading: isInserting } = useMutation({
    mutationFn: ({ selectedCanzone, selectedPlaylist }) =>
      handleInsert({ selectedCanzone, selectedPlaylist }),
    onSuccess: () => {
      queryClient.invalidateQueries("playlists");
      toast.success("Canzone inserita con successo");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { insert, isInserting };
}
