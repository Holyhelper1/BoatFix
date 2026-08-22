import { useState } from "react";
import example1Before from "../../../../image/examples/example1Before.webp";
import example1After from "../../../../image/examples/example1After.webp";
import example2Before from "../../../../image/examples/example2Before.webp";
import example2After from "../../../../image/examples/example2After.webp";
import { SectionTitle } from "../section-title/section-title";
import styles from "./works-examples.module.css";

interface CaseItem {
  id: number;
  before: string;
  after: string;
  title: string;
  desc: string;
  price: string;
}

const cases: CaseItem[] = [
  {
    id: 1,
    before: example1Before,
    after: example1After,
    title: "Замена уключины",
    desc: "Замена уключины с усилением борта. Надёжная фиксация и долгий срок службы.",
    price: "от 1500 руб.",
  },
  {
    id: 2,
    before: example2Before,
    after: example2After,
    title: "Переклейка ручки",
    desc: "Переклейка оторванной ручки с применением профессионального клея и привайнера.",
    price: "от 1200 руб.",
  },
  // {
  //   id: 3,
  //   before: example1Before,
  //   after: example1After,
  //   title: "Ремонт баллона (порез)",
  //   desc: "Профессиональная сварка порезов и проколов любой сложности. 100% герметичность.",
  //   price: "от 2000 руб.",
  // },
  // {
  //   id: 4,
  //   before: example2Before,
  //   after: example2After,
  //   title: "Установка леера",
  //   desc: "Установка леера с усилением креплений и герметизацией отверствий.",
  //   price: "от 1800 руб.",
  // },
];

export const WorksExamples = () => {
  const [modalImg, setModalImg] = useState<string | null>(null);

  return (
    <section className={styles.section} aria-labelledby="examples-title">
      <div className="container">
        <SectionTitle
          id="examples"
          title="До / После ремонта"
          subtitle="Реальные примеры наших работ"
        />

        <div className={styles.grid}>
          {cases.map((c) => (
            <article key={c.id} className={styles.case}>
              <h3 className={styles.case_title}>{c.title}</h3>
              <div className={styles.images_row}>
                <figure className={styles.image_card}>
                  <span className={styles.badge_before}>До</span>
                  <img
                    src={c.before}
                    alt={`${c.title} — до ремонта`}
                    loading="lazy"
                    onClick={() => setModalImg(c.before)}
                  />
                </figure>
                <figure className={styles.image_card}>
                  <span className={styles.badge_after}>После</span>
                  <img
                    src={c.after}
                    alt={`${c.title} — после ремонта`}
                    loading="lazy"
                    onClick={() => setModalImg(c.after)}
                  />
                </figure>
              </div>
              <div className={styles.case_footer}>
                <p className={styles.case_desc}>{c.desc}</p>
                <p className={styles.case_price}>{c.price}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {modalImg && (
        <div
          className={styles.modal}
          onClick={() => setModalImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фотографии"
        >
          <img
            src={modalImg}
            alt="Полный размер"
            className={styles.modal_img}
          />
          <button
            type="button"
            className={styles.modal_close}
            onClick={() => setModalImg(null)}
            aria-label="Закрыть просмотр"
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
};
