import tkinter as tk
from tkinter import ttk

class ProjectManagement:
    def __init__(self, config):
        self.tasks = []
        self.config = config

    def view_tasks(self):
        task_window = tk.Toplevel()
        task_window.title(self.config.get_text("view_tasks"))
        
        for i, task in enumerate(self.tasks):
            ttk.Label(task_window, text=task).grid(row=i, column=0, sticky=tk.W)
        
        ttk.Button(task_window, text=self.config.get_text("add_task"), 
                  command=self.add_task).grid(row=len(self.tasks), column=0)

    def add_task(self):
        new_task = input(self.config.get_text("enter_new_task"))
        self.tasks.append(new_task)
        print(f"{self.config.get_text('task_added')} {new_task}")

    def sync_calendar(self):
        print(self.config.get_text("calendar_sync_not_implemented"))

