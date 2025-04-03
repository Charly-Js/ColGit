\`\`\`typescript
export type Language = 'en' | 'es' | 'zh' | 'hi' | 'ar' | 'es-419'

export const LANGUAGES: { [key in Language]: string } = {
  'en': 'English',
  'es': 'Español (España)',
  'zh': '中文',
  'hi': 'हिन्दी',
  'ar': 'العربية',
  'es-419': 'Español (Latinoamérica)'
}

export const TRANSLATIONS: { [key in Language]: { [key: string]: string } } = {
  'en': {
    'title': 'ColGit',
    'settings': 'Settings',
    'language': 'Language',
    'version_control': 'Version Control',
    'calendar': 'Calendar',
    'tasks': 'Tasks',
    'notes': 'Notes',
    'save': 'Save',
    'username': 'Username',
    'email': 'Email',
    'password': 'Password',
    'register': 'Register',
    'login': 'Login'
    // ... (añade más traducciones según sea necesario)
  },
  'es': {
    'title': 'ColGit',
    'settings': 'Configuración',
    'language': 'Idioma',
    'version_control': 'Control de Versiones',
    'calendar': 'Calendario',
    'tasks': 'Tareas',
    'notes': 'Notas',
    'save': 'Guardar',
    'username': 'Nombre de usuario',
    'email': 'Correo electrónico',
    'password': 'Contraseña',
    'register': 'Registrarse',
    'login': 'Iniciar sesión'
    // ... (añade más traducciones según sea necesario)
  },
  'zh': {
    'title': 'ColGit',
    'settings': '设置',
    'language': '语言',
    'version_control': '版本控制',
    'calendar': '日历',
    'tasks': '任务',
    'notes': '笔记',
    'save': '保存',
    'username': '用户名',
    'email': '电子邮件',
    'password': '密码',
    'register': '注册',
    'login': '登录'
    // ... (añade más traducciones según sea necesario)
  },
  'hi': {
    'title': 'ColGit',
    'settings': 'सेटिंग्स',
    'language': 'भाषा',
    'version_control': 'संस्करण नियंत्रण',
    'calendar': 'कैलेंडर',
    'tasks': 'कार्य',
    'notes': 'नोट्स',
    'save': 'सहेजें',
    'username': 'उपयोगकर्ता नाम',
    'email': 'ईमेल',
    'password': 'पासवर्ड',
    'register': 'पंजीकरण करें',
    'login': 'लॉग इन करें'
    // ... (añade más traducciones según sea necesario)
  },
  'ar': {
    'title': 'ColGit',
    'settings': 'الإعدادات',
    'language': 'اللغة',
    'version_control': 'التحكم بالإصدارات',
    'calendar': 'التقويم',
    'tasks': 'المهام',
    'notes': 'الملاحظات',
    'save': 'حفظ',
    'username': 'اسم المستخدم',
    'email': 'البريد الإلكتروني',
    'password': 'كلمة المرور',
    'register': 'تسجيل',
    'login': 'تسجيل الدخول'
    // ... (añade más traducciones según sea necesario)
  },
  'es-419': {
    'title': 'ColGit',
    'settings': 'Configuración',
    'language': 'Idioma',
    'version_control': 'Control de Versiones',
    'calendar': 'Calendario',
    'tasks': 'Tareas',
    'notes': 'Notas',
    'save': 'Guardar',
    'username': 'Nombre de usuario',
    'email': 'Correo electrónico',
    'password': 'Contraseña',
    'register': 'Registrarse',
    'login': 'Iniciar sesión'
    // ... (añade más traducciones según sea necesario)
  }
}

export function getTranslation(key: string, language: Language): string {
  return TRANSLATIONS[language][key] || key
}
\`\`\`

