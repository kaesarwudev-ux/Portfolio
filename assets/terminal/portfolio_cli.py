#!/usr/bin/env python3
"""
╔════════════════════════════════════════════════════════════╗
║  KWDEV • Kaesar Wu Terminal Portfolio (Windows 11)        ║
║  🏎️ DIE-HARD MAX VERSTAPPEN FAN • #1 Fan Since Forever    ║
║  Eastern Times Junior Journalist • Macleans College       ║
╚════════════════════════════════════════════════════════════╝
Very Buggy - Please Ignore All Errors - Just for fun and a bit of a joke
"""

import os
import sys
import platform
import time
import webbrowser

try:
    from colorama import init, Fore, Back, Style
except ImportError:
    print("Installing colorama for terminal colors...")
    os.system(f"{sys.executable} -m pip install colorama")
    from colorama import init, Fore, Back, Style

init(autoreset=True)

if not hasattr(Fore, "ORANGE"):
    Fore.ORANGE = Fore.LIGHTYELLOW_EX
if not hasattr(Fore, "GOLD"):
    Fore.GOLD = Fore.YELLOW
if not hasattr(Fore, "PINK"):
    Fore.PINK = Fore.LIGHTMAGENTA_EX

# ═══════════════════════════════════════════════════════════
# EXACT IDENTITY - IMMUTABLE CONSTANTS
# ═══════════════════════════════════════════════════════════
IDENTITY = {
    "name": "Kaesar Wu",  # EXACT spelling - NEVER alter
    "github": "kaesarwudev-ux",
    "email": "kaesarwudev@gmail.com",
    "ide": "Visual Studio Code",
    "instagram": "kaesarwudev",
    "os": "Windows 11",
    "school": "Macleans College",
    "previous_school": "Bucklands Beach Intermediate School",
    "role": "Eastern Times Junior Journalist (NZ)",
    "awards": ["🏆 2025 ANZAC Essay Competition Winner"],
    "interests": [
        "Physics (Particularly Theoretical Physics) ⚛️",
        "Formula 1 🏎️",
        "Cars 🚗",
        "Table Tennis 🏓"
    ],
    "portfolio_url": "https://kwdev.vercel.app",  # ✅ CORRECT URL
    "verstappen_status": "DIE-HARD FAN 🔥🏆🔥 #MaxVerstappen #SIMPLYLOVELY",
    "available": True
}


def get_kwdev_banner():
    """Return the exact KWDEV ASCII banner"""
    return f"""
{Fore.CYAN}██╗  ██╗   ██╗    ██╗   ██████╗   ███████╗  ██╗   ██╗{Style.RESET_ALL}
{Fore.CYAN}██║ ██╔╝   ██║    ██║   ██╔══██╗  ██╔════╝  ██║   ██║{Style.RESET_ALL}
{Fore.CYAN}█████╔╝    ██║ █╗ ██║   ██║  ██║  █████╗    ██║   ██║{Style.RESET_ALL}
{Fore.CYAN}██╔═██╗    ██║███╗██║   ██║  ██║  ██╔══╝    ╚██╗ ██╔╝{Style.RESET_ALL}
{Fore.CYAN}██║  ██╗   ╚███╔███╔╝   ██████╔╝  ███████╗   ╚████╔╝{Style.RESET_ALL}
{Fore.CYAN}╚═╝  ╚═╝    ╚══╝╚══╝    ╚═════╝   ╚══════╝    ╚═══╝{Style.RESET_ALL}
"""

VERSTAPPEN_QUOTES = [
    "🏎️ 'SIMPLY LOVELY",
    "🧡 I am the best driver because I believe that I am the best, because every driver needs to think like that, otherwise it's better to stay at home.",
    "🏆 The only place that matters is first.",
    "🔥 'I was never Mad Max. I was just Max who was trying to get the best result for the team'",
    "🇳🇱 Dutch lion roaring through the grid! 🦁"
]

