// Generate unique IDs
const generateId = (prefix, index) => `${prefix}_${index.toString().padStart(3, '0')}`;

// Product categories
const categories = ['sofas', 'chairs', 'tables', 'lighting', 'decor'];

// Helper function to create product images
const chairImages = [
  'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
];

const sofaImages = [
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80',
];

const tableImages = [
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
];

const lightingImages = [
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
];

const decorImages = [
  'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=800&q=80',
];

const createProductImages = (category, id, count = 2) => {
  const images = [];
  let imgArr = null;
  if (category === 'chairs') imgArr = chairImages;
  if (category === 'sofas') imgArr = sofaImages;
  if (category === 'tables') imgArr = tableImages;
  if (category === 'lighting') imgArr = lightingImages;
  if (category === 'decor') imgArr = decorImages;
  if (imgArr) {
    for (let i = 0; i < count; i++) {
      images.push(imgArr[(parseInt(id.replace(/\D/g, '')) + i) % imgArr.length]);
    }
  } else {
    for (let i = 1; i <= count; i++) {
      const seed = parseInt(id.replace(/\D/g, '')) + i;
      images.push(`https://picsum.photos/seed/${category}${seed}/800/600`);
    }
  }
  return images;
};

// Materials by category
const materialsByCategory = {
  sofas: ['Linen', 'Cotton', 'Velvet', 'Leather', 'Microfiber'],
  chairs: ['Oak', 'Walnut', 'Beech', 'Metal', 'Plastic', 'Upholstered'],
  tables: ['Oak', 'Walnut', 'Marble', 'Glass', 'Metal'],
  lighting: ['Metal', 'Glass', 'Ceramic', 'Wood', 'Fabric'],
  decor: ['Ceramic', 'Glass', 'Wood', 'Metal', 'Cotton', 'Paper']
};

// Colors by category
const colorsByCategory = {
  sofas: ['Gray', 'Navy Blue', 'Cream', 'Brown', 'Green', 'Black'],
  chairs: ['Natural Wood', 'Black', 'White', 'Gray', 'Blue', 'Green'],
  tables: ['Natural Wood', 'White', 'Black', 'Gray', 'Brown'],
  lighting: ['Black', 'White', 'Brass', 'Chrome', 'Bronze'],
  decor: ['White', 'Black', 'Natural', 'Blue', 'Green', 'Multi-color']
};

// Dimensions by category (in inches)
const dimensionsByCategory = {
  sofas: [
    { width: 84, depth: 38, height: 33 },
    { width: 76, depth: 36, height: 33 },
    { width: 90, depth: 40, height: 35 },
    { width: 70, depth: 35, height: 32 },
    { width: 92, depth: 42, height: 36 }
  ],
  chairs: [
    { width: 28, depth: 30, height: 32 },
    { width: 24, depth: 26, height: 30 },
    { width: 30, depth: 32, height: 34 },
    { width: 26, depth: 29, height: 31 },
    { width: 32, depth: 33, height: 36 }
  ],
  tables: [
    { width: 60, depth: 36, height: 30 },
    { width: 48, depth: 48, height: 30 },
    { width: 72, depth: 42, height: 30 },
    { width: 36, depth: 36, height: 18 },
    { width: 54, depth: 54, height: 30 }
  ],
  lighting: [
    { width: 12, depth: 12, height: 24 },
    { width: 16, depth: 16, height: 20 },
    { width: 24, depth: 24, height: 52 },
    { width: 18, depth: 18, height: 18 },
    { diameter: 24, height: 12 }
  ],
  decor: [
    { width: 12, depth: 6, height: 15 },
    { width: 10, depth: 10, height: 10 },
    { width: 18, depth: 3, height: 24 },
    { diameter: 14, height: 6 },
    { width: 20, depth: 2, height: 30 }
  ]
};

// Product name templates by category
const productNameTemplates = {
  sofas: [
    'The {material} {color} Sofa',
    '{color} {material} Sectional',
    'Modern {color} Loveseat',
    'Classic {material} Couch',
    'Contemporary {color} Sofa'
  ],
  chairs: [
    '{color} {material} Dining Chair',
    'Modern {material} Armchair',
    '{color} Accent Chair',
    'Classic {material} Lounge Chair',
    '{color} {material} Office Chair'
  ],
  tables: [
    '{material} Dining Table',
    '{color} Coffee Table',
    '{material} Side Table',
    'Modern {color} Console Table',
    '{material} {color} Desk'
  ],
  lighting: [
    '{color} Table Lamp',
    'Modern {material} Floor Lamp',
    '{color} Pendant Light',
    '{material} Chandelier',
    '{color} {material} Sconce'
  ],
  decor: [
    '{material} Vase',
    '{color} Throw Pillow',
    'Framed {color} Artwork',
    '{material} Decorative Bowl',
    '{color} {material} Wall Decor'
  ]
};

