class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkListing {
  constructor() {
    this.head = null;
  }

  insertFirst(data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    return this.head;
  }

  printNodes() {
    const current = this.head;

    while (current.next) {
      console.log(current.data);
    }
  }
}

const ll = new LinkListing();

ll.insertFirst(100);
ll.insertFirst(200);
