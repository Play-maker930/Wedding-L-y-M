import { useEffect, useState } from 'react'

function BotanicalCorner({ className }) {
  return (
    <svg
      className={`invitation-card-botanical ${className}`}
      viewBox="0 0 90 90"
      aria-hidden="true"
    >
      <path d="M12 78C27 62 39 46 50 23" />
      <path d="M27 62C19 60 15 54 14 48C22 49 28 53 31 58" />
      <path d="M36 50C30 45 29 38 31 32C38 36 41 42 40 47" />
      <path d="M45 34C43 27 46 20 51 16C55 23 54 29 50 34" />
      <path d="M20 69C13 68 8 63 6 58C13 58 19 61 22 66" />
      <path d="M50 24C57 21 64 22 69 26C64 31 58 32 52 29" />
      <circle cx="51" cy="21" r="1.4" />
      <circle cx="31" cy="31" r="1.2" />
    </svg>
  )
}

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

        <div className="invitation-card">
          <div className="invitation-card-inner-border" aria-hidden="true"></div>

          <BotanicalCorner className="top-left" />
          <BotanicalCorner className="top-right" />
          <BotanicalCorner className="bottom-left" />
          <BotanicalCorner className="bottom-right" />

          <div className="invitation-card-content">
            <img
              src={monogram}
              alt=""
              aria-hidden="true"
              className="invitation-card-monogram"
            />

            <div className="invitation-card-rule" aria-hidden="true">
              <span></span>
              <i>◆</i>
              <span></span>
            </div>

            <p className="invitation-card-kicker">
              INVITACIÓN DE BODA
            </p>

            <h1>
              Luis
              <span>&</span>
              Melanie
            </h1>

            <div className="invitation-card-date">
              15 · 01 · 27
            </div>

            <div className="invitation-card-place">
              MEDELLÍN · COLOMBIA
            </div>

            <button
              type="button"
              onClick={handleEnterInvitation}
            >
              ENTRAR A LA INVITACIÓN
              <span>→</span>
            </button>
          </div>
        </div>

        <div className="invitation-envelope-front"></div>

        <div className="invitation-envelope-flap"></div>

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
  )
}

export default InvitationEnvelope