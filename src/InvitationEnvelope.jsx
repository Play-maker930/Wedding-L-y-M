import { useEffect, useState } from 'react'

function InvitationEnvelope({
  isVisible,
  monogram,
  onStartMusic,
  onOpen,
}) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (!isVisible) {
      setIsAnimating(false)
      setIsLeaving(false)
      return undefined
    }

    const timer = window.setTimeout(() => {
      setIsAnimating(true)
    }, 350)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.clearTimeout(timer)
      document.body.style.overflow = previousOverflow
    }
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  const handleOpen = () => {
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
          isAnimating
            ? 'invitation-envelope is-open'
            : 'invitation-envelope'
        }
      >
        <div className="invitation-envelope-back"></div>

        <div className="invitation-card">
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
            onClick={handleOpen}
          >
            ABRIR INVITACIÓN
            <span>→</span>
          </button>
        </div>

        <div className="invitation-envelope-front"></div>

        <div className="invitation-envelope-flap">
          <img
            src={monogram}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>

      <p className="invitation-intro-caption">
        RIONEGRO · COLOMBIA
      </p>
    </div>
  )
}

export default InvitationEnvelope