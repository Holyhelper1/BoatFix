import styles from "./works-examples.module.css";
export const WorksExamples = () => {
  return (
    <div className={styles.works_repair_info_container}>
      <div className={styles.works_example_item}>
        <div className={styles.works_repair_example}>
          <h2 className={styles.visually_hidden}>Примеры работ по ремонту ПВХ лодок</h2>
          <p>
            Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Hac
            habitasse platea dictumst quisque sagittis purus sit amet. Eu
            lobortis elementum nibh tellus molestie nunc non. Tincidunt praesent
            semper feugiat nibh. Eget nulla facilisi etiam dignissim diam quis.
            Eu lobortis elementum nibh tellus molestie nunc non. Tincidunt
            praesent semper feugiat nibh. Eget nulla facilisi etiam dignissim
            diam quis.
          </p>
        </div>
        <div className={styles.works_repair_example}>
          <h3 className={styles.works_repair_example_title}>До ремонта</h3>
          <img
            src="https://www.montereyboats.com/zupload/library/811/-2400-960x4000-0.jpg?ztv=20160316164927"
            alt="Before repair boat" width={300} height={"auto"} loading="lazy"
          />
          <p>
            Congue eu consequat ac felis donec et odio. Eget felis eget nunc
            lobortis mattis aliquam faucibus purus in. Arcu dui vivamus arcu
            felis bibendum ut tristique. Aliquam etiam erat velit scelerisque.
            Adipiscing elit pellentesque habitant morbi. Eu volutpat odio
            facilisis mauris sit amet massa.
          </p>
        </div>
        <div className={styles.works_repair_example}>
          <h3 className={styles.works_repair_example_title}>После ремонта</h3>
          <img
            src="https://www.boatsetter.com/images/homepage/hero.jpg"
            alt="After repair boat" width={300} height={"auto"} loading="lazy"
          />
          <p>
            Congue eu consequat ac felis donec et odio. Eget felis eget nunc
            lobortis mattis aliquam faucibus purus in. Arcu dui vivamus arcu
            felis bibendum ut tristique. Aliquam etiam erat velit scelerisque.
            Adipiscing elit pellentesque habitant morbi. Eu volutpat odio
            facilisis mauris sit amet massa.
          </p>
        </div>
      </div>

      <hr className={styles.works_example_hr}></hr>
      <div className={styles.works_example_item}>
        <div className={styles.works_repair_example}>
          <h2 className={styles.visually_hidden}>Примеры работ по ремонту ПВХ лодок</h2>
          <p>
            Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Hac
            habitasse platea dictumst quisque sagittis purus sit amet. Eu
            lobortis elementum nibh tellus molestie nunc non. Tincidunt praesent
            semper feugiat nibh. Eget nulla facilisi etiam dignissim diam quis.
            Eu lobortis elementum nibh tellus molestie nunc non. Tincidunt
            praesent semper feugiat nibh. Eget nulla facilisi etiam dignissim
            diam quis.
          </p>
        </div>
        <div className={styles.works_repair_example}>
          <h3 className={styles.works_repair_example_title}>До ремонта</h3>
          <img
            src="https://avatars.dzeninfra.ru/get-zen_doc/901899/pub_5de77702a3f6e4e9ce9aaf37_5de77aa406cc4600ad7c8c4f/scale_1200"
            alt="Before repair boat" width={300} height={"auto"} loading="lazy"
          />
          <p>
            Congue eu consequat ac felis donec et odio. Eget felis eget nunc
            lobortis mattis aliquam faucibus purus in. Arcu dui vivamus arcu
            felis bibendum ut tristique. Aliquam etiam erat velit scelerisque.
            Adipiscing elit pellentesque habitant morbi. Eu volutpat odio
            facilisis mauris sit amet massa.
          </p>
        </div>
        <div className={styles.works_repair_example}>
          <h3 className={styles.works_repair_example_title}>После ремонта</h3>
          <img
            src="https://kraiv.ru/upload/medialibrary/fa6/n7uaehai3zyil87xdra5k0ppjbm4769g/Lodka-dlya-morya.jpg"
            alt="After repair boat" width={300} height={"auto"} loading="lazy"
          />
          <p>
            Congue eu consequat ac felis donec et odio. Eget felis eget nunc
            lobortis mattis aliquam faucibus purus in. Arcu dui vivamus arcu
            felis bibendum ut tristique. Aliquam etiam erat velit scelerisque.
            Adipiscing elit pellentesque habitant morbi. Eu volutpat odio
            facilisis mauris sit amet massa.
          </p>
        </div>
      </div>
    </div>
  );
};
