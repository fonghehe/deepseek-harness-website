---
title: 'Yêu cầu của website'
description: 'Kiểm tra bố cục, điều hướng, khả năng tiếp cận, xuất bản và hiệu năng.'
---

# Yêu cầu của website

Kiểm tra nội dung khi tắt hoạt ảnh. Tên dài, trình đơn và lệnh phải vừa màn hình hẹp. Sau hydration, kiểm tra bàn phím, tạm dừng, sao chép và liên kết.

Mỗi ngôn ngữ cần từ điển, thẻ, nhãn hỗ trợ tiếp cận, metadata, điều hướng, mô tả và năm bài viết. Giữ placeholder và thẻ rich text. Frontmatter phải khớp `docs/descriptions.json`.

Build production trước khi kiểm thử trình duyệt và dùng cổng trống. Chọn phép kiểm tra theo thay đổi. Tìm nguyên nhân checksum sai trước khi cập nhật danh mục tài nguyên.

Triển khai máy chủ phải có toàn bộ `public`. Kiểm tra `SITE_URL`, lối vào tài liệu tiếng Anh, 404, sitemap, favicon, chunk động và cache. Xuất Pages phải vượt kiểm tra tiền tố đường dẫn.

Kiểm tra màn hình hẹp, RTL, văn bản trộn hướng, focus, trình đọc màn hình và giảm chuyển động. Ghi lại thiết bị và trình duyệt. Bản dịch vẫn cần người bản ngữ duyệt.

```sh
pnpm verify
E2E_PORT=3101 pnpm test:e2e
pnpm verify:full
SITE_URL=https://example.github.io/repository/ pnpm build:pages
SITE_URL=https://example.github.io/repository/ pnpm check:pages
```

[Kiến trúc](../architecture/) · [Điểm nổi bật frontend](../highlights/) · [Lộ trình học](../learning/)

<WebsiteLink locale="vi">Website</WebsiteLink>
