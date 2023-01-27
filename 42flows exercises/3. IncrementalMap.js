/**
 * Задача которую решали: Для блокчейна хотели иметь структуру данных 
 * которая позволит хранить обьект кошелька(баланс, замороженный баланс, …) 
 * для всех пользователей с историей изменений в блоке для быстрой откатки/накатки

Необходимо написать Map c историей состояний и при этом Map должна быть оптимальной 
и не клонить те объекты которые не менялись

+ 3 балла Поддержка ссылочных типов
 */

/** 
 * const map = new IncrementalMap();

map.set('a', 10);
map.set('b', 10);
// map.get('a') === 10
// map.get('b') === 10

map.snapshot(1);

map.set('a', 20);
// map.get('a') === 20
// map.get('b') === 10

map.loadSnapshot(1);
// map.get('a') === 10
// map.get('b') === 10
 */

