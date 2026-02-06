import { TripDetailUI } from '@/types/trip.type';

/**
 * Detailed mocked trip data for Trip Detail page
 * Based on Prisma Trip schema with full relations
 */

export const mockedTripDetails: TripDetailUI[] = [
  {
    id: 1,
    slug: 'hoi-an-ancient-town-tour',
    title: 'Hoi An Ancient Town Tour',
    description: 'Immerse yourself in the enchanting beauty of Hoi An Ancient Town, a UNESCO World Heritage Site. Walk through lantern-lit streets, explore centuries-old architecture, and experience the unique blend of Vietnamese, Chinese, Japanese, and European cultures. This full-day tour includes visits to iconic landmarks, a traditional lantern-making workshop, and authentic local cuisine.',
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
      'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800',
      'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=800',
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
    ],
    highlights: [
      'Visit the iconic Japanese Covered Bridge (Chùa Cầu)',
      'Explore 400-year-old merchant houses',
      'Hands-on lantern making workshop',
      'Authentic Vietnamese lunch at local restaurant',
      'Walking tour through ancient streets',
      'Visit traditional craft villages',
    ],
    inclusions: [
      'Hotel pickup and drop-off in Da Nang city center',
      'Professional English-speaking tour guide',
      'All entrance fees and tickets',
      'Traditional Vietnamese lunch',
      'Bottled water during the tour',
      'Lantern making materials',
    ],
    exclusions: [
      'Personal expenses and shopping',
      'Tips and gratuities for guide and driver',
      'Travel insurance',
      'Additional food and beverages',
    ],
    meetingPoint: 'Hotel lobby (Da Nang city center)',
    isPrivate: false,
    createdAt: new Date('2025-01-15T10:00:00'),
    updatedAt: new Date('2025-01-20T14:30:00'),
    
    vehicle: {
      vehicleId: 1,
      vehicleType: '7-seater SUV',
      brand: 'Toyota',
      model: 'Fortuner 2023',
      year: 2023,
      licensePlate: '43A-12345',
      color: 'Pearl White',
      capacity: 7,
      description: 'Luxury 7-seater SUV with leather seats, air conditioning, and ample luggage space. Perfect for comfortable family trips.',
      pricePerKm: 15000,
      pricePerDay: 1200000,
      status: 'AVAILABLE',
      images: [
        'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800',
      ],
    },
    
    driver: {
      driverId: 1,
      fullName: 'Nguyễn Văn Anh',
      phone: '+84 905 123 456',
      email: 'nguyenvananh@example.com',
      licenseNumber: 'B2-123456789',
      experienceYears: 8,
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      status: 'ACTIVE',
    },
    
    category: {
      categoryId: 1,
      name: 'Cultural & Heritage Tour',
      description: 'Explore Vietnam\'s rich cultural heritage and historical sites',
      icon: '🏛️',
      isActive: true,
    },
    
    destinations: [
      {
        tripDestinationId: 1,
        destinationId: 1,
        order: 1,
        name: 'Japanese Covered Bridge',
        description: 'The iconic 400-year-old bridge connecting the Japanese and Chinese quarters, featuring unique architecture and a small temple inside.',
        image: 'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=800',
        arrivalTime: new Date('2025-03-15T09:30:00'),
        departureTime: new Date('2025-03-15T10:30:00'),
        duration: '1 hour',
        visitDuration: 60,
        isOptional: false,
        additionalCost: null,
        region: 'Central Vietnam',
        province: 'Quang Nam',
        latitude: 15.8794,
        longitude: 108.3273,
        images: [
          'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=800',
        ],
        isPopular: true,
        entryFee: 120000,
        openingHours: '07:00 - 21:00',
        tags: ['historical', 'architecture', 'landmark'],
      },
      {
        tripDestinationId: 2,
        destinationId: 2,
        order: 2,
        name: 'Phung Hung Ancient House',
        description: 'A 200-year-old merchant house showcasing traditional Vietnamese architecture with Chinese and Japanese influences.',
        image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800',
        arrivalTime: new Date('2025-03-15T10:45:00'),
        departureTime: new Date('2025-03-15T11:30:00'),
        duration: '45 minutes',
        visitDuration: 45,
        isOptional: false,
        additionalCost: null,
        region: 'Central Vietnam',
        province: 'Quang Nam',
        latitude: 15.8800,
        longitude: 108.3280,
        images: [
          'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=800',
        ],
        isPopular: true,
        entryFee: null,
        openingHours: '08:00 - 18:00',
        tags: ['historical', 'architecture', 'museum'],
      },
      {
        tripDestinationId: 3,
        destinationId: 3,
        order: 3,
        name: 'Lantern Making Workshop',
        description: 'Learn the traditional art of making Hoi An silk lanterns from local craftsmen. Take home your own handmade lantern.',
        image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
        arrivalTime: new Date('2025-03-15T11:45:00'),
        departureTime: new Date('2025-03-15T12:45:00'),
        duration: '1 hour',
        visitDuration: 60,
        isOptional: false,
        additionalCost: null,
        region: 'Central Vietnam',
        province: 'Quang Nam',
        latitude: 15.8790,
        longitude: 108.3275,
        images: [
          'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
        ],
        isPopular: true,
        entryFee: null,
        openingHours: '09:00 - 17:00',
        tags: ['workshop', 'handicraft', 'cultural'],
      },
      {
        tripDestinationId: 4,
        destinationId: 4,
        order: 4,
        name: 'Local Restaurant - Lunch',
        description: 'Enjoy authentic Hoi An cuisine including Cao Lau, White Rose dumplings, and Banh Mi at a highly-rated local restaurant.',
        image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
        arrivalTime: new Date('2025-03-15T13:00:00'),
        departureTime: new Date('2025-03-15T14:00:00'),
        duration: '1 hour',
        visitDuration: 60,
        isOptional: false,
        additionalCost: null,
        region: 'Central Vietnam',
        province: 'Quang Nam',
        latitude: 15.8785,
        longitude: 108.3270,
        images: [
          'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800',
        ],
        isPopular: false,
        entryFee: null,
        openingHours: '10:00 - 22:00',
        tags: ['restaurant', 'local-food', 'lunch'],
      },
      {
        tripDestinationId: 5,
        destinationId: 5,
        order: 5,
        name: 'Thu Bon River Walk',
        description: 'Stroll along the scenic Thu Bon River, enjoy the riverside atmosphere, and take memorable photos of colorful boats and ancient houses.',
        image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
        arrivalTime: new Date('2025-03-15T14:15:00'),
        departureTime: new Date('2025-03-15T15:30:00'),
        duration: '1 hour 15 minutes',
        visitDuration: 75,
        isOptional: false,
        additionalCost: null,
        region: 'Central Vietnam',
        province: 'Quang Nam',
        latitude: 15.8788,
        longitude: 108.3268,
        images: [
          'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
        ],
        isPopular: true,
        entryFee: null,
        openingHours: 'All day',
        tags: ['riverside', 'scenic', 'photography'],
      },
    ],
    
    itinerary: [
      {
        order: 1,
        time: '08:00',
        title: 'Hotel Pickup',
        description: 'Our driver and guide will pick you up from your hotel in Da Nang city center. Please wait at the hotel lobby.',
        location: 'Da Nang City Center',
        duration: '30 minutes drive',
      },
      {
        order: 2,
        time: '09:30',
        title: 'Japanese Covered Bridge',
        description: 'First stop at the iconic 400-year-old Japanese Covered Bridge. Learn about its history and architecture from your guide.',
        location: 'Hoi An Ancient Town',
        duration: '1 hour',
      },
      {
        order: 3,
        time: '10:45',
        title: 'Ancient House Visit',
        description: 'Explore Phung Hung Ancient House, a 200-year-old merchant house showcasing traditional architecture.',
        location: 'Hoi An Ancient Town',
        duration: '45 minutes',
      },
      {
        order: 4,
        time: '11:45',
        title: 'Lantern Making Workshop',
        description: 'Participate in a hands-on lantern making workshop. Learn traditional techniques and create your own silk lantern to take home.',
        location: 'Craft Workshop',
        duration: '1 hour',
      },
      {
        order: 5,
        time: '13:00',
        title: 'Lunch Time',
        description: 'Enjoy authentic Hoi An specialties at a local restaurant. Try Cao Lau, White Rose dumplings, and other delicacies.',
        location: 'Local Restaurant',
        duration: '1 hour',
      },
      {
        order: 6,
        time: '14:15',
        title: 'Riverside Walk',
        description: 'Take a leisurely walk along Thu Bon River. Perfect time for photos and soaking in the atmosphere.',
        location: 'Thu Bon Riverside',
        duration: '1 hour 15 minutes',
      },
      {
        order: 7,
        time: '15:45',
        title: 'Return to Da Nang',
        description: 'Depart from Hoi An and return to your hotel in Da Nang.',
        location: 'Return Journey',
        duration: '30 minutes drive',
      },
      {
        order: 8,
        time: '17:00',
        title: 'Hotel Drop-off',
        description: 'Arrive back at your hotel with wonderful memories and your handmade lantern.',
        location: 'Da Nang City Center',
        duration: 'End of tour',
      },
    ],
    
    reviews: [
      {
        id: 'review-1',
        userId: 'user-1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        title: 'Amazing Cultural Experience!',
        content: 'This tour exceeded all my expectations! Our guide was incredibly knowledgeable about Hoi An\'s history and culture. The lantern making workshop was a highlight - I loved creating my own lantern to take home. The local lunch was delicious and authentic. Highly recommend this tour to anyone visiting Da Nang!',
        rating: 5,
        status: 'APPROVED',
        createdAt: new Date('2025-01-25T10:30:00'),
      },
      {
        id: 'review-2',
        userId: 'user-2',
        userName: 'Trần Minh Hoàng',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
        title: 'Perfect Day Trip',
        content: 'Chuyến đi rất tuyệt vời! Xe đưa đón đúng giờ, tài xế lái xe an toàn. Hướng dẫn viên nhiệt tình và am hiểu. Các điểm tham quan được sắp xếp hợp lý, không bị vội vàng. Bữa trưa ngon và đủ ăn. Rất đáng để trải nghiệm!',
        rating: 5,
        status: 'APPROVED',
        createdAt: new Date('2025-01-22T15:45:00'),
      },
      {
        id: 'review-3',
        userId: 'user-3',
        userName: 'Michael Chen',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        title: 'Great Tour, Small Improvements Needed',
        content: 'Overall a very good tour. The historical sites were fascinating and the guide was friendly. The lantern workshop was fun. Only minor issue was the lunch restaurant was quite crowded. Would still recommend this tour - just be prepared for crowds during peak season.',
        rating: 4,
        status: 'APPROVED',
        createdAt: new Date('2025-01-20T09:15:00'),
      },
      {
        id: 'review-4',
        userId: 'user-4',
        userName: 'Emma Wilson',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
        title: 'Wonderful Experience',
        content: 'Loved every minute of this tour! Hoi An is absolutely beautiful and this tour covered all the must-see spots. The guide gave us great tips for shopping and exploring on our own too. The vehicle was clean and comfortable. Worth every penny!',
        rating: 5,
        status: 'APPROVED',
        createdAt: new Date('2025-01-18T14:20:00'),
      },
      {
        id: 'review-5',
        userId: 'user-5',
        userName: 'Lê Thị Mai',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
        title: 'Tuyệt vời cho gia đình',
        content: 'Mình đi cùng gia đình 4 người, mọi người đều rất hài lòng. Xe rộng rãi, thoải mái. Các điểm tham quan đẹp và ý nghĩa. Workshop làm đèn lồng rất thú vị, các bé thích lắm. Bữa trưa ngon miệng. Chắc chắn sẽ giới thiệu cho bạn bè!',
        rating: 5,
        status: 'APPROVED',
        createdAt: new Date('2025-01-16T11:00:00'),
      },
    ],
    
    tripImgs: [
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=1200',
          altText: 'Hoi An Ancient Town Street View'
        }
      },
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1583417267826-aebc4d1542e1?w=1200',
          altText: 'Japanese Covered Bridge'
        }
      },
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=1200',
          altText: 'Traditional Lanterns'
        }
      },
      {
        node: {
          sourceUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=1200',
          altText: 'Local Vietnamese Food'
        }
      },
    ],
    
    featuredImage: {
      node: {
        sourceUrl: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?w=1200',
        altText: 'Hoi An Ancient Town'
      }
    },
    
    availableSeats: 4,
    averageRating: 4.8,
    totalReviews: 5,
  },
];

/**
 * Helper function to get trip detail by slug
 */
export function getTripDetailBySlug(slug: string): TripDetailUI | undefined {
  return mockedTripDetails.find(trip => trip.slug === slug);
}

/**
 * Helper function to get trip detail by ID
 */
export function getTripDetailById(id: number): TripDetailUI | undefined {
  return mockedTripDetails.find(trip => trip.id === id);
}

/**
 * Default trip detail for demo purposes
 */
export const defaultTripDetail = mockedTripDetails[0];
