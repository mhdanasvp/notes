# DSA Patterns

To become genuinely strong at DSA, aim to master roughly 25–30 core problem-solving patterns.

A good mastery map is:

1. Arrays & Strings
   - Two Pointers
   - Sliding Window
   - Prefix Sum
   - Difference Array
   - Hashing / Frequency Map
   - Sorting + Scanning
   - Kadane’s Algorithm
2. Searching
   - Binary Search
   - Binary Search on Answer
   - Matrix Search
3. Linked Lists
   - Fast & Slow Pointers
   - In-place Reversal
   - Dummy Node / Sentinel
4. Stacks & Queues
   - Monotonic Stack
   - Monotonic Queue
   - Stack-based Parsing
5. Trees
   - DFS
   - BFS / Level Order
   - Recursive Tree Construction
   - Tree Diameter / Path Problems
   - Lowest Common Ancestor
   - BST Properties
6. Graphs
   - DFS / BFS Traversal
   - Topological Sort
   - Union-Find / DSU
   - Shortest Path — BFS, Dijkstra, Bellman-Ford
   - Minimum Spanning Tree
   - Cycle Detection
7. Backtracking
   - Subsets
   - Permutations
   - Combination Search
   - Constraint Search / Pruning
8. Dynamic Programming
   - 1D DP
   - 2D DP
   - Knapsack
   - Subsequence DP
   - Interval DP
   - DP on Trees
   - State-machine DP
9. Greedy
   - Interval Scheduling
   - Local-choice Greedy
   - Heap-based Greedy
10. Heap / Priority Queue
    - Top-K
    - K-way Merge
    - Two Heaps
11. Advanced
    - Trie
    - Bit Manipulation
    - Sweep Line
    - Segment Tree
    - Fenwick Tree
    - Binary Lifting
    - Strongly Connected Components

when you see a DSA problem, don't immediately write code.
Ask:

1. What is the state/search space?
2. What is the brute-force solution?
3. What is its exact bottleneck?
4. Am I recomputing something?
5. Can I store information to avoid repeated work?
6. Can I eliminate multiple candidates with one decision?
7. Does ordering give me useful information?
8. Is there monotonicity?
9. What invariant can I maintain?
10. What do the constraints imply about acceptable complexity?
Those ten questions will eventually become automatic.

## 1. Two Pointers

### Types of two pointers

#### 1. Two Pointers — Opposite Direction

Used mainly when the data is sorted and you need to inspect pairs.

Why it works:

- If sum is too small, move L right to increase the sum.
- If sum is too large, move R left to decrease the sum.
- Sorted order lets us safely eliminate impossible pairs.

Complexity:  

- Time = O(n)}
- because each pointer moves only in one direction.
- Space = O(1)

Use cases:

- Two Sum in sorted array
- Pair with target difference
- Container With Most Water
- Palindrome checking
- Pair/partition problems on sorted data

#### 2. Two Pointers — Same Direction

Here both pointers move from left to right.

``` plaintext
slow = manages valid/result region.  
fast = explores
```

Complexity:

- Time = O(n)
- Space = O(1)

Use cases:

- Remove duplicates in-place
- Move zeroes
- Remove a specific value
- Filter array in-place
- Partitioning
- Compacting valid elements

#### 3. Returning Unique Values Instead of Modifying In-Place

If you don't need to modify the original array, you can use extra memory.

Complexity:

```plaintext
Time = O(n)

but:
Space = O(k). 
where \(k\) is the number of unique elements.  

Worst case:  
k=n

so:  
Space = O(n)
```

The Important Distinction: These two solutions may look similar, but they solve slightly different problems.

- In-place version: O(1).
- Result-array version:: O(n)

### Summary

Move a pointer only when you can prove *discarded states cannot contain the answer*.

- For opposite pointers, sorted order gives us that proof.
- For same-direction pointers, we maintain an invariant:
**everything before slow is already valid**

That is the real foundation of Two Pointers.

## 2: Sliding Window

Sliding Window is basically a specialized Two Pointers pattern for problems involving a contiguous range:

- subarray
- substring
- consecutive elements
- fixed-size segment
- variable-size segment

Instead of recomputing every range from scratch, reuse information from the previous range.

### Paterns

#### 1. Fixed-size Sliding Window

> windowSum = windowSum - outgoing + incoming

For a fixed-size sliding window:

- Building the first window costs O(k)
- Sliding through the remaining elements costs O(n - k)

So:

> T(n,k) = O(k)+O(n-k) = O(n)

Example:

```TS
function maxWindowSum(arr: number[], k: number): number {
  if (k > arr.length) return 0;

  let windowSum = 0;

  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let maxSum = windowSum;

  for (let right = k; right < arr.length; right++) {
    windowSum += arr[right];
    windowSum -= arr[right - k];

    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}
```

``` TS

windowSum -= arr[left];   // O(1)
windowSum += arr[right];  // O(1)

// So even if k = 1000, moving the window one position still costs only O(1).
```

Complexity:

- Time= O(n)
- Space = O(1)

#### 2.Variable-Size Sliding Window

This is where problems start saying things like:
> “Find the smallest subarray whose sum is at least S”

or
> “Find the longest substring without repeating characters.”

Here, the window size is not fixed. We decide dynamically when to expand and when to shrink.

