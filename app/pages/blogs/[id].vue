<template>
	<section class="container mx-auto my-8 p-4">
		<article class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
			<img
				:src="article?.image"
				:alt="article?.title"
				class="object-contain h-60 rounded-lg w-full mb-4"
			/>
			<h1 class="text-3xl font-semibold mb-4">{{ article?.title }}</h1>
			<p class="text-gray-500 dark:text-gray-400 text-sm mb-4">
				Postat den {{ article?.date }} av {{ article?.author }}
			</p>
			<p class="text-gray-700 dark:text-gray-300 text-lg">
				{{ displayedContent }}
			</p>
		</article>
	</section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

interface Article {
	id: number;
	title: string;
	description: string;
	content: string;
	image: string;
	date: string;
	author: string;
}

const route = useRoute();
const article = ref<Article | null>(null);
const displayedContent = ref('');
const typingInterval = 5;

const articles = [



	{
		id: 5,
		title: 'Leila Kheirandish: Eco-Friendly Space Travel',
		description: 'Dreaming of venturing into the cosmos...',
		content: `Dreaming of venturing into the cosmos while keeping our universe pristine? At StarEco, we're pioneering green galactic adventures! Picture yourself navigating the stars in our innovative, solar-powered starships. 🌞🚀 Our fleet is outfitted with the latest sustainable technology, ensuring your voyage leaves no carbon footprint. 🌍✨ From cutting-edge waste-to-energy systems to onboard vertical farms that supply fresh produce, every feature is crafted with the environment in mind. ♻️🌱

As you explore the vastness of space, you can also participate in our interstellar conservation initiatives. Join us in protecting distant planets and promoting ethical space exploration – it's fascinating, educational, and impactful! 🌌🌠 Don't miss our eco-friendly tours of the Kuiper Belt, where you can learn about sustainable resource utilization and the importance of preserving these untouched regions. It's an adventure that combines thrill with environmental responsibility! 🪐✨

Join us at StarEco and be a part of the future of green galactic adventures. Together, we can explore the universe while safeguarding our precious cosmic habitats. 🌍💚`,
		image: 'https://avatars.githubusercontent.com/u/81739933?v=4',
		date: '20 december, 2024',
		author: 'Leila Kheirandish',
	},
];

onMounted(() => {
	const articleId = parseInt(route.params.id as string, 10);
	article.value = articles.find((a) => a.id === articleId) || null;
});

watch(article, (newArticle) => {
	if (newArticle) {
		let index = 0;
		displayedContent.value = '';
		const interval = setInterval(() => {
			if (index < newArticle.content.length) {
				displayedContent.value += newArticle.content[index];
				index++;
			} else {
				clearInterval(interval);
			}
		}, typingInterval);
	}
});
</script>

<style scoped>
.container {
	max-width: 800px;
}
</style>
