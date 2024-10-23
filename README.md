<p align="center">
<img width="400" valign="top" src="https://assets.seerbitapi.com/images/seerbit_logo_type.png" data-canonical-src="https://res.cloudinary.com/dpejkbof5/image/upload/v1620323718/Seerbit_logo_png_ddcor4.png" style="max-width:100%; ">
</p>


# Seerbit React Native WebView SDK

Seerit React Native SDK can be used to integrate the SeerBit payment gateway into your react native application. 

## Requirements 
Register for a merchant account on [Seerbit Merchant Dashboard](https://dashboard.seerbitapi.com) to get started. 

## Installation
```bash
npm install seerbit-react-native
npm install react-native
npm install react-native-webview
```
```bash
yarn add seerbit-react-native
yarn add react-native
yarn add react-native-webview
```
## API Documentation 
   https://doc.seerbit.com

## Support 
If you have any problems, questions or suggestions, create an issue here or send your inquiry to developers@seerbit.com

## Usage
You should already have your API keys, If not, go to Accounts -> Settings Section -> API Keys section on [dashboard.seerbitapi.com](https://dashboard.seerbitapi.com).

```js
import React, { useRef, useState } from 'react';
import Seerbit, { ISeerbit } from 'seerbit-react-native'

import { View } from 'react-native';

export default function App() {
  const [amount, setAmount] = useState<string>('20');

  const seerBitCheckoutRef = useRef<ISeerbit>(null);

  const startPay = () => {
    seerBitCheckoutRef.current?.startPayment();
  }

  const paymentSuccessful = (resp: any) => {
    //RETURNS A RESPONSE OBJECT
    // {
    // code: '00',
    // message: 'APPROVED',
    // payments: {},
    // reference: {},
    // }


    //HERE YOU CAN MANAGE CLOSING AND RESTARTING A PAYMENT USING THE seerBitCheckout REFERENCE
    //seerBitCheckoutRef.current?.endPayment()
    //seerBitCheckoutRef.current?.startPayment()

    // THIS CLOSES THE CHECKOUT IMMEDIATELY A PAYMENT IS SUCCESSFUL
    seerBitCheckoutRef.current?.endPayment();

    // YOU CAN ALSO DELAY AND DO SOME OTHER LOGIC BEFORE CLOSING THE CHECKOUT
    // setTimeout(() => {
    //   seerBitCheckoutRef.current?.endPayment();
    // }, 2000);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Seerbit
          buttonText="Pay with SeerBit" //OPTIONAL
          showButton={true} //OPTIONAL DEFAULTS TO TRUE
          autoLoad={false} //OPTIONAL DEFAULTS TO TRUE
          amount={amount} //REQUIRED
          ActivityIndicatorColor="blue" //OPTIONAL
          btnStyles={{
            alignItems: 'center',
            backgroundColor: "#000",
            padding: 15,
            marginTop: 100,
            marginLeft: 30,
            marginRight: 30,
            borderRadius: 10
          }} //OPTIONAL
          textStyles={{
            color: "#fff",
          }} //OPTIONAL
          ref={seerBitCheckoutRef} //REQUIRED
          transaction_reference={new Date().getTime().toString()} //REQUIRED
          currency="NGN" //OPTIONAL FOR NIGERIA
          pocket_reference="" //OPTIONAL
          vendor_id="" //OPTIONAL
          description="PAYMENT WITH SEERBIT" //OPTIONAL
          full_name="John Bello"
          email="bellokola@mail.com"
          close_prompt={false} //Disable the prompt when the cancel button is closed
          close_on_success={false} //Immediately close the checkout after a successful transaction
          country="NG" //OPTIONAL
          public_key="SBTESTPUBK_4oCO2Xxp8wOtHxmyuqPZMIjbt4CRTKn0" //REQUIRED
          tokenize={false} //OPTIONAL
          onSuccess={(response: any) => { 
            paymentSuccessful(response)
          }}
          onCancel={() => {} }
          recurrent={false} // Recurrent Payment
          planId="" // Subscription Plan ID
          productId="" //Product ID
          customization={{
            theme: {
              border_color: "#000000",
              background_color: "#004C64",
              button_color: "#0084A0",
            },
            payment_method: ["card", "account", "transfer", "wallet", 'ussd'],
            confetti: true, // default true;
          }} 
          callbackurl={'https://google.com'} 
          setAmountByCustomer={false}
          onError={() => { console.log('onError=++++=') }}
        />
      </View>
    </View>
  )
}
```

## License

MIT
