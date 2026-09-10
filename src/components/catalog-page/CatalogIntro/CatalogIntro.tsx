import styles from "./CatalogIntro.module.css";

type CatalogIntroProps = {
  heading?: string;
  paragraphs: string[];
  sections?: { heading: string; paragraphs: string[] }[];
};

const CatalogIntro = ({ heading, paragraphs, sections }: CatalogIntroProps) => {
  if (!heading && !paragraphs.length && !sections?.length) {
    return null;
  }

  return (
    <section className={styles.intro}>
      {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
      {paragraphs.map((text) => (
        <p key={text.slice(0, 48)}>{text}</p>
      ))}
      {sections?.map((section) => (
        <div key={section.heading} className={styles.section}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((text) => (
            <p key={text.slice(0, 48)}>{text}</p>
          ))}
        </div>
      ))}
    </section>
  );
};

export default CatalogIntro;
