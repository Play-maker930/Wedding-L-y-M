import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, useLocation, useNavigate } from 'react-router'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './App.css'
import portadaImg from './assets/Portada.webp'
import bodaFondoImg from './assets/la-boda.webp'
import parroquiaImg from './assets/parroquia.webp'
import monogramGold from './assets/monogram_gold.png'
import menuBackground from './assets/menu-background.jpg'
import confirmationPhoto from './assets/foto-confirmacion.jpg'
import giftsPhoto from './assets/regalos.webp'
import informationPhoto from './assets/information-photo.webp'
import movichHero from './assets/movich-hero.webp'
import movich1 from './assets/movich-1.webp'
import movich2 from './assets/movich-2.webp'
import movich3 from './assets/movich-3.webp'
import movich4 from './assets/movich-4.webp'
import movich5 from './assets/movich-5.webp'
import movich6 from './assets/movich-6.webp'
import movich7 from './assets/movich-7.webp'
import villaCelesteImg from './assets/villa-celeste.webp'
import comuna13Img from './assets/comuna-13.webp'
import provenzaImg from './assets/provenza.webp'
import plazaBoteroImg from './assets/plaza-botero.webp'
import jardinBotanicoImg from './assets/jardin-botanico.webp'
import parqueArviImg from './assets/parque-arvi.webp'
import guatapeImg from './assets/guatape.webp'
import pueblitoPaisaImg from './assets/pueblito-paisa.webp'
import tourCafeteroImg from './assets/tour-cafetero.webp'
import museoCastilloImg from './assets/museo-el-castillo.webp'
import medellinHeroImg from './assets/medellin-hero.webp'
import transportHeroImg from './assets/transport-hero.webp'
import storyVideo1 from './assets/video-1.webp'
import storyVideo2 from './assets/video-2.webp'
import storyVideo3 from './assets/video-3.webp'
import storyVideo4 from './assets/video-4.webp'
import storyVideo5 from './assets/video-5.webp'
import storyVideo6 from './assets/video-6.webp'
import storyVideo7 from './assets/video-7.webp'
import storyVideo8 from './assets/video-8.webp'
import galleryPre01 from './assets/gallery-preboda-01.webp'
import galleryPre02 from './assets/gallery-preboda-02.webp'
import galleryPre03 from './assets/gallery-preboda-03.webp'
import galleryPre04 from './assets/gallery-preboda-04.webp'
import galleryPre05 from './assets/gallery-preboda-05.webp'
import galleryPre06 from './assets/gallery-preboda-06.webp'
import galleryPre07 from './assets/gallery-preboda-07.webp'
import galleryPre08 from './assets/gallery-preboda-08.webp'
import galleryPre09 from './assets/gallery-preboda-09.webp'
import weddingMusic from './assets/Aleluya.mp3'
import InvitationEnvelope from './InvitationEnvelope'



const preloadImage = (src) => {
  if (!src) return Promise.resolve()

  return new Promise((resolve) => {
    const image = new Image()
    image.decoding = 'async'
    image.onload = resolve
    image.onerror = resolve
    image.src = src

    if (image.complete) resolve()
  })
}


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
    church: (
      <>
        <path d="M12 2v5M9.5 4.5h5" />
        <path d="M6 22V10l6-4 6 4v12" />
        <path d="M9 22v-6h6v6" />
        <path d="M4 22h16" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v6M12 7h.01" />
      </>
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
    gift: (
      <>
        <rect x="3" y="9" width="18" height="12" rx="1.5" />
        <path d="M12 9v12M3 13h18" />
        <path d="M12 9H7.5A2.5 2.5 0 1 1 10 6.5C10 8 12 9 12 9Z" />
        <path d="M12 9h4.5A2.5 2.5 0 1 0 14 6.5C14 8 12 9 12 9Z" />
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


const STORY_FILM_SLIDES = [
  {
    title: 'Donde comenzó nuestra historia.',
    image: storyVideo1,
    position: 'center',
  },
  {
    title: 'Aprendimos a elegirnos cada día.',
    image: storyVideo2,
    position: 'center',
  },
  {
    title: 'Y a convertir lo cotidiano en recuerdos.',
    image: storyVideo3,
    position: 'center',
  },
  {
    title: 'Juntos, cada lugar empezó a sentirse como hogar.',
    image: storyVideo4,
    position: 'center',
  },
  {
    title: 'Nuestros sueños empezaron a sentirse cada vez más nuestros.',
    image: storyVideo5,
    position: 'center',
  },
  {
    title: 'Hasta que llegó el sí que cambió todo.',
    image: storyVideo6,
    position: 'center',
    moment: 'yes',
  },
  {
    title: 'Y empezamos a imaginar el día que tanto esperábamos.',
    image: storyVideo7,
    position: 'center',
  },
  {
    title: 'Ahora estamos a punto de comenzar nuestro siguiente capítulo.',
    image: storyVideo8,
    position: 'center',
  },
]
function StoryFilm({ onFinish }) {
  const [index, setIndex] = useState(0)
  const [showFinale, setShowFinale] = useState(false)
  const onFinishRef = useRef(onFinish)

  useEffect(() => {
    onFinishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    if (showFinale) {
      preloadImage(portadaImg)
      return
    }

    const nextImages = [
      STORY_FILM_SLIDES[index + 1]?.image,
      STORY_FILM_SLIDES[index + 2]?.image,
    ].filter(Boolean)

    nextImages.forEach((src) => {
      preloadImage(src)
    })

    if (index >= 5) {
      preloadImage(portadaImg)
    }
  }, [index, showFinale])

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      if (showFinale) {
        onFinishRef.current()
        return
      }

      if (index === STORY_FILM_SLIDES.length - 1) {
        setShowFinale(true)
        return
      }

      const nextImage =
        STORY_FILM_SLIDES[index + 1]?.image

      await preloadImage(nextImage)

      setIndex((current) => current + 1)
    }, showFinale ? 8000 : 4700)

    return () => window.clearTimeout(timer)
  }, [index, showFinale])

  const progress = showFinale
    ? 100
    : ((index + 1) / (STORY_FILM_SLIDES.length + 1)) * 100

  return (
    <section className="story-film" aria-label="Nuestra historia">
      <button
        type="button"
        className="story-film-skip"
        onClick={onFinish}
      >
        SALTAR <span>→</span>
      </button>

      <div className="story-film-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }}></span>
      </div>

      {!showFinale ? (
        <div
          key={index}
          className={
            STORY_FILM_SLIDES[index].moment === 'yes'
              ? 'story-film-scene story-film-scene-yes'
              : 'story-film-scene'
          }
          style={{
            '--story-background':
              `url("${STORY_FILM_SLIDES[index].image}")`,
          }}
        >
          {STORY_FILM_SLIDES[index].image ? (
            <img
              src={STORY_FILM_SLIDES[index].image}
              alt=""
              className="story-film-image"
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'auto'}
              style={{
                objectPosition:
                  STORY_FILM_SLIDES[index].position,
              }}
            />
          ) : (
            <div className="story-film-image-missing">
              <span>
                Falta agregar video {index + 1}
                en src/assets
              </span>
            </div>
          )}

          <div className="story-film-overlay"></div>

          <div className="story-film-copy">
            <p>{STORY_FILM_SLIDES[index].title}</p>
          </div>
        </div>
      ) : (
        <div className="story-film-finale">
          <div
            className="story-film-monogram-draw"
            aria-hidden="true"
          >
            <div className="story-film-monogram-reveal">
              <img
                src={monogramGold}
                alt=""
              />
            </div>

            <span className="story-film-monogram-stroke"></span>
          </div>

          <div className="story-film-finale-copy">
            <p>SIETE AÑOS DESPUÉS</p>

            <h2>
              El siguiente capítulo
              <em> comienza aquí.</em>
            </h2>

            <strong>Luis & Melanie</strong>
            <small>15 · 01 · 27</small>
          </div>
        </div>
      )}
    </section>
  )
}



