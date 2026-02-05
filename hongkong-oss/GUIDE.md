# Dify x Hong Kong OSS Workshop

> A hands-on guide for building GenAI applications with Dify — from zero to production.

---

## 📋 Workshop Overview

### Speaker Information

| Field | Details |
|-------|---------|
| **Name** | CrazyWoola (Banana) |
| **Role** | Dify Developer Relations |
| **Contact** | banana@dify.ai |
| **Organization** | [LangGenius](https://langgenius.ai) |

### Target Audience

- Python/Java developers interested in LLM application development
- Open source enthusiasts exploring GenAI orchestration platforms
- Technical leads evaluating LLM infrastructure solutions
- DevOps engineers managing AI service deployments

### Prerequisites

- Basic understanding of RESTful APIs
- Familiarity with Docker and containerization
- Experience with at least one programming language (Python preferred)
- OpenAI API key or access to other LLM providers

---

## 🎯 Learning Objectives

By the end of this workshop, you will be able to:

1. **Understand** the Dify platform architecture and its role in the LLM ecosystem
2. **Build** complex AI workflows using the visual orchestration interface
3. **Implement** knowledge pipelines for Retrieval-Augmented Generation (RAG)
4. **Deploy** Dify for your own projects with proper configuration
5. **Monitor** and troubleshoot production AI applications

---

## 📅 Agenda

### Part 1: Introduction to Dify (30 min)

#### 1.1 What is Dify?

Dify is an **open-source LLM application development platform** that bridges the gap between raw LLM capabilities and production-ready AI applications.

**Core Philosophy:**

```
┌─────────────────────────────────────────────────────────────┐
│                    DIFY PLATFORM                            │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │Orchestrate│  │  RAG     │  │  Agent   │  │  Workflow│    │
│  │  Engine   │  │ Pipeline │  │  Builder │  │  Engine  │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Plugin Ecosystem                        │   │
│  │  [Models] [Tools] [Extensions] [Custom Nodes]       │   │
│  └─────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │            Observability & Ops                     │   │
│  │  [Logging] [Tracing] [Metrics] [Cost Tracking]      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Key Differentiators:**

| Feature | Traditional Approach | Dify Approach |
|---------|---------------------|---------------|
| Prompt Management | Hardcoded strings | Version-controlled, collaborative |
| Context Handling | Manual retrieval | Built-in RAG with vector DB |
| Workflow Logic | Code-only | Visual DSL + Code nodes |
| Multi-agent | Complex orchestration | Declarative agent definitions |
| Monitoring | External tools | Integrated observability |

#### 1.2 Why Dify Now?

The evolution of LLM application development:

```
2017          2020          2023          2024          2025
  │             │             │             │             │
  ▼             ▼             ▼             ▼             ▼
Transformer   GPT-3      ChatGPT API    GPT-4 Turbo    Dify v1.0
   Era        Era          Era            Era            Era
─────────────────────────────────────────────────────────────
Research    Prompt      Application    Production     Platform
Focus       Engineering Frameworks    Deployment     Maturity
```

**Market Context:**

- **1M+** installations powered by Dify
- **120K+** GitHub stars
- **150+** countries with active users
- **1000+** open source contributors
- **60+** industries adopting the platform

---

### Part 2: Dify Workflow Deep Dive (45 min)

#### 2.1 What is Dify Workflow?

A **Workflow** in Dify is a visual orchestration of AI operations that:

- Chains multiple LLM calls with conditional logic
- Integrates external tools and APIs
- Processes data through transformation nodes
- Maintains state across execution steps

**Workflow Types:**

| Type | Use Case | Complexity |
|------|----------|------------|
| **Chatbot** | Conversational AI with context | Low |
| **Agent** | Autonomous task execution | Medium |
| **Chatflow** | Multi-turn conversation flows | Medium |
| **Workflow** | Batch processing, automation | High |

#### 2.2 Core Node Types

**Input/Output Nodes:**

```yaml
# Input Node Configuration
input_node:
  type: "start"
  fields:
    - name: "query"
      type: "text"
      required: true
    - name: "user_context"
      type: "object"
      required: false
```

**LLM Nodes:**

- System prompt configuration
- Model selection (GPT-4, Claude, Llama, etc.)
- Temperature and sampling controls
- Structured output (JSON mode)

**Processing Nodes:**

| Node | Function | Example Use |
|------|----------|-------------|
| **Code** | Python/Node.js execution | Data transformation |
| **Template** | String formatting | Prompt construction |
| **HTTP** | External API calls | Third-party integration |
| **Variable** | State management | Cross-node data passing |

**Control Flow Nodes:**

- **Condition**: If/else branching based on expressions
- **Iteration**: Loop over list data
- **Parallel**: Concurrent execution paths
- **Merge**: Join multiple execution branches

#### 2.3 Building Your First Workflow

**Step-by-Step Tutorial:**

1. **Create New Workflow**
   ```
   Dashboard → Create from Blank → Select "Workflow"
   ```

2. **Define Input Schema**
   ```json
   {
     "query": "string",
     "language": "string (optional, default: 'en')",
     "max_tokens": "number (optional, default: 500)"
   }
   ```

3. **Add Processing Nodes**
   ```
   [Start] → [Query Validation] → [Knowledge Retrieval] → 
   [LLM Generation] → [Response Formatter] → [End]
   ```

4. **Configure Knowledge Retrieval**
   ```yaml
   retrieval_config:
     knowledge_base: "product_docs"
     top_k: 5
     score_threshold: 0.7
     reranking: enabled
   ```

5. **Set Up LLM Node**
   ```yaml
   llm_config:
     model: "gpt-4-turbo-preview"
     system_prompt: |
       You are a helpful assistant. Use the provided context
       to answer user questions accurately.
     temperature: 0.3
     max_tokens: "{{#start.max_tokens#}}"
   ```

#### 2.4 Monitoring and Debugging

**Built-in Observability:**

```
┌────────────────────────────────────────────────────────────┐
│                    EXECUTION TRACE                         │
├────────────────────────────────────────────────────────────┤
│  Run ID: wf_8f3a9b2c | Duration: 1.24s | Status: ✅ Success │
├────────────────────────────────────────────────────────────┤
│  [Start] ────────► 0.01s ────────► ✓ Input validated      │
│  [Retrieval] ────► 0.45s ────────► ✓ 3 chunks retrieved   │
│  [LLM Call] ─────► 0.78s ────────► ✓ 342 tokens generated │
│  [Format] ───────► 0.00s ────────► ✓ Output structured    │
│  [End] ──────────► 0.00s ────────► ✓ Execution complete   │
├────────────────────────────────────────────────────────────┤
│  Token Usage: 1,245 prompt | 342 completion | $0.0042      │
└────────────────────────────────────────────────────────────┘
```

**Debugging Features:**

- **Variable Inspector**: View all variable values at each step
- **Retry Mechanism**: Re-run failed nodes with modified inputs
- **Diff View**: Compare different execution runs
- **Error Stack**: Detailed error messages with context

---

### Part 3: Knowledge Pipeline (45 min)

#### 3.1 What is Dify Knowledge?

The **Knowledge Pipeline** provides:

1. **Document Ingestion**: PDF, Word, TXT, Markdown, HTML
2. **Chunking Strategies**: Recursive, semantic, fixed-size
3. **Embedding Generation**: OpenAI, Cohere, local models
4. **Vector Storage**: Weaviate, Qdrant, Milvus, PostgreSQL
5. **Retrieval Optimization**: Re-ranking, hybrid search, filters

**Architecture:**

```
┌─────────────────────────────────────────────────────────────┐
│                    KNOWLEDGE PIPELINE                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Documents        Chunking        Embedding        Vector  │
│  ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌────────┐│
│  │  PDF    │────▶│Semantic │────▶│  text-  │────▶│ Qdrant ││
│  │  Word   │     │ Chunker │     │embedding│     │Milvus  ││
│  │  MD     │     │ (custom)│     │-3-large │     │Weaviate││
│  │  HTML   │     └─────────┘     └─────────┘     └────────┘│
│  └─────────┘                                                │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   RETRIEVAL ENGINE                       ││
│  │  [Query] → [Embedding] → [ANN Search] → [Rerank] → [TopK]││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### 3.2 Chunking Strategies

| Strategy | Best For | Chunk Size | Overlap |
|----------|----------|------------|---------|
| **Recursive** | General documents | 500-1000 chars | 50-100 |
| **Semantic** | Technical content | Sentence-based | N/A |
| **Fixed** | Structured data | Custom | 0 |
| **Markdown** | Documentation | Header-based | Contextual |

**Configuration Example:**

```yaml
chunking:
  method: "recursive"
  chunk_size: 800
  chunk_overlap: 80
  separators: ["\n\n", "\n", ". ", " "]
  
processing:
  remove_extra_spaces: true
  remove_urls_emails: false
  
indexing:
  embedding_model: "text-embedding-3-large"
  vector_db: "weaviate"
```

#### 3.3 Retrieval Configuration

**Basic Retrieval:**

```yaml
retrieval:
  method: "semantic_search"
  top_k: 5
  score_threshold: 0.75
```

**Advanced Retrieval (Reranking):**

```yaml
retrieval:
  method: "hybrid_search"
  top_k: 20                    # Initial retrieval
  rerank:
    enabled: true
    model: "cohere-rerank-v3"  # Or local cross-encoder
    top_n: 5                   # Final results
  filters:
    - field: "metadata.source"
      operator: "equals"
      value: "official_docs"
```

---

### Part 4: Self-Hosting and Integration (30 min)

#### 4.1 Deployment Options

**Docker Compose (Recommended for Development):**

```bash
# Clone the repository
git clone https://github.com/langgenius/dify.git
cd dify/docker

# Copy environment configuration
cp .env.example .env

# Edit .env with your settings
# - OPENAI_API_KEY
# - SECRET_KEY (generate with: openssl rand -base64 42)

# Start services
docker compose up -d

# Access Dify at http://localhost/install
```

**Key Environment Variables:**

```bash
# Core Settings
CONSOLE_API_URL=http://localhost:5001
APP_API_URL=http://localhost:5001
PORT=80

# Database
DB_USERNAME=postgres
DB_PASSWORD=difyai123456
DB_HOST=db
DB_PORT=5432
DB_DATABASE=dify

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Vector Database (Choose one)
VECTOR_STORE=weaviate  # Options: weaviate, qdrant, milvus, pgvector

# Optional: S3/MinIO for file storage
S3_ENDPOINT=https://s3.amazonaws.com
S3_BUCKET_NAME=dify-files
```

#### 4.2 Production Considerations

**High Availability Setup:**

```
┌─────────────────────────────────────────────────────────────┐
│                      PRODUCTION ARCH                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    ┌─────────────┐                                          │
│    │   CDN/      │                                          │
│    │   WAF       │                                          │
│    └──────┬──────┘                                          │
│           │                                                 │
│    ┌──────▼──────┐         ┌─────────────────┐             │
│    │   Nginx     │────────▶│  Dify API       │             │
│    │   (LB)      │         │  (Multiple Pods)│             │
│    └──────┬──────┘         └────────┬────────┘             │
│           │                         │                       │
│           │         ┌───────────────┼───────────────┐       │
│           │         ▼               ▼               ▼       │
│           │    ┌────────┐     ┌─────────┐     ┌─────────┐  │
│           │    │PostgreSQL│   │  Redis  │     │Weaviate │  │
│           │    │ (HA)    │     │ (Sentinel)   │(Cluster)│  │
│           │    └────────┘     └─────────┘     └─────────┘  │
│           │                                                 │
│    ┌──────▼──────┐                                         │
│    │  Worker     │◄── Celery Task Queue                     │
│    │  Nodes      │                                         │
│    └─────────────┘                                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Security Checklist:**

- [ ] Change default passwords
- [ ] Enable HTTPS with valid SSL certificate
- [ ] Configure CORS policies
- [ ] Set up rate limiting
- [ ] Enable audit logging
- [ ] Regular security updates
- [ ] Network isolation for vector DB

---

### Part 5: Real-World Projects (30 min)

#### 5.1 Project 1: Apple Watch Recording Transcription Workflow

**Use Case:** Automatically transcribe voice memos from Apple Watch and generate structured notes.

**Architecture:**

```yaml
workflow:
  name: "Voice Memo Processor"
  
  triggers:
    - type: "webhook"
      endpoint: "/api/voice-memo"
  
  nodes:
    start:
      - audio_file: "file"
      - user_id: "string"
      
    transcribe:
      type: "llm"
      provider: "openai"
      model: "whisper-1"
      input: "{{start.audio_file}}"
      
    summarize:
      type: "llm"
      model: "gpt-4-turbo"
      prompt: |
        Summarize the following transcription into:
        - Key points (bullet list)
        - Action items (checkboxes)
        - Follow-up questions
        
        Transcription: {{transcribe.text}}
      
    store:
      type: "http"
      method: "POST"
      url: "https://api.notion.com/v1/pages"
      headers:
        Authorization: "Bearer {{secrets.notion_token}}"
      body:
        parent: { database_id: "{{vars.notes_db}}" }
        properties:
          Title:
            title: [{ text: { content: "Voice Note {{now}}" } }]
          Content:
            rich_text: [{ text: { content: "{{summarize.output}}" } }]
```

**Implementation Steps:**

1. Create webhook-triggered workflow
2. Configure Whisper API integration
3. Design structured output format
4. Set up Notion API connection
5. Test end-to-end flow

#### 5.2 Project 2: GDPR Q&A Chatbot

**Use Case:** Legal compliance assistant for GDPR-related queries.

**Features:**

- RAG-powered responses from GDPR documentation
- Source citation for every answer
- Confidence scoring
- Human handoff for low-confidence queries

**Knowledge Base Setup:**

```yaml
knowledge_base:
  name: "GDPR Documentation"
  sources:
    - type: "url"
      urls:
        - "https://gdpr.eu/"
        - "https://ico.org.uk/for-organisations/"
    - type: "file"
      files:
        - "company_privacy_policy.pdf"
        - "data_processing_agreements/"
  
  chunking:
    method: "semantic"
    chunk_size: 1000
    
  retrieval:
    top_k: 8
    rerank: true
    filters:
      - field: "source_type"
        values: ["official", "internal"]
```

**Chatbot Configuration:**

```yaml
chatbot:
  system_prompt: |
    You are a GDPR compliance assistant. Always:
    1. Cite specific articles when answering
    2. Indicate confidence level (High/Medium/Low)
    3. Suggest consulting legal counsel for complex cases
    4. Never provide legal advice, only information
    
  response_mode: "streaming"
  
  guardrails:
    - type: "keyword_filter"
      blocked: ["legal advice", "represent you"]
    - type: "confidence_threshold"
      min_score: 0.6
      fallback: "I need more context. A human agent will assist you."
```

---

## 🛠️ Hands-On Exercises

### Exercise 1: Build a Simple Q&A Bot (15 min)

1. Create a new Chatbot application
2. Upload a PDF document
3. Configure knowledge retrieval
4. Test with sample questions
5. Analyze retrieval quality

### Exercise 2: Create a Multi-Step Workflow (20 min)

1. Build a content generation workflow:
   - Input: Topic and target audience
   - Step 1: Research and outline
   - Step 2: Draft generation
   - Step 3: Review and polish
   - Output: Final content

2. Add conditional logic for different content types

### Exercise 3: Deploy Your Application (15 min)

1. Export workflow as DSL
2. Set up local Dify instance
3. Import and test
4. Configure API access

---

## 📚 Additional Resources

### Documentation

- [Dify Documentation](https://docs.dify.ai)
- [API Reference](https://docs.dify.ai/api)
- [Plugin Development Guide](https://docs.dify.ai/plugins)

### Community

- [GitHub Discussions](https://github.com/langgenius/dify/discussions)
- [Discord Community](https://discord.gg/8Tpq4AcN)
- [Twitter/X: @dify_ai](https://twitter.com/dify_ai)

### Tools & Integrations

| Category | Tools |
|----------|-------|
| **Models** | OpenAI, Anthropic, Google, Azure, Local LLMs |
| **Vector DBs** | Weaviate, Qdrant, Milvus, PGVector |
| **Storage** | S3, MinIO, Azure Blob, GCS |
| **Monitoring** | Langfuse, Langsmith, Custom OTEL |

---

## ✅ Post-Workshop Checklist

- [ ] Join Dify Discord community
- [ ] Star the [GitHub repository](https://github.com/langgenius/dify)
- [ ] Deploy your first Dify instance
- [ ] Build and share a workflow
- [ ] Contribute to documentation or translations

---

## 📄 License

This workshop content is shared under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

Dify platform is licensed under [Apache 2.0](https://github.com/langgenius/dify/blob/main/LICENSE).

---

*Last updated: 2025-02-05*
