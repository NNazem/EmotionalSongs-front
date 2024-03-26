import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useQuery, useQueryClient } from "react-query";
import { fetchCanzone, getSongsByTitle } from "./apiSongs";

export default function useSongs() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const titolo = searchParams.get("titolo") || null;
  const autore = searchParams.get("autore") || null;
  const anno = searchParams.get("anno") || null;

  const sortByRow = searchParams.get("sortBy") || "id-ASC";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: songs = { canzoni: [], numeroCanzoni: 0 },
    error,
  } = useQuery({
    queryKey: ["songs", titolo, autore, anno, sortBy, page],
    queryFn: () => fetchCanzone({ titolo, autore, anno, sortBy, page }),
  });

  const pageCount = Math.ceil(songs.numeroCanzoni / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["songs", titolo, sortBy, page + 1],
      queryFn: () => fetchCanzone({ titolo, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["songs", titolo, sortBy, page - 1],
      queryFn: () => fetchCanzone({ titolo, sortBy, page: page - 1 }),
    });

  return { isLoading, error, songs };
}
