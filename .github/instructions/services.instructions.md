---
description: Hướng dẫn coding cho services - Logic nghiệp vụ với TypeScript và dependency injection.
applyTo: "services/**/*.ts"  # Áp dụng tự động cho tất cả file .ts trong services/
name: Service_Coding_Guidelines
---

# Hướng Dẫn Coding Cho Thư Mục Services

Áp dụng [general coding guidelines](../copilot-instructions.md) cho tất cả code.

## Cấu Trúc Service
- Sử dụng class-based services với static methods cho utility functions.
- Implement dependency injection (sử dụng constructor cho services phụ thuộc như database hoặc logger).
- Giữ single responsibility: Một service chỉ xử lý một domain (ví dụ: UserService cho user-related logic).
- Export default class: `export default class UserService { ... }`.

## Naming Conventions
- Class: PascalCase (ví dụ: `UserService`, `AuthService`).
- Methods: camelCase, mô tả action (ví dụ: `fetchUserById`, `createUserWithValidation`).
- Variables: camelCase; constants: UPPER_SNAKE_CASE (ví dụ: `DEFAULT_TIMEOUT = 5000`).

## Best Practices
- Async/await cho tất cả API calls; wrap trong try/catch với custom error throwing (sử dụng `throw new AppError('message', statusCode)`).
- Cache results nếu cần (sử dụng React Query hoặc sessionStorage; ví dụ: `private static cache = new Map();`).
- Validate inputs với Zod hoặc Joi trước khi xử lý.
- Logging: Sử dụng Winston logger với context (ví dụ: `logger.info('Fetching user', { userId })`).
- Không commit secrets; sử dụng env variables (ví dụ: `process.env.DATABASE_URL`).

## Error Handling
- Xử lý errors cụ thể: NetworkError, ValidationError, NotFoundError.
- Return typed responses: Sử dụng interfaces (ví dụ: `interface UserResponse { id: string; name: string; }`).

## Ví Dụ Code Mong Đợi
```typescript
export class TripService {
    private static CACHE_KEY_PREFIX = "trip_";
    private static CACHE_KEY_LIST = "trip_service_list";

    /**
     * Get trip detail by slug or ID
     * @param identifier - Trip slug or ID
     * @param options - Optional settings for cache
     * @returns Promise<TripUI>
     */
    public static async getTripDetail(
        identifier: string | number,
        options?: { forceRefresh?: boolean; cacheDuration?: number }
    ): Promise<TripUI> {
        const opts = { ...defaultOptions, ...options };
        const cacheKey = `${this.CACHE_KEY_PREFIX}detail_${identifier}`;

        // Check cache first
        if (!opts.forceRefresh) {
            const cached = this.getFromCache<TripUI>(cacheKey);
            if (cached) {
                console.log('✅ Returning cached trip detail for:', identifier);
                return cached;
            }
        }

        try {
            console.log('🔍 Fetching trip detail from API:', identifier);
            const response = await api.get(`/trips/${identifier}`);

            if (!response.data.success || !response.data.data) {
                throw new Error(response.data.message || 'Failed to fetch trip detail');
            }

            const tripData = response.data.data;

            // Cache the result
            if (typeof window !== 'undefined') {
                this.setToCache(cacheKey, tripData, opts.cacheDuration);
            }

            apiLogger.debug('TripService.getTripDetail', {
                identifier,
                tripId: tripData.trip_id
            });

            return tripData;

        } catch (error: any) {
            apiLogger.logError('TripService.getTripDetail', { error, identifier });

            // Handle 404 specifically
            if (error?.response?.status === 404) {
                const notFoundError = new Error('Chuyến đi không tồn tại');
                (notFoundError as any).code = 404;
                throw notFoundError;
            }

            throw error;
        }
    }

    /**
     * Lấy danh sách tríp cho generateStaticParams - chỉ lấy các dữ liệu cần thiết như slug,id
     */
    public static async getTripsForStaticParams(options?: any): Promise<
        { tripSlug: string; }[]
    > {
        const opts = { ...defaultOptions, ...options };
        const cacheKey = `${this.CACHE_KEY_PREFIX}static_params`;
        // Lấy nguồn dữ liệu dựa vào các option truyền vào.
        if (!opts.forceRefresh) {
            const cached = this.getFromCache<{ tripSlug: string }[]>(cacheKey);
            if (cached) {
                return cached;
            }
        }

        try {
            const response = await api.get('/trips/static-params');
            const trips = response.data.data || [];

            apiLogger.debug('TripService.getTripsForStaticParams', {
                count: trips.slugs?.length || 0
            });

            // Transform response to expected format
            const slugs = trips.slugs?.map((item: any) => ({
                tripSlug: item.slug
            })) || [];

            // Cache the result if on client-side
            if (typeof window !== 'undefined') {
                this.setToCache(cacheKey, slugs, opts.cacheDuration);
            }

            return slugs;

        } catch (error) {
            apiLogger.logError('TripService.getTripsForStaticParams', { error });
            console.error('Error fetching trips for static params:', error);
            return [];
        }
    }

    private static setToCache<T>(key: string, value: T, durationMinutes: number = 30): void {
        try {
            // Only set cache on client-side
            if (typeof window === 'undefined' || !window.sessionStorage) {
                return;
            }

            const item = {
                value,
                expiry: Date.now() + (durationMinutes * 60 * 1000)
            };

            sessionStorage.setItem(key, JSON.stringify(item));
        } catch (error) {
            apiLogger.logError('TripService.setToCache', { error });
        }
    }


    private static getFromCache<T>(key: string): T | null {
        try {
            // Kieemr tra session storage trên trình duyệt có tồn tại không?, và có đang chạy ở client browser không?
            if (typeof window === 'undefined' || !window.sessionStorage) {
                return null;
            }

            const itemStr = sessionStorage.getItem(key);
            if (!itemStr) {
                return null;
            }
            // chuyển đổi chuỗi JSON thành object
            const item = JSON.parse(itemStr);
            // Nếu key hết hạn thì xóa khỏi session storage và trả về null
            if (item.expiry && Date.now() > item.expiry) {
                // double-check enviroment để đảm bảo ở client-side
                if (typeof window !== 'undefined' && window.sessionStorage) {
                    sessionStorage.removeItem(key);
                }
                return null;
            }
            // Nếu timestamp valid trả về value hợp lệ với typesafe
            return item.value as T;
        } catch (error) {
            apiLogger.logError('TripService.getFromCache', { error });
            return null;
        }
    }

}

export default TripService;
```