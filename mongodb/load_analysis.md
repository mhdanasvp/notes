# Mongo DB

## 1. Monitor MongoDB Performance Metrics

### a. Check MongoDB’s Current Resource Utilization

Use mongostat to get a real-time view of MongoDB's performance.

```sh
mongostat --host <your_mongo_host>

mongotop

```

This will show metrics like:

* Inserts/updates/deletes per second.
* Queue length: If this number is high, it could indicate that MongoDB is not able to keep up with the incoming requests.
* Lock time: If lock contention is high, it means MongoDB is spending too much time waiting on locks.
* Memory usage: Look for signs of swapping or insufficient memory.

### b. Examine MongoDB Logs

MongoDB writes logs that can provide useful information about any errors, slow queries, or other issues.

* Logs are usually located in /var/log/mongodb/mongod.log (depending on your configuration).
    > Check the mongod.conf file: The log file path is usually specified in the mongod.conf configuration file under the systemLog.path setting.
    > Use the getCmdLineOpts command in the mongo shell: Connect to the mongo shell and execute the following command:

    ```sh
        db.getSiblingDB('admin').runCommand({getCmdLineOpts: 1})
    ```

* Search for slow queries, errors, or warnings in the log files.

    ```sh
    tail -f /var/log/mongodb/mongod.log
    ```

    ```sh

    grep "slow query" /var/log/mongodb/mongod.log
    <!-- or -->
    grep -i "error" /var/log/mongodb/mongod.log
    <!-- or -->
    grep -i "warning" /var/log/mongodb/mongod.log
    <!-- or -->
    grep -i "exception" /var/log/mongodb/mongod.log


    <!-- alternative -->
    grep -i "slow query" /var/log/mongodb/mongod.log
    grep -i "operation timed out" /var/log/mongodb/mongod.log

    ```

* Search for other important logs:
For connection-related issues, you can search for "connection":

    ```sh
    grep -i "connection" /var/log/mongodb/mongod.log
    ```

    For replication status, search for "replication":

    ```sh
    grep -i "replication" /var/log/mongodb/mongod.log
    ```

    For memory issues, search for "memory":

    ```sh
    grep -i "memory" /var/log/mongodb/mongod.log
    ```

* **nreturned** : Number of documents returned (shows massive queries)
* **millis** : Time taken (shows slow queries)
* **docsExamined, keysExamined** : High numbers mean heavy queries
* **Query filter and namespace** : Shows what was run, on which collection

### c. Use db.currentOp()

MongoDB provides an operation (currentOp) to see the currently running operations. You can check for long-running queries that might be blocking other operations.

```js
db.currentOp()
```

### d. Enable and Check Slow Query Logging

MongoDB has a built-in slow query logger. You can enable it if not already active.

```js
//set
db.setProfilingLevel(1, { slowms: 100 }); // Log queries slower than 100ms

//status
db.getProfilingStatus()


//remove
db.setProfilingLevel(0)
//or
db.setProfilingLevel(0, { filter: "unset" }) // to remove the profiling
//or 
db.system.profile.drop() // drop profile

```

```js
{ "was" : 1, "slowms" : 50, "sampleRate" : 1, "ok" : 1 }
```

**was**: Indicates the current profiling level.  
**slowms**: The threshold in milliseconds for what is considered a "slow" operation, which is used for profiling level 1.  
**sampleRate**: The percentage of slow operations to be profiled, as a value between 0 and 1.  

* If sampleRate: 1, both slow queries will be recorded (2 out of 2).
* If sampleRate: 0.5, on average, 1 out of 2 slow queries will be recorded (50% chance for each slow query to be logged).
* If sampleRate: 0.2, on average, 0.4 out of 2 slow queries will be recorded (20% chance for each slow query to be logged).

> **This will log queries that take longer than 100ms (specified ms). You can analyze these queries and optimize them.**

```js
db.system.profile.find().sort({ ts: -1 }).limit(5)
```

*additionally:*

* MongoDB Profiler is per-node and per-database.
* The profiler on the primary node captures only operations executed on that primary.
* If your application sends read operations to a secondary (using readPreference: "secondary"), those reads are executed on the secondary node only.
* Profiling on the primary will NOT capture queries that are run on the secondary node.

    | Operation Runs On | Profiler Captures? | Logs Capture?      |
    |-------------------|--------------------|--------------------|
    | Primary           | Yes                | Yes                |
    | Secondary         | No                 | Yes (logs only)    |

