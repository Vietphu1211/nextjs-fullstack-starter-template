# Layer Architecture Guide

## 📚 Overview

RealDox Rental tuân theo **Layered Architecture Pattern** để đảm bảo code maintainable, testable và scalable.

---

## 🏗 Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                    UI LAYER                              │
│  Components, Pages, Layouts                             │
│  Responsibility: Presentation & User Interaction        │
└────────────────────┬────────────────────────────────────┘
                     │ Uses Hooks
┌────────────────────▼────────────────────────────────────┐
│                   HOOK LAYER                             │
│  Custom Hooks                                           │
│  Responsibility: State Management, Data Coordination    │
└────────────────────┬────────────────────────────────────┘
                     │ Calls Services
┌────────────────────▼────────────────────────────────────┐
│                 SERVICE LAYER                            │
│  Business Logic, API Calls                              │
│  Responsibility: Data Fetching, Business Rules          │
└────────────────────┬────────────────────────────────────┘
                     │ Uses Transforms
┌────────────────────▼────────────────────────────────────┐
│               TRANSFORM LAYER                            │
│  Data Mapping & Conversion                              │
│  Responsibility: API Data ↔ UI Data                     │
└────────────────────┬────────────────────────────────────┘
                     │ Uses Types
┌────────────────────▼────────────────────────────────────┐
│                  TYPE LAYER                              │
│  TypeScript Types & Interfaces                          │
│  Responsibility: Type Definitions                       │
└─────────────────────────────────────────────────────────┘
```

---

## 1️⃣ UI Layer

### 📁 Location
- `/app` - Pages (Next.js App Router)
- `/components` - Reusable components

### 🎯 Responsibility
- Render UI components
- Handle user interactions
- Display data from hooks
- No business logic

### ✅ DO
```typescript
// ✅ GOOD: Component only uses hooks for data
export function PropertyListPage() {
  const { properties, loading, error, refetch } = usePropertyList({
    city: 'Vienna',
    propertyType: 'STUDIO'
  });

  if (loading) return <PropertyListSkeleton />;
  if (error) return <ErrorAlert message={error} onRetry={refetch} />;

  return (
    <div className="grid gap-6">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
```

### ❌ DON'T
```typescript
// ❌ BAD: Component has business logic and API calls
export function PropertyListPage() {
  const [properties, setProperties] = useState([]);
  
  useEffect(() => {
    // ❌ Direct API call in component
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        // ❌ Data transformation in component
        const formatted = data.map(p => ({
          ...p,
          price: p.monthlyRent
        }));
        setProperties(formatted);
      });
  }, []);

  return <div>...</div>;
}
```

---

## 2️⃣ Hook Layer

### 📁 Location
`/hooks`

### 📝 Naming Convention
```
use{Entity}{Action}.ts

Examples:
- usePropertyList.ts
- usePropertyDetail.ts
- useBookingCreate.ts
- useUserProfile.ts
```

### 🎯 Responsibility
- Manage component state (loading, error, data)
- Call services to fetch/mutate data
- Use transforms to convert data
- Return properly typed data for UI

### ✅ DO
```typescript
// hooks/usePropertyList.ts

import { useState, useEffect } from 'react';
import { PropertyService } from '@/lib/services/PropertyService';
import { PropertyTransform } from '@/lib/transforms/PropertyTransform';
import type { Property, PropertyFilters } from '@/types/PropertyType';

interface UsePropertyListReturn {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePropertyList(
  filters: PropertyFilters
): UsePropertyListReturn {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 1. Call service
      const rawData = await PropertyService.getList(filters);
      
      // 2. Transform data
      const transformedData = PropertyTransform.toUIList(rawData);
      
      // 3. Update state
      setProperties(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]); // Re-fetch when filters change

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties
  };
}
```

### 🔄 Mutation Hook Example
```typescript
// hooks/useBookingCreate.ts

import { useState } from 'react';
import { BookingService } from '@/lib/services/BookingService';
import type { CreateBookingInput, Booking } from '@/types/BookingType';

interface UseBookingCreateReturn {
  createBooking: (input: CreateBookingInput) => Promise<Booking | null>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useBookingCreate(): UseBookingCreateReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createBooking = async (input: CreateBookingInput) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const booking = await BookingService.create(input);
      
