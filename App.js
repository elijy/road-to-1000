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
    }
  }

  updateTotal = () => {
    console.log(this.state);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>THE ROAD TO 1000</Text>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: 'bold'
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
