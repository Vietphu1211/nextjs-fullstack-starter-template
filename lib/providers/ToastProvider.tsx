import { Toaster } from '@/components/ui/sonner'
import React from 'react'

interface ToastProviderProps {
    children: React.ReactNode
}

const ToastProvider = ({ children }: ToastProviderProps) => {
    return (
        <>
            <Toaster />
            {children}
        </>
    )
}

export default ToastProvider