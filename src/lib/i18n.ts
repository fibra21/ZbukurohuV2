export const locales = {
  'sq-AL': {
    name: 'Shqip',
    flag: '🇦🇱'
  },
  'en': {
    name: 'English',
    flag: '🇺🇸'
  }
} as const;

export type LocaleCode = keyof typeof locales;

export const translations = {
  'sq-AL': {
    // Navigation
    home: 'Kryesore',
    find: 'Gjej',
    categories: 'Kategoritë',
    brands: 'Markat',
    sellers: 'Shitësit',
    cart: 'Shporta',
    account: 'Llogaria',
    
    // Search
    searchPlaceholder: 'Kërko produkte, marka...',
    searchResults: 'Rezultatet e kërkimit',
    noResults: 'Nuk u gjetën rezultate',
    
    // Product
    addToCart: 'Shto në shportë',
    addToWishlist: 'Shto në listën e dëshirave',
    removeFromWishlist: 'Hiq nga lista e dëshirave',
    outOfStock: 'Jashtë stokut',
    inStock: 'Në stok',
    new: 'I ri',
    bestseller: 'Më i shituri',
    rating: 'Vlerësimi',
    reviews: 'Vlerësime',
    ingredients: 'Përbërësit',
    howToUse: 'Si të përdoret',
    skinConcerns: 'Shqetësimet e lëkurës',
    skinTypes: 'Llojet e lëkurës',
    similarProducts: 'Produkte të ngjashme',
    completeRoutine: 'Përfundo rutinën',
    
    // Filters
    filters: 'Filtrat',
    brand: 'Marka',
    price: 'Çmimi',
    skinType: 'Lloji i lëkurës',
    concern: 'Shqetësimi',
    shade: 'Ngjyra',
    ratingAlt: 'Vlerësimi',
    inStock: 'Në stok',
    clearFilters: 'Pastro filtrat',
    sortBy: 'Rendit sipas',
    relevance: 'Relevanca',
    newest: 'Më i ri',
    priceLowToHigh: 'Çmimi: nga i ulët te i lartë',
    priceHighToLow: 'Çmimi: nga i lartë te i ulët',
    rating: 'Vlerësimi',
    bestsellers: 'Më të shiturit',
    
    // Cart & Checkout
    cart: 'Shporta',
    cartEmpty: 'Shporta juaj është bosh',
    continueShopping: 'Vazhdo blerjen',
    subtotal: 'Nëntotali',
    shipping: 'Transporti',
    total: 'Totali',
    checkout: 'Përfundo blerjen',
    orderConfirmation: 'Konfirmimi i porosisë',
    thankYou: 'Faleminderit për porosinë tuaj!',
    
    // Badges
    officialDistributor: 'Distributues i Autorizuar',
    dermatologistTested: 'Testuar nga Dermatologu',
    vegan: 'Vegan',
    crueltyFree: 'Pa Testime në Kafshë',
    fragranceFree: 'Pa Aroma',
    
    // Face Navigation
    eyes: 'Sytë',
    brows: 'Vetullat',
    lips: 'Buzët',
    cheeks: 'Faqet',
    skin: 'Lëkura',
    
    // Common
    loading: 'Duke ngarkuar...',
    error: 'Gabim',
    retry: 'Provo përsëri',
    close: 'Mbyll',
    save: 'Ruaj',
    cancel: 'Anulo',
    edit: 'Redakto',
    delete: 'Fshi',
    view: 'Shiko',
    more: 'Më shumë',
    less: 'Më pak',
  },
  'en': {
    // Navigation
    home: 'Home',
    find: 'Find',
    categories: 'Categories',
    brands: 'Brands',
    sellers: 'Sellers',
    cart: 'Cart',
    account: 'Account',
    
    // Search
    searchPlaceholder: 'Search products, brands...',
    searchResults: 'Search Results',
    noResults: 'No results found',
    
    // Product
    addToCart: 'Add to Cart',
    addToWishlist: 'Add to Wishlist',
    removeFromWishlist: 'Remove from Wishlist',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    new: 'New',
    bestseller: 'Bestseller',
    rating: 'Rating',
    reviews: 'Reviews',
    ingredients: 'Ingredients',
    howToUse: 'How to Use',
    skinConcerns: 'Skin Concerns',
    skinTypes: 'Skin Types',
    similarProducts: 'Similar Products',
    completeRoutine: 'Complete the Routine',
    
    // Filters
    filters: 'Filters',
    brand: 'Brand',
    price: 'Price',
    skinType: 'Skin Type',
    concern: 'Concern',
    shade: 'Shade',
    rating: 'Rating',
    inStock: 'In Stock',
    clearFilters: 'Clear Filters',
    sortBy: 'Sort by',
    relevance: 'Relevance',
    newest: 'Newest',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    rating: 'Rating',
    bestsellers: 'Bestsellers',
    
    // Cart & Checkout
    cart: 'Cart',
    cartEmpty: 'Your cart is empty',
    continueShopping: 'Continue Shopping',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    checkout: 'Checkout',
    orderConfirmation: 'Order Confirmation',
    thankYou: 'Thank you for your order!',
    
    // Badges
    officialDistributor: 'Official Distributor',
    dermatologistTested: 'Dermatologist Tested',
    vegan: 'Vegan',
    crueltyFree: 'Cruelty Free',
    fragranceFree: 'Fragrance Free',
    
    // Face Navigation
    eyes: 'Eyes',
    brows: 'Brows',
    lips: 'Lips',
    cheeks: 'Cheeks',
    skin: 'Skin',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    more: 'More',
    less: 'Less',
  }
} as const;

export function t(locale: LocaleCode, key: string): string {
  return translations[locale][key as keyof typeof translations[typeof locale]] || key;
}