      setSuccess(true);
      return booking;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createBooking,
    loading,
    error,
    success
  };
}
```

### ❌ DON'T
```typescript
// ❌ BAD: Hook with hardcoded data transformation
export function usePropertyList(filters: PropertyFilters) {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch('/api/properties', { 
      method: 'POST', 
      body: JSON.stringify(filters) 
    })
      .then(res => res.json())
      .then(rawData => {
        // ❌ Transformation logic in hook
        const formatted = rawData.map(item => ({
          id: item.id,
          name: item.title,
          price: `$${item.monthlyRent}`,
          image: item.images[0]?.url || '/placeholder.jpg'
        }));
        setData(formatted);
      });
  }, [filters]);
  
  return { data };
}
```

---

## 3️⃣ Service Layer

### 📁 Location
`/lib/services`

### 📝 Naming Convention
```
{Entity}Service.ts

Examples:
- PropertyService.ts
- BookingService.ts
- UserService.ts
- PaymentService.ts
```

### 🎯 Responsibility
- API communication
- Business logic
- Error handling
- Caching (if needed)
- Return raw API data

### ✅ DO
```typescript
// lib/services/PropertyService.ts

import { apiClient } from '@/lib/api';
import type { PropertyFilters } from '@/types/PropertyType';

export class PropertyService {
  /**
   * Get list of properties with filters
   */
  static async getList(filters: PropertyFilters) {
    try {
      const response = await apiClient.post('/api/properties/search', filters);
      
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      
      const data = await response.json();
      return data.properties; // Return raw API data
    } catch (error) {
      console.error('PropertyService.getList error:', error);
      throw error;
    }
  }

  /**
   * Get single property by ID
   */
  static async getById(id: string) {
    try {
      const response = await apiClient.get(`/api/properties/${id}`);
      
      if (!response.ok) {
        throw new Error('Property not found');
      }
      
      const data = await response.json();
      return data.property; // Return raw API data
    } catch (error) {
      console.error('PropertyService.getById error:', error);
      throw error;
    }
  }

