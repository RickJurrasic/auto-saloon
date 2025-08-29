<script setup>
import NavBar from './NavBar.vue';
import Footer from './Footer.vue';

</script>

<template>
  <div class="min-h-screen flex flex-col bg-[#1f1b17]">
    <NavBar />
    <main class="flex-1 flex flex-col items-center justify-center py-12">
      <h1 class="text-4xl golden font-playfair mb-6">About Us</h1>
        <div class="bg-[#292929] rounded-lg shadow p-8 max-w-xl mx-auto mt-12">
            <p class="text-lg golden font-playfair mb-8">Welcome to Auto Saloon, your destination for luxury and performance vehicles. Founded with a passion for exceptional cars and outstanding customer service, our showroom brings together the world’s finest automotive brands under one roof.</p>
        </div>

        <div class="bg-[#292929] rounded-lg shadow p-8 max-w-xl mx-auto mt-12">
      <p class="text-lg golden font-playfair mb-8">Our mission is to deliver a premium experience to every visitor, whether you’re searching for your dream car or simply admiring our collection. We believe in honesty, expertise, and building lasting relationships with our clients.</p>
      </div>

      <div class="bg-[#292929] rounded-lg shadow p-8 max-w-xl mx-auto mt-12">
      <p class="text-lg golden font-playfair mb-8">What sets us apart? Our team of car enthusiasts and industry professionals is dedicated to helping you find the perfect vehicle. From exclusive test drives to personalized consultations, we go the extra mile to ensure your satisfaction.</p>
      </div>

      <div class="bg-[#292929] rounded-lg shadow p-8 max-w-xl mx-auto mt-12">
        <p class="text-lg golden font-playfair mb-8">Located in the heart of the city, Auto Saloon offers a curated selection of luxury sedans, sports cars, and SUVs. We invite you to visit our showroom, meet our team, and discover why we’re trusted by car lovers across the region.</p>
      </div>

      <div class="bg-[#292929] rounded-lg shadow p-8 max-w-xl mx-auto mt-12">
        <p class="text-lg golden font-playfair mb-8">Thank you for choosing Auto Saloon. We look forward to welcoming you!</p>
      </div>
    </main>
    <Footer />
  </div>
</template>
