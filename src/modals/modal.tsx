import React from 'react'
import type { ReactNode } from 'react'

interface ModalProps {
  children: ReactNode
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div
      className="absolute top-5 right-5 z-50"
    >
      <div
        className="relative bg-white rounded-lg p-2 max-w-md w-full shadow-lg"
      >
        {children}
        
      </div>
    </div>
  )
}

export default Modal
