import { ref } from 'vue';
import type { Event } from '~/types';

export function useSearch() {
  const events = ref<Event[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const config = useRuntimeConfig();

  const fetchSearchData = async () => {
    loading.value = true;
    const { data, error: fetchError } = await useFetch(`${config.public.apiBase}/events`);
    if (fetchError.value) {
      error.value = fetchError.value;
      console.error('Error fetching search data:', fetchError.value);
    } else {
      events.value = data.value as Event[];
    }
    loading.value = false;
  };

  return { events, loading, error, fetchSearchData };
}