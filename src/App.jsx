import { useState, useEffect, useRef } from 'react'
import './App.css'
import portadaImg from './assets/Portada.jpg'
import bodaFondoImg from './assets/la boda.jpg'
import dressCodeFormal from './assets/dress-code-formal.png'
import monogramGold from './assets/monogram_gold.png'
import weddingMusic from './assets/wedding-music.m4a'
import InvitationEnvelope from './InvitationEnvelope'


function LineIcon({ name, size = 22, strokeWidth = 1.5 }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  const icons = {
    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="m12 19-7-7 7-7" />
      </>
    ),
    chevronLeft: (
      <path d="m15 18-6-6 6-6" />
    ),
    chevronRight: (
      <path d="m9 18 6-6-6-6" />
    ),
    warning: (
      <>
        <path d="M10.3 3.7 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    priceTag: (
      <>
        <path d="M20.6 13.6 11 23.2 1.8 14 11.4 4.4H20v8.6Z" transform="scale(.9) translate(1.3 -1.1)" />
        <circle cx="16.2" cy="7.8" r="1.1" />
      </>
    ),
    key: (
      <>
        <circle cx="7.5" cy="15.5" r="4.5" />
        <path d="m11 12 8-8M16 7l2 2M14 9l2 2" />
      </>
    ),
    breakfast: (
      <>
        <path d="M4 11h12a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4Z" />
        <path d="M6 19h8M10 15v4M18 8h1a2 2 0 0 1 0 4h-2" />
        <path d="M7 4c0 1 1 1.5 1 2.5S7 8 7 9M11 4c0 1 1 1.5 1 2.5S11 8 11 9" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z" />
        <path d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
      </>
    ),
    passport: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <circle cx="12" cy="11" r="3" />
        <path d="M9 11h6M12 8v6M8 17h8" />
      </>
    ),
    users2: (
      <>
        <circle cx="8" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M2.5 20c.6-4 2.7-6 5.5-6s4.9 2 5.5 6M13.5 15c2.8 0 4.8 1.6 5.5 5" />
      </>
    ),
    users3: (
      <>
        <circle cx="12" cy="7" r="3" />
        <circle cx="5" cy="10" r="2.3" />
        <circle cx="19" cy="10" r="2.3" />
        <path d="M6.5 20c.7-4.2 2.7-6.2 5.5-6.2s4.8 2 5.5 6.2M1.5 20c.4-2.8 1.7-4.4 3.8-4.8M22.5 20c-.4-2.8-1.7-4.4-3.8-4.8" />
      </>
    ),
    users4: (
      <>
        <circle cx="8" cy="7" r="2.5" />
        <circle cx="16" cy="7" r="2.5" />
        <circle cx="5" cy="13" r="2" />
        <circle cx="19" cy="13" r="2" />
        <path d="M2 21c.5-3 2-4.5 4.5-4.5M22 21c-.5-3-2-4.5-4.5-4.5M6 21c.7-4 2.7-6 6-6s5.3 2 6 6" />
      </>
    ),
    bus: (
      <>
        <rect x="5" y="3" width="14" height="16" rx="3" />
        <path d="M8 3v3h8V3M5 10h14M8 15h.01M16 15h.01M7 19v2M17 19v2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9Z" />
    ),
    hotel: (
      <>
        <path d="M4 21V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v16" />
        <path d="M2 21h20M8 7h2M8 11h2M8 15h2M14 7h1M14 11h1M14 15h1" />
      </>
    ),
    plane: (
      <>
        <path d="M22 16.5 13.5 12V5.5a1.5 1.5 0 0 0-3 0V12L2 16.5v2l8.5-2.5v4L8 21.5V23l4-1 4 1v-1.5L13.5 20v-4l8.5 2.5Z" />
      </>
    ),
    mapPin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 5-3 8 3 5-3v15l-5 3-8-3-5 3Z" />
        <path d="M8 3v15M16 6v15" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.8 9a2.4 2.4 0 1 1 3.5 2.1c-.8.4-1.3 1-1.3 1.9" />
        <path d="M12 17h.01" />
      </>
    ),
    suitcase: (
      <>
        <rect x="5" y="7" width="14" height="14" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M9 11v6M15 11v6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    coat: (
      <>
        <path d="M9 3 6 5 3 10l3 2v9h12v-9l3-2-3-5-3-2" />
        <path d="M9 3c0 2 1.3 3 3 3s3-1 3-3M9 11h6" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    umbrella: (
      <>
        <path d="M3 12a9 9 0 0 1 18 0H3Z" />
        <path d="M12 12v7a2 2 0 0 0 4 0" />
      </>
    ),
    mountain: (
      <>
        <path d="m3 20 6-10 4 6 2-3 6 7Z" />
        <path d="m7.5 12.5 1.5 1.5 1.5-1.5" />
      </>
    ),
    camera: (
      <>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="m8 6 1.5-2h5L16 6" />
        <circle cx="12" cy="12.5" r="3.2" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 5h14a2 2 0 0 1 2 2v12H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        <path d="M16 11h6v5h-6a2.5 2.5 0 0 1 0-5Z" />
      </>
    ),
  }



  return (
    <svg {...commonProps}>
      {icons[name] || icons.sparkle}
    </svg>
  )
}

