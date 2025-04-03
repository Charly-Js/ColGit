import tkinter as tk
from tkinter import ttk, messagebox
from tkcalendar import Calendar
from datetime import datetime
import json
import os
from utils.theme import get_theme_colors

class MainWindow:
    def __init__(self, root, config, versioning, project_management):
        self.root = root
        self.config = config
        self.versioning = versioning
        self.project_management = project_management
        
        # Configure the window
        self.root.title(self.config.get_text("title"))
        self.root.state('zoomed')  # Start maximized
        self.setup_theme()
        self.setup_ui()
        self.load_reminders()

    def setup_theme(self):
        colors = get_theme_colors(self.config.get_theme())
        
        style = ttk.Style()
        style.configure("App.TFrame", background=colors["background"])
        style.configure("App.TLabel", 
                       background=colors["surface"],
                       foreground=colors["text"])
        style.configure("App.TButton",
                       background=colors["primary"],
                       foreground=colors["text"])
        
        # Configure root window background
        self.root.configure(bg=colors["background"])

    def setup_ui(self):
        # Main container with gradient background
        self.main_container = ttk.Frame(self.root, style="App.TFrame")
        self.main_container.pack(fill=tk.BOTH, expand=True)

        # Top bar with branding
        self.setup_top_bar()

        # Content area with three columns
        self.content = ttk.Frame(self.main_container, style="App.TFrame")
        self.content.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # Configure grid columns
        self.content.grid_columnconfigure(0, weight=1)
        self.content.grid_columnconfigure(1, weight=2)
        self.content.grid_columnconfigure(2, weight=1)

        # Left panel - Version Control
        self.setup_version_control()

        # Center panel - Calendar and Tasks
        self.setup_calendar_panel()

        # Right panel - Notes and Reminders
        self.setup_notes_panel()

    def setup_top_bar(self):
        top_bar = ttk.Frame(self.main_container, style="App.TFrame")
        top_bar.pack(fill=tk.X, padx=10, pady=5)

        # Logo and branding
        brand_label = ttk.Label(top_bar, 
                              text="ColGit",
                              font=('Helvetica', 24, 'bold'),
                              style="App.TLabel")
        brand_label.pack(side=tk.LEFT, padx=10)

        # Settings button
        settings_btn = ttk.Button(top_bar,
                                text=self.config.get_text("settings"),
                                style="App.TButton",
                                command=self.open_settings)
        settings_btn.pack(side=tk.RIGHT, padx=10)

        # Developed by label
        developed_by = ttk.Label(top_bar,
                               text="Developed by YouBriefSoft",
                               font=('Helvetica', 10),
                               style="App.TLabel")
        developed_by.pack(side=tk.RIGHT, padx=10)

    def setup_version_control(self):
        version_frame = ttk.Frame(self.content, style="App.TFrame")
        version_frame.grid(row=0, column=0, sticky="nsew", padx=10)

        # Version control header
        ttk.Label(version_frame,
                 text=self.config.get_text("version_control"),
                 font=('Helvetica', 16, 'bold'),
                 style="App.TLabel").pack(pady=10)

        # Version control buttons
        for action in ["commit", "branch", "merge"]:
            btn = ttk.Button(version_frame,
                           text=self.config.get_text(action),
                           style="App.TButton",
                           command=getattr(self.versioning, action))
            btn.pack(fill=tk.X, pady=5)

        # GitHub integration
        ttk.Button(version_frame,
                  text=self.config.get_text("connect_github"),
                  style="App.TButton",
                  command=self.versioning.connect_github).pack(fill=tk.X, pady=5)

    def setup_calendar_panel(self):
        calendar_frame = ttk.Frame(self.content, style="App.TFrame")
        calendar_frame.grid(row=0, column=1, sticky="nsew", padx=10)

        # Calendar header
        ttk.Label(calendar_frame,
                 text=self.config.get_text("calendar"),
                 font=('Helvetica', 16, 'bold'),
                 style="App.TLabel").pack(pady=10)

        # Calendar widget
        self.calendar = Calendar(calendar_frame,
                               selectmode='day',
                               year=datetime.now().year,
                               month=datetime.now().month,
                               day=datetime.now().day)
        self.calendar.pack(pady=10)
        self.calendar.bind("<<CalendarSelected>>", self.on_date_selected)

        # Task list
        self.task_list = tk.Listbox(calendar_frame,
                                   bg=get_theme_colors(self.config.get_theme())["surface"],
                                   fg=get_theme_colors(self.config.get_theme())["text"],
                                   selectmode=tk.SINGLE)
        self.task_list.pack(fill=tk.BOTH, expand=True, pady=10)

        # Add task button
        ttk.Button(calendar_frame,
                  text=self.config.get_text("add_task"),
                  style="App.TButton",
                  command=self.add_task).pack(fill=tk.X, pady=5)

    def setup_notes_panel(self):
        notes_frame = ttk.Frame(self.content, style="App.TFrame")
        notes_frame.grid(row=0, column=2, sticky="nsew", padx=10)

        # Notes header
        ttk.Label(notes_frame,
                 text=self.config.get_text("notes"),
                 font=('Helvetica', 16, 'bold'),
                 style="App.TLabel").pack(pady=10)

        # Notes text area
        self.notes_text = tk.Text(notes_frame,
                                height=10,
                                bg=get_theme_colors(self.config.get_theme())["surface"],
                                fg=get_theme_colors(self.config.get_theme())["text"])
        self.notes_text.pack(fill=tk.BOTH, expand=True, pady=10)

        # Save note button
        ttk.Button(notes_frame,
                  text=self.config.get_text("save_note"),
                  style="App.TButton",
                  command=self.save_note).pack(fill=tk.X, pady=5)

    def on_date_selected(self, event):
        # Update tasks and notes for selected date
        selected_date = self.calendar.get_date()
        self.load_tasks(selected_date)
        self.load_notes(selected_date)

    def add_task(self):
        # Add new task dialog
        task = messagebox.askstring(self.config.get_text("add_task"),
                                  self.config.get_text("enter_task"))
        if task:
            self.task_list.insert(tk.END, task)
            self.save_tasks()

    def save_note(self):
        # Save current note
        selected_date = self.calendar.get_date()
        note_content = self.notes_text.get("1.0", tk.END).strip()
        
        if note_content:
            self.save_note_to_file(selected_date, note_content)
            messagebox.showinfo(self.config.get_text("success"),
                              self.config.get_text("note_saved"))

    def load_reminders(self):
        # Load saved reminders
        reminders_file = os.path.join(os.path.expanduser("~"), "ColGit_Reminders.json")
        if os.path.exists(reminders_file):
            with open(reminders_file, 'r') as f:
                self.reminders = json.load(f)
        else:
            self.reminders = {}

    def save_note_to_file(self, date, content):
        notes_dir = os.path.join(os.path.expanduser("~"), "ColGit_Notes")
        os.makedirs(notes_dir, exist_ok=True)
        
        with open(os.path.join(notes_dir, f"{date}.txt"), 'w') as f:
            f.write(content)

    def load_notes(self, date):
        notes_file = os.path.join(os.path.expanduser("~"),
                                 "ColGit_Notes",
                                 f"{date}.txt")
        
        self.notes_text.delete("1.0", tk.END)
        if os.path.exists(notes_file):
            with open(notes_file, 'r') as f:
                self.notes_text.insert("1.0", f.read())

    def open_settings(self):
        from gui.config_window import ConfigWindow
        ConfigWindow(self.root, self.config)

    def change_language(self, event=None):
        self.config.set_language(self.lang_var.get())
        self.root.destroy()
        start_app()

    def set_storage_limit(self):
        pass

def start_app():
    root = tk.Tk()
    config = Config()
    versioning = Versioning(config)
    project_management = ProjectManagement(config)
    app = MainWindow(root, config, versioning, project_management)
    root.mainloop()

