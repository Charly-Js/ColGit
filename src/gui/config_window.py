import tkinter as tk
from tkinter import ttk, messagebox

class ConfigWindow:
    def __init__(self, parent, config):
        self.parent = parent
        self.config = config
        self.window = tk.Toplevel(parent)
        self.window.title(self.config.get_text("title"))
        self.window.geometry("400x300")
        self.window.resizable(False, False)
        self.setup_ui()

    def setup_ui(self):
        # Main frame
        main_frame = ttk.Frame(self.window, padding="20")
        main_frame.grid(row=0, column=0, sticky=(tk.W, tk.E, tk.N, tk.S))

        # Language selection
        ttk.Label(main_frame, text=self.config.get_text("language")).grid(row=0, column=0, sticky=tk.W, pady=5)
        self.lang_var = tk.StringVar(value=self.config.get_language())
        lang_combo = ttk.Combobox(main_frame, textvariable=self.lang_var, values=["English", "Español"], state="readonly")
        lang_combo.grid(row=0, column=1, sticky=tk.W, pady=5)

        # Theme selection
        ttk.Label(main_frame, text=self.config.get_text("theme")).grid(row=1, column=0, sticky=tk.W, pady=5)
        self.theme_var = tk.StringVar(value=self.config.get_theme())
        theme_combo = ttk.Combobox(main_frame, textvariable=self.theme_var, 
                                 values=[self.config.get_text("light"), self.config.get_text("dark")],
                                 state="readonly")
        theme_combo.grid(row=1, column=1, sticky=tk.W, pady=5)

        # Storage limit
        ttk.Label(main_frame, text=self.config.get_text("set_storage_limit")).grid(row=2, column=0, sticky=tk.W, pady=5)
        self.storage_var = tk.StringVar(value=str(self.config.get_storage_limit()))
        storage_entry = ttk.Entry(main_frame, textvariable=self.storage_var)
        storage_entry.grid(row=2, column=1, sticky=tk.W, pady=5)
        ttk.Label(main_frame, text="GB").grid(row=2, column=2, sticky=tk.W, pady=5)

        # Save button
        save_button = ttk.Button(main_frame, text=self.config.get_text("save"), command=self.save_config)
        save_button.grid(row=3, column=0, columnspan=2, pady=20)

    def save_config(self):
        try:
            # Validate storage limit
            storage_limit = float(self.storage_var.get())
            if storage_limit <= 0:
                raise ValueError("Storage limit must be positive")
            
            # Save all settings
            self.config.set_language(self.lang_var.get())
            self.config.set_theme(self.theme_var.get())
            self.config.set_storage_limit(storage_limit)
            
            # Close window
            self.window.destroy()
            
            # Restart application to apply changes
            self.parent.destroy()
            from gui.main_window import start_app
            start_app()
            
        except ValueError as e:
            messagebox.showerror("Error", str(e))

