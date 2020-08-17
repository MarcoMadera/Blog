import styles from "../Portfolio.module.css";

const sre = () => {
  return (
    <main className={styles.container} id="main">
      <h1>Registro de trámites en Excel</h1>
      <p>
        Dashboard funcional en excel programado con visual basic for
        applications para dar seguimiento a los trámites realizados, con la
        obtención automática a través de un script en el navegador, se descarga
        la información y se lleva al registro de excel, evitando la tarea de
        transcribir y evitando los posibles errores llevandolo directamente a el
        almacenamiento de la información.
      </p>
      <img
        className={styles.image}
        loading="lazy"
        src="https://res.cloudinary.com/marcomadera/image/upload/v1595275322/Potfolio/sreExcel/Reporte_Diario_db5g11.png"
        alt="Navegador"
      />
      <img
        className={styles.image}
        loading="lazy"
        src="https://res.cloudinary.com/marcomadera/image/upload/v1595275323/Potfolio/sreExcel/Data_splifz.png"
        alt="Vista Excel"
      />
      <img
        className={styles.image}
        loading="lazy"
        src="https://res.cloudinary.com/marcomadera/image/upload/v1595275323/Potfolio/sreExcel/SRE_Registro_fbjsqg.png"
        alt="Registro"
      />
      <img
        className={styles.image}
        loading="lazy"
        src="https://res.cloudinary.com/marcomadera/image/upload/v1595275321/Potfolio/sreExcel/SRE_Datos_rznxtt.png"
        alt="Datos"
      />
      <img
        className={styles.image}
        loading="lazy"
        src="https://res.cloudinary.com/marcomadera/image/upload/v1595275324/Potfolio/sreExcel/SRE_Gen_Graph_iz4vgw.png"
        alt="Generar Grafica"
      />
      <img
        className={styles.image}
        loading="lazy"
        src="https://res.cloudinary.com/marcomadera/image/upload/v1595275323/Potfolio/sreExcel/SRE_Graph_Generada_gg2do4.png"
        alt="Grafica generada"
      />
      <img
        className={styles.image}
        loading="lazy"
        src="https://res.cloudinary.com/marcomadera/image/upload/v1595275324/Potfolio/sreExcel/SRE_Gen_Reporte_yvv11c.png"
        alt="Generar Reporte"
      />
      <img
        className={styles.image}
        loading="lazy"
        src="https://res.cloudinary.com/marcomadera/image/upload/v1595275324/Potfolio/sreExcel/SRE_Reporte_PDF_yvvswb.png"
        alt="Reporte PDF"
      />
      <img
        className={styles.image}
        loading="lazy"
        src="https://res.cloudinary.com/marcomadera/image/upload/v1595275324/Potfolio/sreExcel/SRE_Reporte_PDF_yvvswb.png"
        alt="VBA Programacion"
      />
    </main>
  );
};

export default sre;
