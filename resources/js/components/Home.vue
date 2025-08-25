<script setup>
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';
import WhyChooseCard from './WhyChooseCard.vue';
import contractIcon from '../../images/contract.svg';
import supportIcon from '../../images/support.svg';
import diamondIcon from '../../images/diamond.svg';
import porscheIcon from '../../images/porsche.svg';

const cards = [
  {
    icon: contractIcon,
    heading: 'Fast Approval',
    text: 'Get your dream car approved in minutes with our streamlined process.'
  },
  {
    icon: supportIcon,
    heading: '24/7 Support',
    text: 'Got any questions? Feel free to reach out!'
  },
  {
    icon: diamondIcon,
    heading: 'Premium Quality',
    text: 'We offer only the best cars for our customers.'
  },
  {
    icon: porscheIcon,
    heading: 'Book a ride',
    text: 'Want to test out driving a luxury car? Book a ride now!'
  }
]
</script>

<template>
  <div class="min-h-screen flex flex-col  bg-[#1f1b17]">
    <NavBar />
    <main class="flex-1">
    <div class="relative w-full h-[40vh] md:h-[95vh] lg:h-[95vh]">
      <video
    src="../../videos/landing_video.mp4"
    autoplay
    loop
    muted
    playsinline
    class="w-full h-full object-cover">
  </video>
  <div class="absolute inset-0 flex flex-col items-center justify-center overlay">
    <!-- Overlay content here -->
    <p class="golden font-playfair text-2xl md:text-4xl lg:text-6xl">Experience Luxury on Wheels</p>
    <br />
    <p class="golden font-playfair">"Test drive premium cars with unmatched style and performance."</p>
    <br />
    <button class="bg-[#292929] golden font-playfair px-6 py-2 rounded shadow">
      Book a ride
    </button>
    </div>
  </div>
  <div class="py-8 px-4">
  <h2 class="text-3xl golden font-playfair underline mb-8">Why choose us?</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 mx-5">
  <WhyChooseCard
  v-for="(card, idx) in cards"
  :key="idx"
  :icon="card.icon"
  :heading="card.heading"
  :text="card.text"
  class="max-w-xs mx-auto md:max-w-sm lg:max-w-md"
/>
</div>
</div>
    </main>
    <Footer />
  </div>
</template>