  /**
   * Create new property listing
   */
  static async create(propertyData: CreatePropertyInput) {
    try {
      const response = await apiClient.post('/api/properties', propertyData);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create property');
      }
      
      const data = await response.json();
      return data.property;
    } catch (error) {
      console.error('PropertyService.create error:', error);
      throw error;
    }
  }

  /**
   * Update property
   */
  static async update(id: string, updates: Partial<Property>) {
    try {
      const response = await apiClient.patch(`/api/properties/${id}`, updates);
      
      if (!response.ok) {
        throw new Error('Failed to update property');
      }
      
      const data = await response.json();
      return data.property;
    } catch (error) {
      console.error('PropertyService.update error:', error);
      throw error;
    }
  }

  /**
   * Delete property
   */
  static async delete(id: string) {
    try {
      const response = await apiClient.delete(`/api/properties/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to delete property');
      }
      
      return true;
    } catch (error) {
      console.error('PropertyService.delete error:', error);
      throw error;
    }
  }
}
```

### 🔒 Service with Authentication
```typescript
// lib/services/BookingService.ts

import { apiClient } from '@/lib/api';
import { getSession } from 'next-auth/react';

export class BookingService {
  static async create(bookingData: CreateBookingInput) {
    const session = await getSession();
    
    if (!session) {
      throw new Error('Authentication required');
    }

    const response = await apiClient.post('/api/bookings', bookingData, {
      headers: {
        'Authorization': `Bearer ${session.accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to create booking');
    }

    return response.json();
  }
}
```

### ❌ DON'T
```typescript
// ❌ BAD: Service with data transformation
export class PropertyService {
  static async getList(filters: PropertyFilters) {
    const response = await fetch('/api/properties');
    const data = await response.json();
    
    // ❌ Don't transform data in service
    return data.map(item => ({
      ...item,
      displayPrice: `$${item.monthlyRent}/month`,
      mainImage: item.images[0]?.url
    }));
  }
}
```

---

## 4️⃣ Transform Layer

### 📁 Location
`/lib/transforms`

### 📝 Naming Convention
```
{Entity}Transform.ts

Examples:
- PropertyTransform.ts
- BookingTransform.ts
- UserTransform.ts
```

### 🎯 Responsibility
- Convert API data → UI data
- Handle null/undefined values
- Format dates, numbers, strings
- Combine/split data fields
- No API calls or business logic

### ✅ DO
```typescript
// lib/transforms/PropertyTransform.ts

import type { Property, PropertyListItem } from '@/types/PropertyType';

export class PropertyTransform {
  /**
   * Transform API property list to UI format
   */
  static toUIList(rawData: any[]): PropertyListItem[] {
    return rawData.map(item => this.toUIListItem(item));
  }

  /**
   * Transform single property for list view
   */
  static toUIListItem(raw: any): PropertyListItem {
    return {
      id: raw.id,
      title: raw.title,
      price: raw.monthlyRent,
      priceFormatted: this.formatPrice(raw.monthlyRent, raw.utilitiesIncluded),
      location: this.formatLocation(raw),
      propertyType: raw.propertyType,
      image: raw.images?.find((img: any) => img.isPrimary)?.url || raw.images?.[0]?.url || '/placeholder.jpg',
      bedrooms: raw.bedrooms,
      bathrooms: raw.bathrooms,
      size: raw.size,
      availableFrom: new Date(raw.availableFrom),
      availableFromFormatted: this.formatDate(raw.availableFrom),
      landlord: {
        name: raw.landlord?.name || 'Unknown',
        rating: raw.landlord?.averageRating || 0,
        verified: raw.landlord?.verificationStatus === 'VERIFIED'
      },
      features: {
        furnished: raw.furnished,
        petAllowed: raw.petAllowed,
        privateKitchen: raw.privateKitchen,
        privateBathroom: raw.privateBathroom
      }
    };
  }

  /**
   * Transform detailed property data
   */
  static toUIDetail(raw: any): Property {
    return {
      ...this.toUIListItem(raw),
      description: raw.description,
      address: raw.address,
      latitude: raw.latitude,
      longitude: raw.longitude,
      deposit: raw.deposit,
      utilitiesCost: raw.utilitiesCost,
      minStayMonths: raw.minStayMonths,
      maxStayMonths: raw.maxStayMonths,
      images: raw.images?.map((img: any) => ({
        id: img.id,
        url: img.url,
        caption: img.caption
      })) || [],
      amenities: raw.amenities?.map((a: any) => ({
        id: a.amenity.id,
        name: a.amenity.name,
        icon: a.amenity.icon,
        category: a.amenity.category
      })) || [],
      rules: raw.rules?.map((r: any) => ({
        id: r.id,
        title: r.title,
        description: r.description
      })) || [],
      reviews: raw.reviews?.map((r: any) => this.transformReview(r)) || []
    };
  }

  /**
   * Helper: Format price display
   */
  private static formatPrice(price: number, utilitiesIncluded: boolean): string {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
    
    return utilitiesIncluded ? `${formatted}/month (utilities included)` : `${formatted}/month`;
  }

  /**
   * Helper: Format location display
   */
  private static formatLocation(raw: any): string {
    const parts = [raw.city, raw.country].filter(Boolean);
    return parts.join(', ');
  }

  /**
   * Helper: Format date display
   */
  private static formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  /**
   * Transform review data
   */
  private static transformReview(raw: any) {
    return {
      id: raw.id,
      rating: raw.overallRating,
      comment: raw.comment,
      author: raw.tenant?.name || 'Anonymous',
      createdAt: new Date(raw.createdAt),
      createdAtFormatted: this.formatDate(raw.createdAt)
    };
  }
}
```

### 🔄 Reverse Transform Example
```typescript
// Transform UI form data → API format
export class PropertyTransform {
  /**
   * Transform UI form data to API format
   */
  static toAPICreate(formData: PropertyFormData): CreatePropertyDTO {
    return {
      title: formData.title.trim(),
      description: formData.description.trim(),
      propertyType: formData.propertyType,
      monthlyRent: parseFloat(formData.monthlyRent),
      deposit: formData.deposit ? parseFloat(formData.deposit) : null,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      size: formData.size ? parseFloat(formData.size) : null,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
      availableFrom: formData.availableFrom.toISOString(),
      furnished: formData.furnished === 'true',
      petAllowed: formData.petAllowed === 'true',
      amenityIds: formData.amenities || []
    };
  }
}
```

---

## 5️⃣ Type Layer

### 📁 Location
`/lib/types` hoặc `/types`

### 📝 Naming Convention
```
{Entity}Type.ts

Examples:
- PropertyType.ts
- BookingType.ts
- UserType.ts
```

### 🎯 Responsibility
- Define TypeScript interfaces and types
- Share types across all layers
- Match Prisma models where applicable

### ✅ DO
```typescript
// types/PropertyType.ts

// List item for property grid/list view
export interface PropertyListItem {
  id: string;
  title: string;
  price: number;
  priceFormatted: string;
  location: string;
  propertyType: PropertyType;
  image: string;
  bedrooms: number | null;
  bathrooms: number | null;
  size: number | null;
  availableFrom: Date;
  availableFromFormatted: string;
  landlord: {
    name: string;
    rating: number;
    verified: boolean;
  };
  features: {
    furnished: boolean;
    petAllowed: boolean;
    privateKitchen: boolean;
    privateBathroom: boolean;
  };
}

// Full property details
export interface Property extends PropertyListItem {
  description: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  deposit: number | null;
  utilitiesCost: number | null;
  minStayMonths: number;
  maxStayMonths: number | null;
  images: PropertyImage[];
  amenities: Amenity[];
  rules: PropertyRule[];
  reviews: Review[];
}

// Property filters for search
export interface PropertyFilters {
  city?: string;
  country?: string;
  propertyType?: PropertyType[];
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  furnished?: boolean;
  petAllowed?: boolean;
  availableFrom?: Date;
}

// Form data for creating property
export interface PropertyFormData {
  title: string;
  description: string;
  propertyType: PropertyType;
  monthlyRent: string;
  deposit?: string;
  address: string;
  city: string;
  country: string;
  size?: string;
  bedrooms?: string;
  bathrooms?: string;
  availableFrom: Date;
  furnished: string;
  petAllowed: string;
  amenities?: string[];
}

// DTO for API
export interface CreatePropertyDTO {
  title: string;
  description: string;
  propertyType: PropertyType;
  monthlyRent: number;
  deposit: number | null;
  address: string;
  city: string;
  country: string;
  size: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  availableFrom: string;
  furnished: boolean;
  petAllowed: boolean;
  amenityIds: string[];
}

// Enums
export enum PropertyType {
  APARTMENT = 'APARTMENT',
  STUDIO = 'STUDIO',
  SHARED_ROOM = 'SHARED_ROOM',
  PRIVATE_ROOM = 'PRIVATE_ROOM',
  HOUSE = 'HOUSE',
  STUDENT_RESIDENCE = 'STUDENT_RESIDENCE',
  COLIVING = 'COLIVING'
}

export enum PropertyStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  RENTED = 'RENTED',
  MAINTENANCE = 'MAINTENANCE'
}
```

---

## 🔄 Complete Flow Example

### Scenario: Display property list with filters

```typescript
// 1. UI Layer - Component
// app/properties/page.tsx
'use client';

