import type { AIAssistantPort, CodeAnalysisResult, CodeCompletionResult } from "@/domain/ai/ai-assistant.entity"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

/**
 * Implementación del servicio de asistente de IA (adaptador secundario).
 * Esta clase implementa el puerto AIAssistantPort y proporciona la funcionalidad
 * concreta utilizando la AI SDK y OpenAI.
 * Sigue el patrón de adaptador secundario en la arquitectura hexagonal.
 */
export class AIAssistantService implements AIAssistantPort {
  /**
   * Analiza código para encontrar errores y sugerencias de mejora.
   * Utiliza la API de OpenAI para procesar el código y extraer información relevante.
   * @param code - Código a analizar
   * @param language - Lenguaje de programación
   * @returns Resultado estructurado del análisis
   */
  async analyzeCode(code: string, language: string): Promise<CodeAnalysisResult> {
    try {
      // Construye un prompt detallado para analizar el código
      const prompt = `
        Analiza el siguiente código en ${language} e identifica posibles errores, problemas de estilo o mejoras.
        Proporciona una lista de errores con número de línea, mensaje, severidad y sugerencia.
        También proporciona sugerencias generales para mejorar el código.
        
        Código a analizar:
        \`\`\`${language}
        ${code}
        \`\`\`
        
        Responde en formato JSON con la siguiente estructura:
        {
          "errors": [
            {
              "line": número de línea,
              "message": "mensaje de error",
              "severity": "error" | "warning" | "info",
              "suggestion": "sugerencia para corregir"
            }
          ],
          "suggestions": [
            {
              "description": "descripción de la sugerencia",
              "code": "código sugerido (opcional)"
            }
          ],
          "explanation": "explicación general del código"
        }
      `

      // Llama a la API de OpenAI para generar el análisis
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      })

      // Extraer el JSON de la respuesta - manejo diferentes formatos de respuesta posibles
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\{[\s\S]*\}/)
      const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text

      try {
        return JSON.parse(jsonString)
      } catch (parseError) {
        console.error("Error parsing JSON response:", parseError)
        // Fallback para cuando la respuesta no es un JSON válido
        return {
          errors: [],
          suggestions: [{ description: "No se pudo analizar el código correctamente." }],
          explanation: text,
        }
      }
    } catch (error) {
      console.error("Error in analyzeCode:", error)
      throw error
    }
  }

  /**
   * Genera código basado en una descripción textual.
   * Utiliza contexto opcional para mejorar la relevancia del código generado.
   * @param prompt - Descripción del código a generar
   * @param language - Lenguaje de programación deseado
   * @param context - Código existente relacionado (opcional)
   * @returns Código generado
   */
  async generateCodeCompletion(prompt: string, language: string, context?: string): Promise<CodeCompletionResult> {
    try {
      // Construye el prompt incluyendo contexto si está disponible
      const fullPrompt = `
        ${context ? `Contexto del código:\n\`\`\`${language}\n${context}\n\`\`\`\n\n` : ""}
        Genera código en ${language} para: ${prompt}
        Proporciona solo el código sin explicaciones adicionales.
      `

      // Llama a la API para generar el código
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: fullPrompt,
      })

      // Extrae solo el código de la respuesta
      const codeMatch = text.match(/```(?:.*?)\n([\s\S]*?)\n```/) || [null, text]
      const code = codeMatch[1] || text

      return {
        completion: code.trim(),
      }
    } catch (error) {
      console.error("Error in generateCodeCompletion:", error)
      throw error
    }
  }

  /**
   * Proporciona una explicación detallada del código.
   * Útil para entender código complejo o para fines educativos.
   * @param code - Código a explicar
   * @param language - Lenguaje de programación
   * @returns Explicación detallada
   */
  async explainCode(code: string, language: string): Promise<string> {
    try {
      const prompt = `
        Explica el siguiente código en ${language} de manera detallada, incluyendo:
        - Qué hace el código
        - Cómo funciona
        - Patrones de diseño utilizados
        - Posibles problemas o mejoras
        
        Código a explicar:
        \`\`\`${language}
        ${code}
        \`\`\`
      `

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      })

      return text
    } catch (error) {
      console.error("Error in explainCode:", error)
      throw error
    }
  }

  /**
   * Corrige errores en el código proporcionado.
   * Devuelve una versión mejorada y corregida del código original.
   * @param code - Código con errores
   * @param language - Lenguaje de programación
   * @returns Código corregido
   */
  async fixCode(code: string, language: string): Promise<string> {
    try {
      const prompt = `
        Corrige los errores en el siguiente código en ${language}:
        
        \`\`\`${language}
        ${code}
        \`\`\`
        
        Proporciona solo el código corregido sin explicaciones adicionales.
      `

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      })

      // Extrae solo el código corregido
      const codeMatch = text.match(/```(?:.*?)\n([\s\S]*?)\n```/) || [null, text]
      const fixedCode = codeMatch[1] || text

      return fixedCode.trim()
    } catch (error) {
      console.error("Error in fixCode:", error)
      throw error
    }
  }

  /**
   * Responde preguntas específicas sobre código o programación.
   * Puede utilizar código relacionado para contextualizar la respuesta.
   * @param question - Pregunta sobre programación
   * @param relatedCode - Código relacionado (opcional)
   * @returns Respuesta detallada
   */
  async answerCodeQuestion(question: string, relatedCode?: string): Promise<string> {
    try {
      const prompt = `
        ${relatedCode ? `Código relacionado:\n\`\`\`\n${relatedCode}\n\`\`\`\n\n` : ""}
        Pregunta: ${question}
        
        Proporciona una respuesta clara y concisa.
      `

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      })

      return text
    } catch (error) {
      console.error("Error in answerCodeQuestion:", error)
      throw error
    }
  }
}