* Profiler on primary: Only profiles queries executed there (including reads directed to primary).
* Profiler on secondary: Not possible.
* Reads sent to secondary: Only visible in MongoDB logs, not profiler.

## 2. Check Server Resource Utilization

It’s essential to monitor server resource usage, as MongoDB’s performance is heavily dependent on the system’s hardware.

### a. Check CPU Usage

* Use top or htop to check real-time CPU usage.
* Look for high CPU usage on the MongoDB process (mongod).

    ```sh
    top
    ```

If MongoDB is using an unusually high amount of CPU, it could indicate:

* Unoptimized queries (like full collection scans).
* Heavy write operations or large indexes.
* Insufficient CPU power on the server.

### b.Check Memory Usage

MongoDB uses memory aggressively. If it runs out of memory, it starts swapping, which can severely degrade performance.

* Use free -m or vmstat to check memory usage.
* Use smem for a more detailed breakdown of memory usage.

```sh
free -m
```

If you see swap activity, it’s a sign that MongoDB might be under memory pressure. You might need to:

* Add more RAM to your server.
* Optimize the size of your working set.
* Consider using wiredTiger storage engine if you're not already using it (it’s more efficient with memory).

### c.Check Disk I/O

MongoDB’s performance can be severely affected by slow disk I/O, especially if you have a high load with frequent reads and writes.

* Use iostat or dstat to check disk activity.

```sh
iostat -x 1
```

Look for high I/O wait times or slow read/write operations.
If disk I/O is an issue:

* Consider moving your MongoDB data to faster storage (SSD).
* Ensure that the disk isn't close to full.

### d.Check Network Latency

If MongoDB is under heavy load and the application is remotely accessing the database, high network latency can also be a problem. Use ping or netstat to monitor network performance.

```sh
ping <your_mongo_host>

```

## 3. Database Indexing

MongoDB performs best when it has proper indexes, especially for large datasets.

### a. Check Index Usage

Ensure that your frequently queried fields have indexes.

```js
db.collection.getIndexes()
```

You can also check query performance with the explain method to see if queries are using indexes properly:

```js
db.collection.find({ field: value }).explain("executionStats")
```

Look for **IXSCAN** (index scan) rather than a **COLLSCAN** (collection scan), which is much slower.

### b. Optimize Indexes

* Make sure you're only indexing the fields that are necessary.
* Consider compound indexes for queries that filter by multiple fields.
* Use covered queries where the query can be answered entirely using indexes.

## 4. Database Configuration

Check the MongoDB configuration file (mongod.conf) for potential optimizations.

### a. Adjust wiredTigerCacheSizeGB

The WiredTiger storage engine (default) caches data in memory. Ensure that MongoDB’s cache size is configured appropriately based on your system’s RAM.

```yaml
storage:
  wiredTiger:
    engineConfig:
      cacheSizeGB: 2 # (or adjust based on your available RAM)
```

### b. Replica Set and Sharding

* Sharding: If your dataset is growing large, consider implementing sharding to distribute the load across multiple nodes.
* Replica Set: If you're using a replica set, ensure your read/write operations are properly balanced between primary and secondary nodes.  

## 6. Scaling MongoDB

If your current hardware is inadequate, consider scaling your MongoDB deployment:

* Horizontal scaling: Implement sharding to distribute your data across multiple servers.
* Vertical scaling: Upgrade your server (more CPU, RAM, faster disks).
* Replica sets: If read-heavy, distribute load with replica sets.

----

## *Extra notes:*

### 1. What Load Does a Large Query Cause?

#### High Memory Usage

* MongoDB needs to read and temporarily store a large result set in memory or on disk (if not enough RAM).
* This can cause increased RAM consumption, and if memory is exhausted, can lead to swapping (very slow).

#### Increased CPU Usage

> Serializing and transferring a huge amount of data takes CPU resources.
Disk I/O Spike

> If the documents aren’t cached, MongoDB must read them from disk, causing high disk I/O.
This can slow down all database operations.

#### Network Load

> Transferring 500,000 documents over the network can saturate your network bandwidth and make the client/driver slow.
>
#### Cursor Timeouts

* If your client can’t process the data quickly, cursors may timeout, leading to incomplete data fetches.

#### Impact on Other Operations

Large queries can block or slow down other queries and writes, degrading overall database performance.
