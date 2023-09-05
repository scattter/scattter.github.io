# 工厂模式

> https://refactoringguru.cn/design-patterns/factory-method

**工厂方法模式**是一种创建型设计模式， 其在父类中提供一个创建对象的方法， 允许子类决定实例化对象的类型。

用简单的话来说, 一个对象来到工厂后, 工厂对其进行特殊化定制, 即得到所需的对象.



## 模式理解

同样以弹窗组件为例, 我们弹窗组件设置为基类, 子类可能是确认弹窗, 也可能是表单弹窗, 删除弹窗. 弹窗的展现样式不同, 但是肯定都支持关闭弹窗. 那么怎么使用一个基类扩展出来这么多不同样式的子类呢?

上一篇`装饰器模式` 中描述了一种扩展基类的方法, 通过该模式貌似也可以实现上面的需求. **我自己理解**, 装饰器模式生成的子类更独立一点, 属于对原有类的加强, 不是加工工厂, 更像是修理铺. 工厂模式的话是直接就有对应的流水线, 简单快捷, 每次使用的时候不用显示调用`new` 去创建.



```typescript
// 基类
interface Dialog {
  open: () => void
  close: () => void
  operation: () => string
}

// 确认弹窗
class ConfirmDialog implements Dialog {
  public operation(): string {
    return 'confirm dialog'
  }

  public close(): void {
    console.log('just need to confirm')
  }

  public open(): void {
  }
}

// 表单弹窗
class FormDialog implements Dialog {
  public operation(): string {
    return 'form dialog'
  }

  public close(): void {
    console.log('maybe need to interact with backend')
  }

  public open(): void {
  }
}

// 工厂
abstract class DialogCreator {
  public abstract factoryMethod(): Dialog;

  public someOperation(): string {
    const dialog = this.factoryMethod();
    return `Creator: The dialog is ${dialog.operation()}`;
  }
}

// 确认弹窗生成器(流水线1)
class ConfirmDialogCreator extends DialogCreator{
  public factoryMethod(): Dialog {
    return new ConfirmDialog();
  }
}

// 表单弹窗生成器(流水线2)
class FormDialogCreator extends DialogCreator{
  public factoryMethod(): Dialog {
    return new FormDialog();
  }
}

// 具体使用
function dialogOperation(creator: DialogCreator) {
  console.log(creator.someOperation())
  return creator.someOperation()
}

// confirm dialog
const confirmed = dialogOperation(new ConfirmDialogCreator())

// form dialog
const form = dialogOperation(new FormDialogCreator())
```

可以发现, 如果是基于装饰器模式去创建的话, 那么就意味着基类的方法也会被调用, 无法重写一个完全不一样的子类.

我理解有限, 大致总结为

- 装饰器是功能的增加, 原功能和新增加的功能都会生效;
- 工厂模式是功能的构建, 每一个流水线构建自己所需要的功能, 不同流水线的同一个方法不存在共用功能.



根据上面的一些总结, 发现如果将这两个模式组合在一起, 好像是更全面的一个模式, 这里我后面找人问下再学习学习.



