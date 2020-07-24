"""testing"""
from pdfminer.high_level import extract_text, extract_pages
from pdfminer.layout import LTTextContainer, LAParams

pdf = './lib/data/cs_mofi.pdf'
def main():
    """testing
    """
    filepath = './lib/data/sampleText.txt'
    text = extract_text(pdf)
    with open(filepath, 'wt') as f:
        f.write(text)
    print(text)


def layout(path):
    la_params = LAParams(boxes_flow=-0.5)
    for page_layout in extract_pages(path, laparams=la_params):
        for element in page_layout:
            if isinstance(element, LTTextContainer):
                print(element.get_text())


layout(pdf)
