import os
from datetime import datetime

class Versioning:
    def __init__(self, config):
        self.repo_path = os.path.expanduser("~/ColGit_Repo")
        if not os.path.exists(self.repo_path):
            os.makedirs(self.repo_path)
        self.config = config

    def commit(self):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        commit_path = os.path.join(self.repo_path, f"commit_{timestamp}")
        os.makedirs(commit_path)
        print(f"{self.config.get_text('commit')}: {commit_path}")

    def branch(self):
        branch_name = input(f"{self.config.get_text('branch')}: ")
        branch_path = os.path.join(self.repo_path, f"branch_{branch_name}")
        os.makedirs(branch_path)
        print(f"{self.config.get_text('branch')}: {branch_name}")

    def merge(self):
        print(self.config.get_text("merge"))

    def connect_github(self):
        print(self.config.get_text("github_not_implemented"))

