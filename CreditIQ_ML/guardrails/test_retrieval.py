from ingestion.pinecone_store import index

# Query using an existing vector
result = index.query(
    vector=[0.0] * 384,
    top_k=5,
    filter={
        "cardId": {
            "$eq": "999"
        }
    },
    include_metadata=True
)

matches = result.matches or []

assert len(matches) == 0, (
    "Unexpected records found for cardId 999"
)

print("Cross-card retrieval filter test passed!")