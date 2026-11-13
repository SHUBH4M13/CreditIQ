def chunk_pages(pages, chunk_size=500, overlap=75):

    chunks = []

    for page in pages:

        words = page["text"].split()

        start = 0

        while start < len(words):

            end = start + chunk_size

            chunk_text = " ".join(words[start:end])

            chunks.append({
                "text": chunk_text,
                "page_number": page["page_number"]
            })

            start += chunk_size - overlap

    return chunks