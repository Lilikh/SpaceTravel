import data from '../assets/db.json'
export function fetchEvents() {
  return data.events // Replace with your data structure
}
export function useEvents() {
  const events = ref<Event[]>([]);
  const loading = ref(true);
  const sortBy = ref<string>('label');
  const config = useRuntimeConfig();

  const sortOptions = [
    { label: 'Place', value: 'label' },
    { label: 'Rating', value: 'rating' },
    { label: 'Price', value: 'price_per_day' },
    { label: 'Name', value: 'name' },
  ];

  const fetchEvents = async () => {
    loading.value = true;
    const { data, error } = await useFetch(`${config.public.apiBase}/events`);
    if (error.value) {
      console.error('Error fetching events:', error.value);
    } else {
      events.value = data.value as Event[];
    }
    loading.value = false;
  };

  fetchEvents();

  const hotels = computed(() => {
    const allHotels = events.value.flatMap((event) =>
      (event.hotels || []).map((hotel) => ({
        ...hotel,
        eventLabel: event.label,
        event: {
          id: event.id,
          label: event.label,
          title: event.title,
          flight_price: event.flight_price,
          date: event.date,
          description: event.description,
          location: event.location,
          image: event.image,
        },
      }))
    );

    return allHotels.sort((a, b) => {
      if (sortBy.value === 'label') return a.eventLabel.localeCompare(b.eventLabel);
      if (sortBy.value === 'rating') return b.rating - a.rating;
      if (sortBy.value === 'price_per_day') return a.price_per_day - b.price_per_day;
      if (sortBy.value === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  });

  const getBadgeColor = (label: string) => {
    if (!label) return 'gray';
    switch (label) {
      case 'Asteroid': return 'gray';
      case 'Jupiter': return 'indigo';
      case 'Atlantis': return 'teal';
      case 'Mars': return 'red';
      case 'Surprise': return 'yellow';
      case 'Moon': return 'blue';
      default: return 'gray';
    }
  };

  return { events, hotels, loading, fetchEvents, getBadgeColor, sortBy, sortOptions };
}