COMMANDS = {
    "help": {"desc": "Show available commands", "func": "cmd_help"},
    "about": {"desc": "About Kaesar Wu", "func": "cmd_about"},
    "skills": {"desc": "Technical skills & tools", "func": "cmd_skills"},
    "projects": {"desc": "Featured projects", "func": "cmd_projects"},
    "journalism": {"desc": "Eastern Times & Macleans News articles", "func": "cmd_journalism"},
    "awards": {"desc": "Achievements & competitions", "func": "cmd_awards"},
    "interests": {"desc": "Personal interests & hobbies", "func": "cmd_interests"},
    "max": {"desc": "MAX VERSTAPPEN MODE ACTIVATED", "func": "cmd_max"},
    "contact": {"desc": "Contact information", "func": "cmd_contact"},
    "social": {"desc": "Social media links", "func": "cmd_social"},
    "github": {"desc": "GitHub repositories", "func": "cmd_github"},
    "clear": {"desc": "Clear terminal screen", "func": "cmd_clear"},
    "exit": {"desc": "Exit portfolio", "func": "cmd_exit"},
    "whoami": {"desc": "Display current identity", "func": "cmd_whoami"},
    "neofetch": {"desc": "System & identity summary", "func": "cmd_neofetch"},
    "kwdev": {"desc": "Open kwdev.vercel.app", "func": "cmd_kwdev"},
    "f1": {"desc": "F1 standings & Max updates", "func": "cmd_f1"},
}

# ═══════════════════════════════════════════════════════════
# SKILLS & PROJECTS DATA
# ═══════════════════════════════════════════════════════════
SKILLS = {
    "Languages": ["Python", "JavaScript", "C++", "HTML/CSS", "SQL"],
    "Frameworks": ["React", "Node.js", "Flask", "Tailwind CSS"],
    "Tools": [IDENTITY["ide"], "Git", "Docker", "Ollama", "VS Code"],
    "Concepts": ["Frontend Architecture", "API Design", "Technical Writing", "Physics Modeling"]
}

PROJECTS = [
    {
        "name": "Primatetype-Project",
        "lang": "C++",
        "desc": "Collaborative project with Wilsonwei123, BBI-dev",
        "url": "https://github.com/KaesarWU/Primatetype-Project"
    },
]

JOURNALISM = [
    {
        "title": "A 'tricky' Card Game – Bridge",
        "pub": "Macleans News",
        "date": "2026-04-19",
        "url": "https://macleansnews.nz/2026/04/19/a-tricky-card-game-bridge/"
    },
    {
        "title": "2026 South-East Auckland Shakespeare Festival",
        "pub": "Macleans News", 
        "date": "2026-05-07",
        "url": "https://macleansnews.nz/2026/05/07/2026-south-east-auckland-shakespeare-festival/"
    },
    {
        "title": "Community patrollers help to keep us safe",
        "pub": "Eastern Times",
        "date": "2025-10-05",
        "url": "https://www.times.co.nz/news/community-patrollers-help-to-keep-us-safe/"
    },
    {
        "title": "Pupil to deliver speech on 'Anzac spirit'",
        "pub": "Eastern Times",
        "date": "2025-04-23",
        "note": "🏆 ANZAC Essay Competition Winner",
        "url": "https://www.times.co.nz/junior-journalists/pupil-to-deliver-speech-on-anzac-spirit/"
    }
]

def print_header():
    """Display KWDEV banner header"""
    print(get_kwdev_banner())
    print(f"{Fore.ORANGE}  🏎️  DIE-HARD MAX VERSTAPPEN FAN  🏆{Style.RESET_ALL}")
    print(f"{Fore.LIGHTBLACK_EX}  Kaesar Wu • kwdev.vercel.app • Windows 11{Style.RESET_ALL}\n")

def print_section(title: str):
    """Print section divider"""
    print(f"\n{Fore.MAGENTA}┌{'─'*60}┐{Style.RESET_ALL}")
    print(f"{Fore.MAGENTA}│{Style.RESET_ALL} {Fore.WHITE}❯ {title}{Style.RESET_ALL}{' '*(57-len(title))}{Fore.MAGENTA}│{Style.RESET_ALL}")
    print(f"{Fore.MAGENTA}└{'─'*60}┘{Style.RESET_ALL}\n")

