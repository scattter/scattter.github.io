# 基于Grid的栅格化布局

## 1. 背景

最近有个需求, 需要在网站首页做一个栅格区, 该区域可以被运营用来展示一些活动/宣传等. 由于其定位是营销位, 因此其必须要满足可配置, 自由度高, 可以自由排列. 类似下图

![image-20240328111720284](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20240328111720284.png)



## 2. 具体实现

刚接手这个需求的时候, 整理了下这个布局的一些特性

- 有基础栅格
- 每个栅格的大小都是以基础栅格为单位进行增减, 且均为圆角矩形
- 每个栅格的位置都能随意变化

依据上面特性, 有了下面的开发



### 2.1 栅格位置和大小的确认

一开始我想的是使用瀑布流进行栅格的布局, 这样能保证每个栅格的宽度是自适应的, 但是瀑布流一般是单向的, 且也不支持固定位置; 其次是给两套固定的模板, 根据数据模板类型使用不同的模板进行数据渲染, 但是这样自由度不能保证, 每次新增模板就要新增代码.

后来, 我想到很多路径规划的算法会经常用到 `[x, y]` 来控制元素的位置, 然后由于我们这里的栅格均是基于基础栅格进行定位渲染的, 那我完全可以使用坐标轴来数字化栅格区. 即: 使用`[x, y]` 定位栅格位置, 然后使用 `row` 和 `column` 控制栅格占据的行和列, 进而确定栅格的大小.

这样一来, 栅格的位置和大小可以确定了, 但是页面的布局应该怎么处理?



### 2.2 栅格布局处理

我初始想的是使用 `js` 来判断栅格的渲染位置, 但是想了下没有好的实现方式, 因此也只能想有没有其他方法可以更改元素位置. 于是, 我想到了 `grid` 布局, 由 `css` 来控制每个栅格的布局. 由于之前用的少, 所以查了下文档, 发现其确实符合需求:

- `grid-template-columns` 和 `grid-template-rows` 用来确定 `grid` 布局区域的行和列
  - 如 `grid-template-columns = repeat(5, 1fr)` 均等分为5列, `grid-template-rows = repeat(2, 86.8px) repeat(1, 76px)` 分为三行, 其中前两行高度为 `86.8px` , 后一行为 `76px` . 这两个属性便将基础的栅格划分出来了.
- `grid-area` 属性可以用来确定栅格所处的位置 (栅格虚拟坐标轴起始位置为 `[1, 1]` )
  - 如 `grid-area = 1 / 1 / 3 / 4` 表示此元素从 `[1, 1]` 开始, 横跨两行三列
- `grid-gap` 属性可以用来确定栅格的间距

经过上面三个属性的设置, 我们就解决了元素布局的问题.

至此, 整个栅格布局的方案就明确了: **坐标轴定位 + `grid` 布局**



### 2.3 配置后台参数

由于栅格布局经常会变动, 运营有很灵活的需求, 所以需要一个配置后台. 运营更新布局后将数据传给前端, 前端就可以根据数据进行布局的渲染. 

其对应的参数如下:

```typescript
export interface IConfigGridProps {
  data: IGridConfig[];
  /**
   * 默认间距
   */
  gutter?: number;
  /**
   * 设置总栅格列
   */
  totalColumn: number;
  /**
   * 设置总栅格行
   */
  totalRow: number;
}

export interface IGridConfig {
  // 栅格开始的位置 [x轴, y轴]
  start: [number, number];
  // 栅格占据的行数
  row: number;
  // 栅格占据的列数
  column: number;
  // 栅格类型
  type: GRID_TYPE;
  // 栅格具体内容
  payload: IGridInfo;
}
```



### 2.4 前台实现

```
// mock数据
const gridInfo = {
	gutter: 24,
  totalColumn: 3,
  totalRow: 2,
  data: [
    {
      start: [0,0],
      row: 2,
      column: 2,
      payload: {
        title: 'first'
      }
    },
    {
      start: [0,2],
      row: 1,
      column: 1,
      payload: {
        title: 'second'
      }
    },
    {
      start: [1,2],
      row: 1,
      column: 1,
      payload: {
        title: 'third'
      }
    }
  ]
}

// 组件
const GridArea: React.FC = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: `repeat(${gridInfo.totalRow}, 1fr)`,
        gridTemplateColumns: `repeat(${gridInfo.totalColumn}, 1fr)`,
        gridGap: gridInfo.gutter ?? '24px',
      }}
    >
      {(gridInfo.data ?? []).map((value) => {
        const { payload, start, column, row } = value;
        return (
          <div
            key={start.join('-')}
            styleName="main"
            style={{
              gridArea: `${start[0] + 1} / ${start[1] + 1} / ${start[0] + row + 1} / ${start[1] + column + 1}`,
            }}
          >
            {payload.title}
          </div>
        );
      })}
    </div>
  );
};
```

上面代码实现的效果如下所示

![77_36cc4a5b-fe4a-4037-a37d-9639939b6b1f](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_36cc4a5b-fe4a-4037-a37d-9639939b6b1f.png)