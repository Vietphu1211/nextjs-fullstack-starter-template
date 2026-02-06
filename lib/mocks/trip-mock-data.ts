import { TripCardData } from '@/types/trip-card.type';

/**
 * Mocked trip data for TripCard component
 * Based on Prisma Trip schema
 */

export const mockedTrips: TripCardData[] = [
  {
    id: 1,
    slug: 'hoi-an-ancient-town-tour',
    title: 'Hoi An Ancient Town Tour',
    description: 'Explore the beautiful ancient town of Hoi An with lantern-lit streets and historic architecture',
    departure: 'Đà Nẵng',
    destination: 'Hội An',
    departureTime: new Date('2025-03-15T08:00:00'),
    returnTime: new Date('2025-03-15T17:00:00'),
    duration: 9,
    distance: 30,
    maxPassengers: 7,
    currentBookings: 3,
    basePrice: 450000,
    status: 'SCHEDULED',
    images: [
      '/images/trips/hoi-an-1.jpg',
      '/images/trips/hoi-an-2.jpg',
      '/images/trips/hoi-an-3.jpg',
    ],
    highlights: [
      'Visit Japanese Covered Bridge',
      'Explore ancient houses',
      'Lantern making workshop',
      'Local lunch included',
    ],
    inclusions: [
      'Hotel pickup and drop-off',
      'Professional tour guide',
      'Entrance fees',
      'Lunch',
    ],
    exclusions: [
      'Personal expenses',
      'Tips and gratuities',
    ],
    meetingPoint: 'Hotel lobby',
    isPrivate: false,
    availableSeats: 4,
    pricePerPerson: 450000,
    languageOffer: ['English', 'Vietnamese'],
    
    vehicle: {
      vehicleType: '7-seater SUV',
      brand: 'Toyota',
      model: 'Fortuner',
      capacity: 7,
    },
    
    driver: {
      fullName: 'Nguyễn Văn A',
      rating: 4.8,
      avatar: '/images/drivers/driver-1.jpg',
    },
    
    category: {
      name: 'Cultural Tour',
      icon: '🏛️',
    },
    
    tripImgs: [
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800',
          altText: 'Hoi An Ancient Town'
        }
      },
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=800',
          altText: 'Japanese Bridge'
        }
      }
    ],
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800',
        altText: 'Hoi An Ancient Town'
      }
    },
    guestNumber: 3,
    price: 450000,
  },
  
  {
    id: 2,
    slug: 'ba-na-hills-golden-bridge',
    title: 'Ba Na Hills & Golden Bridge',
    description: 'Experience the famous Golden Bridge and enjoy the cool mountain air at Ba Na Hills',
    departure: 'Đà Nẵng',
    destination: 'Bà Nà Hills',
    departureTime: new Date('2025-03-16T07:00:00'),
    returnTime: new Date('2025-03-16T18:00:00'),
    duration: 11,
    distance: 40,
    maxPassengers: 16,
    currentBookings: 8,
    basePrice: 850000,
    status: 'SCHEDULED',
    images: [
      '/images/trips/bana-1.jpg',
      '/images/trips/bana-2.jpg',
      '/images/trips/bana-3.jpg',
    ],
    highlights: [
      'Golden Bridge photo opportunity',
      'Cable car ride',
      'French Village exploration',
      'Fantasy Park access',
    ],
    inclusions: [
      'Round-trip transportation',
      'Cable car tickets',
      'Entrance fees',
      'Buffet lunch',
      'Professional guide',
    ],
    exclusions: [
      'Personal expenses',
      'Additional activities',
      'Tips',
    ],
    meetingPoint: 'City center pickup',
    isPrivate: false,
    availableSeats: 8,
    pricePerPerson: 850000,
    languageOffer: ['English', 'Vietnamese', 'Korean'],
    
    vehicle: {
      vehicleType: '16-seater Bus',
      brand: 'Hyundai',
      model: 'County',
      capacity: 16,
    },
    
    driver: {
      fullName: 'Trần Văn B',
      rating: 4.9,
      avatar: '/images/drivers/driver-2.jpg',
    },
    
    category: {
      name: 'Mountain Tour',
      icon: '⛰️',
    },
    
    tripImgs: [
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
          altText: 'Golden Bridge Ba Na Hills'
        }
      },
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1632979304476-d2f6521db8e8?w=800',
          altText: 'Ba Na Hills Cable Car'
        }
      }
    ],
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
        altText: 'Golden Bridge Ba Na Hills'
      }
    },
    guestNumber: 8,
    price: 850000,
  },
  
  {
    id: 3,
    slug: 'marble-mountains-tour',
    title: 'Marble Mountains & Non Nuoc Beach',
    description: 'Discover the mystical Marble Mountains and relax at beautiful Non Nuoc Beach',
    departure: 'Đà Nẵng',
    destination: 'Ngũ Hành Sơn',
    departureTime: new Date('2025-03-17T09:00:00'),
    returnTime: new Date('2025-03-17T15:00:00'),
    duration: 6,
    distance: 12,
    maxPassengers: 4,
    currentBookings: 2,
    basePrice: 350000,
    status: 'SCHEDULED',
    images: [
      '/images/trips/marble-1.jpg',
      '/images/trips/marble-2.jpg',
    ],
    highlights: [
      'Cave exploration',
      'Pagoda visits',
      'Marble sculpture village',
      'Beach time',
    ],
    inclusions: [
      'Hotel pickup',
      'Entrance fees',
      'Water bottles',
      'Guide service',
    ],
    exclusions: [
      'Lunch',
      'Personal shopping',
      'Tips',
    ],
    meetingPoint: 'Hotel lobby',
    isPrivate: false,
    availableSeats: 2,
    pricePerPerson: 350000,
    languageOffer: ['English', 'Vietnamese'],
    
    vehicle: {
      vehicleType: '4-seater Sedan',
      brand: 'Honda',
      model: 'Civic',
      capacity: 4,
    },
    
    driver: {
      fullName: 'Lê Thị C',
      rating: 4.7,
      avatar: '/images/drivers/driver-3.jpg',
    },
    
    category: {
      name: 'Nature & Adventure',
      icon: '🏔️',
    },
    
    tripImgs: [
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
          altText: 'Marble Mountains'
        }
      }
    ],
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
        altText: 'Marble Mountains'
      }
    },
    guestNumber: 2,
    price: 350000,
  },

  {
    id: 4,
    slug: 'son-tra-peninsula-monkey-mountain',
    title: 'Son Tra Peninsula - Monkey Mountain',
    description: 'Explore the pristine Son Tra Peninsula with stunning ocean views and visit the iconic Lady Buddha statue',
    departure: 'Đà Nẵng',
    destination: 'Bán đảo Sơn Trà',
    departureTime: new Date('2025-03-18T06:30:00'),
    returnTime: new Date('2025-03-18T12:00:00'),
    duration: 5.5,
    distance: 15,
    maxPassengers: 7,
    currentBookings: 5,
    basePrice: 400000,
    status: 'SCHEDULED',
    images: [
      '/images/trips/sontra-1.jpg',
      '/images/trips/sontra-2.jpg',
    ],
    highlights: [
      'Lady Buddha statue visit',
      'Monkey spotting',
      'Ocean panorama views',
      'Fresh seafood lunch option',
    ],
    inclusions: [
      'Hotel pickup and drop-off',
      'English-speaking guide',
      'Entrance fees',
      'Bottled water',
    ],
    exclusions: [
      'Meals',
      'Personal expenses',
      'Tips',
    ],
    meetingPoint: 'Hotel lobby',
    isPrivate: false,
    availableSeats: 2,
    pricePerPerson: 400000,
    languageOffer: ['English', 'Vietnamese', 'Chinese'],
    
    vehicle: {
      vehicleType: '7-seater SUV',
      brand: 'Mitsubishi',
      model: 'Xpander',
      capacity: 7,
    },
    
    driver: {
      fullName: 'Phạm Văn D',
      rating: 4.8,
      avatar: '/images/drivers/driver-4.jpg',
    },
    
    category: {
      name: 'Nature & Wildlife',
      icon: '🐒',
    },
    
    tripImgs: [
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800',
          altText: 'Son Tra Peninsula'
        }
      },
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          altText: 'Lady Buddha Statue'
        }
      }
    ],
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800',
        altText: 'Son Tra Peninsula View'
      }
    },
    guestNumber: 5,
    price: 400000,
  },

  {
    id: 5,
    slug: 'my-khe-beach-sunset-tour',
    title: 'My Khe Beach Sunset Experience',
    description: 'Relax at one of the world\'s most beautiful beaches and enjoy a stunning sunset',
    departure: 'Đà Nẵng',
    destination: 'Biển Mỹ Khê',
    departureTime: new Date('2025-03-19T15:00:00'),
    returnTime: new Date('2025-03-19T19:00:00'),
    duration: 4,
    distance: 8,
    maxPassengers: 4,
    currentBookings: 1,
    basePrice: 280000,
    status: 'SCHEDULED',
    images: [
      '/images/trips/mykhe-1.jpg',
      '/images/trips/mykhe-2.jpg',
    ],
    highlights: [
      'Beach relaxation',
      'Sunset viewing',
      'Beach activities',
      'Seafood dinner option',
    ],
    inclusions: [
      'Transportation',
      'Beach chair rental',
      'Sunset photo session',
    ],
    exclusions: [
      'Meals and drinks',
      'Water sports',
      'Personal expenses',
    ],
    meetingPoint: 'Hotel lobby',
    isPrivate: true,
    availableSeats: 3,
    pricePerPerson: 280000,
    languageOffer: ['English', 'Vietnamese'],
    
    vehicle: {
      vehicleType: '4-seater Sedan',
      brand: 'Toyota',
      model: 'Vios',
      capacity: 4,
    },
    
    driver: {
      fullName: 'Đỗ Thị E',
      rating: 4.9,
      avatar: '/images/drivers/driver-5.jpg',
    },
    
    category: {
      name: 'Beach & Relaxation',
      icon: '🏖️',
    },
    
    tripImgs: [
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
          altText: 'My Khe Beach'
        }
      }
    ],
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        altText: 'My Khe Beach Sunset'
      }
    },
    guestNumber: 1,
    price: 280000,
  },

  // Additional trips for better filtering demo
  {
    id: 6,
    slug: 'hue-imperial-city-tour',
    title: 'Hue Imperial City Full Day Tour',
    description: 'Discover the ancient capital of Vietnam with its magnificent royal palaces and tombs',
    departure: 'Đà Nẵng',
    destination: 'Huế',
    departureTime: new Date('2025-03-20T07:00:00'),
    returnTime: new Date('2025-03-20T19:00:00'),
    duration: 12,
    distance: 108,
    maxPassengers: 16,
    currentBookings: 10,
    basePrice: 650000,
    status: 'SCHEDULED',
    images: ['/images/trips/hue-1.jpg'],
    highlights: [
      'Imperial City visit',
      'Thien Mu Pagoda',
      'Royal tombs exploration',
      'Perfume River cruise',
    ],
    inclusions: [
      'Round-trip transportation',
      'English-speaking guide',
      'All entrance fees',
      'Lunch at local restaurant',
    ],
    exclusions: [
      'Personal expenses',
      'Tips',
      'Additional activities',
    ],
    meetingPoint: 'Hotel pickup',
    isPrivate: false,
    availableSeats: 6,
    pricePerPerson: 650000,
    languageOffer: ['English', 'Vietnamese', 'French'],
    
    vehicle: {
      vehicleType: '16-seater Bus',
      brand: 'Hyundai',
      model: 'County',
      capacity: 16,
    },
    
    driver: {
      fullName: 'Hoàng Văn F',
      rating: 4.7,
    },
    
    category: {
      name: 'Historical Tour',
      icon: '🏰',
    },
    
    tripImgs: [
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
          altText: 'Hue Imperial City'
        }
      }
    ],
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
        altText: 'Hue Imperial City'
      }
    },
    guestNumber: 10,
    price: 650000,
  },

  {
    id: 7,
    slug: 'cham-island-snorkeling',
    title: 'Cham Island Snorkeling & Beach Tour',
    description: 'Escape to the pristine Cham Islands for snorkeling and beach relaxation',
    departure: 'Đà Nẵng',
    destination: 'Cù Lao Chàm',
    departureTime: new Date('2025-03-21T06:00:00'),
    returnTime: new Date('2025-03-21T16:00:00'),
    duration: 10,
    distance: 50,
    maxPassengers: 16,
    currentBookings: 12,
    basePrice: 750000,
    status: 'SCHEDULED',
    images: ['/images/trips/cham-island-1.jpg'],
    highlights: [
      'Speed boat transfer',
      'Snorkeling with equipment',
      'Beach BBQ lunch',
      'Marine park exploration',
    ],
    inclusions: [
      'Transportation to port',
      'Speed boat tickets',
      'Snorkeling equipment',
      'BBQ lunch',
      'Guide service',
    ],
    exclusions: [
      'Personal expenses',
      'Diving (optional)',
      'Underwater photography',
    ],
    meetingPoint: 'Cua Dai Port',
    isPrivate: false,
    availableSeats: 4,
    pricePerPerson: 750000,
    languageOffer: ['English', 'Vietnamese'],
    
    vehicle: {
      vehicleType: '16-seater Bus',
      brand: 'Thaco',
      model: 'TB82S',
      capacity: 16,
    },
    
    driver: {
      fullName: 'Nguyễn Văn G',
      rating: 4.8,
    },
    
    category: {
      name: 'Adventure & Water Sports',
      icon: '🤿',
    },
    
    tripImgs: [
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
          altText: 'Cham Island Beach'
        }
      }
    ],
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
        altText: 'Cham Island'
      }
    },
    guestNumber: 12,
    price: 750000,
  },

  {
    id: 8,
    slug: 'dragon-bridge-night-tour',
    title: 'Dragon Bridge Fire Show & Night Lights',
    description: 'Experience the spectacular fire-breathing Dragon Bridge and Da Nang by night',
    departure: 'Đà Nẵng',
    destination: 'Cầu Rồng',
    departureTime: new Date('2025-03-22T19:00:00'),
    returnTime: new Date('2025-03-22T22:00:00'),
    duration: 3,
    distance: 5,
    maxPassengers: 7,
    currentBookings: 4,
    basePrice: 200000,
    status: 'SCHEDULED',
    images: ['/images/trips/dragon-bridge-1.jpg'],
    highlights: [
      'Dragon fire breathing show',
      'Han River night cruise option',
      'City lights photography',
      'Night market visit',
    ],
    inclusions: [
      'Hotel pickup and drop-off',
      'Best viewing spot access',
      'Bottled water',
    ],
    exclusions: [
      'Dinner',
      'River cruise (optional)',
      'Shopping',
    ],
    meetingPoint: 'Hotel lobby',
    isPrivate: false,
    availableSeats: 3,
    pricePerPerson: 200000,
    languageOffer: ['English', 'Vietnamese', 'Korean'],
    
    vehicle: {
      vehicleType: '7-seater SUV',
      brand: 'Ford',
      model: 'Everest',
      capacity: 7,
    },
    
    driver: {
      fullName: 'Lê Văn H',
      rating: 4.9,
    },
    
    category: {
      name: 'City & Night Tour',
      icon: '🌉',
    },
    
    tripImgs: [
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
          altText: 'Dragon Bridge at Night'
        }
      }
    ],
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
        altText: 'Dragon Bridge Fire Show'
      }
    },
    guestNumber: 4,
    price: 200000,
  },

  {
    id: 9,
    slug: 'phong-nha-cave-adventure',
    title: 'Phong Nha Cave & Paradise Cave Tour',
    description: 'Explore the world\'s most beautiful caves in Phong Nha-Ke Bang National Park',
    departure: 'Đà Nẵng',
    destination: 'Phong Nha',
    departureTime: new Date('2025-03-23T05:30:00'),
    returnTime: new Date('2025-03-23T20:00:00'),
    duration: 14.5,
    distance: 220,
    maxPassengers: 16,
    currentBookings: 8,
    basePrice: 1200000,
    status: 'SCHEDULED',
    images: ['/images/trips/phong-nha-1.jpg'],
    highlights: [
      'Phong Nha Cave boat tour',
      'Paradise Cave exploration',
      'UNESCO World Heritage site',
      'Scenic mountain drive',
    ],
    inclusions: [
      'Round-trip transportation',
      'English-speaking guide',
      'All entrance fees',
      'Boat ride',
      'Lunch and water',
    ],
    exclusions: [
      'Personal expenses',
      'Tips',
      'Additional caves (optional)',
    ],
    meetingPoint: 'Hotel pickup',
    isPrivate: false,
    availableSeats: 8,
    pricePerPerson: 1200000,
    languageOffer: ['English', 'Vietnamese'],
    
    vehicle: {
      vehicleType: '16-seater Bus',
      brand: 'Hyundai',
      model: 'Solati',
      capacity: 16,
    },
    
    driver: {
      fullName: 'Trần Văn I',
      rating: 4.8,
    },
    
    category: {
      name: 'Adventure & Nature',
      icon: '🦇',
    },
    
    tripImgs: [
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
          altText: 'Phong Nha Cave'
        }
      }
    ],
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        altText: 'Paradise Cave'
      }
    },
    guestNumber: 8,
    price: 1200000,
  },

  {
    id: 10,
    slug: 'hoi-an-cooking-class',
    title: 'Hoi An Cooking Class & Market Tour',
    description: 'Learn to cook authentic Vietnamese dishes with a local chef in Hoi An',
    departure: 'Đà Nẵng',
    destination: 'Hội An',
    departureTime: new Date('2025-03-24T08:00:00'),
    returnTime: new Date('2025-03-24T14:00:00'),
    duration: 6,
    distance: 30,
    maxPassengers: 4,
    currentBookings: 3,
    basePrice: 550000,
    status: 'SCHEDULED',
    images: ['/images/trips/cooking-class-1.jpg'],
    highlights: [
      'Local market visit',
      'Hands-on cooking class',
      'Learn 3-4 dishes',
      'Enjoy your cooked meal',
    ],
    inclusions: [
      'Hotel pickup and drop-off',
      'Market tour',
      'Cooking class',
      'All ingredients',
      'Recipe book',
    ],
    exclusions: [
      'Personal expenses',
      'Additional shopping',
      'Tips',
    ],
    meetingPoint: 'Hotel lobby',
    isPrivate: true,
    availableSeats: 1,
    pricePerPerson: 550000,
    languageOffer: ['English', 'Vietnamese'],
    
    vehicle: {
      vehicleType: '4-seater Sedan',
      brand: 'Honda',
      model: 'City',
      capacity: 4,
    },
    
    driver: {
      fullName: 'Phạm Thị J',
      rating: 4.9,
    },
    
    category: {
      name: 'Culinary Experience',
      icon: '👨‍🍳',
    },
    
    tripImgs: [
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800',
          altText: 'Cooking Class Hoi An'
        }
      }
    ],
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800',
        altText: 'Vietnamese Cooking Class'
      }
    },
    guestNumber: 3,
    price: 550000,
  },
];

// Helper function to get trip by ID
export const getTripById = (id: number): TripCardData | undefined => {
  return mockedTrips.find(trip => trip.id === id);
};

// Helper function to get trip by slug
export const getTripBySlug = (slug: string): TripCardData | undefined => {
  return mockedTrips.find(trip => trip.slug === slug);
};

// Helper function to filter trips
export const filterTrips = (filters: {
  departure?: string;
  destination?: string;
  maxPrice?: number;
  minAvailableSeats?: number;
  status?: TripCardData['status'];
}): TripCardData[] => {
  return mockedTrips.filter(trip => {
    if (filters.departure && trip.departure !== filters.departure) return false;
    if (filters.destination && trip.destination !== filters.destination) return false;
    if (filters.maxPrice && trip.price > filters.maxPrice) return false;
    if (filters.minAvailableSeats && trip.availableSeats < filters.minAvailableSeats) return false;
    if (filters.status && trip.status !== filters.status) return false;
    return true;
  });
};
