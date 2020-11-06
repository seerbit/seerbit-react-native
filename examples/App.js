import React, { Component } from 'react';
import { View } from 'react-native';
import Seerbit from 'seerbit-react-native';
class Example extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Seerbit
          buttonText="Pay with Seerbit"
          amount="105.00"
          ActivityIndicatorColor="blue"
          btnStyles={{
            alignItems: "center",
            backgroundColor: "green",
            padding: 15,
            marginTop: 100,
            marginLeft: 30,
            marginRight: 30,
          }}
          textStyles={{
            color: "#fff",
          }}
          tranref={new Date().getTime()}
          currency="NGN"
          description="LIVE"
          country="NG"
          callbackurl="http://yourdomain.com"
          public_key="SBTESTPUBK_p8GqvFSFNCBahSJinczKd9aIPoRUZfda"
          version="0.2.0"  //0.2.0 or 0.1.0
          onSuccess={(response) => { console.log(response) }}
          onCancel={() => { console.log("something went wrong") }}
        />
      </View>
    );
  }
}
export default Example;

