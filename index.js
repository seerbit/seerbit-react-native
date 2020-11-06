import React, { Component } from "react";
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import WebView, { WebView as Redirect } from "react-native-webview";
export default class Seerbit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showRedirectModal: false,
    };
  }
  Seerbit = (report_link) => ({
    html: `  
      <!DOCTYPE html>
      <html lang="en">
              <head>
                      <meta charset="UTF-8">
                      <meta http-equiv="X-UA-Compatible" content="ie=edge">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <!-- Latest compiled and minified CSS -->
                      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
                      <!-- Fonts -->
                      <link rel="dns-prefetch" href="//fonts.gstatic.com">
                      <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">
                      <title>SEERBIT</title>
              </head>
              <body  onload="paywithSeerbit()" style="background-color:#fff;height:100vh ">
              <form>
              <script src="https://checkout.seerbitapi.com/api/v2/seerbit.js"></script>
               </form>
               <script>
               function paywithSeerbit() {
                 SeerbitPay({
                 "tranref": "${this.props.tranref}",
                 "currency": "${this.props.currency}",
                 "description": "LIVE",
                 "country": "${this.props.country}",
                 "amount": "${this.props.amount}",
                 "callbackurl": "${this.props.callbackurl}",
                 "public_key":"${this.props.public_key}", 
                 "narrator":"seerbit-react-native",
                 "report_link":"${report_link}",
                 "version": "${this.props.version}"
                }, 
                function callback(response) {
                 console.log(response) /*response of transaction*/
                 var resp = {event:'callback', response};
                

                 window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                }, 
                function close(close) {
                 console.log(close) /*transaction close*/
                 var resp = {event:'cancelled'};
                 window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                })
               }
              </script>
              </body>
      </html> 
      `,
  });
  handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
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
        vers: uri.includes("vers=two") //check if report link is version 2
      });
      // maybe close this view?
    }
  };
  messageRecived = (data) => {
    var webResponse = JSON.parse(data);
    switch (webResponse.event) {
      case "cancelled":
        this.setState({ showModal: false }, () => { //just added report link 05/11( report_link: undefined)
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
      <View>
        <Modal
          visible={this.state.showModal}
          animationType="slide"
          transparent={true}
        >
          <WebView
            javaScriptEnabled={true}
            javaScriptEnabledAndroid={true}
            mixedContentMode="always"
            domStorageEnabled={true}
            allowFileAccess={true}
            originWhitelist={["*"]}
            ref={(webView) => (this.MyWebView = webView)}
            source={this.Seerbit(this.state.report_link)}
            allowUniversalAccessFromFileURLs={true}
            onMessage={(e) => {
              this.messageRecived(e.nativeEvent.data);
            }}
            onLoadStart={() => this.setState({ isLoading: true })}
            onLoadEnd={() => this.setState({ isLoading: false })}
          />
          {/*Start of Loading modal*/}
          {this.state.isLoading && (
            <View>
              <ActivityIndicator
                size="large"
                color={this.props.ActivityIndicatorColor}
              />
            </View>
          )}
        </Modal>
        <Modal
          visible={this.state.showRedirectModal}
          animationType="slide"
          transparent={false}
        >
          <Redirect
            javaScriptEnabled={true}
            javaScriptEnabledAndroid={true}
            mixedContentMode="always"
            domStorageEnabled={true}
            allowFileAccess={true}
            originWhitelist={["*"]}
            ref={(webView) => (this.RedirectView = webView)}
            source={{ uri: this.state.redirecturl }}
            allowUniversalAccessFromFileURLs={true}
            onMessage={(e) => {
              this.messageRecived(e.nativeEvent.data);
            }}
            onNavigationStateChange={this.handleWebViewNavigationStateChange}
            onLoadStart={() => this.setState({ isLoading: true })}
            onLoadEnd={() => this.setState({ isLoading: false })}
          />
          {/*Start of Loading modal*/}
          {this.state.isLoading && (
            <View>
              <ActivityIndicator
                size="large"
                color={this.props.ActivityIndicatorColor}
              />
            </View>
          )}
        </Modal>
        <TouchableOpacity
          style={this.props.btnStyles}
          onPress={() => this.setState({ showModal: true })}
        >
          <Text style={this.props.textStyles}>{this.props.buttonText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
Seerbit.defaultProps = {
  buttonText: "Pay Now",
  ActivityIndicatorColor: "green",
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