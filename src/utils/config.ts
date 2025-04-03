import { Language } from './translations'

export class Config {
  // ... (código existente)

  private language: Language = 'en'

  getLanguage(): Language {
    return this.language
  }

  setLanguage(lang: Language) {
    this.language = lang
    this.saveConfig()
  }

  // ... (resto del código existente)
}

