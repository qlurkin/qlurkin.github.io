---
title: Memoization
subtitle: Levenshtein Distance
---

The **Levenshtein distance** (also called edit distance) is defined as the
minimum number of edit operations required to transform one string into
another.  
The allowed operations are:

- Insertion of a character
- Deletion of a character
- Substitution of one character for another

## Recursive Definition

Let $s[1 \dots i]$ and $t[1 \dots j]$ be prefixes of two strings $s$ and $t$.  
We define the distance function $D(i, j)$ as:

$$
D(i, j) =
\begin{cases}
i & \text{if } j = 0 \\
j & \text{if } i = 0 \\
D(i-1, j-1) & \text{if } s[i] = t[j] \\
1 + \min \big(D(i-1, j), D(i, j-1), D(i-1, j-1)\big) & \text{otherwise}
\end{cases}
$$

## Goals

1. Implement a **naïve recursive solution** to compute the Levenshtein distance
   between two strings.
   - Observe its execution time for strings of increasing length.
   - You should notice that the time grows exponentially.

2. Improve the implementation by using **memoization** (caching the results of
   already solved subproblems).
   - This reduces the complexity from exponential to  
     $$O(|s| \cdot |t|)$$
   - Compare the execution times with the naïve version.

3. Plot a graph of the execution time as a function of the input size (length of
   the strings), both **without memoization** and **with memoization**.
   - Show the radical improvement obtained thanks to memoization.

## Remark

Unlike simpler examples (e.g., Fibonacci numbers, which can be solved with a
simple loop), the Levenshtein distance problem truly benefits from memoization,
because many overlapping subproblems occur and there is no straightforward
iterative solution.