def print_item(label: str, value: str, indent: int = 2):
    """Print labeled item"""
    spacing = "  " * indent
    print(f"{spacing}{Fore.LIGHTBLUE_EX}•{Style.RESET_ALL} {Fore.WHITE}{label}:{Style.RESET_ALL} {value}")

def typewriter(text: str, delay: float = 0.01):
    """Typewriter effect"""
    for char in text:
        print(char, end='', flush=True)
        time.sleep(delay)
    print()

def cmd_help():
    """Show available commands"""
    print_section("Available Commands")
    max_len = max(len(cmd) for cmd in COMMANDS.keys())
    for cmd, info in sorted(COMMANDS.items()):
        padding = " " * (max_len - len(cmd))
        emoji = "🏎️" if cmd == "max" else "→"
        print(f"  {Fore.YELLOW}{cmd}{Style.RESET_ALL}{padding}  {Fore.WHITE}{emoji}{Style.RESET_ALL}  {info['desc']}")
    print(f"\n{Fore.LIGHTBLACK_EX}💡 Pro tip: Type 'max' for Verstappen mode{Style.RESET_ALL}")

def cmd_about():
    """About Kaesar Wu"""
    print_section(f"About {IDENTITY['name']}")
    print(f"  {Fore.WHITE}🎓 Student @ {IDENTITY['school']}{Style.RESET_ALL}")
    print(f"  {Fore.WHITE}📰 {IDENTITY['role']}{Style.RESET_ALL}")
    print(f"  {Fore.WHITE}💻 Primary IDE: {IDENTITY['ide']}{Style.RESET_ALL}")
    print(f"  {Fore.WHITE}🖥️  OS: {IDENTITY['os']}{Style.RESET_ALL}")
    print(f"\n  {Fore.ORANGE}🏎️ Verstappen Status: {IDENTITY['verstappen_status']}{Style.RESET_ALL}")
    print(f"\n  {Fore.LIGHTBLACK_EX}\"Professionally Unemployed. Available for collaborations.\"{Style.RESET_ALL}")
    print(f"\n  {Fore.CYAN}Portfolio:{Style.RESET_ALL} {IDENTITY['portfolio_url']}")
    print(f"  {Fore.CYAN}Status:{Style.RESET_ALL} {'🟢 Available' if IDENTITY['available'] else '🔴 Busy'}")

def cmd_skills():
    """Technical skills"""
    print_section("Technical Skills")
    for category, items in SKILLS.items():
        print(f"  {Fore.YELLOW}{category}:{Style.RESET_ALL}")
        for item in items:
            print(f"    {Fore.GREEN}✓{Style.RESET_ALL} {item}")
        print()

def cmd_projects():
    """Featured projects"""
    print_section("Featured Projects")
    for i, proj in enumerate(PROJECTS, 1):
        print(f"  {Fore.CYAN}[{i}] {proj['name']}{Style.RESET_ALL}")
        print(f"      {Fore.LIGHTBLACK_EX}Language:{Style.RESET_ALL} {proj['lang']}")
        print(f"      {Fore.LIGHTBLACK_EX}Desc:{Style.RESET_ALL} {proj['desc']}")
        if proj['url'] != 'local':
            print(f"      {Fore.BLUE}🔗 {proj['url']}{Style.RESET_ALL}")
        print()

def cmd_journalism():
    """Journalism work"""
    print_section("Journalism Portfolio - Eastern Times & Macleans News")
    for article in JOURNALISM:
        print(f"  {Fore.YELLOW}📝 {article['title']}{Style.RESET_ALL}")
        print(f"      {Fore.LIGHTBLACK_EX}Publication:{Style.RESET_ALL} {article['pub']}")
        print(f"      {Fore.LIGHTBLACK_EX}Date:{Style.RESET_ALL} {article['date']}")
        if 'note' in article:
            print(f"      {Fore.GREEN}★ {article['note']}{Style.RESET_ALL}")
        print(f"      {Fore.BLUE}🔗 {article['url']}{Style.RESET_ALL}")
        print()

