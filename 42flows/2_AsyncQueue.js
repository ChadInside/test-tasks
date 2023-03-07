/** 
 * 2. AsyncQueue(2 балла)
Задача которую решали: Нужно было вызывать асинхронную ф-ю аля синхронно
есть источник асинхронных событий, например
const task = async <T>(value: T) => {
    await new Promise((r) => setTimeout(r, 100 * Math.random()));
    console.log(value);
};
если их вызвать одновременно то получим случайный набор чисел

await Promise.all([
    task(1),
    task(2),
    task(3),
    task(4),
]);
// 4 1 3 2

необходимо написать AsyncQueue которая сохранит последовательность
const queue = new AsyncQueue();
await Promise.all([
    queue.add(() => task(1)),
    queue.add(() => task(2)),
    queue.add(() => task(3)),
    queue.add(() => task(4)),
]);
// 1 2 3 4
 */
export { }
const task = async (value) => {
  const result = await new Promise((r) => setTimeout(r, 500 * Math.random()))
  console.log(value);
}

class AsyncQueue {
  constructor() {
    this.queue = []
    this.result = {}
    this.chain = Promise.resolve()
  }
  async add(cb) {
    this.chain = this.chain.then(cb)
    return this.chain
  }
}


const queue = new AsyncQueue();
const queuePromises = [
  queue.add(() => task(1)),
  queue.add(() => task(2)),
  queue.add(() => task(3)),
  queue.add(() => task(4)),
]

await Promise.all(queuePromises);

await Promise.all([
  task(1),
  task(2),
  task(3),
  task(4),
]);