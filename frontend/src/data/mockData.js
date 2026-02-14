// DoorDash Clone Mock Data - 50+ Restaurants

export const categories = [
  { id: 1, name: 'Fast Food', icon: '🍔', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200' },
  { id: 2, name: 'Pizza', icon: '🍕', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200' },
  { id: 3, name: 'Sushi', icon: '🍣', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=200' },
  { id: 4, name: 'Chinese', icon: '🥡', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=200' },
  { id: 5, name: 'Mexican', icon: '🌮', image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=200' },
  { id: 6, name: 'Indian', icon: '🍛', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200' },
  { id: 7, name: 'Thai', icon: '🍜', image: 'https://images.unsplash.com/photo-1635685296916-95acaf58471f?w=200' },
  { id: 8, name: 'Italian', icon: '🍝', image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=200' },
  { id: 9, name: 'Desserts', icon: '🍰', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200' },
  { id: 10, name: 'Coffee', icon: '☕', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200' },
  { id: 11, name: 'Healthy', icon: '🥗', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200' },
  { id: 12, name: 'Breakfast', icon: '🥞', image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=200' },
  { id: 13, name: 'Seafood', icon: '🦐', image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=200' },
  { id: 14, name: 'Korean', icon: '🍱', image: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?w=200' },
  { id: 15, name: 'American', icon: '🍗', image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=200' },
];

export const restaurants = [
  // Fast Food
  { id: 1, name: "Burger Palace", category: "Fast Food", rating: 4.7, reviews: 2340, deliveryTime: "15-25", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500", featured: true, promo: "$0 delivery fee" },
  { id: 2, name: "The Burger Joint", category: "Fast Food", rating: 4.5, reviews: 1890, deliveryTime: "20-30", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500", featured: false },
  { id: 3, name: "Shake & Burger", category: "Fast Food", rating: 4.8, reviews: 3200, deliveryTime: "18-28", deliveryFee: 0, image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500", featured: true, promo: "Free delivery" },
  { id: 4, name: "Quick Bites", category: "Fast Food", rating: 4.3, reviews: 980, deliveryTime: "12-22", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500", featured: false },
  
  // Pizza
  { id: 5, name: "Tony's Pizzeria", category: "Pizza", rating: 4.9, reviews: 4500, deliveryTime: "25-35", deliveryFee: 2.99, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500", featured: true, promo: "Buy 1 Get 1" },
  { id: 6, name: "Pizza Heaven", category: "Pizza", rating: 4.6, reviews: 2100, deliveryTime: "30-40", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500", featured: false },
  { id: 7, name: "Napoli Express", category: "Pizza", rating: 4.7, reviews: 1750, deliveryTime: "22-32", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=500", featured: true },
  { id: 8, name: "Brooklyn Pizza", category: "Pizza", rating: 4.4, reviews: 890, deliveryTime: "28-38", deliveryFee: 3.49, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500", featured: false },
  
  // Sushi
  { id: 9, name: "Sakura Sushi", category: "Sushi", rating: 4.8, reviews: 3400, deliveryTime: "30-45", deliveryFee: 3.99, image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500", featured: true, promo: "20% off" },
  { id: 10, name: "Tokyo Roll", category: "Sushi", rating: 4.6, reviews: 1980, deliveryTime: "35-50", deliveryFee: 4.49, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500", featured: false },
  { id: 11, name: "Sushi Master", category: "Sushi", rating: 4.9, reviews: 5200, deliveryTime: "25-40", deliveryFee: 2.99, image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=500", featured: true },
  { id: 12, name: "Ocean Sushi", category: "Sushi", rating: 4.5, reviews: 1200, deliveryTime: "32-45", deliveryFee: 3.49, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500", featured: false },
  
  // Chinese
  { id: 13, name: "Golden Dragon", category: "Chinese", rating: 4.7, reviews: 2800, deliveryTime: "25-35", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500", featured: true },
  { id: 14, name: "Panda Express", category: "Chinese", rating: 4.4, reviews: 4100, deliveryTime: "18-28", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1623689048105-a17b1e1936b8?w=500", featured: false },
  { id: 15, name: "Wok & Roll", category: "Chinese", rating: 4.6, reviews: 1560, deliveryTime: "22-32", deliveryFee: 2.99, image: "https://images.unsplash.com/photo-1635685296916-95acaf58471f?w=500", featured: true, promo: "15% off first order" },
  { id: 16, name: "China Garden", category: "Chinese", rating: 4.3, reviews: 780, deliveryTime: "28-40", deliveryFee: 1.49, image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500", featured: false },
  
  // Mexican
  { id: 17, name: "Taco Fiesta", category: "Mexican", rating: 4.8, reviews: 3600, deliveryTime: "20-30", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=500", featured: true, promo: "$0 delivery" },
  { id: 18, name: "El Mexicano", category: "Mexican", rating: 4.5, reviews: 2200, deliveryTime: "25-35", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500", featured: false },
  { id: 19, name: "Burrito Bros", category: "Mexican", rating: 4.7, reviews: 1890, deliveryTime: "18-28", deliveryFee: 0, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500", featured: true },
  { id: 20, name: "Casa del Sol", category: "Mexican", rating: 4.4, reviews: 950, deliveryTime: "30-42", deliveryFee: 2.99, image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500", featured: false },
  
  // Indian
  { id: 21, name: "Taj Mahal", category: "Indian", rating: 4.9, reviews: 4200, deliveryTime: "30-45", deliveryFee: 2.99, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500", featured: true, promo: "Free naan" },
  { id: 22, name: "Curry House", category: "Indian", rating: 4.6, reviews: 1780, deliveryTime: "35-50", deliveryFee: 3.49, image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=500", featured: false },
  { id: 23, name: "Spice Route", category: "Indian", rating: 4.7, reviews: 2340, deliveryTime: "28-40", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=500", featured: true },
  { id: 24, name: "Mumbai Kitchen", category: "Indian", rating: 4.5, reviews: 1120, deliveryTime: "32-45", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500", featured: false },
  
  // Thai
  { id: 25, name: "Thai Orchid", category: "Thai", rating: 4.8, reviews: 2900, deliveryTime: "25-38", deliveryFee: 2.99, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500", featured: true },
  { id: 26, name: "Bangkok Street", category: "Thai", rating: 4.5, reviews: 1450, deliveryTime: "30-42", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=500", featured: false },
  { id: 27, name: "Pad Thai Palace", category: "Thai", rating: 4.7, reviews: 1980, deliveryTime: "22-35", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1637806930600-37fa8892069d?w=500", featured: true, promo: "10% off" },
  
  // Italian
  { id: 28, name: "Bella Italia", category: "Italian", rating: 4.8, reviews: 3800, deliveryTime: "28-40", deliveryFee: 3.49, image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=500", featured: true },
  { id: 29, name: "Pasta Paradise", category: "Italian", rating: 4.6, reviews: 2100, deliveryTime: "32-45", deliveryFee: 2.99, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500", featured: false },
  { id: 30, name: "Trattoria Roma", category: "Italian", rating: 4.9, reviews: 4500, deliveryTime: "25-38", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=500", featured: true, promo: "Free breadsticks" },
  { id: 31, name: "Olive Garden Express", category: "Italian", rating: 4.4, reviews: 1340, deliveryTime: "35-48", deliveryFee: 3.99, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500", featured: false },
  
  // Desserts
  { id: 32, name: "Sweet Dreams", category: "Desserts", rating: 4.9, reviews: 5600, deliveryTime: "15-25", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500", featured: true, promo: "2 for 1" },
  { id: 33, name: "Ice Cream Factory", category: "Desserts", rating: 4.7, reviews: 3200, deliveryTime: "18-28", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500", featured: false },
  { id: 34, name: "Cake Heaven", category: "Desserts", rating: 4.8, reviews: 2780, deliveryTime: "20-32", deliveryFee: 1.49, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500", featured: true },
  { id: 35, name: "Donut Delight", category: "Desserts", rating: 4.6, reviews: 1890, deliveryTime: "12-22", deliveryFee: 0, image: "https://images.unsplash.com/photo-1558326567-98ae2405596b?w=500", featured: false },
  
  // Coffee
  { id: 36, name: "Brew & Bean", category: "Coffee", rating: 4.7, reviews: 4100, deliveryTime: "10-20", deliveryFee: 1.49, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500", featured: true },
  { id: 37, name: "Coffee Corner", category: "Coffee", rating: 4.5, reviews: 2340, deliveryTime: "12-22", deliveryFee: 0.99, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500", featured: false },
  { id: 38, name: "Espresso Express", category: "Coffee", rating: 4.8, reviews: 3560, deliveryTime: "8-18", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500", featured: true, promo: "Free pastry" },
  
  // Healthy
  { id: 39, name: "Green Bowl", category: "Healthy", rating: 4.8, reviews: 2900, deliveryTime: "18-28", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500", featured: true },
  { id: 40, name: "Salad Station", category: "Healthy", rating: 4.6, reviews: 1780, deliveryTime: "15-25", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=500", featured: false },
  { id: 41, name: "Fresh & Fit", category: "Healthy", rating: 4.7, reviews: 2100, deliveryTime: "20-30", deliveryFee: 2.99, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500", featured: true, promo: "$3 off" },
  { id: 42, name: "Smoothie King", category: "Healthy", rating: 4.5, reviews: 1450, deliveryTime: "12-22", deliveryFee: 1.49, image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=500", featured: false },
  
  // Breakfast
  { id: 43, name: "Morning Glory", category: "Breakfast", rating: 4.8, reviews: 3400, deliveryTime: "20-30", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500", featured: true },
  { id: 44, name: "Pancake House", category: "Breakfast", rating: 4.6, reviews: 2100, deliveryTime: "22-35", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500", featured: false },
  { id: 45, name: "Egg & Toast", category: "Breakfast", rating: 4.7, reviews: 1890, deliveryTime: "15-25", deliveryFee: 1.49, image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500", featured: true, promo: "Free coffee" },
  
  // Seafood
  { id: 46, name: "Ocean Catch", category: "Seafood", rating: 4.9, reviews: 2800, deliveryTime: "30-45", deliveryFee: 3.99, image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=500", featured: true },
  { id: 47, name: "Lobster Shack", category: "Seafood", rating: 4.7, reviews: 1560, deliveryTime: "35-50", deliveryFee: 4.49, image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=500", featured: false },
  { id: 48, name: "Fish Market", category: "Seafood", rating: 4.6, reviews: 1120, deliveryTime: "28-40", deliveryFee: 2.99, image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=500", featured: true },
  
  // Korean
  { id: 49, name: "Seoul Kitchen", category: "Korean", rating: 4.8, reviews: 3200, deliveryTime: "25-38", deliveryFee: 2.99, image: "https://images.unsplash.com/photo-1617692855027-33b14f061079?w=500", featured: true, promo: "Free kimchi" },
  { id: 50, name: "K-BBQ Express", category: "Korean", rating: 4.6, reviews: 1890, deliveryTime: "30-42", deliveryFee: 3.49, image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500", featured: false },
  { id: 51, name: "Bibimbap Bowl", category: "Korean", rating: 4.7, reviews: 1450, deliveryTime: "22-35", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1580651214613-f4692d6d138f?w=500", featured: true },
  
  // American
  { id: 52, name: "American Diner", category: "American", rating: 4.5, reviews: 2800, deliveryTime: "20-32", deliveryFee: 2.49, image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500", featured: true },
  { id: 53, name: "Wings & Things", category: "American", rating: 4.7, reviews: 3400, deliveryTime: "25-38", deliveryFee: 1.99, image: "https://images.unsplash.com/photo-1608039829572-9b8d0041a3ea?w=500", featured: false },
  { id: 54, name: "BBQ Pit", category: "American", rating: 4.8, reviews: 4100, deliveryTime: "30-45", deliveryFee: 2.99, image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500", featured: true, promo: "$5 off $25+" },
  { id: 55, name: "Steakhouse Express", category: "American", rating: 4.6, reviews: 1780, deliveryTime: "35-48", deliveryFee: 3.99, image: "https://images.unsplash.com/photo-1558030006-450675393462?w=500", featured: false },
];

// Generate menu items for each restaurant
export const generateMenuItems = (restaurantId, category) => {
  const menuTemplates = {
    "Fast Food": [
      { name: "Classic Burger", price: 9.99, description: "Juicy beef patty with lettuce, tomato, onion, and special sauce", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300", popular: true },
      { name: "Cheeseburger Deluxe", price: 11.99, description: "Double patty with American cheese, bacon, and pickles", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=300", popular: true },
      { name: "Crispy Chicken Sandwich", price: 10.49, description: "Crispy fried chicken with coleslaw and spicy mayo", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300" },
      { name: "French Fries", price: 3.99, description: "Golden crispy fries with sea salt", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300" },
      { name: "Onion Rings", price: 4.99, description: "Beer-battered onion rings", image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=300" },
      { name: "Milkshake", price: 5.99, description: "Creamy vanilla, chocolate, or strawberry", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300" },
      { name: "Veggie Burger", price: 10.99, description: "Plant-based patty with fresh vegetables", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300" },
      { name: "Chicken Nuggets", price: 7.99, description: "10 piece crispy chicken nuggets with dipping sauce", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=300", popular: true },
    ],
    "Pizza": [
      { name: "Margherita Pizza", price: 14.99, description: "Fresh mozzarella, tomatoes, and basil", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300", popular: true },
      { name: "Pepperoni Pizza", price: 16.99, description: "Classic pepperoni with extra cheese", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300", popular: true },
      { name: "Supreme Pizza", price: 18.99, description: "Pepperoni, sausage, peppers, onions, mushrooms", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300" },
      { name: "BBQ Chicken Pizza", price: 17.99, description: "Grilled chicken with BBQ sauce and red onions", image: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=300" },
      { name: "Veggie Pizza", price: 15.99, description: "Bell peppers, mushrooms, olives, onions", image: "https://images.unsplash.com/photo-1571066811602-716837d681de?w=300" },
      { name: "Garlic Bread", price: 5.99, description: "Toasted with garlic butter and herbs", image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=300" },
      { name: "Caesar Salad", price: 8.99, description: "Romaine, parmesan, croutons, caesar dressing", image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300" },
      { name: "Buffalo Wings", price: 12.99, description: "Crispy wings tossed in buffalo sauce", image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300", popular: true },
    ],
    "Sushi": [
      { name: "California Roll", price: 12.99, description: "Crab, avocado, cucumber (8 pcs)", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=300", popular: true },
      { name: "Salmon Sashimi", price: 16.99, description: "Fresh salmon slices (10 pcs)", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300", popular: true },
      { name: "Dragon Roll", price: 18.99, description: "Shrimp tempura, eel, avocado (8 pcs)", image: "https://images.unsplash.com/photo-1615361200141-f45040f367be?w=300" },
      { name: "Spicy Tuna Roll", price: 14.99, description: "Spicy tuna with cucumber (8 pcs)", image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=300" },
      { name: "Rainbow Roll", price: 19.99, description: "California roll topped with assorted fish", image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=300", popular: true },
      { name: "Miso Soup", price: 4.99, description: "Traditional miso with tofu and seaweed", image: "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=300" },
      { name: "Edamame", price: 5.99, description: "Steamed soybeans with sea salt", image: "https://images.unsplash.com/photo-1564894809611-1742fc40ed80?w=300" },
      { name: "Chirashi Bowl", price: 22.99, description: "Assorted sashimi over sushi rice", image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=300" },
    ],
    "Chinese": [
      { name: "General Tso's Chicken", price: 14.99, description: "Crispy chicken in sweet and spicy sauce", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300", popular: true },
      { name: "Beef Lo Mein", price: 13.99, description: "Stir-fried noodles with beef and vegetables", image: "https://images.unsplash.com/photo-1635685296916-95acaf58471f?w=300", popular: true },
      { name: "Kung Pao Chicken", price: 13.99, description: "Chicken with peanuts and peppers", image: "https://images.unsplash.com/photo-1623689048105-a17b1e1936b8?w=300" },
      { name: "Fried Rice", price: 10.99, description: "Egg fried rice with vegetables", image: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=300" },
      { name: "Spring Rolls", price: 6.99, description: "Crispy vegetable spring rolls (4 pcs)", image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=300" },
      { name: "Sweet and Sour Pork", price: 14.99, description: "Crispy pork in tangy sauce", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300", popular: true },
      { name: "Wonton Soup", price: 7.99, description: "Pork dumplings in savory broth", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300" },
      { name: "Orange Chicken", price: 13.99, description: "Crispy chicken in orange glaze", image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=300" },
    ],
    "Mexican": [
      { name: "Tacos Al Pastor", price: 12.99, description: "Three tacos with marinated pork and pineapple", image: "https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=300", popular: true },
      { name: "Burrito Bowl", price: 13.99, description: "Rice, beans, meat, salsa, guacamole", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300", popular: true },
      { name: "Quesadilla", price: 10.99, description: "Cheese and chicken in crispy tortilla", image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=300" },
      { name: "Nachos Supreme", price: 11.99, description: "Loaded nachos with all toppings", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300" },
      { name: "Enchiladas", price: 14.99, description: "Three enchiladas with red sauce", image: "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=300" },
      { name: "Guacamole & Chips", price: 8.99, description: "Fresh made guacamole with tortilla chips", image: "https://images.unsplash.com/photo-1541123603104-512919d6a96c?w=300" },
      { name: "Churros", price: 6.99, description: "Cinnamon sugar churros with chocolate", image: "https://images.unsplash.com/photo-1624371414361-e670edf4698d?w=300", popular: true },
      { name: "Street Corn", price: 5.99, description: "Elote with mayo, cheese, and chili", image: "https://images.unsplash.com/photo-1551496417-8c8e8c8c8e8c?w=300" },
    ],
    "Indian": [
      { name: "Butter Chicken", price: 15.99, description: "Creamy tomato curry with tender chicken", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300", popular: true },
      { name: "Paneer Tikka Masala", price: 14.99, description: "Cottage cheese in spiced tomato sauce", image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?w=300", popular: true },
      { name: "Lamb Biryani", price: 17.99, description: "Fragrant rice with spiced lamb", image: "https://images.unsplash.com/photo-1618449840665-9ed506d73a34?w=300" },
      { name: "Chicken Tikka", price: 13.99, description: "Marinated grilled chicken pieces", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300" },
      { name: "Naan Bread", price: 3.99, description: "Freshly baked garlic naan", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=300" },
      { name: "Samosas", price: 6.99, description: "Crispy pastries with spiced potatoes (3 pcs)", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300" },
      { name: "Dal Makhani", price: 12.99, description: "Creamy black lentils", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300", popular: true },
      { name: "Mango Lassi", price: 4.99, description: "Sweet mango yogurt drink", image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300" },
    ],
    "Thai": [
      { name: "Pad Thai", price: 13.99, description: "Stir-fried rice noodles with shrimp", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=300", popular: true },
      { name: "Green Curry", price: 14.99, description: "Chicken in coconut green curry", image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300", popular: true },
      { name: "Tom Yum Soup", price: 9.99, description: "Spicy and sour soup with shrimp", image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=300" },
      { name: "Massaman Curry", price: 15.99, description: "Rich curry with potatoes and peanuts", image: "https://images.unsplash.com/photo-1637806930600-37fa8892069d?w=300" },
      { name: "Thai Fried Rice", price: 12.99, description: "Jasmine rice with egg and vegetables", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=300" },
      { name: "Satay Skewers", price: 10.99, description: "Grilled chicken with peanut sauce (4 pcs)", image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=300", popular: true },
      { name: "Spring Rolls", price: 7.99, description: "Fresh rolls with shrimp and vegetables", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300" },
      { name: "Mango Sticky Rice", price: 8.99, description: "Sweet coconut rice with fresh mango", image: "https://images.unsplash.com/photo-1607920592519-bab8b2625a5d?w=300" },
    ],
    "Italian": [
      { name: "Spaghetti Carbonara", price: 15.99, description: "Creamy pasta with bacon and parmesan", image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=300", popular: true },
      { name: "Fettuccine Alfredo", price: 14.99, description: "Creamy parmesan sauce with fettuccine", image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300", popular: true },
      { name: "Lasagna", price: 16.99, description: "Layered pasta with meat and cheese", image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300" },
      { name: "Chicken Parmesan", price: 17.99, description: "Breaded chicken with marinara and mozzarella", image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=300" },
      { name: "Bruschetta", price: 8.99, description: "Toasted bread with tomatoes and basil", image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300" },
      { name: "Tiramisu", price: 9.99, description: "Classic coffee-flavored dessert", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300", popular: true },
      { name: "Minestrone Soup", price: 7.99, description: "Hearty vegetable soup", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300" },
      { name: "Risotto", price: 15.99, description: "Creamy mushroom risotto", image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=300" },
    ],
    "Desserts": [
      { name: "Chocolate Cake", price: 7.99, description: "Rich chocolate layer cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300", popular: true },
      { name: "Ice Cream Sundae", price: 6.99, description: "Three scoops with toppings", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300", popular: true },
      { name: "Cheesecake", price: 8.99, description: "New York style with berry compote", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300" },
      { name: "Donuts Box", price: 12.99, description: "Assorted dozen donuts", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=300" },
      { name: "Brownies", price: 5.99, description: "Fudgy chocolate brownies (4 pcs)", image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=300" },
      { name: "Apple Pie", price: 6.99, description: "Warm apple pie with vanilla ice cream", image: "https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=300", popular: true },
      { name: "Cookies", price: 4.99, description: "Fresh baked chocolate chip (6 pcs)", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300" },
      { name: "Crème Brûlée", price: 9.99, description: "Classic French vanilla custard", image: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=300" },
    ],
    "Coffee": [
      { name: "Cappuccino", price: 4.99, description: "Espresso with steamed milk foam", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300", popular: true },
      { name: "Iced Latte", price: 5.49, description: "Cold espresso with milk over ice", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300", popular: true },
      { name: "Americano", price: 3.99, description: "Espresso with hot water", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300" },
      { name: "Mocha", price: 5.99, description: "Espresso with chocolate and milk", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300" },
      { name: "Croissant", price: 3.99, description: "Butter croissant fresh baked", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300" },
      { name: "Blueberry Muffin", price: 3.49, description: "Fresh baked with real blueberries", image: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=300", popular: true },
      { name: "Cold Brew", price: 4.99, description: "Slow steeped for 24 hours", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300" },
      { name: "Chai Latte", price: 5.49, description: "Spiced tea with steamed milk", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=300" },
    ],
    "Healthy": [
      { name: "Acai Bowl", price: 12.99, description: "Acai blend with granola and fresh fruits", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300", popular: true },
      { name: "Garden Salad", price: 10.99, description: "Mixed greens with vinaigrette", image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=300", popular: true },
      { name: "Grilled Chicken Salad", price: 13.99, description: "Greens with grilled chicken breast", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300" },
      { name: "Smoothie Bowl", price: 11.99, description: "Blended fruits with toppings", image: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?w=300" },
      { name: "Quinoa Bowl", price: 12.99, description: "Quinoa with roasted vegetables", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300", popular: true },
      { name: "Veggie Wrap", price: 10.99, description: "Grilled vegetables in whole wheat wrap", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=300" },
      { name: "Green Smoothie", price: 7.99, description: "Spinach, banana, mango blend", image: "https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=300" },
      { name: "Avocado Toast", price: 9.99, description: "Smashed avocado on sourdough", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300" },
    ],
    "Breakfast": [
      { name: "Pancakes Stack", price: 11.99, description: "Fluffy pancakes with maple syrup", image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=300", popular: true },
      { name: "Eggs Benedict", price: 13.99, description: "Poached eggs with hollandaise", image: "https://images.unsplash.com/photo-1608039829572-9b8d0041a3ea?w=300", popular: true },
      { name: "French Toast", price: 10.99, description: "Brioche with berries and cream", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300" },
      { name: "Breakfast Burrito", price: 12.99, description: "Eggs, cheese, bacon, potatoes", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300" },
      { name: "Omelette", price: 11.99, description: "Three egg omelette with choice of fillings", image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?w=300", popular: true },
      { name: "Avocado Toast", price: 9.99, description: "With poached eggs and everything bagel seasoning", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=300" },
      { name: "Bagel & Lox", price: 14.99, description: "Smoked salmon with cream cheese", image: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=300" },
      { name: "Breakfast Platter", price: 15.99, description: "Eggs, bacon, sausage, hash browns, toast", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=300" },
    ],
    "Seafood": [
      { name: "Grilled Salmon", price: 22.99, description: "Atlantic salmon with lemon butter", image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=300", popular: true },
      { name: "Fish & Chips", price: 16.99, description: "Beer-battered cod with fries", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=300", popular: true },
      { name: "Shrimp Scampi", price: 19.99, description: "Garlic butter shrimp over pasta", image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=300" },
      { name: "Lobster Roll", price: 24.99, description: "Fresh lobster meat in buttered roll", image: "https://images.unsplash.com/photo-1569597748618-c9eff8d85303?w=300" },
      { name: "Crab Cakes", price: 18.99, description: "Pan-seared with remoulade (2 pcs)", image: "https://images.unsplash.com/photo-1553659971-f01207815844?w=300", popular: true },
      { name: "Clam Chowder", price: 9.99, description: "Creamy New England style", image: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?w=300" },
      { name: "Grilled Octopus", price: 21.99, description: "Charred with olive oil and herbs", image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=300" },
      { name: "Seafood Platter", price: 34.99, description: "Lobster tail, shrimp, crab legs, mussels", image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=300" },
    ],
    "Korean": [
      { name: "Bulgogi", price: 16.99, description: "Marinated beef with rice", image: "https://images.unsplash.com/photo-1617692855027-33b14f061079?w=300", popular: true },
      { name: "Korean Fried Chicken", price: 14.99, description: "Crispy double-fried chicken", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300", popular: true },
      { name: "Bibimbap", price: 13.99, description: "Rice bowl with vegetables and egg", image: "https://images.unsplash.com/photo-1580651214613-f4692d6d138f?w=300" },
      { name: "Kimchi Jjigae", price: 12.99, description: "Spicy kimchi stew with pork", image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=300" },
      { name: "Japchae", price: 12.99, description: "Stir-fried glass noodles", image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=300", popular: true },
      { name: "Tteokbokki", price: 10.99, description: "Spicy rice cakes", image: "https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=300" },
      { name: "Kimbap", price: 9.99, description: "Korean rice rolls (8 pcs)", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=300" },
      { name: "Samgyeopsal", price: 18.99, description: "Grilled pork belly set", image: "https://images.unsplash.com/photo-1608039855141-9b6a6c3a2b1f?w=300" },
    ],
    "American": [
      { name: "BBQ Ribs", price: 21.99, description: "Slow-smoked with house BBQ sauce", image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300", popular: true },
      { name: "Buffalo Wings", price: 13.99, description: "Crispy wings with ranch (12 pcs)", image: "https://images.unsplash.com/photo-1608039829572-9b8d0041a3ea?w=300", popular: true },
      { name: "Mac & Cheese", price: 10.99, description: "Creamy four-cheese blend", image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686?w=300" },
      { name: "Ribeye Steak", price: 29.99, description: "12oz USDA Choice with sides", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=300" },
      { name: "Pulled Pork Sandwich", price: 12.99, description: "Slow-smoked with coleslaw", image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=300" },
      { name: "Loaded Fries", price: 9.99, description: "Fries with cheese, bacon, sour cream", image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=300", popular: true },
      { name: "Fried Chicken", price: 14.99, description: "Southern-style (3 pcs) with biscuit", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=300" },
      { name: "Cornbread", price: 4.99, description: "Honey butter cornbread", image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300" },
    ],
  };

  const items = menuTemplates[category] || menuTemplates["Fast Food"];
  return items.map((item, index) => ({
    ...item,
    id: `${restaurantId}-${index}`,
    restaurantId,
  }));
};

// Order status types for tracking
export const orderStatuses = [
  { id: 1, name: "Order Placed", description: "Your order has been received", icon: "receipt" },
  { id: 2, name: "Preparing", description: "Restaurant is preparing your food", icon: "chef" },
  { id: 3, name: "Ready for Pickup", description: "Order is ready for dasher", icon: "package" },
  { id: 4, name: "Dasher Assigned", description: "A dasher has been assigned", icon: "bike" },
  { id: 5, name: "On the Way", description: "Your order is on the way", icon: "truck" },
  { id: 6, name: "Delivered", description: "Order delivered!", icon: "check" },
];

// Dasher mock data
export const mockDashers = [
  { id: 1, name: "Mike Johnson", rating: 4.9, deliveries: 1250, vehicle: "Car", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150" },
  { id: 2, name: "Sarah Williams", rating: 4.8, deliveries: 890, vehicle: "Bike", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
  { id: 3, name: "David Chen", rating: 4.95, deliveries: 2100, vehicle: "Car", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" },
];

// Available orders for dashers
export const mockDasherOrders = [
  { id: "ORD-001", restaurant: "Burger Palace", pickup: "123 Main St", dropoff: "456 Oak Ave", distance: "2.3 mi", payout: 8.50, items: 3, estimatedTime: "15 min" },
  { id: "ORD-002", restaurant: "Tony's Pizzeria", pickup: "789 Pizza Lane", dropoff: "321 Elm St", distance: "3.1 mi", payout: 12.25, items: 2, estimatedTime: "20 min" },
  { id: "ORD-003", restaurant: "Sakura Sushi", pickup: "555 Sushi Blvd", dropoff: "777 Park Dr", distance: "4.5 mi", payout: 15.00, items: 5, estimatedTime: "25 min" },
  { id: "ORD-004", restaurant: "Taco Fiesta", pickup: "222 Taco Way", dropoff: "888 River Rd", distance: "1.8 mi", payout: 7.25, items: 4, estimatedTime: "12 min" },
  { id: "ORD-005", restaurant: "Green Bowl", pickup: "999 Health St", dropoff: "111 Fitness Ave", distance: "2.9 mi", payout: 10.50, items: 2, estimatedTime: "18 min" },
];

export const promoImages = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
  "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800",
];