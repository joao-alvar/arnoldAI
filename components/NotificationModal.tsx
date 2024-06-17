import {on} from 'events'
import React from 'react'
import ReactDOM from 'react-dom'
import toast from 'react-hot-toast'

interface NotificationModalProps {
  onRequestClose: (granted: boolean) => void
  saveSubscription: () => void
}

function NotificationModal({
  onRequestClose,
  saveSubscription,
}: NotificationModalProps) {
  const requestNotificationPermission = async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission()
      onRequestClose(permission === 'granted')
      if (permission === 'granted') {
        saveSubscription()
      }
    } else {
      toast.error(
        'As notificações não são suportadas neste navegador ou algo deu errado.'
      )
    }
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-white p-6 text-center shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          Permita-nos enviar notificações push
        </h2>
        <p className="mb-4">
          Receba notificações do ArnoldAI quando novos treinos estiverem
          disponíveis.
        </p>
        <button
          className="rounded-lg bg-yellow-500 px-4 py-2 text-white"
          onClick={requestNotificationPermission}
        >
          Permitir
        </button>
        <button
          className="ml-4 rounded-lg px-4 py-2"
          onClick={() => onRequestClose(false)}
        >
          Fechar
        </button>
      </div>
    </div>,
    document.body
  )
}

export default NotificationModal
