#!/bin/bash

# Chuyển vào thư mục chứa docker-compose.yml
cd "$(dirname "$0")"

function show_help {
    echo "=========================================================="
    echo "  Công cụ Quản lý Hệ thống (NextJS + Nginx + DB + Tools)  "
    echo "=========================================================="
    echo "Cách dùng: ./manage.sh [lệnh]"
    echo ""
    echo "Các lệnh hỗ trợ:"
    echo "  start     : Khởi động hệ thống chạy ngầm"
    echo "  stop      : Dừng hệ thống"
    echo "  restart   : Khởi động lại toàn bộ hệ thống"
    echo "  build     : Build lại mã nguồn Next.js và chạy (rất hữu ích khi có code mới)"
    echo "  status    : Xem trạng thái các dịch vụ (container) đang chạy"
    echo "  logs      : Xem toàn bộ log của hệ thống (bấm Ctrl+C để thoát)"
    echo "  logs-web  : Xem log trực tiếp của riêng ứng dụng Web Next.js"
    echo "  shell-web : Truy cập dòng lệnh vào bên trong máy chủ Next.js"
    echo "  shell-db  : Truy cập màn hình dòng lệnh SQL vào PostgreSQL"
    echo ""
}

case "$1" in
    start)
        echo "[+] Đang khởi động hệ thống..."
        docker compose up -d
        ;;
    stop)
        echo "[+] Đang dừng hệ thống..."
        docker compose down
        ;;
    restart)
        echo "[+] Đang khởi động lại hệ thống..."
        docker compose restart
        ;;
    build)
        echo "[+] Đang copy source code mới nhất và build lại hệ thống..."
        docker compose up -d --build
        ;;
    status)
        echo "[+] Trạng thái các dịch vụ hiện tại:"
        docker compose ps
        ;;
    logs)
        docker compose logs -f
        ;;
    logs-web)
        docker compose logs -f webapp
        ;;
    shell-web)
        echo "[+] Đang truy cập máy chủ Web..."
        docker compose exec webapp sh
        ;;
    shell-db)
        echo "[+] Đang mở Console Database PostgreSQL (gõ \q để thoát)..."
        docker compose exec db psql -U user -d webapp
        ;;
    *)
        show_help
        ;;
esac
