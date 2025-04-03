# Arquitectura Hexagonal en ColGit

## Visión General

ColGit implementa una arquitectura hexagonal (también conocida como arquitectura de puertos y adaptadores) para facilitar la escalabilidad, mantenibilidad y pruebas del código. Esta arquitectura separa claramente las preocupaciones y permite que la lógica de negocio sea independiente de los detalles de implementación.

## Estructura

La arquitectura se divide en tres capas principales:

1. **Dominio**: El núcleo de la aplicación que contiene la lógica de negocio.
2. **Puertos**: Interfaces que definen cómo se comunica el dominio con el exterior.
3. **Adaptadores**: Implementaciones concretas de los puertos que conectan el dominio con tecnologías específicas.

### Dominio

El dominio contiene:
- Entidades: Objetos que representan conceptos del negocio (Repository, Activity, Collaborator)
- Casos de uso: Lógica de negocio específica de la aplicación

### Puertos

Los puertos son interfaces que definen:
- Cómo se accede al dominio (puertos primarios)
- Qué necesita el dominio del exterior (puertos secundarios)

### Adaptadores

Los adaptadores se dividen en:
- **Adaptadores primarios**: Conectan la UI con el dominio (useRepositoryAdapter, useActivityAdapter)
- **Adaptadores secundarios**: Implementan los puertos secundarios (RepositoryService, ActivityService)

## Beneficios para ColGit

1. **Escalabilidad**: Facilita la adición de nuevas funcionalidades sin afectar el código existente.
2. **Mantenibilidad**: Separación clara de responsabilidades.
3. **Testabilidad**: Facilita la escritura de pruebas unitarias y de integración.
4. **Flexibilidad**: Permite cambiar implementaciones (por ejemplo, de almacenamiento) sin afectar la lógica de negocio.
5. **Desarrollo en paralelo**: Diferentes equipos pueden trabajar en diferentes adaptadores simultáneamente.

## Modelo de Desarrollo: Kanban

Para el desarrollo de ColGit, recomendamos utilizar Kanban por las siguientes razones:

1. **Flujo continuo**: Ideal para proyectos de código abierto donde los colaboradores pueden unirse y salir en cualquier momento.
2. **Visualización del trabajo**: Tableros Kanban proporcionan una visión clara del estado del proyecto.
3. **Limitación del trabajo en progreso (WIP)**: Evita la sobrecarga y mejora la calidad.
4. **Flexibilidad**: No hay iteraciones fijas, lo que permite adaptarse rápidamente a cambios.
5. **Mejora continua**: Facilita la identificación de cuellos de botella y la optimización del proceso.

A diferencia del modelo en espiral, Kanban no requiere fases predefinidas y es más adecuado para proyectos de código abierto que necesitan adaptarse constantemente a nuevos colaboradores y requisitos cambiantes.

