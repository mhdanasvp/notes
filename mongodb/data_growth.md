# Mongo DB

```js
db.stats()
```

```js
{
    "db" : "sanar",
    "collections" : 605.0,
    "views" : 5.0,
    "objects" : 51977421.0,
    "avgObjSize" : 1826.2034447803787,
    "dataSize" : NumberLong(94921345281),
    "storageSize" : NumberLong(24822837248),
    "indexes" : 1005.0,
    "indexSize" : NumberLong(3907919872),
    "totalSize" : NumberLong(28730757120),
    "scaleFactor" : 1.0,
    "fsUsedSize" : NumberLong(60659355648),
    "fsTotalSize" : NumberLong(207929917440),
    "ok" : 1.0,
    "$clusterTime" : {
        "clusterTime" : Timestamp(1758098788, 5),
        "signature" : {
            "hash" : BinData(0, "12321312"),
            "keyId" : NumberLong(2132323213)
        }
    },
    "operationTime" : Timestamp(1758098788, 5)
}
```

### Database Statistics Breakdown

| Field         | Value             | Meaning/Explanation                                                                                   |
|---------------|------------------|------------------------------------------------------------------------------------------------------|
| db            | "sanar"          | The name of the database.                                                                            |
| collections   | 605.0            | Number of collections (tables) in this database (excluding system collections).                      |
| views         | 5.0              | Number of views in the database (virtual collections created by aggregation pipelines).               |
| objects       | 51,977,421.0     | Total number of documents (records/rows) across all collections.                                     |
| avgObjSize    | 1,826.2 bytes    | Average size (in bytes) of a single document.                                                        |
| dataSize      | 94,921,345,281   | Total size, in bytes, of all data stored in documents (about 94.9 GB).                               |
| storageSize   | 24,822,837,248   | The amount of space allocated on disk for document storage (about 24.8 GB, after internal compression).|
| indexes       | 1,005.0          | Total number of indexes on all collections.                                                          |
| indexSize     | 3,907,919,872    | Total size, in bytes, of all indexes (about 3.9 GB).                                                 |
| totalSize     | 28,730,757,120   | Total storage size for data + indexes (about 28.7 GB, after compression).                            |
| scaleFactor   | 1.0              | Factor used to scale returned sizes (usually 1, unless specified for output in KB/MB/GB).            |
| fsUsedSize    | 60,659,355,648   | Amount of filesystem space used by MongoDB on the disk (about 60.7 GB).                              |
| fsTotalSize   | 207,929,917,440  | Total size of the filesystem where MongoDB stores its data (about 207.9 GB).                         |
| ok            | 1.0              | 1 means the command ran successfully.                                                                |
| $clusterTime  | ...              | Internal cluster timestamp (for replication/cluster consistency).                                    |
| operationTime | ...              | Timestamp for the stats operation.                                                                   |

#### Notes

* dataSize is the total uncompressed size of all documents in your database (~95 GB).
* storageSize is the actual disk space used for those documents after MongoDB's internal compression (~24.8 GB).
* indexSize is the disk space used by all indexes.
* totalSize is the combined storage size of data and indexes (after compression).
* fsUsedSize and fsTotalSize give you insight into total and used space on your disk partition.
* collections, views, objects indicate the number of collections, views, and documents.

> fsUsedSize = Disk space currently used by MongoDB data (on your hard disk or SSD) .
> fsTotalSize = Total disk capacity available for MongoDB on that partition (allocated for mongo db).  

---

#### Default Units (when you run db.stats() with no arguments)

* Sizes (e.g., dataSize, storageSize, indexSize, totalSize, fsUsedSize, fsTotalSize):
Bytes

* Counts (e.g., collections, views, objects, indexes):
Number of items (integer count)

* Averages (e.g., avgObjSize):
Bytes (average object/document size)

* scaleFactor:
Usually 1 (unless you specify a different scale)

#### Reference Table

| Unit | Formula to Convert from Bytes           |
|------|----------------------------------------|
| KB   | Bytes / 1024                           |
| MB   | Bytes / (1024 × 1024)                  |
| GB   | Bytes / (1024 × 1024 × 1024)           |


