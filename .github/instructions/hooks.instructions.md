Tuyệt vời! Dựa 100% vào hook thực tế bạn đang dùng (`useAITools`), mình viết cho bạn **file convention chính xác, chuẩn phong cách dự án hiện tại**, để từ nay **GitHub Copilot sinh hook nào cũng giống hệt như thế này** – không cần sửa lại gì nữa.

### File Convention Đặt Tại:  
`.github/instructions/hooks.instructions.md`

```markdown
---
description: Convention bắt buộc cho mọi custom hook trong dự án Next.js + TypeScript (dựa trên useAITools chuẩn hiện tại)
applyTo:
  - "**/hooks/**/*.ts"
  - "**/hooks/**/*.tsx"
  - "**/lib/hooks/**/*.ts"
  - "**/src/hooks/**/*.ts"
name: Custom Hooks Convention – Dựa trên useAITools (2025)
---

# Custom Hooks Convention – Next.js + TypeScript  
**Dựa hoàn toàn trên hook `useAITools` – chuẩn vàng của dự án**

Tất cả hook mới do dev hoặc GitHub Copilot tạo **phải giống 100%** cấu trúc, naming, pattern dưới đây.

## 1. Tên Hook & File
- Tên hook: `useTênChứcNăng` (camelCase, có tiền tố `use`)
- Tên file: `useTênChứcNăng.ts`
- Export: `export function useXxx(...)` → **không dùng const**, không dùng default export (trừ hook toàn cục như `useAuth`)

## 2. Cấu trúc tham số đầu vào
```ts
interface UseXxxOptions {
  filters?: Partial<FilterType>;
  autoFetch?: boolean;        // mặc định true
  cacheOptions?: {
    forceRefresh?: boolean;   // true = bỏ cache
    noCache?: boolean;
    cacheDuration?: number;   // ms
  };
}

export function useAITools(options: UseXxxOptions): UseXxxResult { ... }
```

## 3. State nội bộ – Bắt buộc có đủ 4 state
```ts
const [data, setData] = useState<DataType[]>([]);
const [pagination, setPagination] = useState<PaginationData | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
```

## 4. Memoize filters & cacheOptions – BẮT BUỘC để tránh infinite loop
```ts
const memoizedFilters = useMemo(() => ({ ...filters }), [search, page, limit, ...]);
const memoizedCacheOptions = useMemo(() => ({ 
  forceRefresh, cacheDuration, noCache 
}), [forceRefresh, cacheDuration, noCache]);
```

## 5. Hàm fetch – Bắt buộc dùng useCallback + đúng dependency
```ts
const fetchData = useCallback(async () => {
  try {
    setLoading(true);
    setError(null);

    // Log debug trước khi gọi service
    apiLogger.debug('[useXxx] Calling service with:', { filters, cacheOptions });

    const result = await SomeService.getList(memoizedFilters, memoizedCacheOptions);

    if (result.error) {
      setError(result.error);
    } else {
      const transformed = transformToUI(result.items);
      setData(transformed);
      setPagination(result.pagination || null);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Lỗi không xác định';
    apiLogger.error('[useXxx] Fetch error:', err);
    setError('Có lỗi xảy ra khi tải dữ liệu');
  } finally {
    setLoading(false);
  }
}, [memoizedFilters, memoizedCacheOptions]);
```

## 6. useEffect – Chỉ chạy khi autoFetch = true
```ts
useEffect(() => {
  if (autoFetch) {
    fetchData();
  }
}, [autoFetch, fetchData]);
```

## 7. Return object – Bắt buộc đúng thứ tự và tên key
```ts
return {
  tools,        // hoặc data, items, ...
  pagination,
  loading,
  error,
  refetch: fetchData,   // luôn đặt tên là refetch
};
```

## 8. Interface Return – Bắt buộc định nghĩa type riêng
```ts
interface UseAIToolsResult {
  tools: AIToolItemUI[];
  pagination: PaginationData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}
```

## 9. Logging – Bắt buộc dùng apiLogger.debug()
- Log trước khi gọi service
- Log kết quả trả về (số lượng, item đầu tiên)
- Log lỗi chi tiết

## 10. Ví dụ chuẩn 100% (giống hệt useAITools của bạn)

```ts
// src/hooks/useCategories.ts
import { useState, useEffect, useMemo, useCallback } from 'react';
import { CategoryService } from '@/services/categoryService';
import { transformToCategoryUI } from '@/utils/transformers';
import { apiLogger } from '@/lib/logger';

interface UseCategoriesOptions {
  filters?: Partial<CategoryFilters>;
  autoFetch?: boolean;
  cacheOptions?: {
    forceRefresh?: boolean;
    noCache?: boolean;
    cacheDuration?: number;
  };
}

interface UseCategoriesResult {
  categories: CategoryUI[];
  pagination: PaginationData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useCategories(options: UseCategoriesOptions): UseCategoriesResult {
  const { filters = {}, autoFetch = true, cacheOptions } = options;

  const [categories, setCategories] = useState<CategoryUI[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { page, limit, search, status } = filters;
  const forceRefresh = cacheOptions?.forceRefresh;
  const cacheDuration = cacheOptions?.cacheDuration;
  const noCache = cacheOptions?.noCache;

  const memoizedFilters = useMemo(() => ({ page, limit, search, status }), [page, limit, search, status]);
  const memoizedCacheOptions = useMemo(() => ({ forceRefresh, cacheDuration, noCache }), [forceRefresh, cacheDuration, noCache]);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      apiLogger.debug('[useCategories] Fetching with filters:', { memoizedFilters, memoizedCacheOptions });

      const result = await CategoryService.getList(memoizedFilters, memoizedCacheOptions);

      if (result.error) {
        setError(result.error);
      } else {
        const transformed = transformToCategoryUI(result.items);
        setCategories(transformed);
        setPagination(result.pagination || null);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Lỗi tải danh mục';
      apiLogger.error('[useCategories] Error:', err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [memoizedFilters, memoizedCacheOptions]);

  useEffect(() => {
    if (autoFetch) fetchCategories();
  }, [autoFetch, fetchCategories]);

  return {
    categories,
    pagination,
    loading,
    error,
    refetch: fetchCategories,
  };
}
```

## Không bao giờ được làm
- Dùng `const fetchData = async () => {}` thay vì `useCallback`
- Quên memoize filters/cacheOptions → gây infinite loop
- Return array hoặc tuple
- Không có `refetch` trong return
- Không log debug khi fetch

## Tham khảo
- Hook mẫu chuẩn: [useAITools.ts](https://github.com/your-repo/blob/main/src/hooks/useAITools.ts)
- General guidelines: [../copilot-instructions.md](../copilot-instructions.md)

Từ nay chỉ cần nói với Copilot:  
“Create a new hook to fetch blog posts with filters and pagination”  
→ Nó sẽ ra code **giống hệt useAITools** của bạn, không cần sửa một chữ!

Bạn muốn mình tạo luôn convention cho `useMutation` (create/update/delete) theo cùng pattern không? Mình làm tiếp cho đầy đủ bộ!