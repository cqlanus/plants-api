"""docstring"""
import sys

def main():
    """docstring"""
    argument = sys.argv[1]
    print(argument)
    result = 4 + 1
    return result

STUFF = main()
print(STUFF)
sys.stdout.flush()
sys.exit(0)
