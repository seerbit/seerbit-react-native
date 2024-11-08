import { useRef, useState } from 'react';
import Seerbit, { type ISeerbit } from 'seerbit-react-native'

import { View } from 'react-native';

export default function App() {
  const [amount, setAmount] = useState<string>('20');

  const seerBitCheckoutRef = useRef<ISeerbit>(null);

  // YOU CAN MANAGE CLOSING AND RESTARTING A PAYMENT USING THE seerBitCheckoutRef REF
    //seerBitCheckoutRef.current?.endPayment() ==> THIS CLOSES THE CHECKOUT IMMEDIATELY A PAYMENT IS SUCCESSFUL
    //seerBitCheckoutRef.current?.startPayment() ==> THIS STARTS CHECKOUT

    // THIS CLOSES THE CHECKOUT IMMEDIATELY A PAYMENT IS SUCCESSFUL
    // seerBitCheckoutRef.current?.endPayment();

  const paymentSuccessful = (resp: any) => {
    //RETURNS A RESPONSE OBJECT
    // {
    // code: '00',
    // message: 'APPROVED',
    // payments: {},
    // reference: {},
    // }

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
          currency="NGN" //OPTIONAL 
          pocket_reference="" //OPTIONAL
          vendor_id="" //OPTIONAL
          description="PAYMENT WITH SEERBIT" //OPTIONAL
          full_name="John Bello" //OPTIONAL
          email="bellokola@mail.com" //REQUIRED
          close_prompt={false} //Disable the prompt when the cancel button is closed (OPTIONAL)
          close_on_success={false} //Immediately close the checkout after a successful transaction (OPTIONAL)
          country="NG" //OPTIONAL
          public_key="SBTESTPUBK_4oCO2Xxp8wOtHxmyuqPZMIjbt4CRTKn0" //REQUIRED
          tokenize={false} //OPTIONAL
          onSuccess={(response: any) => { paymentSuccessful(response); } } // OPTIONAL
          onCancel={() => {} } // OPTIONAL
          recurrent={false} // Recurrent Payment (OPTIONAL)
          planId="" // Subscription Plan ID (OPTIONAL)
          productId="" // Product ID (OPTIONAL)
          customization={{
            theme: {
              border_color: "#000000",
              background_color: "#004C64",
              button_color: "#0084A0",
            },
            payment_method: ["card", "account", "transfer", "wallet", 'ussd'],
            confetti: true, // default true;
          }} // OPTIONAL
          callbackurl={'https://google.com'} // OPTIONAL
          setAmountByCustomer={false} // OPTIONAL
          onError={() => { console.log('onError=++++=') }}
        />
      </View>
    </View>
  )
}