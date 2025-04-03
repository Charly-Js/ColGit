// Datos de prueba para la base de datos
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt"

// Función para generar un hash de contraseña
async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

// Datos de prueba para usuarios
export async function seedUsers(query: Function) {
  const adminPassword = await hashPassword("admin123")
  const userPassword = await hashPassword("user123")

  // Crear usuario administrador
  await query(
    `
    INSERT INTO users (id, username, email, password_hash, full_name, role, is_active, is_verified, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [uuidv4(), "admin", "admin@colgit.com", adminPassword, "Admin User", "admin", true, true, new Date()],
  )

  // Crear usuario normal
  await query(
    `
    INSERT INTO users (id, username, email, password_hash, full_name, role, is_active, is_verified, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [uuidv4(), "user", "user@colgit.com", userPassword, "Regular User", "user", true, true, new Date()],
  )

  // Crear usuario de prueba adicional
  await query(
    `
    INSERT INTO users (id, username, email, password_hash, full_name, role, is_active, is_verified, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [uuidv4(), "testuser", "test@colgit.com", userPassword, "Test User", "user", true, true, new Date()],
  )
}

// Datos de prueba para permisos
export async function seedPermissions(query: Function) {
  const permissions = [
    { id: uuidv4(), name: "manage_users", description: "Permite gestionar usuarios" },
    { id: uuidv4(), name: "manage_projects", description: "Permite gestionar proyectos" },
    { id: uuidv4(), name: "manage_repositories", description: "Permite gestionar repositorios" },
    { id: uuidv4(), name: "view_analytics", description: "Permite ver analíticas" },
    { id: uuidv4(), name: "manage_settings", description: "Permite gestionar configuraciones" },
    { id: uuidv4(), name: "manage_roles", description: "Permite gestionar roles" },
    { id: uuidv4(), name: "manage_billing", description: "Permite gestionar facturación" },
    { id: uuidv4(), name: "support_tickets", description: "Permite gestionar tickets de soporte" },
  ]

  for (const permission of permissions) {
    await query(
      `
      INSERT INTO permissions (id, name, description, created_at)
      VALUES (?, ?, ?, ?)
    `,
      [permission.id, permission.name, permission.description, new Date()],
    )
  }
}

// Datos de prueba para repositorios
export async function seedRepositories(query: Function) {
  // Obtener IDs de usuarios
  const users = await query("SELECT id, username FROM users")

  if (users.length === 0) {
    throw new Error("No hay usuarios para crear repositorios")
  }

  const adminUser = users.find((u: any) => u.username === "admin")
  const regularUser = users.find((u: any) => u.username === "user")

  if (!adminUser || !regularUser) {
    throw new Error("No se encontraron los usuarios necesarios")
  }

  // Crear repositorios
  const repo1Id = uuidv4()
  await query(
    `
    INSERT INTO repositories (id, name, description, owner_id, is_public, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [repo1Id, "proyecto-demo", "Un repositorio de demostración para ColGit", adminUser.id, true, new Date()],
  )

  const repo2Id = uuidv4()
  await query(
    `
    INSERT INTO repositories (id, name, description, owner_id, is_public, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [repo2Id, "proyecto-privado", "Un repositorio privado para pruebas", regularUser.id, false, new Date()],
  )

  // Crear branches para los repositorios
  const branch1Id = uuidv4()
  await query(
    `
    INSERT INTO branches (id, repository_id, name, created_by, created_at)
    VALUES (?, ?, ?, ?, ?)
  `,
    [branch1Id, repo1Id, "main", adminUser.id, new Date()],
  )

  const branch2Id = uuidv4()
  await query(
    `
    INSERT INTO branches (id, repository_id, name, created_by, created_at)
    VALUES (?, ?, ?, ?, ?)
  `,
    [branch2Id, repo2Id, "main", regularUser.id, new Date()],
  )

  // Crear commits para los branches
  const commit1Id = uuidv4()
  await query(
    `
    INSERT INTO commits (id, repository_id, branch_id, author_id, message, hash, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
    [commit1Id, repo1Id, branch1Id, adminUser.id, "Commit inicial", "1a2b3c4d5e6f7g8h9i0j", new Date()],
  )

  const commit2Id = uuidv4()
  await query(
    `
    INSERT INTO commits (id, repository_id, branch_id, author_id, message, hash, parent_hash, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [commit2Id, repo2Id, branch2Id, regularUser.id, "Primer commit", "0a1b2c3d4e5f6g7h8i9j", null, new Date()],
  )

  // Añadir colaborador al repositorio público
  await query(
    `
    INSERT INTO repository_collaborators (repository_id, user_id, role, created_at)
    VALUES (?, ?, ?, ?)
  `,
    [repo1Id, regularUser.id, "write", new Date()],
  )
}

// Datos de prueba para workspaces
export async function seedWorkspaces(query: Function) {
  // Obtener IDs de usuarios
  const users = await query("SELECT id, username FROM users")
  const repositories = await query("SELECT id FROM repositories")

  if (users.length === 0 || repositories.length === 0) {
    throw new Error("No hay usuarios o repositorios para crear workspaces")
  }

  const adminUser = users.find((u: any) => u.username === "admin")
  const regularUser = users.find((u: any) => u.username === "user")

  if (!adminUser || !regularUser) {
    throw new Error("No se encontraron los usuarios necesarios")
  }

  // Crear workspaces
  const workspace1Id = uuidv4()
  await query(
    `
    INSERT INTO workspaces (id, name, description, owner_id, is_public, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [workspace1Id, "Workspace Demo", "Un workspace de demostración para ColGit", adminUser.id, true, new Date()],
  )

  const workspace2Id = uuidv4()
  await query(
    `
    INSERT INTO workspaces (id, name, description, owner_id, is_public, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [workspace2Id, "Workspace Privado", "Un workspace privado para pruebas", regularUser.id, false, new Date()],
  )

  // Añadir miembros a los workspaces
  await query(
    `
    INSERT INTO workspace_members (workspace_id, user_id, role, created_at)
    VALUES (?, ?, ?, ?)
  `,
    [workspace1Id, regularUser.id, "member", new Date()],
  )

  // Añadir repositorios a los workspaces
  await query(
    `
    INSERT INTO workspace_repositories (workspace_id, repository_id, created_at)
    VALUES (?, ?, ?)
  `,
    [workspace1Id, repositories[0].id, new Date()],
  )
}

// Datos de prueba para comunidades
export async function seedCommunities(query: Function) {
  // Obtener IDs de usuarios
  const users = await query("SELECT id, username FROM users")

  if (users.length === 0) {
    throw new Error("No hay usuarios para crear comunidades")
  }

  const adminUser = users.find((u: any) => u.username === "admin")
  const regularUser = users.find((u: any) => u.username === "user")

  if (!adminUser || !regularUser) {
    throw new Error("No se encontraron los usuarios necesarios")
  }

  // Crear comunidades
  const community1Id = uuidv4()
  await query(
    `
    INSERT INTO communities (id, name, description, owner_id, is_public, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [community1Id, "Comunidad ColGit", "Comunidad oficial de ColGit", adminUser.id, true, new Date()],
  )

  // Añadir miembros a las comunidades
  await query(
    `
    INSERT INTO community_members (community_id, user_id, role, created_at)
    VALUES (?, ?, ?, ?)
  `,
    [community1Id, regularUser.id, "member", new Date()],
  )

  // Añadir mensajes a las comunidades
  const message1Id = uuidv4()
  await query(
    `
    INSERT INTO community_messages (id, community_id, user_id, content, created_at)
    VALUES (?, ?, ?, ?, ?)
  `,
    [message1Id, community1Id, adminUser.id, "¡Bienvenidos a la comunidad oficial de ColGit!", new Date()],
  )

  const message2Id = uuidv4()
  await query(
    `
    INSERT INTO community_messages (id, community_id, user_id, content, reply_to, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [
      message2Id,
      community1Id,
      regularUser.id,
      "¡Gracias por la bienvenida!",
      message1Id,
      new Date(Date.now() + 1000 * 60), // 1 minuto después
    ],
  )
}

// Datos de prueba para tareas y eventos
export async function seedTasksAndEvents(query: Function) {
  // Obtener IDs de usuarios y workspaces
  const users = await query("SELECT id, username FROM users")
  const workspaces = await query("SELECT id FROM workspaces")

  if (users.length === 0 || workspaces.length === 0) {
    throw new Error("No hay usuarios o workspaces para crear tareas y eventos")
  }

  const adminUser = users.find((u: any) => u.username === "admin")
  const regularUser = users.find((u: any) => u.username === "user")

  if (!adminUser || !regularUser) {
    throw new Error("No se encontraron los usuarios necesarios")
  }

  // Crear tareas
  const task1Id = uuidv4()
  await query(
    `
    INSERT INTO tasks (id, title, description, status, priority, due_date, creator_id, assignee_id, workspace_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      task1Id,
      "Implementar autenticación",
      "Implementar sistema de autenticación con soporte para múltiples proveedores",
      "in_progress",
      "high",
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 días después
      adminUser.id,
      regularUser.id,
      workspaces[0].id,
      new Date(),
    ],
  )

  const task2Id = uuidv4()
  await query(
    `
    INSERT INTO tasks (id, title, description, status, priority, due_date, creator_id, assignee_id, workspace_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      task2Id,
      "Diseñar interfaz de usuario",
      "Diseñar la interfaz de usuario para la aplicación",
      "pending",
      "medium",
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 14 días después
      adminUser.id,
      adminUser.id,
      workspaces[0].id,
      new Date(),
    ],
  )

  // Crear eventos de calendario
  const event1Id = uuidv4()
  await query(
    `
    INSERT INTO calendar_events (id, title, description, start_date, end_date, all_day, user_id, workspace_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
    [
      event1Id,
      "Reunión de equipo",
      "Reunión semanal del equipo",
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 días después
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60), // 2 días después + 1 hora
      false,
      adminUser.id,
      workspaces[0].id,
      new Date(),
    ],
  )

  // Añadir participantes al evento
  await query(
    `
    INSERT INTO event_participants (event_id, user_id, status, created_at)
    VALUES (?, ?, ?, ?)
  `,
    [event1Id, regularUser.id, "accepted", new Date()],
  )
}

// Datos de prueba para chats
export async function seedChats(query: Function) {
  // Obtener IDs de usuarios
  const users = await query("SELECT id, username FROM users")

  if (users.length === 0) {
    throw new Error("No hay usuarios para crear chats")
  }

  const adminUser = users.find((u: any) => u.username === "admin")
  const regularUser = users.find((u: any) => u.username === "user")

  if (!adminUser || !regularUser) {
    throw new Error("No se encontraron los usuarios necesarios")
  }

  // Crear chat directo
  const chat1Id = uuidv4()
  await query(
    `
    INSERT INTO chats (id, type, created_by, created_at)
    VALUES (?, ?, ?, ?)
  `,
    [chat1Id, "direct", adminUser.id, new Date()],
  )

  // Añadir participantes al chat
  await query(
    `
    INSERT INTO chat_participants (chat_id, user_id, role, created_at)
    VALUES (?, ?, ?, ?)
  `,
    [chat1Id, adminUser.id, "member", new Date()],
  )

  await query(
    `
    INSERT INTO chat_participants (chat_id, user_id, role, created_at)
    VALUES (?, ?, ?, ?)
  `,
    [chat1Id, regularUser.id, "member", new Date()],
  )

  // Añadir mensajes al chat
  const message1Id = uuidv4()
  await query(
    `
    INSERT INTO chat_messages (id, chat_id, sender_id, content, type, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [message1Id, chat1Id, adminUser.id, "¡Hola! ¿Cómo va el proyecto?", "text", new Date()],
  )

  const message2Id = uuidv4()
  await query(
    `
    INSERT INTO chat_messages (id, chat_id, sender_id, content, type, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `,
    [
      message2Id,
      chat1Id,
      regularUser.id,
      "Todo bien, estoy trabajando en la autenticación",
      "text",
      new Date(Date.now() + 1000 * 60), // 1 minuto después
    ],
  )

  // Marcar mensajes como leídos
  await query(
    `
    INSERT INTO message_reads (message_id, user_id, read_at)
    VALUES (?, ?, ?)
  `,
    [
      message1Id,
      regularUser.id,
      new Date(Date.now() + 1000 * 30), // 30 segundos después
    ],
  )

  await query(
    `
    INSERT INTO message_reads (message_id, user_id, read_at)
    VALUES (?, ?, ?)
  `,
    [
      message2Id,
      adminUser.id,
      new Date(Date.now() + 1000 * 90), // 90 segundos después
    ],
  )
}

// Datos de prueba para configuración de usuario
export async function seedUserSettings(query: Function) {
  // Obtener IDs de usuarios
  const users = await query("SELECT id, username FROM users")

  if (users.length === 0) {
    throw new Error("No hay usuarios para crear configuraciones")
  }

  for (const user of users) {
    const notificationPreferences = JSON.stringify({
      email: true,
      push: true,
      inApp: true,
      taskAssignment: true,
      mentions: true,
      teamUpdates: true,
    })

    await query(
      `
      INSERT INTO user_settings (user_id, language, theme, notification_preferences, created_at)
      VALUES (?, ?, ?, ?, ?)
    `,
      [user.id, user.username === "admin" ? "en" : "es", "dark", notificationPreferences, new Date()],
    )
  }
}

// Datos de prueba para configuración del sistema
export async function seedSystemSettings(query: Function) {
  const settings = [
    { key: "site_name", value: "ColGit" },
    { key: "allow_public_repositories", value: "true" },
    { key: "max_storage_per_user", value: "5368709120" }, // 5 GB en bytes
    { key: "max_file_size", value: "104857600" }, // 100 MB en bytes
    { key: "maintenance_mode", value: "false" },
    { key: "registration_open", value: "true" },
    { key: "require_email_verification", value: "true" },
    { key: "default_user_role", value: "user" },
    { key: "session_timeout", value: "3600" }, // 1 hora en segundos
  ]

  for (const setting of settings) {
    await query(
      `
      INSERT INTO system_settings (id, key, value, created_at)
      VALUES (?, ?, ?, ?)
    `,
      [uuidv4(), setting.key, setting.value, new Date()],
    )
  }
}

