/**
 * Задача которую решали: Для блокчейна хотели иметь структуру данных 
 * которая позволит хранить обьект кошелька(баланс, замороженный баланс, …) 
 * для всех пользователей с историей изменений в блоке для быстрой откатки/накатки

Необходимо написать Map c историей состояний и при этом Map должна быть оптимальной 
и не клонить те объекты которые не менялись

+ 3 балла Поддержка ссылочных типов
 */

import assert from 'assert'



class IncrementalMap {
  constructor() {
    this.previousStateSymbol = Symbol('previousState')
    this.currentMap = new Map()

    this.currentMap.set(this.previousStateSymbol, null)

    this.superMap = new Map()
  }

  set(key, value) {
    this.currentMap.set(key, structuredClone(value))
  }

  get(key) {
    if (this.currentMap.has(key)) {
      const value = this.currentMap.get(key)
      return structuredClone(value)
    } else {
      if (this.currentMap.get(this.previousStateSymbol) !== null) {
        return this.#_get(key, this.currentMap.get(this.previousStateSymbol))
      }
      else {
        return undefined
      }
    }

  }

  /**
   * @param {string} key
   * @param {Map} map
   */
  #_get(key, map) {
    if (map.has(key)) {
      const value = map.get(key)
      return structuredClone(value)
    }
    else {
      if (map.get(this.previousStateSymbol) !== null) {
        return this.#_get(key, map.get(this.previousStateSymbol))
      }
      else {
        return undefined
      }
    }

  }

  printCurrentState() {
    //prints all data from previous snapshot till current state
    this.printMap(this.currentMap)
  }

  printState(tag) {
    const state = this.superMap.get(tag)
    this.printMap(state)
  }


  printCompleteCurrentState() {
    this.printCurrentState()
    const previousState = this.currentMap.get(this.previousStateSymbol)
    if (previousState === null) { console.log('reached root of the tree') }
    else { this.printCompleteState(previousState, 1) }
  }
  /**
 * @param {Map} state
 */
  printCompleteState(state, depth = 0) {
    this.printMap(state, depth)
    const previousState = state.get(this.previousStateSymbol)
    if (previousState === null) { console.log('reached root of the tree') }
    else { this.printCompleteState(previousState, depth + 1) }
  }

  /**
   * @param {string|number} tag
   */
  snapshot(tag) {
    console.log("creating snapshot ", tag)
    if (this.superMap.has(tag)) {
      console.log("tag already exists ", tag)
    } else {
      const previousMap = this.currentMap
      this.superMap.set(tag, previousMap)
      this.currentMap = new Map
      this.currentMap.set(this.previousStateSymbol, previousMap)
    }
  }
  /**
 * @param {string|number} tag
 */
  loadSnapshot(tag) {
    console.log("loading snapshot ", tag)

    this.currentMap = new Map()
    this.currentMap.set(this.previousStateSymbol, this.superMap.get(tag))

  }







  /**
 * @param {Map} map
 */
  printMap(map, depth = 0) {
    for (const [key, value] of map) {
      if (key !== this.previousStateSymbol)
        console.log(" ".repeat(depth * 2), key, ": ", value)
    }
  }
}


const map = new IncrementalMap()
debugger
map.snapshot(0)
map.set('a', 10)
map.set('b', 10)

map.snapshot(1)
console.log("")
map.printCompleteCurrentState()

map.set('c', 10)

assert.equal(map.get('a'), 10)
assert.equal(map.get('b'), 10)
assert.equal(map.get('c'), 10)
map.loadSnapshot(1)

assert.equal(map.get('a'), 10)
assert.equal(map.get('b'), 10)
assert.equal(map.get('c'), undefined)

map.set('d', 10)
map.set('a', 20)
map.set('e', 10)

assert.equal(map.get('a'), 20)


map.snapshot(2)
map.printCompleteCurrentState()

assert.equal(map.get('a'), 20)


map.set('f1', 10)
map.snapshot(3)
map.printCompleteCurrentState()

map.set('g1', 10)
map.snapshot(5)

map.printCompleteCurrentState()


map.loadSnapshot(2)
map.printCompleteCurrentState()

assert.equal(map.get('f1'), undefined)
assert.equal(map.get('g1'), undefined)

map.set('f2', 10)
map.snapshot(4)
map.set('g2', 10)
map.snapshot(6)
map.printCompleteCurrentState()

map.loadSnapshot(5)
map.printCompleteCurrentState()
assert.equal(map.get('f2'), undefined)
assert.equal(map.get('g2'), undefined)
assert.equal(map.get('f1'), 10)
assert.equal(map.get('g1'), 10)

assert.equal(map.get('a'), 20)
assert.equal(map.get('b'), 10)
map.loadSnapshot(0)
map.printCompleteCurrentState()

const array = []
map.set('a', array)
map.snapshot(11)
// const array1 = map.get('a')
// array1.push('value')
array.push('value')
map.snapshot(12)
map.set('b', 10)
map.snapshot(13)
map.set('c', 10)
map.printCompleteCurrentState()

array.push('value2')
map.loadSnapshot(13)
map.printCompleteCurrentState()

// map.printCurrentState()
// map.printCompleteCurrentState()

// console.log(map.get('a'), map.get('c'))


// // map.printCurrentState()
// map.printCompleteCurrentState()


// map.set('c', 30)
// map.set('d', 30)
// // console.log(map.get('a'), map.get('c'))
// map.printCompleteCurrentState()
// map.snapshot(2)
// map.set('e', 40)
// map.printCompleteCurrentState()

// assert.equal(map.get('a'), 20)
// assert.equal(map.get('b'), 10)

// map.loadSnapshot(1)
// assert.equal(map.get('e'), 40)
// assert.equal(map.get('b'), 10)
// console.log(map.get('a'), map.get('c'))



