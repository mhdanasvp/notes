# Child process

## exec

```javascript
import { exec } from "child_process"

exec("ls -lh", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return
    }
    if(stderr){
        console.log(`error: ${error.message}`);
        return
    }
    console.log(`stdout: ${stdout} `);
})
```

- exec launches a child process by running the command string in a shell (sh on Unix, cmd.exe on Windows).
- Node creates a ChildProcess object and starts the shell process; that shell executes your command.
- stdout and stderr produced by the command are captured (buffered) by Node and delivered to the callback as strings (or Buffers if you change encoding).
- exec returns the ChildProcess object immediately so you can interact with it (e.g., child.pid, child.kill()).

*pros*.  

- Convenient for quick, short commands that use shell features (pipes, globbing, redirection).
- Returns a ChildProcess object so you can still interact with pid, streams and events if needed.
- Supports useful options (cwd, env, timeout, maxBuffer, killSignal, encoding).
- Good for small admin tasks or quick scripts where buffering output is acceptable.

*cons*. 

- Runs the command in a shell (sh / cmd.exe), so shell injection risk (interpolate untrusted input into the command string) and Behavior may vary across platforms(quoting/escaping differences).
- Buffers stdout/stderr in memory so, large output can blow past maxBuffer and cause errors or high memory usage  

  ```js
  exec("find /", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return
    }
    if(stderr){
        console.log(`error: ${error.message}`);
        return
    }
    console.log(`stdout: ${stdout} `);
  })
  ```

- Higher overhead than spawn for streaming because exec buffers before callback.
- If the child generates a lot of data, exec can block memory and be slower than spawn.
- If used for high throughput, spawning new shells frequently is costly.



## execFile

```javascript
execFile("./script.sh", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return
    }
    if(stderr){
        console.log(`error: ${error.message}`);
        return
    }
    console.log(`stdout: ${stdout} `);
})
```

```sh
#!/bin/bash

ls -lh
```

- execFile runs an executable file directly (no shell). You pass the program and an argv array. It does not perform shell interpolation, so it’s safer than exec for untrusted input.

*pros*.  
(same like exec) ++

- runs a binary directly with argv -> safe from shell injection and slightly faster because no shell is spawned.  

*cons*.  
same like exec

## spawn

```javascript
import { spawn } from "child_process"

const child = spawn("ls", ["-lh"])

child.stdout.on("data", (data) => {
    console.log("stdout",data);
})
child.stderr.on("data", (data) => {
    console.log("stderr",data);
})
child.on("error", (err) => {
    console.log(err);
})
child.on("exit", (code, signal) => {
    if (code) console.log("exit code: ", code);
    if (signal) console.log("exit signal: ", signal);
    console.log("done");
    
})
```

spawn launches a new process without a shell, returns a ChildProcess immediately, and gives you streaming access to stdout/stderr/stdin. Use spawn for long-running processes, large/continuous output, or real‑time streaming. It’s more efficient and safer than exec when you don’t need shell features.
*pros*.  

- spawn streams output (you process chunks as they arrive).
- Streams: child.stdout (Readable), child.stderr (Readable), child.stdin (Writable). 
- Provides real-time streaming access to child.stdout and child.stderr so you can process output as it arrives (no buffering limits).
- Control: child.pid, child.kill(signal), child.on('exit', ...), child.on('error', ...).
- Runs the program directly (no shell) when given command + args array, reducing shell-injection risk.
- Efficient for large/continuous output
- Control stdio configuration, piping, inheritance, file descriptors, and kill signals.
- use when Output is large or continuous and you need streaming.

*cons*.  

- More boilerplate for simple commands (more events)
- You must implement timeouts/kill logic yourself (exec has a timeout option).

## fork

```js
import { fork } from "child_process"

app.get("/sum", (req, res) => {
    const child = fork("./longTask.js")
    child.send("start")
    child.on("message", ({result,pid}) => {
        res.send({ result, child_pid: pid,main_pid:process.pid })
    })
})
```

```js
//longTasj.js
function longComputation(){
    let sum=0
    for (let i = 0; i < 1e10; i++) {
        sum+=i
    }
    return sum

}

process.on("message",(message)=>{
    if(message=="start"){
        let result = longComputation()
        process.send({result,pid:process.pid})
    }
})
```

In this case, the main_pid remains the same for all parallel calls, while the child_pid changes for each call, and it is assigned using a *round-robin approach*.

- fork automatically sets up an IPC channel between parent and child (unlike spawn/exec/execFile).
- Node spawns a new Node process (separate V8 instance, separate heap).
- An IPC channel (a pipe/socket) is created and accessible as process.send in the child and child.send in the parent.

*pros*.  

- Simple IPC: send JS objects with process.send/child.on('message').
- Full process isolation: separate heap and V8 instance — crashes/leaks in child don’t crash parent.
- Good for running untrusted or unstable code, or different Node versions/flags.  

*cons*.  

- Higher startup cost than worker_threads (new Node instance, more memory).
- IPC serialization overhead (copying) — heavier than worker_threads transferables.
- Spawning many children per request is expensive — use pooling/throttling for high throughput.
- Communication is via serialization (not shared memory) so large binary transfer is costlier than transferables in worker_threads.

### cluster & fork

```javascript
if (cluster.isPrimary) {
    os.cpus().forEach(d => {
        cluster.fork()
    })
} else {
    app.listen(9999, () => console.log(`process ${process.pid}running on  9999`))
}
```

