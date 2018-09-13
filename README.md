## react-d3-pie
React component to create a d3 pie chart

## demo
![test](https://dev.anumbrella.net/pic/pie-demo.png)

* [see a live demo](https://dev.anumbrella.net/pie/index.html)


## Install
```sh
$ npm install react-d3-pie
```

## Run Demo
```sh
git clone https://github.com/zuoq/react-d3-pie.git
cd react-d3-pie
npm install
npm demo
```



## Usage

```js
const initData = [
   {name: 'test1', value: 1},
   {name: 'test2', value: 2},
   {name: 'test3', value: 3}
];
import {Pie} from 'react-de-pie';
<Pie width={500}
     height={400}
     data={initData}
     colors={['red','green','yellow']}
     innerRadius={0.4}
     outerRadius={0.8}
/>

```

## API

|  param         |    description               |   type     |      default     |
|  -----       |   ---                |  ---       |   ---          |
|  width       |   The width of the pie chart rendering area (unit: px)  |  number     |   500         |
|  width       |   The height of the pie chart rendering area (unit: px) |  number     |   400         |
|  data        |    The data of the pie chart rendering area              |   array     |   [ {name: 'test1', value: 1}, {name: 'test2', value: 2}, {name: 'test3', value: 3}]    |
|  colors      |   饼图渲染的颜色       |   array     |  d3.schemeCategory10  |
|  innerRadius |   Relative multiple of the radius inside the pie chart (range 0~0.8)    |   number    |     0.4   ||
|  outerRadius | Relative multiple of the outer radius of the pie chart (range 0~0.8)     |    number    |    0.8    |

+ **note**
    - When the width and height are too small, the text will be displayed in grammar
    - The innerRadius must be smaller than the outerRadius

## Author
* [github/zuoq](https://github.com/zuoq)



