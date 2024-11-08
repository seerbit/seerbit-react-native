import { Image, KeyboardAvoidingView, Modal, SafeAreaView, Text, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import WebView, { WebView as Redirect } from 'react-native-webview';
import { validateRequiredFields } from "./utils/index.js";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Seerbit = ({
  buttonText,
  currency,
  country,
  full_name,
  email,
  amount,
  public_key,
  transaction_reference,
  pocket_reference,
  vendor_id,
  productId,
  planId,
  description,
  callbackurl,
  autoLoad = true,
  showButton = true,
  tokenize,
  recurrent,
  setAmountByCustomer = false,
  close_on_success = false,
  close_prompt = false,
  // ActivityIndicatorColor = '#3f99f0',
  onSuccess,
  onCancel,
  onError,
  btnStyles = {
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 10,
    marginTop: 100,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 10
  },
  textStyles = {
    color: '#fff'
  },
  customization = {
    theme: {
      border_color: "#000000",
      background_color: "#004C64",
      button_color: "#0084A0"
    },
    payment_method: ["card", "account", "transfer", "wallet", 'ussd'],
    confetti: true // false;
    // logo: "logo_url || base64",
  }
}, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [showRedirectModal, setShowRedirectModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [redirecturl, setRedirecturl] = useState('');
  const [reportLink, setReportLink] = useState('');
  const [vers, setVers] = useState(false);
  const [response, setResponse] = useState(false);
  const cancelledRef = useRef(false);
  const callbackRef = useRef(false);
  const defaultRef = useRef(false);
  const endPaymentRef = useRef(false);
  const webResponseRef = useRef();
  const displayAlert = message => {
    Alert.alert(message);
  };
  let WebViewRef = null;
  useEffect(() => {
    if (!validateRequiredFields(transaction_reference, amount, email, public_key)) {
      WebViewRef && WebViewRef.reload();
      setShowRedirectModal(false);
      if (autoLoad) {
        setShowModal(true);
      }
    }
  }, []);
  useEffect(() => {
    if (cancelledRef.current) {
      onCancel && onCancel();
    }
  }, [cancelledRef.current]);
  useEffect(() => {
    if (defaultRef.current) {
      onError && onError();
      endPayment();
    }
  }, [defaultRef.current]);
  useEffect(() => {
    if (endPaymentRef.current) {
      WebViewRef && WebViewRef.reload();
    }
  }, [endPaymentRef.current]);
  useEffect(() => {
    if (callbackRef.current) {
      console.log(webResponseRef.current, 'callbackentree+====');
      if (/^((ftp|http|https):\/\/)|www\.?([a-zA-Z]+)\.([a-zA-Z]{2,})$/i.test(webResponseRef.current)) {
        // webResponseRef.current = webResponse.response;
        console.log(webResponseRef.current, 'callback+====');
        setShowModal(false);
        setShowRedirectModal(true);
        setRedirecturl(webResponseRef.current);
      } else {
        if (response && vers) return; // return if onSuccess() has already been triggered for version 2
        setResponse(true);
        onSuccess && onSuccess({
          ...webResponseRef.current
        });
        close_on_success && endPayment();
      }
    }
  }, [callbackRef.current]);
  const SeerBitHtml = report_link => ({
    html: `  
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>SeerBit</title>
        </head>
        <body onload="paywithSeerbit()" style="background-color:#fff;height:100vh ">
          <form>
            <script src="https://checkout.seerbitapi.com/api/v2/seerbit.js"></script>
          </form>
          <script>
            function paywithSeerbit() {
              SeerbitPay({
                "tranref": "${transaction_reference}",
                "currency": "${currency ?? 'NGN'}",
                "email": "${email}",
                "description":"${description ?? ''}",
                "full_name":"${full_name ?? ''}",
                "country": "${country ?? 'NG'}",
                "amount": "${amount}",
                "callbackurl": "${callbackurl}",
                "public_key":"${public_key}", 
                "setAmountByCustomer":${setAmountByCustomer}, 
                "close_prompt":${close_prompt}, 
                "close_on_success":${close_on_success}, 
                "narrator":"seerbit-react-native",
                "report_link":"${report_link}",
                "productId":"${productId}",
                "pocketReference":"${pocket_reference}",
                "vendorId":"${vendor_id}",
                "version": "0.2.0",
                "customization":${JSON.stringify(customization)},
                "tokenize":${tokenize},
                "recurrent":${recurrent},
                "planId":"${planId}",
              }, 
                function callback(response) {
                  var resp = {event:'callback', response};
                  window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                }, 
                function close(close) {
                  var resp = {event:'cancelled'};
                  window.ReactNativeWebView.postMessage(JSON.stringify(resp))
                }
              )
            }
          </script>
        </body>
      </html> 
      `
  });
  useImperativeHandle(ref, () => ({
    startPayment() {
      startPayment();
    },
    endPayment() {
      endPayment();
    }
  }));
  const startPayment = () => {
    WebViewRef && WebViewRef.reload();
    setShowModal(true);
    setShowRedirectModal(false);
  };
  const endPayment = () => {
    setShowModal(false);
    setShowRedirectModal(false);
    setReportLink('');
    endPaymentRef.current = true;
  };
  const handleWebViewNavigationStateChange = _url => {
    // const {url} = newNavState;
    if (!_url) return;
    const uri = decodeURIComponent(_url);
    if ((uri.includes('vers=one') || uri.includes('vers=two')) && uri.includes(`pubk=${public_key}`)) {
      setShowRedirectModal(false);
      setShowModal(true);
      setReportLink(_url);
      setVers(uri.includes('vers=two'));
    }
  };
  const messageReceived = data => {
    var webResponse = JSON.parse(data);
    switch (webResponse.event) {
      case 'cancelled':
        {
          setShowModal(false);
          setShowRedirectModal(false);
          setReportLink('');
          cancelledRef.current = true;
        }
        break;
      case 'callback':
        {
          setShowRedirectModal(false);
          webResponseRef.current = webResponse.response;
          // callbackRef.current = true;

          if (/^((ftp|http|https):\/\/)|www\.?([a-zA-Z]+)\.([a-zA-Z]{2,})$/i.test(webResponse.response)) {
            console.log(webResponse.response, 'callbacknew+====');
            setShowModal(false);
            setShowRedirectModal(true);
            setRedirecturl(webResponse.response);
          } else {
            if (response && vers) return; // return if onSuccess() has already been triggered for version 2
            setResponse(true);
            onSuccess && onSuccess({
              ...webResponseRef.current
            });
            close_on_success && endPayment();
          }
          break;
        }
      default:
        {
          setShowModal(false);
          defaultRef.current = true;
          break;
        }
    }
  };
  const errorMessage = validateRequiredFields(transaction_reference, amount, email, public_key);
  if (errorMessage) {
    displayAlert(errorMessage);
    return null;
  }
  return /*#__PURE__*/_jsxs(KeyboardAvoidingView, {
    behavior: "position",
    enabled: true,
    children: [/*#__PURE__*/_jsx(Modal, {
      visible: showModal && !showRedirectModal
      // animationType="slide"
      ,
      transparent: true,
      children: /*#__PURE__*/_jsxs(SafeAreaView, {
        style: {
          flex: 1,
          backgroundColor: 'transparent'
        },
        children: [!showRedirectModal && showModal && /*#__PURE__*/_jsx(WebView, {
          ref: WEBVIEW_REF => WebViewRef = WEBVIEW_REF,
          javaScriptEnabled: true,
          javaScriptEnabledAndroid: true,
          mixedContentMode: "always",
          domStorageEnabled: true,
          allowFileAccess: true,
          originWhitelist: ['*'],
          source: SeerBitHtml(reportLink),
          allowUniversalAccessFromFileURLs: true,
          onMessage: e => {
            messageReceived(e.nativeEvent.data);
          },
          onLoadStart: () => setIsLoading(true),
          onLoadEnd: () => setIsLoading(false)
        }), !isLoading || (email ? email.length === 0 : true) && /*#__PURE__*/_jsx(TouchableOpacity, {
          style: {
            backgroundColor: 'transparent',
            position: 'absolute',
            top: 10,
            right: 10
          },
          onPress: () => setShowModal(false),
          children: /*#__PURE__*/_jsx(Image, {
            source: require('./error.png')
          })
        })]
      })
    }), /*#__PURE__*/_jsx(Modal, {
      visible: showRedirectModal && !showModal,
      animationType: "slide",
      transparent: false,
      children: showRedirectModal && !showModal && /*#__PURE__*/_jsx(Redirect, {
        javaScriptEnabled: true,
        javaScriptEnabledAndroid: true,
        mixedContentMode: "always",
        domStorageEnabled: true,
        allowFileAccess: true,
        originWhitelist: ['*'],
        source: {
          uri: redirecturl
        },
        allowUniversalAccessFromFileURLs: true,
        onMessage: e => {
          messageReceived(e.nativeEvent.data);
        },
        onNavigationStateChange: ({
          url
        }) => handleWebViewNavigationStateChange(url),
        onLoadStart: () => setIsLoading(true),
        onLoadEnd: () => setIsLoading(false)
      })
    }), showButton && /*#__PURE__*/_jsx(TouchableOpacity, {
      style: btnStyles,
      onPress: () => setShowModal(true),
      children: /*#__PURE__*/_jsx(Text, {
        style: textStyles,
        children: buttonText ?? 'Pay With SeerBit'
      })
    })]
  });
};
export default /*#__PURE__*/forwardRef(Seerbit);
//# sourceMappingURL=index.js.map