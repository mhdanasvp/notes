# Docker

**hypervisor** is creating virtual servers on top of physical servers.  
> Hardware hypervisor: No OS installed  
Software hypervisor: install in OS (VM ware, virtual box)  

- **VMM**: *Virtual Machine Monitor*
- **Physical server**: allocated a single user and not installed any hypervisor  
- **Containers**: another process in your machine and it has been isolated from other process
- docker compose: working as an orchestrator.  
- Kubernetes containers called **pods**.  
- **Docker engine**  
  - Community edition.  
  - Kubernetes client need to install.  
  - Supports CI/CD pipelines (jenkins,..).  
- **Docker desktop**  
  - Enterprice edition.
  - Kubernetes is there default.

## Commands

```shell
# Check Docker version
docker --version

# Check Docker detailed information
docker info

# List Docker-related processes
ps aux | grep -i docker

# Check permissions of the Docker socket file
ls -l /var/run/docker.sock
```  

---

```shell
open -a Docker
# to open the docker desktop
```  

### important concepts

> docker client will talk to the docker server by using unix socket (REST api) and it is an non n/w unix socket. Both client and server must be in same machine.It can't talk each oter over the n/w. We have to use SSH or TLS based communication if it really want to communicate over the n/w.  

- Images
- Container Creation
- Networking
- Volume Mnagement
- Buildimg Images  

#### Working

- docker daemon will creates the containers. It check the image is available or not in local s/m, if not available then it will download from **docker hub** (Auth required for private images) and it will create the image.  
- Docker daemon calls the **containerd** by using gRpc(like crud api).  
- **containerd** will create a OCI bundle from the image.
- **runc** willcreate the container from the OCI bundle
- **runc** will intract with OS kernel to construct the needs to create a container
- **runc** will call particular libcontainer to do particular actions.  
- using namespace and cgroups container will create in the backend.  

![dockr daemon](./Screenshot%202024-06-20%20at%203.28.36 PM.png)

```shell
# it will pull the image from docker hub
docker pull <$image_name>:<$verison>
# <verison> default will be latest
```  

List all the **docker images** availble in your machine

```shell
# to list alll the docker images in your machine
docker images
# or
docker image ls
```  

**Run** the docker in a container

```shell
# to run the image
docker container run <$image_name>
```  

Options  
`--detach | -d` detached mode  
`-t` terminal  
`-i` intractive  
`--name` container name  
`--hostname` host name (to login to the container)  
`-e` environment variables  
`-p` port host port:container port  

```shell
# to run in detached mode
docker container run -d <$image_name>
docker container run -d -it --name nginx-main --hostname nginx-main-host -p 8000:80 -e PASSWPRD qwerty <$image_name>
```  

Port forwarding

```shell
docker container run -p 8000:80 <$image_name>
# host_port : container_port  
```  

List all the docker **containers running** in your machine

```shell
# to list all the docker containers running in your machine
docker ps
# or
docker container ls
```  

Options  
`-a` list all containers (including stopped containers)

To check the container info

```shell
# to inspect
docker inspect <$container_name>
#or
docker container inspect <$container_name>
#or
docker container inspect <$container_id>
```  

To stop the container

```shell
# stop
docker stop <$container_id>
docker container stop <$container_name>
```  

To restart the container

```shell
# start
docker start <$container_id>
docker container start <$container_name>
```  

To remove the container

```shell
# remove
docker rm <$container_id>
docker container rm <$container_name>
```  

Options  
`-f` force

To login to the container

```shell
# remove
docker exec -i -t <$container_name_or_hostname> bash
docker container rm <$container_name>
```  

this (container/service) will not be available outside of this container(VM) until implementing port forwarding.

### Restart policy

- No or never (default)
- Always
- On failure unless stpped
- unless-stopped

Restart Policy

```shell
# while starting
docker container run <$container_id>
# after starting
docker container update --restart always <$container_id>
# we check this by using docker inspect command
```  

---

### Dockerfile

- **ADD**:Add local or remote files and directories.  
- **ARG**:Use build-time variables.  
- **CMD**:Specify default commands.  
- **COPY**:Copy files and directories.  
- **ENTRYPOINT**:Specify default executable.  
- **ENV**:Set environment variables.  
- **EXPOSE**:Describe which ports your application is listening on.  
- **FROM**:Create a new build stage from a base image.  
- **HEALTHCHECK**:Check a container's health on startup.  
- **LABEL**:Add metadata to an image.  
- **MAINTAINER**:Specify the author of an image.  
- **ONBUILD**:Specify instructions for when the image is used in a   build.
- **RUN**:Execute build commands.  
- **SHELL**:Set the default shell of an image.  
- **STOPSIGNAL**:Specify the system call signal for exiting a   container.
- **USER**:Set user and group ID.  
- **VOLUME**:Create volume mounts.  
- **WORKDIR**:Change working directory

### watch the containers

```shell
watch docker container ps -a
```  

### create network

```shell
docker network create -d bridge my-net
```  

**bridge**: The default network driver.  

**host**: Remove network isolation between the container and the Docker host.  

**none**: Completely isolate a container from the host and other containers.  

**overlay**: Overlay networks connect multiple Docker daemons together.

**ipvlan**: IPvlan networks provide full control over both IPv4 and IPv6 addressing.  

---
