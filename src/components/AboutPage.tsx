import { motion, useReducedMotion } from "framer-motion";
import "./AboutPage.css";

export default function AboutPage() {
  const reduced = useReducedMotion();
  return (
    <motion.section className="ss-about-view" aria-labelledby="ss-bio-heading"
      initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .3 }}>
      <div className="ss-about-hero">
        <figure className="ss-about-photo">
          <img src="/assets/Shyon_Studio_1800.jpg" srcSet="/assets/Shyon_Studio_1000.jpg 662w, /assets/Shyon_Studio_1800.jpg 1192w" sizes="(max-width: 640px) 100vw, 50vw" width="1192" height="1800" alt="Shyon Shiri seated in a black jacket against a studio backdrop" decoding="async" />
        </figure>
        <div className="ss-about-intro">
          <h2 id="ss-bio-heading">About me.</h2>
          <p className="ss-about-lead">I’m a graphic designer and developer based in the Bay Area.</p>
          <p>My experience includes visual communication, front-end development, 3D modeling, and physical fabrication. I work with both the design and technical requirements of a project, including typography, layout, prototyping, and production.</p>
          <p className="ss-about-education">BA in Graphic Design<br />San Jose State University, 2025</p>
        </div>
      </div>
    </motion.section>
  );
}
