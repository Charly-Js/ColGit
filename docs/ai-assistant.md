# Asistente de IA para ColGit

## Descripción General

El Asistente de IA de ColGit es una herramienta integrada en la sección de Codespace que proporciona capacidades similares a GitHub Copilot. Este asistente ayuda a los desarrolladores a analizar, generar, explicar y corregir código directamente dentro de la plataforma.

## Arquitectura

El asistente de IA sigue la arquitectura hexagonal del proyecto, con clara separación entre:

- **Dominio**: Entidades y puertos que definen la lógica de negocio
- **Adaptadores Primarios**: Conectan la UI con el dominio
- **Adaptadores Secundarios**: Implementan servicios externos (API de OpenAI)

## Características Principales

### 1. Análisis de Código

- Detecta errores y problemas de estilo
- Identifica la línea exacta del problema
- Proporciona sugerencias de mejora
- Clasifica problemas por severidad (error, advertencia, info)

### 2. Generación de Código

- Crea código basado en descripciones en lenguaje natural
- Genera código en múltiples lenguajes de programación
- Considera el contexto del código existente

### 3. Explicación de Código

- Proporciona explicaciones detalladas del funcionamiento del código
- Identifica patrones de diseño utilizados
- Explica la lógica y el propósito del código

### 4. Corrección Automática

- Detecta y corrige errores en el código
- Aplica mejores prácticas automáticamente
- Optimiza el código manteniendo su funcionalidad

### 5. Preguntas y Respuestas

- Responde preguntas específicas sobre el código
- Proporciona soluciones a problemas comunes
- Ofrece recomendaciones contextualizadas

## Tecnologías Utilizadas

- **AI SDK**: Para la integración con modelos de IA
- **OpenAI API**: Utilizando principalmente el modelo GPT-4o
- **React**: Para la interfaz de usuario interactiva
- **TypeScript**: Para tipo seguro en todo el código

## Integración en el Proyecto

El asistente de IA está integrado en la sección de Codespace, accesible a través de la interfaz principal de ColGit.

## Requisitos

- Se requiere una clave API de OpenAI configurada como variable de entorno `OPENAI_API_KEY`

## Uso

1. Navegar a la sección de Codespace
2. Seleccionar el lenguaje de programación deseado
3. Utilizar las pestañas para acceder a las diferentes funcionalidades del asistente
4. Ingresar código o prompts según la funcionalidad seleccionada
5. Revisar y aplicar los resultados generados por la IA

## Consideraciones de Privacidad

El código enviado al asistente de IA se procesa a través de la API de OpenAI. Se recomienda no incluir información sensible o confidencial en el código compartido con el asistente.

