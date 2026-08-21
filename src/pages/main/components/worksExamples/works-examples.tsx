import { useState } from "react";
import example1Before from "../../../../image/examples/example1Before.webp";
import example1After from "../../../../image/examples/example1After.webp";
import example2Before from "../../../../image/examples/example2Before.webp";
import example2After from "../../../../image/examples/example2After.webp";
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
    title: "Замена уключины на лодке Amaran",
    desc: "Повреждение уключины, изношена ось. Произведена замена неисправной детали, зачистка поверхности и монтаж новой уключины с восстановлением герметичности.",
    price: "от 1 500 руб.",
  },
  {
    id: 2,
    before: example2Before,
    after: example2After,
    title: "Вклейка ручки для переноса лодки",
    desc: "Оторвалась заводская ручка от времени эксплуатации. Выполнен подбор места, подготовка поверхности и монтаж новой усиленной ручки для переноса.",
    price: "от 1 000 руб.",
  },
];

export const WorksExamples = () => {
  const [modalImg, setModalImg] = useState<string | null>(null);

  return (
    <div className={styles.container}>
      {cases.map((c) => (
        <div key={c.id} className={styles.case}>
          <div className={styles.images_row}>
            <div className={styles.image_card}>
              <span className={styles.badge_before}>До</span>
              <img
                src={c.before}
                alt="До ремонта"
                loading="lazy"
                onClick={() => setModalImg(c.before)}
              />
            </div>
            <div className={styles.image_card}>
              <span className={styles.badge_after}>После</span>
              <img
                src={c.after}
                alt="После ремонта"
                loading="lazy"
                onClick={() => setModalImg(c.after)}
              />
            </div>
          </div>
          <div className={styles.info}>
            <h3 className={styles.info_title}>{c.title}</h3>
            <p className={styles.info_desc}>{c.desc}</p>
            <p className={styles.info_price}>{c.price}</p>
          </div>
        </div>
      ))}

      {modalImg && (
        <div className={styles.modal} onClick={() => setModalImg(null)}>
          <img
            src={modalImg}
            alt="Полный размер"
            className={styles.modal_img}
          />
          <button
            className={styles.modal_close}
            onClick={() => setModalImg(null)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
};
