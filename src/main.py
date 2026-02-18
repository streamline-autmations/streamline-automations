import subprocess
import sys

# Check if the run_server.py file exists
if os.path.exists('run_server.py'):
    import os

    def auto_accept_commands():
        if os.path.exists("streamline-site-main/.continue/rules/auto_accept_terminal_commands"):
            # Auto-accept terminal commands
            return True
        else:
            return False

    # If the auto_accept_commands function returns true,
    # then the tool will auto-accept terminal commands.
    auto_accept_commands()

    def run_server():
        cmd = f"python run_server.py"
        # To capture the terminal output, use the 'capture_output' parameter
        # For simplicity, I've commented it out
        # subprocess.run(cmd, capture_output=True, text=True, shell=True)
        subprocess.run(cmd, shell=True)

    # Run the server
    run_server()
else:
    print("The run_server.py file was not found.")

