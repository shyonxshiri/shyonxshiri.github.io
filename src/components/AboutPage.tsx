import { useEffect, useRef, useState } from "react";
import "./AboutPage.css";

export default function AboutPage({ realmSupported, onViewOverview }: {
  realmSupported: boolean;
  onViewOverview: () => void;
}) {
  const filmRef = useRef<HTMLVideoElement>(null);
  const [filmStarted, setFilmStarted] = useState(false);

  const playFilm = () => {
    const film = filmRef.current;
    if (!film) return;
    setFilmStarted(true);
    film.focus();
    void film.play().catch(() => film.focus());
  };

  useEffect(() => {
    const film = filmRef.current;
    if (!film) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) film.pause();
    });
    const pauseWhenHidden = () => {
      if (document.hidden) film.pause();
    };
    observer.observe(film);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", pauseWhenHidden);
    };
  }, []);

  return (
    <section className="ss-about-view" aria-labelledby="ss-bio-heading">
      <div className="ss-about-hero">
        <figure className="ss-about-photo">
          <img src="/assets/Shyon_Studio_3298.jpg" srcSet="/assets/Shyon_Studio_1000.jpg 662w, /assets/Shyon_Studio_1800.jpg 1192w, /assets/Shyon_Studio_3298.jpg 2184w" sizes="(max-width: 640px) 100vw, (max-width: 900px) max(48vw, 464px), max(50vw, 47.7vh, 477px)" width="2184" height="3298" alt="Shyon Shiri seated in a black jacket against a studio backdrop" decoding="async" />
        </figure>
        <div className="ss-about-intro">
          <h2 id="ss-bio-heading">About Me.</h2>
          <p className="ss-about-lead">I am a Graphic Designer and Developer.</p>
          <p>Based in the Bay Area, I work across visual communication, front-end development, 3D modeling, and physical fabrication. I work with both the design and technical requirements of a project, including typography, layout, prototyping, and production.</p>
          <p className="ss-about-education">BA in Graphic Design<br />San Jose State University, 2025</p>
        </div>
      </div>
      <section className="ss-about-film" aria-labelledby="ss-film-heading">
        <header className="ss-about-film-heading">
          <h3 id="ss-film-heading"><span>My First</span>{" "}<span>Creative Outlet</span></h3>
        </header>
        <div className="ss-about-film-stage">
          <div className="ss-about-film-meta">
            <time dateTime="2013-10-15">October 15, 2013</time>
          </div>
          <figure className="ss-about-film-player">
            <video
              ref={filmRef}
              controls={filmStarted}
              tabIndex={filmStarted ? 0 : -1}
              playsInline
              preload="none"
              width="1920"
              height="1080"
              poster="/assets/my-first-lego-movie.jpg"
              aria-labelledby="ss-film-heading"
            >
              <source src="/assets/my-first-lego-movie.mp4" type="video/mp4" />
              <a href="/assets/my-first-lego-movie.mp4">Watch My First LEGO Film</a>
            </video>
            {!filmStarted && (
              <button className="ss-about-film-play" type="button" onClick={playFilm} aria-label="Play LEGO stop-motion film">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M8 5v14l11-7z" fill="currentColor" /></svg>
                <span>Play Film</span>
              </button>
            )}
          </figure>
        </div>
        <div className="ss-about-film-note">
            <p>This LEGO stop-motion film was the starting point for the work I do today. It sparked my interest in design and technology and encouraged me to explore other creative disciplines. The interactive LEGO portfolio on this site builds on that foundation, bringing together the skills I’ve developed since.</p>
            {realmSupported ? (
              <a className="ss-about-film-link" href="/lego.html">View My LEGO Portfolio</a>
            ) : (
              <button className="ss-about-film-link" type="button" onClick={onViewOverview}>View My LEGO Portfolio</button>
            )}
        </div>
      </section>
    </section>
  );
}
