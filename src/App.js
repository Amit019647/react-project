import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
// import Radium, { StyleRoot } from 'radium';
// './' in every path name is for indicating the relative path
// In JSX,by convention all imported files name start with the capital letter because by convention any default tag's name starts with small letter

class App extends Component {
  state = {
    persons: [
      { id: 'fsfs', name: 'Gourav', age: 24 },
      { id: 'gfhjf', name: 'Amit', age: 34 },
      { id: 'fghd', name: 'sophia', age: 27 }
    ],
    otherState: 'some other state',
    showPersons: false
  }
  // this is a normal function(arrow function) which is activated where it is called i.e button is clicked
  switch_handler = (new_name) => {
    console.log('Was clicked');
    // DON'T DO THIS: this.state.persons[0].name="Anita"
    // this method takes an object as an argument and it will merge whatever we define here with our existing state
    this.setState({
      persons: [
        { name: new_name, age: 27 },
        { name: "Amit", age: 34 },
        { name: 'sophia', age: 24 }
      ]
    })
  }
  // this function is used to make the changes dynamically while we are entering value in the input block/box
  // "var_name.target.value" is used to access the value entered in the input box
  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    const person = { ...this.state.persons[personIndex] };//coping of array elements

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons })
  }

  delete_person = (person_index) => {
    // const persons=this.state.persons;//here we are coping the pointers of the array so if we change any elements of the array we make change in the original array which is not good
    // const persons=this.state.persons.slice();//this copies the whole array and make a new separate copy
    const persons = [...this.state.persons] //this copies the whole array and make a new separate copy
    persons.splice(person_index, 1);//here we change the value of the constant but we need to keep in mind that arrays and objects are reference types so we can change values in the array (pointer concept)
    this.setState({ persons: persons });
  }

  // this function is used to show/hide the contents on the web page by using a boolean variable in state defined and changing it each time using setState
  togglePersons = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  }

  render() {
    // inline styles for single elements but are not full fledged i.e we can't use all  properties of CSS here
    const st = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '5px solid grey',
      padding: '10px',
      cursor: 'pointer'
    };
    let persons = null;
    if (this.state.showPersons) {
      {/* these attributes(name,age etc.) can be passed to the function*/ }
      {/* in JSX we use the ternary operator not the block(if-else) operator to show the content conditionally but outside it we can use it independently as there it is the JS code */ }
      persons = (
        <div>
          {/* here we map the list to the function which return the JSX for our DOM (return statement can have the JSX ) */}
          {this.state.persons.map((person, index) => {
            return (<Person
              click={this.delete_person.bind(this, index)}//this is used for any normal event like click event  
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} //for any input event use this approach of function
            />)
          })}
        </div>
      );
      st.backgroundColor = 'red';//changing the CSS dynamically in JS
    }
    const classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }
    return (
        <div className="App">
          <h1> project heading </h1>
          <p className={classes.join(' ')}>This is really working.</p>


          {/* button for switching names */}
          {/* <button style={st} onClick={() => this.switch_handler("Gouri...")}>Switch Name</button> */}

          {/* handling conditions with the use of the buttion */}
          <button style={st} onClick={this.togglePersons}>Toggle Persons</button>
          {persons}

        </div>
    );
    // return React.createElement('div',{className:'App'},React.createElement('h1',null,'project heading...!!!'));
  }
}

export default App;//higher order component
//it will just add some extra functionality to add some extra syntax which will parse our styles and understand some extra features which we will now use
//it can be used in both functional and class based components

// functional component ===>react hooks(this code works same as above,this is functional component representation of class component)
// const App = x => {
//   const [p_state,set_p_state] = useState({
//       persons: [
//       {name: 'Amit',age:24},
//       {name:'Gourav',age:34},
//       {name:'sophia',age:27}
//     ],
//     other_state: 'some other state'
// });

// console.log(p_state);

//   const switch_handler = () => {
//     console.log('Was clicked');
//     DON'T DO THIS: this.state.persons[0].name="Anita"
//     this method takes an object as an argument and it will merge whatever we define here with our existing state
//     set_p_state({
//       persons: [
//         {name: 'Anita',age:27},
//         {name:'Gourav',age:34},
//         {name:'sophia',age:24}
//       ]
//     })
//   }

// export default App;

// hardcode way of writing the tags for a list
        // {/* <Person
        //   name={this.state.persons[0].name}
        //   age={this.state.persons[0].age} />
        // <Person
        //   name={this.state.persons[1].name}
        //   age={this.state.persons[1].age}
        //   click={this.switch_handler.bind(this, 'Mishra Ji...')} ===> bind method of JSX
        // ===> here in this "this.func_name" we don't call function we just mention it there if we add parentheses "this.func_name()" then it is called then and there which we do not have to do
        //   changed={this.nameChangedHandler}
        // >My gender is male.</Person>
        // <Person
        //   name={this.state.persons[2].name}
        //   age={this.state.persons[2].age} /> */}
        // {/* self closing tag ==> <tag_name /> */}


        // this is used for dynamically setting the classname of any component of the DOM(of any JSX tag)
        // see here the use of the arrays to use multiple classes at once by combining them into a string by the method of .join(' ') of arrays
        // const classes=[];
        // if (this.state.persons.length<=2){
        //   classes.push('red');
        // }
        // if (this.state.persons.length<=1){
        //   classes.push('bold');
        // }
        // return(
        // <p className={classes.join(' ')}>This is really working.</p>
        // )

        // for media queries we need to import {StyleRoot} from 'radium' to see the effects of the media queries
        // syntax  =====>  for media queries(<StyleRoot>)
        // return(
        //   <StyleRoot>
        //     <div>
        //       contents to return to DOM
        //     </div>
        //   </StyleRoot>
        // );

        //these are used to use the pseudo selectors like hover,click etc.
        // import Radium from 'radium'; ==> importing radium

        // declaring pseudo selector
        // ':hover': {
        //   backgroundColor: 'lightgreen',
        //   color: 'black'
        // }

        // overriding pseudo selector
        // st[':hover'] = {
        //   backgroundColor: 'salmon',
        //   color: 'black'
        // }

        // export default Radium(App); ==> Wrapping component inside 'radium'