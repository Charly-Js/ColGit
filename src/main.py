import tkinter as tk
from utils.config import Config
from core.versioning import Versioning
from core.project_management import ProjectManagement
from gui.main_window import MainWindow

def start_app():
    root = tk.Tk()
    config = Config()
    versioning = Versioning(config)
    project_management = ProjectManagement(config)
    MainWindow(root, config, versioning, project_management)
    root.mainloop()

if __name__ == "__main__":
    start_app()

