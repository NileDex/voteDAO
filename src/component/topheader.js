import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";

const Socials = () => {
    return ( 
        <div className="socials">
            <a href="https://discord.gg/FJUkxHTd"><FaDiscord /></a>
            <a href="https://x.com/movementlabsxyz"><FaXTwitter /></a>
            <a href="https://web.telegram.org/"><FaTelegram /></a>
        </div>
     );
};
 
export default Socials;