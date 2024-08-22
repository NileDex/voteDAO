import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { LuPresentation } from "react-icons/lu";
const Socials = () => {
  return (
    <div className="socials">
      <a href="https://discord.gg/FJUkxHTd">
        <FaDiscord />
      </a>
      <a href="https://x.com/movementlabsxyz">
        <FaXTwitter />
      </a>
      <a href="https://web.telegram.org/">
        <FaTelegram />
      </a>
      <a href="https://move-pitch.my.canva.site/app-development-pitch-deck-presentation-in-yellow-white-professional-gradients-style">
        <LuPresentation />
      </a>
    </div>
  );
};

export default Socials;
