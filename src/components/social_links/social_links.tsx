import styles from "./social_links.module.css";

export const SocialLinks = () => {
  return (
    <div className={styles.links}>
      <a href="mailto:amirgf30@gmail.com" target="blank">
        <img
          src="https://cdn-icons-png.flaticon.com/128/5968/5968534.png"
          alt="Email"
        />
        <span></span>
      </a>
      <a href="https://vk.com/id22015585" target="blank">
        <img
          src="https://cdn-icons-png.flaticon.com/512/145/145813.png"
          alt="VK"
        />
        <span></span>
      </a>

      <a href="https://t.me/Amirgf30" target="blank">
        <img
          src="https://cdn-icons-png.flaticon.com/128/2111/2111646.png"
          alt="Telegram"
        />
        <span></span>
      </a>
    </div>
  );
};
