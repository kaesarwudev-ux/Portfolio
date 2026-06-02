#!/usr/bin/env python3
"""
╔════════════════════════════════════════════════════════════╗
║  KWDEV • Kaesar Wu Terminal Portfolio                      ║
║  Developer & Writer • kwdev.vercel.app                    ║
╚════════════════════════════════════════════════════════════╝
"""

import os
import sys
import webbrowser

try:
    from colorama import init, Fore, Style
except ImportError:
    print("Installing colorama for terminal colors...")
    os.system(f"{sys.executable} -m pip install colorama")
    from colorama import init, Fore, Style

init(autoreset=True)

# ═══════════════════════════════════════════════════════════
# IDENTITY
# ═══════════════════════════════════════════════════════════
IDENTITY = {
    "name": "Kaesar Wu",
    "github": "kaesarwudev-ux",
    "email": "kaesarwudev@gmail.com",
    "role": "Developer & Writer",
    "portfolio_url": "https://kwdev.vercel.app",
    "available": True
}

SKILLS = {
    "Languages": ["Python", "JavaScript", "C++", "HTML/CSS", "SQL"],
    "Frameworks": ["React", "Node.js", "Flask", "Tailwind CSS"],
    "Tools": ["Git", "Docker", "VS Code"],
    "Concepts": ["Frontend Architecture", "API Design", "Technical Writing"]
}

PROJECTS = [
    {
        "name": "Primatetype-Project",
        "lang": "C++ and HTML/CSS",
        "desc": "Collaborative project with Wilsonwei123, BBI-dev",
        "url": "https://github.com/KaesarWU/Primatetype-Project"
    },
]

COMMANDS = {
    "help": "Show available commands",
    "about": "About Kaesar Wu",
    "skills": "Technical skills & tools",
    "projects": "Featured projects",
    "contact": "Contact information",
    "github": "GitHub repositories",
    "open [url]": "Open a link (portfolio|github|kwdev)",
    "clear": "Clear terminal screen",
    "exit": "Exit terminal"
}

LINKS = {
    "portfolio": IDENTITY["portfolio_url"],
    "github": f"https://github.com/{IDENTITY['github']}",
    "kwdev": IDENTITY["portfolio_url"],
}

def get_kwdev_banner():
    """Return the KWDEV ASCII banner"""
    return f"""{Fore.CYAN}
  ██╗  ██╗   ██╗    ██╗   ██████╗   ███████╗  ██╗   ██╗
  ██║ ██╔╝   ██║    ██║   ██╔══██╗  ██╔════╝  ██║   ██║
  █████╔╝    ██║ █╗ ██║   ██║  ██║  █████╗    ██║   ██║
  ██╔═██╗    ██║███╗██║   ██║  ██║  ██╔══╝    ╚██╗ ██╔╝
  ██║  ██╗   ╚███╔███╔╝   ██████╔╝  ███████╗   ╚████╔╝
  ╚═╝  ╚═╝    ╚══╝╚══╝    ╚═════╝   ╚══════╝    ╚═══╝
{Style.RESET_ALL}"""

def print_header():
    """Display banner and header"""
    print(get_kwdev_banner())
    print(f"{Fore.CYAN}Developer & Writer • kwdev.vercel.app{Style.RESET_ALL}")
    print(f"{Fore.LIGHTBLACK_EX}Type 'help' to get started.{Style.RESET_ALL}\n")

def print_section(title: str):
    """Print section header"""
    print(f"\n{Fore.CYAN}> {title}{Style.RESET_ALL}\n")

def print_item(label: str, value: str):
    """Print labeled item"""
    print(f"  {Fore.LIGHTBLUE_EX}•{Style.RESET_ALL} {label}: {value}")

def cmd_help():
    """Show available commands"""
    print_section("Available Commands")
    max_len = max(len(cmd) for cmd in COMMANDS.keys())
    for cmd, desc in sorted(COMMANDS.items()):
        padding = " " * (max_len - len(cmd) + 2)
        print(f"  {Fore.YELLOW}{cmd}{Style.RESET_ALL}{padding}{desc}")
    print()

def cmd_about():
    """About Kaesar Wu"""
    print_section("About")
    print_item("Name", IDENTITY['name'])
    print_item("Role", IDENTITY['role'])
    print_item("Email", IDENTITY['email'])
    print_item("Portfolio", IDENTITY['portfolio_url'])
    print_item("Status", "🟢 Available" if IDENTITY['available'] else "🔴 Busy")
    print()

