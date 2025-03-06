class Creator {
    data: any
    next: Creator | null
    constructor(value: any) {
      this.data = value
      this.next = null
    }
  }
  
  class Linkedlist {
    count: number
    head: Creator | null
    constructor() {
      this.count = 0
      this.head = null
    }
    prepend(value: any) {
      const node = new Creator(value)
      node.next = this.head
      this.head = node
      this.count++
    }
    insert(value:any,index:number){
        if(index<0||index > this.size()){
            return
        }
        
    }
    append(value: any) {
      const node = new Creator(value)
      if (this.isEmpty()) {
        this.head = node
      } else {
        let prev = this.head
        while (prev?.next) {
          prev = prev.next
        }
        prev!.next = node
      }
      this.count++
    }
    print() {
      let curr = this.head
      if (!curr) console.log("list is empty");
  
      while (curr) {
        console.log(curr.data);
        curr = curr.next
      }
    }
  
    size() {
      return this.count
    }
    isEmpty() {
      return this.count === 0
    }
  }
  
  const list = new Linkedlist()
  // list.print()
  // list.prepend(10)
  // list.print()
  // list.prepend(20)
  // list.prepend(30)
  // list.print()
  
  list.print()
  list.append(10)
  list.append(20)
  list.append(30)
  list.print()