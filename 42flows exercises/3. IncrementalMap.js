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
    this.map = new Map()
    this.superMap = new Map()

  }

  set(key, value) {
    this.map.set(key, value)
    this.map.forEach((key, value)=> {
      console.log(key, ",: ", value)
      console.log(this.map.get(key))
    })
  }
  get(key) {
    this.map.get(key)
  }
  snapshot(milestone) {
    this.superMap.set(milestone, this.map)
  }
  loadSnapshot(milestone) {
    this.map = this.superMap.get(milestone)
  }
}


const map = new IncrementalMap()

map.set('a', 10)
map.set('b', 10)
assert.equal(map.get('a'), 10)
assert.equal(map.get('b'), 10)

map.snapshot(1)

map.set('a', 20)
assert.equal(map.get('a'), 20)
assert.equal(map.get('b'), 10)

map.loadSnapshot(1)
assert.equal(map.get('a'), 10)
assert.equal(map.get('b'), 10)


