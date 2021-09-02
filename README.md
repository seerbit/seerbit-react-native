<p align="center">
<img width="200" valign="top" src="https://camo.githubusercontent.com/c95fa9deb3f9e4fa1d700aebdbe3373227d826ec/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6479326461677567702f696d6167652f75706c6f61642f76313537313234393635382f736565726269742d6c6f676f5f6d64696e6f6d2e706e67" data-canonical-src="https://res.cloudinary.com/dpejkbof5/image/upload/v1620323718/Seerbit_logo_png_ddcor4.png" style="max-width:100%; ">
</p>

# Seerbit React Native WebView SDK

Seerit React Native SDK can be used to integrate the SeerBit payment gateway into your react native application. 

## Requirements 
Register for a merchant account on [Seerbit Merchant Dashboard](https://dashboard.seerbitapi.com) to get started. 

```bash
npm install --save seerbit-react-native
```
```bash
yarn add seerbit-react-native
```
## API Documentation 
   https://doc.seerbit.com

## Support 
If you have any problems, questions or suggestions, create an issue here or send your inquiry to care@seerbit.com

## Implementation
You should already have your API keys. If not, go to [dashboard.seerbitapi.com](https://dashboard.seerbitapi.com).
```jsx

import React, { useState,useRef } from 'react';
import Seerbit from 'seerbit-react-native';
import { View,Text,TouchableOpacity } from 'react-native';

const TestApp = () => {

  const [ startingPayment, setStartingPayment ] = useState(false);
  const [amount, setAmount] = useState('1000.00');
   const seerBitCheckout = useRef();

    const startPay = ()=> {
      seerBitCheckout.current.StartPayment()
    }

    const paymentSuccessful = (response)=>{
    //RETURNS A RESPONSE OBJECT
      // {
      // code: '00',
      // message: 'APPROVED',
      // payments: {},
      // customers: {},
      // }


    //HERE YOU CAN MANAGE CLOSING AND RESTARTING A PAYMENT USING THE seerBitCheckout REFERENCE
        //seerBitCheckout.current.EndPayment()
        //seerBitCheckout.current.StartPayment()

    // THIS CLOSES THE CHECKOUT IMMEDIATELY A PAYMENT IS SUCCESSFUL
      // seerBitCheckout.current.EndPayment() 
    
    // YOU CAN ALSO DELAY AND DO SOME OTHER LOGIC BEFORE CLOSING THE CHECKOUT
    setTimeout( ()=>{
      seerBitCheckout.current.EndPayment()
    }, 2000);

    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Seerbit
                  buttonText="Pay with Seerbit"//OPTIONAL
                  showButton={ false }//OPTIONAL DEFAULTS TO TRUE
                  autoLoad={ false } //OPTIONAL DEFAULTS TO TRUE
                  amount={amount}//REQUIRED
                  ActivityIndicatorColor="blue"//OPTIONAL
                  btnStyles={{
                    alignItems: 'center',
                    backgroundColor: "green",
                    padding: 15,
                    marginTop: 100,
                    marginLeft: 30,
                    marginRight: 30,
                  }}//OPTIONAL
                  textStyles={{
                    color: "#fff",
                  }}//OPTIONAL
                  ref={ seerBitCheckout }//REQUIRED
                  transaction_reference={new Date().getTime()}//REQUIRED
                  currency="NGN"//OPTIONAL FOR NIGERIA
                  pocket_reference=""//OPTIONAL
                  vendor_id=""//OPTIONAL
                  description="PAYMENT WITH SEERBIT"//OPTIONAL
                  full_name="John Bello"
                  email="bellokola@mail.com"
                  country="NG"//OPTIONAL
                  onPress={() => startPay()}//OPTIONAL
                  public_key="YOUR_PUBLIC_KEY"//REQUIRED
                  onSuccess={(response) => { paymentSuccessful() }}
                  onCancel={() => { console.log('something went wrong') }}
                  disabled={ startingPayment }
                />
             <TouchableOpacity
              style={{
                height:30,
                padding:25,
                borderRadius:5,
                alignItems:'center',
                justifyContent:'center',
                flexDirection:"row"
              }}
              onPress={() => startPay()}
              disabled={ startingPayment }
            >
              <Text>{ startingPayment ? 'Starting SeerBit Checkout...' : 'Chekout with SeerBit'}</Text>
            </TouchableOpacity>
              </View>
              </View>
    );
}
export default TestApp;

```
## Contributors
<span>
<a href="https://github.com/praizerema">
  <img src="https://github.com/praizerema.png?size=50">
</a>
<a href="https://github.com/tosyngy">
  <img src="https://github.com/tosyngy.png?size=50">
</a>
   <a href="https://github.com/amoskeyz">
  <img src="https://github.com/amoskeyz.png?size=50">
</a>
</a>
   <a href="https://github.com/victorighalo" title="Victor Ighalo">
  <img src="https://github.com/victorighalo.png?size=50">
</a>
   </span>
