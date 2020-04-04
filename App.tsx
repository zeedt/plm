import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native';
const plmData = require('./data.json');
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import NumericInput from 'react-native-numeric-input'

type AppState = {
  tableHead: Array<string>,
  tableData: Array<any>,
  value: number,
  finishedLoading: boolean
}

export default class App extends Component<{}, AppState> {

  constructor(props) {
    super(props);
    const twelvePlanks = plmData["2"]["12"];
    const fourteenPlanks = plmData["2"]["14"];
    const plankTableData = [];
    for (var i = 0; i < twelvePlanks.length; i++) {
      plankTableData.push([2 + "'", i + '"', twelvePlanks[i], fourteenPlanks[i]]);
    }
    this.state = {
      tableHead: ['', '2"', '12\n(P/F)', '14\n(P/F)'],
      tableData: plankTableData,
      finishedLoading : false
    }

    setTimeout(()=> {
      this.setState({finishedLoading : true})
    }, 3000)
  }


  loadData = (value: number) => {

    if (value == undefined || value < 2) {
      return;
    }
    this.setState({ value });
    if (plmData["" + value + ""] != undefined) {
      const twelvePlanks = plmData["" + value + ""]["12"];
      const fourteenPlanks = plmData["" + value + ""]["14"];
      const plankTableData = [];
      for (var i = 0; i < twelvePlanks.length; i++) {
        plankTableData.push([value + "'", i + '"', twelvePlanks[i], fourteenPlanks[i]]);
      }
      this.setState({
        tableHead: ['', value + '"', '12\n(P/F)', '14\n(P/F)'],
        tableData: plankTableData
      });
    }
  }

  render() {
    return (
      <View style={{flex : 1}}>
        {this.state.finishedLoading &&
      <ScrollView style={styles.container}>

          <View>
            <View>
            <NumericInput
              containerStyle={{ marginTop: 40, alignSelf: 'center' }}
              value={this.state.value}
              onChange={value => this.loadData(value)}
              onLimitReached={(isMax, msg) => console.log(isMax, msg)}
              totalWidth={240}
              totalHeight={50}
              iconSize={25}
              step={1}
              valueType='integer'
              rounded
              minValue={2}
              maxValue={19}
              initValue={2}
              textColor='#B0228C'
              // iconStyle={{ color: 'white' }} 
              rightButtonBackgroundColor='#EA3788'
              leftButtonBackgroundColor='#E56B70' />
            <Text style={{ marginTop: 20, color: '#dc3545', fontSize: 20 }}>
              NOTE : P/F => planks per feet.
            </Text>
            </View>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }} style={{ marginTop: 20, marginBottom: 20, }}>
              <Row data={this.state.tableHead} style={styles.head} textStyle={styles.headerText} />
              <Rows data={this.state.tableData} textStyle={styles.text} />
            </Table>
          </View>
      </ScrollView>
    }
        {!this.state.finishedLoading && 
        <View style={{ flex : 1, flexDirection : 'column', justifyContent: 'space-between',
        paddingTop: 100, backgroundColor : '#fff'}}>
          <View style={{flex: 1,flexDirection : 'column', alignItems : 'center', justifyContent : 'center'}}>
            <Text style={{fontSize : 40, fontStyle : 'italic'}}>HOPPUS'S</Text>
            <Text style={{fontSize : 40, fontStyle : 'italic'}}>MEASURER</Text>
          </View>
          <ImageBackground source={require('./Tape_measure_colored.jpeg')} style={styles.image}>
            <Text></Text>
          </ImageBackground>
          <View style={{flex : 1, flexDirection: 'column',}}>
          <Text style={{ position : 'absolute', bottom : 20, fontWeight : 'bold', color : '#dc3545', fontSize : 16, alignSelf : 'center', }}>Powered by zeed</Text>

          </View>
        </View>
        }
        </View>
    );
  }

}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', paddingRight: 20, paddingLeft: 20 },
  head: { backgroundColor: '#f1f8ff' },
  headerText: { margin: 15, alignSelf: 'center', fontWeight: 'bold', fontSize: 20 },
  text: { margin: 15, alignSelf: 'center', fontSize: 20, },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
