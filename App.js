import React from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    /* Always need this */
    super(props);

    this.state = {
      'squat': 0,
      'deadlift': 0,
      'bench': 0,
      'total': ''
    }
  }

  calculator = (number) => {
    return Math.round(Number(number) * (1 / 0.6));
  }

  updateTotal = () => {
    /* Grab a copy of state */
    const numbers = {...this.state};
    console.log(numbers);

    /* Calculate your 'number' based on 60% of 1 rep max */
    const total =
    this.calculator(numbers.squat) + this.calculator(numbers.deadlift) + this.calculator(numbers.bench);

    /* Set the total */
    this.setState({total});

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>THE ROAD TO 1000</Text>
        <Text style={styles.subtitle}>Enter your 5x5 number:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({'squat': text})}
            onEndEditing={this.updateTotal}
            placeholder={ `SQUAT (${this.state.squat})` }
            placeholderTextColor='black'
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({'deadlift': text})}
            onEndEditing={this.updateTotal}
            placeholder='DEADLIFT'
            placeholderTextColor='black'
            keyboardType='numeric'
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({'bench': text})}
            onEndEditing={this.updateTotal}
            placeholder='BENCH'
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
