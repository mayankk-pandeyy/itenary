import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import beachVibes from "./assets/beach-vibes.png";
import cityVibes from "./assets/city-vibes.png";
import mountainVibes from "./assets/mountain-vibes.png";
import sunsetVibes from "./assets/sunset-vibes.png";
import offbeatLocationsVibes from "./assets/offbeat-locations.png";

function TripSwiper({ slides }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3600);
    return () => clearInterval(t);
  }, [slides.length]);

  function goPrev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function goNext() {
    setIndex((i) => (i + 1) % slides.length);
  }

  function handlePointerDown(e) {
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    el._swipeStartX = e.clientX;
  }

  function handlePointerUp(e) {
    const el = e.currentTarget;
    const startX = el._swipeStartX;
    if (typeof startX !== "number") return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) < 45) return;
    if (dx > 0) goPrev();
    else goNext();
  }

  return (
    <section className="swiper" aria-label="Trips swiper">
      <div
        className="swiper-viewport"
        role="group"
        aria-roledescription="carousel"
        aria-label="Trips preview"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div
          className="swiper-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <article key={s.title} className="slide" aria-hidden={i !== index}>
              <img className="trip-image" src={s.imgSrc} alt={s.title} />
              <div className="slide-overlay">
                <div className="slide-title">{s.title}</div>
                <div className="slide-subtitle">{s.subtitle}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="swiper-bottom">
        <div className="swiper-controls">
          <button className="icon-btn" type="button" onClick={goPrev} aria-label="Prev">
            ‹
          </button>
          <div className="dots" aria-label="Slide dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? "active" : ""}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button className="icon-btn" type="button" onClick={goNext} aria-label="Next">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const slides = [
    {
      title: "Offbeat locations",
      subtitle: "Unexplored gems",
      imgSrc: offbeatLocationsVibes,
    },
    {
      title: "Mountain adventure",
      subtitle: "Trails built for wanderers",
      imgSrc: mountainVibes,
    },
    {
      title: "Beach retreat",
      subtitle: "Sun, sand, and calm plans",
      imgSrc: beachVibes,
    },
    {
      title: "Sunset moments",
      subtitle: "Golden hour, perfectly planned",
      imgSrc: sunsetVibes,
    },
    {
      title: "City evenings",
      subtitle: "Cafes, lights, and street stories",
      imgSrc: cityVibes,
    },
  ];

  return (
    <div className="page">
      <div className="background-glow glow-1" />
      <div className="background-glow glow-2" />

      <main className="card">
        <p className="badge">Launching soon</p>
        <h1>
          Trips planned
          <span> beautifully.</span>
        </h1>
        <p className="subtitle">
          Itenary helps you plan the trip faster, calmer, and smarter.
        </p>

        <TripSwiper slides={slides} />

        <div className="actions">
          <a
            className="btn primary"
            href="mailto:hello@itenary.in?subject=Notify%20me%20when%20Itenary%20launches"
          >
            Notify Me
          </a>
          <Link className="btn orange" to="/about-us">
            About Us
          </Link>
          <a className="btn ghost" href="https://itenary.in">
            itenary.in
          </a>
        </div>

        <p className="footnote">More soon. Stay tuned.</p>
      </main>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page">
      <div className="background-glow glow-1" />
      <div className="background-glow glow-2" />

      <section className="about-section">
        <div className="card about-card">
          <p className="badge">About Itenary</p>
          <h2 className="about-title">A personalized itinerary for any trip or trek</h2>

          <p className="about-body">
            I’m building a platform where you can come, tell us your destination and travel style, and get a “perfect itinerary” end-to-end,
            for solo travelers or groups.
          </p>
          <p className="about-body">
            Think Annapurna Base Camp, Ladakh, or any route you want to explore, planned with all the details: days, stays, routes, and the
            ways to travel (bus, walk, flight) along with estimated prices, so you can plan with confidence.
          </p>

          <p className="about-body">
            Besides popular trails, we’ll curate <strong>exclusive unexplored offbeat places</strong> to explore, starting with ideas
            like Rishikesh, so your next trip feels fresh, personal, and unforgettable.
          </p>

          <div className="about-points" role="list" aria-label="What you will get">
            <div className="about-point" role="listitem">
              Personalized plans for your exact trip
            </div>
            <div className="about-point" role="listitem">
              Budget-aware estimates (days, stays, routes, transport)
            </div>
            <div className="about-point" role="listitem">
              Easy to use, and designed to scale as more destinations and details are added
            </div>
          </div>

          <p className="about-body">
            We’ll keep the experience crisp and effortless, so you can plan solo or in a group with confidence.
          </p>

          <div className="actions" style={{ justifyContent: "flex-start", marginTop: 18 }}>
            <Link className="btn ghost" to="/">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/about%20us" element={<AboutPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
