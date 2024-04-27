

class Queue{
    constructor(){
        this.queue=[];
    }
  
    enqueue(item){
        this.queue.push(item);
    }
  
    dequeue(){
        if (this.isEmpty()) {
            return null;
          }
          return this.queue.shift();
    }
  
    peek() {
        if (this.isEmpty()) {
          return null;
        }
        return this.queue[0];
      }
    
      getSize(){
        return this.queue.length;
      }
  
      //Fisher-Yates shuffle algorithm
      shuffleQueue() {
        for (let i = this.queue.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
        }
    }
  }
  

const WatchList = () => {

}