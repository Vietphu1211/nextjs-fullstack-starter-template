# Database Schema Documentation

## 📋 Overview

RealDox Rental sử dụng PostgreSQL 17 với Prisma ORM. Database schema được thiết kế dựa trên nghiên cứu từ **rentals.ca** (Canada's leading rental platform), **HousingAnywhere** và các nền tảng cho thuê bất động sản hàng đầu.

### Target Audience
- ✅ **All Tenants**: Students, Working Professionals, Families, Retirees
- ✅ **All Property Types**: Apartments, Condos, Houses, Townhouses, Studios, Rooms
- ✅ **Complete Rental Flow**: Search → View → Apply → Book → Move In → Review

---

## 🗂 Schema Structure

### Core Modules

```
┌─────────────────────────────────────────────┐
│          AUTHENTICATION & USERS             │
│  User, Account, Session, Tokens             │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┬───────────┐
        │           │           │           │
┌───────▼──────┐ ┌──▼────────┐ ┌▼────────┐ ┌▼────────────┐
│  PROPERTIES  │ │  BOOKINGS │ │ REVIEWS │ │  MESSAGING  │
│  Property    │ │  Booking  │ │ Review  │ │Conversation │
│  Images      │ │  Payment  │ │         │ │  Message    │
│  Amenities   │ │  Contract │ │         │ │             │
│  FloorPlans  │ │           │ │         │ │             │
└──────┬───────┘ └───────────┘ └─────────┘ └─────────────┘
       │
       ├──────────────┬─────────────┐
       │              │             │
┌──────▼────────┐ ┌───▼──────┐ ┌────▼───────────┐
│  APPLICATION  │ │ VIEWING  │ │   DOCUMENTS    │
│RentalApp      │ │PropertyV │ │   Document     │
└───────────────┘ └──────────┘ └────────────────┘
```

---

## 👤 Authentication & User Management

### User Model
**Purpose**: Quản lý tất cả users (Landlord, Tenant, Agent, Admin) với đầy đủ thông tin

```prisma
model User {
  id                  String              @id @default(cuid())
  email               String?             @unique
  name                String?
  role                UserRole            @default(TENANT)
  phone               String?
  dateOfBirth         DateTime?
  nationality         String?
  
  // Tenant specific fields
  employmentStatus      String?           // "EMPLOYED", "STUDENT", "RETIRED", "SELF_EMPLOYED"
  employerName          String?
  monthlyIncome         Float?
  creditScore           Int?
  hasPets               Boolean           @default(false)
  petDetails            String?           // Type, breed, size
  smokingStatus         String?           // "NON_SMOKER", "SMOKER", "OCCASIONAL"
  numberOfOccupants     Int?              // Số người dự kiến ở
  preferredMoveInDate   DateTime?
  emergencyContactName  String?
  emergencyContactPhone String?
  currentAddress        String?
  reasonForMoving       String?
  studentStatus         Boolean           @default(false)
  universityName        String?
  
  // Background checks
  backgroundCheckStatus VerificationStatus @default(UNVERIFIED)
  backgroundCheckDate   DateTime?
  
  // Landlord specific
  companyName           String?
  businessLicense       String?
  taxId                 String?
  averageRating         Float?            @default(0)
  totalReviews          Int?              @default(0)
  responseRate          Float?            // Tỷ lệ phản hồi (%)
  responseTime          Int?              // Thời gian phản hồi (hours)
  verificationStatus    VerificationStatus @default(UNVERIFIED)
  verifiedAt            DateTime?
}

enum UserRole {
  ADMIN      // Quản trị viên
  LANDLORD   // Chủ nhà
  TENANT     // Người thuê
  AGENT      // Môi giới
}
```

**Key Features**:
- ✅ **Multi-role support**: Một user có thể vừa là landlord vừa là tenant
- ✅ **Complete tenant profile**: Employment, income, credit score, pets
- ✅ **Landlord verification**: Business license, tax ID, ratings
- ✅ **Background checks**: Credit & criminal background
- ✅ **Emergency contacts**: For safety

### Account Model
**Purpose**: OAuth connections (Google, Facebook, etc.)

### Session Model
**Purpose**: User session management với NextAuth.js

---

## 🏠 Property Management

### Property Model
**Purpose**: Core model cho TẤT CẢ loại bất động sản cho thuê

```prisma
model Property {
  id                String           @id @default(cuid())
  title             String
  description       String           @db.Text
  propertyType      PropertyType
  status            PropertyStatus   @default(DRAFT)
  
  // Pricing (Comprehensive)
  monthlyRent       Float
  deposit           Float?
  depositMonths     Int              @default(1)  // 1-3 months
  utilitiesIncluded Boolean          @default(false)
  utilitiesCost     Float?
  hydro             Boolean          @default(false)
  heat              Boolean          @default(false)
  water             Boolean          @default(false)
  internet          Boolean          @default(false)
  
  // Location
  address           String
  city              String
  state             String?
  country           String
  postalCode        String?
  neighborhood      String?
  latitude          Float?
  longitude         Float?
  
  // Building Details (NEW)
  yearBuilt         Int?
  numberOfUnits     Int?             // Total units in building
  buildingName      String?
  floor             Int?
  totalFloors       Int?
  unitNumber        String?
  
  // Property Size
  size              Float?           // square feet/meters
  bedrooms          Int?
  bathrooms         Float?           // Can be 1.5, 2.5, etc.
  halfBathrooms     Int?
  maxOccupants      Int              @default(1)
  
  // Lease Terms (NEW)
  leaseTerm         LeaseTerm        @default(ONE_YEAR)
  availableFrom     DateTime
  minStayMonths     Int              @default(1)
  maxStayMonths     Int?
  shortTermAvailable Boolean         @default(false)
  
  // Features
  furnished         Boolean          @default(false)
  petAllowed        Boolean          @default(false)
  petDeposit        Float?
  petRent           Float?           // Monthly pet rent
  smokingAllowed    Boolean          @default(false)
  
  // Kitchen & Bathroom
  privateKitchen    Boolean          @default(false)
  privateBathroom   Boolean          @default(false)
  ensuiteBathroom   Boolean          @default(false)
  
  // Laundry (NEW)
  laundryType       LaundryType      @default(NONE)
  laundryInUnit     Boolean          @default(false)
  
  // Parking (NEW - Important!)
  parkingType       ParkingType      @default(NONE)
  parkingSpots      Int              @default(0)
  parkingCost       Float?
  visitorParking    Boolean          @default(false)
  evCharging        Boolean          @default(false)
  
  // Climate Control (NEW)
  airConditioning   Boolean          @default(false)
  heating           Boolean          @default(false)
  heatingType       String?          // "Gas", "Electric", "Baseboard"
  
  // Storage & Space (NEW)
  balcony           Boolean          @default(false)
  patio             Boolean          @default(false)
  yard              Boolean          @default(false)
  storage           Boolean          @default(false)
  storageType       String?          // "Locker", "In-unit"
  
  // Security (NEW)
  securitySystem    Boolean          @default(false)
  securedEntry      Boolean          @default(false)
  doorman           Boolean          @default(false)
  concierge         Boolean          @default(false)
  
  // Accessibility (NEW)
  wheelchairAccessible Boolean       @default(false)
  elevator          Boolean          @default(false)
  
  // Contact & Management (NEW)
  contactEmail      String?
  contactPhone      String?
  managedBy         String?
  
  // Meta
  viewCount         Int              @default(0)
  featured          Boolean          @default(false)
  verified          Boolean          @default(false)
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
  publishedAt       DateTime?
}

enum PropertyType {
  APARTMENT       // Căn hộ chung cư
  CONDO           // Căn hộ cao cấp (NEW)
  TOWNHOUSE       // Nhà liền kề (NEW)
  HOUSE           // Nhà riêng (NEW)
  DUPLEX          // Nhà song lập (NEW)
  STUDIO          // Studio
  BASEMENT        // Tầng hầm cho thuê (NEW)
  ROOM            // Phòng đơn (shared house)
  LOFT            // Loft (NEW)
  BACHELOR        // Bachelor apartment (NEW)
}

enum PropertyStatus {
  DRAFT           // Bản nháp
  ACTIVE          // Đang hoạt động
  INACTIVE        // Tạm ngưng
  RENTED          // Đã cho thuê
  PENDING         // Đang chờ (NEW)
  MAINTENANCE     // Đang bảo trì
  ARCHIVED        // Đã lưu trữ (NEW)
}

enum LeaseTerm {
  MONTH_TO_MONTH  // Thuê theo tháng
  SIX_MONTHS      // 6 tháng
  ONE_YEAR        // 1 năm
  TWO_YEARS       // 2 năm
  FLEXIBLE        // Linh hoạt
}

enum LaundryType {
  IN_UNIT         // Trong căn
  IN_BUILDING     // Trong tòa nhà
  SHARED          // Dùng chung
  NONE            // Không có
}

enum ParkingType {
  UNDERGROUND     // Hầm để xe
  SURFACE         // Bãi đỗ mặt đất
  STREET          // Đỗ đường
  GARAGE          // Garage
  COVERED         // Có mái che
  NONE            // Không có
}
```

**Key Features**:
- ✅ **10 Property Types**: Apartments, Condos, Houses, Townhouses, Studios, etc.
- ✅ **Detailed Pricing**: Separate utilities (hydro, heat, water, internet)
- ✅ **Building Information**: Year built, number of units, floor details
- ✅ **Comprehensive Parking**: Type, spots, cost, EV charging
- ✅ **Laundry Options**: In-unit, in-building, shared, or none
- ✅ **Climate Control**: AC, heating type
- ✅ **Storage & Outdoor**: Balcony, patio, yard, storage locker
- ✅ **Security Features**: Security system, secured entry, doorman
- ✅ **Accessibility**: Wheelchair accessible, elevator
- ✅ **Flexible Lease Terms**: Month-to-month to 2 years

### PropertyImage Model
```prisma
model PropertyImage {
  id         String   @id @default(cuid())
  propertyId String
  url        String
  caption    String?
  alt        String?
  order      Int      @default(0)
  isPrimary  Boolean  @default(false)
  roomType   String?  // "Living Room", "Kitchen", "Bedroom", "Bathroom", "Exterior"
}
```

**Features**:
- ✅ Multiple images per property
- ✅ Image ordering for slideshow
- ✅ Primary image designation
- ✅ Room type categorization (NEW)
- ✅ Alt text for accessibility (NEW)
- ✅ Optional captions

### FloorPlan Model (NEW) ✨
```prisma
model FloorPlan {
  id          String   @id @default(cuid())
  propertyId  String
  name        String   // "1 Bedroom", "2 Bedroom + Den"
  bedrooms    Int
  bathrooms   Float
  size        Float?   // Square feet
  rent        Float
  available   Boolean  @default(true)
  imageUrl    String?
  description String?
  order       Int      @default(0)
}
```

**Purpose**: Cho phép landlords có nhiều loại unit khác nhau trong cùng một tòa nhà

**Use Cases**:
- Apartment building với nhiều loại căn khác nhau
- Mỗi floor plan có giá và diện tích riêng
- Show available/unavailable units
- Multiple layouts cho cùng một property

### Amenity System
```prisma
model Amenity {
  id         String            @id @default(cuid())
  name       String            @unique
  icon       String?
  category   String?           // "Basic", "Kitchen", "Safety", "Entertainment", "Building", "Outdoor"
  description String?
}

model PropertyAmenity {
  id         String   @id @default(cuid())
  propertyId String
  amenityId  String
  
  @@unique([propertyId, amenityId])
}
```

**Amenity Categories**:
- **Basic**: WiFi, Air Conditioning, Heating, Cable TV
- **Kitchen**: Dishwasher, Microwave, Oven, Refrigerator
- **Safety**: Smoke Detector, Fire Extinguisher, Security Camera, Sprinkler System
- **Entertainment**: TV, Game Room, Pool Table, Home Theater
- **Building**: Gym, Swimming Pool, Sauna, Rooftop Terrace, Business Center
- **Outdoor**: Playground, BBQ Area, Garden, Dog Park
- **Services**: Concierge, Doorman, Package Room, Bike Storage

### PropertyRule Model
```prisma
model PropertyRule {
  id          String   @id @default(cuid())
  propertyId  String
  title       String
  description String?
  order       Int      @default(0)
}
```

**Example Rules**:
- No smoking indoors
- No parties
- Quiet hours: 10 PM - 8 AM
- Guest policy

---

## 📝 Rental Application System (NEW) ✨

### RentalApplication Model
**Purpose**: Quản lý toàn bộ quy trình đăng ký thuê nhà

```prisma
model RentalApplication {
  id              String            @id @default(cuid())
  propertyId      String
  tenantId        String
  status          ApplicationStatus @default(DRAFT)
  
  // Application Details
  desiredMoveIn   DateTime
  desiredLeaseTerm String           // "1 Year", "2 Years", etc.
  
  // Occupants
  numberOfAdults  Int               @default(1)
  numberOfChildren Int              @default(0)
  
  // Current Housing
  currentAddress  String?
  currentLandlord String?
  currentLandlordPhone String?
  reasonForLeaving String?
  
  // Employment
  employmentStatus String?
  employerName    String?
  employerContact String?
  position        String?
  monthlyIncome   Float?
  
  // References
  reference1Name  String?
  reference1Phone String?
  reference1Relation String?
  reference2Name  String?
  reference2Phone String?
  reference2Relation String?
  
  // Pets
  hasPets         Boolean           @default(false)
  petDetails      String?
  
  // Additional Info
  additionalNotes String?           @db.Text
  
  // Landlord Response
  reviewedAt      DateTime?
  reviewNotes     String?           @db.Text
  rejectionReason String?
  
  // Meta
  submittedAt     DateTime?
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt
}

enum ApplicationStatus {
  DRAFT           // Nháp
  SUBMITTED       // Đã nộp
  UNDER_REVIEW    // Đang xem xét
  APPROVED        // Được chấp nhận
  REJECTED        // Bị từ chối
  CANCELLED       // Đã hủy
  EXPIRED         // Hết hạn
}
```

**Application Flow**:
1. Tenant tạo application → `DRAFT`
2. Tenant submit application → `SUBMITTED`
3. Landlord reviews → `UNDER_REVIEW`
4. Decision made → `APPROVED` or `REJECTED`
5. Tenant can cancel anytime → `CANCELLED`
6. Auto-expire after X days → `EXPIRED`

**Key Features**:
- ✅ **Complete tenant screening**: Employment, income, references
- ✅ **Current housing info**: Landlord reference check
- ✅ **Multiple references**: 2 personal/professional references
- ✅ **Pet information**: For pet-friendly properties
- ✅ **Landlord notes**: Internal review comments
- ✅ **Rejection tracking**: Record why application was rejected

---

## 👁️ Property Viewing System (NEW) ✨

### PropertyViewing Model
**Purpose**: Quản lý lịch hẹn xem nhà

```prisma
model PropertyViewing {
  id              String        @id @default(cuid())
  propertyId      String
  tenantId        String
  
  // Viewing Details
  scheduledDate   DateTime
  duration        Int           @default(30) // minutes
  status          ViewingStatus @default(REQUESTED)
  
  // Notes
  tenantNotes     String?
  landlordNotes   String?
  
  // Confirmation
  confirmedAt     DateTime?
  cancelledAt     DateTime?
  cancellationReason String?
  
  // Feedback
  attended        Boolean?
  feedback        String?       @db.Text
  
  // Meta
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

enum ViewingStatus {
  REQUESTED       // Tenant yêu cầu
  CONFIRMED       // Landlord xác nhận
  CANCELLED       // Đã hủy
  COMPLETED       // Đã hoàn thành
  NO_SHOW         // Không đến
}
```

**Viewing Flow**:
1. Tenant requests viewing → `REQUESTED`
2. Landlord confirms time → `CONFIRMED`
3. Either party cancels → `CANCELLED`
4. After viewing date:
   - Tenant attended → `COMPLETED`
   - Tenant didn't show → `NO_SHOW`

**Key Features**:
- ✅ **Flexible scheduling**: Customizable duration (15, 30, 60 min)
- ✅ **Two-way notes**: Both parties can add notes
- ✅ **Cancellation tracking**: Record why cancelled
- ✅ **Attendance tracking**: Track no-shows
- ✅ **Post-viewing feedback**: Tenant can leave feedback

**Use Cases**:
- Schedule open houses
- Private viewings
- Virtual tours (via video call)
- Track tenant interest level

---

## 📅 Booking & Payment System

### Booking Model
```prisma
model Booking {
  id              String        @id @default(cuid())
  propertyId      String
  tenantId        String
  
  // Dates
  moveInDate      DateTime
  moveOutDate     DateTime
  leaseTerm       String        // "1 Year", "Month-to-Month"
  
  // Status
  status          BookingStatus @default(PENDING)
  
  // Pricing (Enhanced)
  monthlyRent     Float
  deposit         Float
  firstMonthRent  Float
  lastMonthRent   Float?
  petDeposit      Float?
  totalAmount     Float
  
  // Payment Terms (NEW)
  rentDueDay      Int           @default(1) // Day of month rent is due
  
  // Cancellation
  cancelledAt     DateTime?
  cancelledBy     String?       // "TENANT" or "LANDLORD"
  cancellationReason String?
  refundAmount    Float?
  
  // Meta
  confirmedAt     DateTime?
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
  
  payments        Payment[]
  contract        Contract?
}

enum BookingStatus {
  PENDING         // Chờ xác nhận
  CONFIRMED       // Đã xác nhận
  CANCELLED       // Đã hủy
  REJECTED        // Bị từ chối
  COMPLETED       // Đã hoàn thành
  EXPIRED         // Hết hạn (NEW)
}
```

**Booking Flow**:
1. Tenant creates booking → `PENDING`
2. Landlord accepts → `CONFIRMED`
3. Payment completed → Contract generated
4. Move-in date passed → Booking active
5. Move-out date passed → `COMPLETED`
6. Can be `CANCELLED` by either party
7. Auto-expire if not confirmed → `EXPIRED`

**Key Enhancements**:
- ✅ **Detailed pricing breakdown**: First month, last month, pet deposit
- ✅ **Flexible lease terms**: Recorded as string for flexibility
- ✅ **Payment schedule**: Rent due day customization
- ✅ **Cancellation tracking**: Who cancelled and why
- ✅ **Refund management**: Track refund amounts

### Payment Model
```prisma
model Payment {
  id              String        @id @default(cuid())
  bookingId       String
  amount          Float
  paymentType     String        // "DEPOSIT", "RENT", "PET_DEPOSIT", "UTILITIES", "FEE", "LATE_FEE"
  description     String?
  status          PaymentStatus
  paymentMethod   String?       // "CREDIT_CARD", "DEBIT_CARD", "BANK_TRANSFER", "CHECK", "CASH"
  
  // Transaction Info (NEW)
  transactionId   String?
  receiptUrl      String?
  
  // Dates (Enhanced)
  dueDate         DateTime?
  paidAt          DateTime?
  createdAt       DateTime      @default(now())
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
  OVERDUE         // (NEW) Past due date
}
```

**Payment Types**:
- **DEPOSIT**: Security deposit (refundable)
- **RENT**: Monthly rent payment
- **PET_DEPOSIT**: Pet deposit (NEW)
- **UTILITIES**: Utility bills
- **FEE**: Platform/service fees
- **LATE_FEE**: Late payment penalty (NEW)

**Key Enhancements**:
- ✅ **Receipt generation**: Store receipt URL
- ✅ **Due date tracking**: Know when payment is due
- ✅ **Overdue status**: Auto-mark overdue payments
- ✅ **Multiple payment methods**: Credit card, bank transfer, check, cash
- ✅ **Payment descriptions**: Detailed notes

### Contract Model
```prisma
model Contract {
  id              String   @id @default(cuid())
  bookingId       String   @unique
  
  contractUrl     String?
  contractPdf     String?  // Generated PDF URL (NEW)
  
  // Signing (Enhanced with digital signatures)
  signedByTenant  Boolean  @default(false)
  tenantSignedAt  DateTime?
  tenantSignature String?  // Digital signature data
  
  signedByLandlord Boolean @default(false)
  landlordSignedAt DateTime?
  landlordSignature String? // Digital signature data
  
  // Full execution (NEW)
  fullyExecuted   Boolean  @default(false)
  executedAt      DateTime?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

**Digital Signing Flow**:
1. Contract generated after booking confirmed
2. Tenant signs → `signedByTenant = true`, save signature
3. Landlord signs → `signedByLandlord = true`, save signature
4. Both signed → `fullyExecuted = true`, record `executedAt`

**Key Features**:
- ✅ **Digital signatures**: Save signature data (base64 image or e-signature ID)
- ✅ **Separate signing**: Track each party independently
- ✅ **Full execution tracking**: Know when contract is legally binding
- ✅ **PDF generation**: Store both source and generated PDF
- ✅ **Audit trail**: Timestamp for each signature

---

## ⭐ Review & Rating System

### Review Model
```prisma
model Review {
  id          String   @id @default(cuid())
  propertyId  String
  tenantId    String
  landlordId  String   // (NEW) Link to landlord
  
  // Ratings (1-5 scale)
  overallRating Float
  cleanliness   Float?
  accuracy      Float?
  communication Float?
  location      Float?
  value         Float?
  condition     Float?   // Property condition (NEW)
  
  // Review Content (Enhanced)
  title       String?
  comment     String   @db.Text
  pros        String?  @db.Text  // (NEW)
  cons        String?  @db.Text  // (NEW)
  
  // Recommendation (NEW)
  wouldRecommend Boolean?
  
  // Landlord Response
  landlordResponse String? @db.Text
  respondedAt      DateTime?
  
  // Verification & Moderation (NEW)
  verified    Boolean  @default(false)
  helpful     Int      @default(0)  // Helpful count
  reported    Boolean  @default(false)
  
  // Meta
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Rating Categories**:
- **Overall**: Tổng quan (required)
- **Cleanliness**: Độ sạch sẽ
- **Accuracy**: Độ chính xác so với mô tả
- **Communication**: Giao tiếp với landlord
- **Location**: Vị trí, tiện ích xung quanh
- **Value**: Giá trị so với giá tiền
- **Condition**: Tình trạng property (NEW)

**Key Enhancements**:
- ✅ **Pros & Cons**: Structured feedback
- ✅ **Would Recommend**: Yes/No recommendation
- ✅ **Verification**: Mark verified reviews (from actual tenants)
- ✅ **Helpful votes**: Community can vote reviews as helpful
- ✅ **Moderation**: Flag inappropriate reviews
- ✅ **Landlord tracking**: Direct link to landlord for landlord ratings

---

## 💬 Messaging System

### Conversation Model
```prisma
model Conversation {
  id           String                    @id @default(cuid())
  propertyId   String?                   // Optional: related to property
  subject      String?                   // (NEW) Conversation subject
  lastMessageAt DateTime?                // (NEW) For sorting
  createdAt    DateTime                  @default(now())
  updatedAt    DateTime                  @updatedAt
  participants ConversationParticipant[]
  messages     Message[]
}

model ConversationParticipant {
  id             String       @id @default(cuid())
  conversationId String
  userId         String
  role           String?      // "TENANT", "LANDLORD", "AGENT" (NEW)
  joinedAt       DateTime     @default(now())
  lastReadAt     DateTime?
  muted          Boolean      @default(false)  // (NEW) Mute notifications
  
  @@unique([conversationId, userId])
}

model Message {
  id             String       @id @default(cuid())
  conversationId String
  senderId       String
  content        String       @db.Text
  attachments    String?      // JSON array of URLs (NEW)
  
  isRead         Boolean      @default(false)
  readAt         DateTime?    // (NEW)
  
  isDeleted      Boolean      @default(false)  // (NEW) Soft delete
  deletedAt      DateTime?    // (NEW)
  
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
}
```

**Features**:
- ✅ **Multi-participant**: Group conversations (tenant, landlord, agent)
- ✅ **Property context**: Link conversations to specific properties
- ✅ **Subject line**: Clear conversation topics
- ✅ **Read receipts**: Track when messages are read
- ✅ **Attachments**: Images, PDFs (floor plans, contracts, etc.)
- ✅ **Mute notifications**: User can mute conversations
- ✅ **Soft delete**: Messages can be deleted (keep for audit)
- ✅ **Sorting**: `lastMessageAt` for inbox sorting
- ✅ **Role tracking**: Know who's who in conversation

**Use Cases**:
1. **Initial Inquiry**: Tenant asks about property
2. **Viewing Scheduling**: Coordinate viewing time
3. **Application Discussion**: Questions about application
4. **Negotiation**: Discuss terms, rent, move-in date
5. **During Tenancy**: Maintenance requests, issues
6. **Move-out**: Coordination, inspection, deposit return

---

## 📄 Document Verification

### Document Model
```prisma
model Document {
  id             String             @id @default(cuid())
  userId         String
  documentType   DocumentType
  fileName       String
  fileUrl        String
  fileSize       Int?               // in bytes (NEW)
  mimeType       String?            // (NEW)
  
  // Verification (Enhanced)
  verificationStatus VerificationStatus
  verifiedBy     String?            // Admin ID who verified (NEW)
  verifiedAt     DateTime?
  rejectionReason String?           // (NEW)
  
  // Dates
  uploadedAt     DateTime           @default(now())
  expiresAt      DateTime?          // For documents that expire (NEW)
}

enum DocumentType {
  PROOF_OF_IDENTITY      // ID card, Passport, Driver's License
  PROOF_OF_INCOME        // Pay stubs, Bank statements, Tax returns
  PROOF_OF_EMPLOYMENT    // Employment letter, Contract (NEW)
  PROOF_OF_ENROLLMENT    // Student ID, University letter
  CREDIT_REPORT          // Credit check (NEW)
  REFERENCE_LETTER       // From previous landlord (NEW)
  BACKGROUND_CHECK       // Criminal background check (NEW)
  OTHER
}
```

**Document Types Explained**:

1. **PROOF_OF_IDENTITY**: 
   - Government-issued ID, Passport, Driver's License
   - Required for all tenants

2. **PROOF_OF_INCOME**:
   - Recent pay stubs (last 3 months)
   - Bank statements
   - Tax returns
   - Required to verify income claim

3. **PROOF_OF_EMPLOYMENT**:
   - Employment letter from employer
   - Employment contract
   - Shows job stability

4. **PROOF_OF_ENROLLMENT** (Students):
   - Student ID card
   - University enrollment letter
   - For student-specific properties

5. **CREDIT_REPORT**:
   - Credit score and history
   - Shows financial responsibility

6. **REFERENCE_LETTER**:
   - Letter from previous landlord
   - Character reference
   - Rental history

7. **BACKGROUND_CHECK**:
   - Criminal background check
   - For high-value properties

**Verification Required For**:
- ✅ Tenants applying for properties
- ✅ Landlords listing properties (business verification)
- ✅ High-value transactions
- ✅ Premium properties

**Key Features**:
- ✅ **File metadata**: Size, MIME type for validation
- ✅ **Expiration tracking**: Auto-notify when documents expire
- ✅ **Audit trail**: Who verified and when
- ✅ **Rejection reasons**: Clear communication why rejected
- ✅ **Multiple document types**: Comprehensive verification

---

## ❤️ Favorites & Search

### FavoriteProperty Model
```prisma
model FavoriteProperty {
  id         String   @id @default(cuid())
  userId     String
  propertyId String
  notes      String?  // (NEW) Personal notes about property
  createdAt  DateTime @default(now())
  
  @@unique([userId, propertyId])
}
```

**Features**:
- ✅ Save unlimited favorite properties
- ✅ Personal notes for each favorite
- ✅ Quick access to saved properties

### SavedSearch Model
```prisma
model SavedSearch {
  id          String   @id @default(cuid())
  userId      String
  name        String
  searchQuery String   @db.Text  // JSON string
  alertEnabled Boolean @default(false)  // (NEW) Email alerts
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Example Saved Search**:
```json
{
  "city": "Toronto",
  "propertyType": ["CONDO", "APARTMENT"],
  "priceMin": 1500,
  "priceMax": 2500,
  "bedrooms": 2,
  "furnished": true,
  "petAllowed": true,
  "parkingRequired": true,
  "laundryType": "IN_UNIT"
}
```

**Key Features**:
- ✅ **Save complex searches**: Multiple filters
- ✅ **Email alerts**: Get notified of new matches (NEW)
- ✅ **Named searches**: "Downtown 2BR", "Pet-friendly condos"
- ✅ **Quick filters**: One-click to apply saved search

---

## 🔍 Indexes

### Performance Indexes

```prisma
// User indexes
@@index([email])
@@index([role])
@@index([verificationStatus])

// Property indexes
@@index([landlordId])
@@index([city, country])
@@index([status])
@@index([availableFrom])
@@index([propertyType])
@@index([monthlyRent])
@@index([bedrooms])
@@index([featured])

// RentalApplication indexes
@@index([propertyId])
@@index([tenantId])
@@index([status])

// PropertyViewing indexes
@@index([propertyId])
@@index([tenantId])
@@index([scheduledDate])
@@index([status])

// Booking indexes
@@index([propertyId])
@@index([tenantId])
@@index([status])
@@index([moveInDate])
@@index([moveOutDate])

// Payment indexes
@@index([bookingId])
@@index([status])
@@index([dueDate])

// Review indexes
@@index([propertyId])
@@index([tenantId])
@@index([landlordId])
@@index([overallRating])
@@index([createdAt])

// Document indexes
@@index([userId])
@@index([documentType])
@@index([verificationStatus])

// Conversation indexes
@@index([propertyId])
@@index([lastMessageAt])

// ConversationParticipant indexes
@@index([userId])
@@index([conversationId])

// Message indexes
@@index([conversationId])
@@index([senderId])
@@index([createdAt])

// FavoriteProperty indexes
@@index([userId])

// SavedSearch indexes
@@index([userId])

// PropertyImage indexes
@@index([propertyId])
@@index([isPrimary])

// FloorPlan indexes
@@index([propertyId])
```

---

## 🔐 Security Considerations

1. **Cascade Deletes**: 
   - User deletion → Cascade to bookings, reviews, messages
   - Property deletion → Cascade to images, amenities, bookings

2. **Unique Constraints**:
   - Email unique per user
   - Property-Amenity combination unique
   - User-Property favorite combination unique

3. **Required Fields**:
   - Critical business fields marked as required
   - Optional fields for flexibility

4. **Validation**:
   - Enum types for constrained values
   - Default values for common cases
   - DateTime tracking for audit

---

## 📊 Common Queries

### Find Available Properties with Filters
```typescript
const availableProperties = await prisma.property.findMany({
  where: {
    status: 'ACTIVE',
    availableFrom: { lte: new Date() },
    city: 'Toronto',
    propertyType: { in: ['CONDO', 'APARTMENT'] },
    monthlyRent: { gte: 1500, lte: 2500 },
    bedrooms: { gte: 2 },
    petAllowed: true,
    parkingSpots: { gt: 0 },
    laundryType: 'IN_UNIT',
    bookings: {
      none: {
        status: 'CONFIRMED',
        moveOutDate: { gte: new Date() }
      }
    }
  },
  include: {
    images: { 
      where: { isPrimary: true },
      take: 1
    },
    landlord: { 
      select: { 
        name: true, 
        averageRating: true,
        verificationStatus: true,
        responseRate: true
      } 
    },
    amenities: {
      include: {
        amenity: true
      }
    },
    _count: {
      select: {
        reviews: true
      }
    }
  },
  orderBy: [
    { featured: 'desc' },
    { createdAt: 'desc' }
  ],
  take: 20
});
```

### Get Property with Full Details
```typescript
const propertyDetail = await prisma.property.findUnique({
  where: { id: propertyId },
  include: {
    images: { orderBy: { order: 'asc' } },
    amenities: {
      include: {
        amenity: true
      }
    },
    rules: { orderBy: { order: 'asc' } },
    floorPlans: {
      where: { available: true },
      orderBy: { order: 'asc' }
    },
    landlord: {
      select: {
        id: true,
        name: true,
        image: true,
        companyName: true,
        averageRating: true,
        totalReviews: true,
        responseRate: true,
        responseTime: true,
        verificationStatus: true,
        verifiedAt: true
      }
    },
    reviews: {
      include: {
        tenant: {
          select: { name: true, image: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    },
    _count: {
      select: {
        reviews: true,
        bookings: true
      }
    }
  }
});
```

### Get Booking with Complete Information
```typescript
const booking = await prisma.booking.findUnique({
  where: { id: bookingId },
  include: {
    property: { 
      include: { 
        images: { where: { isPrimary: true } },
        landlord: {
          select: { name: true, email: true, phone: true }
        }
      } 
    },
    tenant: { 
      select: { 
        name: true, 
        email: true, 
        phone: true,
        emergencyContactName: true,
        emergencyContactPhone: true
      } 
    },
    payments: { 
      orderBy: { createdAt: 'desc' } 
    },
    contract: true
  }
});
```

### Get Tenant Applications
```typescript
const tenantApplications = await prisma.rentalApplication.findMany({
  where: {
    tenantId: userId,
    status: { in: ['SUBMITTED', 'UNDER_REVIEW'] }
  },
  include: {
    property: {
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        landlord: {
          select: { name: true, responseRate: true }
        }
      }
    }
  },
  orderBy: { submittedAt: 'desc' }
});
```

### Get Landlord Dashboard Statistics
```typescript
const landlordStats = await prisma.user.findUnique({
  where: { id: landlordId },
  include: {
    properties: {
      include: {
        _count: {
          select: {
            bookings: true,
            reviews: true,
            applications: true,
            viewings: true
          }
        },
        reviews: {
          select: { overallRating: true }
        },
        bookings: { 
          where: { status: 'CONFIRMED' }
        }
      }
    },
    _count: {
      select: {
        properties: true
      }
    }
  }
});

// Calculate average rating across all properties
const avgRating = landlordStats.properties
  .flatMap(p => p.reviews)
  .reduce((sum, r) => sum + r.overallRating, 0) / 
  landlordStats.properties.flatMap(p => p.reviews).length;
```

### Search Properties with Complex Filters
```typescript
const searchResults = await prisma.property.findMany({
  where: {
    AND: [
      { status: 'ACTIVE' },
      { availableFrom: { lte: targetDate } },
      {
        OR: [
          { city: { contains: searchTerm, mode: 'insensitive' } },
          { neighborhood: { contains: searchTerm, mode: 'insensitive' } },
          { address: { contains: searchTerm, mode: 'insensitive' } }
        ]
      }
    ],
    propertyType: { in: selectedTypes },
    monthlyRent: { gte: minRent, lte: maxRent },
    bedrooms: bedroomsFilter,
    bathrooms: bathroomsFilter,
    ...(requireParking && { parkingSpots: { gt: 0 } }),
    ...(requirePetFriendly && { petAllowed: true }),
    ...(requireFurnished && { furnished: true }),
    ...(requireLaundry && { laundryType: { not: 'NONE' } }),
    amenities: {
      some: {
        amenityId: { in: requiredAmenityIds }
      }
    }
  },
  include: {
    images: { where: { isPrimary: true }, take: 1 },
    landlord: {
      select: {
        name: true,
        averageRating: true,
        verificationStatus: true
      }
    },
    _count: {
      select: { reviews: true }
    }
  },
  orderBy: [
    { featured: 'desc' },
    { monthlyRent: sortByPrice }
  ]
});
```

---

## 🎯 Key Improvements in Schema v2.0

### 1. **Universal Property Support** 
- ✅ 10 property types (was 7)
- ✅ Comprehensive for all rental types
- ✅ Not just student housing

### 2. **Complete Rental Flow**
```
Search → View Details → Schedule Viewing → 
Apply → Review Application → Approve → 
Book → Sign Contract → Pay → Move In → 
Review
```

### 3. **Advanced Filtering**
- 40+ property attributes
- Parking options (type, cost, EV charging)
- Laundry types
- Climate control
- Storage options
- Accessibility features

### 4. **Tenant Screening**
- Complete rental applications
- Employment verification
- Income verification
- Credit score tracking
- Reference checks
- Background checks

### 5. **Enhanced User Profiles**
- Employment status & income
- Credit scores
- Pet information
- Emergency contacts
- Previous housing history

### 6. **Property Viewing System**
- Schedule viewings
- Confirm appointments
- Track no-shows
- Post-viewing feedback

### 7. **Better Financial Tracking**
- First/last month rent
- Pet deposits
- Separate utility tracking
- Late fees
- Due date management
- Receipt generation

### 8. **Digital Contracts**
- Separate signatures for each party
- Full execution tracking
- Audit trail
- PDF generation

### 9. **Enhanced Reviews**
- Pros & cons
- Would recommend flag
- Verified reviews
- Helpful voting
- Report system

### 10. **Better Messaging**
- Conversation subjects
- File attachments
- Read receipts
- Mute notifications
- Soft delete

---

## 📈 Scalability Considerations

### Database Size Estimates (1 year, 10,000 active properties):

- **Properties**: ~10,000 rows
- **PropertyImages**: ~50,000 rows (5 per property)
- **Users**: ~50,000 rows (5:1 tenant:landlord ratio)
- **Bookings**: ~30,000 rows (3 per property per year)
- **Reviews**: ~20,000 rows (2 per property per year)
- **Messages**: ~500,000 rows (average conversation)
- **RentalApplications**: ~50,000 rows (5 per property)
- **PropertyViewings**: ~40,000 rows (4 per property)

### Performance Optimization:

1. **Indexes**: Strategic indexes on frequently queried fields
2. **Pagination**: All lists should be paginated (20-50 items)
3. **Caching**: Redis for hot data (featured properties, popular searches)
4. **Image Optimization**: CDN + image processing
5. **Full-text Search**: PostgreSQL full-text or Elasticsearch for complex searches
6. **Archiving**: Archive old bookings/messages after 2 years

---

**Last Updated**: February 28, 2026  
**Version**: 2.0.0  
**Schema Status**: ✅ Production Ready  
**Total Models**: 24  
**Total Enums**: 10  
**Database**: PostgreSQL 17