def cmd_awards():
    """Achievements"""
    print_section("Awards & Achievements")
    for award in IDENTITY['awards']:
        print(f"  {Fore.GOLD}🏆 {award}{Style.RESET_ALL}")
    print(f"\n  {Fore.LIGHTBLACK_EX}Additional:{Style.RESET_ALL}")
    print(f"    • Anzac Day Dawn Service Speaker (Howick, 2025)")
    print(f"    • Published Journalist: Macleans News, Eastern Times")

def cmd_interests():
    """Personal interests"""
    print_section("Interests & Hobbies")
    for interest in IDENTITY['interests']:
        print(f"  {Fore.WHITE}• {interest}{Style.RESET_ALL}")
    print(f"\n  {Fore.ORANGE}🏎️ MAX VERSTAPPEN: {IDENTITY['verstappen_status']}{Style.RESET_ALL}")
    print(f"  {Fore.YELLOW}🔭 Wanna be a Theoretical Physicist{Style.RESET_ALL}")

def cmd_max():
    """🏎️ MAX VERSTAPPEN MODE 🏆"""
    print_section(f"{Fore.ORANGE}🏎️ MAX VERSTAPPEN DIE-HARD MODE ACTIVATED (Stats as of 27th May 2026) 🏆{Style.RESET_ALL}")
    print(f"  {Fore.ORANGE}╔{'═'*58}╗{Style.RESET_ALL}")
    print(f"  {Fore.ORANGE}║{Style.RESET_ALL}  {Fore.WHITE}MAX EMILIAN VERSTAPPEN{Style.RESET_ALL}  {Fore.ORANGE}║{Style.RESET_ALL}")
    print(f"  {Fore.ORANGE}║{Style.RESET_ALL}  {Fore.LIGHTBLACK_EX}#33 • Red Bull Racing • Dutch Lion{Style.RESET_ALL}  {Fore.ORANGE}║{Style.RESET_ALL}")
    print(f"  {Fore.ORANGE}╚{'═'*58}╝{Style.RESET_ALL}")
    print(f"\n  {Fore.GOLD}🏆 Championships:{Style.RESET_ALL} 2021 • 2022 • 2023 • 2024")
    print(f"  {Fore.GOLD}🏁 Career Wins:{Style.RESET_ALL} 71 (and counting...)")
    print(f"  {Fore.GOLD}🔥 Podiums: {Style.RESET_ALL} 128")
    print(f"  {Fore.GOLD}🔥 Pole Positions:{Style.RESET_ALL} 48")
    print(f"  {Fore.GOLD}🔥 Fastest Laps:{Style.RESET_ALL} 37")
    print(f"\n  {Fore.ORANGE}Max Verstappen Quotes:{Style.RESET_ALL}")
    import random
    for quote in random.sample(VERSTAPPEN_QUOTES, 3):
        print(f"    {Fore.LIGHTBLACK_EX}❝{Style.RESET_ALL}{Fore.WHITE}{quote}{Style.RESET_ALL}{Fore.LIGHTBLACK_EX}❞{Style.RESET_ALL}")
    print(f"  {Fore.LIGHTBLACK_EX}Type 'f1' for current season updates{Style.RESET_ALL}")

def cmd_f1():
    """F1 updates"""
    print_section("🏎️ Formula 1 • Max Verstappen Updates")
    print(f"  {Fore.ORANGE}Current Champion:{Style.RESET_ALL} Lando Norris")
    print(f"  {Fore.ORANGE}Team:{Style.RESET_ALL} Oracle Red Bull Racing")
    print(f"  {Fore.ORANGE}Car:{Style.RESET_ALL} RB22")
    print(f"\n  {Fore.LIGHTBLACK_EX}📺 Next Race: Check formula1.com{Style.RESET_ALL}")
    print(f"  {Fore.LIGHTBLACK_EX}📊 Live Standings: espn.com/f1{Style.RESET_ALL}")
    print(f"\n  {Fore.ORANGE}🏆 Kaesar's Prediction:{Style.RESET_ALL} Max takes #5 🙌")

