import { useState, useEffect } from 'react'
import './App.css'
import portadaImg from './assets/Portada.jpg'
import bodaFondoImg from './assets/la boda.jpg'

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

  return (
    <div className="site">

      {/* ================================
          NAVEGACIÓN
      ================================= */}

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
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHgcGg0oCZDRcWWvYaJEY59gndKn1bruOiqw2EpQArkAJJr95Ke3Uu6P1X&s=10"
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

            </div>

            <div className="info-grid">

              {/* HOSPEDAJE */}

              <button
                onClick={() => navigate('hospedaje')}
              >
                <span>01</span>
                <strong>Hospedaje</strong>
                <small>
                  Hotel sede y tarifa especial
                </small>
              </button>

              {/* TRANSPORTE */}

              <button>
                <span>02</span>
                <strong>Transporte</strong>
                <small>
                  Cómo llegar y movilizarse
                </small>
              </button>

              {/* MEDELLÍN */}

              <button>
                <span>03</span>
                <strong>Medellín</strong>
                <small>
                  Recomendaciones para disfrutar
                  la ciudad
                </small>
              </button>

              {/* FAQ */}

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
            HOSPEDAJE
        ================================= */}

        {activePage === 'hospedaje' && (
          <section className="accommodation-page page-transition">

            {/* HEADER CON IMAGEN */}

            <section className="accommodation-hero">

              <div className="accommodation-hero-overlay"></div>

              <div className="accommodation-hero-content">

                <p>
                  PARA NUESTROS INVITADOS
                </p>

                <h1>
                  Hospedaje
                </h1>

                <span>
                  MOVICH LAS LOMAS
                </span>

              </div>

            </section>

            {/* CONTENIDO */}

            <section className="accommodation-content">

              <div className="accommodation-intro">

                <p className="section-kicker">
                  HOTEL SEDE
                </p>

                <h2>
                  Movich <em>Las Lomas</em>
                </h2>

                <p>
                  Se acerca nuestro gran día y queremos
                  compartirles la información de alojamiento
                  para este fin de semana tan especial.
                </p>

                <p>
                  Hemos elegido como hotel sede el
                  <strong> Movich Las Lomas</strong>, que
                  cuenta con una tarifa especial para
                  nuestros invitados.
                </p>

              </div>

              {/* UBICACIÓN + CÓDIGO */}

              <div className="accommodation-highlight-grid">

                <div className="accommodation-highlight">

                  <span>UBICACIÓN</span>

                  <strong>
                    Rionegro
                  </strong>

                  <p>
                    Al momento de reservar, asegúrate de
                    seleccionar <strong>Rionegro</strong>,
                    ya que hay otro hotel Movich en Medellín.
                  </p>

                </div>

                <div className="accommodation-highlight code-highlight">

                  <span>CÓDIGO DE GRUPO</span>

                  <strong>
                    OJ6
                  </strong>

                  <p>
                    Utiliza este código al momento de
                    realizar tu reserva para acceder a
                    la tarifa especial.
                  </p>

                </div>

              </div>

              {/* TARIFA */}

              <div className="accommodation-details">

                <div className="accommodation-detail">

                  <span>FECHAS DE TARIFA ESPECIAL</span>

                  <strong>
                    14 — 16
                  </strong>

                  <p>
                    Enero 2027
                  </p>

                </div>

                <div className="accommodation-detail">

                  <span>TARIFA</span>

                  <strong>
                    COP 445.000
                  </strong>

                  <p>
                    Por noche · Habitación doble ·
                    Tarifa exenta de IVA
                  </p>

                </div>

                <div className="accommodation-detail">

                  <span>INCLUYE</span>

                  <strong>
                    Desayuno
                  </strong>

                  <p>
                    Incluido en la tarifa especial.
                  </p>

                </div>

              </div>

              {/* HABITACIONES */}

              <div className="accommodation-section">

                <p className="section-kicker">
                  INFORMACIÓN DE HABITACIONES
                </p>

                <h2>
                  Para que todos estén cómodos
                </h2>

                <div className="room-grid">

                  <article className="room-card">

                    <span>01</span>

                    <h3>
                      Habitación doble
                    </h3>

                    <p>
                      La tarifa especial de COP 445.000
                      por noche corresponde a una habitación
                      doble e incluye desayuno.
                    </p>

                  </article>

                  <article className="room-card">

                    <span>02</span>

                    <h3>
                      Tres huéspedes
                    </h3>

                    <p>
                      El hotel permite un máximo de 3 huéspedes
                      por habitación. Para 3 personas deberán
                      seleccionar una habitación
                      <strong> Estándar Twin</strong> e indicar
                      en los comentarios que requieren una
                      persona adicional.
                    </p>

                    <strong className="room-price">
                      + COP 135.000 / noche
                    </strong>

                    <small>
                      Desayuno incluido
                    </small>

                  </article>

                  <article className="room-card">

                    <span>03</span>

                    <h3>
                      Grupos de 4 personas
                    </h3>

                    <p>
                      Para grupos de 4 personas se requieren
                      2 habitaciones.
                    </p>

                    <p>
                      Realizar la reserva vía WhatsApp y
                      solicitar que sean habitaciones
                      conectadas.
                    </p>

                  </article>

                </div>

              </div>

              {/* TRANSPORTE */}

              <div className="airport-transfer">

                <div className="airport-icon">
                  ✦
                </div>

                <div>

                  <p className="section-kicker">
                    TRANSPORTE DESDE EL AEROPUERTO
                  </p>

                  <h2>
                    Aeropuerto MDE
                  </h2>

                  <p>
                    El hotel incluye transporte desde y hacia
                    el aeropuerto MDE.
                  </p>

                  <p>
                    Para coordinar el transporte, escribir al:
                  </p>

                  <strong>
                    +57 316 3372926
                  </strong>

                </div>

              </div>

              {/* RESERVAS */}

              <div className="reservation-section">

                <p className="section-kicker">
                  RESERVAS
                </p>

                <h2>
                  Reserva tu habitación
                </h2>

                <p>
                  Recuerda utilizar el código de grupo
                  <strong> OJ6</strong> al momento de
                  reservar.
                </p>

                <div className="reservation-buttons">

                  <a
                    href="https://bookings.movichhotels.com/es/search-rates"
                    target="_blank"
                    rel="noreferrer"
                    className="reservation-button primary"
                  >
                    RESERVAR ONLINE
                    <span>↗</span>
                  </a>

                  <a
                    href="https://wa.me/573162893777"
                    target="_blank"
                    rel="noreferrer"
                    className="reservation-button secondary"
                  >
                    WHATSAPP
                    <span>↗</span>
                  </a>

                </div>

                <div className="reservation-contact">

                  <div>
                    <span>EMAIL</span>
                    <strong>
                      Reservas@movichhotels.com
                    </strong>
                  </div>

                  <div>
                    <span>TELÉFONO</span>
                    <strong>
                      +57 316 2893777
                    </strong>
                  </div>

                </div>

              </div>

              {/* CIERRE */}

              <div className="accommodation-footer">

                <div className="small-heart">
                  ♡
                </div>

                <p>
                  Nos haría muchísima ilusión tenerlos cerca
                  y compartir este fin de semana juntos.
                </p>

                <strong>
                  Con cariño,
                  <br />
                  Melanie & Luis
                </strong>

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

      {/* ================================
          FOOTER
      ================================= */}

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