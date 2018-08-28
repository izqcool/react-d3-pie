import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as styles from './Pie.scss';

export class Pie extends React.Component {

  static propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
  };

  static defaultProps = {
    width: '500px',
    height: '400px'
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
      {value: 40, name: 'test4'}
    ];
    console.log(d3.pie().value(d => d.value)(testData));

    this.renderPie();
  }


  renderPie() {
    // clear canvas
    const {width,height} = this.props;
    d3.select(`.${styles.container}`).selectAll().remove();
    console.log(d3.select(`.${styles.container}`));
    const svg  = d3.select(`.${styles.container}`)
      .append('svg')
      .attr('width',width)
      .attr('height',height);
    console.log(svg);

    const g = svg.append('g');

  }


  render() {
    const {width, height}  = this.props;
    return (
        <div className={styles.container} style={{width:width,height:height}}>
        </div>
    )
  }

}