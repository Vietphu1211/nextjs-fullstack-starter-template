---
description: Hướng dẫn coding cho api route.
applyTo: "api/**/*.ts"  # Áp dụng tự động cho tất cả file .ts trong services/
name: api_Coding_Guidelines
---

# Hướng Dẫn Coding Cho Thư Mục API
Áp dụng [general coding guidelines](../copilot-instructions.md) cho tất cả code.

# logging trong api route
- Sử dụng `apiLogger` để logging thay vì `console.log` để có cấu trúc log tốt hơn.

# Return data
- Không transform data
- Trả về raw wordpress data
- Xử lý error và status codes