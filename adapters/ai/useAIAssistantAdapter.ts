"use client"

import { useState } from "react"
import { AIAssistantService } from "@/services/ai-assistant.service"
import type { CodeAnalysisResult, CodeCompletionResult } from "@/domain/ai/ai-assistant.entity"

/**
 * Adaptador primario que conecta la UI con el dominio del asistente de IA.
 * Implementa el patrón adaptador de la arquitectura hexagonal para traducir
 * las solicitudes de la UI a operaciones del dominio.
 * Gestiona estados locales para tracking de operaciones asíncronas.
 * @returns Objeto con estados y funciones para interactuar con el asistente de IA
 */
export function useAIAssistantAdapter() {
  // Estados para controlar las operaciones asíncronas y sus resultados
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<CodeAnalysisResult | null>(null)
  const [completionResult, setCompletionResult] = useState<CodeCompletionResult | null>(null)
  const [explanation, setExplanation] = useState<string | null>(null)
  const [fixedCode, setFixedCode] = useState<string | null>(null)
  const [answer, setAnswer] = useState<string | null>(null)

  // Inicializa el servicio de asistente de IA
  const aiAssistantService = new AIAssistantService()

  /**
   * Analiza el código proporcionado para encontrar errores y sugerencias.
   * Utiliza un estado local para tracking del proceso asíncrono.
   * @param code - Código a analizar
   * @param language - Lenguaje de programación
   * @returns Resultado del análisis
   */
  const analyzeCode = async (code: string, language: string) => {
    setIsAnalyzing(true)
    try {
      const result = await aiAssistantService.analyzeCode(code, language)
      setAnalysisResult(result)
      return result
    } catch (error) {
      console.error("Error analyzing code:", error)
      throw error
    } finally {
      setIsAnalyzing(false)
    }
  }

  /**
   * Genera código basado en una descripción textual.
   * Gestiona estado de carga durante la generación.
   * @param prompt - Descripción del código a generar
   * @param language - Lenguaje de programación deseado
   * @param context - Contexto adicional opcional
   * @returns Código generado
   */
  const generateCodeCompletion = async (prompt: string, language: string, context?: string) => {
    setIsGenerating(true)
    try {
      const result = await aiAssistantService.generateCodeCompletion(prompt, language, context)
      setCompletionResult(result)
      return result
    } catch (error) {
      console.error("Error generating code completion:", error)
      throw error
    } finally {
      setIsGenerating(false)
    }
  }

  /**
   * Obtiene una explicación del código proporcionado.
   * @param code - Código a explicar
   * @param language - Lenguaje de programación
   * @returns Explicación detallada
   */
  const explainCode = async (code: string, language: string) => {
    try {
      const result = await aiAssistantService.explainCode(code, language)
      setExplanation(result)
      return result
    } catch (error) {
      console.error("Error explaining code:", error)
      throw error
    }
  }

  /**
   * Corrige errores en el código proporcionado.
   * @param code - Código con errores
   * @param language - Lenguaje de programación
   * @returns Código corregido
   */
  const fixCode = async (code: string, language: string) => {
    try {
      const result = await aiAssistantService.fixCode(code, language)
      setFixedCode(result)
      return result
    } catch (error) {
      console.error("Error fixing code:", error)
      throw error
    }
  }

  /**
   * Responde a preguntas sobre código.
   * @param question - Pregunta sobre programación
   * @param relatedCode - Código relacionado opcional
   * @returns Respuesta a la pregunta
   */
  const answerCodeQuestion = async (question: string, relatedCode?: string) => {
    try {
      const result = await aiAssistantService.answerCodeQuestion(question, relatedCode)
      setAnswer(result)
      return result
    } catch (error) {
      console.error("Error answering question:", error)
      throw error
    }
  }

  // Expone los estados y funciones para ser usados por componentes UI
  return {
    isAnalyzing,
    isGenerating,
    analysisResult,
    completionResult,
    explanation,
    fixedCode,
    answer,
    analyzeCode,
    generateCodeCompletion,
    explainCode,
    fixCode,
    answerCodeQuestion,
  }
}

