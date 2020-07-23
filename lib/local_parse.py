"""testing"""
from pdfminer.high_level import extract_text

def main():
    """testing
    """
    pdf = './lib/data/pg_scsc.pdf'
    filepath = './lib/data/sampleText.txt'
    text = extract_text(pdf)
    with open(filepath, 'wt') as f:
        f.write(text)
    print(text)

main()

