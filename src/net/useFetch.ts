import axios from 'axios';
import useSWR, { mutate } from 'swr';

function fetcher(url: string) {
  return axios.get(url).then((response) => response.data);
}

export default function useFetch(url: string) {
  return useFetchWithType<any>(url);
}

export function useFetchWithType<ResponseType>(url: string) {
  return useSWR<ResponseType>(url, fetcher);
}

export function preload(url: string) {
  return mutate(url, fetcher(url));
}
