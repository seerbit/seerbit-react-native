import React, { useState,useRef } from 'react';
import Seerbit from 'seerbit-react-native';
import { View,Text,TouchableOpacity } from 'react-native';

const TestApp = () => {

  const [ startingPayment, setStartingPayment ] = useState(false);
  const [amount, setAmount] = useState('1000.00');
    const [ reference, setReference ] = useState(new Date().getDate());
   const seerBitCheckout = useRef();

    const startPay = ()=> {
        seerBitCheckout.current.StartPayment()
    }

    const onClose =()=> {
        console.log('close')
        setReference(new Date().getDate())
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
                close_prompt={false} //Disable the prompt when the cancel button is closed
                close_on_success={false} //Immediately close the checkout after a successful transaction
                country="NG"//OPTIONAL
                onPress={() => startPay()}//OPTIONAL
                public_key="YOUR_PUBLIC_KEY"//REQUIRED
                tokenize={false} //OPTIONAL
                onSuccess={(response) => { paymentSuccessful() }}
                onCancel={() => { console.log('something went wrong') }}
                disabled={ startingPayment }
                recurrent={false} // Recurrent Payment
                planId="" // Subscription Plan ID
                customization={
                    {
                        theme: {
                            border_color: "#000000",
                            background_color: "#004C64",
                            button_color: "#0084A0",
                        },
                        payment_method: ["card", "account", "transfer", "wallet", 'ussd'],
                        // confetti: true, // false;
                        // logo: "logo_url || base64",
                    }
                }
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

