import styles from "./social_links.module.css";

export const SocialLinks = () => {
  return (
    <div className={styles.links}>
      <a href="mailto:shulgin.alexandera@gmail.com" target="blank">
        <img
          src="https://cdn-icons-png.flaticon.com/128/5968/5968534.png"
          alt="Email"
        />
        <span></span>
      </a>
      <a href="https://github.com/Holyhelper1" target="blank">
        <img
          // src="https://png.klev.club/uploads/posts/2024-04/png-klev-club-qjp7-p-ikonka-avito-png-5.png"
          src="https://tehnosfera.com/wp-content/uploads/2022/07/avito_tehnosfera-300x300.png"
          alt="Avito"
        />
        <span></span>
      </a>
      <a href="https://vk.com/alexdude" target="blank">
        <img
          src="https://cdn-icons-png.flaticon.com/512/145/145813.png"
          alt="VK"
        />
        <span></span>
      </a>

      <a href="https://t.me/AlexanderShulg" target="blank">
        <img
          src="https://cdn-icons-png.flaticon.com/128/2111/2111646.png"
          alt="Telegram"
        />
        <span></span>
      </a>
    </div>
  );
};
