---
id: tokenization-of-llm
title: Build LLM from scratch Part 1 (Tokenization)
tags: [LLM, GenAI, Tokenizer]
category: llm-from-scratch
created: 2025-09-10
updated: 2025-09-10
---
# Theory behind Tokenization

Before a neural network can understand text, it needs to convert words into numbers. This is done through tokenization.
## Why do we tokenize?
 - Computers can’t understand words directly — they need numerical representations.
 - Tokenization splits text into units (tokens) which are then mapped to IDs.

There are different approaches to tokenize text into numbers below are few approaches we will understand along with some pro's and con's in them:

## Different tokenization approaches:
 1. **Word-level tokenization** → 
    In the approach we will break text into word for an example `The cat sat` → `[The, cat, sat]`.
    Simple python example for the same:

    ```python
    # Example: Word-level tokenization in Python
    import re
    # Sample text
    text = "Hello! I'm learning how to do word-level tokenization in Python."
    # Method 1: Simple split (not very robust)
    tokens_simple = text.split()
    print("Simple split:", tokens_simple)
    ```
    Output:
    ```bash
    Simple split: ['Hello!', "I'm", 'learning', 'how', 'to', 'do', 'word-level', 'tokenization', 'in', 'Python.']
    ```
    But what if some new word comes in future this struggles. Like in 11th addition of oxford dictionary we have around 600,000 words just for English imagine how many words there in multiple other languges its Huge right so it is practically not possible to tokenize all

 2. **Character-level tokenization** → 
    - Every character is a token (`"cat" → [c, a, t]`). Very flexible, but inefficient (longer sequences).
    - Tokens wont provide any meaningful word so in practical we need longer sequences to form a word it self so even longer sequence to form meaning ful sentence.
 3. **Subword tokenization (BPE/Byte-Level BPE)** →
    - Breaks words into frequent subwords.
    - Ex: "unhappiness" → [un, happi, ness].
    - Balances efficiency and flexibility.
    - GPT-2 and some of newer models uses Byte-Level BPE:
        - Operates at raw byte level.
        - Supports all Unicode characters.
        - No out-of-vocab issues.

## Why BPE (Byte Pair Encoding)?
- Handles rare words by splitting them into smaller pieces.
- Keeps frequent words as single tokens.
- Works at the byte-level → supports all languages and characters.

**We will add some special charactors also as tokens while training our BPE tokenizer:**
- `<pad>` → for padding sequences.
- `<unk>` → for unknown tokens (rarely used in BPE).
- `<|endoftext|>` → signals the end of input.
- `<mask>` → used for masked training (BERT-style, not GPT).

**BPE tokenizer** is comparitively complex to implement then **Word-level tokenization** or **Character-level tokenization** but we don't have to worry we have readymade python libraries available which are effeciant

# Practical

Before you execute the below code run `pip install tokenizers`. This installs `tokenizers` library into your python virtual environment

```python

import os
from tokenizers import ByteLevelBPETokenizer  # Add this import

def train_tokenizer_from_texts(texts, vocab_size=30000, save_dir="tokenizer-dir"):
    """
    Train a new ByteLevelBPE tokenizer from scratch on your dataset.
    """
    os.makedirs(save_dir, exist_ok=True)

    # Write texts to a temporary file (needed by tokenizers lib)
    temp_file = os.path.join(save_dir, "train_texts.txt")
    with open(temp_file, "w", encoding="utf-8") as f:
        for line in texts:
            f.write(line.strip() + "\n")

    tokenizer = ByteLevelBPETokenizer()
    tokenizer.train(files=[temp_file], vocab_size=vocab_size, min_frequency=2,
                    special_tokens=["<pad>", "<s>", "</s>", "<unk>", "<mask>", "<|endoftext|>"])

    tokenizer.save_model(save_dir)
    print(f"✅ Trained new tokenizer with vocab size {vocab_size}, saved to {save_dir}")

    vocab_file = os.path.join(save_dir, "vocab.json")
    merges_file = os.path.join(save_dir, "merges.txt")
    return ByteLevelBPETokenizer(vocab_file, merges_file)

def ensure_gpt2_bpe_files(texts,vocabsize, vocab_file="tokenizer-dir/vocab.json", merges_file="tokenizer-dir/merges.txt"):
    """
    Create tokenizer if not present.
    """

    if not os.path.exists(vocab_file) or not os.path.exists(merges_file):
        train_tokenizer_from_texts(texts, vocab_size=vocabsize, save_dir="tokenizer-dir")


def get_custom_tokenizer(texts, vocabsize = 30000, vocab_file="tokenizer-dir/vocab.json", merges_file="tokenizer-dir/merges.txt"):
    """
    Load a ByteLevelBPETokenizer from vocab and merges files.
    """
    ensure_gpt2_bpe_files(texts,vocabsize, vocab_file, merges_file)
    tokenizer = ByteLevelBPETokenizer(vocab_file, merges_file)
    return tokenizer

tokenizer = get_custom_tokenizer(["Hello world here is tokenizer please welcome"],15)
decoded = tokenizer.encode("Hello world").ids
print(decoded)
encoded = tokenizer.decode(decoded)
print(encoded)

## new word not in trianing data
print("================== new word =================")
decoded = tokenizer.encode("Cat sat on a wall").ids
print(decoded)
encoded = tokenizer.decode(decoded)
print(encoded)
```
When you run the above code you see following output

```bash
[45, 74, 81, 81, 84, 226, 92, 84, 87, 81, 73]
Hello world
================== new word =================
[40, 70, 89, 226, 88, 70, 89, 226, 84, 83, 226, 70, 226, 92, 70, 81, 81]
Cat sat on a wall
```

## Lets dig little bit in above code
- **Training stage**: First we have to train the tokenizer with training dataset to make to simple i trained it with a static texts. This generates 2 files `vocab.json` and `merges.txt` which containers generated vocabilary and merges of vocab respectively
- **encode decode stage**: After training your tokenizer is ready to do encode given text into tokens and decode tokens into text back. One thing you can observe is it can handle new words it never seen during training also prety well this is because of byte level division of words helps it to interpret better
- **Thumb rule**: Whenever you create a tokenizer you should make sure a text encoded then decoded should exactly same a original text passed. Because tokenizer is just numerical representation of data it should manipulate or modify original


