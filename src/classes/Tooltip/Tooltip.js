import React from 'react';
import * as d3 from 'd3';
import * as styles from './Tooltip.scss';


export class Tooltip {

  constructor(option) {
    Object.assign(this, option);
    this.padding = 30;
    this.offset= [30,30];
    this.rectWidth = 0;
    this.rectHeight = 0;
  }

  show() {
    const {parentDom, data, padding} = this;
    const tipWrapper = parentDom.append('g')
    .attr('class', styles.show);
    // .attr('color','#fff')
    // .text(()=>{
    //   return `${data.name}:${data.value}`;
    // });

    console.log(parentDom.node().getBBox());
    // console.log(parentDom.node());

    const rect = tipWrapper.append('rect')
      .attr('class', styles.rect)
      .style('fill','red');

    const text = tipWrapper.append('text')
    .attr('class', styles.text)
    .style('fill', '#fff')
    .text(()=>{
      return `${data.name}:${data.value}`;
    });

    const textSvgRect = d3.select(`.${styles.text}`).node().getBBox();
    const textWidth = textSvgRect.width;
    const textHeight = textSvgRect.height;

    this.rectWidth = textWidth + padding;
    this.rectHeight = textHeight + padding;



    rect.attr('width', this.rectWidth)
      .attr('height', this.rectHeight);

    text.attr('transform', `translate(${padding/2},${this.rectHeight/2+3})`);


  }

  setPos(x,y) {
    const {parentDom, offset, rectWidth, rectHeight} = this;
    const [offsetX, offsetY] = offset;
    // console.log(offsetX);
    const {width, height} = parentDom.node().getBBox();
    // const textSvgRect = d3.select(`.${styles.text}`).node().getBBox();
    // const textWidth = textSvgRect.width;
    // const textheight = textSvgRect.height;

    // console.log(x);

    let transX =  x + offsetX + rectWidth;
    // if(transX >= 480) {
    //   transX = x - offsetX - rectWidth;
    // }

    console.log(width);
    console.log(transX);

    // console.log(x);
    // console.log(y);
    // console.log(width);
    // console.log(height);
    d3.select(`.${styles.show}`)
    .attr('transform', `translate(${transX},${y+offsetY})`);

  }



  hide() {
    const {parentDom} = this;
    parentDom.select(`.${styles.show}`).remove();
  }

}
