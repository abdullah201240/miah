export interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

export interface Product {
  id: string;
  name: string;
  productCode?: string;
  sku?: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  category: string;
  subCategory?: string;
  image: string;
  images: string[];
  videos?: string[];
  description: string;
  applications?: string;
  warranty?: string;
  features?: string[];
  specifications?: { [key: string]: string };
  rating: number;
  reviews: number;
  reviewsList?: Review[];
  inStock: boolean;
  quantity?: number;
  featured: boolean;
  discount?: number;
  isNewArrival?: boolean;
  arrivalDate?: string;
  tags?: string[];
  colors?: string[];
  sizes?: string[];
  weight?: number; // in kg
  unitName?: string;
  pricePerUnit?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
}

export interface Category {
  id: string;
  name: string;
  count: number;
  image?: string;
  description?: string;
  subcategories?: Category[];
}

export const categories: Category[] = [
  { id: 'all', name: 'All Categories', count: 48 },
  { 
    id: 'man', 
    name: 'Man', 
    count: 27,
    image: '/product/Pants for men.jpg',
    description: 'Stylish clothing for man',
    subcategories: [
      { id: 'man-shirts', name: 'Shirts', count: 3, image: '/product/Amanat Shah Poplin-007.jpg' },
      { id: 'man-dress-shirts', name: 'Dress Shirts', count: 1, image: '/product/Amanat Shah Poplin-008.jpg' },
      { id: 'man-casual-shirts', name: 'Casual Shirts', count: 1, image: '/product/Amanat Shah Poplin-009.jpg' },
      { id: 'man-tshirts', name: 'T-Shirt', count: 7, image: '/product/Grey Cargo Joggers-001.jpg' },
      { id: 'man-dropcut-tshirts', name: 'Drop Cut T-shirts', count: 1, image: '/product/Grey Cargo Joggers-002.jpg' },
      { id: 'man-oversized-tshirts', name: 'Over Sized T-Shirts', count: 1, image: '/product/Grey Cargo Joggers-003.jpg' },
      { id: 'man-regular-tshirts', name: 'Regular T-Shirt', count: 1, image: '/product/Grey Cargo Joggers-004.jpg' },
      { id: 'man-pants', name: 'Pants', count: 7, image: '/product/Amanat Shah Poplin-010.jpg' },
      { id: 'man-joggers', name: 'Joggers', count: 1, image: '/product/Olive Cargo Joggers-001.jpg' },
      { id: 'man-chino-pants', name: 'Chino Pants', count: 1, image: '/product/Olive Cargo Joggers-002.jpg' },
      { id: 'man-cargo-joggers', name: 'Cargo Joggers', count: 1, image: '/product/Olive Cargo Joggers-003.jpg' },
      { id: 'man-jeans', name: 'Jeans', count: 1, image: '/product/Slim Fit Black Jeans.jpg' },
      { id: 'man-panjabi', name: 'Panjabi', count: 1, image: '/product/Amanat Shah Poplin-011.jpg' },
      { id: 'man-turquoise', name: 'Turquoise', count: 1, image: '/product/Amanat Shah Poplin-012.jpg' },
      { id: 'man-garnet', name: 'Garnet', count: 1, image: '/product/Amanat Shah Poplin-013.jpg' },
      { id: 'man-opal', name: 'Opal', count: 1, image: '/product/Amanat Shah Poplin-014.jpg' },
      { id: 'man-jasper', name: 'Jasper', count: 1, image: '/product/Amanat Shah Poplin-015.jpg' },
      { id: 'man-lungi', name: 'Lungi', count: 1, image: '/product/Black Color Solid Lungi - Bikkhato _ MIAH.jpg' },
      { id: 'man-print-batik', name: 'Print & Batik', count: 1, image: '/product/Mens Stylish Print & Batik Lungi - Modhumoti _ MIAH.jpg' },
      { id: 'man-solid', name: 'Solid', count: 1, image: '/product/Brown Color Solid Lungi - Bikkhato _ MIAH.jpg' },
      { id: 'man-stripe-check', name: 'Stripe & Check', count: 1, image: '/product/Amanat Shah Poplin-016.jpg' },
      { id: 'man-dobby-jacquard', name: 'Dobby & Jacquard', count: 1, image: '/product/Amanat Shah Poplin-017.jpg' },
      { id: 'man-hand-painted', name: 'Hand Painted', count: 1, image: '/product/Amanat Shah Poplin-018.jpg' },
      { id: 'man-block-print', name: 'Block Print', count: 1, image: '/product/Amanat Shah Poplin-019.jpg' }
    ]
  },
  { 
    id: 'women', 
    name: 'Women', 
    count: 20,
    image: '/product/Salwar kameez for women.jpg',
    description: 'Fashionable clothing for women',
    subcategories: [
      { id: 'women-salwar-kameez', name: 'Salwar Kameez', count: 1, image: '/product/Ashy Purple Digital Print Premium Cotton Salwar Kameez.jpg' },
      { id: 'women-print', name: 'Print', count: 1, image: '/product/Blue-Grey Digital Print Premium Cotton Salwar Kameez.jpg' },
      { id: 'women-embroidery', name: 'Embroidery', count: 1, image: '/product/Burnt Coral Digital Print Premium Cotton Salwar Kameez.jpg' },
      { id: 'women-hand-craft-tant', name: 'Hand Craft (Tant)', count: 1, image: '/product/Dark Red Digital Print Premium Cotton Salwar Kameez.jpg' },
      { id: 'women-saree', name: 'Saree', count: 1, image: '/product/Deep Olive Green Digital Print Premium Cotton Salwar Kameez.jpg' },
      { id: 'women-print-saree', name: 'Print Saree', count: 1, image: '/product/Deep Rosewood Digital Print Premium Cotton Salwar Kameez.jpg' },
      { id: 'women-tant-saree', name: 'Tant Saree', count: 1, image: '/product/Dusky Rose Digital Print Cotton Salwar Kameez.jpg' },
      { id: 'women-tangail-saree', name: 'Tangail Saree', count: 1, image: '/product/Jet Black Digital Print Premium Cotton Salwar Kameez.jpg' },
      { id: 'women-jamdani-saree', name: 'Jamdani Saree', count: 1, image: '/product/Light camel Premium Cotton Salwar Kameez Digital Print.jpg' },
      { id: 'women-others', name: 'Others', count: 1, image: '/product/Muted Blush Pink Digital Print Cotton Salwar Kameez.jpg' },
      { id: 'women-hand-paint-saree', name: 'Hand Paint Saree', count: 1, image: '/product/Neon Aqua Color Digital Print Premium Cotton Salwar Kameez.jpg' },
      { id: 'women-half-silk-saree', name: 'Half Silk Saree', count: 1, image: '/product/Rust Orange Digital Print Premium Cotton Salwar Kameez.jpg' },
      { id: 'women-jamdani-saree-2', name: 'Jamdani Saree', count: 1, image: '/product/Slate Blue Digital Print Cotton Salwar Kameez.jpg' },
      { id: 'women-abaya', name: 'Abaya', count: 1, image: '/product/Taupe color Premium Cotton Salwar Kameez Digital Print.jpg' },
      { id: 'women-modern', name: 'Modern', count: 1, image: '/product/Teal Blue Digital Print Premium Cotton Salwar Kameez.jpg' },
      { id: 'women-gorgeous', name: 'Gorgeous', count: 1, image: '/product/Turquoise Blue Digital Print Cotton Salwar Kameez.jpg' },
      { id: 'women-premium', name: 'Premium', count: 1, image: '/product/Warm Gray Premium Cotton Salwar Kameez Digital Print.jpg' },
      { id: 'women-luxury', name: 'Luxury', count: 1, image: '/product/Ashy Purple Digital Print Premium Cotton Salwar Kameez-001.jpg' },
      { id: 'women-tops', name: 'Tops', count: 1, image: '/product/Blue-Grey Digital Print Premium Cotton Salwar Kameez.jpg' },
      { id: 'women-kurti', name: 'Kurti', count: 1, image: '/product/Burnt Coral Digital Print Premium Cotton Salwar Kameez-001.jpg' }
    ]
  },
  { 
    id: 'kids', 
    name: 'Kids', 
    count: 10,
    image: '/Kids-Dress-thumbs-318X437.jpg',
    description: 'Fun and comfortable clothing for kids',
    subcategories: [
      { id: 'kids-tshirts', name: 'T-Shirts', count: 4, image: '/product/A image of jogger.jpg' },
      { id: 'kids-dresses', name: 'Dresses', count: 3, image: '/product/Casual Vibes_ Man in Yellow Joggers.jpg' },
      { id: 'kids-pants', name: 'Pants', count: 3, image: '/product/Effortless Comfort_ Man Wearing Yellow Joggers.jpg' }
    ]
  },
  { 
    id: 'accessories', 
    name: 'Accessories', 
    count: 6,
    image: '/48754461-fashion-accessories-on-white-background.jpg',
    description: 'Stylish accessories to complete your look',
    subcategories: [
      { id: 'accessories-bags', name: 'Bags', count: 3, image: '/product/Product Image-009.jpg' },
      { id: 'accessories-jewelry', name: 'Jewelry', count: 3, image: '/product/Product Image-010.jpg' }
    ]
  },
  { 
    id: 'footwear', 
    name: 'Footwear', 
    count: 8,
    image: '/pexels-craytive-1456731.jpg',
    description: 'Comfortable and stylish shoes',
    subcategories: [
      { id: 'footwear-sneakers', name: 'Sneakers', count: 4, image: '/product/Product Image-012.jpg' },
      { id: 'footwear-formal', name: 'Formal Shoes', count: 2, image: '/product/Product Image-013.jpg' },
      { id: 'footwear-sandals', name: 'Sandals', count: 2, image: '/product/Product Image-014.jpg' }
    ]
  },
  { 
    id: 'sale', 
    name: 'Sale', 
    count: 4,
    image: '/sale-price-tag-icon-sign-isolated-on-white-background-flat-design-illustration-free-vector.jpg',
    description: 'Special deals and discounts on fashion items',
    subcategories: [
      { id: 'sale-men', name: 'Man Sale', count: 2, image: '/product/Product Image-016.jpg' },
      { id: 'sale-women', name: 'Women Sale', count: 2, image: '/product/Product Image-017.jpg' }
    ]
  }
];

