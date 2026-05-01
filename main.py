import ollama
import requests
import os
from requests.auth import HTTPBasicAuth

# --- KONFIGURACE ---
SONAR_URL = "https://sonarcloud.io"
SONAR_TOKEN = "e350a2d03d3f3284f60ae59f18f8a0171843ae75"
PROJECT_KEY = "RickJurrasic_auto-saloon"
ORGANIZATION = "rickjurrasic"
MODEL = "qwen3-coder:30b"  # Změň na 14b nebo 7b pokud máš méně VRAM

def get_sonar_issues():
    url = f"{SONAR_URL}/api/issues/search"
    params = {"organization": ORGANIZATION, "componentKeys": PROJECT_KEY, "resolved": "false", "ps": "50"}
    try:
        response = requests.get(url, params=params, auth=HTTPBasicAuth(SONAR_TOKEN, ""))
        if response.status_code != 200:
            print(f"❌ Chyba API ({response.status_code}): {response.text}")
            return None
        return response.json().get('issues', [])
    except Exception as e:
        print(f"❌ Chyba komunikace: {e}")
        return None

def is_code_valid(original, fixed, file_path):
    """Kontrola, zda AI nevrátila poškozený nebo ořezaný kód."""
    if not fixed or len(fixed) < (len(original) * 0.3 if original else 10):
        return False

    # Validace pro Vue soubory
    if file_path.endswith('.vue'):
        if '<template' not in fixed: return False
        if '<script setup>' in original and '<script setup>' not in fixed:
            return False

    # Validace pro PHP soubory
    if file_path.endswith('.php'):
        if '<?php' not in fixed: return False
        if 'namespace' in original and 'namespace' not in fixed:
            return False

    return True

def fix_or_create_code(original_code, issue_msg, file_path):
    action = "fix the issue" if original_code else "CREATE a new file from scratch"

    prompt = f"""You are a Senior Full-Stack Developer.
    ### PROJECT: Auto-Saloon (Luxury Car Sales & Rental) ###
    - Current State: Migrating from Blade to Inertia.js + Vue 3.
    - GOAL: Complete the SPA architecture.

    ### STRICT RULES ###
    1. DOMAIN: Only use 'Car' and 'Booking' (for Test Rides). NEVER use 'Room' or 'Guest'.
    2. ARCHITECTURE: All new/fixed controllers MUST use 'Inertia::render()'.
    3. IMPORTS: Use 'App\\Models\\Car' for all car-related logic.
    4. VUE: Use <script setup> and Tailwind CSS v4.

    ### PATH ENFORCEMENT ###
    - Middleware: 'app/Http/Middleware/HandleInertiaRequests.php' (NOT in views).
    - Controllers: 'app/Http/Controllers/'.

    ### TASK ###
    Task: {action} for {file_path}.
    Sonar Issue: {issue_msg}

    CRITICAL: If the code contains 'Room', rewrite it immediately to use 'Car'.
    """

    try:
        response = ollama.chat(model=MODEL, messages=[{'role': 'user', 'content': prompt}])
        content = response['message']['content']
        # Očištění od případných markdown značek
        return content.replace("```vue", "").replace("```php", "").replace("```javascript", "").replace("```", "").strip()
    except Exception as e:
        print(f"❌ Chyba Ollamy: {e}")
        return original_code

def main():
    print(f"🚀 Startuji generátor (Model: {MODEL})")
    issues = get_sonar_issues()
    if not issues: return

    print(f"🔎 Nalezeno {len(issues)} problémů.")

    for issue in issues:
        raw_path = issue.get('component', '').split(':')[-1]
        issue_msg = issue.get('message', 'Neznámá chyba')

        if "bootstrap/ssr" in raw_path: continue

        target_file = os.path.normpath(raw_path)
        original_code = ""

        if os.path.exists(target_file):
            print(f"🛠️  Opravuji: {target_file}")
            with open(target_file, 'r', encoding='utf-8') as f:
                original_code = f.read()
        else:
            print(f"📁 Vytvářím nový: {target_file}")
            os.makedirs(os.path.dirname(target_file), exist_ok=True)

        fixed_code = fix_or_create_code(original_code, issue_msg, target_file)

        if is_code_valid(original_code, fixed_code, target_file):
            with open(target_file, 'w', encoding='utf-8') as f:
                f.write(fixed_code)
            print(f"✨ Hotovo.")
        else:
            print(f"⚠️ Změna zamítnuta: AI vrátila neúplný kód pro {target_file}.")

if __name__ == "__main__":
    main()
