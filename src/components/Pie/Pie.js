import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import {Tooltip} from '../../classes';
import * as styles from './Pie.scss';

export class Pie extends React.Component {

  toolTip = null;

  static propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    innerRadius: PropTypes.number.isRequired,
    outerRadius: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    colors: PropTypes.array.isRequired
  };

  static defaultProps = {
    data: [
      {name: 'test1', value: 1},
      {name: 'test2', value: 2},
      {name: 'test3', value: 3}
    ],
    width: 500,
    height: 400,
    innerRadius: 0.4,
    outerRadius: 0.8,
    colors: d3.schemeCategory10
  };

  constructor(props) {
    super(props);
    this.renderPie = this.renderPie.bind(this);

  }

  componentDidMount() {
    const {data} = this.props;
    this.renderPie(data);
  }


  renderPie(data) {

    function midAngle(d){
      return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    // clear canvas
    const {width, height, colors, innerRadius, outerRadius} = this.props;
    const radius = Math.min(width, height) / 2;
    let pieData = d3.pie().value(d => d.value)(data);
    const formatPercent = d3.format('.1%');
    const sum = d3.sum(pieData, d => d.value);
    pieData = pieData.map(d => ({
      ...d,
      extra: {
        percent: formatPercent(d.value/sum)
      }
    }));

    d3.select(`.${styles.container}`).selectAll('svg').remove();
    const svg = d3.select(`.${styles.container}`)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)
      .attr('class',styles.content);

    //lines svg (this reason why draw lines sng first: let lines under the slices)
    g.append("g")
      .attr("class", styles.lines);

    //slices
    g.append("g")
      .attr("class", styles.slices);

    //labels
    g.append("g")
      .attr("class", "labels");


    //definition arc
    const arc = d3.arc()
      .innerRadius(radius * innerRadius)
      .outerRadius(radius * outerRadius);
    const outerArc = d3.arc()
      .innerRadius(radius * 0.85)
      .outerRadius(radius * 0.85);


    // const toolTip = tip()
    //   .attr('class', styles.d3_tip)
    //   .html(function(d) {
    //     return d.data.name;
    //   });

    // toolTip.rootElement(document.getElementsByClassName(styles.slices)[0]);

    // toolTip.offset([-50,20]);
    //
    // const vis = g.select(`.${styles.slices}`).call(toolTip);

    const vis = g.select(`.${styles.slices}`);



    /* render slices */
    const pieBlock = vis.selectAll('g')
      .data(pieData)
      .enter()
      .append('g')
      .attr('id', (d, i) => `pie_${i}`)
      .attr('class', styles.pieBlock)
      .on('mouseover',(d, i) => {
        d3.select(`#polyline_${i}`).classed(styles.hover,true);
        const {offsetX, offsetY} = d3.event;
        // console.log(d3.mouse(svg));
        console.log(d3.event);
        const dom = d3.event.relatedTarget;
        // console.log(this);
        const tip = new Tooltip({
          parentDom: svg,
          data: d.data
        });
        this.toolTip = tip;
        this.toolTip.show();
        this.toolTip.setPos(offsetX,offsetY);
      })
      .on('mousemove',(d, i) => {
        const {offsetX, offsetY} = d3.event;
        console.log(d3.event);
        this.toolTip.setPos(offsetX,offsetY);
      })
      .on('mouseout',(d, i) => {
        d3.select(`#polyline_${i}`).classed(styles.hover,false);
        // this.toolTip.hide();
        // this.toolTip = null;
      });


    /* this is for add tooltip */
    // d3.selectAll(`.${styles.pieBlock}`).each(function (d, i) {
    //   d3.select(this)
    //     .on('mouseover', (d,i) => {
    //       d3.select(`#polyline_${i}`).classed(styles.hover,true);
    //       toolTip.show(d,this);
    //     })
    //     .on('mouseout',(d, i) => {
    //       d3.select(`#polyline_${i}`).classed(styles.hover,false);
    //       toolTip.hide(d,this);
    //     });
    // });


    pieBlock.append('path')
      .attr('fill', function (d,i) {
        return colors[i];
      })
      .attr('d', d => arc({
        startAngle: d.startAngle,
        endAngle: d.endAngle
      }));



    /* render text */
    const text = svg.select(".labels").selectAll("text")
      .data(pieData);

    text.enter()
      .append("text")
      .attr("dy", ".35em")
      .text(function(d) {
        return d.data.name;
      })
      .style('fill',(d,i) => colors[i])
      .transition().duration(1000)
      .attrTween("transform", function(d) {
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
          return "translate("+ pos +")";
        };
      })
      .styleTween("text-anchor", function(d){
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          return midAngle(d2) < Math.PI ? "start":"end";
        };
      });

    text.exit()
      .remove();

    /* render polyline */
    const polyline = d3.select(`.${styles.lines}`).selectAll('polyline')
      .data(pieData)
      .enter()
      .append('polyline')
      .style('fill','none')
      .attr('class',styles.polyline)
      .attr('id', (d, i) => `polyline_${i}`)
      .style('stroke',(d,i) => colors[i]);

    polyline.transition().duration(1000)
      .attrTween("points", function(d){
        this._current = this._current || d;
        const interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          const d2 = interpolate(t);
          const pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2),pos];
        };
      });

    polyline.exit()
    .remove();

  }

  render() {
    const {width, height}  = this.props;
    return (
        <div className={styles.container} style={{width:width,height:height}}>
        </div>
    )
  }

}