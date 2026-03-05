# Hướng Dẫn Sử Dụng Toàn Tập Hệ Thống (NextJS, Docker, Logging, Monitoring)

Tài liệu này hướng dẫn bạn cách sử dụng, kiểm tra sức khoẻ và xem log của toàn bộ hệ thống các dịch vụ đang chạy trên server nội bộ (gồm Nginx, Web NextJS, Database Postgres, Mailpit, Grafana, Loki/Promtail).

## 1. Các Công cụ & Dịch vụ Đang Chạy

Hệ thống của bạn đang chạy thông qua Docker Compose và mở các cổng (port) sau:

*   **🌐 Web App (Nginx + NextJS)**: Truy cập qua `http://<IP-SERVER>` (chạy ở cổng 80 hoặc 443). Đây là ứng dụng thực tế.
*   **📧 Email Server Cục Bộ (Mailpit)**: Truy cập qua `http://<IP-SERVER>:8025`. Đây là hòm thư chuyên dụng để bạn kiểm tra (test) việc gửi email từ trang web (sau khi gửi form trên web, email sẽ bay vào hộp thư này để đọc thay vì email thực).
*   **📊 Hệ thống Giám Sát và Log (Grafana)**: Truy cập qua `http://<IP-SERVER>:3001` (User: `admin` | Pass: `admin`). Nơi tập trung hiển thị biểu đồ CPU/RAM và xem log toàn cụm (do Loki xử lý ngầm).
*   **🗄️ Trình Quản Lý Database (Adminer)**: Truy cập qua `http://<IP-SERVER>:8080`. Giao diện nền web để xem và quản lý trực tiếp cơ sở dữ liệu PostgreSQL (`db:5432` ngầm).

---

## 2. Hướng dẫn Xem Log bằng Grafana & Loki

*Lưu ý quan trọng: Loki là một dịch vụ hoạt động "không có giao diện web", nó gom log ở cửa sau (cổng 3100). Do đó, bạn BẮT BUỘC dùng chung qua Grafana (cổng 3001) làm giao diện chính thức.*

### Các bước Xem Log Từng Container:
1.  Truy cập vào Grafana: `http://<IP-SERVER>:3001` và đăng nhập (`admin`/`admin`).
2.  Ở thanh công cụ bên **trái**, tìm và nhấp vào biểu tượng **La Bàn 🧭 (Explore)**.
3.  Trên cùng bên **trái** của trang hiện ra, tìm hộp thả xuống và chọn nguồn dữ liệu là **Loki**.
4.  Để xem log, ngay dưới mục *"Label filters"*:
    *   Ô `Select label`: Bấm chọn chữ **`container`**.
    *   Ô `Select value`: Bấm và chọn **Tên dịch vụ** bạn muốn xem log (Ví dụ: `nextjs_webapp`, `nginx_proxy`, `postgres_db`, v.v.).
5.  Để lấy log: Nhấn nút màu **Xanh Dương (Run query)** ở góc trên cùng bên **phải** màn hình.
6.  *Kết quả:* Kéo xuống dưới, bạn sẽ thấy tất cả thông báo log hiển thị ra vô cùng chi tiết. Nếu có lỗi sập web, đây là nơi phân tích tốt nhất.

---

## 3. Hướng dẫn Quản Lý bằng công cụ `manage.sh`

Trong thư mục `Deployment`, hệ thống đã cung cấp sẵn script `manage.sh` giúp bạn quản lý các dịch vụ mà không cần nhớ các câu lệnh Docker dài dòng. Bạn truy cập vào SSH máy chủ và cd vào thư mục: 

```bash
cd /home/azureuser/Deployment/
```

### Các Lệnh Có Thể Chạy:
| Lệnh Dùng | Chức Năng |
| :--- | :--- |
| `./manage.sh start` | 🟢 Khởi động lại toàn bộ cụm dịch vụ hệ thống. |
| `./manage.sh stop` | 🔴 Tắt hoàn toàn hệ thống. |
| `./manage.sh restart` | 🔄 Tắt đi và bắt đầu lại toàn bộ dịch vụ. |
| `./manage.sh build` | 🏗️ Xây dựng (build) lại toàn bộ server từ mã nguồn mới nhất (nếu bạn có cập nhật code). |
| `./manage.sh status` | ℹ️ Xem hệ thống hiện có bao nhiêu container đang sống/chết. |
| `./manage.sh logs` | 📋 Xem log dạng văn bản đen trắng trực tiếp trên cửa sổ Terminal cho toàn bộ dịch vụ. |
| `./manage.sh logs-web` | 📋 *Chỉ xem* dòng chữ log của riêng chiếc ứng dụng Web NextJS. |

---

## 4. Hướng dẫn Quản Lý Database Postgres (Backup/Truy cập)

Bên cạnh Adminer trên nền web (truy cập cổng `8080`), bạn cũng có thể quản lý trực tiếp qua dòng lệnh (`manage.sh`):

### 4.1. Truy Cập Vào Gõ Lệnh SQL Trực Tiếp
Khi cần viết và chạy mã SQL ngầm (truy cập môi trường máy chủ PostgreSQL):
```bash
./manage.sh shell-db
# Ghi chú: gõ \q và Enter để thoát.
```

### 4.2. Sao Lưu (Backup) Thủ Công
Hệ thống có tự động backup mỗi đêm qua 1 container ngầm(`pgbackups`), nhưng nếu cần backup chớp nhoáng lưu trữ riêng thành file SQL:
```bash
./manage.sh backup-db
# File backup sẽ được sinh ra ở: /home/azureuser/Deployment/backups/
```

### 4.3. Tìm và Phục Hồi (Restore) Database
```bash
./manage.sh restore-db backups/ten_file_backup_nam_o_day.sql
```

---

## 5. Cấu trúc Thư Mục (Để Bạn Dễ Hiểu Hệ Thống Hơn)

*   `docker-compose.yml`: Kịch bản điều phối tất cả các máy chủ container bật/tắt ra sao, chạy cổng nào.
*   `manage.sh`: Tập tin kịch bản bạn có thể chạy để rút gọn thao tác Docker (vừa học ở phần số 3).
*   `nginx/`: Gồm file giới hạn điều hướng, proxy cho Nginx.
*   `prometheus/` & `grafana/`: Folder khai báo bộ đếm CPU, bộ điều hành đồ hoạ, kết nối nguồn lấy đồ hoạ.
*   `loki/` & `promtail/`: Folder cấu hình quy định máy theo dõi lượm lặt file log tại `/var/log` và gom chuyển về Grafana.
*   `backups/`: Nơi những file Backup tự động hàng ngày trút vào làm đầy.

Hy vọng tài liệu này mang lại cho bạn sự an tâm khi quản lý hệ thống! Mọi trục trặc, cứ gọi kiểm tra log tại cổng 3001 (Loki).
