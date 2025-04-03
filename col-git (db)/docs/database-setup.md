# Configuración de la Base de Datos MySQL para ColGit

Este documento proporciona instrucciones detalladas para configurar la base de datos MySQL para el desarrollo local de ColGit.

## Requisitos Previos

- MySQL 8.0 o superior
- Acceso de administrador a MySQL para crear bases de datos y usuarios
- Node.js 18.x o superior (para ejecutar scripts de inicialización)

## Instalación de MySQL

### En Windows

1. Descarga el instalador de MySQL desde [el sitio oficial](https://dev.mysql.com/downloads/installer/)
2. Ejecuta el instalador y sigue las instrucciones
3. Durante la instalación, establece una contraseña para el usuario root
4. Asegúrate de que el servicio de MySQL se inicie automáticamente

### En macOS

Usando Homebrew:

```bash
brew install mysql
brew services start mysql