const PAGE_PATHS = {
  inicio: '/',
  boda: '/el-gran-dia',
  informacion: '/informacion',
  hospedaje: '/hospedaje',
  transporte: '/transporte',
  medellin: '/medellin',
  galeria: '/galeria',
  regalos: '/regalos',
  rsvp: '/rsvp',
}

const PATH_PAGES = Object.fromEntries(
  Object.entries(PAGE_PATHS).map(([page, path]) => [
    path,
    page,
  ])
)

function WeddingApp() {
  const location = useLocation()
  const routerNavigate = useNavigate()

  const activePage =
    PATH_PAGES[location.pathname] || 'inicio'

  const [showInvitation, setShowInvitation] = useState(
    () => location.pathname === '/'
  )
  const [showStoryFilm, setShowStoryFilm] = useState(false)
  const [homeReveal, setHomeReveal] = useState(false)
  const musicRef = useRef(null)
  const homeImageRef = useRef(null)
  const galleryTouchStartXRef = useRef(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeGalleryImage, setActiveGalleryImage] = useState(null)
  const [hotelSlide, setHotelSlide] = useState(0)
  const [carouselPaused, setCarouselPaused] = useState(false)
  const [touchStartX, setTouchStartX] = useState(null)

  useEffect(() => {
    preloadImage(storyVideo1)
    preloadImage(storyVideo2)
  }, [])

  useEffect(() => {
    if (!PATH_PAGES[location.pathname]) {
      routerNavigate('/', { replace: true })
      return
    }

    setMenuOpen(false)
    setActiveGalleryImage(null)

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  }, [location.pathname, routerNavigate])

  const [rsvpCode, setRsvpCode] = useState('')
  const [rsvpGroup, setRsvpGroup] = useState(null)
  const [rsvpResponses, setRsvpResponses] = useState({})
  const [rsvpMessage, setRsvpMessage] = useState('')
  const [rsvpAdminData, setRsvpAdminData] = useState(null)
  const [rsvpAdminOpenList, setRsvpAdminOpenList] = useState('attending')
  const [rsvpStatus, setRsvpStatus] = useState({
    state: 'idle',
    message: '',
  })

  const galleryPhotos = [
    {
      src: galleryPre01,
      alt: 'Luis y Melanie abrazados en el bosque',
      className: 'gallery-preboda-item gallery-preboda-wide',
    },
    {
      src: galleryPre02,
      alt: 'Luis y Melanie durante su sesión preboda en las montañas',
      className: 'gallery-preboda-item gallery-preboda-portrait',
    },
    {
      src: galleryPre03,
      alt: 'Luis y Melanie junto a un árbol durante su sesión preboda',
      className: 'gallery-preboda-item gallery-preboda-portrait',
    },
    {
      src: galleryPre04,
      alt: 'Luis y Melanie tomados de la mano frente al paisaje',
      className: 'gallery-preboda-item gallery-preboda-wide',
    },
    {
      src: galleryPre05,
      alt: 'Retrato de Luis y Melanie junto al agua',
      className: 'gallery-preboda-item gallery-preboda-portrait',
    },
    {
      src: galleryPre06,
      alt: 'Luis y Melanie junto a un caballo en su sesión preboda',
      className: 'gallery-preboda-item gallery-preboda-portrait',
    },
    {
      src: galleryPre07,
      alt: 'Luis besando a Melanie durante su sesión preboda',
      className: 'gallery-preboda-item gallery-preboda-portrait',
    },
    {
      src: galleryPre08,
      alt: 'Luis y Melanie con un caballo y las montañas al fondo',
      className: 'gallery-preboda-item gallery-preboda-portrait',
    },
    {
      src: galleryPre09,
      alt: 'Luis y Melanie juntos junto a un gran árbol',
      className: 'gallery-preboda-item gallery-preboda-portrait',
    },
  ]

  const hotelPhotos = [
    movich1,
    movich2,
    movich3,
    movich4,
    movich5,
    movich6,
    movich7,
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
    if (activePage !== 'inicio') {
      return undefined
    }

    let animationFrameId = null

    const updateHomeParallax = () => {
      const image = homeImageRef.current

      if (!image) {
        return
      }

      const scrollOffset = Math.min(
        window.scrollY * 0.08,
        34
      )

      image.style.setProperty(
        '--home-parallax',
        `${scrollOffset}px`
      )
    }

    const handleHomeScroll = () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }

      animationFrameId = window.requestAnimationFrame(
        updateHomeParallax
      )
    }

    updateHomeParallax()
    window.addEventListener('scroll', handleHomeScroll, {
      passive: true,
    })

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId)
      }

      window.removeEventListener(
        'scroll',
        handleHomeScroll
      )
    }
  }, [activePage])

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

  useEffect(() => {
    const revealSelectors = [
      '.section-heading',
      '.dress-code-heading',
      '.dress-code-details',
      '.info-card',
      '.stay-intro-title',
      '.stay-gallery',
      '.stay-intro-copy',
      '.stay-included-grid article',
      '.stay-section-heading',
      '.stay-room-row',
      '.stay-airport',
      '.stay-steps-grid article',
      '.transport-section-heading',
      '.transport-route',
      '.transport-stop',
      '.transport-note',
      '.transport-schedule',
      '.medellin-weather-heading',
      '.medellin-weather-grid article',
      '.medellin-section-heading',
      '.medellin-attraction-card',
      '.medellin-escape-feature',
      '.medellin-guide-item',
      '.gallery-editorial-heading',
      '.gallery-editorial-ending',
      '.rsvp-code-hero',
      '.rsvp-code-entry',
      '.rsvp-guest-heading',
      '.rsvp-guest-card',
      '.rsvp-code-message',
      '.rsvp-code-summary',
    ]

    const revealItems = Array.from(
      document.querySelectorAll(revealSelectors.join(','))
    )

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    revealItems.forEach((item, index) => {
      item.classList.add('scroll-reveal')
      item.style.setProperty(
        '--reveal-delay',
        `${Math.min((index % 4) * 70, 210)}ms`
      )
    })

    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) =>
        item.classList.add('scroll-reveal-visible')
      )
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return
          }

          entry.target.classList.add('scroll-reveal-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -6% 0px',
      }
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [activePage, rsvpGroup, rsvpStatus.state])

  const openGalleryImage = (index) => {
    setActiveGalleryImage(index)
  }

  const closeGalleryImage = () => {
    setActiveGalleryImage(null)
  }

  const showPreviousGalleryImage = () => {
    setActiveGalleryImage((currentIndex) =>
      currentIndex === null
        ? null
        : (currentIndex - 1 + galleryPhotos.length) %
          galleryPhotos.length
    )
  }

  const showNextGalleryImage = () => {
    setActiveGalleryImage((currentIndex) =>
      currentIndex === null
        ? null
        : (currentIndex + 1) % galleryPhotos.length
    )
  }

  useEffect(() => {
    if (activeGalleryImage === null) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleGalleryKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeGalleryImage()
      }

      if (event.key === 'ArrowLeft') {
        showPreviousGalleryImage()
      }

      if (event.key === 'ArrowRight') {
        showNextGalleryImage()
      }
    }

    window.addEventListener('keydown', handleGalleryKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener(
        'keydown',
        handleGalleryKeyDown
      )
    }
  }, [activeGalleryImage])

  const handleGalleryTouchStart = (event) => {
    galleryTouchStartXRef.current = event.touches[0].clientX
  }

  const handleGalleryTouchEnd = (event) => {
    if (galleryTouchStartXRef.current === null) {
      return
    }

    const touchEndX = event.changedTouches[0].clientX
    const swipeDistance = galleryTouchStartXRef.current - touchEndX

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        showNextGalleryImage()
      } else {
        showPreviousGalleryImage()
      }
    }

    galleryTouchStartXRef.current = null
  }

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
    { id: 'inicio', label: 'Inicio', path: PAGE_PATHS.inicio },
    { id: 'boda', label: 'El Gran Día', path: PAGE_PATHS.boda },
    {
      id: 'informacion',
      label: 'Información',
      path: PAGE_PATHS.informacion,
    },
    { id: 'galeria', label: 'Galería', path: PAGE_PATHS.galeria },
    { id: 'rsvp', label: 'RSVP', path: PAGE_PATHS.rsvp },
  ]

  const navigate = (page) => {
    const destination =
      PAGE_PATHS[page] || PAGE_PATHS.inicio

    const performNavigation = () => {
      routerNavigate(destination)
      setMenuOpen(false)

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    if (
      destination !== location.pathname &&
      typeof document.startViewTransition === 'function'
    ) {
      document.startViewTransition(performNavigation)
      return
    }

    performNavigation()
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
      if (audio.currentTime >= 67) {
        audio.currentTime = 0
      }

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

  const handleWeddingMusicTimeUpdate = () => {
    const audio = musicRef.current

    if (!audio) {
      return
    }

    if (audio.currentTime >= 67) {
      audio.pause()
      audio.currentTime = 67
      setIsMusicPlaying(false)
    }
  }

  const openInvitation = () => {
    setShowInvitation(false)
    setShowStoryFilm(true)
  }

  const finishStoryFilm = () => {
    setHomeReveal(true)
    setShowStoryFilm(false)

    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })

    window.setTimeout(() => {
      setHomeReveal(false)
    }, 1200)
  }

  const normalizeInvitationCode = (value) =>
    value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 32)

  const verifyRsvpCode = async (event) => {
    event.preventDefault()

    const normalizedCode =
      normalizeInvitationCode(rsvpCode)

    const invalidCodeMessage =
      'Este código no es válido. Verifica que esté escrito correctamente e inténtalo nuevamente.'

    const temporaryErrorMessage =
      'No pudimos verificar el código en este momento. Inténtalo nuevamente en unos minutos.'

    if (normalizedCode.length < 5) {
      setRsvpStatus({
        state: 'error',
        message: invalidCodeMessage,
      })
      return
    }

    setRsvpStatus({
      state: 'checking',
      message: '',
    })

    /*
      1. Los códigos normales de invitados tienen 5 caracteres.
         El navegador NO conoce la lista maestra.
         Consulta al servidor y recibe solo ese grupo.
    */
    if (normalizedCode.length === 5) {
      try {
        const lookupResponse = await fetch(
          '/api/rsvp-lookup',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code: normalizedCode,
            }),
          }
        )

        let lookupData = null

        try {
          lookupData = await lookupResponse.json()
        } catch {
          lookupData = null
        }

        if (
          lookupResponse.ok &&
          lookupData?.success &&
          Array.isArray(lookupData.guests)
        ) {
          const matchedGroup = {
            guests: lookupData.guests,
          }

          setRsvpCode(normalizedCode)
          setRsvpGroup(matchedGroup)
          setRsvpAdminData(null)

          setRsvpResponses(
            matchedGroup.guests.reduce(
              (responses, guest) => ({
                ...responses,
                [guest.id]: '',
              }),
              {}
            )
          )

          setRsvpStatus({
            state: 'verified',
            message: '',
          })

          window.setTimeout(() => {
            setRsvpStatus({
              state: 'selecting',
              message: '',
            })
          }, 700)

          return
        }

        /*
          404/400 significa que no corresponde a un grupo normal.
          Antes de declararlo inválido, verificamos si es el
          código privado del dashboard.
        */
        if (
          ![400, 404].includes(lookupResponse.status)
        ) {
          console.warn(
            'RSVP lookup temporalmente no disponible.',
            lookupData
          )

          setRsvpStatus({
            state: 'error',
            message: temporaryErrorMessage,
          })
          return
        }
      } catch (error) {
        console.warn(
          'No fue posible consultar el código RSVP.',
          error
        )

        setRsvpStatus({
          state: 'error',
          message: temporaryErrorMessage,
        })
        return
      }
    }

    /*
      2. Si no fue un código normal válido, probamos el acceso
         administrador. El código secreto nunca está en App.jsx.
    */
    try {
      const adminResponse = await fetch(
        '/api/rsvp-summary',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            adminCode: normalizedCode,
          }),
        }
      )

      let adminData = null

      try {
        adminData = await adminResponse.json()
      } catch {
        adminData = null
      }

      if (
        adminResponse.ok &&
        adminData?.success
      ) {
        setRsvpCode(normalizedCode)
        setRsvpGroup(null)
        setRsvpAdminData(adminData)
        setRsvpAdminOpenList('attending')

        setRsvpStatus({
          state: 'admin',
          message: '',
        })

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })

        return
      }

      if (adminResponse.status >= 500) {
        console.warn(
          'RSVP dashboard temporalmente no disponible.',
          adminData
        )

        setRsvpStatus({
          state: 'error',
          message: temporaryErrorMessage,
        })
        return
      }

      setRsvpStatus({
        state: 'error',
        message: invalidCodeMessage,
      })
    } catch (error) {
      console.warn(
        'No fue posible verificar el acceso administrativo.',
        error
      )

      setRsvpStatus({
        state: 'error',
        message: temporaryErrorMessage,
      })
    }
  }

  const updateGuestResponse = (guestId, response) => {
    setRsvpResponses((currentResponses) => ({
      ...currentResponses,
      [guestId]: response,
    }))

    if (rsvpStatus.state === 'error') {
      setRsvpStatus({
        state: 'selecting',
        message: '',
      })
    }
  }

  const resetRsvp = () => {
    setRsvpCode('')
    setRsvpGroup(null)
    setRsvpResponses({})
    setRsvpMessage('')
    setRsvpAdminData(null)
    setRsvpAdminOpenList('attending')
    setRsvpStatus({
      state: 'idle',
      message: '',
    })
  }

  const submitRsvp = async (event) => {
    event.preventDefault()

    if (!rsvpGroup) {
      return
    }

    const hasPendingResponses = rsvpGroup.guests.some(
      (guest) => !rsvpResponses[guest.id]
    )

    if (hasPendingResponses) {
      setRsvpStatus({
        state: 'error',
        message:
          'Indica si cada invitado asistirá o no antes de enviar la confirmación.',
      })
      return
    }

    const attendingGuests = rsvpGroup.guests.filter(
      (guest) => rsvpResponses[guest.id] === 'yes'
    )

    const decliningGuests = rsvpGroup.guests.filter(
      (guest) => rsvpResponses[guest.id] === 'no'
    )

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
      codigo_de_invitacion: rsvpCode,
      confirmados:
        attendingGuests.length > 0
          ? attendingGuests.map((guest) => guest.name).join(', ')
          : 'Ninguno',
      no_asisten:
        decliningGuests.length > 0
          ? decliningGuests.map((guest) => guest.name).join(', ')
          : 'Ninguno',
      total_confirmados: attendingGuests.length,
      mensaje:
        rsvpMessage.trim() || 'Sin mensaje adicional',
      boda: 'Luis & Melanie · 15 de enero de 2027',
    }

    try {
      /*
        Primero enviamos a Formspree, que ya sabemos que
        funciona correctamente en producción.
      */
      const formspreeResponse = await fetch(
        formspreeEndpoint,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      if (!formspreeResponse.ok) {
        throw new Error(
          'No fue posible enviar la respuesta.'
        )
      }

      /*
        Después intentamos guardar en Supabase.
        Si esta llamada falla, NO bloqueamos la confirmación
        del invitado porque Formspree ya recibió su RSVP.
      */
      try {
        const saveResponse = await fetch(
          '/api/rsvp-save',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              invitationCode: rsvpCode,
              responses: rsvpGroup.guests.map(
                (guest) => ({
                  guestId: guest.id,
                  guestName: guest.name,
                  attendance:
                    rsvpResponses[guest.id],
                })
              ),
              message: rsvpMessage.trim(),
            }),
          }
        )

        if (!saveResponse.ok) {
          console.warn(
            'Formspree recibió el RSVP, pero Supabase no pudo guardarlo.'
          )
        }
      } catch (supabaseError) {
        console.warn(
          'Formspree recibió el RSVP, pero la copia en Supabase falló.',
          supabaseError
        )
      }

      setRsvpStatus({
        state: 'sending-animation',
        message: '',
      })

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      window.setTimeout(() => {
        setRsvpStatus({
          state: 'success',
          message: '',
        })
      }, 1800)
    } catch (error) {
      setRsvpStatus({
        state: 'error',
        message:
          'No pudimos enviar tu confirmación. Inténtalo nuevamente en unos minutos.',
      })
    }
  }

  return (
    <>
      <audio
        ref={musicRef}
        src={weddingMusic}
        preload="metadata"
        onPlay={() => setIsMusicPlaying(true)}
        onPause={() => setIsMusicPlaying(false)}
        onEnded={() => setIsMusicPlaying(false)}
        onTimeUpdate={handleWeddingMusicTimeUpdate}
      />

      <InvitationEnvelope
        isVisible={showInvitation}
        monogram={monogramGold}
        onStartMusic={startWeddingMusic}
        onOpen={openInvitation}
      />

      {showStoryFilm && (
        <StoryFilm onFinish={finishStoryFilm} />
      )}

      {!showInvitation && !showStoryFilm && (
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
          <span
            className="music-control-icon violin-icon"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 72 72"
              role="presentation"
            >
              <g className="violin-body">
                <path
                  className="violin-silhouette"
                  d="M30 21
                     C25.4 21 22 23.8 22 28
                     C22 31.1 23.8 33 27 34.3
                     C24.1 35.5 22 37.6 20.8 40.6
                     C18.9 45.4 20.1 51.4 23.2 55.4
                     C25.2 58.1 27.5 59.7 30 59.7
                     C32.5 59.7 34.8 58.1 36.8 55.4
                     C39.9 51.4 41.1 45.4 39.2 40.6
                     C38 37.6 35.9 35.5 33 34.3
                     C36.2 33 38 31.1 38 28
                     C38 23.8 34.6 21 30 21Z"
                />

                <path
                  className="violin-neck"
                  d="M28.8 21 29.5 10.5M31.2 21 30.5 10.5"
                />

                <path
                  className="violin-scroll"
                  d="M30 10.5
                     C27.4 9.3 27.3 6.2 29.5 4.9
                     C31.8 3.5 34.2 5.1 33.7 7.4
                     C33.3 9.2 31.5 9.7 30.4 8.8"
                />

                <path
                  className="violin-peg"
                  d="M28.8 11.8 25.7 10.3M31.2 13.7 34.4 12.2"
                />

                <path
                  className="violin-fingerboard"
                  d="M30 11.2 30 39.5"
                />

                <path
                  className="violin-bridge"
                  d="M25.6 42.1
                     C27.8 41.1 32.2 41.1 34.4 42.1"
                />

                <path
                  className="violin-tailpiece"
                  d="M27.1 48.5 30 57 32.9 48.5Z"
                />

                <path
                  className="violin-string"
                  d="M29.35 9.5 29.15 55.3M30.65 9.5 30.85 55.3"
                />

                <path
                  className="violin-f-hole"
                  d="M24.9 35.7
                     C23.5 37.4 23.7 39.3 25 40.6
                     C26.2 41.8 26.1 43.2 24.9 44.5"
                />
                <path
                  className="violin-f-hole"
                  d="M35.1 35.7
                     C36.5 37.4 36.3 39.3 35 40.6
                     C33.8 41.8 33.9 43.2 35.1 44.5"
                />
              </g>

              <g className="violin-bow">
                <path
                  className="violin-bow-stick"
                  d="M9 44.5 L60 34.5"
                />
                <path
                  className="violin-bow-hair"
                  d="M10 47.6 L61 37.6"
                />
                <path
                  className="violin-bow-tip"
                  d="M60 34.5 L61 37.6"
                />
                <path
                  className="violin-bow-frog"
                  d="M9 44.5 L10 47.6 L15.5 46.5 L14.5 43.4 Z"
                />
              </g>
            </svg>
          </span>

          <span className="music-control-label">
            {isMusicPlaying ? 'PAUSAR' : 'MÚSICA'}
          </span>
        </button>
      )}

      {!showInvitation && !showStoryFilm && (
        <div className={homeReveal ? "site site-home-reveal" : "site"}>

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

        <div
          className="mobile-menu-photo"
          aria-hidden="true"
        >
          <img
            src={menuBackground}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>

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
              aria-current={
                activePage === page.id
                  ? 'page'
                  : undefined
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
                ref={homeImageRef}
                src={portadaImg}
                alt="Luis y Melanie"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                width="1200"
                height="1800"
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
                <i aria-hidden="true">·</i>
                <span>ENERO</span>
                <i aria-hidden="true">·</i>
                <span>2027</span>
              </div>

              <div className="countdown">

                <p>FALTAN</p>

                <div className="countdown-values">

                  <div>
                    <strong key={timeLeft.days}>{timeLeft.days}</strong>
                    <span>DÍAS</span>
                  </div>

                  <i>:</i>

                  <div>
                    <strong key={timeLeft.hours}>
                      {String(timeLeft.hours).padStart(2, '0')}
                    </strong>
                    <span>HORAS</span>
                  </div>

                  <i>:</i>

                  <div>
                    <strong key={timeLeft.minutes}>
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </strong>
                    <span>MINUTOS</span>
                  </div>

                  <i>:</i>

                  <div>
                    <strong key={timeLeft.seconds}>
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </strong>
                    <span>SEGUNDOS</span>
                  </div>

                </div>

              </div>

              <p className="home-location">
                MEDELLÍN · COLOMBIA
              </p>

              <div className="home-bottom">

                <p>
                  Estamos felices de compartir
                  <br />
                  este día tan especial contigo.
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
                Nuestra Boda
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
                <span className="date-weekday">
                  VIERNES
                </span>

                <span className="date-day">
                  15
                </span>

                <div>
                  <strong>ENERO</strong>
                  <small>2027</small>
                </div>
              </div>

              <p className="city">
                MEDELLÍN · COLOMBIA
              </p>

            </section>

            {/* UBICACIONES */}

            <section className="venues-section">

              <div className="section-heading">

                <p className="section-kicker">
                  DETALLES DEL EVENTO
                </p>

                <h2>
                  El escenario de nuestra historia
                </h2>

              </div>

              <div className="venue-grid">

                {/* CEREMONIA */}

                <article className="venue-card">

                  <div className="venue-image">
                    <img
                      src={parroquiaImg}
                      alt="Parroquia María Madre de Dios"
                      loading="lazy"
                      decoding="async"
                      width="1402"
                      height="1122"
                    />
                  </div>

                  <div className="venue-info">

                    <p className="venue-type">
                      CEREMONIA
                    </p>

                    <h3>
                      Parroquia María Madre de Dios
                    </h3>

                    <p className="venue-time">
                      4:00 PM
                    </p>

                    <p className="venue-city">
                      Rionegro, Medellín
                    </p>

                    <p className="venue-description">
                      Nuestro día más especial comienza ante Dios,
                      con Su bendición y nuestro sí para siempre.
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

                  <div className="venue-image">
                    <img
                      src={villaCelesteImg}
                      alt="Centro de Eventos Villa Celeste"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="venue-info">

                    <p className="venue-type">
                      RECEPCIÓN & FIESTA
                    </p>

                    <h3>
                      Centro de Eventos Villa Celeste
                    </h3>

                    <p className="venue-time">
                      5:30 PM
                    </p>

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

                <h2 className="dress-code-formal-title">
                  FORMAL
                </h2>

                <p>
                  Queremos que todos se sientan cómodos y
                  elegantes mientras celebran con nosotros.
                </p>
              </div>

              <div className="dress-code-details">

                <div className="dress-code-detail-block">
                  <span>MUJERES</span>

                  <h3>
                    Vestido formal largo
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
                      Agradecemos evitar el blanco y sus tonalidades,
                      así como el verde oliva, para este día tan especial.
                    </p>
                  </div>
                </div>

                <div className="dress-code-detail-divider"></div>

                <div className="dress-code-detail-block">
                  <span>CABALLEROS</span>

                  <h3>
                    Traje formal y corbata
                  </h3>
                </div>

              </div>

              <div className="dress-code-inspiration">
                <a
                  className="dress-code-pinterest-button"
                  href="https://pin.it/7JebbN5V5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ver inspiración de dress code en Pinterest"
                >
                  VER INSPIRACIÓN
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

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
                cada momento.
              </p>

              <figure className="information-photo">
                <img
                  src={informationPhoto}
                  alt="Luis y Melanie"
                  loading="lazy"
                  decoding="async"
                  width="1133"
                  height="1700"
                />
              </figure>

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
                onClick={() => navigate('transporte')}
              >
                <span className="info-number">02</span>

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
                <span className="info-number">03</span>

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

              <button
                className="info-card"
                onClick={() => navigate('regalos')}
              >
                <span className="info-number">04</span>

                <span className="info-icon">
                  <LineIcon name="gift" size={30} />
                </span>

                <span className="info-card-copy">
                  <strong>Regalos</strong>
                  <small>
                    Un detalle para celebrar con nosotros
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

            <section
              className="stay-hero"
              style={{ backgroundImage: `url(${movichHero})` }}
            >
              <div className="stay-hero-overlay"></div>

              <div className="stay-hero-content">
                <p className="section-kicker">YOUR STAY</p>

                <h1>
                  Movich
                  <em> Las Lomas</em>
                </h1>

                <p className="stay-hero-location">
                  MEDELLÍN · COLOMBIA
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
                          decoding="async"
                          fetchPriority={index === 0 ? 'high' : 'low'}
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
                    <h3>Desayuno</h3>
                  </div>
                  <p>
                    Para los huéspedes registrados en la reserva.
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
                    Aplicable para los extranjeros.
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

                  <p>Ideal para dos huéspedes</p>
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
                    <small>Por persona adicional por noche + Desayuno incluido</small>
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
            TRANSPORTE
        ================================= */}

        {activePage === 'transporte' && (
          <section className="transport-page page-transition">

            <button
              type="button"
              className="transport-back-button"
              onClick={() => navigate('informacion')}
            >
              <LineIcon name="arrowLeft" size={18} />
              VOLVER A INFORMACIÓN
            </button>

            <section
              className="transport-hero"
              style={{ backgroundImage: `url(${transportHeroImg})` }}
            >

              <div className="transport-hero-overlay"></div>

              <div className="transport-hero-content">

                <p className="section-kicker">
                  EL DÍA DE LA BODA
                </p>

                <h1>
                  <span className="transport-title-line">
                    Solo tienes que
                  </span>
                  <em>disfrutar</em>
                </h1>

                <p>
                  
                </p>

              </div>

            </section>

            <section className="transport-route-section">

              <div className="transport-section-heading">

                <p className="section-kicker">
                  TRANSPORTE
                </p>

                <p>
                  Hemos organizado el transporte para que puedan
                  disfrutar cada momento de la celebración con tranquilidad.
                </p>

              </div>

              <div className="transport-options">

                <article className="transport-option-card featured">

                  <header className="transport-option-heading">
                    <span>HUÉSPEDES DEL HOTEL SEDE</span>
                    <h3>Movich Las Lomas</h3>
                    <p>
                      Si te hospedas en nuestro hotel sede, tendrás transporte
                      incluido durante toda la celebración.
                    </p>
                  </header>

                  <div className="transport-option-route">

                    <div className="transport-option-stop">
                      <span className="transport-option-icon">
                        <LineIcon name="hotel" size={28} />
                      </span>
                      <strong>Hotel sede</strong>
                    </div>

                    <div className="transport-option-stop">
                      <span className="transport-option-icon">
                        <LineIcon name="church" size={28} />
                      </span>
                      <strong>Ceremonia</strong>
                    </div>

                    <div className="transport-option-stop">
                      <span className="transport-option-icon">
                        <LineIcon name="location" size={28} />
                      </span>
                      <strong>Recepción</strong>
                    </div>

                    <div className="transport-option-stop">
                      <span className="transport-option-icon">
                        <LineIcon name="hotel" size={28} />
                      </span>
                      <strong>Hotel sede</strong>
                    </div>

                  </div>

                  <div className="transport-option-badge">
                    RECORRIDO COMPLETO INCLUIDO
                  </div>

                </article>

                <article className="transport-option-card">

                  <header className="transport-option-heading">
                    <span>OTROS ALOJAMIENTOS</span>
                    <h3>Traslado entre eventos</h3>
                    <p>
                      Si te hospedas en otro lugar, podrás acompañarnos
                      en el traslado de la ceremonia a la recepción.
                    </p>
                  </header>

                  <div className="transport-option-route compact">

                    <div className="transport-option-stop">
                      <span className="transport-option-icon">
                        <LineIcon name="church" size={28} />
                      </span>
                      <strong>Ceremonia</strong>
                    </div>

                    <div className="transport-option-stop">
                      <span className="transport-option-icon">
                        <LineIcon name="location" size={28} />
                      </span>
                      <strong>Recepción</strong>
                    </div>

                  </div>

                  <div className="transport-option-badge subtle">
                    TRASLADO CEREMONIA → RECEPCIÓN INCLUIDO
                  </div>

                </article>

              </div>

            </section>

            <section className="transport-schedule transport-schedule-standalone">

              <p className="section-kicker">
                HORARIOS
              </p>

              <h2>
                Los detalles se compartirán
                <em> más cerca de la fecha</em>
              </h2>

              <p>
                Compartiremos los horarios exactos y puntos de salida
                antes del día de la boda.
              </p>

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
              className="medellin-back-button"
              onClick={() => navigate('informacion')}
            >
              <LineIcon name="arrowLeft" size={18} />
              VOLVER A INFORMACIÓN
            </button>

            <section
              className="medellin-hero"
              style={{ backgroundImage: `url(${medellinHeroImg})` }}
            >

              <div className="medellin-hero-overlay"></div>

              <div className="medellin-hero-content">
                <p className="section-kicker">
                  DESCUBRE ANTIOQUIA
                </p>

                <h1>
                  Medellín
                </h1>

                <p>
                  Una ciudad vibrante, rodeada de montañas,
                  naturaleza, cultura y una gastronomía que
                  vale la pena descubrir.
                </p>


              </div>

            </section>
            <section className="medellin-weather">

              <div className="medellin-weather-heading">
                <h2>
                  La eterna primavera
                </h2>

                <p>
                  Medellín nos recibe con días agradables y noches frescas,
                  un clima perfecto para recorrer y disfrutar la ciudad.
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
                    en Medellín.
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
                    src={plazaBoteroImg}
                    alt="City Tour por Medellín"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="medellin-attraction-overlay">
                    <span>01</span>
                    <h3>City Tour</h3>
                    <p>
                      Una primera mirada a Medellín entre sus lugares
                      más emblemáticos, cultura e historia.
                    </p>
                  </div>
                </article>

                <article className="medellin-attraction-card">
                  <img
                    src={comuna13Img}
                    alt="Arte urbano y color en la Comuna 13 de Medellín"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="medellin-attraction-overlay">
                    <span>02</span>
                    <h3>Comuna 13</h3>
                    <p>
                      Arte urbano, historia, transformación
                      social y vistas de la ciudad.
                    </p>
                  </div>
                </article>

                <article className="medellin-attraction-card">
                  <img
                    src={provenzaImg}
                    alt="Provenza en Medellín"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="medellin-attraction-overlay">
                    <span>03</span>
                    <h3>El Poblado y Provenza</h3>
                    <p>
                      Restaurantes, cafés y una de las zonas
                      más conocidas para salir.
                    </p>
                  </div>
                </article>

                <article className="medellin-attraction-card">
                  <img
                    src={jardinBotanicoImg}
                    alt="Vegetación y senderos del Jardín Botánico de Medellín"
                    loading="lazy"
                    decoding="async"
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
                    src={pueblitoPaisaImg}
                    alt="Pueblito Paisa en Medellín"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="medellin-attraction-overlay">
                    <span>05</span>
                    <h3>Pueblito Paisa</h3>
                    <p>
                      Tradición paisa, arquitectura típica y una
                      vista privilegiada de Medellín.
                    </p>
                  </div>
                </article>

                <article className="medellin-attraction-card">
                  <img
                    src={museoCastilloImg}
                    alt="Museo El Castillo en Medellín"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="medellin-attraction-overlay">
                    <span>06</span>
                    <h3>Museo El Castillo</h3>
                    <p>
                      Arte, historia y jardines en un castillo inspirado
                      en la arquitectura europea.
                    </p>
                  </div>
                </article>

                <article className="medellin-attraction-card">
                  <img
                    src={parqueArviImg}
                    alt="Naturaleza y estación del Parque Arví en Medellín"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="medellin-attraction-overlay">
                    <span>07</span>
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
                    src={guatapeImg}
                    alt="Vista panorámica del embalse de Guatapé desde la Piedra del Peñol"
                      loading="lazy"
                      decoding="async"
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

                <article className="medellin-escape-feature">
                  <img
                    src={tourCafeteroImg}
                    alt="Experiencia de tour cafetero en Antioquia"
                    loading="lazy"
                    decoding="async"
                  />

                  <div>
                    <span>EXPERIENCIA</span>
                    <h3>Tour cafetero</h3>
                    <p>
                      Del grano a la taza, entre cafetales,
                      aromas y tradición antioqueña.
                    </p>
                  </div>
                </article>
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


            </section>

          </section>
        )}

        {/* ================================
            GALERÍA
        ================================= */}


        {/* ================================
            REGALOS
        ================================= */}

        {activePage === 'regalos' && (
          <section className="gifts-page page-transition">

            <button
              type="button"
              className="gifts-back-button"
              onClick={() => navigate('informacion')}
            >
              <LineIcon name="arrowLeft" size={18} />
              VOLVER A INFORMACIÓN
            </button>

            <div className="gifts-hero">
              <div className="gifts-photo-wrap">
                <img
                  src={giftsPhoto}
                  alt="Luis y Melanie"
                  className="gifts-photo"
                  decoding="async"
                />
              </div>

              <div className="gifts-copy">
                <p className="gifts-message">
                  Nos hace mucha ilusión celebrar este momento junto a ustedes.
                  Si desean acompañarnos con un regalo en esta nueva etapa,
                  hemos habilitado la siguiente cuenta bancaria.
                </p>

                <div className="gifts-divider" />

                <div className="gifts-bank-card">
                  <span className="gifts-bank-label">
                    DATOS PARA REGALOS
                  </span>

                  <div className="gifts-bank-details">
                    <p>
                      <span>BANCO</span>
                      <strong>Banco General</strong>
                    </p>

                    <p>
                      <span>TITULAR</span>
                      <strong>Luis Eduardo Pinto Miranda</strong>
                    </p>

                    <p>
                      <span>CUENTA</span>
                      <strong>04-72-00-761201-08</strong>
                    </p>
                  </div>
                </div>

                <p className="gifts-signature">
                  Con cariño,
                  <span>Luis &amp; Melanie</span>
                </p>
              </div>
            </div>

          </section>
        )}

        {activePage === 'galeria' && (
          <section className="gallery-preboda-page page-transition">

            <header className="gallery-preboda-heading">

              <h1>
                Un pedacito
                <em> de nosotros</em>
              </h1>

              <p>
                Una tarde entre montañas, naturaleza y momentos
                que queremos guardar para siempre.
              </p>

            </header>

            <div className="gallery-preboda-grid">

              {galleryPhotos.map((photo, index) => (
                <figure
                  key={photo.src}
                  className={photo.className}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                  />
                </figure>
              ))}

            </div>

            <footer className="gallery-preboda-ending">
              <span aria-hidden="true">♡</span>

              <p>
                Luis & Melanie
              </p>

              <small>
                15 · 01 · 27
              </small>
            </footer>

          </section>
        )}

        {/* ================================
            RSVP
        ================================= */}

        {activePage === 'rsvp' && (
          <section className="rsvp-code-page page-transition">

            {rsvpStatus.state === 'sending-animation' && (
              <div
                className="rsvp-send-animation"
                role="status"
                aria-live="polite"
              >
                <div className="rsvp-paper-scene">

                  <div
                    className="rsvp-paper-sheet"
                    aria-hidden="true"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <svg
                    className="rsvp-paper-plane"
                    viewBox="0 0 120 90"
                    aria-hidden="true"
                  >
                    <path
                      className="rsvp-plane-outline"
                      d="M8 42 109 8 77 81 53 55 8 42Z"
                    />
                    <path
                      className="rsvp-plane-fold"
                      d="M53 55 109 8 65 63 77 81"
                    />
                    <path
                      className="rsvp-plane-fold"
                      d="M53 55 50 76 65 63"
                    />
                  </svg>

                  <div
                    className="rsvp-plane-trail"
                    aria-hidden="true"
                  ></div>

                </div>

                <p>ENVIANDO CONFIRMACIÓN</p>

                <h2>
                  Tu respuesta está
                  <em> en camino</em>
                </h2>
              </div>
            )}

            {rsvpStatus.state === 'success' && (
              <div className="rsvp-code-success">

                <div
                  className="rsvp-confirmation-photo"
                  aria-hidden="true"
                >
                  <img
                    src={confirmationPhoto}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="rsvp-code-success-content">

                <div className="rsvp-success-heart">
                  ♡
                </div>

                <p className="eyebrow">
                  CONFIRMACIÓN RECIBIDA
                </p>

                <h2>
                  Gracias por
                  <em> responder.</em>
                </h2>

                <p>
                  Hemos registrado la respuesta de todos
                  los invitados incluidos en este código.
                </p>

                <strong>
                  Luis & Melanie
                </strong>

                <button
                  type="button"
                  className="rsvp-secondary-button"
                  onClick={resetRsvp}
                >
                  INGRESAR OTRO CÓDIGO
                </button>

                </div>

              </div>
            )}

            {rsvpStatus.state === 'admin' &&
              rsvpAdminData && (
                <section className="rsvp-admin-dashboard">
                  <header className="rsvp-admin-heading">
                    <p className="eyebrow">
                      PANEL PRIVADO
                    </p>

                    <h1>
                      Resumen
                      <em> RSVP</em>
                    </h1>

                    <p>
                      Estado actual de las confirmaciones
                      de tus invitados.
                    </p>
                  </header>

                  <div className="rsvp-admin-stats">
                    <article className="rsvp-admin-stat total">
                      <strong>
                        {rsvpAdminData.summary.total}
                      </strong>
                      <span>INVITADOS</span>
                    </article>

                    <article>
                      <strong>
                        {rsvpAdminData.summary.attending}
                      </strong>
                      <span>ASISTIRÁN</span>
                    </article>

                    <article>
                      <strong>
                        {rsvpAdminData.summary.notAttending}
                      </strong>
                      <span>NO ASISTIRÁN</span>
                    </article>

                    <article>
                      <strong>
                        {rsvpAdminData.summary.pending}
                      </strong>
                      <span>PENDIENTES</span>
                    </article>
                  </div>

                  <div className="rsvp-admin-progress-wrap">
                    <div className="rsvp-admin-progress-copy">
                      <span>RESPUESTAS RECIBIDAS</span>
                      <strong>
                        {rsvpAdminData.summary.responseRate}%
                      </strong>
                    </div>

                    <div
                      className="rsvp-admin-progress"
                      aria-label={`${rsvpAdminData.summary.responseRate}% de respuestas recibidas`}
                    >
                      <span
                        style={{
                          width: `${rsvpAdminData.summary.responseRate}%`,
                        }}
                      ></span>
                    </div>

                    <small>
                      {rsvpAdminData.summary.responded} de{' '}
                      {rsvpAdminData.summary.total} invitados
                      han respondido.
                    </small>
                  </div>

                  <div className="rsvp-admin-tabs">
                    {[
                      {
                        id: 'attending',
                        label: 'Asistirán',
                        count:
                          rsvpAdminData.summary.attending,
                      },
                      {
                        id: 'notAttending',
                        label: 'No asistirán',
                        count:
                          rsvpAdminData.summary.notAttending,
                      },
                      {
                        id: 'pending',
                        label: 'Pendientes',
                        count:
                          rsvpAdminData.summary.pending,
                      },
                    ].map((tab) => (
                      <button
                        type="button"
                        key={tab.id}
                        className={
                          rsvpAdminOpenList === tab.id
                            ? 'active'
                            : ''
                        }
                        onClick={() =>
                          setRsvpAdminOpenList(tab.id)
                        }
                      >
                        <span>{tab.label}</span>
                        <strong>{tab.count}</strong>
                      </button>
                    ))}
                  </div>

                  <div className="rsvp-admin-list">
                    {rsvpAdminData[
                      rsvpAdminOpenList
                    ].length === 0 ? (
                      <p className="rsvp-admin-empty">
                        No hay invitados en esta categoría.
                      </p>
                    ) : (
                      rsvpAdminData[
                        rsvpAdminOpenList
                      ].map((guest) => (
                        <article
                          key={guest.guestId}
                          className="rsvp-admin-guest"
                        >
                          <div>
                            <strong>
                              {guest.guestName}
                            </strong>
                            <span>
                              Código {guest.invitationCode}
                            </span>
                          </div>

                          {guest.submittedAt && (
                            <time>
                              {new Date(
                                guest.submittedAt
                              ).toLocaleDateString(
                                'es-PA',
                                {
                                  day: '2-digit',
                                  month: 'short',
                                }
                              )}
                            </time>
                          )}
                        </article>
                      ))
                    )}
                  </div>

                  <button
                    type="button"
                    className="rsvp-secondary-button rsvp-admin-exit"
                    onClick={resetRsvp}
                  >
                    CERRAR PANEL
                  </button>
                </section>
              )}

            {![
              'success',
              'sending-animation',
              'admin',
            ].includes(rsvpStatus.state) && (
              <>
                <header className="rsvp-code-hero">

                  <p className="eyebrow">
                    RSVP · 15 · 01 · 2027
                  </p>

                  <h1>
                    Confirma tu
                    <em> asistencia</em>
                  </h1>

                  <p>
                    Ingresa el código que encontrarás en tu
                    invitación para ver las personas incluidas.
                  </p>

                </header>

                {!rsvpGroup && (
                  <form
                    className="rsvp-code-entry"
                    onSubmit={verifyRsvpCode}
                    noValidate
                  >

                    <label htmlFor="invitation-code">
                      CÓDIGO DE INVITACIÓN
                    </label>

                    <input
                      id="invitation-code"
                      type="text"
                      inputMode="text"
                      autoComplete="off"
                      maxLength="32"
                      value={rsvpCode}
                      onChange={(event) =>
                        setRsvpCode(
                          normalizeInvitationCode(
                            event.target.value
                          )
                        )
                      }
                      placeholder="HOU67"
                      aria-describedby="rsvp-code-help"
                    />

                    <p id="rsvp-code-help">
                      Ingresa el código incluido en tu invitación.
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
                        rsvpCode.length < 5 ||
                        rsvpStatus.state === 'checking'
                      }
                    >
                      {rsvpStatus.state === 'checking'
                        ? 'VERIFICANDO...'
                        : 'CONTINUAR'}
                      <span>
                        {rsvpStatus.state === 'checking'
                          ? '◌'
                          : '→'}
                      </span>
                    </button>

                  </form>
                )}

                {rsvpGroup &&
                  rsvpStatus.state === 'verified' && (
                    <div className="rsvp-code-verified">

                      <span>✓</span>

                      <h2>
                        Código verificado
                      </h2>

                    </div>
                  )}

                {rsvpGroup &&
                  rsvpStatus.state !== 'verified' && (
                    <form
                      className="rsvp-guest-confirmation"
                      onSubmit={submitRsvp}
                      noValidate
                    >

                      <div className="rsvp-guest-heading">

                        <p className="eyebrow">
                          NOS ALEGRA QUE ESTÉS AQUÍ
                        </p>

                        <h2>
                          Selecciona quiénes
                          <em> asistirán</em>
                        </h2>

                        <p>
                          Indica la respuesta de cada persona
                          incluida en este código.
                        </p>

                      </div>

                      <div className="rsvp-guest-list">

                        {rsvpGroup.guests.map((guest) => (
                          <article
                            className="rsvp-guest-card"
                            key={guest.id}
                          >

                            <h3>
                              {guest.name}
                            </h3>

                            <div className="rsvp-guest-options">

                              <button
                                type="button"
                                className={
                                  rsvpResponses[guest.id] === 'yes'
                                    ? 'selected'
                                    : ''
                                }
                                onClick={() =>
                                  updateGuestResponse(
                                    guest.id,
                                    'yes'
                                  )
                                }
                              >
                                <span>✓</span>
                                ASISTIRÉ
                              </button>

                              <button
                                type="button"
                                className={
                                  rsvpResponses[guest.id] === 'no'
                                    ? 'selected'
                                    : ''
                                }
                                onClick={() =>
                                  updateGuestResponse(
                                    guest.id,
                                    'no'
                                  )
                                }
                              >
                                <span>—</span>
                                NO ASISTIRÉ
                              </button>

                            </div>

                          </article>
                        ))}

                      </div>

                      <section className="rsvp-code-message">

                        <label htmlFor="rsvp-message">
                          UN MENSAJE PARA NOSOTROS
                        </label>

                        <textarea
                          id="rsvp-message"
                          rows="5"
                          value={rsvpMessage}
                          onChange={(event) =>
                            setRsvpMessage(event.target.value)
                          }
                          placeholder="Déjanos unas palabras si así lo deseas..."
                        />

                      </section>

                      <div className="rsvp-code-summary">

                        <strong>
                          {
                            Object.values(rsvpResponses).filter(
                              (response) => response === 'yes'
                            ).length
                          }
                        </strong>

                        <span>
                          {
                            Object.values(rsvpResponses).filter(
                              (response) => response === 'yes'
                            ).length === 1
                              ? 'INVITADO CONFIRMADO'
                              : 'INVITADOS CONFIRMADOS'
                          }
                        </span>

                      </div>

                      {rsvpStatus.state === 'error' && (
                        <div
                          className="rsvp-error"
                          role="alert"
                        >
                          {rsvpStatus.message}
                        </div>
                      )}

                      <div className="rsvp-code-actions">

                        <button
                          type="button"
                          className="rsvp-code-back"
                          onClick={resetRsvp}
                        >
                          CAMBIAR CÓDIGO
                        </button>

                        <button
                          type="submit"
                          className="rsvp-submit-button"
                          disabled={
                            rsvpStatus.state === 'submitting'
                          }
                        >
                          {rsvpStatus.state === 'submitting'
                            ? 'ENVIANDO...'
                            : 'ENVIAR CONFIRMACIÓN'}

                          <span>
                            {rsvpStatus.state === 'submitting'
                              ? '◌'
                              : '→'}
                          </span>
                        </button>

                      </div>

                    </form>
                  )}
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

      </footer>

        </div>
      )}

      <Analytics />
      <SpeedInsights />
    </>
  )
}



function App() {
  return (
    <BrowserRouter>
      <WeddingApp />
    </BrowserRouter>
  )
}

export default App