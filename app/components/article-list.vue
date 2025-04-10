<template>
	<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<article
			v-for="article in articles"
			:key="article.id"
			class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
		>
			<NuxtLink :to="`/blogs/${article.id}`">
				<img
					:src="article.image"
					:alt="article.title"
					class="object-contain h-40 rounded-lg w-full mb-4"
				/>
				<h2 class="text-lg font-semibold mb-2">{{ article.title }}</h2>
				<p class="text-gray-700 dark:text-gray-300 text-sm mb-2">
					{{ article.description }}
				</p>
				<p class="text-gray-500 dark:text-gray-400 text-xs">
					Postat den {{ article.date }} av {{ article.author }}
				</p>
			</NuxtLink>
		</article>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Article {
	id: number;
	title: string;
	description: string;
	content: string;
	image: string;
	date: string;
	author: string;
}

const articles = ref<Article[]>([
	
	{
		id: 5,
		title: 'Leila Kheirandish: Thrilling Space Travel',
		description: 'Dreaming of venturing into the cosmos...',
		content: `Dreaming of venturing into the cosmos while keeping our universe pristine? At StarEco, we're pioneering green galactic adventures! Picture yourself navigating the stars in our innovative, solar-powered starships. 🌞🚀 Our fleet is outfitted with the latest sustainable technology, ensuring your voyage leaves no carbon footprint. 🌍✨ From cutting-edge waste-to-energy systems to onboard vertical farms that supply fresh produce, every feature is crafted with the environment in mind. ♻️🌱

As you explore the vastness of space, you can also participate in our interstellar conservation initiatives. Join us in protecting distant planets and promoting ethical space exploration – it's fascinating, educational, and impactful! 🌌🌠 Don't miss our eco-friendly tours of the Kuiper Belt, where you can learn about sustainable resource utilization and the importance of preserving these untouched regions. It's an adventure that combines thrill with environmental responsibility! 🪐✨

Join us at StarEco and be a part of the future of green galactic adventures. Together, we can explore the universe while safeguarding our precious cosmic habitats. 🌍💚`,
		image: 'https://avatars.githubusercontent.com/u/81739933?v=4',
		date: '20 december, 2024',
		author: 'Leila Kheirandish',
	},
]);
</script>

<style scoped>
article {
	transition: transform 0.3s ease;
}
article:hover {
	transform: scale(1.05);
}
img {
	transition: transform 0.3s ease;
	border-radius: 0.75rem; /* Tailwind CSS equivalent of rounded-lg */
}
img:hover {
	transform: scale(1.05);
}
</style>
