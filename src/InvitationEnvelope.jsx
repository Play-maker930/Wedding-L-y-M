import { useEffect, useState } from 'react'

function InvitationEnvelope({
  isVisible,
  monogram,
  onStartMusic,
  onOpen,
}) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (!isVisible) {
      setIsEnvelopeOpen(false)
      setIsLeaving(false)
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  const handleEnvelopeOpen = () => {
    if (isEnvelopeOpen) {
      return
    }

    setIsEnvelopeOpen(true)
  }

  const handleEnterInvitation = () => {
    onStartMusic()
    setIsLeaving(true)

    window.setTimeout(() => {
      onOpen()
    }, 650)
  }

  return (
    <div
      className={
        isLeaving
          ? 'invitation-intro invitation-intro-leaving'
          : 'invitation-intro'
      }
      role="dialog"
      aria-modal="true"
      aria-label="Invitación de boda de Luis y Melanie"
    >
      <div className="invitation-intro-glow"></div>

      <div
        className={
          isEnvelopeOpen
            ? 'invitation-envelope is-open'
            : 'invitation-envelope is-closed'
        }
      >
        <div className="invitation-envelope-back"></div>

        <div className="invitation-card invitation-card-folding">
          <img
            src={monogram}
            alt=""
            aria-hidden="true"
            className="invitation-card-monogram"
          />

          <p>TIENES UNA INVITACIÓN</p>

          <h1>
            Luis
            <span>&</span>
            Melanie
          </h1>

          <div className="invitation-card-date">
            15 · 01 · 2027
          </div>

          <button
            type="button"
            onClick={handleEnterInvitation}
          >
            ENTRAR A LA INVITACIÓN
            <span>→</span>
          </button>
        </div>

        <div className="invitation-envelope-front"></div>

        <div className="invitation-envelope-flap">
          <button
            type="button"
            className="invitation-seal-button"
            onClick={handleEnvelopeOpen}
            aria-label="Abrir la invitación"
          >
            <span className="invitation-seal-halo"></span>

            <img
              src={monogram}
              alt=""
              aria-hidden="true"
            />

            <small>
              TOCA PARA ABRIR
            </small>
          </button>
        </div>
      </div>

      <p className="invitation-intro-caption">
        RIONEGRO · COLOMBIA
      </p>
    </div>
  )
}

export default InvitationEnvelope