import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as styles from './Pie.scss';

export class Pie extends React.Component {

  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    colors: PropTypes.array.isRequired
  };

  static defaultProps = {
    width: 500,
    height: 400,
    colors: d3.schemeCategory10
  };

  constructor(props) {
    super(props);
    this.renderPie = this.renderPie.bind(this);

  }

  componentDidMount() {
    const testData = [
      {value: 200, name: 'test1'},
      {value: 50, name: 'test2'},
      {value: 70, name: 'test3'},
      {value: 40, name: 'test4'},
    ];

    this.renderPie(testData);

    const testData1 = [
      {value: 200, name: 'test1'},
      {value: 50, name: 'test2'},
      {value: 70, name: 'test3'}
    ];

    setTimeout(()=>{
      this.renderPie(testData1);
    },3000)
  }


  renderPie(data) {

    function midAngle(d){
      return d.startAngle + (d.endAngle - d.startAngle)/2;
    }

    // clear canvas
    const {width, height, colors} = this.props;
    const radius = Math.min(width, height) / 2;

    let pieData = d3.pie().value(d => d.value)(data);
    let pieLabel = d3.pie().value(d => d.name)(data);

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
    g.append("g")
    .attr("class", styles.slices);

    g.append("g")
    .attr("class", "labels");



    const arc = d3.arc()
      .innerRadius(radius * 0.4)
      .outerRadius(radius * 0.8);


    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);





    const pieBlock = g.select(`.${styles.slices}`).selectAll('g')
      .data(pieData)
      .enter()
      .append('g')
      .attr('id', (d, i) => `pie_${i}`)
      .attr('class', styles.pieBlock)
      .on('mouseenter',(d, i) => {
        d3.select(`#polyline_${i}`).classed(styles.hover,true);
      })
      .on('mouseleave',(d, i) => {
        d3.select(`#polyline_${i}`).classed(styles.hover,false);
      });


    pieBlock.append('path')
      .attr('fill', function (d,i) {
        return colors[i];
      })
      .attr('d', d => arc({
        startAngle: d.startAngle,
        endAngle: d.endAngle
      }));

    pieBlock.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .text(d => d.extra.percent);



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