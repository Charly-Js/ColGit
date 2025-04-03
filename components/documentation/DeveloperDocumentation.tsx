import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const DeveloperDocumentation: React.FC = () => {
  return (
    <Tabs defaultValue="getting-started" className="w-full">
      <TabsList>
        <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
        <TabsTrigger value="project-structure">Project Structure</TabsTrigger>
        <TabsTrigger value="api-integration">API Integration</TabsTrigger>
        <TabsTrigger value="tech-stack">Tech Stack</TabsTrigger>
        <TabsTrigger value="credits">Credits</TabsTrigger>
      </TabsList>

      <TabsContent value="getting-started">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Project Structure</AccordionTrigger>
            <AccordionContent>
              <p>ColGit is built with Next.js and follows this structure:</p>
              <pre className="bg-gray-100 p-2 rounded mt-2">
                {`
/pages - Next.js pages
/components - React components
/utils - Utility functions
/styles - CSS and style-related files
/public - Static assets
            `}
              </pre>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Tech Stack</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside">
                <li>Next.js for the frontend and API routes</li>
                <li>React for UI components</li>
                <li>TypeScript for type-safe code</li>
                <li>Tailwind CSS for styling</li>
                <li>GitHub API for version control integration</li>
                <li>OpenAI API for AI-powered debugging</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>API Integration</AccordionTrigger>
            <AccordionContent>
              <p>
                ColGit requires integration with several APIs. Here's a list of the necessary APIs and where to find
                them:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>GitHub API:</strong> Para integración de control de versiones
                  <br />
                  Documentación:{" "}
                  <a
                    href="https://docs.github.com/en/rest"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://docs.github.com/en/rest
                  </a>
                </li>
                <li>
                  <strong>OpenAI API:</strong> Para la funcionalidad de depuración asistida por IA
                  <br />
                  Documentación:{" "}
                  <a
                    href="https://platform.openai.com/docs/api-reference"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://platform.openai.com/docs/api-reference
                  </a>
                </li>
                <li>
                  <strong>Google Calendar API:</strong> Para integración de calendario (opcional)
                  <br />
                  Documentación:{" "}
                  <a
                    href="https://developers.google.com/calendar/api"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://developers.google.com/calendar/api
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                Para las demás funcionalidades (autenticación, gestión de tareas, notas, etc.), se implementarán APIs
                internas como parte del backend de ColGit.
              </p>
              <p className="mt-4">Instrucciones para colaboradores:</p>
              <ol className="list-decimal list-inside mt-2">
                <li>Revisa la documentación de las APIs externas mencionadas arriba.</li>
                <li>Implementa los endpoints necesarios en el backend de ColGit para las funcionalidades internas.</li>
                <li>Utiliza bibliotecas cliente apropiadas para interactuar con las APIs externas desde el backend.</li>
                <li>
                  Asegúrate de manejar la autenticación y las claves de API de manera segura, utilizando variables de
                  entorno.
                </li>
                <li>
                  Documenta todos los endpoints internos que crees, incluyendo los parámetros de entrada y los formatos
                  de respuesta.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>API Documentation</AccordionTrigger>
            <AccordionContent>
              <p>ColGit exposes the following API endpoints:</p>
              <ul className="list-disc list-inside mt-2">
                <li>/api/auth - Authentication endpoints</li>
                <li>/api/projects - Project management</li>
                <li>/api/tasks - Task management</li>
                <li>/api/github - GitHub integration</li>
                <li>/api/ai - AI debugging service</li>
              </ul>
              <p className="mt-2">Refer to the API documentation for detailed usage and parameters.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Contributing</AccordionTrigger>
            <AccordionContent>
              <p>To contribute to ColGit:</p>
              <ol className="list-decimal list-inside mt-2">
                <li>Fork the repository</li>
                <li>Create a new branch for your feature</li>
                <li>Make your changes and commit them</li>
                <li>Push to your fork and submit a pull request</li>
              </ol>
              <p className="mt-2">Please ensure your code follows our style guide and passes all tests.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Environment Setup</AccordionTrigger>
            <AccordionContent>
              <p>To set up your development environment:</p>
              <ol className="list-decimal list-inside mt-2">
                <li>Clone the repository</li>
                <li>Install dependencies with `npm install`</li>
                <li>Set up environment variables (see .env.example)</li>
                <li>Run `npm run dev` to start the development server</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>

      <TabsContent value="project-structure">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Project Structure</AccordionTrigger>
            <AccordionContent>
              <p>ColGit is built with Next.js and follows this structure:</p>
              <pre className="bg-gray-100 p-2 rounded mt-2">
                {`
/pages - Next.js pages
/components - React components
/utils - Utility functions
/styles - CSS and style-related files
/public - Static assets
            `}
              </pre>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>

      <TabsContent value="api-integration">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-6">
            <AccordionTrigger>API Integration</AccordionTrigger>
            <AccordionContent>
              <p>
                ColGit requires integration with several APIs. Here's a list of the necessary APIs and where to find
                them:
              </p>
              <ul className="list-disc list-inside mt-2">
                <li>
                  <strong>GitHub API:</strong> Para integración de control de versiones
                  <br />
                  Documentación:{" "}
                  <a
                    href="https://docs.github.com/en/rest"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://docs.github.com/en/rest
                  </a>
                </li>
                <li>
                  <strong>OpenAI API:</strong> Para la funcionalidad de depuración asistida por IA
                  <br />
                  Documentación:{" "}
                  <a
                    href="https://platform.openai.com/docs/api-reference"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://platform.openai.com/docs/api-reference
                  </a>
                </li>
                <li>
                  <strong>Google Calendar API:</strong> Para integración de calendario (opcional)
                  <br />
                  Documentación:{" "}
                  <a
                    href="https://developers.google.com/calendar/api"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://developers.google.com/calendar/api
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                Para las demás funcionalidades (autenticación, gestión de tareas, notas, etc.), se implementarán APIs
                internas como parte del backend de ColGit.
              </p>
              <p className="mt-4">Instrucciones para colaboradores:</p>
              <ol className="list-decimal list-inside mt-2">
                <li>Revisa la documentación de las APIs externas mencionadas arriba.</li>
                <li>Implementa los endpoints necesarios en el backend de ColGit para las funcionalidades internas.</li>
                <li>Utiliza bibliotecas cliente apropiadas para interactuar con las APIs externas desde el backend.</li>
                <li>
                  Asegúrate de manejar la autenticación y las claves de API de manera segura, utilizando variables de
                  entorno.
                </li>
                <li>
                  Documenta todos los endpoints internos que crees, incluyendo los parámetros de entrada y los formatos
                  de respuesta.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>

      <TabsContent value="tech-stack">
        <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
        <h3 className="text-xl font-semibold mb-2">Node.js and npm</h3>
        <p>ColGit uses Node.js version 18.x or later. We recommend using the latest LTS version.</p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Key Dependencies</h3>
        <ul className="list-disc pl-5">
          <li>Next.js: 13.4.5</li>
          <li>React: 18.2.0</li>
          <li>TypeScript: 5.1.3</li>
          <li>Tailwind CSS: 3.3.2</li>
          <li>Radix UI: Various components (see package.json for specific versions)</li>
        </ul>
        <p className="mt-4">
          For a complete list of dependencies and their versions, please refer to the package.json file in the project
          root.
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Development Tools</h3>
        <ul className="list-disc pl-5">
          <li>ESLint: 8.42.0</li>
          <li>PostCSS: 8.4.24</li>
          <li>Autoprefixer: 10.4.14</li>
        </ul>
      </TabsContent>

      <TabsContent value="credits">
        <h2 className="text-2xl font-bold mb-4">Credits</h2>
        <p className="mb-4">
          ColGit es un proyecto desarrollado por YouBriefSoft, una empresa emergente en el campo del desarrollo de
          software.
        </p>
        <h3 className="text-xl font-semibold mb-2">Desarrollador Principal</h3>
        <p className="mb-4">
          <strong>Charly-Js</strong> - Fundador de YouBriefSoft y desarrollador principal de ColGit
        </p>
        <p className="mb-2">
          Charly-Js ha sido fundamental en la creación y desarrollo de ColGit, aportando su visión y experiencia en cada
          etapa del proyecto.
        </p>
        <p className="mb-4">
          GitHub:{" "}
          <a
            href="https://github.com/Charly-Js"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/Charly-Js
          </a>
        </p>
        <h3 className="text-xl font-semibold mb-2">Contribuciones</h3>
        <p>
          Agradecemos a todos los colaboradores que han contribuido al proyecto ColGit. Si estás interesado en
          contribuir, por favor revisa nuestra guía de contribución en la sección "Contributing".
        </p>
      </TabsContent>
    </Tabs>
  )
}

export default DeveloperDocumentation

