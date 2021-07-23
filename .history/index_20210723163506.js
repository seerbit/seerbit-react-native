import React, { Component } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView, Image,
} from 'react-native';
import WebView, { WebView as Redirect } from "react-native-webview";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showRedirectModal: false,
      report_link: '',
    };
  }
  WebViewRef = null

  SeerBitHtml = (report_link) => ({
    html: `  
      <!DOCTYPE html>
      <html lang="en">
              <head>
                      <meta charset="UTF-8">
                      <meta http-equiv="X-UA-Compatible" content="ie=edge">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>SeerBit</title>
              </head>
              <body  onload="paywithSeerbit()" style="background-color:#fff;height:100vh ">
              <form>
              <script src="https://checkout.seerbitapi.com/api/v2/seerbit.js"></script>
               </form>
               <script>
               function paywithSeerbit() {
                 SeerbitPay({
                 "tranref": "${this.props.transaction_reference}",
                 "currency": "${this.props.currency}",
                 "email": "${this.props.email ? this.props.email : ''}",
                 "description":"${this.props.description}",
                 "full_name":"${this.props.full_name ? this.props.full_name : ''}",
                 "country": "${this.props.country}",
                 "amount": "${this.props.amount}",
                 "callbackurl": "${this.props.callbackurl}",
                 "public_key":"${this.props.public_key}", 
                 "narrator":"seerbit-react-native",
                 "report_link":"${report_link}",
                 "pocketReference":"${this.props.pocket_reference}",
                 "vendorId":"${this.props.vendor_id}",
                 "version": "0.2.0"
                }, 
                function callback(response) {
                 var resp = {event:'callback', response};
                 window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                }, 
                function close(close) {
                 var resp = {event:'cancelled'};
                 window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                })
               }
              </script>
              </body>
      </html> 
      `,
  });
  Seerbit = ''

  componentDidMount(){
    this.Seerbit = this.SeerBitHtml
    this.setState({
      showRedirectModal: false
    });
    if (this.props.autoLoad) {
      this.setState({
        showModal: true
      });
    }
  }

  StartPayment = ()=>{
    this.setState({
      showModal: true,
      showRedirectModal: false
    });
  }

  EndPayment = ()=>{
    this.setState({
      showModal: false,
      showRedirectModal: false,
      report_link: '',
    }, ()=> {
      this.Seerbit = this.SeerBitHtml;
      this.WebViewRef && this.state.WebViewRef.reload();
    });
  }


  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (!url) return;
    const uri = decodeURIComponent(url);
    if (
      (uri.includes("vers=one") || uri.includes("vers=two")) &&
      uri.includes(`pubk=${this.props.public_key}`)
    ) {
      this.setState({
        showRedirectModal: false,
        showModal: true,
        report_link: url,
        vers: uri.includes("vers=two")
      });

    }
  };
  messageReceived = (data) => {
    var webResponse = JSON.parse(data);
    switch (webResponse.event) {
      case "cancelled":
        this.setState({ showModal: false, showRedirectModal:false }, () => {
          this.props.onCancel && this.props.onCancel();
        });
        break;
      case "callback":
        this.setState({ showRedirectModal: false }, () => {
          if (
            /^((ftp|http|https):\/\/)|www\.?([a-zA-Z]+)\.([a-zA-Z]{2,})$/i.test(
              webResponse.response
            )
          ) {
            this.setState({
              showModal: false,
              showRedirectModal: true,
              redirecturl: webResponse.response,
            });
          } else {
            if (this.state.response && this.state.vers) return; // return if onSuccess() has already been triggered for version 2
            this.setState({ ...this.state, response: true });
            this.props.onSuccess &&
            this.props.onSuccess({ ...webResponse.response });
          }
        });
        break;
      default:
        this.setState({ showModal: false }, () => {
          this.props.onError();
        });
        break;
    }
  };
  render() {
    return (
      <SafeAreaView>
        <KeyboardAvoidingView behavior="position" enabled>
        <Modal
          visible={this.state.showModal && !this.state.showRedirectModal}
          animationType="slide"
          transparent={true}
        >
          { (!this.state.showRedirectModal && this.state.showModal) &&
          <WebView
            ref={WEBVIEW_REF => (this.WebViewRef = WEBVIEW_REF)}
            javaScriptEnabled={true}
            javaScriptEnabledAndroid={true}
            mixedContentMode="always"
            domStorageEnabled={true}
            allowFileAccess={true}
            originWhitelist={["*"]}
            source={this.Seerbit(this.state.report_link)}
            allowUniversalAccessFromFileURLs={true}
            onMessage={(e) => {
              this.messageReceived(e.nativeEvent.data);
            }}
            onLoadStart={() => this.setState({isLoading: true})}
            onLoadEnd={() => this.setState({isLoading: false})}
          />
          }
          {!this.state.isLoading || (this.props.email ? this.props.email.length === 0 : true) &&
          <TouchableOpacity
            style={ { backgroundColor:'transparent', position:'absolute', top:10, right:10} }
            onPress={() => this.setState({ showModal: false })}
          >
            <Image source={ require('./error.png')}/>
          </TouchableOpacity>
          }
          {this.state.isLoading && (
            <View>
              <ActivityIndicator
                size="small"
                color={this.props.ActivityIndicatorColor}
              />
            </View>
          )}
        </Modal>
        <Modal
          visible={this.state.showRedirectModal && !this.state.showModal}
          animationType="slide"
          transparent={false}
        >
          { (this.state.showRedirectModal && !this.state.showModal) &&
          <Redirect
            javaScriptEnabled={true}
            javaScriptEnabledAndroid={true}
            mixedContentMode="always"
            domStorageEnabled={true}
            allowFileAccess={true}
            originWhitelist={["*"]}
            source={{uri: this.state.redirecturl}}
            allowUniversalAccessFromFileURLs={true}
            onMessage={(e) => {
              this.messageReceived(e.nativeEvent.data);
            }}
            onNavigationStateChange={this.handleWebViewNavigationStateChange}
            onLoadStart={() => this.setState({isLoading: true})}
            onLoadEnd={() => this.setState({isLoading: false})}
          />
          }

          {this.state.isLoading && (
            <View>
              <ActivityIndicator
                size="large"
                color={this.props.ActivityIndicatorColor}
              />
            </View>
          )}
        </Modal>
          {this.props.showButton &&
          <TouchableOpacity
            style={this.props.btnStyles}
            onPress={() => this.setState({showModal: true})}
          >
            <Text style={this.props.textStyles}>{this.props.buttonText}</Text>
          </TouchableOpacity>
          }
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
Index.defaultProps = {
  buttonText: "Pay",
  currency: "NGN",
  country: "NG",
  pocket_reference:"",
  vendor_id:"",
  description: "LIVE",
  autoLoad:true,
  showButton:true,
  ActivityIndicatorColor: "#3f99f0",
  btnStyles: {
    alignItems: "center",
    backgroundColor: "Yellow",
    padding: 10,
    marginTop: 100,
    marginLeft: 30,
    marginRight: 30,
  },
  textStyles: {
    color: "#fff",
  },
};
