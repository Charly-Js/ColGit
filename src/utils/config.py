import json
import os
from .translations import get_translation

class Config:
    def __init__(self):
        self.config_path = os.path.expanduser("~/ColGit_Config.json")
        self.config = self.load_config()

    def load_config(self):
        if os.path.exists(self.config_path):
            with open(self.config_path, 'r') as f:
                return json.load(f)
        else:
            return {"language": "English", "theme": "Light", "storage_limit": 10}

    def save_config(self):
        with open(self.config_path, 'w') as f:
            json.dump(self.config, f)

    def get_language(self):
        return self.config.get("language", "English")

    def set_language(self, language):
        self.config["language"] = language
        self.save_config()

    def get_theme(self):
        return self.config.get("theme", "Light")

    def set_theme(self, theme):
        self.config["theme"] = theme
        self.save_config()

    def get_storage_limit(self):
        return self.config.get("storage_limit", 10)

    def set_storage_limit(self, limit):
        self.config["storage_limit"] = limit
        self.save_config()

    def get_available_space(self):
        return self.get_storage_limit()

    def get_text(self, key):
        return get_translation(key, self.get_language())

