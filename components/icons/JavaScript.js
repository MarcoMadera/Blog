import { colors } from "../../styles/theme";
import { useContext } from "react";
import { ThemeContext } from "../Layout";

export default function JavaScript(props) {
  const { darkMode } = useContext(ThemeContext);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" {...props}>
      <title>JavaScript</title>
      <path
        fill={colors.accents3}
        d="M36.985 0H7.963C7.155 0 6.5.655 6.5 1.926V55c0 .345.655 1 1.463 1h40.074c.808 0 1.463-.655 1.463-1V12.978c0-.696-.093-.92-.257-1.085L37.607.257A.884.884 0 0036.985 0z"
      ></path>
      <path fill="#d9d7ca" d="M37.5.151V12h11.849z"></path>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M48.037 56H7.963A1.463 1.463 0 016.5 54.537V39h43v15.537c0 .808-.655 1.463-1.463 1.463z"
      ></path>
      <path
        fill={colors.background}
        d="M26.021 42.719v7.848c0 .474-.087.873-.26 1.196a2.151 2.151 0 01-.697.779c-.292.196-.627.333-1.005.41s-.769.116-1.169.116c-.201 0-.436-.021-.704-.062s-.547-.104-.834-.191-.563-.185-.827-.294a3.022 3.022 0 01-.67-.369l.697-1.107c.091.063.221.13.39.198s.353.132.554.191c.2.06.41.111.629.157s.424.068.615.068c.482 0 .868-.094 1.155-.28s.439-.504.458-.95v-7.711h1.668zm8.163 7.519c0 .364-.075.718-.226 1.06s-.362.643-.636.902-.611.467-1.012.622a3.771 3.771 0 01-1.367.232c-.219 0-.444-.012-.677-.034s-.468-.062-.704-.116c-.237-.055-.463-.13-.677-.226s-.399-.212-.554-.349l.287-1.176c.127.073.289.144.485.212s.398.132.608.191c.209.06.419.107.629.144.209.036.405.055.588.055.556 0 .982-.13 1.278-.39s.444-.645.444-1.155c0-.31-.105-.574-.314-.793-.21-.219-.472-.417-.786-.595s-.654-.355-1.019-.533a6.173 6.173 0 01-1.025-.629 3.264 3.264 0 01-.793-.854c-.21-.328-.314-.738-.314-1.23 0-.446.082-.843.246-1.189s.385-.641.663-.882.602-.426.971-.554.759-.191 1.169-.191c.419 0 .843.039 1.271.116.428.077.774.203 1.039.376a13.31 13.31 0 01-.191.39l-.205.396c-.064.123-.119.226-.164.308a1.263 1.263 0 01-.082.137c-.055-.027-.116-.063-.185-.109s-.167-.091-.294-.137a2.107 2.107 0 00-.506-.096 4.781 4.781 0 00-.807.014c-.183.019-.355.07-.52.157s-.311.193-.438.321a1.446 1.446 0 00-.301.431 1.1 1.1 0 00-.109.458c0 .364.104.658.314.882.209.224.469.419.779.588.31.169.646.333 1.012.492.364.159.704.354 1.019.581s.576.513.786.854c.212.342.318.781.318 1.319z"
      ></path>
      <g fill={darkMode ? colors.dark_primary : colors.primary}>
        <path d="M19.5 19v-4c0-.551.448-1 1-1a1 1 0 100-2c-1.654 0-3 1.346-3 3v4c0 1.103-.897 2-2 2a1 1 0 100 2c1.103 0 2 .897 2 2v4c0 1.654 1.346 3 3 3a1 1 0 100-2c-.552 0-1-.449-1-1v-4c0-1.2-.542-2.266-1.382-3a3.975 3.975 0 001.382-3z"></path>
        <circle cx="27.5" cy="18.5" r="1.5"></circle>
        <path d="M39.5 21c-1.103 0-2-.897-2-2v-4c0-1.654-1.346-3-3-3a1 1 0 100 2c.552 0 1 .449 1 1v4c0 1.2.542 2.266 1.382 3a3.975 3.975 0 00-1.382 3v4c0 .551-.448 1-1 1a1 1 0 100 2c1.654 0 3-1.346 3-3v-4c0-1.103.897-2 2-2a1 1 0 100-2zm-12 3a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"></path>
      </g>
    </svg>
  );
}
