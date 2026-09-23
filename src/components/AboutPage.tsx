import { useEffect, useRef } from "react";
import "./AboutPage.css";

export default function AboutPage({ realmSupported, onViewOverview }: {
  realmSupported: boolean;
  onViewOverview: () => void;
}) {
  const filmRef = useRef<HTMLVideoElement>(null);

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
          <h2 id="ss-bio-heading">About me.</h2>
          <p className="ss-about-lead">I’m a graphic designer and developer based in the Bay Area.</p>
          <p>My experience includes visual communication, front-end development, 3D modeling, and physical fabrication. I work with both the design and technical requirements of a project, including typography, layout, prototyping, and production.</p>
          <p className="ss-about-education">BA in Graphic Design<br />San Jose State University, 2025</p>
        </div>
      </div>
      <section className="ss-about-film" aria-labelledby="ss-film-heading">
        <div className="ss-about-film-note">
          <h3 id="ss-film-heading">LEGO stop motion</h3>
          <time className="ss-about-film-date" dateTime="2013-10-15">October 15, 2013</time>
          <p>This LEGO stop-motion film was the starting point for the work I do today. It sparked my interest in design and technology and encouraged me to explore other creative disciplines. The interactive LEGO portfolio on this site builds on that foundation, bringing together the skills I’ve developed since.</p>
        </div>
        <figure className="ss-about-film-player">
          <video
            ref={filmRef}
            controls
            playsInline
            preload="none"
            width="1920"
            height="1080"
            poster="/assets/my-first-lego-movie.jpg"
            aria-labelledby="ss-film-heading"
          >
            <source src="/assets/my-first-lego-movie.mp4" type="video/mp4" />
            <a href="/assets/my-first-lego-movie.mp4">Watch LEGO stop motion</a>
          </video>
          <details className="ss-about-film-description">
            <summary>Film description</summary>
            <p>LEGO figures move and tumble across a grey baseplate in a series of stop-motion scenes. A handwritten “Part 2” card introduces a second sequence of figures facing off and falling over. The film has no sound.</p>
          </details>
          {realmSupported ? (
            <a className="ss-about-film-link" href="/lego.html">View My LEGO Portfolio</a>
          ) : (
            <button className="ss-about-film-link" type="button" onClick={onViewOverview}>View My LEGO Portfolio</button>
          )}
        </figure>
      </section>
    </section>
  );
}
