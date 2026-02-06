---
description: Convention bắt buộc cho mọi custom hook trong dự án Next.js + TypeScript (dựa trên useAITools chuẩn hiện tại)
applyTo:
  - "**/services/graphql/queries/*.ts"
name: Queries graphql
---
Các queries wpgraphql sẽ được viết ở thư mục: `services/graphql/queries/`

## code mẫu:
```gql
// src/services/graphql/queries/tour.query.ts
import { gql } from '@apollo/client';
import { TOUR_FIELDS } from '../fragments/tour.fragment';

export const GET_TOUR_BY_SLUG = gql`
  ${TOUR_FIELDS}
  query GetTourBySlug($slug: ID!) {
    postBy(slug: $slug) {
      ...TourFields
    }
  }
`;
```

## Tài liệu tham khảo: 
- [Apollo Docs - Queries](https://www.apollographql.com/docs/react/data/queries/)