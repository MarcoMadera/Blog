import Link from "next/link";
import { useRouter } from "next/router";
import { colors } from "../styles/theme";
const Navbar = () => {
  const router = useRouter();
  return (
    <header>
      <Link href="/">
        <a className="logo" aria-label="Ir a la página principal">
          <picture>
            <source
              srcSet="/apple-touch-icon-120x120.png"
              media="(max-width: 876px)"
            />
            <img
              src="/favicon-48x48.png"
              alt="Logo patrón de desbloqueo de en forma de M"
              width="40"
              height="40"
            />
          </picture>
          <span>Marco Madera</span>
        </a>
      </Link>
      <nav>
        <Link href="/portfolio">
          <a
            style={{
              textDecoration:
                router.route === "/portfolio" ? "underline" : undefined,
            }}
          >
            Portafolio
          </a>
        </Link>
        <Link href="/about">
          <a
            style={{
              textDecoration:
                router.route === "/about" ? "underline" : undefined,
            }}
          >
            Sobre mí
          </a>
        </Link>
      </nav>
      <style global jsx>{`
        .logo {
          display: flex;
          align-items: center;
          user-select: none;
        }
        .logo:hover img,
        .logo:focus img {
          animation: jello-vertical 0.9s both;
        }
        @keyframes jello-vertical {
          0% {
            transform: scale(1, 1);
          }
          30% {
            transform: scale(0.75, 1.25);
          }
          40% {
            transform: scale(1.25, 0.75);
          }
          50% {
            transform: scale(0.85, 1.15);
          }
          65% {
            transform: scale(1.05, 0.95);
          }
          75% {
            transform: scale(0.95, 1.05);
          }
          100% {
            transform: scale(1, 1);
          }
        }
      `}</style>
      <style jsx>{`
        picture {
          display: inline-flex;
        }
        span {
          font-size: 1.17em;
          font-weight: 400;
          margin: 0;
        }
        header {
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          max-width: 1300px;
          flex-wrap: wrap;
        }
        img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }
        nav a {
          display: inline-block;
          margin: 9px 5px;
        }
        nav a:hover,
        nav a:focus {
          color: ${colors.secondary};
          animation: text-pop-up-top 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            both;
        }

        @keyframes text-pop-up-top {
          0% {
            transform: translateY(0);
            transform-origin: 50% 50%;
            text-shadow: none;
          }
          100% {
            transform: translateY(-2px);
            transform-origin: 50% 50%;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