// Hero slider images
export const heroSlides = [
  {
    id: 1,
    title: "Premium Fashion Collection",
    subtitle: "Discover our exclusive range of premium clothing",
    video: "/miah_desktop_280425.mp4",
    cta: "Shop Now",
    category: "featured"
  },
  {
    id: 2,
    title: "Summer Essentials",
    subtitle: "Refresh your wardrobe with our latest summer collection",
    image: "/stock-photo-happy-byer-with-shopping-bags-standing-in-showroom-banner-1927526819.jpg",
    cta: "Explore Collection",
    category: "summer"
  },
];

export const products: Product[] = [
  // Man's Clothing
  {
    id: '1',
    name: 'Classic Cotton T-Shirt',
    price: 24.99,
    originalPrice: 29.99,
    category: 'man',
    subCategory: 'man-tshirts',
    image: '/product/Grey Cargo Joggers.jpg',
    images: [
      '/product/Grey Cargo Joggers.jpg',
      '/product/Olive Cargo Joggers.jpg',
      '/product/Amanat Shah Poplin-001.jpg'
    ],
    description: 'Premium quality cotton t-shirt with a comfortable fit. Perfect for casual wear.',
    features: [
      '100% Cotton',
      'Soft and breathable fabric',
      'Available in multiple colors',
      'Machine washable',
      'Slim fit'
    ],
    specifications: {
      'Material': '100% Cotton',
      'Fit': 'Slim',
      'Care Instructions': 'Machine wash cold',
      'Origin': 'Made in USA'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    tags: ['casual', 'comfortable', 'everyday'],
    rating: 4.5,
    reviews: 124,
    reviewsList: [
      {
        id: 'r1',
        user: { name: 'Michael Johnson', verified: true },
        rating: 5,
        title: 'Perfect fit and quality!',
        comment: 'This t-shirt exceeded my expectations. The fabric is soft and the fit is perfect. I\'ve already ordered two more in different colors.',
        date: '2024-01-15',
        helpful: 23,
        images: ['/product/Grey Cargo Joggers.jpg']
      },
      {
        id: 'r2',
        user: { name: 'David Chen' },
        rating: 4,
        title: 'Great value for money',
        comment: 'Really happy with this purchase. The t-shirt looks exactly like the pictures and fits perfectly.',
        date: '2024-01-10',
        helpful: 18
      },
      {
        id: 'r3',
        user: { name: 'James Davis', verified: true },
        rating: 5,
        title: 'Comfortable for daily wear',
        comment: 'Love the soft fabric and comfortable fit. Perfect for work or casual outings.',
        date: '2024-01-08',
        helpful: 15
      }
    ],
    inStock: true,
    featured: true,
    discount: 17
  },
  {
    id: '2',
    name: 'Designer Polo Shirt',
    price: 39.99,
    originalPrice: 49.99,
    category: 'man',
    subCategory: 'man-shirts',
    image: '/product/Amanat Shah Poplin-002.jpg',
    images: [
      '/product/Amanat Shah Poplin-002.jpg'
    ],
    description: 'Stylish polo shirt with a modern fit. Perfect for semi-formal occasions.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'White', 'Black', 'Red'],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    featured: true,
    discount: 20
  },
  {
    id: '3',
    name: 'Slim Fit Chinos',
    price: 49.99,
    category: 'man',
    subCategory: 'man-pants',
    image: '/product/Amanat Shah Poplin-003.jpg',
    images: [
      '/product/Amanat Shah Poplin-003.jpg'
    ],
    description: 'Slim fit chinos with stretch fabric for comfort and style.',
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Khaki', 'Navy', 'Black', 'Olive'],
    rating: 4.3,
    reviews: 67,
    inStock: true,
    featured: false
  },

  // Women's Clothing
  {
    id: '4',
    name: 'Floral Print Summer Dress',
    price: 45.99,
    originalPrice: 59.99,
    category: 'women',
    subCategory: 'women-saree',
    image: '/product/Salwar kameez for women.jpg',
    images: [
      '/product/Salwar kameez for women.jpg',
      '/product/Salwar kameez for women.jpg',
      '/product/Heather Gray Premium Cotton Salwar Kameez Digital Print.jpg'
    ],
    description: 'Beautiful floral print summer dress with a flattering fit. Perfect for casual outings and summer events.',
    features: [
      'Lightweight fabric',
      'Floral print design',
      'Adjustable straps',
      'Machine washable',
      'Above knee length'
    ],
    specifications: {
      'Material': 'Polyester',
      'Length': 'Above knee',
      'Neckline': 'V-neck',
      'Sleeve Length': 'Sleeveless',
      'Care Instructions': 'Machine wash cold'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Multicolor', 'Blue Floral', 'Pink Floral'],
    tags: ['summer', 'floral', 'casual', 'elegant'],
    rating: 4.6,
    reviews: 203,
    reviewsList: [
      {
        id: 'r4',
        user: { name: 'Sarah Wilson', verified: true },
        rating: 5,
        title: 'Perfect summer dress!',
        comment: 'This dress is absolutely beautiful! The fabric is lightweight and perfect for summer. I received so many compliments when I wore it.',
        date: '2024-01-12',
        helpful: 31
      },
      {
        id: 'r5',
        user: { name: 'Emma Brown' },
        rating: 4,
        title: 'Great fit and quality',
        comment: 'The dress fits perfectly and the fabric feels high quality. The floral print is vibrant and beautiful.',
        date: '2024-01-09',
        helpful: 22
      }
    ],
    inStock: true,
    featured: true,
    discount: 23
  },
  {
    id: '5',
    name: 'Casual Crop Top',
    price: 22.99,
    category: 'women',
    subCategory: 'women-tops',
    image: '/product/Heather Gray Premium Cotton Salwar Kameez Digital Print-001.jpg',
    images: [
      '/product/Heather Gray Premium Cotton Salwar Kameez Digital Print-001.jpg'
    ],
    description: 'Stylish crop top perfect for pairing with high-waisted pants or skirts.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black', 'White', 'Red', 'Navy'],
    rating: 4.4,
    reviews: 156,
    inStock: true,
    featured: false
  },
  {
    id: '6',
    name: 'High-Waisted Jeans',
    price: 59.99,
    originalPrice: 79.99,
    category: 'women',
    subCategory: 'women-salwar-kameez',
    image: '/product/Heather Gray Premium Cotton Salwar Kameez Digital Print.jpg',
    images: [
      '/product/Heather Gray Premium Cotton Salwar Kameez Digital Print.jpg'
    ],
    description: 'Trendy high-waisted jeans with a comfortable stretch fit.',
    sizes: ['24', '25', '26', '27', '28', '29', '30', '31', '32'],
    colors: ['Blue', 'Black', 'Light Blue'],
    rating: 4.8,
    reviews: 98,
    inStock: true,
    featured: true,
    discount: 25
  },

  // Kids Clothing
  {
    id: '7',
    name: 'Kids Graphic T-Shirt',
    price: 19.99,
    originalPrice: 24.99,
    category: 'kids',
    subCategory: 'kids-tshirts',
    image: '/product/A image of jogger.jpg',
    images: [
      '/product/A image of jogger.jpg'
    ],
    description: 'Fun graphic t-shirt for kids with soft cotton fabric.',
    sizes: ['2T', '3T', '4T', '5T', '6'],
    colors: ['Blue', 'Pink', 'Green', 'Yellow'],
    rating: 4.2,
    reviews: 87,
    inStock: true,
    featured: false,
    discount: 20
  },
  {
    id: '8',
    name: 'Kids Party Dress',
    price: 34.99,
    category: 'kids',
    subCategory: 'kids-dresses',
    image: '/product/Casual Vibes_ Man in Yellow Joggers.jpg',
    images: [
      '/product/Casual Vibes_ Man in Yellow Joggers.jpg'
    ],
    description: 'Beautiful party dress for special occasions.',
    sizes: ['2T', '3T', '4T', '5T', '6'],
    colors: ['Pink', 'Blue', 'Red', 'Purple'],
    rating: 4.7,
    reviews: 145,
    inStock: true,
    featured: true
  },
  {
    id: '9',
    name: 'Kids Jogger Pants',
    price: 24.99,
    originalPrice: 29.99,
    category: 'kids',
    subCategory: 'kids-pants',
    image: '/product/Effortless Comfort_ Man Wearing Yellow Joggers.jpg',
    images: [
      '/product/Effortless Comfort_ Man Wearing Yellow Joggers.jpg'
    ],
    description: 'Comfortable jogger pants for kids with elastic waistband.',
    sizes: ['2T', '3T', '4T', '5T', '6'],
    colors: ['Gray', 'Black', 'Navy', 'Olive'],
    rating: 4.3,
    reviews: 178,
    inStock: true,
    featured: false,
    discount: 17
  },

  // Accessories
  {
    id: '10',
    name: 'Leather Crossbody Bag',
    price: 79.99,
    originalPrice: 99.99,
    category: 'accessories',
    subCategory: 'accessories-bags',
    image: '/product/Product Image-001.jpg',
    images: [
      '/product/Product Image-001.jpg'
    ],
    description: 'Stylish leather crossbody bag perfect for everyday use.',
    features: [
      'Genuine leather',
      'Adjustable strap',
      'Multiple compartments',
      'Durable construction',
      'Metal hardware'
    ],
    specifications: {
      'Material': 'Genuine Leather',
      'Dimensions': '9" x 6" x 2"',
      'Strap Drop': '22"',
      'Closure': 'Zipper',
      'Hardware': 'Gold-tone'
    },
    colors: ['Black', 'Brown', 'Tan'],
    rating: 4.6,
    reviews: 234,
    inStock: true,
    featured: true,
    discount: 20
  },
  {
    id: '11',
    name: 'Statement Necklace Set',
    price: 29.99,
    originalPrice: 39.99,
    category: 'accessories',
    subCategory: 'accessories-jewelry',
    image: '/product/Product Image-002.jpg',
    images: [
      '/product/Product Image-002.jpg'
    ],
    description: 'Elegant statement necklace set with modern design.',
    features: [
      'Hypoallergenic materials',
      'Nickel-free',
      'Adjustable length',
      'Trendy design',
      'Lightweight'
    ],
    specifications: {
      'Material': 'Brass, Crystal',
      'Chain Length': '16"-18"',
      'Pendant Size': '1.5"',
      'Clasp Type': 'Lobster Clasp',
      'Care Instructions': 'Avoid water and chemicals'
    },
    colors: ['Gold', 'Silver', 'Rose Gold'],
    rating: 4.4,
    reviews: 123,
    inStock: true,
    featured: false,
    discount: 25
  },

  // Footwear
  {
    id: '12',
    name: 'Running Sneakers',
    price: 89.99,
    originalPrice: 119.99,
    category: 'footwear',
    subCategory: 'footwear-sneakers',
    image: '/product/Product Image-003.jpg',
    images: [
      '/product/Product Image-003.jpg'
    ],
    description: 'Comfortable running sneakers with advanced cushioning technology.',
    features: [
      'Breathable mesh upper',
      'Cushioned insole',
      'Non-slip sole',
      'Lightweight design',
      'Shock absorption'
    ],
    specifications: {
      'Upper Material': 'Mesh',
      'Sole Material': 'Rubber',
      'Closure': 'Lace-up',
      'Insole': 'Memory foam',
      'Weight': '10 oz (per shoe)'
    },
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Blue', 'Red'],
    rating: 4.7,
    reviews: 456,
    inStock: true,
    featured: true,
    discount: 25
  },
  {
    id: '13',
    name: 'Formal Oxford Shoes',
    price: 129.99,
    category: 'footwear',
    subCategory: 'footwear-formal',
    image: '/product/Product Image-004.jpg',
    images: [
      '/product/Product Image-004.jpg'
    ],
    description: 'Elegant formal oxford shoes crafted from premium leather.',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'Brown', 'Tan'],
    rating: 4.5,
    reviews: 167,
    inStock: true,
    featured: false
  },
  {
    id: '14',
    name: 'Summer Sandals',
    price: 39.99,
    originalPrice: 49.99,
    category: 'footwear',
    subCategory: 'footwear-sandals',
    image: '/product/Product Image-005.jpg',
    images: [
      '/product/Product Image-005.jpg'
    ],
    description: 'Comfortable summer sandals with adjustable straps.',
    sizes: ['5', '6', '7', '8', '9', '10', '11'],
    colors: ['Black', 'Brown', 'White', 'Tan'],
    rating: 4.3,
    reviews: 234,
    inStock: true,
    featured: false,
    discount: 20
  },

  // NEW ARRIVALS
  {
    id: '15',
    name: 'Oversized Hoodie',
    price: 49.99,
    originalPrice: 59.99,
    category: 'man',
    subCategory: 'man-tshirts',
    image: '/product/Amanat Shah Poplin-004.jpg',
    images: [
      '/product/Amanat Shah Poplin-004.jpg',
      '/product/Grey Cargo Joggers.jpg'
    ],
    description: 'Cozy oversized hoodie with kangaroo pocket. Perfect for lounging or casual outings.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'Burgundy'],
    rating: 4.8,
    reviews: 45,
    inStock: true,
    featured: true,
    discount: 17,
    isNewArrival: true,
    arrivalDate: '2024-01-15'
  },
  {
    id: '16',
    name: 'Denim Jacket',
    price: 79.99,
    category: 'women',
    subCategory: 'women-tops',
    image: '/product/Heather Gray Premium Cotton Salwar Kameez Digital Print.jpg',
    images: [
      '/product/Heather Gray Premium Cotton Salwar Kameez Digital Print.jpg'
    ],
    description: 'Classic denim jacket with button closure and chest pockets.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Black', 'Light Wash'],
    rating: 4.6,
    reviews: 23,
    inStock: true,
    featured: false,
    isNewArrival: true,
    arrivalDate: '2024-01-12'
  },
  {
    id: '17',
    name: 'Kids Denim Set',
    price: 39.99,
    originalPrice: 49.99,
    category: 'kids',
    subCategory: 'kids-pants',
    image: '/product/Stylish Yellow Joggers Outfit for Men.jpg',
    images: [
      '/product/Stylish Yellow Joggers Outfit for Men.jpg'
    ],
    description: 'Stylish denim set for kids with comfortable fit and durable fabric.',
    sizes: ['2T', '3T', '4T', '5T', '6'],
    colors: ['Blue', 'Black'],
    rating: 4.4,
    reviews: 32,
    inStock: true,
    featured: false,
    isNewArrival: true,
    arrivalDate: '2024-01-10'
  },
  {
    id: '18',
    name: 'Leather Handbag',
    price: 129.99,
    originalPrice: 159.99,
    category: 'accessories',
    subCategory: 'accessories-bags',
    image: '/product/Product Image-006.jpg',
    images: [
      '/product/Product Image-006.jpg'
    ],
    description: 'Premium leather handbag with multiple compartments and elegant design.',
    colors: ['Black', 'Brown', 'Tan'],
    rating: 4.7,
    reviews: 18,
    inStock: true,
    featured: true,
    discount: 19,
    isNewArrival: true,
    arrivalDate: '2024-01-08'
  },
  {
    id: '19',
    name: 'Running Shoes',
    price: 99.99,
    originalPrice: 129.99,
    category: 'footwear',
    subCategory: 'footwear-sneakers',
    image: '/product/Product Image-007.jpg',
    images: [
      '/product/Product Image-007.jpg'
    ],
    description: 'High-performance running shoes with advanced cushioning and breathability.',
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Black', 'White', 'Blue', 'Pink'],
    rating: 4.9,
    reviews: 27,
    inStock: true,
    featured: false,
    discount: 23,
    isNewArrival: true,
    arrivalDate: '2024-01-05'
  },
  {
    id: '20',
    name: 'Silk Scarf Set',
    price: 39.99,
    category: 'accessories',
    subCategory: 'accessories-bags',
    image: '/product/Amanat Shah Poplin-005.jpg',
    images: [
      '/product/Amanat Shah Poplin-005.jpg'
    ],
    description: 'Luxurious silk scarf set with vibrant patterns and smooth texture.',
    colors: ['Multicolor', 'Blue', 'Red', 'Green'],
    rating: 4.5,
    reviews: 41,
    inStock: true,
    featured: true,
    isNewArrival: true,
    arrivalDate: '2024-01-03'
  },
  {
    id: '21',
    name: 'Wool Coat',
    price: 149.99,
    originalPrice: 199.99,
    category: 'women',
    subCategory: 'women-tops',
    image: '/product/Warm Gray Premium Cotton Salwar Kameez Digital Print.jpg',
    images: [
      '/product/Warm Gray Premium Cotton Salwar Kameez Digital Print.jpg'
    ],
    description: 'Elegant wool coat with classic design and superior warmth for winter.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Gray', 'Camel', 'Navy'],
    rating: 4.8,
    reviews: 56,
    inStock: true,
    featured: true,
    discount: 25,
    isNewArrival: true,
    arrivalDate: '2024-01-01'
  },
  {
    id: '22',
    name: 'Cargo Pants',
    price: 49.99,
    category: 'man',
    subCategory: 'man-pants',
    image: '/product/Amanat Shah Poplin-006.jpg',
    images: [
      '/product/Amanat Shah Poplin-006.jpg'
    ],
    description: 'Stylish cargo pants with multiple pockets and comfortable fit.',
    sizes: ['30', '32', '34', '36', '38', '40'],
    colors: ['Khaki', 'Black', 'Olive', 'Gray'],
    rating: 4.3,
    reviews: 34,
    inStock: true,
    featured: false,
    isNewArrival: true,
    arrivalDate: '2023-12-28'
  }
];

export const featuredProducts = products.filter(product => product.featured);
export const discountedProducts = products.filter(product => product.discount);
export const newArrivalProducts = products
  .filter(product => product.isNewArrival)
  .sort((a, b) => {
    const dateA = new Date(a.arrivalDate || '').getTime();
    const dateB = new Date(b.arrivalDate || '').getTime();
    return dateB - dateA; // Sort by newest first
  });