// Description templates by category
const descriptionTemplates = {
  sofas: [
    'Elevate your living space with this luxurious {material} sofa in a stunning {color} shade. Featuring plush cushions and a sturdy frame, this piece offers both style and comfort for your home.',
    'This elegant {color} {material} sofa combines timeless design with modern comfort. Perfect for cozy evenings and entertaining guests, it will be the centerpiece of your living room for years to come.',
    'Crafted with premium {material} upholstery in a sophisticated {color} tone, this sofa brings refined elegance to any space. The clean lines and comfortable seating make it perfect for contemporary interiors.'
  ],
  chairs: [
    'This beautifully crafted {material} chair in {color} adds character and comfort to any room. The ergonomic design ensures hours of comfortable seating while the quality construction guarantees longevity.',
    'Combining style and function, this {color} {material} chair features a thoughtful design that complements both modern and traditional interiors. The premium materials ensure durability and lasting beauty.',
    'Add a touch of sophistication with this {material} chair in a rich {color} finish. The carefully considered proportions and attention to detail make this piece both a stunning accent and a comfortable seat.'
  ],
  tables: [
    'This exquisite {material} table in {color} brings elegance and functionality to your space. The sturdy construction and timeless design make it a versatile addition to any home.',
    'Crafted from premium {material} with a beautiful {color} finish, this table combines form and function in perfect harmony. The thoughtful proportions make it ideal for everyday use and special occasions.',
    'Make a statement with this stunning {color} {material} table. The exceptional craftsmanship and attention to detail create a piece that will be treasured for generations.'
  ],
  lighting: [
    'Illuminate your space with this stunning {material} light fixture in {color}. The thoughtful design casts a warm, inviting glow while serving as a stylish accent piece.',
    'This {color} {material} lamp combines artistic design with practical lighting. The quality construction ensures even light distribution and long-lasting performance.',
    'Add ambient lighting and style with this designer {material} fixture in a sophisticated {color} finish. The carefully considered form creates beautiful light patterns that transform your space.'
  ],
  decor: [
    'Enhance your home with this beautiful {material} decor piece in {color}. The thoughtful design adds visual interest and personality to any room.',
    'This {color} {material} accent piece brings texture and dimension to your space. The quality craftsmanship ensures it remains a treasured part of your decor for years to come.',
    'Add a finishing touch to your space with this elegant {material} accent in a rich {color} tone. The timeless design complements a variety of interior styles.'
  ]
};

// Generate products for each category
const generateProductsForCategory = (category, count = 20) => {
  const products = [];
  
  for (let i = 1; i <= count; i++) {
    const id = generateId(category, i);
    const materials = materialsByCategory[category];
    const colors = colorsByCategory[category];
    const dimensions = dimensionsByCategory[category][i % dimensionsByCategory[category].length];
    const nameTemplates = productNameTemplates[category];
    const descTemplates = descriptionTemplates[category];
    
    // Randomly select material and color
    const material = materials[Math.floor(Math.random() * materials.length)];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Generate product name
    const nameTemplate = nameTemplates[i % nameTemplates.length];
    const name = nameTemplate.replace('{material}', material).replace('{color}', color);
    
    // Generate description
    const descTemplate = descTemplates[i % descTemplates.length];
    const description = descTemplate.replace(/{material}/g, material.toLowerCase()).replace(/{color}/g, color.toLowerCase());
    
    // Generate price (different ranges for different categories)
    let priceRange;
    switch (category) {
      case 'sofas':
        priceRange = { min: 699, max: 2499 };
        break;
      case 'chairs':
        priceRange = { min: 199, max: 999 };
        break;
      case 'tables':
        priceRange = { min: 299, max: 1499 };
        break;
      case 'lighting':
        priceRange = { min: 89, max: 599 };
        break;
      case 'decor':
        priceRange = { min: 29, max: 299 };
        break;
      default:
        priceRange = { min: 99, max: 999 };
    }
    
    const price = Math.floor(priceRange.min + Math.random() * (priceRange.max - priceRange.min));
    
    // Round price to end with .99
    const formattedPrice = Math.floor(price) + 0.99;
    
    // Generate rating between 3.5 and 5
    const rating = (3.5 + Math.random() * 1.5).toFixed(1);
    
    // Generate random review count between 5 and 120
    const reviewCount = Math.floor(5 + Math.random() * 115);
    
    // Generate random stock between 0 and 30
    const inStock = Math.floor(Math.random() * 31);
    
    products.push({
      id,
      name,
      category,
      price: formattedPrice,
      images: createProductImages(category, id),
      description,
      rating: parseFloat(rating),
      reviewCount,
      inStock,
      dimensions,
      materials: [material],
      colors: [color],
      featured: i <= 3  // Mark the first 3 items as featured
    });
  }
  
  return products;
};

// Generate all products
let allProducts = [];
categories.forEach(category => {
  const categoryProducts = generateProductsForCategory(category);
  allProducts = [...allProducts, ...categoryProducts];
});

// Export product data
export const products = allProducts;

// Export products by category for easy access
export const getProductsByCategory = (category) => {
  return products.filter(product => product.category === category);
};

// Get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

// Get featured products
export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

// Get similar products (same category, excluding the current product)
export const getSimilarProducts = (productId, limit = 4) => {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];
  
  return products
    .filter(product => 
      product.category === currentProduct.category && 
      product.id !== currentProduct.id
    )
    .sort(() => 0.5 - Math.random()) // Random sort
    .slice(0, limit);
};

// Get new arrivals (just uses last 8 products from each category)
export const getNewArrivals = (limit = 8) => {
  return products
    .slice(-40) // Last 40 products
    .sort(() => 0.5 - Math.random()) // Random sort
    .slice(0, limit);
};

// Search products
export const searchProducts = (query) => {
  const searchTerms = query.toLowerCase().split(' ');
  
  return products.filter(product => {
    const searchText = `${product.name} ${product.description} ${product.category} ${product.materials.join(' ')} ${product.colors.join(' ')}`.toLowerCase();
    
    return searchTerms.some(term => searchText.includes(term));
  });
};

export default products;