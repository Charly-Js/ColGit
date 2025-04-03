import { query } from "../database"

// Función para ejecutar migraciones
export async function runMigrations() {
  try {
    console.log("Ejecutando migraciones...")

    // Crear tabla de migraciones si no existe
    await query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `)

    // Obtener migraciones ya ejecutadas
    const executedMigrations = await query("SELECT name FROM migrations")
    const executedMigrationNames = executedMigrations.map((m: any) => m.name)

    // Obtener todas las migraciones disponibles
    const migrations = await getMigrations()

    // Ejecutar migraciones pendientes
    for (const migration of migrations) {
      if (!executedMigrationNames.includes(migration.name)) {
        console.log(`Ejecutando migración: ${migration.name}`)
        await migration.up()
        await query("INSERT INTO migrations (name) VALUES (?)", [migration.name])
        console.log(`Migración ${migration.name} ejecutada correctamente`)
      }
    }

    console.log("Migraciones completadas")
    return true
  } catch (error) {
    console.error("Error al ejecutar migraciones:", error)
    return false
  }
}

// Función para obtener todas las migraciones disponibles
async function getMigrations() {
  // Aquí se cargarían dinámicamente todas las migraciones disponibles
  // Por ahora, definimos algunas migraciones de ejemplo

  return [
    {
      name: "001_initial_schema",
      up: async () => {
        // Esta migración ya está cubierta por la creación de tablas en schema.ts
        return true
      },
    },
    {
      name: "002_add_avatar_url_to_communities",
      up: async () => {
        // Verificar si la columna ya existe
        const columns = await query(`
          SELECT COLUMN_NAME 
          FROM INFORMATION_SCHEMA.COLUMNS 
          WHERE TABLE_NAME = 'communities' AND COLUMN_NAME = 'avatar_url'
        `)

        if (columns.length === 0) {
          await query(`
            ALTER TABLE communities 
            ADD COLUMN avatar_url VARCHAR(255) AFTER description
          `)
        }
        return true
      },
    },
    {
      name: "003_add_indexes_to_repositories",
      up: async () => {
        // Añadir índices para mejorar el rendimiento
        await query(`
          ALTER TABLE repositories 
          ADD INDEX idx_repo_updated_at (updated_at)
        `)
        return true
      },
    },
  ]
}

export default {
  runMigrations,
}

