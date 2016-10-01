var Card = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var component = this;
        $.get("https://api.github.com/users/" + this.props.login, function(data) {
            component.setState(data);
        }).fail(function(){
          component.setState({name: 'user not found : ' + component.props.login});
        });
    },
    handleClick: function() {
        this.props.removeCard(this.props.index);
    },
    render: function() {
        return (
            <div className="card cardTemplate githubuser">
                <div className="location">{this.state.name}</div>
                <div className="current">
                    <div className="visual">
                        <div ><img className="icon" src={this.state.avatar_url}/></div>
                    </div>
                    <div className="description">
                        <div className="humidity">{this.state.bio}</div>
                    </div>
                </div>
                <button className='mui-btn mui-btn--raised' onClick={this.handleClick}>remove</button>
            </div>
        )

    }
});
var Form = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var loginInput = ReactDOM.findDOMNode(this.refs.login);
        this.props.addCard(loginInput.value);
        loginInput.value = '';
    },
    render: function() {
        return (
            <div className='mui-panel'>
                <form onSubmit={this.handleSubmit}>
                    <div className='mui-textfield'>
                        <input placeholder='Github Login' ref='login'></input>
                    </div>
                    <button className='mui-btn mui-btn--raised'>add</button>
                </form>

            </div>
        )
    }
});

var Main = React.createClass({
    getInitialState: function() {
        var users = [];
        if(localStorage.users){
          users = JSON.parse(localStorage.users);
        }
        return ({users: users});
    },
    componentWillUpdate: function(nextProps,nextState){
        localStorage.users = JSON.stringify(nextState.users);
    },
    addCard: function(login) {
      if(this.state.users.indexOf(login) < 0 ){
        this.setState({users: this.state.users.concat(login.toLowerCase())});
      }
    },
    removeCard: function(e) {
       var taskIndex = e;
       this.setState(state => {
           state.users.splice(taskIndex, 1);
           return {users: state.users};
       });
    },
   render: function() {
        var removeCard = this.removeCard;

        return (
            <div>
                <Form addCard={this.addCard}/>
                {this.state.users.map((user, index) => {
                    return <Card key={user} login={user} index={index} removeCard={removeCard}></Card>;
                })
              }
            </div>
        );
    }
});

ReactDOM.render(<Main/>, document.getElementById("root"));

var saveUsers = function(users){
  localStorage.users = users;
}
var loadUsers = function(){
  return localStorage.users;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function() {
            console.log('Service Worker Registered');
        });
}
