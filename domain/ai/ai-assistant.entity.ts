// Entidad de dominio para el asistente de IA
export interface CodeAnalysisResult {
  errors: Array<{
    line: number
    message: string
    severity: "error" | "warning" | "info"
    suggestion?: string
  }>
  suggestions: Array<{
    description: string
    code?: string
  }>
  explanation?: string
}

export interface CodeCompletionResult {
  completion: string
  alternatives?: string[]
}

// Puertos (interfaces) para el dominio del asistente de IA
/**
 * Puerto principal para el asistente de IA.
 * Define las operaciones que el asistente puede realizar con el código.
 * Sigue el patrón de puerto en la arquitectura hexagonal para desacoplar
 * la lógica de negocio de la implementación concreta.
 */
export interface AIAssistantPort {
  /**
   * Analiza código para encontrar errores, problemas de estilo y posibles mejoras.
   * @param code - Código a analizar
   * @param language - Lenguaje de programación del código
   * @returns Resultado del análisis con errores y sugerencias
   */
  analyzeCode(code: string, language: string): Promise<CodeAnalysisResult>

  /**
   * Genera código basado en una descripción textual.
   * @param prompt - Descripción del código a generar
   * @param language - Lenguaje de programación deseado
   * @param context - Contexto adicional (código existente relacionado)
   * @returns Código generado y posibles alternativas
   */
  generateCodeCompletion(prompt: string, language: string, context?: string): Promise<CodeCompletionResult>

  /**
   * Explica el funcionamiento del código proporcionado.
   * @param code - Código a explicar
   * @param language - Lenguaje de programación del código
   * @returns Explicación detallada del código
   */
  explainCode(code: string, language: string): Promise<string>

  /**
   * Corrige errores en el código proporcionado.
   * @param code - Código con errores a corregir
   * @param language - Lenguaje de programación del código
   * @returns Código corregido
   */
  fixCode(code: string, language: string): Promise<string>

  /**
   * Responde preguntas relacionadas con código.
   * @param question - Pregunta sobre programación o código específico
   * @param relatedCode - Código relacionado con la pregunta (opcional)
   * @returns Respuesta a la pregunta
   */
  answerCodeQuestion(question: string, relatedCode?: string): Promise<string>
}

