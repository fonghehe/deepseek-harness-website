---
title: 'Tổng quan dự án'
description: 'Cấu trúc, triển khai và kiểm thử website tái hiện DeepSeek Harness.'
---

# Tổng quan dự án

Kho mã này tái hiện website DeepSeek Harness bằng Next.js và React. Tài liệu giải thích cấu trúc trang, thành phần, ngôn ngữ, hoạt ảnh và cách kiểm thử. VitePress tạo các bài viết.

Khách truy cập hiểu sản phẩm ở đầu trang, xem bốn minh họa, mở thẻ chi tiết rồi chọn hành động. Nội dung máy chủ, liên kết thật và phần mở rộng bằng HTML vẫn hữu ích khi tắt JavaScript.

`src/i18n/locales.json` thống nhất tên ngôn ngữ, đường dẫn, hướng đọc và metadata. `/harness/` giữ lối vào tiếng Trung; `/docs/` mở tiếng Anh. Mỗi bản tài liệu có cùng năm chương.

Thành phần dễ đọc giúp bảo trì. Build thành công không chứng minh độ giống hình ảnh, chất lượng ngôn ngữ hay hiệu năng trên thiết bị thật; cần kiểm tra riêng từng mặt.

[Kiến trúc](./architecture/) · [Điểm nổi bật frontend](./highlights/) · [Yêu cầu của website](./requirements/) · [Lộ trình học](./learning/)

<WebsiteLink locale="vi">Website</WebsiteLink>
