import { Button } from '@/components/ui/button'
import { AlertCircle, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="max-w-md mx-auto text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            404
          </h1>
          <h2 className="text-xl font-semibold text-gray-700">
            Chuyến đi không tồn tại
          </h2>
          <p className="text-base text-gray-600 leading-relaxed">
            Chuyến đi bạn đang tìm kiếm không tồn tại, đã bị xóa,
            hoặc đường dẫn không chính xác.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center ">
          <Link href="/trips">
            <Button
              className="bg-[#b25340] hover:bg-[#b25340]/90 w-full sm:w-auto rounded-full"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2 text-neutral-50" />
              <span className='text-neutral-50'>
                Xem tất cả chuyến đi
              </span>
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="link"
              size="lg"
              className="w-full sm:w-auto underline border-none"
            >
              <Home className="w-4 h-4 mr-2" />
              Về trang chủ
            </Button>
          </Link>
        </div>

        {/* Help */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Cần hỗ trợ?{' '}
            <Link
              href="/contact"
              className="text-[#b25340] hover:underline font-medium"
            >
              Liên hệ với chúng tôi
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}