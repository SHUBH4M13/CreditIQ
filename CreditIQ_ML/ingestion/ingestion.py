from ingestion.pdf_processor import extract_text_from_pdf
from ingestion.chunker import chunk_pages
from ingestion.pinecone_store import store_chunks
from embedding import generate_embeddings


def ingest_brochure():

    pdf_path = "brochures/Reglia_gold.pdf"

    card_id = "101"
    card_name = "HDFC Regalia Gold"
    bank = "HDFC_BANK"

    # 1. Extract PDF text
    pages = extract_text_from_pdf(pdf_path)

    if not pages:
        raise ValueError("No text extracted from PDF")

    print(f"Extracted {len(pages)} pages")

    # 2. Create chunks
    chunks = chunk_pages(pages)

    print(f"Generated {len(chunks)} chunks")

    # 3. Generate embeddings
    texts = [chunk["text"] for chunk in chunks]

    embeddings = generate_embeddings(texts)

    print(f"Generated {len(embeddings)} embeddings")

    # 4. Store in Pinecone
    stored_count = store_chunks(
        chunks,
        embeddings,
        card_id,
        card_name,
        bank
    )

    print(f"Successfully stored {stored_count} vectors")


if __name__ == "__main__":
    ingest_brochure()