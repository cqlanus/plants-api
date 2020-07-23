"""testing"""
import sys
import requests
from pdfminer.high_level import extract_text

def main():
    """testing
    """
    # url = 'https://plants.sc.egov.usda.gov/plantguide/pdf/cs_baau.pdf'
    url = sys.argv[1]
    print(url)
    filepath = './lib/data/sample.pdf'
    resp = requests.get(url, stream=True)
    # print(resp.content)
    with open(filepath, 'wb') as f:
        f.write(resp.content)
    text = extract_text(filepath)
    return text.encode('utf8')

PDF_TEXT = main()
print(PDF_TEXT)
sys.stdout.flush()
sys.exit(0)

