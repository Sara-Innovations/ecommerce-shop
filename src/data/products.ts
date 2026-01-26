import { Product, Category, Brand } from '@/types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    children: [
      { id: '1-1', name: 'Smartphones', slug: 'smartphones', parentId: '1' },
      { id: '1-2', name: 'Laptops', slug: 'laptops', parentId: '1' },
      { id: '1-3', name: 'Tablets', slug: 'tablets', parentId: '1' },
      { id: '1-4', name: 'Accessories', slug: 'accessories', parentId: '1' },
    ]
  },
  {
    id: '2',
    name: 'Fashion',
    slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    children: [
      { id: '2-1', name: "Men's Clothing", slug: 'mens-clothing', parentId: '2' },
      { id: '2-2', name: "Women's Clothing", slug: 'womens-clothing', parentId: '2' },
      { id: '2-3', name: 'Shoes', slug: 'shoes', parentId: '2' },
      { id: '2-4', name: 'Watches', slug: 'watches', parentId: '2' },
    ]
  },
  {
    id: '3',
    name: 'Home & Living',
    slug: 'home-living',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400',
    children: [
      { id: '3-1', name: 'Furniture', slug: 'furniture', parentId: '3' },
      { id: '3-2', name: 'Decor', slug: 'decor', parentId: '3' },
      { id: '3-3', name: 'Kitchen', slug: 'kitchen', parentId: '3' },
    ]
  },
  {
    id: '4',
    name: 'Beauty & Health',
    slug: 'beauty-health',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400',
    children: [
      { id: '4-1', name: 'Skincare', slug: 'skincare', parentId: '4' },
      { id: '4-2', name: 'Makeup', slug: 'makeup', parentId: '4' },
      { id: '4-3', name: 'Fragrances', slug: 'fragrances', parentId: '4' },
    ]
  },
  {
    id: '5',
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    image: 'https://images.unsplash.com/photo-1461896836934- voices-in-the-earth-01?w=400',
    children: [
      { id: '5-1', name: 'Fitness', slug: 'fitness', parentId: '5' },
      { id: '5-2', name: 'Outdoor Gear', slug: 'outdoor-gear', parentId: '5' },
    ]
  },
];

