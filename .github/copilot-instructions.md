---
applyTo: '**'
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.


## Project Context
Dự án này là một trang web du lịch sử dụng Next.js và TypeScript cho frontend, phía backend sẽ sử dụng wordpress CMS headless để cung cấp API cho next.js.

## Patter project
- Tuân thủ layer architects , tách biệt code giữa các layers: UI, Hook, Service, transform trong đó:
  ### UI layer: 
  - Chứa các components React, pages, layouts. UI sẽ gọi hook để lấy dữ liệu phục vụ việc render ra client side.
  ### Hook layer:
  - Thư mục chứa: /hooks/
  - Quy ước đặt tên: tên entity + use + tên chức năng . Ví dụ: useTripDetail.ts, usePostList.ts
  - Thành phần: Chứa các custom hooks, quản lý trạng thái loading, error, data. Hook sẽ gọi service để lấy dữ liệu từ API, nếu cần sẽ sử dụng các transform để chuyển đổi dữ liệu trả cho phía UI để đáp ứng viết safetype.
  - Nhiệm vụ: Quản lý trạng thái (loading, error, data), gọi service để fetch data, sử dụng transform để chuyển đổi dữ liệu nếu cần để trả dữ liệu đúng type cho UI.
  ### Service layer:
  - Thư mục chứa: /lib/services/
  - Quy ước đặt tên: tên entity + Service.ts . Ví dụ: TripService.ts, PostService.ts
  - Thành phần: Chứa các lớp service để gọi API, xử lý caching, error handling. Service trả đữ liệu thô từ API không chỉnh sửa dữ liệu tránh phức tạp.
  ### transfom layer:
  - Quy ước đặt tên: tên entity + Transform.ts . Ví dụ: TripTransfrom.ts, PostTransfrom.ts
  - Thư mục chứa: /lib/transforms/
  - Thành phần: nó sẽ chứa code của các hàm để chuyển đổi dữ liệu thô từ API (service hoặc Hook) thành định dạng phù hợp với UI hoặc hook.
  - Nơi sử dụng: được sử dụng bởi hook để chuyển đổi dữ liệu trước khi trả về cho UI. Hoặc có vài trường hợp có thể được sử dụng ở UI nếu cần thiết.
  - Nhiệm vụ: mapping dữ liệu đầu vào thành dữ liệu đầu ra phù hợp với yêu cầu của hook.
  ### type layer:
  - Thư mục chứa: /types/
  - Quy ước đặt tên: tên entity + Type.ts . Ví dụ: TripType.ts, PostType.ts
  - Thành phần: Chứa các định nghĩa type và interface TypeScript cho toàn bộ ứng dụng.
  - Phải viết type tập trung vào thư mục /types/ để dễ quản lý và tái sử dụng. Không được viết nơi khác.