When you run multiple Node worker processes (cluster mode or a process manager like PM2 in cluster mode), there is a master/load‑balancer that accepts incoming TCP connections and hands each new connection to one worker process.
The scheduling is done per TCP connection (round‑robin or similar). Once a connection is accepted by a worker, all HTTP requests on that same TCP connection (HTTP/1.1 keep‑alive) go to the same worker.

```javascript
app.get("/test", (req, res) => {
    for (let i = 0; i < 1e10; i++) {

    }
    res.send(`test 2 ok from ${process.pid}`)
})
```

**1. In a single Node process**  
 each parallel/concurrent request will be blocked by that for-loop. The first request that enters the handler ties up the event loop and no other requests will be processed until that loop finishes. So concurrent calls queue up (or time out) and responses are very delayed. 

- JavaScript runs on one event loop / one OS thread. The synchronous loop (for i < 1e10) blocks that thread.
- While blocked:
  - No other JS callbacks, no request handlers, no timers, no responses; the server appears frozen.
  - TCP connections may be accepted by the kernel and queued in the accept backlog, but Node cannot accept and handle them until the event loop becomes free.
  - Clients will either wait, get a timeout, or eventually see connection errors if backlog fills.

**2. In a multi-process setup (Node cluster / PM2 cluster)**  

the OS/master distributes incoming TCP connections across worker processes. A worker running the blocking loop can only process that request; other workers can accept new connections and handle other requests, so you’ll see different process IDs for some requests. But any requests assigned to the busy worker (including reused keep‑alive connections) will still be blocked.

- A master (or kernel) hands new TCP connections to workers. Assignment is done per connection.
- A blocking handler in one worker only blocks that worker’s event loop. Other workers remain responsive and will handle new connections.
- If a client reuses a keep‑alive connection that was assigned to the busy worker, that request will remain blocked on that same worker.
- If you open many concurrent new connections, the master will distribute them across workers — so some requests will be handled by other PIDs.

**3. keep-alive connections**.  

- If the client reuses a keep‑alive connection, every request sent on that connection goes to the same worker process.  
- If that worker is busy (e.g., stuck in your for-loop), requests on that connection are blocked until the worker gets back to them — even if other workers are idle.
- So fast repeated requests from the same client + keep‑alive = they keep hitting the same pid (same worker).
- If you open new connections in parallel, the master/OS can assign those new connections to other workers, so you may see different pids.

*example*:  
Socket.IO normally uses a long‑lived transport (WebSocket, or xhr-polling as a fallback), which is a single TCP connection per client. That socket/connection is assigned to one worker process, so any blocking (CPU) work in that worker will block handling of events for all sockets owned by that worker. You must use sticky sessions and/or an adapter to scale sockets across multiple processes.  
*solution*.

- keep each client’s socket connected to one worker (that’s normal for WebSocket)
- share socket state/events across workers with a pub/sub adapter (Redis)
- avoid blocking the worker’s event loop by offloading heavy CPU work to worker threads / a worker pool (or separate processes / queue).  

**Piscina**  

- offloads CPU-heavy work to worker threads. That keeps the main event loop free.
- Do not spawn a worker thread per request without pooling - spawn cost is high
- Creating a new Worker (worker_threads) per request has non-trivial overhead (spawn time, memory setup, V8 initialization, IPC channel). For high request rates this becomes costly and causes latency and wasted CPU/memory.
- A pool creates N workers once and reuses them. When a request arrives you hand the job to an available worker. If all workers are busy the job is queued until a worker becomes free. This reduces latency and resource churn and lets you control concurrency.

```js
import Piscina from "piscina"
const pool = new Piscina({ filename: "./longTask.js", maxThreads: Math.max(1, os.cpus().length - 1) });


app.get("/sum", async (req, res) => {
    const { result, pid } = await pool.run({ n: 1e10 });
    res.send({ result, child_pid: pid, main_pid:process.pid })
})
```

```js
//longTask.js
import {threadId} from "worker_threads"
export default function longComputation({n}){
    let sum=0
    for (let i = 0; i < n; i++) {
        sum+=i
    }
    return {result:sum,pid:threadId}
}

```

**worker_threads**.  

- worker_threads: lightweight OS threads inside the *same Node process*. Good for CPU‑bound JavaScript, low overhead, supports SharedArrayBuffer/transferables.
- worker_threads: share the same address space and process PID. Bugs in native addons or memory corruption can affect whole process.
- worker_threads: threadId (1,2,...) is unique per thread; process.pid is the same as parent.
- worker_threads: lower memory overhead, faster startup (create thread + V8 isolate reuse).
- worker_threads: lower IPC overhead, better for high-throughput small tasks; good for many short CPU tasks.
- worker_threads: can share memory via SharedArrayBuffer and pass ArrayBuffers by transferList (zero-copy).
- Use Piscina (worker_threads pool) when: You run heavy synchronous JS (parsing, compression/encryption, image processing in JS, large loops) that blocks the event loop.

**child processes**.  

- child processes (fork/spawn/cluster): separate OS processes with their own Node instances and heaps. Good for isolation, running different Node flags or non‑JS binaries, and for getting distinct OS PIDs.
- child_process: full process isolation (separate memory, separate PID); crashes in child usually don’t crash the parent.
- child_process: each child has its own process.pid (distinct OS PID).
- child_process: heavier memory usage (another full Node instance), slower to start.
- child_process: higher IPC and serialization overhead; better when you need isolation or to run binaries.
- processes: no shared heap; data must be serialized or shared via OS facilities (shared memory, files, mmap).