function App() {
  const [showInvitation, setShowInvitation] = useState(true)
  const musicRef = useRef(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  const [activePage, setActivePage] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)
  const [hotelSlide, setHotelSlide] = useState(0)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)

  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    email: '',
    attendance: '',
    guestCount: '1',
    guestNames: [''],
    message: '',
  })

  const [rsvpStatus, setRsvpStatus] = useState({
    state: 'idle',
    message: '',
  })

  const hotelPhotos = [
    'https://images.trvl-media.com/lodging/1000000/520000/519900/519824/4d45af49.jpg?impolicy=resizecrop&rw=1200&ra=fit',
    'https://images.trvl-media.com/lodging/1000000/520000/519900/519824/bbe5ea80.jpg?impolicy=resizecrop&rw=1200&ra=fit',
    'https://images.trvl-media.com/lodging/1000000/520000/519900/519824/2c01acea.jpg?impolicy=resizecrop&rw=1200&ra=fit',
    'https://images.trvl-media.com/lodging/1000000/520000/519900/519824/c3c6205d.jpg?impolicy=resizecrop&rw=1200&ra=fit',
    'https://images.trvl-media.com/lodging/1000000/520000/519900/519824/832bf158.jpg?impolicy=resizecrop&rw=1200&ra=fit',
    'https://images.trvl-media.com/lodging/1000000/520000/519900/519824/1a3f5742.jpg?impolicy=resizecrop&rw=1200&ra=fit',
    'https://images.trvl-media.com/lodging/1000000/520000/519900/519824/0adc0142.jpg?impolicy=resizecrop&rw=1200&ra=fit',
  ]

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const weddingDate = new Date('2027-01-15T00:00:00-05:00')

    const updateCountdown = () => {
      const now = new Date()
      const difference = weddingDate - now

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      )

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      )

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      )

      const seconds = Math.floor(
        (difference / 1000) % 60
      )

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      })
    }

    updateCountdown()

    const timer = setInterval(updateCountdown, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (
      activePage !== 'hospedaje' ||
      carouselPaused ||
      hotelPhotos.length < 2
    ) {
      return undefined
    }

    const carouselTimer = setInterval(() => {
      setHotelSlide((currentSlide) =>
        (currentSlide + 1) % hotelPhotos.length
      )
    }, 5000)

    return () => clearInterval(carouselTimer)
  }, [activePage, carouselPaused, hotelPhotos.length])

  const showPreviousHotelPhoto = () => {
    setHotelSlide((currentSlide) =>
      (currentSlide - 1 + hotelPhotos.length) %
      hotelPhotos.length
    )
  }

  const showNextHotelPhoto = () => {
    setHotelSlide((currentSlide) =>
      (currentSlide + 1) % hotelPhotos.length
    )
  }

  const handleCarouselTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX)
    setCarouselPaused(true)
  }

  const handleCarouselTouchEnd = (event) => {
    if (touchStartX === null) {
      return
    }

    const touchEndX = event.changedTouches[0].clientX
    const swipeDistance = touchStartX - touchEndX

    if (Math.abs(swipeDistance) > 45) {
      if (swipeDistance > 0) {
        showNextHotelPhoto()
      } else {
        showPreviousHotelPhoto()
      }
    }

    setTouchStartX(null)
    setCarouselPaused(false)
  }

  /* =================================
     CALENDARIO
  ================================= */

  const addToCalendar = ({
    title,
    start,
    end,
    location,
    description,
  }) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Luis y Melanie//Boda//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@luisymelanie.com`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART;TZID=America/Bogota:${start}`,
      `DTEND;TZID=America/Bogota:${end}`,
      `SUMMARY:${escapeICS(title)}`,
      `LOCATION:${escapeICS(location)}`,
      `DESCRIPTION:${escapeICS(description)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')

    const blob = new Blob(
      [icsContent],
      {
        type: 'text/calendar;charset=utf-8',
      }
    )

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/gi, '-')}.ics`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  const formatICSDate = (date) => {
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const day = String(date.getUTCDate()).padStart(2, '0')
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')
    const seconds = String(date.getUTCSeconds()).padStart(2, '0')

    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`
  }

  const escapeICS = (text) => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;')
  }

  const pages = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'historia', label: 'Nuestra historia' },
    { id: 'boda', label: 'La boda' },
    { id: 'informacion', label: 'Información' },
    { id: 'galeria', label: 'Galería' },
    { id: 'rsvp', label: 'RSVP' },
  ]

  const navigate = (page) => {
    setActivePage(page)
    setMenuOpen(false)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }


  const startWeddingMusic = async () => {
    const audio = musicRef.current

    if (!audio) {
      return
    }

    audio.volume = 0.32

    try {
      await audio.play()
      setIsMusicPlaying(true)
    } catch (error) {
      console.warn(
        'El navegador no permitió iniciar la música.',
        error
      )
    }
  }

  const toggleWeddingMusic = async () => {
    const audio = musicRef.current

    if (!audio) {
      return
    }

    if (audio.paused) {
      try {
        await audio.play()
        setIsMusicPlaying(true)
      } catch (error) {
        console.warn(
          'No fue posible reproducir la música.',
          error
        )
      }

      return
    }

    audio.pause()
    setIsMusicPlaying(false)
  }

  const openInvitation = () => {
    setShowInvitation(false)
  }

  const updateRsvpField = (field, value) => {
    setRsvpForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))

    if (rsvpStatus.state !== 'idle') {
      setRsvpStatus({
        state: 'idle',
        message: '',
      })
    }
  }

  const selectAttendance = (attendance) => {
    setRsvpForm((currentForm) => ({
      ...currentForm,
      attendance,
      guestCount:
        attendance === 'no'
          ? '1'
          : currentForm.guestCount,
      guestNames:
        attendance === 'no'
          ? ['']
          : currentForm.guestNames,
    }))

    setRsvpStatus({
      state: 'idle',
      message: '',
    })
  }

  const updateGuestCount = (guestCount) => {
    const totalGuests = Number(guestCount)

    setRsvpForm((currentForm) => ({
      ...currentForm,
      guestCount,
      guestNames: Array.from(
        { length: Math.max(totalGuests - 1, 0) },
        (_, index) => currentForm.guestNames[index] || ''
      ),
    }))
  }

  const updateGuestName = (index, value) => {
    setRsvpForm((currentForm) => ({
      ...currentForm,
      guestNames: currentForm.guestNames.map(
        (guestName, guestIndex) =>
          guestIndex === index ? value : guestName
      ),
    }))
  }

  const submitRsvp = async (event) => {
    event.preventDefault()

    if (!rsvpForm.name.trim()) {
      setRsvpStatus({
        state: 'error',
        message: 'Por favor, escribe tu nombre y apellido.',
      })
      return
    }

    if (!rsvpForm.email.trim()) {
      setRsvpStatus({
        state: 'error',
        message: 'Por favor, escribe tu correo electrónico.',
      })
      return
    }

    if (!rsvpForm.attendance) {
      setRsvpStatus({
        state: 'error',
        message: 'Por favor, indícanos si podrás acompañarnos.',
      })
      return
    }

    if (
      rsvpForm.attendance === 'yes' &&
      Number(rsvpForm.guestCount) > 1 &&
      rsvpForm.guestNames.some(
        (guestName) => !guestName.trim()
      )
    ) {
      setRsvpStatus({
        state: 'error',
        message:
          'Por favor, completa el nombre de cada acompañante.',
      })
      return
    }

    const formspreeEndpoint =
      import.meta.env.VITE_FORMSPREE_ENDPOINT

    if (!formspreeEndpoint) {
      setRsvpStatus({
        state: 'error',
        message:
          'El formulario todavía no está conectado. Agrega VITE_FORMSPREE_ENDPOINT en Vercel.',
      })
      return
    }

    setRsvpStatus({
      state: 'submitting',
      message: '',
    })

    const payload = {
      nombre: rsvpForm.name.trim(),
      correo: rsvpForm.email.trim(),
      asistencia:
        rsvpForm.attendance === 'yes'
          ? 'Sí, asistiré'
          : 'No podré asistir',
      cantidad_de_personas:
        rsvpForm.attendance === 'yes'
          ? rsvpForm.guestCount
          : '0',
      acompañantes:
        rsvpForm.attendance === 'yes' &&
        rsvpForm.guestNames.length
          ? rsvpForm.guestNames
              .map((guestName) => guestName.trim())
              .join(', ')
          : 'No aplica',
      mensaje:
        rsvpForm.message.trim() ||
        'Sin mensaje adicional',
      boda: 'Luis & Melanie · 15 de enero de 2027',
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('No fue posible enviar la respuesta.')
      }

      setRsvpStatus({
        state:
          rsvpForm.attendance === 'yes'
            ? 'success-yes'
            : 'success-no',
        message: '',
      })

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } catch (error) {
      setRsvpStatus({
        state: 'error',
        message:
          'No pudimos enviar tu confirmación. Inténtalo nuevamente en unos minutos.',
      })
    }
  }

  const resetRsvp = () => {
    setRsvpForm({
      name: '',
      email: '',
      attendance: '',
      guestCount: '1',
      guestNames: [''],
      message: '',
    })

    setRsvpStatus({
      state: 'idle',
      message: '',
    })
  }

  return (
    <>
      <audio
        ref={musicRef}
        src={weddingMusic}
        preload="auto"
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
        onEnded={() => setIsMusicPlaying(false)}
      />

      <InvitationEnvelope
        isVisible={showInvitation}
        monogram={monogramGold}
        onStartMusic={startWeddingMusic}
        onOpen={openInvitation}
      />

      {!showInvitation && (
        <button
          type="button"
          className={
            isMusicPlaying
              ? 'music-control is-playing'
              : 'music-control'
          }
          onClick={toggleWeddingMusic}
          aria-label={
            isMusicPlaying
              ? 'Pausar música'
              : 'Reproducir música'
          }
          title={
            isMusicPlaying
              ? 'Pausar música'
              : 'Reproducir música'
          }
        >
          <span className="music-control-icon">
            {isMusicPlaying ? '♫' : '♪'}
          </span>

          <span className="music-control-label">
            {isMusicPlaying ? 'PAUSAR' : 'MÚSICA'}
          </span>
        </button>
      )}

      <div className="site">

      {/* ================================
          NAVEGACIÓN
      ================================= */}

      <header className="navigation">

        <button
          className="brand"
          onClick={() => navigate('inicio')}
          aria-label="Ir al inicio"
        >
          <img
            src={monogramGold}
            alt="Monograma de Luis y Melanie"
            className="monogram-header"
          />
        </button>

        <nav className="desktop-nav">
          {pages.map((page) => (
            <button
              key={page.id}
              className={
                activePage === page.id
                  ? 'nav-link active'
                  : 'nav-link'
              }
              onClick={() => navigate(page.id)}
            >
              {page.label}
            </button>
          ))}
        </nav>

        <div className="date-small">
          15 · 01 · 2027
        </div>

        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? '×' : '☰'}
        </button>

      </header>

      {/* ================================
          MENÚ MOBILE
      ================================= */}

      <div
        className={
          menuOpen
            ? 'mobile-menu mobile-menu-open'
            : 'mobile-menu'
        }
      >

        <div className="mobile-menu-header">
          <button
            className="mobile-menu-brand"
            onClick={() => navigate('inicio')}
            aria-label="Ir al inicio"
          >
            <img
              src={monogramGold}
              alt="Monograma de Luis y Melanie"
            />
          </button>

          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            ×
          </button>
        </div>

        <div className="mobile-menu-links">

          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => navigate(page.id)}
              className={
                activePage === page.id
                  ? 'mobile-nav-link selected'
                  : 'mobile-nav-link'
              }
            >
              <span>
                {String(index + 1).padStart(2, '0')}
              </span>

              {page.label}
            </button>
          ))}

        </div>

        <div className="mobile-menu-footer">
          <span>15 · ENERO · 2027</span>
          <span>MEDELLÍN · COLOMBIA</span>
        </div>

      </div>

      {/* ================================
          CONTENIDO
      ================================= */}

      <main className="page">

        {/* ================================
            INICIO
        ================================= */}

        {activePage === 'inicio' && (
          <section className="home-page page-transition">

            <div className="home-image">
              <img
                src={portadaImg}
                alt="Luis y Melanie"
              />
            </div>

            <div className="home-content">

              <img
                src={monogramGold}
                alt=""
                aria-hidden="true"
                className="home-monogram-watermark"
              />

              <p className="eyebrow">
                NOS CASAMOS
              </p>

              <h1>
                Luis
                <span>&</span>
                Melanie
              </h1>

              <div className="home-date">
                <span>15</span>
                <div></div>
                <span>ENERO</span>
                <div></div>
                <span>2027</span>
              </div>

              <div className="countdown">

                <p>FALTAN</p>

                <div className="countdown-values">

                  <div>
                    <strong>{timeLeft.days}</strong>
                    <span>DÍAS</span>
                  </div>

                  <i>:</i>

                  <div>
                    <strong>
                      {String(timeLeft.hours).padStart(2, '0')}
                    </strong>
                    <span>HORAS</span>
                  </div>

                  <i>:</i>

                  <div>
                    <strong>
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </strong>
                    <span>MINUTOS</span>
                  </div>

                  <i>:</i>

                  <div>
                    <strong>
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </strong>
                    <span>SEGUNDOS</span>
                  </div>

                </div>

              </div>

              <p className="home-location">
                MEDELLÍN · VILLA CELESTE
              </p>

              <div className="home-bottom">

                <p>
                  Estamos felices de compartir
                  <br />
                  este día tan especial contigo.
                </p>

                <button
                  onClick={() => navigate('boda')}
                  className="text-button"
                >
                  DESCUBRE LA BODA
                  <span>→</span>
                </button>

              </div>

            </div>

          </section>
        )}

        {/* ================================
            HISTORIA
        ================================= */}

        {activePage === 'historia' && (
          <section className="inner-page page-transition">

            <div className="inner-heading">
              <p className="eyebrow">
                NOSOTROS
              </p>

              <h2>
                Nuestra <em>historia</em>
              </h2>
            </div>

            <div className="story-grid">

              <div className="story-image">
                <span>FOTOGRAFÍA</span>
              </div>

              <div className="story-text">

                <span className="number">
                  01
                </span>

                <h3>
                  El comienzo
                </h3>

                <p>
                  Aquí contaremos cómo comenzó nuestra
                  historia, ese primer encuentro y todos
                  esos momentos que nos trajeron hasta
                  este día.
                </p>

                <span className="number second">
                  02
                </span>

                <h3>
                  El siguiente capítulo
                </h3>

                <p>
                  Una historia que sigue creciendo y que
                  estamos felices de compartir con las
                  personas que más queremos.
                </p>

              </div>

            </div>

          </section>
        )}

        {/* ================================
            LA BODA
        ================================= */}

        {activePage === 'boda' && (
          <section className="wedding-page page-transition">

            {/* INTRO CON FOTO DE FONDO */}

            <section
              className="wedding-intro"
              style={{
                backgroundImage: `linear-gradient(
                  rgba(28, 27, 25, 0.35),
                  rgba(28, 27, 25, 0.35)
                ), url("${bodaFondoImg}")`,
              }}
            >

              <p className="section-kicker">
                EL GRAN DÍA
              </p>

              <h1>
                La boda
              </h1>

              <div className="decorative-line">
                <span></span>
                <i>♡</i>
                <span></span>
              </div>

              <p className="intro-text">
                Un día para celebrar nuestro amor junto a las personas
                que más queremos.
              </p>

              <div className="date-display">
                <span>15</span>

                <div>
                  <strong>ENERO</strong>
                  <small>2027</small>
                </div>
              </div>

              <p className="city">
                RIONEGRO, MEDELLÍN
              </p>

            </section>

            {/* UBICACIONES */}

            <section className="venues-section">

              <div className="section-heading">

                <p className="section-kicker">
                  UBICACIONES
                </p>

                <h2>
                  Dos lugares, un mismo día
                </h2>

              </div>

              <div className="venue-grid">

                {/* CEREMONIA */}

                <article className="venue-card">

                  <div className="venue-number">
                    01
                  </div>

                  <div className="venue-image">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqwv67X6UuHbIqh_XnKxqYepUZUewh8_hn1x-SwqMYddn8IflGbdM-BuRo&s=10"
                      alt="Parroquia María Madre de Dios"
                    />
                  </div>

                  <div className="venue-info">

                    <p className="venue-type">
                      CEREMONIA
                    </p>

                    <h3>
                      Parroquia María Madre de Dios
                    </h3>

                    <p className="venue-city">
                      Rionegro, Medellín
                    </p>

                    <p className="venue-description">
                      Comenzamos nuestro día más especial
                      rodeados de quienes más queremos.
                    </p>

                    <div className="venue-actions">

                      <a
                        href="https://maps.app.goo.gl/FHVkaW2yG1aKZSuQ8"
                        target="_blank"
                        rel="noreferrer"
                        className="map-button"
                      >
                        Ver ubicación
                        <span>→</span>
                      </a>

                      <button
                        className="calendar-button"
                        onClick={() =>
                          addToCalendar({
                            title: 'Ceremonia — Luis & Melanie',
                            start: '20270115T160000',
                            end: '20270115T170000',
                            location:
                              'Parroquia María Madre de Dios, Rionegro, Medellín, Colombia',
                            description:
                              'Ceremonia de matrimonio de Luis y Melanie.',
                          })
                        }
                      >
                        <span>＋</span>
                        AGREGAR AL CALENDARIO
                      </button>

                    </div>

                  </div>

                </article>

                {/* VILLA CELESTE */}

                <article className="venue-card featured">

                  <div className="venue-number">
                    02
                  </div>

                  <div className="venue-image">
                    <img
                      src="https://images.pixieset.com/47662229/51c69cd63d50919fcd4655c2833839fd-xxlarge.jpg"
                      alt="Centro de Eventos Villa Celeste"
                    />
                  </div>

                  <div className="venue-info">

                    <p className="venue-type">
                      RECEPCIÓN & FIESTA
                    </p>

                    <h3>
                      Centro de Eventos Villa Celeste
                    </h3>

                    <p className="venue-city">
                      Rionegro, Medellín
                    </p>

                    <p className="venue-description">
                      Después de la ceremonia, nos encontramos
                      para brindar, celebrar y disfrutar juntos.
                    </p>

                    <div className="venue-actions">

                      <a
                        href="https://maps.app.goo.gl/KMGNEnh7BD2gjPHz9"
                        target="_blank"
                        rel="noreferrer"
                        className="map-button"
                      >
                        Ver ubicación
                        <span>→</span>
                      </a>

                      <button
                        className="calendar-button"
                        onClick={() =>
                          addToCalendar({
                            title: 'Recepción y Fiesta — Luis & Melanie',
                            start: '20270115T173000',
                            end: '20270116T020000',
                            location:
                              'Centro de Eventos Villa Celeste, Rionegro, Medellín, Colombia',
                            description:
                              'Recepción y fiesta de matrimonio de Luis y Melanie.',
                          })
                        }
                      >
                        <span>＋</span>
                        AGREGAR AL CALENDARIO
                      </button>

                    </div>

                  </div>

                </article>

              </div>

            </section>

            {/* DRESS CODE */}

            <section className="dress-code-section dress-code-simple">

              <div className="dress-code-heading">
                <p className="section-kicker">
                  DRESS CODE
                </p>

                <h2>
                  Elegancia para
                  <em> una noche inolvidable</em>
                </h2>

                <p>
                  Queremos que todos se sientan cómodos y
                  elegantes mientras celebramos con nosotros.
                </p>
              </div>

              <div className="dress-code-visual">
                <img
                  src={dressCodeFormal}
                  alt="Código de vestimenta formal para mujeres y caballeros"
                />
              </div>

              <div className="dress-code-details">

                <div className="dress-code-detail-block">
                  <span>MUJERES</span>

                  <h3>
                    Vestido largo
                  </h3>

                  <div className="dress-code-avoid">
                    <strong>EVITAR</strong>

                    <div className="dress-code-color-list">

                      <div className="dress-code-color-item">
                        <span
                          className="dress-code-color-swatch color-white"
                          aria-hidden="true"
                        ></span>

                        <small>BLANCO</small>
                      </div>

                      <div className="dress-code-color-item">
                        <span
                          className="dress-code-color-swatch color-olive"
                          aria-hidden="true"
                        ></span>

                        <small>VERDE OLIVA</small>
                      </div>

                    </div>

                    <p>
                      El verde oliva está reservado para
                      nuestras damas de honor.
                    </p>
                  </div>
                </div>

                <div className="dress-code-detail-divider"></div>

                <div className="dress-code-detail-block">
                  <span>CABALLEROS</span>

                  <h3>
                    Traje formal completo
                  </h3>

                  <p>
                    Recomendamos traje en tonos oscuros,
                    camisa de vestir y zapatos formales.
                  </p>
                </div>

              </div>

            </section>

            {/* FOOTER BODA */}

            <section className="wedding-footer">

              <div className="small-heart">
                ♡
              </div>

              <p>
                Estamos felices de compartir este día
                contigo.
              </p>

              <strong>
                Luis & Melanie
              </strong>

            </section>

          </section>
        )}

        {/* ================================
            INFORMACIÓN
        ================================= */}

        {activePage === 'informacion' && (
          <section className="inner-page information-page page-transition">

            <div className="inner-heading">

              <p className="eyebrow">
                TODO LO QUE NECESITAS SABER
              </p>

              <h2>
                Información
              </h2>

              <p className="information-intro">
                Hemos reunido aquí los detalles más importantes
                para que puedas organizar tu viaje y disfrutar
                cada momento con tranquilidad.
              </p>

            </div>

            <div className="info-grid">

              <button
                className="info-card"
                onClick={() => navigate('hospedaje')}
              >
                <span className="info-number">01</span>

                <span className="info-icon">
                  <LineIcon name="hotel" size={30} />
                </span>

                <span className="info-card-copy">
                  <strong>Hospedaje</strong>
                  <small>
                    Hotel sede, tarifa especial y reservas
                  </small>
                </span>

                <span className="info-arrow">→</span>
              </button>

              <button
                className="info-card"
                onClick={() => navigate('vuelos')}
              >
                <span className="info-number">02</span>

                <span className="info-icon">
                  <LineIcon name="plane" size={30} />
                </span>

                <span className="info-card-copy">
                  <strong>Vuelos</strong>
                  <small>
                    Aeropuerto recomendado y guía de viaje
                  </small>
                </span>

                <span className="info-arrow">→</span>
              </button>

              <button className="info-card">
                <span className="info-number">03</span>

                <span className="info-icon">
                  <LineIcon name="bus" size={30} />
                </span>

                <span className="info-card-copy">
                  <strong>Transporte</strong>
                  <small>
                    Cómo llegar y movilizarse durante la boda
                  </small>
                </span>

                <span className="info-arrow">→</span>
              </button>

              <button
                className="info-card"
                onClick={() => navigate('medellin')}
              >
                <span className="info-number">04</span>

                <span className="info-icon">
                  <LineIcon name="mapPin" size={30} />
                </span>

                <span className="info-card-copy">
                  <strong>Medellín</strong>
                  <small>
                    Recomendaciones para disfrutar la ciudad
                  </small>
                </span>

                <span className="info-arrow">→</span>
              </button>

              <button className="info-card">
                <span className="info-number">05</span>

                <span className="info-icon">
                  <LineIcon name="help" size={30} />
                </span>

                <span className="info-card-copy">
                  <strong>Preguntas frecuentes</strong>
                  <small>
                    Respuestas para planificar tu experiencia
                  </small>
                </span>

                <span className="info-arrow">→</span>
              </button>

            </div>

          </section>
        )}

        {/* ================================
            HOSPEDAJE
        ================================= */}

        {activePage === 'hospedaje' && (
          <section className="stay-page page-transition">

            <button
              type="button"
              className="stay-back-button"
              onClick={() => navigate('informacion')}
            >
              <LineIcon name="arrowLeft" size={18} />
              VOLVER A INFORMACIÓN
            </button>

            <section className="stay-hero">
              <div className="stay-hero-overlay"></div>

              <div className="stay-hero-content">
                <p className="section-kicker">YOUR STAY</p>

                <h1>
                  Movich
                  <em> Las Lomas</em>
                </h1>

                <p className="stay-hero-location">
                  RIONEGRO · COLOMBIA
                </p>

                <p className="stay-hero-copy">
                  Nuestro hotel sede para compartir juntos
                  el fin de semana de la boda.
                </p>
              </div>
            </section>

            <section className="stay-summary-wrap">
              <div className="stay-summary-card">

                <div className="stay-summary-item">
                  <div className="stay-summary-icon">
                    <LineIcon name="calendar" size={29} />
                  </div>

                  <div className="stay-summary-copy">
                    <span>FECHAS</span>
                    <strong>14 — 16</strong>
                    <small>ENERO 2027</small>
                  </div>
                </div>

                <div className="stay-summary-divider"></div>

                <div className="stay-summary-item">
                  <div className="stay-summary-icon">
                    <LineIcon name="priceTag" size={29} />
                  </div>

                  <div className="stay-summary-copy">
                    <span>TARIFA</span>
                    <strong>COP 445.000</strong>
                    <small>POR NOCHE · HABITACIÓN DOBLE</small>
                  </div>
                </div>

                <div className="stay-summary-divider"></div>

                <div className="stay-summary-item stay-code">
                  <div className="stay-summary-icon">
                    <LineIcon name="key" size={29} />
                  </div>

                  <div className="stay-summary-copy">
                    <span>CÓDIGO DE GRUPO</span>
                    <strong>OJ6</strong>
                    <small>PARA ACCEDER A LA TARIFA ESPECIAL</small>
                  </div>
                </div>

                <div className="stay-summary-actions">
                  <a
                    href="https://bookings.movichhotels.com/es/search-rates"
                    target="_blank"
                    rel="noreferrer"
                    className="stay-button primary"
                  >
                    RESERVAR HABITACIÓN
                    <span>↗</span>
                  </a>

                  <a
                    href="https://wa.me/573162893777"
                    target="_blank"
                    rel="noreferrer"
                    className="stay-button secondary"
                  >
                    RESERVAR POR WHATSAPP
                    <span>↗</span>
                  </a>
                </div>

              </div>
            </section>

            <section className="stay-intro">

              <div className="stay-intro-title">
                <p className="section-kicker">
                  HOTEL SEDE
                </p>

                <h2>
                  Tu hogar durante
                  <em> la celebración</em>
                </h2>
              </div>

              <section
                className="stay-gallery"
                aria-label="Galería del hotel Movich Las Lomas"
                onMouseEnter={() => setCarouselPaused(true)}
                onMouseLeave={() => setCarouselPaused(false)}
                onFocusCapture={() => setCarouselPaused(true)}
                onBlurCapture={() => setCarouselPaused(false)}
                onTouchStart={handleCarouselTouchStart}
                onTouchEnd={handleCarouselTouchEnd}
              >
                <div className="stay-gallery-viewport">
                  <div
                    className="stay-gallery-track"
                    style={{
                      transform: `translateX(-${hotelSlide * 100}%)`,
                    }}
                  >
                    {hotelPhotos.map((photo, index) => (
                      <figure
                        className="stay-gallery-slide"
                        key={photo}
                        aria-hidden={hotelSlide !== index}
                      >
                        <img
                          src={photo}
                          alt={`Movich Las Lomas — fotografía ${index + 1}`}
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                      </figure>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="stay-gallery-arrow previous"
                    onClick={showPreviousHotelPhoto}
                    aria-label="Ver fotografía anterior"
                  >
                    <LineIcon name="chevronLeft" size={28} />
                  </button>

                  <button
                    type="button"
                    className="stay-gallery-arrow next"
                    onClick={showNextHotelPhoto}
                    aria-label="Ver fotografía siguiente"
                  >
                    <LineIcon name="chevronRight" size={28} />
                  </button>

                  <div className="stay-gallery-counter">
                    {String(hotelSlide + 1).padStart(2, '0')}
                    <span>/</span>
                    {String(hotelPhotos.length).padStart(2, '0')}
                  </div>
                </div>

                <div className="stay-gallery-dots">
                  {hotelPhotos.map((photo, index) => (
                    <button
                      type="button"
                      key={photo}
                      className={
                        hotelSlide === index
                          ? 'stay-gallery-dot active'
                          : 'stay-gallery-dot'
                      }
                      onClick={() => setHotelSlide(index)}
                      aria-label={`Ver fotografía ${index + 1}`}
                      aria-current={
                        hotelSlide === index ? 'true' : undefined
                      }
                    />
                  ))}
                </div>
              </section>

              <div className="stay-intro-copy">
                <div className="stay-intro-paragraphs">
                  <p>
                    Hemos elegido el Movich Las Lomas como hotel
                    sede para que nuestros invitados puedan
                    disfrutar el fin de semana con mayor comodidad.
                  </p>

                  <p>
                    La tarifa especial está disponible del
                    <strong> 14 al 16 de enero de 2027</strong> e
                    incluye desayuno.
                  </p>
                </div>

                <div className="stay-notice">
                  <div className="stay-notice-icon">
                    <LineIcon name="warning" size={24} />
                  </div>

                  <div>
                    <span>IMPORTANTE</span>

                    <p>
                      Al momento de reservar, selecciona
                      <strong> Movich Las Lomas — Rionegro</strong>.
                      Existe otro hotel Movich en Medellín.
                    </p>
                  </div>
                </div>
              </div>

            </section>

            <section className="stay-included">

              <p className="section-kicker">
                LA TARIFA INCLUYE
              </p>

              <div className="stay-included-grid">

                <article>
                  <div className="stay-included-title">
                    <div className="stay-icon-wrap">
                      <LineIcon name="breakfast" size={27} />
                    </div>
                    <h3>Desayuno incluido</h3>
                  </div>
                  <p>
                    Incluido para los huéspedes registrados
                    en la reserva.
                  </p>
                </article>

                <article>
                  <div className="stay-included-title">
                    <div className="stay-icon-wrap">
                      <LineIcon name="priceTag" size={27} />
                    </div>
                    <h3>Tarifa especial</h3>
                  </div>
                  <p>
                    COP 445.000 por noche para habitación
                    doble.
                  </p>
                </article>

                <article>
                  <div className="stay-included-title">
                    <div className="stay-icon-wrap">
                      <LineIcon name="passport" size={27} />
                    </div>
                    <h3>Exención de IVA</h3>
                  </div>
                  <p>
                    Aplicable según las condiciones
                    establecidas por el hotel.
                  </p>
                </article>

              </div>

            </section>

            <section className="stay-rooms">

              <div className="stay-section-heading">
                <p className="section-kicker">
                  HABITACIONES
                </p>

                <h2>
                  Opciones para cada grupo
                </h2>

                <p>
                  Elige la alternativa que mejor se adapte
                  a tu reserva.
                </p>
              </div>

              <div className="stay-room-list">

                <article className="stay-room-row">
                  <div className="stay-room-icon">
                    <LineIcon name="users2" size={28} />
                  </div>

                  <div>
                    <h3>Habitación doble</h3>
                    <p>
                      Hasta dos huéspedes. La tarifa es de
                      COP 445.000 por noche e incluye desayuno.
                    </p>
                  </div>

                  <strong className="stay-room-rate">
                    COP 445.000
                    <small>POR NOCHE</small>
                  </strong>
                </article>

                <article className="stay-room-row">
                  <div className="stay-room-icon">
                    <LineIcon name="users3" size={30} />
                  </div>

                  <div>
                    <h3>Tres huéspedes</h3>
                    <p>
                      Selecciona una habitación
                      <strong> Estándar Twin</strong> e indica
                      en los comentarios que requieres una
                      persona adicional.
                    </p>
                  </div>

                  <strong className="stay-room-rate">
                    + COP 135.000
                    <small>POR NOCHE · DESAYUNO INCLUIDO</small>
                  </strong>
                </article>

                <article className="stay-room-row">
                  <div className="stay-room-icon">
                    <LineIcon name="users4" size={31} />
                  </div>

                  <div>
                    <h3>Cuatro huéspedes</h3>
                    <p>
                      Se requieren dos habitaciones. Realiza
                      la reserva por WhatsApp y solicita que
                      sean habitaciones conectadas.
                    </p>
                  </div>

                  <a
                    href="https://wa.me/573162893777"
                    target="_blank"
                    rel="noreferrer"
                    className="stay-room-link"
                  >
                    SOLICITAR POR WHATSAPP
                    <span>→</span>
                  </a>
                </article>

              </div>

            </section>

            <section className="stay-airport">

              <div className="stay-airport-content">
                <p className="section-kicker">
                  TRANSPORTE DESDE EL AEROPUERTO
                </p>

                <div className="stay-airport-title">
                  <div className="stay-airport-icon">
                    <LineIcon name="bus" size={46} strokeWidth={1.25} />
                  </div>

                  <h2>
                    Llegar será muy fácil
                  </h2>
                </div>

                <p>
                  El hotel incluye transporte desde y hacia
                  el Aeropuerto Internacional José María
                  Córdova (MDE).
                </p>

                <p>
                  Coordina tu traslado directamente con el hotel:
                </p>

                <strong>
                  +57 316 3372926
                </strong>

                <a
                  href="https://wa.me/573163372926"
                  target="_blank"
                  rel="noreferrer"
                  className="stay-airport-button"
                >
                  COORDINAR TRANSPORTE
                  <span>↗</span>
                </a>
              </div>

            </section>

            <section className="stay-steps">

              <div className="stay-section-heading compact">
                <p className="section-kicker">
                  CÓMO RESERVAR
                </p>

                <h2>
                  Tres pasos sencillos
                </h2>
              </div>

              <div className="stay-steps-grid">

                <article>
                  <div className="stay-step-title">
                    <span>01</span>
                    <h3>Selecciona Rionegro</h3>
                  </div>
                  <p>
                    Busca Movich Las Lomas y confirma que la
                    ubicación sea Rionegro.
                  </p>
                </article>

                <article>
                  <div className="stay-step-title">
                    <span>02</span>
                    <h3>Ingresa el código OJ6</h3>
                  </div>
                  <p>
                    Utiliza el código de grupo para acceder
                    a la tarifa especial.
                  </p>
                </article>

                <article>
                  <div className="stay-step-title">
                    <span>03</span>
                    <h3>Completa la reserva</h3>
                  </div>
                  <p>
                    Elige las fechas, verifica el tipo de
                    habitación y finaliza el proceso.
                  </p>
                </article>

              </div>

            </section>

            <section className="stay-cta">

              <div className="stay-cta-content">
                <p className="section-kicker">
                  RESERVAS
                </p>

                <h2>
                  Reserva tu estadía
                </h2>

                <p>
                  Nos hará muchísima ilusión tenerlos cerca
                  y compartir todo el fin de semana juntos.
                </p>

                <div className="stay-cta-buttons">
                  <a
                    href="https://bookings.movichhotels.com/es/search-rates"
                    target="_blank"
                    rel="noreferrer"
                    className="stay-button light"
                  >
                    RESERVAR ONLINE
                    <span>↗</span>
                  </a>

                  <a
                    href="https://wa.me/573162893777"
                    target="_blank"
                    rel="noreferrer"
                    className="stay-button outline-light"
                  >
                    WHATSAPP
                    <span>↗</span>
                  </a>
                </div>

                <div className="stay-contact">
                  <div>
                    <LineIcon name="mail" size={20} />
                    <span>EMAIL</span>
                    <strong>Reservas@movichhotels.com</strong>
                  </div>

                  <div>
                    <LineIcon name="phone" size={20} />
                    <span>TELÉFONO</span>
                    <strong>+57 316 2893777</strong>
                  </div>
                </div>
              </div>

            </section>

          </section>
        )}

        {/* ================================
            VUELOS
        ================================= */}

        {activePage === 'vuelos' && (
          <section className="flights-page page-transition">

            <button
              type="button"
              className="subpage-back-button"
              onClick={() => navigate('informacion')}
            >
              <LineIcon name="arrowLeft" size={18} />
              VOLVER A INFORMACIÓN
            </button>

            <section className="flights-hero">

              <div className="flights-hero-overlay"></div>

              <div className="flights-hero-content">
                <p className="section-kicker">
                  PLANIFICA TU VIAJE
                </p>

                <h1>
                  Tu viaje
                  <em> comienza aquí</em>
                </h1>

                <p>
                  Todo lo esencial para llegar a Rionegro
                  y acompañarnos en nuestro gran día.
                </p>
              </div>

            </section>

            <section className="flights-airport">

              <div className="flights-airport-code">
                <LineIcon name="plane" size={38} />
                <strong>MDE</strong>
              </div>

              <div className="flights-airport-copy">
                <p className="section-kicker">
                  AEROPUERTO RECOMENDADO
                </p>

                <h2>
                  José María Córdova
                </h2>

                <p>
                  El Aeropuerto Internacional José María
                  Córdova (MDE) está ubicado en Rionegro y es
                  el aeropuerto recomendado para asistir a
                  nuestra boda.
                </p>

                <div className="flights-airport-note">
                  <LineIcon name="mapPin" size={22} />
                  <span>
                    Aproximadamente a 15 minutos del hotel sede.
                  </span>
                </div>
              </div>

            </section>

            <section className="flights-routes">

              <div className="flights-section-heading">
                <p className="section-kicker">
                  DESDE DÓNDE VUELAS
                </p>

                <h2>
                  Conexiones hacia Medellín
                </h2>

                <p>
                  Busca vuelos con destino final MDE.
                  La disponibilidad y duración pueden variar
                  según tu ciudad de origen.
                </p>
              </div>

              <div className="flights-route-grid">

                <article className="flight-route-card featured">
                  <span>PTY</span>
                  <h3>Ciudad de Panamá</h3>
                  <p>
                    Existen opciones directas hacia Medellín.
                    Revisa los horarios disponibles para las
                    fechas de la celebración.
                  </p>
                </article>

                <article className="flight-route-card">
                  <span>USA</span>
                  <h3>Estados Unidos</h3>
                  <p>
                    Puedes encontrar rutas directas desde
                    algunas ciudades o conexiones hacia MDE,
                    según tu punto de partida.
                  </p>
                </article>

                <article className="flight-route-card">
                  <span>LATAM</span>
                  <h3>Otros destinos</h3>
                  <p>
                    Busca conexiones con destino final MDE
                    y prioriza itinerarios que te permitan
                    llegar con suficiente anticipación.
                  </p>
                </article>

              </div>

            </section>

            <section className="flights-timeline">

              <div className="flights-section-heading centered">
                <p className="section-kicker">
                  FECHAS RECOMENDADAS
                </p>

                <h2>
                  Organiza tu llegada
                </h2>
              </div>

              <div className="flight-timeline-grid">

                <article>
                  <span className="flight-day">14</span>
                  <div>
                    <small>JUEVES · ENERO</small>
                    <h3>Llegada recomendada</h3>
                    <p>
                      Instálate con calma en el hotel y disfruta
                      la víspera de la celebración.
                    </p>
                  </div>
                </article>

                <article className="wedding-day">
                  <span className="flight-day">15</span>
                  <div>
                    <small>VIERNES · ENERO</small>
                    <h3>Día de la boda</h3>
                    <p>
                      La ceremonia inicia a las 4:00 PM.
                    </p>
                  </div>
                </article>

                <article>
                  <span className="flight-day">16</span>
                  <div>
                    <small>SÁBADO · ENERO</small>
                    <h3>Regreso sugerido</h3>
                    <p>
                      La tarifa especial del hotel está
                      disponible hasta el 16 de enero.
                    </p>
                  </div>
                </article>

              </div>

            </section>

            <section className="flights-tips">

              <article>
                <div className="flight-tip-icon">
                  <LineIcon name="suitcase" size={30} />
                </div>

                <div>
                  <h3>Equipaje</h3>
                  <p>
                    Lleva todo lo necesario para una boda
                    formal y considera las políticas de equipaje
                    de tu aerolínea.
                  </p>
                </div>
              </article>

              <article>
                <div className="flight-tip-icon">
                  <LineIcon name="coat" size={30} />
                </div>

                <div>
                  <h3>Clima</h3>
                  <p>
                    Rionegro puede sentirse fresco,
                    especialmente durante la noche. Recomendamos
                    llevar un abrigo ligero.
                  </p>
                </div>
              </article>

              <article>
                <div className="flight-tip-icon">
                  <LineIcon name="clock" size={30} />
                </div>

                <div>
                  <h3>Tiempo suficiente</h3>
                  <p>
                    Procura llegar al menos un día antes para
                    evitar contratiempos y disfrutar el fin de
                    semana con tranquilidad.
                  </p>
                </div>
              </article>

            </section>

            <section className="flights-cta">

              <p className="section-kicker">
                DESTINO · MDE
              </p>

              <h2>
                Encuentra tu mejor vuelo
              </h2>

              <p>
                Compara opciones según tu ciudad de origen
                y elige el itinerario que mejor se adapte
                a tu viaje.
              </p>

              <a
                href="https://www.google.com/travel/flights"
                target="_blank"
                rel="noreferrer"
                className="flights-search-button"
              >
                BUSCAR VUELOS
                <span>↗</span>
              </a>

            </section>

          </section>
        )}

        {/* ================================
            MEDELLÍN
        ================================= */}

        {activePage === 'medellin' && (
          <section className="medellin-page page-transition">

            <button
              type="button"
              className="subpage-back-button"
              onClick={() => navigate('informacion')}
            >
              <LineIcon name="arrowLeft" size={18} />
              VOLVER A INFORMACIÓN
            </button>

            <section className="medellin-hero">

              <div className="medellin-hero-overlay"></div>

              <div className="medellin-hero-content">
                <p className="section-kicker">
                  DESCUBRE ANTIOQUIA
                </p>

                <h1>
                  Medellín
                  <em> y Rionegro</em>
                </h1>

                <p>
                  Una ciudad vibrante, rodeada de montañas,
                  naturaleza, cultura y una gastronomía que
                  vale la pena descubrir.
                </p>
              </div>

            </section>

            <section className="medellin-difference">

              <div className="medellin-difference-heading">
                <p className="section-kicker">
                  ANTES DE VIAJAR
                </p>

                <h2>
                  Dos destinos,
                  <em> una misma experiencia</em>
                </h2>
              </div>

              <div className="medellin-difference-grid">

                <article>
                  <div className="medellin-place-icon">
                    <LineIcon name="map" size={30} />
                  </div>

                  <span>01</span>

                  <h3>Medellín</h3>

                  <p>
                    Es la ciudad principal: allí encontrarás
                    museos, restaurantes, cafés, vida urbana y
                    algunos de los atractivos turísticos más
                    reconocidos de la región.
                  </p>

                  <small>
                    Ideal para visitar antes o después de la boda.
                  </small>
                </article>

                <article className="featured">
                  <div className="medellin-place-icon">
                    <LineIcon name="mountain" size={30} />
                  </div>

                  <span>02</span>

                  <h3>Rionegro</h3>

                  <p>
                    Es un municipio distinto, ubicado en el
                    Oriente antioqueño. Aquí se encuentran el
                    aeropuerto MDE, el hotel sede, la iglesia
                    y Villa Celeste.
                  </p>

                  <small>
                    Es la zona recomendada para hospedarse.
                  </small>
                </article>

              </div>

              <div className="medellin-important-note">
                <div>
                  <LineIcon name="warning" size={26} />
                </div>

                <p>
                  <strong>Para el fin de semana de la boda,</strong>
                  recomendamos hospedarse en Rionegro. Así estarán
                  cerca del aeropuerto, el hotel sede y los lugares
                  de la celebración.
                </p>
              </div>

            </section>

            <section className="medellin-weather">

              <div className="medellin-weather-heading">
                <p className="section-kicker">
                  CLIMA Y MALETA
                </p>

                <h2>
                  La eterna primavera
                </h2>

                <p>
                  Medellín suele tener temperaturas agradables
                  durante el día. Rionegro puede sentirse más
                  fresco, especialmente en la noche.
                </p>
              </div>

              <div className="medellin-weather-grid">

                <article>
                  <LineIcon name="sun" size={30} />
                  <h3>Clima templado</h3>
                  <p>
                    En Medellín las temperaturas suelen estar
                    aproximadamente entre 16 °C y 26 °C.
                  </p>
                </article>

                <article>
                  <LineIcon name="coat" size={30} />
                  <h3>Noches frescas</h3>
                  <p>
                    Lleva un abrigo ligero para las noches
                    en Rionegro.
                  </p>
                </article>

                <article>
                  <LineIcon name="umbrella" size={30} />
                  <h3>Lluvia ocasional</h3>
                  <p>
                    Un paraguas pequeño puede ser útil porque
                    el clima puede cambiar durante el día.
                  </p>
                </article>

                <article>
                  <LineIcon name="suitcase" size={30} />
                  <h3>Zapatos cómodos</h3>
                  <p>
                    Ideales para recorrer la ciudad, museos
                    y zonas con calles inclinadas.
                  </p>
                </article>

              </div>

            </section>

            <section className="medellin-attractions">

              <div className="medellin-section-heading">
                <p className="section-kicker">
                  IMPERDIBLES
                </p>

                <h2>
                  Lugares que vale la pena conocer
                </h2>

                <p>
                  Una selección de experiencias para aprovechar
                  tu visita a Medellín.
                </p>
              </div>

              <div className="medellin-attractions-grid">

                <article className="medellin-attraction-card large">
                  <img
                    src="https://images.pexels.com/photos/12638911/pexels-photo-12638911.jpeg?auto=compress&dpr=1&h=900&w=1400"
                    alt="Vista de Comuna 13 en Medellín"
                  />

                  <div className="medellin-attraction-overlay">
                    <span>01</span>
                    <h3>Comuna 13</h3>
                    <p>
                      Arte urbano, historia, transformación
                      social y vistas de la ciudad.
                    </p>
                  </div>
                </article>

                <article className="medellin-attraction-card">
                  <img
                    src="https://images.unsplash.com/photo-1590598016835-83cf3357ebc5?auto=format&fit=crop&w=1200&q=85"
                    alt="Vista panorámica de Medellín"
                  />

                  <div className="medellin-attraction-overlay">
                    <span>02</span>
                    <h3>El Poblado y Provenza</h3>
                    <p>
                      Restaurantes, cafés y una de las zonas
                      más conocidas para salir.
                    </p>
                  </div>
                </article>

                <article className="medellin-attraction-card">
                  <img
                    src="https://images.unsplash.com/photo-1512250431446-d0b4b57b27ec?auto=format&fit=crop&w=1200&q=85"
                    alt="Medellín de noche"
                  />

                  <div className="medellin-attraction-overlay">
                    <span>03</span>
                    <h3>Plaza Botero</h3>
                    <p>
                      Arte, arquitectura y cultura en el
                      corazón de la ciudad.
                    </p>
                  </div>
                </article>

                <article className="medellin-attraction-card">
                  <img
                    src="https://images.unsplash.com/photo-1590598016835-83cf3357ebc5?auto=format&fit=crop&w=1200&q=85"
                    alt="Paisaje urbano de Medellín"
                  />

                  <div className="medellin-attraction-overlay">
                    <span>04</span>
                    <h3>Jardín Botánico</h3>
                    <p>
                      Naturaleza y tranquilidad en medio
                      de la ciudad.
                    </p>
                  </div>
                </article>

                <article className="medellin-attraction-card">
                  <img
                    src="https://images.unsplash.com/photo-1512250431446-d0b4b57b27ec?auto=format&fit=crop&w=1200&q=85"
                    alt="Vista nocturna de Medellín"
                  />

                  <div className="medellin-attraction-overlay">
                    <span>05</span>
                    <h3>Parque Arví</h3>
                    <p>
                      Naturaleza, senderos y aire fresco
                      en las montañas.
                    </p>
                  </div>
                </article>

              </div>

            </section>

            <section className="medellin-escapes">

              <div className="medellin-section-heading centered">
                <p className="section-kicker">
                  ESCAPADAS CERCANAS
                </p>

                <h2>
                  Un poco más de Antioquia
                </h2>
              </div>

              <div className="medellin-escape-grid">

                <article className="medellin-escape-feature">
                  <img
                    src="https://images.unsplash.com/photo-1639534448069-a47cf42d7cb9?auto=format&fit=crop&w=1500&q=85"
                    alt="Paisaje de Guatapé"
                  />

                  <div>
                    <span>DÍA COMPLETO</span>
                    <h3>Guatapé y Piedra del Peñol</h3>
                    <p>
                      Una excursión llena de paisajes, colores
                      y vistas del embalse.
                    </p>
                  </div>
                </article>

                <div className="medellin-escape-list">

                  <article>
                    <span>01</span>
                    <h3>Santa Elena</h3>
                    <p>
                      Naturaleza, flores y tradición silletera.
                    </p>
                  </article>

                  <article>
                    <span>02</span>
                    <h3>Llanogrande</h3>
                    <p>
                      Restaurantes, cafés y ambiente campestre
                      muy cerca de Rionegro.
                    </p>
                  </article>

                </div>

              </div>

            </section>

            <section className="medellin-quick-guide">

              <div className="medellin-guide-item">
                <LineIcon name="wallet" size={27} />
                <span>MONEDA</span>
                <strong>Peso colombiano</strong>
              </div>

              <div className="medellin-guide-item">
                <LineIcon name="plane" size={27} />
                <span>AEROPUERTO</span>
                <strong>MDE · Rionegro</strong>
              </div>

              <div className="medellin-guide-item">
                <LineIcon name="hotel" size={27} />
                <span>ZONA DE LA BODA</span>
                <strong>Rionegro</strong>
              </div>

              <div className="medellin-guide-item">
                <LineIcon name="camera" size={27} />
                <span>PARA TURISMO</span>
                <strong>Medellín</strong>
              </div>

            </section>

            <section className="medellin-cta">

              <p className="section-kicker">
                DISFRUTA EL VIAJE
              </p>

              <h2>
                Haz de este viaje
                <em> parte de la celebración</em>
              </h2>

              <p>
                Reserva un poco de tiempo para descubrir
                la ciudad, disfrutar su gastronomía y conocer
                algunos de los lugares que hacen de Antioquia
                un destino tan especial.
              </p>

              <div className="medellin-cta-actions">
                <a
                  href="https://www.medellin.travel/"
                  target="_blank"
                  rel="noreferrer"
                  className="medellin-cta-button primary"
                >
                  EXPLORAR MEDELLÍN
                  <span>↗</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Rionegro%2C+Antioquia"
                  target="_blank"
                  rel="noreferrer"
                  className="medellin-cta-button secondary"
                >
                  VER RIONEGRO
                  <span>↗</span>
                </a>
              </div>

            </section>

          </section>
        )}

        {/* ================================
            GALERÍA
        ================================= */}

        {activePage === 'galeria' && (
          <section className="inner-page gallery-page page-transition">

            <div className="inner-heading">

              <p className="eyebrow">
                MOMENTOS
              </p>

              <h2>
                Nuestra <em>galería</em>
              </h2>

            </div>

            <div className="gallery-grid">

              <div className="gallery-photo large">
                01
              </div>

              <div className="gallery-photo">
                02
              </div>

              <div className="gallery-photo">
                03
              </div>

              <div className="gallery-photo">
                04
              </div>

              <div className="gallery-photo large">
                05
              </div>

            </div>

          </section>
        )}

        {/* ================================
            RSVP
        ================================= */}

        {activePage === 'rsvp' && (
          <section className="rsvp-page page-transition">

            {rsvpStatus.state === 'success-yes' && (
              <div className="rsvp-success">
                <img
                  src={monogramGold}
                  alt=""
                  aria-hidden="true"
                  className="rsvp-success-monogram"
                />

                <div className="rsvp-success-heart">
                  ♡
                </div>

                <p className="eyebrow">
                  CONFIRMACIÓN RECIBIDA
                </p>

                <h2>
                  Gracias por
                  <em> confirmar.</em>
                </h2>

                <p>
                  Estamos muy felices de celebrar este
                  momento contigo.
                </p>

                <strong>
                  Luis & Melanie
                </strong>

                <button
                  type="button"
                  className="rsvp-secondary-button"
                  onClick={resetRsvp}
                >
                  ENVIAR OTRA RESPUESTA
                </button>
              </div>
            )}

            {rsvpStatus.state === 'success-no' && (
              <div className="rsvp-success">
                <img
                  src={monogramGold}
                  alt=""
                  aria-hidden="true"
                  className="rsvp-success-monogram"
                />

                <div className="rsvp-success-heart">
                  ♡
                </div>

                <p className="eyebrow">
                  RESPUESTA RECIBIDA
                </p>

                <h2>
                  Gracias por
                  <em> avisarnos.</em>
                </h2>

                <p>
                  Aunque no puedas acompañarnos, agradecemos
                  muchísimo que formes parte de nuestra historia.
                </p>

                <strong>
                  Luis & Melanie
                </strong>

                <button
                  type="button"
                  className="rsvp-secondary-button"
                  onClick={resetRsvp}
                >
                  CAMBIAR MI RESPUESTA
                </button>
              </div>
            )}

            {!rsvpStatus.state.startsWith('success') && (
              <>
                <header className="rsvp-hero">

                  <div className="rsvp-hero-copy">
                    <p className="eyebrow">
                      RSVP · 15 · 01 · 2027
                    </p>

                    <h1>
                      Nos encantará
                      <em> compartir este día contigo</em>
                    </h1>

                    <p>
                      Tu presencia será el mejor regalo.
                      Agradecemos confirmar tu asistencia antes
                      del <strong>15 de noviembre de 2026</strong>.
                    </p>
                  </div>

                  <div className="rsvp-hero-monogram">
                    <img
                      src={monogramGold}
                      alt="Monograma de Luis y Melanie"
                    />
                  </div>

                </header>

                <form
                  className="rsvp-form"
                  onSubmit={submitRsvp}
                  noValidate
                >

                  <section className="rsvp-form-section">

                    <div className="rsvp-step-heading">
                      <span>01</span>

                      <div>
                        <small>TUS DATOS</small>
                        <h2>Queremos saber de ti</h2>
                      </div>
                    </div>

                    <div className="rsvp-fields-grid">

                      <label className="rsvp-field">
                        <span>Nombre y apellido *</span>

                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={rsvpForm.name}
                          onChange={(event) =>
                            updateRsvpField(
                              'name',
                              event.target.value
                            )
                          }
                          placeholder="Escribe tu nombre completo"
                        />
                      </label>

                      <label className="rsvp-field">
                        <span>Correo electrónico *</span>

                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={rsvpForm.email}
                          onChange={(event) =>
                            updateRsvpField(
                              'email',
                              event.target.value
                            )
                          }
                          placeholder="nombre@correo.com"
                        />
                      </label>

                    </div>

                  </section>

                  <section className="rsvp-form-section">

                    <div className="rsvp-step-heading">
                      <span>02</span>

                      <div>
                        <small>TU RESPUESTA</small>
                        <h2>¿Podrás acompañarnos?</h2>
                      </div>
                    </div>

                    <div className="rsvp-attendance-grid">

                      <button
                        type="button"
                        className={
                          rsvpForm.attendance === 'yes'
                            ? 'rsvp-choice selected'
                            : 'rsvp-choice'
                        }
                        onClick={() =>
                          selectAttendance('yes')
                        }
                      >
                        <span className="rsvp-choice-mark">
                          ✓
                        </span>

                        <strong>
                          Sí, con mucha ilusión
                        </strong>

                        <small>
                          Estaré allí para celebrar con ustedes.
                        </small>
                      </button>

                      <button
                        type="button"
                        className={
                          rsvpForm.attendance === 'no'
                            ? 'rsvp-choice selected'
                            : 'rsvp-choice'
                        }
                        onClick={() =>
                          selectAttendance('no')
                        }
                      >
                        <span className="rsvp-choice-mark">
                          —
                        </span>

                        <strong>
                          No podré asistir
                        </strong>

                        <small>
                          Gracias por hacérnoslo saber.
                        </small>
                      </button>

                    </div>

                  </section>

                  {rsvpForm.attendance === 'yes' && (
                    <section className="rsvp-form-section rsvp-reveal">

                      <div className="rsvp-step-heading">
                        <span>03</span>

                        <div>
                          <small>TU GRUPO</small>
                          <h2>Cuéntanos quiénes asistirán</h2>
                        </div>
                      </div>

                      <div className="rsvp-guest-count">
                        <p>
                          ¿Cuántas personas incluye esta
                          confirmación?
                        </p>

                        <div>
                          {['1', '2', '3', '4'].map(
                            (guestCount) => (
                              <button
                                type="button"
                                key={guestCount}
                                className={
                                  rsvpForm.guestCount ===
                                  guestCount
                                    ? 'selected'
                                    : ''
                                }
                                onClick={() =>
                                  updateGuestCount(guestCount)
                                }
                              >
                                {guestCount}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {Number(rsvpForm.guestCount) > 1 && (
                        <div className="rsvp-companions">
                          <p>
                            Nombre de tus acompañantes
                          </p>

                          <div className="rsvp-companion-grid">
                            {rsvpForm.guestNames.map(
                              (guestName, index) => (
                                <label
                                  className="rsvp-field"
                                  key={`guest-${index + 1}`}
                                >
                                  <span>
                                    Acompañante {index + 1} *
                                  </span>

                                  <input
                                    type="text"
                                    value={guestName}
                                    onChange={(event) =>
                                      updateGuestName(
                                        index,
                                        event.target.value
                                      )
                                    }
                                    placeholder="Nombre completo"
                                  />
                                </label>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    </section>
                  )}

                  {rsvpForm.attendance && (
                    <section className="rsvp-form-section rsvp-reveal">

                      <div className="rsvp-step-heading">
                        <span>
                          {rsvpForm.attendance === 'yes'
                            ? '04'
                            : '03'}
                        </span>

                        <div>
                          <small>UN MENSAJE PARA NOSOTROS</small>
                          <h2>Nos encantará leerte</h2>
                        </div>
                      </div>

                      <label className="rsvp-field rsvp-message-field">
                        <span>Mensaje opcional</span>

                        <textarea
                          name="message"
                          value={rsvpForm.message}
                          onChange={(event) =>
                            updateRsvpField(
                              'message',
                              event.target.value
                            )
                          }
                          placeholder="Déjanos unas palabras bonitas..."
                          rows="5"
                        />
                      </label>

                    </section>
                  )}

                  <div className="rsvp-submit-area">

                    <p>
                      Cada confirmación nos acerca un poco
                      más al gran día.
                    </p>

                    {rsvpStatus.state === 'error' && (
                      <div
                        className="rsvp-error"
                        role="alert"
                      >
                        {rsvpStatus.message}
                      </div>
                    )}

                    <button
                      type="submit"
                      className="rsvp-submit-button"
                      disabled={
                        rsvpStatus.state === 'submitting'
                      }
                    >
                      {rsvpStatus.state === 'submitting'
                        ? 'ENVIANDO...'
                        : 'CONFIRMAR ASISTENCIA'}

                      <span>
                        {rsvpStatus.state === 'submitting'
                          ? '◌'
                          : '→'}
                      </span>
                    </button>

                  </div>

                </form>
              </>
            )}

          </section>
        )}

      </main>

      {/* ================================
          FOOTER
      ================================= */}

      <footer className="footer">

        <span className="footer-names">
          Luis & Melanie
        </span>

        <span>
          MEDELLÍN · COLOMBIA
        </span>

        <span>
          2027
        </span>

      </footer>

      </div>
    </>
  )
}

export default App