import os
from dotenv import load_dotenv
from pinecone import Pinecone

load_dotenv()

pc = Pinecone(
    api_key=os.getenv("PINECONE_API_KEY")
)

index = pc.Index(
    os.getenv("PINECONE_INDEX_NAME")
)


def store_chunks(chunks, embeddings, card_id, card_name, bank):

    if len(chunks) != len(embeddings):
        raise ValueError("Chunks and embeddings count do not match")

    vectors = []

    for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):

        vectors.append({
            "id": f"{card_id}_{i}",
            "values": embedding,
            "metadata": {
                "cardId": str(card_id),
                "cardName": card_name,
                "bank": bank,
                "chunkIndex": i,
                "pageNumber": chunk["page_number"],
                "text": chunk["text"]
            }
        })

    batch_size = 100

    for start in range(0, len(vectors), batch_size):

        batch = vectors[start:start + batch_size]

        index.upsert(vectors=batch)

    return len(vectors)


def delete_card_chunks(card_id):

    index.delete(
        filter={
            "cardId": {
                "$eq": str(card_id)
            }
        }
    )