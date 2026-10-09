---
title: 'Kiến trúc'
description: 'Thành phần React, tuyến Next.js, hoạt ảnh và phục vụ bài viết VitePress.'
---

# Kiến trúc

`landing-page.tsx` ghép trang. `layout/` quản lý khung, `controls/` thao tác, `sections/` các phần, `previews/` minh họa và CSS. `motion/` chứa Framer Motion; `graphics/` chứa cảnh Three.js, hình học và shader.

Trang xác thực ngôn ngữ và truyền từ điển vào thành phần. Máy chủ và máy khách dùng cùng JSX; layout đặt `lang` và `dir`. RichText chỉ xử lý thẻ đã quy định. Website không tải HTML đã chụp hay ứng dụng biên dịch từ trang gốc.

`use-demo-scene.ts` kết hợp tạm dừng của người dùng, khả năng nhìn thấy, tab hoạt động và giảm chuyển động. CSS giữ tiến độ khi dừng; kịch bản workflow đổi ở cuối chu kỳ. Bốn câu chuyện dài 22, 17,5, 11 và 15 giây.

Three.js được tải khi cần. Render giới hạn 30fps và độ phân giải pixel CSS, dừng ngoài màn hình hoặc tab nền, bỏ khởi tạo GPU khi giảm chuyển động. Hình học, vật liệu, texture và renderer được giải phóng. Framer Motion quản lý lò xo đầu trang, xuất hiện từng phần và phối cảnh khi cuộn.

`pnpm build` tạo VitePress trong `public/docs` trước rồi build Next.js. Điều hướng tài liệu cập nhật hướng đọc và SEO. Cache máy chủ tách origin và ngôn ngữ/đường dẫn bài, giữ tối đa 128 mục trong năm phút, loại bỏ render lỗi và hỗ trợ ETag với `304` không có nội dung.

GitHub Pages dùng `build:pages` và `check:pages` với `SITE_URL` đầy đủ. Metadata tĩnh được chốt lúc build; cache và ETag ứng dụng thuộc chế độ máy chủ. Xuất bản tĩnh không sửa nguồn đang làm việc. Hướng dẫn có trong `DEVELOPMENT.md`.

```text
src/components/
├── landing-page.tsx
├── layout/
├── controls/
├── sections/
├── previews/
├── motion/
├── graphics/
├── shared/
└── styles/

page.tsx → locale + dictionary → LandingPage → Next.js SSR
/docs/ → /docs/en/ → VitePress article
```

[Điểm nổi bật frontend](../highlights/) · [Yêu cầu của website](../requirements/) · [Lộ trình học](../learning/)

<WebsiteLink locale="vi">Website</WebsiteLink>
