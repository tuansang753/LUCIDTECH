import { NextResponse } from 'next/server';
import client from 'prom-client';

// Đảm bảo không lưu cache để các chỉ số như RAM/CPU cập nhật liên tục
export const dynamic = 'force-dynamic';

// Khởi tạo bộ lấy chỉ số mặc định của hệ thống chạy ứng dụng
const register = new client.Registry();
client.collectDefaultMetrics({ register });

export async function GET() {
    try {
        const metrics = await register.metrics();
        return new NextResponse(metrics, {
            status: 200,
            headers: {
                'Content-Type': register.contentType,
            },
        });
    } catch (ex) {
        return new NextResponse('Lỗi thu thập Metrics', { status: 500 });
    }
}
