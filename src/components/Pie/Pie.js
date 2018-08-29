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
    // console.log(d3.pie().value(d => d.value)(testData));

    console.log(d3.schemeCategory10);

    this.renderPie(testData);

    const testData1 = [
      {value: 200, name: 'test1'},
      {value: 50, name: 'test2'},
      {value: 70, name: 'test3'},
      {value: 40, name: 'test4'},
      {value: 200, name: 'test1'},
      {value: 50, name: 'test2'},
      {value: 70, name: 'test3'},
      {value: 40, name: 'test4'},
      {value: 200, name: 'test1'},
      {value: 50, name: 'test2'}
    ];

    setTimeout(()=>{
      this.renderPie(testData1);
    },3000)
  }


  renderPie(data) {
    console.log(styles.container);
    // clear canvas
    const {width,height,colors} = this.props;
    const radius = Math.min(width, height) / 2;

    const pie = d3.pie().value(d => d.value);
    console.log(d3.select(`.${styles.container}`));

    d3.select(`.${styles.container}`).selectAll('svg').remove();
    console.log(d3.select(`.${styles.container}`));
    const svg  = d3.select(`.${styles.container}`)
      .append('svg')
      .attr('width',width)
      .attr('height',height);
    console.log(svg);

    const g = svg.append('g')
      .attr('transform',`translate(${width/2},${height/2})`);

    const arc = d3.arc()
      .innerRadius(radius*0.4)
      .outerRadius(radius*0.8);

    const path = g.datum(data).selectAll("path")
    .data(pie)
    .enter().append("path")
    .attr("fill", function(d, i) { return colors[i]; })
    .attr("d", arc);



  }


  render() {
    const {width, height}  = this.props;
    return (
        <div className={styles.container} style={{width:width,height:height}}>
        </div>
    )
  }

}