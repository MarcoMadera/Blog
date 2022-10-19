---
title: "Variables y constantes en Rust"
description: En Rust se pueden definir variables y constantes, pero tienen sus similitudes y diferencias.
date: 2022-01-06
cover: https://res.cloudinary.com/marcomadera/image/upload/v1641442436/Blog/rust/zdenek-machacek-PEy4qZCLXss-unsplash_ataycj.jpg
coverAlt: Cadena oxidada.
author: Marco Madera
tags:
  - Rust
---

Esta semana he estado aprendiendo rust, no sobre cómo se va formando la capa amarillenta de oxido en el hierro ni el videojuego, sino el lenguaje de programación compilado que está enfocado en la velocidad y la seguridad[^1].

Rust es un lenguaje compilado, por lo que se puede compilar a un código binario similar a lenguajes como C, C++, y Java, que se diferencian de lenguajes como python y javascript porque estos se ejecutan en tiempo de ejecución.

[^1]: Steve Klabnik & Carol Nichols, with contributions from the Rust Community (2018). The Rust Programming Language. [online] Available at: [doc.rust-lang.org](https://doc.rust-lang.org/book/)

## Variables y su mutabilidad

Todas las variables en Rust son inmutables por defecto.

Esta es una de las formas en la que Rust mantiene un estilo de código para proporcionar seguridad.

Cuando una variable es inmutable, lo que significa que una vez que un valor está vinculado a un nombre, no puede cambiar ese valor.

¿Qué pasa si se declara una variable bajo el supuesto de que su valor nunca cambiará y en un futuro otro en otro bloque de código cambia ese valor?

Es posible que la primera parte del código falle y no haga lo que fue diseñado para hacer. Luego otra persona del equipo puede tener dificultades para saber dónde y cómo ha cambiado ese valor. Esto es lo que intenta evitar Rust.

Probemos esto en el siguiente ejemplo:

```rust
fn main() {
    let birthdate = "1/1/2000";
    println!("The birthdate is: {}", birthdate);
    birthdate = "1/1/2022";
    println!("The new birthdate is: {}", birthdate);
}
```

<colors green lightblue red textcolor blue orange></colors>

<pre><code data-lang="CLI"><span><span class="blue">cargo</span> run</span>
<span><span class="green">Compiling</span> main v0.1.0 (C:\Users\marco\repositorios\rust\main)</span>
<span><span class="red">error[E0384]</span>: cannot assign twice to immutable variable `birthdate`</span>
<span><span class="lightblue"> --></span> src\main.rs:4:5</span>
<span class="lightblue">  |</span>
<span><span class="lightblue">2 |</span>     let birthdate = "1/1/2000";</span>
<span class="lightblue">  |         ---------</span>
<span class="lightblue">  |         |</span>
<span class="lightblue">  |         first assignment to `birthdate`</span>
<span class="lightblue">  |         help: consider making this binding mutable: `mut birthdate`</span>
<span><span class="lightblue">3 |     </span>println!("The birthdate is: {}", birthdate);</span>
<span><span class="lightblue">4 |     </span>birthdate = "1/1/2022";</span>
<span><span class="lightblue">  |     </span><span class="red">^^^^^^^^^^^^^^^^^^^^^^ cannot assign twice to immutable variable</span></span>
<span></span>
<span class="textcolor">For more information about this error, try `rustc --explain E0384`.</span>
<span><span class="red">error</span>: could not compile `main` due to previous error</span>
</code></pre>

En Rust, el compilador garantiza que cuando declaramos que un valor no cambiará, realmente no cambiará, pero podemos hacer shadowing para que una variable pueda cambiar declarandola de nuevo con `let`.

```rust
fn main() {
    let year = 2021;
    println!("The year is: {}", year);
    let year = 2022;
    println!("The new year is: {}", year);
}
```

<pre><code data-lang="CLI"><span class="blue">cargo</span> run
<span class="green">Compiling</span> main v0.1.0 (C:\Users\marco\repositorios\rust\main)
<span class="green"> Finished</span> dev [unoptimized + debuginfo] target(s) in 1.54s
<span class="green">  Running</span> `target\debug\main.exe`
<span>The year is: 2021</span>
<span>The new year is: 2022</span>
</code></pre>

Esto puede que no sea conveniente, por lo que la mutabilidad también puede resultar muy útil en muchos casos.

## ¿Cómo se hace una variable mutable en Rust?

Usando mut, puede cambiar el valor. En algunos casos, una variable mutable es más conveniente que una implementación que solo usa variables inmutables.

```rust
fn main() {
    let mut birthdate = "1/1/2000";
    println!("The birthdate is: {}", birthdate);
    birthdate = "1/1/2022";
    println!("The new birthdate is: {}", birthdate);
}
```

<note>Muy además de permitir que el valor cambie, expresa a los futuros lectores del código al simbolizar que otras partes del código modifican el valor de esta variable.</note>

## Variables inmutables vs constantes

Si bien se puede pensar que son iguales, pero no lo son!

Las constantes, como las variables inmutables, son valores que están vinculados a un nombre y no se pueden cambiar. Entonces, ¿cuáles son las diferencias?

- Las constantes no solo son inmutables por defecto; también son inmutables en todo momento.
- Las constantes usan la palabra clave `const` en lugar de la palabra clave `let`, y se debe anotar el tipo de valor.
- Las constantes se pueden declarar en cualquier scope, incluyendo el scope global. Este alcance los hace útiles para valores que tienen que estar presentar en varias partes del código.
- Las constantes solo se pueden usar junto con una expresión constante; no pueden ser el resultado de una llamada de función, una instancia o cualquier otro valor que solo se pueda calcular en tiempo de ejecución.

<note type="danger" title="Advertencia">

Al declarar una variable con `let` y usar el nombre de una variable en mayusculas, el compilador generará una advertencia.

```rust {"addedLines": [], "removedLines": [], "highlight": [2]}
fn main() {
    let PI = 3.14159265359;
    println!("{}", PI);
}
```

<pre><code data-lang="CLI" ><span class="blue">cargo</span> run
<span class="orange">warning:</span> variable `PI` should have a snake case name
<span class="lightblue"> --></span> src\main.rs:2:4
<span class="lightblue">  |</span>
<span class="lightblue">2 |</span>     let PI = 3.14159265359;
<span class="lightblue">  |         </span><span class="orange">^^ help: convert the identifier to snake case: `pi`</span>
<span class="lightblue">  |</span>
<span><span class="lightblue">  =</span><span class="textcolor"> note</span>: `#[warn(non_snake_case)]` on by default</span>
<span></span>
<span><span class="orange">warning:</span> `main` (bin "main") generated 1 warning</span>
    <span class="green">Finished</span> dev [unoptimized + debuginfo] target(s) in 0.17s
     <span class="green">Running</span> `target\debug\main.exe`
3.14159265359
</code></pre>

<captione text="Al ser solo una advertencia el programa se ejecutará sin problemas"></captione>

<note type="success" title="Correcto">

La forma de nombrar las variables tiene que ser en snake case. Por ejemplo, `PI` no es correcto, pero `pi` es correcto.

```rust {"addedLines": [], "removedLines": [], "highlight": [2]}
fn main() {
    let pi = 3.14159265359;
    println!("{}", pi);
}
```

</note>

</note>

<note type="danger" title="Error">

Las constantes tienen que llevar el tipo de valor. Si no se pone, el compilador generará un error.

```rust
fn main() {
    const PI = 3.14159265359;
    println!("{}", PI);
}
```

<pre><code data-lang="CLI"><span><span class="blue">cargo</span> run</span>
<span><span class="green">Compiling</span> main v0.1.0 (C:\Users\marco\repositorios\rust\main)</span>
<span class="textcolor"><span class="red">error</span>: missing type for `const` item</span>
<span class="textcolor"><span class="lightblue"> --></span> src\main.rs:2:11</span>
<span class="lightblue">  |</span>
<span class="lightblue">2 |</span>     const PI = 3.14159265359;
<span><span class="lightblue">  |           </span><span class="red">^^ help: provide a type for the constant: `PI: f64`</span></span>
<span></span>
<span class="textcolor"><span class="red">error</span>: could not compile `main` due to previous error</span>
</code></pre>

<note type="success" title="Correcto">

```rust
fn main() {
    const PI: f64 = 3.14159265359;
    println!("{}", PI);
}
```

</note>

</note>

## ¿Por qué usar constantes?

Al reflexionar sobre el uso de constantes y variables inmutables, me pregunté: ¿Por qué no usar siempre variables inmutables? así no me obligaría siempre a escribir el tipo de valor.

La siguiente es una constate válida:

```rust
const E: f32 = 2.71828182846;
```

La siguiente es una variable inmutable válida:

```rust
let e = 2.71828182846;
```

Por lo que algunas de las razones por las que preferiría usar constantes son:

- No se puede hacer shadowing de una constante volviéndola a declarar.
- Algunas veces, una variable inmutable puede ser muy útil, pero no es necesario. En ese caso, puede usarse una constante.
- Las constantes son válidas durante todo el tiempo que se ejecuta un programa, dentro del scope en el que se declararon y en el scope global, lo que quiere decir las puedes poner fuera del `main`, y se podrían en cualquier parte del programa. De esta forma podemos tener las constantes en un solo lugar y actualizarlas en un futuro fácilmente.
