---
description: Convention bắt buộc cho mọi custom hook trong dự án Next.js + TypeScript (dựa trên useAITools chuẩn hiện tại)
applyTo:
  - "**/services/graphql/fragments/*.ts"
name: Fragments graphql
---
Các Fragments wpgraphql sẽ được viết ở thư mục: `services\graphql\fragments`

## Ví dụ code mẫu:
```gql
import { gql } from '@apollo/client';

export const TOUR_FIELDS = gql`
  fragment TourFields on Post {
    slug
    title
    date
    content
    featuredImage {
      node {
        sourceUrl(size: LARGE)
        altText
      }
    }
    acfTour {
      giaTour
      thoiGian
      phuongTien
      diemDen
      lichKhoiHanh
      khuyenMai
    }
  }
`;
```

## Tài liệu tham khảo:
- [Apollo Docs - Fragments](https://www.apollographql.com/docs/react/data/fragments/)