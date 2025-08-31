<script setup>
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';

</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#1f1b17]">
    <NavBar />
    <main class="flex-1 flex flex-col items-center justify-center py-12">

      <div class="bg-[#292929] rounded-lg shadow p-10 max-w-2xl mx-auto mt-8">
        <h2 class="golden font-playfair text-4xl font-bold mb-4 text-center" style="opacity:1;">Welcome to Luxury Cars!</h2>
        <hr class="golden mb-4">
        <p class="dark-gold font-playfair text-lg font-light leading-relaxed mb-6 text-center" style="letter-spacing:0.1em;">
          Your destination for luxury and performance vehicles. Founded with a passion for exceptional cars and outstanding customer service, our showroom brings together the world’s finest automotive brands under one roof.<br><span class="diamond-separator h-3 w-3"></span><br>

          Our mission is to deliver a premium experience to every visitor, whether you’re searching for your dream car or simply admiring our collection. We believe in honesty, expertise, and building lasting relationships with our clients.<br><span class="diamond-separator h-3 w-3"></span><br>

          What sets us apart? Our team of car enthusiasts and industry professionals is dedicated to helping you find the perfect vehicle. From exclusive test drives to personalized consultations, we go the extra mile to ensure your satisfaction.<br><span class="diamond-separator h-3 w-3"></span><br>
          Located in the heart of the city, Luxury Cars offers a curated selection of luxury sedans, sports cars, and SUVs. We invite you to visit our showroom, meet our team, and discover why we’re trusted by car lovers across the region.
        </p>
        <span class="golden font-playfair text-3xl font-bold block mt-6 text-center" style="opacity:1;">
          <hr class="golden mb-4">
          Thank you for choosing Luxury Cars. We look forward to welcoming you!
        </span>
      </div>

      <!-- Sample Team Section -->
      <div class="flex flex-wrap justify-center gap-8 mt-16">
        <div class="bg-[#292929] rounded-lg shadow p-6 w-64 flex flex-col items-center">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" class="w-20 h-20 rounded-full mb-4 border-4 border-golden" />
          <span class="golden font-playfair text-lg font-bold mb-1">John Doe</span>
          <span class="golden font-playfair mb-2 font-light" style="opacity:0.85;">Founder & CEO</span>
          <span class="golden font-playfair text-sm font-light text-center" style="opacity:0.7;">Passionate about luxury cars and customer experience.</span>
        </div>
        <div class="bg-[#292929] rounded-lg shadow p-6 w-64 flex flex-col items-center">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane Smith" class="w-20 h-20 rounded-full mb-4 border-4 border-golden" />
          <span class="golden font-playfair text-lg font-bold mb-1">Jane Smith</span>
          <span class="golden font-playfair mb-2 font-light" style="opacity:0.85;">Sales Manager</span>
          <span class="golden font-playfair text-sm font-light text-center" style="opacity:0.7;">Expert in matching clients with their dream cars.</span>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>
