# Transform模型初步探索

## 基本流程

```mermaid
flowchart LR
	用户输入 --> embedding分词 --> 添加位置信息 --> a[预归一化LayerNorm处理]
	subgraph block1[一个完整的Encoder]
	subgraph multiHead1[多头注意力计算]
	comment1[并行计算, 计算不同特征信息, 最后拼接在一起]:::comment
	subgraph singleHead1[单头自注意力计算 -> 小模型一般为8/12个头]
	comment2[根据处理头head_size的数量, 将高维输入n转为低维向量n/header_size]:::comment
	header1[处理头1, 用来提取特征1信息]
	end
	headerx[处理头2, 用来提取特征x信息]
	header2[其他处理头...]
	end
	a --> header1
	a --> header2
	a --> headerx
	multiHead1 --> 残差相加 --> 归一化处理 --> 前向传播
	end
	前向传播 --> |相加|Encoder结果
	用户输入 --> |相加|残差相加
	用户输入 --> |相加|Encoder结果
	
	classDef comment fill:#FFF6CC,stroke:#FFBC52,stroke-width:1px,font-style:italic
	style multiHead1 fill:#fff0f0
	style block1 fill:#e8f4f8
```



自注意力计算流程图

```mermaid
flowchart LR
	输入向量x --> 降维后赋值为q,k,v --> a[q依次与每个k的转置矩阵做点积] --> b[得到q和每一个k的距离即相似度] --> 除以k向量维度的开平方 --> softmax归一化处理得到注意力权重集合 --> 相似度和每一个位置的v进行相乘,得到注意力
```

自注意力计算示意

![image-20250814100646465](https://cdn.jsdelivr.net/gh/scattter/blogweb/images/image-20250814100646465.png)







## 基本原理

transform模型的核心其实是自注意力, 即模型开始关注输入中每个字符之间的关联. 模型首先会有一个很大的字符表, 用来映射输入的每一个字符, 类似于码表, 同时还会有一个专门的embedding分词工具, 把每一个输入在一个512维的张量上进行展示, 如我们输入为: 天气, 那么经过embedding后结果就是

```
[
// 512维
​	[x, x, ..., x]

​	[x, x, ..., x]

]
```



因为我们需要计算输入中每个字符之前的关系, 如"我喜欢你"和"你喜欢我"是两个完全不同的意思, 所以肯定需要知道每个字符的位置. 但是刚才embedding后的结果很明显没有位置信息, 因此需要再加上位置信息.

上面得到的向量可以分为两个部分，奇数和偶数部分。奇数部分使用cos函数，加上当前token的位置信息pos，通过cos编码得到一个奇数编码值；偶数部分使用sin函数，加上当前token的位置信息pos，通过sin编码得到一个偶数编码值, **最后拿token的embeddings和pos的embeddings相加，得到位置编码后的positional input embeddings**。这也是正是Transform中的绝对位置编码Sinusoidal, 计算公式为:

```latex
PE(pos,2i)=sin(pos/100002i/dmodel)PE(pos,2i+1)=cos(pos/100002i/dmodel)
```







