import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function UserDocumentation() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          <p>Welcome to ColGit! This guide will help you get started with our platform.</p>
          <ol className="list-decimal list-inside mt-2">
            <li>Create an account or log in</li>
            <li>Set up your profile</li>
            <li>Create or join a project</li>
            <li>Start collaborating!</li>
          </ol>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Using the Calendar</AccordionTrigger>
        <AccordionContent>
          <p>The calendar feature helps you manage your project timeline:</p>
          <ul className="list-disc list-inside mt-2">
            <li>View project deadlines and milestones</li>
            <li>Add personal or team events</li>
            <li>Sync with external calendars</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Task Management</AccordionTrigger>
        <AccordionContent>
          <p>Efficiently manage your tasks:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Create new tasks</li>
            <li>Assign tasks to team members</li>
            <li>Set due dates and priorities</li>
            <li>Track task progress</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Version Control with GitHub</AccordionTrigger>
        <AccordionContent>
          <p>ColGit integrates seamlessly with GitHub:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Connect your GitHub account</li>
            <li>Create and manage repositories</li>
            <li>Commit changes and create pull requests</li>
            <li>Review and merge code</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>AI-Powered Debugging</AccordionTrigger>
        <AccordionContent>
          <p>Use our AI debugger to solve coding issues:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Paste your code in the debugger</li>
            <li>Describe the issue you're facing</li>
            <li>Receive AI-generated suggestions and fixes</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