import { usePropertyList } from '@/hooks/usePropertyList';
import { PropertyCard } from '@/components/property/PropertyCard';

export default function PropertiesPage() {
  const { properties, loading, error, refetch } = usePropertyList({
    city: 'Vienna',
    propertyType: ['STUDIO', 'APARTMENT'],
    priceMax: 1000
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-3 gap-6">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}

// 2. Hook Layer
// hooks/usePropertyList.ts
export function usePropertyList(filters: PropertyFilters) {
  const [properties, setProperties] = useState<PropertyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      
      // Call service
      const rawData = await PropertyService.getList(filters);
      
      // Transform data
      const transformed = PropertyTransform.toUIList(rawData);
      
      setProperties(transformed);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  return { properties, loading, error, refetch: fetchProperties };
}

// 3. Service Layer
// lib/services/PropertyService.ts
export class PropertyService {
  static async getList(filters: PropertyFilters) {
    const response = await fetch('/api/properties/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }

    const data = await response.json();
    return data.properties; // Raw API data
  }
}

// 4. Transform Layer
// lib/transforms/PropertyTransform.ts
export class PropertyTransform {
  static toUIList(rawData: any[]): PropertyListItem[] {
    return rawData.map(item => ({
      id: item.id,
      title: item.title,
      price: item.monthlyRent,
      priceFormatted: `€${item.monthlyRent}/month`,
      location: `${item.city}, ${item.country}`,
      image: item.images[0]?.url || '/placeholder.jpg',
      // ... more transformations
    }));
  }
}

// 5. Type Layer
// types/PropertyType.ts
export interface PropertyListItem {
  id: string;
  title: string;
  price: number;
  priceFormatted: string;
  location: string;
  image: string;
  // ...
}

export interface PropertyFilters {
  city?: string;
  propertyType?: string[];
  priceMax?: number;
  // ...
}
```

---

## 📊 Benefits

### ✅ Separation of Concerns
- Mỗi layer có trách nhiệm rõ ràng
- Dễ debug và maintain

### ✅ Testability
- Test từng layer độc lập
- Mock services trong hook tests
- Mock hooks trong component tests

### ✅ Reusability
- Services reuse across multiple hooks
- Transforms reuse across multiple contexts
- Types shared across entire app

### ✅ Scalability
- Dễ thêm features mới
- Team collaboration tốt hơn
- Clear structure cho new developers

---

**Last Updated**: February 28, 2026
**Version**: 1.0.0
