import { colors } from "styles/theme";
import { ReactElement } from "react";
import useDarkMode from "hooks/useDarkMode";
import NewsletterForm from "components/Newsletter/NewsletterForm";

export default function NewsletterCard(): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <NewsletterForm>
      <label htmlFor="newsletterForm-email">¡Suscríbete al Newsletter!</label>
      <p>Recibirás actualizaciones del blog con temas de programación</p>
      <style jsx>{`
        :global(form.bd-email) {
          border: 3px solid
            ${darkMode ? colors.deepCarminPink : colors.guardsmanRed};
          background: ${darkMode ? colors.cinder : colors.romance};
        }
        :global(form.bd-email label) {
          color: ${darkMode ? colors.greyGoose : colors.balticSeaDark};
        }
      `}</style>
      <style jsx>{`
        :global(form.bd-email) {
          border-radius: 4px;
          height: fit-content;
          margin-bottom: 50px;
          margin-top: 40px;
          padding: 20px;
          position: sticky;
          text-align: center;
          top: 10px;
          width: 100%;
        }
        label {
          font-size: 1.8rem;
          font-weight: 600;
          margin: 30px 0;
        }
        p {
          font-size: 1.1rem;
          text-align: center;
          margin: 1em 0;
        }
        :global(form.bd-email input) {
          margin-top: 1rem;
          margin-bottom: 30px;
          outline: unset;
          padding: 1rem 1.5rem;
          width: 100%;
        }
        :global(form.bd-email button) {
          width: 100%;
        }
        @media print {
          :global(form.bd-email) {
            display: none;
          }
        }
      `}</style>
    </NewsletterForm>
  );
}
