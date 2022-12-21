# 11-ts中class的implement与属性可见性

## 1. 类的接口实现

`interface` 不仅可以用于定义数据类型, 还可以用于在类里面实现其定义的相关方法.

```typescript
interface Database {
  get(id: string): string
  set(id: string, value: string): void
}


class InMemoryDataBase implements Database {
  protected db: Record<string, string> = {}
  get(id: string): string {
    return this.db[id]
  }
  set(id: string, value: string): void {
    this.db[id] = value
  }
}

const myDb1 = new InMemoryDataBase()
myDb1.set('name', 'lucy')
// because protected attribute so can't set db
// myDb1.db['name'] = 'jack'
console.log(myDb1.get('name'))
```

如上代码, `Database` 里面定义了两个方法, 但是没有具体实现, `InMemoryDataBase` 使用``implements` 关键字继承了 `Database` 接口里面的方法, 随后其进行具体的方法实现.



可以看到, 在上面的代码中有`protected db: Record<string, string> = {}` 这么一句, `protected` 表示该属性的访问修饰符, Ts class中的访问修饰符有下面三种

- `public`：公开的，谁都能用（默认就是 `public`）
- `private`：私有的，仅类自己能使用，子类与外部都不能使用
- `protected`：受保护的，仅类和类的子类能使用，外部不能使用

因此, 在上面的例子中,  因为`db` 使用了 `protected` 修饰符, 所以 `myDb1.db['name'] = 'jack'` 不能正常执行, 只能通过类本身或者子类内部调用.

扩展:

Ts中的修饰符除了访问修饰符, 还有只读修饰符, 静态修饰符, 这三个统称为修饰符.

- 只读修饰符 `readonly`

```typescript
class Person{
  readonly name = 'Alice';
}
```

- 静态修饰符 static

`static`, 静态的. 通过`static`修饰的成员叫**静态成员**，静态成员无需实例化，直接通过类名调用

```ts
class Person{
  static a = 98;
}
console.log(person.a)
```

静态成员通常用于整个类所共有的一些东西, 该静态修饰符在后面文章**13节**里面有示例代码



## 2. 类的接口实现和继承区别

在第一部分类使用了`implements` 进行`interface` 的实现, 本部分使用了`extends` 和 `implements` 一起新建一个类.

关于`extends` 和 `implements`的定义

- `implements` :
  实现，一个新的类，从父类或者接口实现所有的属性和方法，同时可以重写属性和方法，包含一些新的功能

- ` extends` :
继承，一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法

```typescript
interface Persistable {
  saveToString(): string
  restoreFromString(storeState: string): void
}

class MyDB extends InMemoryDataBase implements Persistable {
  saveToString(): string {
    return JSON.stringify(this.db)
  }

  restoreFromString(storeState: string): void {
    this.db = JSON.parse(storeState)
  }
}

const myDb2 = new MyDB()
myDb2.set('name', 'lucy-2')
console.log(myDb2.saveToString())

myDb2.restoreFromString('{"name":"lucy-3"}')
console.log(myDb2.saveToString())
```

在上面的具体代码中, `MyDB` 首先继承了类`InMemoryDataBase` 中的所有属性和方法, 如`set` , `get`, 和`db`, 同时其自身也包含新的方法.



扩展: 

- 接口不能实现接口或者类，所以实现只能用于类身上, 即类可以实现接口或类 (如上所示)

- 接口可以继承接口或类

```typescript
// 继承类
interface NewDBInterface1 extends MyDB {}
// 继承接口
interface NewDBInterface2 extends Persistable {}
```

- 类不可以继承接口，类只能继承类
- 可多继承或者多实现