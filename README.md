# react-native-sample-app

## A React Native sample application for the [react-native-iar-sdk](https://github.com/ImagineAR/react-native-iar-sdk) library

ImagineAR is an Augmented Reality app development platform with tools to enable AR experiences for digital audiences. This software development kit integrates seamlessly into native mobile applications providing everything needed to create and manage engaging AR experiences. The ImagineAR SDK leverages ImagineAR Cloud to provide self-publishing management tools used to define and deliver AR experiences to end users in real time.

**Want to learn more about ImagineAR?** Visit the [ImagineAR website](https://github.com/ImagineAR/IAR-SDK-Sample-iOS/blob/main/imaginear.com).

## How to Get Started

### Requirements

The ImagineAR SDK has a minimum deployment target of:
iOS version `13.0`
Android API Level `26`

### Installation of the sample app

Clone the sample app from this github repository
`git clone https://github.com/ImagineAR/react-native-sample-app.git`

Install the application for iOS and android with the following steps:

```

yarn install
cd ios && pod install --repo-update

```

> For iOS, you will need to open the
> `ios/react_native_sample_app.xcworkspace` file and configure automatic
> signing for your team before the iOS app will launch

### Usage

`yarn run ios` Build the iOS App (requires a MacOS computer) to a simulator or physical device.
`yarn run android` Build the Android App to a simulator or physical device.

## The Samples

The Sample application contains views to demonstrate the various features of the platform.

The sample app demonstrates the basic API-based content interactions with ImagineAR Cloud for the following IAR-Core-SDK features:

- User Management tools - including external user creation, login and migration functionality
- User Rewards
- On-Demand Markers

The sample app demonstrates the basic usage of the features contained within the IAR-Surface-SDK:

- Environment surface detection
- Dynamic acquisition of defined content metadata from ImagineAR Cloud
- Rendering and AR projection of all supported asset types using the detected surface
- Location Markers
- On-Demand Markers

Library documentation and implementation can be found at the [react-native-iar-sdk library](https://github.com/ImagineAR/react-native-iar-sdk) repository

## ImagineAR Features

### Marker Types

ImagineAR provides a variety of features to help bridge the gap between users and the core AR camera experiences:

**Location Markers**

- This marker type contains additional location metadata that can be compared to GPS data from the device as a gateway to accessing location-dependent user experiences
- The ensuing AR experience for location markers leverages surface-detection to place the digital asset in the AR space

**On-Demand Markers**

- On-Demand Markers require no specific action by the end user to access the AR experience
- Activation is facilitated simply by an ID-based lookup, where the Cloud service will request a marker ID and return the necessary metadata back to render the AR experience
- These marker types can be used as building blocks for more complex, customizable experiences not bound by ImagineAR's guidelines
- On-Demand Markers leverage surface-detection to place digital assets in the AR space

### Shared Features

Additional shared features can be layered into the user experiences defined above to provide a richer experience for AR users:

**Rewards**

- Each marker experience can be elevated with additional digital content in the form of Rewards
- Rewards are user-owned digital objects that are retained beyond the single AR experience
- Rewards come in two types: image assets or general promo code strings
- Alongside each Reward, a link with custom text can be provided to help guide and convert users to other digital experiences

**Anonymous User Management**

- ImagineAR provides an ID-based user management system that can be paired with any user context from a consuming mobile app
- The user system tracks ownership of rewards and progress through AR hunts, allowing support for users who want to engage on multiple devices
- The system includes a migration feature to move user data between IDs
- ImagineAR's user management system only stores an ID to represent the user, therefore it does not accept or hold any personally identifying information (PII) for a given user

### Asset Types

The ImagineAR SDK can render the following digital content types in the AR camera experiences:

**3D Models**

- Providing the most immersive experience, the SDK supports complex 3D model rendering
- Animation is supported for 3D models, looping the animation in the scene
- Real-time shadows are rendered based on the model's geometry during surface-detection experiences
- On iOS, 3D models are required to be in the USDZ format

**Videos**

- The ImagineAR SDK is capable of rendering video assets to a 2D plane in the 3D AR scene
- Video assets support green and blue chromakeying, with an adjustable threshold, this can provide a strong immersive experience for real world objects without creating 3D models
- Videos are required to be in MP4 format

**Images**

- Similar to video assets, basic image assets can also be rendered to a 2D plane and drawn in the 3D AR scene
- Image assets can be provided in PNG or JPG format

Assets can be manipulated dynamically using metadata defined in the ImagineAR Cloud dashboard, allowing control over scale, offset positioning and rotation.

# Ready to Integrate?

The ImagineAR SDK is a paid service with flexible pricing, access to the ImagineAR Cloud dashboard is limited to our customers.

Read-only sample content is provided for test integrations to help ensure ImagineAR is the right tool for your application. If you're ready to test the integration into your mobile app, head to our [integration documentation](https://docs.imaginear.com/docs/v1.5/ios/integration#integrate-the-sdk-into-your-application) for all the details.

Have questions about integration or are ready to discuss pricing? Don't hesitate to reach out to us at [info@imaginear.com](https://github.com/ImagineAR/IAR-SDK-Sample-iOS/blob/main/info@imaginear.com).

# License

The contents of this repository are licensed under the [Apache License, version 2.0.](https://www.apache.org/licenses/LICENSE-2.0) The use of Imagine AR SDK is governed by the [Terms of Service](https://imaginear.com/terms-conditions) for ImagineAR.
