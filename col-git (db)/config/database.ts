import mysql from "mysql2/promise"
import dotenv from "dotenv"

// Cargar variables de entorno
dotenv.config()

// Configuración de la conexión a MySQL
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "colgit_user",
  password: process.env.DB_PASSWORD || "colgit_password",
  database: process.env.DB_NAME || "colgit_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig)

// Función para ejecutar consultas
export async function query(sql: string, params?: any[]) {
  try {
    const [results] = await pool.execute(sql, params)
    return results
  } catch (error) {
    console.error("Error ejecutando consulta SQL:", error)
    throw error
  }
}

// Función para verificar la conexión a la base de datos
export async function testConnection() {
  try {
    const connection = await pool.getConnection()
    console.log("Conexión a la base de datos establecida correctamente")
    connection.release()
    return true
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error)
    return false
  }
}

// Función para inicializar la base de datos
export async function initializeDatabase() {
  try {
    console.log("Inicializando base de datos...")

    // Verificar si las tablas existen y crearlas si no
    await createTables()

    // Verificar si hay datos de prueba y cargarlos si es necesario
    const hasData = await checkIfDataExists()
    if (!hasData) {
      await seedDatabase()
    }

    console.log("Base de datos inicializada correctamente")
    return true
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
    return false
  }
}

// Función para crear las tablas necesarias
async function createTables() {
  // Aquí se ejecutarán los scripts de creación de tablas
  const tables = await import("./database/schema")
  for (const [tableName, createTableSQL] of Object.entries(tables.default)) {
    try {
      await query(createTableSQL)
      console.log(`Tabla ${tableName} creada o verificada correctamente`)
    } catch (error) {
      console.error(`Error al crear la tabla ${tableName}:`, error)
      throw error
    }
  }
}

// Función para verificar si ya existen datos en la base de datos
async function checkIfDataExists() {
  try {
    const users = await query("SELECT COUNT(*) as count FROM users")
    // @ts-ignore
    return users[0].count > 0
  } catch (error) {
    // Si hay un error, probablemente la tabla no existe
    return false
  }
}

// Función para cargar datos de prueba
async function seedDatabase() {
  try {
    const seedScripts = await import("./database/seeds")
    for (const [seedName, seedFunction] of Object.entries(seedScripts)) {
      try {
        // @ts-ignore
        await seedFunction(query)
        console.log(`Datos de prueba ${seedName} cargados correctamente`)
      } catch (seedError) {
        console.error(`Error al cargar datos de prueba ${seedName}:`, seedError)
        throw seedError
      }
    }
  } catch (error) {
    console.error("Error al cargar datos de prueba:", error)
    throw error
  }
}

export default {
  query,
  testConnection,
  initializeDatabase,
}

