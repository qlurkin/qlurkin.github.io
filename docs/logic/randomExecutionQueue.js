const queue = []
let sleep = true

export function addJob(fun) {
  queue.push(fun)
  execute()
}

function execute() {
  if(!sleep) return

  sleep = false

  function run() {
    if(queue.length === 0) {
      sleep = true
      return
    }
    const index = Math.floor(Math.random()*queue.length)
    const fun = queue[index]
    queue.splice(index, 1)
    fun()
    Promise.resolve().then(run)
  }
  run()
}
