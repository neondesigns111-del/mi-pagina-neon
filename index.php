<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@1/css/pico.min.css">
    <title>Contador de Visitas</title>
    <style>
        body,
        html {
            height: 100%;
            margin: 0;
        }

        body {
            display: flex;
            flex-direction: column;
        }

        main {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-top: 5rem;
            /* Ajusta este valor según necesites */
        }

        .contador {
            font-size: 2rem;
            text-align: center;
            /* Centra el contador horizontalmente */
            margin: 20px;
        }

        nav,
        footer {
            text-align: center;
            margin: 1rem 0;
        }
    </style>
</head>

<body>
    <nav class="container-fluid">
        <ul>
            <li><strong>Contador de Visitas PHP</strong></li>
        </ul>
        <ul>
            <li><a href="https://www.configuroweb.com/" role="button">Para más desarrollos ConfiguroWeb</a></li>
        </ul>
    </nav>
    <main class="container">
        <div class="grid">
            <section>
                <hgroup>
                    <h2>Bienvenido a Nuestra Página</h2>
                    <h3>Contador de Visitas</h3>
                </hgroup>
                <p class="contador">
                    <?php
                    // Ruta al archivo que almacena el contador
                    $archivoContador = "contador.txt";

                    // Comprobar si el archivo existe y es legible
                    if (is_readable($archivoContador)) {
                        // Leer el valor actual del contador
                        $contador = file_get_contents($archivoContador);

                        // Incrementar el contador
                        $contador++;

                        // Abrir el archivo para escritura
                        $fp = fopen($archivoContador, "w");

                        // Escribir el nuevo valor del contador en el archivo
                        fwrite($fp, $contador);

                        // Cerrar el archivo
                        fclose($fp);

                        // Mostrar el contador de visitas
                        echo "Número de visitas: " . $contador;
                    } else {
                        echo "El archivo de contador no existe o no se puede leer.";
                    }

                    ?>
                </p>
                <figure>
                    <img src="https://source.unsplash.com/random/400x300" alt="Imagen aleatoria" />
                    <figcaption><a href="https://unsplash.com" target="_blank">Imagen de Unsplash</a></figcaption>
                </figure>
                <h3>¡Gracias por tu visita!</h3>
                <p>Esperamos que disfrutes tu estadía en nuestra página.</p>
            </section>
        </div>
    </main>
    <footer class="container">
        <small><a href="#">Política de privacidad</a> • <a href="#">Términos de uso</a></small>
    </footer>
</body>

</html>