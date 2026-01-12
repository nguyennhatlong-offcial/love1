# 🌌 Galaxy Confession Web

Một trang web tỏ tình lãng mạn với hiệu ứng vũ trụ bao la, phong cách Glassmorphism (kính mờ) hiện đại, được viết bằng **React (TypeScript)**.


## ✨ Tính năng nổi bật

* **Hiệu ứng Vũ trụ:** Nền sao lấp lánh (Starry Background) chuyển động vô tận.
* **Giao diện Glassmorphism:** Bảng thông điệp trong suốt, sang trọng.
* **Animations:** Sử dụng `Framer Motion` cho các hiệu ứng chuyển động mượt mà.
* **Âm nhạc:** Tự động phát nhạc nền lãng mạn (có xử lý auto-play policy của trình duyệt).
* **Responsive:** Hiển thị đẹp trên cả điện thoại và máy tính.

## 🛠️ Công nghệ sử dụng

* **Core:** [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/)

## 🚀 Cài đặt và Chạy thử

Đảm bảo máy bạn đã cài đặt [Node.js](https://nodejs.org/).

1.  **Clone hoặc tải dự án về:**
    ```bash
    git clone [https://github.com/username-cua-em/galaxy-confession.git](https://github.com/username-cua-em/galaxy-confession.git)
    cd galaxy-confession
    ```

2.  **Cài đặt các thư viện cần thiết:**
    ```bash
    npm install
    # Hoặc nếu dùng yarn
    yarn install
    ```

3.  **Chạy dự án (Localhost):**
    ```bash
    npm run dev
    ```
    Truy cập vào đường link hiện ra trên terminal (thường là `http://localhost:5173`).

## ⚙️ Hướng dẫn chỉnh sửa (Customization)

### 1. Thay đổi lời chúc
Mở file `src/App.tsx`, tìm đến đoạn code bên dưới và sửa nội dung trong thẻ `<h1>` và `<p>`:

```tsx
<h1 className="...">
  Gửi cậu ✨
</h1>
<p className="...">
  "Vũ trụ bao la thế này..."
</p>
