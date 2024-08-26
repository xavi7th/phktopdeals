<script>
	import Hero from '$partials/home/Hero.svelte';

</script>
<main class="flex flex-col flex-auto">
  <!-- Hero Section -->
  <Hero />
</main>


<!-- Search Bar -->
<section class="py-8">
  <div class="container mx-auto px-4">
      <div class="flex justify-center">
          <input type="text" class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg" placeholder="Search for products...">
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2">Search</button>
      </div>
  </div>
</section>

<!-- Product Cards -->
<section id="products" class="py-12">
  <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <!-- Product Card 1 -->
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1591418528027-7e854ba7418b?q=80&w=500&fit=cover" alt="Product 1" class="w-full h-48 object-cover">
              <div class="p-4">
                  <h2 class="text-xl font-bold mb-2">Product 1</h2>
                  <p class="text-gray-600 mb-4">Brief description of Product 1.</p>
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">View Details</button>
              </div>
          </div>
          <!-- Product Card 2 -->
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=500" alt="Product 2" class="w-full h-48 object-cover">
              <div class="p-4">
                  <h2 class="text-xl font-bold mb-2">Product 2</h2>
                  <p class="text-gray-600 mb-4">Brief description of Product 2.</p>
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">View Details</button>
              </div>
          </div>
          <!-- Product Card 3 -->
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
              <img src="https://plus.unsplash.com/premium_photo-1675055730251-9f3990f1f9d5?q=80&h=500&w=500&fit=crop" alt="Product 3" class="w-full h-48 object-cover">
              <div class="p-4">
                  <h2 class="text-xl font-bold mb-2">Product 3</h2>
                  <p class="text-gray-600 mb-4">Brief description of Product 3.</p>
                  <button class="bg-blue-600 text-white px-4 py-2 rounded-lg">View Details</button>
              </div>
          </div>
      </div>
  </div>
</section>

<!-- How It Works Section -->
<section class="bg-gray-50 py-12">
  <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-8">How It Works</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
              <img src="https://source.unsplash.com/100x100/?step1" alt="Step 1" class="w-16 h-16 mx-auto mb-4">
              <h3 class="text-xl font-semibold">Step 1</h3>
              <p class="text-gray-600">Description of step 1.</p>
          </div>
          <div>
              <img src="https://source.unsplash.com/100x100/?step2" alt="Step 2" class="w-16 h-16 mx-auto mb-4">
              <h3 class="text-xl font-semibold">Step 2</h3>
              <p class="text-gray-600">Description of step 2.</p>
          </div>
          <div>
              <img src="https://source.unsplash.com/100x100/?step3" alt="Step 3" class="w-16 h-16 mx-auto mb-4">
              <h3 class="text-xl font-semibold">Step 3</h3>
              <p class="text-gray-600">Description of step 3.</p>
          </div>
      </div>
  </div>
</section>

<!-- Partners Section -->
<section class="py-12">
  <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-8">Our Partners</h2>
      <div class="flex flex-wrap justify-center items-center">
          <img src="https://source.unsplash.com/200x100/?logo1" alt="Partner 1" class="h-16 mx-4 mb-4">
          <img src="https://source.unsplash.com/200x100/?logo2" alt="Partner 2" class="h-16 mx-4 mb-4">
          <img src="https://source.unsplash.com/200x100/?logo3" alt="Partner 3" class="h-16 mx-4 mb-4">
          <!-- Add more partner logos as needed -->
      </div>
  </div>
</section>
