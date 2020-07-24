"""testing"""
import sys
import requests
from pdfminer.high_level import extract_text, extract_pages
from pdfminer.layout import LTTextContainer, LAParams

FILE_PATH = './lib/data/sample.pdf'
def writeText():
    url = sys.argv[1]
    resp = requests.get(url, stream=True)
    with open(FILE_PATH, 'wb') as f:
        f.write(resp.content)

def main():
    """testing
    """
    writeText()
    text = extract_text(FILE_PATH)
    return text.encode('utf8')

def layout():
    writeText()
    la_params = LAParams(boxes_flow=-0.5)
    pages = extract_pages(FILE_PATH, laparams=la_params)
    for page_layout in pages:
        for element in page_layout:
            if isinstance(element, LTTextContainer):
                print(element.get_text().encode('utf8'))
layout()
# print(PDF_TEXT)
sys.stdout.flush()
sys.exit(0)

