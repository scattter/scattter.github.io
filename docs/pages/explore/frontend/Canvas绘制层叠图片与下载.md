# Canvas绘制图片与下载

## 前言

最近在做大促活动的时候遇到了一个需求, 具体如下

1. 前端根据一个id生成一个可访问的链接
2. 根据上面的链接生成一个二维码
3. 视觉提供一张分享海报, 前端把对应的链接放置在海报上并展示出来
4. 用户可以下载上述生成的海报图片



## 代码实现

新增加了一个 `PictureDraw` 的类, 该类依赖三方库 `qrcode` 来进行二维码的生成, canvas进行图片的绘制和层叠, 以及后续的下载, 具体代码为:

```typescript
// 需要使用三方二维码生成库
import QRCode from 'qrcode';
 
class PictureDraw {
  protected canvas: HTMLCanvasElement;
  protected blobObj: string;
  constructor(width: number, height: number) {
    if (!document) throw new Error('not found document, please check your environment')
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = width;
    tempCanvas.height = height;
    this.canvas = tempCanvas;
    tempCanvas.remove();
    this.blobObj = '';
    return this;
  }
 
  translateImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = src;
      image.crossOrigin = 'Anonymous';
      image.onload = function () {
        resolve(image);
      };
    });
  }
 
  translate2QRCode(text: string, option: { width: number, height: number, qrCodeOption?: { width?: number, margin?: number; scale?: number; callback: (error: Error) => void } }) {
    const qrCodeCanvas = document.createElement('canvas');
    qrCodeCanvas.width = option.width;
    qrCodeCanvas.height = option.height;
 
    QRCode.toCanvas(
      qrCodeCanvas,
      text,
      { ...(qrCodeCanvas ?? {}) },
      (option?.qrCodeOption?.callback ?? {})
    );
    const src = qrCodeCanvas.toDataURL('image/png', 1)
    return (option?: {x: number, y: number, width: number, height: number}) => this.draw(src, option)
  }
 
  async draw(src: string, option?: {x: number, y: number, width: number, height: number}) {
    if (!src) throw new Error('please input correct src')
    const image = await this.translateImage(src)
    if (!image) throw new Error('please input correct src')
    const ctx = this.canvas.getContext('2d')
    if (!ctx) {
      throw new Error('please check canvas')
    }
    if (option) {
      ctx.drawImage(image, option.x, option.y, option.width, option.height);
    } else {
      ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
    }
    return this;
  }
 
  download(fileName: string = '图片') {
    this.canvas.toBlob((blob) => {
      if (blob) {
        this.blobObj = URL.createObjectURL(blob);
      }
    });
    const aLink = document.createElement('a');
    aLink.download = fileName;
    aLink.href = this.blobObj;
    aLink.click();
    aLink.remove();
    URL.revokeObjectURL(this.blobObj)
  }
}
```



