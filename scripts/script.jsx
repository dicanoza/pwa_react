var Card = React.createClass({
  getInitialState: function(){
    return {};
  },
  componentDidMount: function(){
    var component = this;
    $.get("https://api.github.com/users/" + this.props.login, function(data){
      component.setState(data);
    });
  },
  render: function() {
    return (
      <div className="card cardTemplate githubuser">
        <div className="location">{this.state.name}</div>
          <div className="current">
            <div className="visual">
              <div ><img className="icon" src={this.state.avatar_url} /></div>
            </div>
            <div className="description">
              <div className="humidity">{this.state.bio}</div>
            </div>
        </div>
      </div>
    )

  }
});
var Form = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var loginInput = ReactDOM.findDOMNode(this.refs.login);
    this.props.addCard(loginInput.value);
    loginInput.value = '';
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder='github login' ref='login'></input>
        <button>add</button>
      </form>
    )
  }
});

var Main = React.createClass({
  getInitialState: function(){
    return ({users: []});
  },
  addCard: function(login){
    this.setState({users: this.state.users.concat(login)});
  },
  render: function(){
    var cards = this.state.users.map(function(user){
      return (<Card login={user}></Card>);
    });
    return (
      <div>
        <Form addCard={this.addCard}/>
        {cards}
      </div>
    );
  }
});

ReactDOM.render( <Main /> , document.getElementById("root"));
