import example1Before from "../../../../image/examples/example1Before.jpg";
import example1After from "../../../../image/examples/example1After.jpg";
import example2Before from "../../../../image/examples/example2Before.jpg";
import example2After from "../../../../image/examples/example2After.jpg";
import styles from "./works-examples.module.css";
export const WorksExamples = () => {
  return (
    <div className={styles.works_repair_info_container}>
      <div className={styles.works_example_item}>
        <div className={styles.works_repair_example}>
          <h2 className={styles.visually_hidden}>
            Примеры работ по ремонту ПВХ лодок в городе Томск
          </h2>
          <p>
            Провередны работы по удалению неисправной детали, зачистка
            поверхности, и монтаж новой детали
          </p>
        </div>
        <div className={styles.works_repair_example}>
          <h3 className={styles.works_repair_example_title}>До ремонта</h3>
          <img src={example1Before} alt="Before repair boat" loading="lazy" />
          <p>Повреждение уключины, изношена ось уключины</p>
        </div>
        <div className={styles.works_repair_example}>
          <h3 className={styles.works_repair_example_title}>После ремонта</h3>
          <img src={example1After} alt="After repair boat" loading="lazy" />
          <p>Замена уключины, после ремонта</p>
        </div>
      </div>

      {/* <hr className={styles.works_example_hr}></hr> */}
      <div className={styles.works_example_item}>
        <div className={styles.works_repair_example}>
          <h2 className={styles.visually_hidden}>
            Примеры работ по ремонту ПВХ лодок
          </h2>
          <p>Оторвалась ручка от времени эксплуатации</p>
        </div>
        <div className={styles.works_repair_example}>
          <h3 className={styles.works_repair_example_title}>До ремонта</h3>
          <img src={example2Before} alt="Before repair boat" loading="lazy" />
          <p>Выбор места и подготовка поверхности</p>
        </div>
        <div className={styles.works_repair_example}>
          <h3 className={styles.works_repair_example_title}>После ремонта</h3>
          <img src={example2After} alt="After repair boat" loading="lazy" />
          <p>Произведён монтаж и вклейка ручки для переноса лодки</p>
        </div>
      </div>
    </div>
  );
};
