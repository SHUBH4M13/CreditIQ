from ingestion.pinecone_store import index
from embedding import generate_embedding

query = "What is the annual milestone benefit when the cardholder spends Rs. 7,50,000?"

query_embedding = generate_embedding(query)

results = index.query(
    vector=query_embedding,
    top_k=5,
    include_metadata=True,
    filter={
        "cardId": {"$eq": "101"}
    }
)

for match in results["matches"]:
    print("\nScore:", match["score"])
    print("Text:", match["metadata"]["text"])