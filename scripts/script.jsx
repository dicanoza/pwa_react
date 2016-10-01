var Card = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var component = this;
        $.get("https://api.github.com/users/" + this.props.login, function(data) {
            component.setState(data);
        }).fail(function(){
          component.setState({name: 'not found user: ' + component.props.login});
        });
    },
    handleClick: function() {
      console.log(this.props.index);
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
        return ({users: []});
    },
    addCard: function(login) {
        this.setState({users: this.state.users.concat(login.toLowerCase())});
    },
    deleteTask: function(e) {
       var taskIndex = e;
       console.log('remove task: %d', taskIndex, this.state.users[taskIndex]);
       this.setState(state => {
           state.users.splice(taskIndex, 1);
           return {users: state.users};
       });
   },
   removeCard: function(login) {
        var index = this.state.users.indexOf(login);
        var newusers = this.state.users;
        newusers.splice(0,1);
        console.log('after: ' + newusers);
        this.setState({users: newusers});
        console.log(this.state.users);
    },
    onChange: function(e) {
       this.setState({ user: e.target.value });
   },
    render: function() {
        var removeCard = this.deleteTask;

        return (
            <div>
                <Form addCard={this.addCard}/>
                {this.state.users.map((user, index) => {
                    console.log('rendering ' + user);
                    return <Card key={user} login={user} index={index} removeCard={removeCard}></Card>;
                })
              }
            </div>
        );
    }
});

ReactDOM.render(
    <Main/>, document.getElementById("root"));
