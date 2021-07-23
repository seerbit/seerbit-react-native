import React, { Component } from 'react';
import { View } from 'react-native';
import Seerbit from 'seerbit-react-native';
import React, { Component } from 'react';
import { View,Text,TouchableOpacity } from 'react-native';
import Seerbit from 'seerbit-react-native';

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

