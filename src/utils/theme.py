THEMES = {
    "dark": {
        "background": "#000000",
        "background_gradient": "linear-gradient(45deg, #000000, #1a237e, #4a148c)",
        "surface": "#121212",
        "primary": "#6200ea",
        "secondary": "#0091ea",
        "text": "#ffffff",
        "text_secondary": "#b3b3b3",
        "border": "#333333",
        "error": "#cf6679",
        "success": "#4caf50",
        "warning": "#ff9800"
    },
    "light": {
        "background": "#ffffff",
        "background_gradient": "linear-gradient(45deg, #f5f5f5, #e3f2fd, #e1bee7)",
        "surface": "#ffffff",
        "primary": "#6200ea",
        "secondary": "#0091ea",
        "text": "#000000",
        "text_secondary": "#666666",
        "border": "#e0e0e0",
        "error": "#b00020",
        "success": "#4caf50",
        "warning": "#ff9800"
    }
}

def get_theme_colors(theme_name):
    return THEMES.get(theme_name, THEMES["light"])

