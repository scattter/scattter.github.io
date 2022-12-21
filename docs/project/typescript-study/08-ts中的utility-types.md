# 08-ts中的utility-types

对于一个已有的接口, 我们有时候可能需要该对象的所有属性均是必有的, 有时候所有对象都可以选有的, 如果为了不同的需求创建不同的对象无疑很繁琐, 因此utility便出现了.

## 1. 基础的utility
基础接口
```typescript
interface MyUser {
  name: string
  id: number
  email?: string
}
```

- 所有属性必有
```typescript
type RequiredMyUser = Required<MyUser>
```
`name`, `id`, `email` 字段必有

- 所有属性可选
```typescript
type PartialMyUser = Partial<MyUser>
```
`name`, `id`, `email` 字段均可选


- 有部分属性
```typescript
type PickMyUser = Pick<MyUser, 'id' | 'email'>
```
只存在`id`, `email` 字段


- 无部分属性
```typescript
type MyUserWithoutId = Omit<MyUser, 'id'>
```
不存在`id` 字段

## 2. 具体的应用
传入一个`users` 数组, 生成一个map对象, key是每一个`user` 的id

```typescript
const mapById = (items: MyUser[]): Record<MyUser['id'], MyUserWithoutId> => {
  return items.reduce((total, cur) => {
    const { id, ...others } = cur
    return {
      ...total,
      [id]:  others
    }
  }, {})
}

const users = [
  {
    id: 10,
    name: '123',
    email: 'xxx'
  },
  {
    id: 20,
    name: 'sss'
  }
]

console.log(mapById(users))
```