---
title: 'Lộ trình học'
description: 'Thứ tự đọc mã và sáu bài tập chỉnh sửa, kiểm tra website.'
---

# Lộ trình học

Mở website rồi tìm mã tạo nên trang. Sáu bài tập kiểm tra thẻ, ngôn ngữ, bộ nhớ đệm, hoạt ảnh, metadata bài viết và tài nguyên.

1. Cải thiện thẻ trong mọi ngôn ngữ, giữ ID và liên kết, so sánh HTML máy chủ với DOM sau hydration.
2. Theo một ngôn ngữ từ registry đến menu, bài viết, `lang`, `dir`, sitemap; giữ query và fragment khi đổi ngôn ngữ.
3. Dùng ETag thật để kiểm tra `304` rỗng và tách cache giữa ngôn ngữ, origin.
4. Kiểm tra tạm dừng, hiển thị, tab nền và giảm chuyển động, giữ nguyên hoạt ảnh bình thường.
5. Đổi bài và ngôn ngữ, xác nhận canonical, metadata chia sẻ và hướng được cập nhật.
6. Sửa một giai đoạn cảnh; kiểm tra nguồn, đầu vào và hash. Build không được yêu cầu `/harness-source/`.

So sánh lượng dữ liệu, thao tác và ảnh trước khi cập nhật mốc tham chiếu. Giữ báo cáo ngoài nguồn được quản lý phiên bản. Giải thích vấn đề của khách, trách nhiệm mã, kết quả kiểm thử và giới hạn bằng chứng. Ảnh cục bộ không chứng minh khớp từng pixel với trang gốc.

```sh
pnpm analyze
pnpm perf:repeat
pnpm test:visual
```

| Thuật ngữ         | Ý nghĩa                                          |
| ----------------- | ------------------------------------------------ |
| SSR               | Render phía máy chủ                              |
| Hydration         | Hydration: bổ sung tương tác vào HTML từ máy chủ |
| Reduced motion    | Tùy chọn giảm chuyển động                        |
| RTL               | Bố cục từ phải sang trái                         |
| Visual regression | Kiểm thử hồi quy hình ảnh                        |
| Resource budget   | Ngân sách tài nguyên                             |

[Kiến trúc](../architecture/) · [Điểm nổi bật frontend](../highlights/) · [Yêu cầu của website](../requirements/)

<WebsiteLink locale="vi">Website</WebsiteLink>
