import { useState, useEffect } from 'react'
import './App.css'
import portadaImg from './assets/Portada.jpg'

function App() {
  const [activePage, setActivePage] = useState('inicio')
  const [menuOpen, setMenuOpen] = useState(false)

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
  }

  return (
    <div className="site">

      {/* NAVEGACIÓN */}
      <header className="navigation">

        <button
          className="brand"
          onClick={() => navigate('inicio')}
        >
          L&M
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

      {/* MENÚ MOBILE */}
      <div
        className={
          menuOpen
            ? 'mobile-menu mobile-menu-open'
            : 'mobile-menu'
        }
      >

        <div className="mobile-menu-header">
          <span>LUIS & MELANIE</span>

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

      {/* CONTENIDO */}
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

              {/* CONTADOR */}

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
          <section className="inner-page page-transition">

            <div className="inner-heading">

              <p className="eyebrow">
                15 · 01 · 2027
              </p>

              <h2>
                La <em>boda</em>
              </h2>

            </div>

            <div className="event-grid">

              <div className="event-card">

                <span className="event-number">
                  01
                </span>

                <p className="event-label">
                  CEREMONIA
                </p>

                <h3>
                  Villa Celeste
                </h3>

                <p>
                  Medellín, Colombia
                </p>

                <p className="event-time">
                  4:00 PM
                </p>

                <button className="text-button">
                  VER UBICACIÓN →
                </button>

              </div>

              <div className="event-card featured">

                <span className="event-number">
                  02
                </span>

                <p className="event-label">
                  CELEBRACIÓN
                </p>

                <h3>
                  Villa Celeste
                </h3>

                <p>
                  Medellín, Colombia
                </p>

                <p className="event-time">
                  6:00 PM
                </p>

                <button className="text-button">
                  VER UBICACIÓN →
                </button>

              </div>

              <div className="event-card">

                <span className="event-number">
                  03
                </span>

                <p className="event-label">
                  DRESS CODE
                </p>

                <h3>
                  Formal
                </h3>

                <p>
                  Elegancia atemporal
                </p>

                <p className="event-time">
                  —
                </p>

              </div>

            </div>

          </section>
        )}

        {/* ================================
            INFORMACIÓN
        ================================= */}

        {activePage === 'informacion' && (
          <section className="inner-page page-transition">

            <div className="inner-heading">

              <p className="eyebrow">
                TODO LO QUE NECESITAS SABER
              </p>

              <h2>
                Información
              </h2>

            </div>

            <div className="info-grid">

              <button>
                <span>01</span>
                <strong>Hospedaje</strong>
                <small>
                  Hoteles recomendados
                </small>
              </button>

              <button>
                <span>02</span>
                <strong>Transporte</strong>
                <small>
                  Cómo llegar y movilizarse
                </small>
              </button>

              <button>
                <span>03</span>
                <strong>Medellín</strong>
                <small>
                  Recomendaciones para disfrutar
                  la ciudad
                </small>
              </button>

              <button>
                <span>04</span>
                <strong>
                  Preguntas frecuentes
                </strong>
                <small>
                  Todo lo que debes saber
                </small>
              </button>

            </div>

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

            <p className="eyebrow">
              15 · 01 · 2027
            </p>

            <h2>
              Nos encantaría
              <br />
              <em>contar contigo.</em>
            </h2>

            <p>
              Confirma tu asistencia y acompáñanos
              <br />
              a celebrar este momento tan especial.
            </p>

            <button className="rsvp-main-button">
              CONFIRMAR ASISTENCIA
            </button>

          </section>
        )}

      </main>

      {/* FOOTER */}

      <footer className="footer">
        <span>
          LUIS & MELANIE
        </span>

        <span>
          MEDELLÍN · COLOMBIA
        </span>

        <span>
          2027
        </span>
      </footer>

    </div>
  )
}

export default App