def cmd_contact():
    """Contact information"""
    print_section("Contact Information")
    print_item("Email", IDENTITY['email'])
    print_item("GitHub", f"github.com/{IDENTITY['github']}")
    print_item("Instagram", f"@{IDENTITY['instagram']}")
    print_item("Portfolio", IDENTITY['portfolio_url'])
    print(f"\n  {Fore.LIGHTBLACK_EX}💬 Open to collaborations, journalism projects, & tech discussions{Style.RESET_ALL}")
    print(f"  {Fore.ORANGE}🏎️ Also happy to chat F1, Max Verstappen Glaze!{Style.RESET_ALL}")

def cmd_social():
    """Social links"""
    print_section("Social Media")
    print(f"  {Fore.PINK}📸 Instagram:{Style.RESET_ALL} https://instagram.com/{IDENTITY['instagram']}")
    print(f"  {Fore.BLUE}💼 GitHub:{Style.RESET_ALL} https://github.com/{IDENTITY['github']}")
    print(f"  {Fore.CYAN}🌐 Portfolio:{Style.RESET_ALL} {IDENTITY['portfolio_url']}")
    print(f"  {Fore.LIGHTBLACK_EX}📰 Eastern Times:{Style.RESET_ALL} https://www.times.co.nz/tag/kaesar-wu/")
    print(f"  {Fore.ORANGE}🏎️ F1:{Style.RESET_ALL} https://www.formula1.com/en/drivers/max-verstappen.html")

def cmd_github():
    """GitHub info"""
    print_section(f"GitHub: @{IDENTITY['github']}")
    print(f"  {Fore.LIGHTBLACK_EX}Repositories:{Style.RESET_ALL} 17+ (Public)")
    print(f"  {Fore.LIGHTBLACK_EX}Languages:{Style.RESET_ALL} Python, C++, JavaScript")
    print(f"  {Fore.LIGHTBLACK_EX}Focus:{Style.RESET_ALL} Learning systems programming & web dev")
    print(f"\n  {Fore.YELLOW}Popular Repos:{Style.RESET_ALL}")
    print(f"    • Primatetype-Project (C++)")
    print(f"    • SocraTask (JavaScript)")
    print(f"    • Cool-Math-Games (Educational)")
    print(f"\n  {Fore.BLUE}→ https://github.com/{IDENTITY['github']}{Style.RESET_ALL}")

def cmd_clear():
    """Clear screen"""
    os.system('cls' if platform.system() == 'Windows' else 'clear')
    print_header()
    cmd_neofetch()

def cmd_exit():
    """Exit application"""
    print(f"\n{Fore.ORANGE}╭{'─'*60}╮{Style.RESET_ALL}")
    print(f"{Fore.ORANGE}│{Style.RESET_ALL}  {Fore.WHITE}🏎️ Thanks for visiting KWDEV! Max would be proud. 👋{Style.RESET_ALL}  {Fore.ORANGE}│{Style.RESET_ALL}")
    print(f"{Fore.ORANGE}│{Style.RESET_ALL}  {Fore.LIGHTBLACK_EX}Type 'exit' again to close, or 'max' for one more Verstappen quote{Style.RESET_ALL}  {Fore.ORANGE}│{Style.RESET_ALL}")
    print(f"{Fore.ORANGE}╰{'─'*60}╯{Style.RESET_ALL}\n")
    return True

def cmd_whoami():
    """Display identity"""
    print(f"\n{Fore.YELLOW}❯{Style.RESET_ALL} {Fore.WHITE}{IDENTITY['name']}{Style.RESET_ALL}")
    print(f"{Fore.YELLOW}❯{Style.RESET_ALL} {IDENTITY['role']}")
    print(f"{Fore.YELLOW}❯{Style.RESET_ALL} {IDENTITY['school']} • {IDENTITY['os']}")
    print(f"{Fore.ORANGE}❯{Style.RESET_ALL} 🏎️ {IDENTITY['verstappen_status']}")

