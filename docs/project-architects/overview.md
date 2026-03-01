# RealDox Rental - Project Architecture Overview

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Architecture Pattern](#architecture-pattern)
- [Folder Structure](#folder-structure)
- [Data Flow](#data-flow)
- [Core Principles](#core-principles)

---

## 🎯 Project Overview

**RealDox Rental** là một nền tảng cho thuê phòng trực tuyến được xây dựng trên Next.js, cung cấp giải pháp toàn diện cho việc tìm kiếm, đặt phòng và quản lý bất động sản cho thuê.

### Key Features
- 🏠 Tìm kiếm và đăng tin cho thuê phòng
- 👥 Quản lý người dùng (Landlord, Tenant, Agent)
- 📅 Hệ thống đặt phòng và thanh toán
- ⭐ Đánh giá và review
- 💬 Tin nhắn giữa landlord và tenant
- 📄 Quản lý hợp đồng và tài liệu
- 🏢 Quản lý Student Residence với đầy đủ tiện ích

### Target Users
- **Tenants (Người thuê)**: Sinh viên, người đi làm tìm phòng cho thuê
- **Landlords (Chủ nhà)**: Cá nhân/công ty cho thuê phòng
- **Agents (Môi giới)**: Người môi giới bất động sản
- **Admins**: Quản trị viên hệ thống

---

## 🛠 Technology Stack

### Frontend
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **State Management**: React Hooks + Server Components
- **Form Handling**: React Hook Form + Zod validation

### Backend
- **Runtime**: Node.js
- **API**: Next.js API Routes (App Router)
- **ORM**: Prisma
- **Database**: PostgreSQL 17
- **Authentication**: NextAuth.js v5

### Additional Tools
- **Email**: Resend
- **File Upload**: (To be decided - Cloudinary/S3)
- **Payment**: (To be decided - Stripe/PayPal)
- **Maps**: (To be decided - Google Maps/Mapbox)

---

## 🏗 Architecture Pattern

Dự án tuân theo **Layered Architecture** với các tầng được tách biệt rõ ràng:

```
┌─────────────────────────────────────────┐
│         UI Layer (Components)           │
│  - Pages, Components, Layouts           │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│         Hook Layer (Custom Hooks)       │
│  - State management                     │
│  - Data fetching coordination           │
│  - Loading/Error handling               │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│         Service Layer (Business Logic)  │
│  - API calls                            │
│  - Business rules                       │
│  - Data validation                      │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│      Transform Layer (Data Mapping)     │
│  - API data → UI data                   │
│  - Type conversions                     │
│  - Data normalization                   │
└───────────────┬─────────────────────────┘
                │
┌───────────────▼─────────────────────────┐
│         Type Layer (TypeScript Types)   │
│  - Interfaces & Types                   │
│  - Type definitions                     │
└─────────────────────────────────────────┘
```

### Layer Responsibilities

#### 1. **UI Layer** (`/components`, `/app`)
- **Responsibility**: Hiển thị giao diện người dùng
- **Rules**:
  - Chỉ gọi hooks để lấy dữ liệu
  - Không trực tiếp gọi service hoặc API
  - Không chứa business logic
  - Focus vào presentation và user interaction

#### 2. **Hook Layer** (`/hooks`)
- **Responsibility**: Quản lý state và điều phối data flow
- **Naming Convention**: `use{Entity}{Action}.ts`
  - Example: `usePropertyList.ts`, `useBookingDetail.ts`
- **Rules**:
  - Gọi service để fetch data
  - Quản lý loading, error, success states
  - Sử dụng transform để convert data nếu cần
  - Trả về data với đúng type cho UI

#### 3. **Service Layer** (`/lib/services`)
- **Responsibility**: Business logic và API communication
- **Naming Convention**: `{Entity}Service.ts`
  - Example: `PropertyService.ts`, `BookingService.ts`
- **Rules**:
  - Chứa logic gọi API
  - Xử lý caching, retry, error handling
  - Trả về raw data từ API
  - Không modify data structure

#### 4. **Transform Layer** (`/lib/transforms`)
- **Responsibility**: Data transformation và mapping
- **Naming Convention**: `{Entity}Transform.ts`
  - Example: `PropertyTransform.ts`, `BookingTransform.ts`
- **Rules**:
  - Convert API data → UI data format
  - Handle null/undefined values
  - Type conversions
  - Data normalization

#### 5. **Type Layer** (`/lib/types` hoặc `/types`)
- **Responsibility**: Type definitions
- **Naming Convention**: `{Entity}Type.ts`
  - Example: `PropertyType.ts`, `BookingType.ts`
- **Rules**:
  - Centralized type definitions
  - Share types across layers
  - Match Prisma schema where applicable

---

## 📁 Folder Structure

```
realdox-rental/
├── app/                          # Next.js App Router
│   ├── (auth)/                  # Auth group routes
│   ├── (public-pages)/          # Public routes
│   │   ├── properties/
│   │   ├── search/
│   │   └── blog/
│   ├── (protected)/             # Protected routes
│   │   ├── dashboard/
│   │   ├── bookings/
│   │   └── messages/
│   ├── api/                     # API routes
│   │   ├── properties/
│   │   ├── bookings/
│   │   └── auth/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/                   # React components
│   ├── ui/                      # Shadcn/ui components
│   ├── custom/                  # Custom components
│   │   ├── property/
│   │   ├── booking/
│   │   ├── header/
│   │   └── footer/
│   └── shared/                  # Shared components
│
├── hooks/                        # Custom React hooks
│   ├── usePropertyList.ts
│   ├── usePropertyDetail.ts
│   ├── useBookingCreate.ts
│   └── README.md
│
├── lib/                          # Core libraries
│   ├── services/                # Service layer
│   │   ├── PropertyService.ts
│   │   ├── BookingService.ts
│   │   ├── UserService.ts
│   │   └── README.md
│   ├── transforms/              # Transform layer
│   │   ├── PropertyTransform.ts
│   │   ├── BookingTransform.ts
│   │   └── README.md
│   ├── utils/                   # Utility functions
│   ├── helpers/                 # Helper functions
│   └── prisma.ts               # Prisma client
│
├── types/                        # TypeScript types
│   ├── PropertyType.ts
│   ├── BookingType.ts
│   ├── UserType.ts
│   └── auth.ts
│
├── auth/                         # NextAuth configuration
│   ├── auth.ts
│   ├── auth.config.ts
│   ├── providers/
│   ├── callbacks/
│   └── adapters/
│
├── prisma/                       # Prisma ORM
│   ├── schema.prisma
│   └── migrations/
│
├── validations/                  # Zod schemas
│   ├── property.ts
│   ├── booking.ts
│   └── auth.ts
│
├── public/                       # Static assets
│   └── image/
│
└── docs/                         # Documentation
    ├── project-architects/
    ├── api/
    └── database/
```

---

## 🔄 Data Flow

### 1. Client-Side Data Fetching (CSR)

```typescript
// 1. UI Layer - Component
function PropertyListPage() {
  const { properties, loading, error } = usePropertyList(filters);
  
  if (loading) return <Skeleton />;
  if (error) return <Error message={error} />;
  
  return <PropertyGrid properties={properties} />;
}

// 2. Hook Layer - Custom Hook
function usePropertyList(filters: PropertyFilters) {
  const [data, setData] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi service
        const rawData = await PropertyService.getList(filters);
        
        // Transform data
        const transformedData = PropertyTransform.toUIList(rawData);
        
        setData(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [filters]);
  
  return { properties: data, loading, error };
}

// 3. Service Layer
class PropertyService {
  static async getList(filters: PropertyFilters) {
    const response = await fetch('/api/properties', {
      method: 'POST',
      body: JSON.stringify(filters)
    });
    
    return response.json(); // Raw API data
  }
}

// 4. Transform Layer
class PropertyTransform {
  static toUIList(rawData: any[]): Property[] {
    return rawData.map(item => ({
      id: item.id,
      title: item.title,
      price: item.monthlyRent,
      // ... more transformations
    }));
  }
}
```

### 2. Server-Side Data Fetching (SSR)

```typescript
// app/properties/[id]/page.tsx
async function PropertyDetailPage({ params }: { params: { id: string } }) {
  // Direct service call in Server Component
  const property = await PropertyService.getById(params.id);
  
  return <PropertyDetail property={property} />;
}
```

### 3. API Route Flow

```typescript
// app/api/properties/route.ts
export async function POST(request: Request) {
  try {
    // 1. Parse & validate request
    const body = await request.json();
    const validated = propertySearchSchema.parse(body);
    
    // 2. Call service
    const properties = await PropertyService.search(validated);
    
    // 3. Return response
    return Response.json({ success: true, data: properties });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}
```

---

## 🎯 Core Principles

### 1. **Separation of Concerns**
- Mỗi layer có trách nhiệm riêng biệt
- Không mixing business logic với UI logic
- Dễ dàng test và maintain từng layer độc lập

### 2. **Type Safety**
- TypeScript cho toàn bộ codebase
- Prisma types tự động generate
- Zod validation cho runtime type checking

### 3. **Reusability**
- Services có thể reuse ở nhiều nơi
- Transforms có thể reuse cho nhiều UI contexts
- Components được thiết kế modular

### 4. **Scalability**
- Dễ dàng thêm features mới
- Clear structure cho team collaboration
- Documented conventions

### 5. **Performance**
- Server Components mặc định (Next.js App Router)
- Client Components chỉ khi cần interactivity
- Optimistic updates cho better UX
- Image optimization với next/image

### 6. **Security**
- NextAuth.js cho authentication
- Role-based access control
- Input validation với Zod
- SQL injection protection với Prisma

---

## 📚 Related Documentation

- [Database Schema](./database-schema.md)
- [API Documentation](./api-documentation.md)
- [Hooks Convention](../../hooks/README.md)
- [Services Convention](../../lib/services/README.md)
- [Transforms Convention](../../lib/transforms/README.md)
- [Component Guidelines](./component-guidelines.md)

---

## 🔄 Next Steps

1. ✅ Setup Prisma schema
2. ⏳ Generate Prisma client
3. ⏳ Create base services
4. ⏳ Create base hooks
5. ⏳ Build core components
6. ⏳ Implement authentication flow
7. ⏳ Build property listing features
8. ⏳ Implement booking system

---

**Last Updated**: February 28, 2026
**Version**: 1.0.0
