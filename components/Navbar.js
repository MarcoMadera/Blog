import Link from "next/link";
import { useRouter } from "next/router";
const Navbar = () => {
  const router = useRouter();
  return (
    <nav>
      <Link href="/">
        <a className="logo">
          <img
            src="/apple-touch-icon-120x120.png"
            alt="logo"
            width="40"
            height="40"
          />
          <h3>Marco Madera</h3>
        </a>
      </Link>
      <section>
        <Link href="/portfolio">
          <a
            style={{
              textDecoration: router.route === "/portfolio" && "underline",
            }}
          >
            Portafolio
          </a>
        </Link>
        <Link href="/about">
          <a
            style={{ textDecoration: router.route === "/about" && "underline" }}
          >
            Sobre mí
          </a>
        </Link>
      </section>
      <style global jsx>{`
        .logo {
          display: flex;
          align-items: center;
          transition: ease 300ms;
          user-select: none;
        }
        .logo:hover img {
          animation: jello-vertical 0.9s both;
        }
        @keyframes jello-vertical {
          0% {
            transform: scale3d(1, 1, 1);
          }
          30% {
            transform: scale3d(0.75, 1.25, 1);
          }
          40% {
            transform: scale3d(1.25, 0.75, 1);
          }
          50% {
            transform: scale3d(0.85, 1.15, 1);
          }
          65% {
            transform: scale3d(1.05, 0.95, 1);
          }
          75% {
            transform: scale3d(0.95, 1.05, 1);
          }
          100% {
            transform: scale3d(1, 1, 1);
          }
        }
      `}</style>
      <style jsx>{`
        nav {
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 80px;
          padding: 0 20px;
          max-width: 1300px;
          flex-wrap: wrap;
        }
        h3 {
          font-weight: 400;
        }

        img {
          width: 40px;
          height: 40px;
          margin-right: 10px;
        }

        nav section a {
          display: inline-block;
          margin: 13.5px 5px;
        }
        nav section a:hover {
          color: #e74c3c;
          animation: text-pop-up-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
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
    </nav>
  );
};

export default Navbar;