export const brands: Brand[] = [
  { id: '1', name: 'Apple', slug: 'apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { id: '2', name: 'Samsung', slug: 'samsung' },
  { id: '3', name: 'Nike', slug: 'nike' },
  { id: '4', name: 'Adidas', slug: 'adidas' },
  { id: '5', name: 'Sony', slug: 'sony' },
  { id: '6', name: 'LG', slug: 'lg' },
  { id: '7', name: 'Zara', slug: 'zara' },
  { id: '8', name: 'H&M', slug: 'hm' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    description: 'The most powerful iPhone ever with titanium design, A17 Pro chip, and advanced camera system.',
    price: 149999,
    originalPrice: 164999,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800',
    ],
    category: categories[0],
    brand: brands[0],
    tags: ['smartphone', 'apple', 'flagship'],
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    rating: 4.9,
    reviewCount: 2847,
    stock: 50,
    isNew: true,
    isFeatured: true,
    specifications: {
      'Display': '6.7" Super Retina XDR',
      'Chip': 'A17 Pro',
      'Storage': '256GB / 512GB / 1TB',
      'Camera': '48MP Main + 12MP Ultra Wide',
      'Battery': 'Up to 29 hours video playback'
    },
    returnPolicy: '15 days return policy with full refund',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    description: 'Experience the future with Galaxy AI, titanium frame, and 200MP camera.',
    price: 134999,
    originalPrice: 144999,
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800',
    ],
    category: categories[0],
    brand: brands[1],
    tags: ['smartphone', 'samsung', 'flagship'],
    colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
    rating: 4.8,
    reviewCount: 1923,
    stock: 35,
    isNew: true,
    isFeatured: true,
    specifications: {
      'Display': '6.8" Dynamic AMOLED 2X',
      'Chip': 'Snapdragon 8 Gen 3',
      'Storage': '256GB / 512GB / 1TB',
      'Camera': '200MP Main',
      'Battery': '5000mAh'
    },
    returnPolicy: '10 days return policy',
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    name: 'MacBook Pro 16" M3 Max',
    slug: 'macbook-pro-16-m3-max',
    description: 'Supercharged by M3 Max chip for unprecedented performance.',
    price: 349999,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800',
    ],
    category: categories[0],
    brand: brands[0],
    tags: ['laptop', 'apple', 'professional'],
    colors: ['Space Black', 'Silver'],
    rating: 4.9,
    reviewCount: 856,
    stock: 20,
    isFeatured: true,
    isBestSeller: true,
    specifications: {
      'Display': '16.2" Liquid Retina XDR',
      'Chip': 'Apple M3 Max',
      'Memory': '36GB / 48GB / 128GB',
      'Storage': '512GB / 1TB / 2TB / 4TB / 8TB',
      'Battery': 'Up to 22 hours'
    },
    returnPolicy: '14 days return policy',
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'Nike Air Jordan 1 Retro High',
    slug: 'nike-air-jordan-1-retro-high',
    description: 'The iconic sneaker that started it all. Premium leather construction.',
    price: 18999,
    originalPrice: 22999,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800',
    ],
    category: categories[1],
    brand: brands[2],
    tags: ['shoes', 'sneakers', 'jordan'],
    colors: ['Chicago', 'Bred', 'Royal Blue', 'Shadow'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    rating: 4.8,
    reviewCount: 3421,
    stock: 100,
    isBestSeller: true,
    specifications: {
      'Upper': 'Premium Leather',
      'Sole': 'Rubber',
      'Closure': 'Lace-up',
      'Style': 'High Top'
    },
    returnPolicy: '30 days return policy',
    createdAt: '2024-01-05'
  },
  {
    id: '5',
    name: 'Sony WH-1000XM5 Headphones',
    slug: 'sony-wh-1000xm5',
    description: 'Industry-leading noise cancellation with exceptional sound quality.',
    price: 34999,
    originalPrice: 39999,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800',
    ],
    category: categories[0],
    brand: brands[4],
    tags: ['headphones', 'wireless', 'noise-cancelling'],
    colors: ['Black', 'Silver', 'Midnight Blue'],
    rating: 4.7,
    reviewCount: 2156,
    stock: 75,
    isFeatured: true,
    specifications: {
      'Driver': '30mm',
      'Battery': 'Up to 30 hours',
      'Noise Cancellation': 'Active',
      'Connectivity': 'Bluetooth 5.2'
    },
    returnPolicy: '15 days return policy',
    createdAt: '2024-01-08'
  },
  {
    id: '6',
    name: 'Adidas Ultraboost 23',
    slug: 'adidas-ultraboost-23',
    description: 'Experience incredible energy return with every step.',
    price: 16999,
    images: [
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800',
      'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=800',
    ],
    category: categories[1],
    brand: brands[3],
    tags: ['shoes', 'running', 'boost'],
    colors: ['Core Black', 'Cloud White', 'Solar Red'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    rating: 4.6,
    reviewCount: 1876,
    stock: 60,
    isNew: true,
    specifications: {
      'Technology': 'BOOST midsole',
      'Upper': 'Primeknit+',
      'Outsole': 'Continental Rubber',
      'Drop': '10mm'
    },
    returnPolicy: '30 days return policy',
    createdAt: '2024-01-12'
  },
  {
    id: '7',
    name: 'Apple Watch Ultra 2',
    slug: 'apple-watch-ultra-2',
    description: 'The most rugged and capable Apple Watch ever.',
    price: 89999,
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800',
      'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800',
    ],
    category: categories[0],
    brand: brands[0],
    tags: ['smartwatch', 'apple', 'fitness'],
    colors: ['Natural Titanium'],
    rating: 4.9,
    reviewCount: 1234,
    stock: 30,
    isNew: true,
    isBestSeller: true,
    specifications: {
      'Case': '49mm Titanium',
      'Display': 'Always-On Retina LTPO OLED',
      'Water Resistance': '100m',
      'Battery': 'Up to 36 hours'
    },
    returnPolicy: '14 days return policy',
    createdAt: '2024-01-18'
  },
  {
    id: '8',
    name: 'Dyson V15 Detect',
    slug: 'dyson-v15-detect',
    description: 'Reveals hidden dust with a precisely angled laser.',
    price: 65999,
    originalPrice: 74999,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800',
      'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800',
    ],
    category: categories[2],
    brand: { id: '9', name: 'Dyson', slug: 'dyson' },
    tags: ['vacuum', 'cordless', 'home'],
    colors: ['Yellow/Nickel', 'Purple/Nickel'],
    rating: 4.7,
    reviewCount: 987,
    stock: 25,
    isFeatured: true,
    specifications: {
      'Run Time': 'Up to 60 minutes',
      'Bin Capacity': '0.76L',
      'Weight': '3.1kg',
      'Filtration': 'Whole-machine HEPA'
    },
    returnPolicy: '30 days return policy',
    createdAt: '2024-01-03'
  },
  {
    id: '9',
    name: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-tshirt',
    description: 'Ultra-soft 100% organic cotton t-shirt with a modern fit.',
    price: 2499,
    originalPrice: 3499,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
    ],
    category: categories[1],
    brand: brands[6],
    tags: ['clothing', 'tshirt', 'casual'],
    colors: ['White', 'Black', 'Navy', 'Gray', 'Olive'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 4.5,
    reviewCount: 4521,
    stock: 500,
    isBestSeller: true,
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'Regular',
      'Neckline': 'Crew Neck',
      'Care': 'Machine Washable'
    },
    returnPolicy: '30 days return policy',
    createdAt: '2024-01-01'
  },
  {
    id: '10',
    name: 'La Mer Moisturizing Cream',
    slug: 'la-mer-moisturizing-cream',
    description: 'The iconic cream that started a legacy of transformation.',
    price: 34999,
    images: [
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=800',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
    ],
    category: categories[3],
    brand: { id: '10', name: 'La Mer', slug: 'la-mer' },
    tags: ['skincare', 'moisturizer', 'luxury'],
    rating: 4.8,
    reviewCount: 2341,
    stock: 40,
    isFeatured: true,
    specifications: {
      'Size': '60ml',
      'Skin Type': 'All Skin Types',
      'Key Ingredient': 'Miracle Broth',
      'Application': 'Morning & Evening'
    },
    returnPolicy: '14 days return policy (unopened)',
    createdAt: '2024-01-07'
  },
  {
    id: '11',
    name: 'Samsung 65" OLED 4K TV',
    slug: 'samsung-65-oled-4k-tv',
    description: 'Experience true-to-life colors with self-lit OLED pixels.',
    price: 179999,
    originalPrice: 219999,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800',
      'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=800',
    ],
    category: categories[0],
    brand: brands[1],
    tags: ['tv', 'oled', '4k'],
    rating: 4.8,
    reviewCount: 1567,
    stock: 15,
    isBestSeller: true,
    specifications: {
      'Display': '65" OLED',
      'Resolution': '4K (3840 x 2160)',
      'Refresh Rate': '120Hz',
      'Smart TV': 'Tizen OS'
    },
    returnPolicy: '15 days return policy',
    createdAt: '2024-01-06'
  },
  {
    id: '12',
    name: 'Herman Miller Aeron Chair',
    slug: 'herman-miller-aeron-chair',
    description: 'The gold standard in ergonomic office seating.',
    price: 154999,
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800',
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800',
    ],
    category: categories[2],
    brand: { id: '11', name: 'Herman Miller', slug: 'herman-miller' },
    tags: ['furniture', 'office', 'ergonomic'],
    colors: ['Graphite', 'Mineral', 'Carbon'],
    sizes: ['Size A', 'Size B', 'Size C'],
    rating: 4.9,
    reviewCount: 892,
    stock: 10,
    isFeatured: true,
    specifications: {
      'Material': '8Z Pellicle',
      'Adjustment': 'Fully Adjustable',
      'Warranty': '12 Years',
      'Weight Capacity': '159kg'
    },
    returnPolicy: '30 days return policy',
    createdAt: '2024-01-04'
  },
];

export const featuredProducts = products.filter(p => p.isFeatured);
export const newArrivals = products.filter(p => p.isNew);
export const bestSellers = products.filter(p => p.isBestSeller);
export const onSaleProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price);

export const formatPrice = (price: number): string => {
  return `৳${price.toLocaleString('en-BD')}`;
};

export const getDiscountPercentage = (price: number, originalPrice: number): number => {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};
