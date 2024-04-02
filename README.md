# **Problem Statement: Implementing Location Search in leadsAI Collection**

**Background:**

The current leadsAI collection in MongoDB uses industry embeddings for searching leads. However, searching based on location is not functional due to limitations in MongoDB's vector search capabilities. While MongoDB is working on improved vector search functionalities, a temporary solution is needed.

**Objective:**

Develop a solution to enable location-based search within the leadsAI collection.

**Requirements:**

- Integrate a vector search solution alongside MongoDB.
- The chosen solution should allow simultaneous searching based on both industry and location embeddings.
- Prioritize ease of implementation and readily available resources.

**Possible Solutions:**

- **Pinecone:** This vector database offers a user-friendly platform specifically designed for vector search tasks. It boasts extensive documentation and is considered the most straightforward option.
- **Alternative Vector Search Solutions:** Consider Azure Cognitive Search (https://github.com/Azure-Samples/azure-search-sample-data) or Redis (https://redis.io/docs/get-started/vector-database/) if Pinecone is not feasible.

**Deliverables:**

- A functional implementation of location, industry, designation and number of employees search.
- Documentation outlining the chosen solution, integration process, and usage instructions.
- (Optional) Frontend modifications to incorporate a location filter if a suitable vector search solution is not readily available.

**Considerations:**

- Evaluate the feasibility of integrating the chosen vector search solution with the existing system.
- Ensure the solution provides acceptable performance and scalability.
- If using Pinecone, explore free tier limitations and potential upgrade paths if necessary.

**Additional Notes:**

- The provided resources (MongoDB forum discussion and documentation) can be referenced for further context on MongoDB's vector search limitations.

## **Solution:**

Here is a video explaination of my approach solving this problem.

[Video Link](https://www.youtube.com/)

GenAI Tech - LangChain, Pinecone.