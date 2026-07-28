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
  <section className="wedding-page page-transition">

    {/* INTRO */}
    <section className="wedding-intro">

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


    {/* TIMELINE */}
    <section className="timeline-section">

      <div className="section-heading">

        <p className="section-kicker">
          EL DÍA
        </p>

        <h2>
          Un mismo día, dos momentos especiales
        </h2>

      </div>

      <div className="timeline">

        {/* CEREMONIA */}
        <div className="timeline-item">

          <div className="timeline-time">
            04:00
            <span>PM</span>
          </div>

          <div className="timeline-dot">
            <span>✦</span>
          </div>

          <div className="timeline-content">

            <p className="timeline-label">
              CEREMONIA
            </p>

            <h3>
              Parroquia María Madre de Dios
            </h3>

            <p>
              Comenzamos nuestro día más especial
              rodeados de quienes más queremos.
            </p>

          </div>

        </div>


        {/* RECEPCIÓN */}
        <div className="timeline-item">

          <div className="timeline-time">
            05:30
            <span>PM</span>
          </div>

          <div className="timeline-dot">
            <span>✦</span>
          </div>

          <div className="timeline-content">

            <p className="timeline-label">
              RECEPCIÓN & FIESTA
            </p>

            <h3>
              Centro de Eventos Villa Celeste
            </h3>

            <p>
              Después de la ceremonia, nos encontramos
              para brindar, celebrar y disfrutar juntos.
            </p>

          </div>

        </div>

      </div>

    </section>


    {/* VENUES */}
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

          <div className="venue-icon">
            ♧
          </div>

          <p className="venue-type">
            CEREMONIA
          </p>

          <h3>
            Parroquia María Madre de Dios
          </h3>

          <p className="venue-city">
            Rionegro, Medellín
          </p>

          <a
            href="https://maps.app.goo.gl/FHVkaW2yG1aKZSuQ8"
            target="_blank"
            rel="noreferrer"
            className="map-button"
          >
            Ver ubicación
            <span>→</span>
          </a>

        </article>


        {/* RECEPCIÓN */}
        <article className="venue-card featured">

          <div className="venue-number">
            02
          </div>

          <div className="venue-icon">
            ♧
          </div>

          <p className="venue-type">
            RECEPCIÓN & FIESTA
          </p>

          <h3>
            Centro de Eventos Villa Celeste
          </h3>

          <p className="venue-city">
            Rionegro, Medellín
          </p>

          <a
            href="https://maps.app.goo.gl/KMGNEnh7BD2gjPHz9"
            target="_blank"
            rel="noreferrer"
            className="map-button"
          >
            Ver ubicación
            <span>→</span>
          </a>

        </article>

      </div>

    </section>


    {/* DRESS CODE */}
    <section className="dress-section">

      <div className="dress-content">

        <p className="section-kicker">
          CÓDIGO DE VESTIMENTA
        </p>

        <h2>
          Formal
        </h2>

        <div className="dress-line"></div>

        <p>
          Una noche especial merece vestir
          para la ocasión.
        </p>

      </div>

      <div className="dress-decoration">

        <div className="dress-circle">
          <span>FORMAL</span>
        </div>

      </div>

    </section>


    {/* BOTTOM NOTE */}
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