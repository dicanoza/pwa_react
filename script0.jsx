var Button = React.createClass({
  localHandleClick: function(){
    return this.props.localHandleClick(this.props.increment);
  },
  render: function() {
    return (
      <button onClick={this.localHandleClick}>+{this.props.increment}</button>
    )

  }
});

var Display = React.createClass({
  render: function(){
    return(
      <div>{this.props.localCount}</div>
    )
  }
});

var Main = React.createClass({
  getInitialState: function(){
    return {counter: 0};
  },
  handleClick: function(increment){
    this.setState({counter: this.state.counter+increment});
  },
  render: function(){
    return (
      <div>
        <Button localHandleClick={this.handleClick} increment={1} />
        <Button localHandleClick={this.handleClick} increment={5} />
        <Button localHandleClick={this.handleClick} increment={10} />
        <Display localCount={this.state.counter}/>
      </div>
    )
  }
});

ReactDOM.render( <Main /> , document.getElementById("root"));
