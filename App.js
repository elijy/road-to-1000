import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, AsyncStorage } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    /* Always need this */
    super(props);

    /* Set our intial state to nothing */
    this.state = {
      'squat': 0,
      'deadlift': 0,
      'bench': 0,
      'total': ''
    }

  }

  /* This function is used to set values into persistant storage and state */
  setValue = (key, value) => {

    /* First set it into state */
    this.setState({
      [key]: value
    });

    /* Then add it to persistant storage */
    try {
      AsyncStorage.setItem(key, value.toString());
    } catch (error) {
      console.log(error);
    }
  }

  /* This function is used to get values from storage and set them into state */
  getValue = (key) => {

    try {

      /* Check storage  */
      AsyncStorage.getItem(key)
        .then(value => {

          /* If we got something back set it into state */
          if(value !== null) this.setState({
            [key]: value
          })
        });

    } catch (error) {
      console.log(error);
    }
  }

  /* For now all the numbers we're assuming are 87% of our 1 rep max */
  calculator = (number) => {
    return Math.round(Number(number) / 0.87);
  }

  /* Here we do the actual math */
  updateTotal = () => {
    /* Grab a copy of state */
    const numbers = {...this.state};

    /* Calculate your 'number' based on 87% of 1 rep max */
    const total = (this.calculator(numbers.squat) + this.calculator(numbers.deadlift) + this.calculator(numbers.bench)).toString();

    /* Set the total */
    this.setState({total});

    /* Set the total in storage */
    this.setValue('total', total);

  }

  componentDidMount = () => {

    /* Load all our values from storage by looping over the values in state (hopefully this isnt a problem later on)*/
    Object.keys(this.state).forEach( key => this.getValue(key));

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>THE ROAD TO 1000</Text>
        <Text style={styles.subtitle}>Enter your 5x5 number:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setValue('squat', text)}
            onEndEditing={this.updateTotal}
            placeholder={ `SQUAT (${this.state.squat})` }
            placeholderTextColor='black'
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setValue('deadlift', text)}
            onEndEditing={this.updateTotal}
            placeholder={`DEADLIFT (${this.state.deadlift})`}
            placeholderTextColor='black'
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setValue('bench', text)}
            onEndEditing={this.updateTotal}
            placeholder={`BENCH (${this.state.bench})`}
            placeholderTextColor='black'
            keyboardType='numeric'
          />
        <Text style={styles.total}>YOUR GRAND TOTAL IS: </Text>
        <Text style={styles.subtitle}>{this.state.total} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: '900',
    padding: 20
  },
  subtitle: {
    fontSize: 28,
    fontWeight: "500"
  },
  total: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 50,
    padding: 20
  },
  input: {
    width: '80%',
    fontSize: 24,
    marginTop: 20,
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#f44336',
    alignItems: 'center',
    paddingTop: 50
  },
});
