import AllTags from "components/AllTags";
import Aside from "components/Aside";
import BlogCard from "./BlogCard";
import { colors } from "styles/theme";
import Custom404 from "pages/404";
import Link from "next/link";
import Newsletter from "components/Newsletter";
import PropTypes from "prop-types";
import Seo from "components/Seo";
import useDarkMode from "hooks/useDarkMode";
import styles from "./Home.module.css";
import { siteMetadata } from "site.config";
import slugify from "react-slugify";

export default function HomeLayout({
  posts = [],
  tags = [],
  pages = [],
  currentPage,
  title,
  tag,
}) {
  const { darkMode } = useDarkMode();
  return (
    <main id="main" className={styles.main}>
      <Seo
        title={title}
        canonical={currentPage !== 1 ? siteMetadata.siteUrl : undefined}
      />
      <Aside />
      <section>
        <h1 className={styles.h1}>
          {tag
            ? `Etiqueta ${posts[0].tags.find((item) =>
                slugify(item).includes(tag)
              )}`
            : "Últimos artículos"}
        </h1>
        {posts.map((data) => (
          <BlogCard {...data} key={data.slug} />
        ))}
        {posts.length <= 0 && <Custom404 />}
        <nav className={styles.nav} aria-label="Paginación">
          <ol className={styles.ol}>
            {pages.map((pageNumber, i) => {
              const isCurrentPage = pageNumber === currentPage;
              return (
                <li className={styles.li} key={pageNumber}>
                  <Link href={i === 0 ? "/" : `/pagina/${pageNumber}`}>
                    <a
                      className={`${
                        isCurrentPage
                          ? `${styles.currentPage} currentPage`
                          : `${styles.pagination} pagination`
                      } ${styles.a}`}
                      aria-label={
                        isCurrentPage
                          ? "Página actual"
                          : `Ir a página ${pageNumber}`
                      }
                      aria-current={isCurrentPage ? "true" : undefined}
                    >
                      {pageNumber}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </section>
      <aside>
        <AllTags tags={tags} />
        <Newsletter />
      </aside>
      <style jsx>{`
        a {
          color: ${darkMode ? colors.dark_primary : colors.primary};
        }
        nav :global(.pagination:hover) {
          color: ${darkMode
            ? colors.dark_secondary
            : colors.secondary} !important;
        }
        nav :global(.currentPage) {
          background-color: ${darkMode
            ? colors.dark_primary
            : colors.primary} !important;
          color: ${colors.background} !important;
        }
      `}</style>
    </main>
  );
}

HomeLayout.propTypes = {
  posts: PropTypes.array,
  tags: PropTypes.array,
  pages: PropTypes.array,
  page: PropTypes.number,
  currentPage: PropTypes.number,
  title: PropTypes.string,
  tag: PropTypes.string,
};
