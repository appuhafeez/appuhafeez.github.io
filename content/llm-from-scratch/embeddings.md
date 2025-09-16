---
id: embeddings-of-llm
title: Build LLM from scratch Part 2 (Embeddings)
tags: [LLM, GenAI, Embeddings]
category: llm-from-scratch
created: 2025-09-10
updated: 2025-09-10
---
# Theory behind embeddings
So far we created tokens from given text but this tokens are just numbers doesn't have any weitage or meaning but how LLM's understand th words, phases or entire text is through embedding representation of this tokens but embeddings and tokens are tightly coupled you cannot use one tokenizer during training different during generation this will make generated text meaning less as they are different
## How Embeddings Work
1. **Conversion to Vectors:** An embedding model, a type of neural network, takes non-numeric data (like text) and transforms it into an array of numbers (a vector). 
2. **Semantic Meaning:** The key is that this vector isn't just a random set of numbers; it encodes the meaning and context of the original text. For example, the embedding for "bank" in "river bank" will be different from the embedding for "bank account". 
3. **Contextual Relationships:** Because of how they are generated, semantically similar words, phrases, or concepts will have similar vector representations and will be positioned closer together in the embedding space. 
4. **LLM Understanding:** LLMs then use these vectors to understand language, perform tasks like summarization, comparison, and generation, and even provide semantic memory to AI models.
## Why Embeddings Are Important
- **Contextual Awareness:** They enable LLMs to understand the meaning of words in context, rather than just as isolated entities.
- **Efficient Processing:** They convert unstructured text into a structured, numerical format that AI models can process mathematically.
- **Task Versatility:** Embeddings are used across various NLP tasks, including text classification, sentiment analysis, information retrieval, question answering, and machine translation.
- **Semantic Search:** They power applications that need to understand the meaning behind a query, like search engines and recommendation systems.

To understand more about how this embeddings work i found a [hugging face](https://huggingface.co/spaces/hesamation/primer-llm-embedding?section=what_are_embeddings?) article for you

## Our implementation

For this code example i will be using `torch` library which you can install using command `pip install torch`
Here we are using `nn.Embedding` to generate this embeddings. This will currently generate randomly as this is not trained but once we go through training which we will be discussing in future blogs the generated embeddings will be such a way that if we plot this embeddings all similar words stay together

```python
import torch
import torch.nn as nn

# Define vocab size and embedding dimension
vocab_size = 100
n_embd = 16
n_positions = 10

# Token + positional embeddings
wte = nn.Embedding(vocab_size, n_embd)  # token embeddings
wpe = nn.Embedding(n_positions, n_embd) # positional embeddings

# Example input: token IDs
input_ids = torch.tensor([[5, 20, 33, 2]])  # batch=1, seq_len=4
batch_size, seq_len = input_ids.shape

# Token embeddings
token_emb = wte(input_ids)
# Position embeddings
pos_ids = torch.arange(0, seq_len).unsqueeze(0).expand(batch_size, seq_len)
pos_emb = wpe(pos_ids)

# Final embeddings
x = token_emb + pos_emb

print("Input IDs:", input_ids)
print("Token embeddings shape:", token_emb.shape)
print("Positional embeddings shape:", pos_emb.shape)
print("Combined embeddings:", str(x))
print("Combined embeddings shape:",x.shape)
```
Output:

```bash
Input IDs: tensor([[ 5, 20, 33,  2]])
Token embeddings shape: torch.Size([1, 4, 16])
Positional embeddings shape: torch.Size([1, 4, 16])
Combined embeddings: tensor([[[ 0.2979,  0.0583, -0.3226,  0.7358, -1.1478, -1.5554,  0.6621,
          -0.6870,  1.7587, -2.3794, -2.3033,  1.2350, -0.3628,  0.0270,
           0.2294, -2.4286],
         [-1.4823,  2.6400, -0.0993,  0.4901,  0.6914, -1.6372, -1.7780,
           0.5234, -1.1332,  1.0472, -0.8235,  1.9968,  0.8847,  0.4840,
          -0.5760,  0.9604],
         [ 0.2217,  0.6301,  0.4842, -0.0723,  1.4005, -1.9777, -0.0446,
          -0.0588,  2.2965, -1.1491, -2.7850, -0.4843, -1.1163,  1.5401,
          -0.2986, -1.4914],
         [-2.3623, -1.6647, -0.3932,  0.4422, -1.5671, -1.4725,  1.7037,
           1.5583,  3.0955,  2.3201, -0.7429,  2.0648,  1.2290,  1.6483,
           2.0417, -0.4111]]], grad_fn=<AddBackward0>)
Combined embeddings shape: torch.Size([1, 4, 16])
```

### Code explained
Here in above example we have 2 types of embeddings
1. Token embeddings
    - Learnable vectors that represent each token in the vocabulary.
    - Similar tokens (e.g., `"cat"`, `"dog"`) end up close in embedding space.
2. Positional embeddings
    - Transformers are order-agnostic — they treat tokens as a “bag of words”.
    - To model order (`"the cat sat"` ≠ `"sat the cat"`), we add position embeddings.
    - GPT-2 uses learned positional embeddings.
Final representation = token embedding + positional embedding which combainly makes meaningful
