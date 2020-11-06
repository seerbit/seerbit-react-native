<p align="center">
<img width="200" valign="top" src="https://camo.githubusercontent.com/c95fa9deb3f9e4fa1d700aebdbe3373227d826ec/68747470733a2f2f7265732e636c6f7564696e6172792e636f6d2f6479326461677567702f696d6167652f75706c6f61642f76313537313234393635382f736565726269742d6c6f676f5f6d64696e6f6d2e706e67" data-canonical-src="https://res.cloudinary.com/dy2dagugp/image/upload/v1571249658/seerbit-logo_mdinom.png" style="max-width:100%; ">
</p>

# Seerbit React Native SDK

Seerit React Native SDK can be used to integrate the Seerit payment gateway into your react native app. 

## Requirements 
Visit [Seerbit Documentation](https://doc.seerbit.com) to get started. 
```bash
npm install --save seerbit-react-native
```
## Documentation 
   https://doc.seerbit.com
## Support 
If you have any problems, questions or suggestions, create an issue here or send your inquiry to care@seerbit.com.

## Implementation
You should already have your API keys. If not, go to [seerbit.com](https://doc.seerbit.com).
```jsx
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
            alignItems: 'center',
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
          callbackurl="YOUR_CALLBACK_URL"
          public_key="YOUR_API_KEY"
          version="0.2.0" // "0.2.0" or "0.1.0"
          onSuccess={(response) => { console.log(response) }}
          onCancel={() => { console.log('something went wrong') }}
        />
      </View>
    );
  }
}
export default Example;

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
   </span>
