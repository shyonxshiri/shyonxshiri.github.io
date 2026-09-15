import "./SelectedWork.css";

type SelectedWorkProps = {
  onOpen: (title: string) => void;
  onAllWork: () => void;
};

const selectedProjects = [
  {
    title: "Everly Care Home",
    mediaTitle: "Everly Care Home",
    role: "Branding & web development",
    description: "Designed the identity and built the website for a senior care community.",
    image: "/assets/Everly_Cover_Image.webp",
    preview: "/assets/Everly_Cover_Image",
    alt: "The Everly Care Home website, with a pale blue identity and a welcoming introduction.",
    width: 2560,
    height: 1382,
    style: "web",
  },
  {
    title: "NABU",
    mediaTitle: "NABU Puffer Front",
    role: "Clothing & creative direction",
    description: "A streetwear brand drawing on my Persian and Assyrian heritage.",
    image: "/assets/NABU_Puffer_Front.jpg",
    alt: "A woven bandana-pattern puffer jacket from the NABU collection.",
    width: 1290,
    height: 2293,
    style: "clothing",
  },
  {
    title: "RGB controller",
    mediaTitle: "RGB Box, Front View",
    role: "Hardware & 3D design",
    description: "Built the controller and its custom 3D-printed enclosure from scratch.",
    image: "/assets/New_LED_Box_Front.jpg",
    alt: "A hand-built RGB controller with a black geometric enclosure, toggle, button and dial.",
    // The JPEG's orientation metadata rotates its stored 2560 × 1920 pixels.
    width: 1920,
    height: 2560,
    style: "hardware",
  },
];

export default function SelectedWork({ onOpen, onAllWork }: SelectedWorkProps) {
  return (
    <section
      className="ss-selected-work"
      aria-labelledby="ss-selected-heading"
      data-slide="selected"
      data-label="Selected work"
    >
      <div className="ss-selected-inner">
        <div className="ss-selected-header">
          <div>
            <h2 id="ss-selected-heading">Selected work.</h2>
          </div>
          <button className="ss-selected-all" type="button" onClick={onAllWork}>
            All work
          </button>
        </div>

        <div className="ss-selected-grid">
          {selectedProjects.map(project => (
            <article className={`ss-selected-item ss-selected-${project.style}`} key={project.title}>
              <button
                className="ss-selected-project"
                type="button"
                onClick={() => onOpen(project.mediaTitle)}
                aria-label={`View ${project.title} project`}
              >
                <span className="ss-selected-media">
                  <img
                    src={project.image}
                    srcSet={project.preview ? `${project.preview}-640.webp 640w, ${project.preview}-1280.webp 1280w` : undefined}
                    sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1024px) 50vw, 40vw"
                    alt={project.alt}
                    width={project.width}
                    height={project.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="ss-selected-view" aria-hidden="true">View project</span>
                </span>
                <span className="ss-selected-title">{project.title}</span>
                <span className="ss-selected-role">{project.role}</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