def cmd_neofetch():
    """System + identity summary (neofetch style)"""
    print(f"\n{Fore.CYAN}        ╔════════════════════════════════╗{Style.RESET_ALL}")
    print(f"{Fore.CYAN}        ║{Style.RESET_ALL}  {Fore.WHITE}Kaesar Wu{Style.RESET_ALL}  {Fore.CYAN}                   ║{Style.RESET_ALL}")
    print(f"{Fore.CYAN}        ╚════════════════════════════════╝{Style.RESET_ALL}")
    print(f"\n{Fore.YELLOW}OS:{Style.RESET_ALL}        {IDENTITY['os']}")
    print(f"{Fore.YELLOW}Shell:{Style.RESET_ALL}     KWDEV Python CLI")
    print(f"{Fore.YELLOW}IDE:{Style.RESET_ALL}       {IDENTITY['ide']}")
    print(f"{Fore.YELLOW}School:{Style.RESET_ALL}    {IDENTITY['school']}")
    print(f"{Fore.YELLOW}Role:{Style.RESET_ALL}      {IDENTITY['role']}")
    print(f"{Fore.ORANGE}Max Fan:{Style.RESET_ALL}   {IDENTITY['verstappen_status']}")
    print(f"{Fore.YELLOW}Status:{Style.RESET_ALL}    {'🟢 Available' if IDENTITY['available'] else '🔴 Busy'}")
    print(f"\n{Fore.YELLOW}Quick Links:{Style.RESET_ALL}")
    print(f"            kwdev.vercel.app")
    print(f"            github.com/{IDENTITY['github']}")
    print()

def cmd_kwdev():
    """Open portfolio in browser"""
    print(f"\n{Fore.CYAN}→ Opening {IDENTITY['portfolio_url']} in default browser...{Style.RESET_ALL}")
    webbrowser.open(IDENTITY['portfolio_url'])

def parse_command(user_input: str):
    """Parse and execute command"""
    parts = user_input.strip().split()
    if not parts:
        return False
    
    cmd = parts[0].lower()
    
    if cmd in COMMANDS:
        func_name = COMMANDS[cmd]['func']
        func = globals().get(func_name)
        if func:
            return func()
    else:
        print(f"{Fore.RED}✗ Unknown command: '{cmd}'{Style.RESET_ALL}")
        print(f"{Fore.LIGHTBLACK_EX}Type 'help' for available commands{Style.RESET_ALL}")
    return False

def main():
    """Main entry point"""
    if platform.system() == 'Windows':
        os.system('cls')
    else:
        os.system('clear')
    
    print_header()
    
    welcome = f"{Fore.GREEN}❯{Style.RESET_ALL} Welcome to {Fore.CYAN}KWDEV{Style.RESET_ALL} • {Fore.WHITE}{IDENTITY['name']}{Style.RESET_ALL}'s Terminal Portfolio"
    typewriter(welcome, 0.015)
    print(f"{Fore.ORANGE}   🏎️ DIE-HARD MAX VERSTAPPEN FAN MODE: ON{Style.RESET_ALL}")
    print(f"{Fore.LIGHTBLACK_EX}   Type 'help' or 'max' to get started{Style.RESET_ALL}\n")
    
    exit_requested = False
    while not exit_requested:
        try:
            prompt = f"{Fore.CYAN}kwdev{Style.RESET_ALL}{Fore.WHITE}@{Style.RESET_ALL}{Fore.ORANGE}verstappen{Style.RESET_ALL}{Fore.WHITE}:{Style.RESET_ALL}{Fore.BLUE}~{Style.RESET_ALL}{Fore.WHITE}$ {Style.RESET_ALL}"
            user_input = input(prompt).strip()
            
            if user_input.lower() in ['exit', 'quit', 'q']:
                exit_requested = cmd_exit()
                if exit_requested:
                    confirm = input(f"{Fore.CYAN}Confirm exit? (y/n): {Style.RESET_ALL}").strip().lower()
                    if confirm == 'y':
                        break
                    exit_requested = False
            else:
                parse_command(user_input)
                
        except KeyboardInterrupt:
            print(f"\n{Fore.YELLOW}⚠ Interrupted. Type 'exit' to quit.{Style.RESET_ALL}")
        except EOFError:
            break
    
    print(f"\n{Fore.ORANGE}✓ Session ended. Lest we forget. 🇳🇿 🏎️💨{Style.RESET_ALL}\n")

if __name__ == "__main__":
    main()