from sentence_transformers import SentenceTransformer

model = SentenceTransformer("BAAI/bge-small-en-v1.5")


def generate_embedding(text):
    embedding = model.encode(
        text,
        normalize_embeddings=True
    )

    return embedding.tolist()


def generate_embeddings(texts):
    embeddings = model.encode(
        texts,
        batch_size=32,
        normalize_embeddings=True,
        show_progress_bar=False
    )

    return embeddings.tolist()