def cmd_skills():
    """Show skills"""
    print_section("Technical Skills")
    for category, items in SKILLS.items():
        print(f"  {Fore.YELLOW}{category}:{Style.RESET_ALL}")
        for item in items:
            print(f"    {Fore.GREEN}✓{Style.RESET_ALL} {item}")
        print()

def cmd_projects():
    """Show projects"""
    print_section("Featured Projects")
    for i, proj in enumerate(PROJECTS, 1):
        print(f"  {Fore.CYAN}[{i}] {proj['name']}{Style.RESET_ALL}")
        print(f"      Language: {proj['lang']}")
        print(f"      Desc: {proj['desc']}")
        print(f"      {Fore.BLUE}Link: {proj['url']}{Style.RESET_ALL}")
        print()

def cmd_contact():
    """Contact information"""
    print_section("Contact")
    print_item("Email", IDENTITY['email'])
    print_item("GitHub", f"github.com/{IDENTITY['github']}")
    print_item("Portfolio", IDENTITY['portfolio_url'])
    print()

def cmd_github():
    """GitHub info"""
    print_section("GitHub")
    print(f"  Profile: {Fore.BLUE}github.com/{IDENTITY['github']}{Style.RESET_ALL}")
    print(f"  Languages: Python, C++, JavaScript")
    print(f"  Focus: Full-stack development\n")

def cmd_open(link_name: str):
    """Open a link in browser"""
    link = LINKS.get(link_name.lower())
    if link:
        print(f"\n{Fore.GREEN}✓ Opening {link}{Style.RESET_ALL}\n")
        webbrowser.open(link)
    else:
        available = ", ".join(LINKS.keys())
        print(f"\n{Fore.RED}✗ Unknown link '{link_name}'.\n  Available: {available}{Style.RESET_ALL}\n")

def cmd_clear():
    """Clear screen"""
    os.system('clear' if os.name == 'posix' else 'cls')
    print_header()

def cmd_exit():
    """Exit terminal"""
    print(f"\n{Fore.CYAN}Thanks for visiting.{Style.RESET_ALL}\n")
    sys.exit(0)

def parse_command(user_input: str):
    """Parse and execute command"""
    parts = user_input.strip().lower().split(maxsplit=1)
    if not parts:
        return
    
    cmd = parts[0]
    arg = parts[1] if len(parts) > 1 else None
    
    if cmd == "help":
        cmd_help()
    elif cmd == "about":
        cmd_about()
    elif cmd == "skills":
        cmd_skills()
    elif cmd == "projects":
        cmd_projects()
    elif cmd == "contact":
        cmd_contact()
    elif cmd == "github":
        cmd_github()
    elif cmd == "open":
        if arg:
            cmd_open(arg)
        else:
            print(f"\n{Fore.YELLOW}Usage: open [portfolio|github|kwdev]{Style.RESET_ALL}\n")
    elif cmd == "clear":
        cmd_clear()
    elif cmd in ["exit", "quit", "q"]:
        cmd_exit()
    else:
        print(f"\n{Fore.RED}✗ Unknown command: '{cmd}'{Style.RESET_ALL}")
        print(f"{Fore.LIGHTBLACK_EX}Type 'help' for available commands.{Style.RESET_ALL}\n")

def main():
    """Main terminal loop"""
    if os.name == 'posix':
        os.system('clear')
    else:
        os.system('cls')
    
    print_header()
    
    try:
        while True:
            user_input = input(f"{Fore.CYAN}kwdev{Style.RESET_ALL}{Fore.LIGHTBLACK_EX}@{Style.RESET_ALL}{Fore.YELLOW}terminal{Style.RESET_ALL}{Fore.LIGHTBLACK_EX}:~${Style.RESET_ALL} ")
            if user_input.strip():
                parse_command(user_input)
    except KeyboardInterrupt:
        print(f"\n\n{Fore.YELLOW}Interrupted.{Style.RESET_ALL}")
        sys.exit(0)
    except EOFError:
        print(f"\n{Fore.CYAN}Thanks for visiting.{Style.RESET_ALL}")
        sys.exit(0)

if __name__ == "__main__":
    main()