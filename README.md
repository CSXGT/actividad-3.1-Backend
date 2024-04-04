# actividad-3.1-Backend
Actividad "Sistema de Gestión de la Universidad Valle del Momboy" de Backend. Unidad III. Cristhofer Solarte 30.959.561, Verónica Parra 30.600.365

Pasos para el despliegue de la actividad en Visual Studio Code:

Clonar el Repositorio:
Abre Visual Studio Code.
Ve al menú "View" y selecciona "Command Palette" o presiona Ctrl + Shift + P.
Escribe "Git: Clone" y selecciona la opción.
Ingresa la URL del repositorio: https://github.com/CSXGT/actividad-3.1-Backend.git
Selecciona una carpeta local para clonar el proyecto.
Espera a que se complete la clonación.

Abrir el Proyecto en Visual Studio Code:
En Visual Studio Code, ve al menú "File" y selecciona "Open Folder".
Selecciona la carpeta donde clonaste el repositorio y haz clic en "Abrir".

Instalar Dependencias:
Abre la terminal en Visual Studio Code. Ve al menú "Terminal" y selecciona "New Terminal" o presiona Ctrl + Shift + ñ.

Ejecuta el siguiente comando para instalar las dependencias del proyecto:
npm install

Crear un archivo .env con el siguiente dato:
SECRETO=undostres

Configuración de la Base de Datos:
Accede a MySQL phpMyAdmin en tu gestor de base de datos local, puedes usar Xampp.
Actualiza los valores de host, user, password y database con los datos de tu conexión a la base de datos.
Crea una nueva base de datos de nombre "basededatos".

Dentro de la carpeta del proyecto, crea un archivo llamado "knexfile.js" con la siguiente configuración:

module.exports = {
    development: {
      client: 'mysql',
      connection: {
        host: 'localhost',	   
        user: 'root',     // Cambiar por su nombre de usuario 
        password: '', // Cambiar por su contraseña
        database: 'basededatos',
      },
      migrations: {
        directory: './migrations', 
      },
    },
};

Ejecutar Migraciones:

En la terminal, ejecuta el siguiente comando para aplicar las migraciones a la base de datos:
npm run migrate

Iniciar el Servidor:

En la terminal, ejecuta el siguiente comando para iniciar el servidor:
npm run dev

Acceder a la Aplicación:
Abre tu navegador web y visita [http://localhost:3000] para acceder a la aplicación "Sistema de Gestión de la Universidad Valle del Momboy" y ver el mensaje de bienvenida.
