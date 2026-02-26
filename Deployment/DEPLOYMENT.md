# Hướng dẫn triển khai (Deployment Document)

Kiến trúc triển khai hiện tại đã được tuỳ chỉnh **đặc biệt phù hợp cho dự án Frontend/Next.js của bạn**:

- **Ubuntu Server**: Nền tảng thực thi ứng dụng.
- **Nginx**: Cấu hình dưới dạng Reverse Proxy xử lý và điều hướng truy cập trực tiếp vào app Next.js qua cổng 80/443.
- **Web App (Docker)**: Mã nguồn Next.js được tối ưu hoá qua chế độ Standalone, build và chạy độc lập. Đã được trỏ môi trường biến đến Email Server ảo.
- **Database (PostgreSQL)**: Được tạo sẵn với container riêng. Hiện tại mã nguồn Next.js chưa sử dụng CSDL, nhưng đã khai báo biến môi trường `DATABASE_URL` trong WebApp. Nó sẵn sàng chạy nếu bạn thêm Prisma / TypeORM vào sau này.
- **Email Service (Mailpit)**: Thay vì bạn phải gửi mail thật, Mailpit đóng vai trò SMTP cục bộ để test API Route `/api/send-email`. Bất kì form liên hệ nào từ web gửi đi (thông qua `nodemailer`), Mailpit sẽ "hứng" lại giúp bạn vào hộp thư Inbox cục bộ để dễ dàng kiểm tra.
- **Monitoring**: Prometheus kết hợp Grafana giám sát sức khoẻ tài nguyên.
- **CI/CD Pipeline**: GitHub Actions auto-deploy NextJS khi bạn đẩy code.

## 1. Yêu cầu hệ thống (Server)
- OS: Ubuntu Server (22.04 / 24.04).
- RAM: >= 4GB

## 2. Cài đặt các gói trên Ubuntu Server
Bạn vào Ubuntu Server thông qua SSH, sau đó chạy:

```bash
# 1. Update system
sudo apt update && sudo apt upgrade -y

# 2. Add Docker repository & Install Docker
sudo apt-get install -y ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 3. Phân quyền Docker (rồi logout/login lại để hiệu lực)
sudo usermod -aG docker $USER
```

## 3. Khởi chạy Ứng dụng Bằng Docker Compose

Toàn bộ ứng dụng của bạn có thể được chạy tự động theo file cấu hình Compose.

```bash
# Clone source chứa web app và thư mục Deployment
git clone https://github.com/my-repo/project.git
cd project/Deployment

# Khởi chạy cụm (Cluster)
docker compose up -d --build
```

Kiểm tra trạng thái của các container:
```bash
docker ps
```

## 4. Các Endpoints có sẵn và Cách hoạt động cho riêng Web App NextJS 

- **Web App (Production)**: Truy cập `http://<IP-SERVER>` (Nginx chuyển tiếp request thẳng tới Web App thay vì gọi port nội bộ).
- **Kiểm tra Form Liên Hệ (Email)**: Thay vì cấu hình hòm thư thật để gửi SMTP. App Next.js đã được map tự động để gửi vào Mailpit qua `EMAIL_HOST=email`. Bạn hãy thử vào form liên hệ trên Web, nhập nội dung, nhấn Gửi. Sau đó, mở `http://<IP-SERVER>:8025` để xem email gửi đến thay vì phải dùng mail thực tế (rất tiện).
- **Monitoring Grafana**: `http://<IP-SERVER>:3001` (Port 3001). Username: `admin`, Password: `admin` (Cấu hình ở file docker-compose).
- **Database (Postgres)**: Chạy trên port máy chủ là 5432. Next.js có thể kế nối nội bộ qua `postgres://user:password@db:5432/webapp` được mình cấu hình ngầm.

## 5. Cài đặt CI/CD Pipeline (GitHub Actions)
Tự động Deploy Web App lên Ubuntu:
1. Vào Repo Github -> Settings -> Secrets and variables -> Actions
2. Thêm mới các Secrets:
   - `SERVER_HOST`: IP Public máy chủ Ubuntu.
   - `SERVER_USER`: Tên user của server (`ubuntu`, v.v.).
   - `SERVER_SSH_KEY`: Private Key (*).

Mỗi khi bạn Update code frontend trên nhánh `main`, Github Actions sẽ Build code Next.js test thử, nếu thành công sẽ ssh vào máy chủ tự cập nhật container.
