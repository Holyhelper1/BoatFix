import styles from "./main.module.css";
import { WorksExamples } from "./components";
import { Button } from "../../components";
import { Link } from "react-router-dom";
export const Main = () => {
  return (
    <div className={styles.main_container} id="examples">
      <Link to="/order">      
      <Button>Оставить заявку</Button>
      </Link>
      <div className={styles.main_info_box}>
        <WorksExamples/>       
      </div>
    </div>
  );
};
