import styles from "./main.module.css";
import mainPicture3 from "../../image/mainPicture3.png";
import { WorksExamples } from "./components";
import { Button } from "../../components";
import { Link } from "react-router-dom";
export const Main = () => {
  return (
    <div className={styles.main_container}>
      <Link to="/order">
      
      <Button>Оставить заявку</Button>
      </Link>
      <div className={styles.main_picture_box}>
        <img src={mainPicture3} alt="main boat" />
      </div>

      <div className={styles.main_info_box}>
        {/* <div className={styles.main_pre_info}>
          <div className={styles.main_pre_info_title}>
            <h1>Информация о ремонте</h1>
          </div>
          <p>
            Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Hac
            habitasse platea dictumst quisque sagittis purus sit amet. Eu
            lobortis elementum nibh tellus molestie nunc non. Tincidunt praesent
            semper feugiat nibh. Eget nulla facilisi etiam dignissim diam quis.
          </p>
        </div> */}
        <WorksExamples/>
       
      </div>
    </div>
  );
};
