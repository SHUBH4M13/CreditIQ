from pypdf import PdfReader


def extract_text_from_pdf(pdf_path):

    reader = PdfReader(pdf_path)

    pages = []

    for page_number, page in enumerate(reader.pages, start=1):

        page_text = page.extract_text()

        if page_text and page_text.strip():

            pages.append({
                "page_number": page_number,
                "text": page_text.strip()
            })

    return pages