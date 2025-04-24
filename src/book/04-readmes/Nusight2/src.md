---
section: Readmes
chapter: Nusight2
title: Client
description: .
slug: /readmes/Nusight2/src
---

# NUsight client networking

The classes in this directory implement a network interface for interacting with NUsight's server and NUClearNet, from the browser.

## Using the `Network` class

The main class that should be used when a component needs networking is [`Network`](./network.ts), which allows for subscribing to multiple messages and unsubscribing from them all at once, as well as sending messages to the server and making RPC calls.

Tabs and other components in NUsight that need networking should create their own network class, taking an instance of the [`NUsightNetwork`](./nusight_network.ts) class and using that to create a new [`Network`](./network.ts) instance to use for networking.

For example, for a tab called **Log**, you would have a file at `src/client/components/log/network.ts` with code like the following:

```ts
import { action } from "mobx";

import { message } from "../../../shared/messages";
import { Network } from "../../network/network";
import { NUsightNetwork } from "../../network/nusight_network";
import { RobotModel } from "../robot/model";

import { LogModel } from "./model";

export class LogNetwork {
  /** The network interface used for sending/receiving messages and making RPC calls */
  network: Network;

  /** The tab's data model which is updated when messages are received */
  model: LogModel;

  constructor(network: Network, model: LogModel) {
    this.network = network;
    this.model = model;
  }

  /** Used to create a new LogNetwork instance using the given NUsightNetwork and model */
  static of(nusightNetwork: NUsightNetwork, model: LogModel): LogNetwork {
    const network = Network.of(nusightNetwork);
    return new LogNetwork(network, model);
  }

  /**
   * Used to unsubscribe from all messages and cancel any RPC calls in progress.
   * Should be called when the component for the tab is unmounted.
   */
  destroy() {
    this.network.off();
  }
}
```

## Listening for messages from the server

To listen for messages from the server, the `Network.on()` method can be used, from the tab or component-specific network class.

This example adds a `onLog()` method to the `LogNetwork` class, which will be called when a `Log` message is received from the server:

```ts
// Assumes the following protobuf message is available:
// - message.output.Log

export class LogNetwork {
  // [...] (see above for class definition)

  constructor(network: Network, model: LogModel) {
    // [...] (see above for rest of constructor)

    // Listen for Log messages from the server
    this.network.on(Log, this.onLog);
  }

  /** Called when a Log message is received from the server */
  @action
  private onLog = (robotModel: RobotModel, log: Log) => {
    // Parameters are as follows:
    //   - `robotModel` has details about the peer that sent the message
    //   - `log` is the message that was sent
    // Use `log` to update the model here for rendering in the tab...
  };
}
```

## Sending messages to the server

To send a message to the server, the type-safe `Network.emit()` method can be used, from the tab or component-specific network class.

This example adds a `toggleLogging()` method to the `LogNetwork` class, which will send a `StartLogging` or `StopLogging` message to the server when called:

```ts
// Assumes the following protobuf messages are available:
//   - message.output.StartLogging
//   - message.output.StopLogging

export class LogNetwork {
  // [...] (see above for constructor, listeners, etc.)

  toggleLogging() {
    if (this.model.isLogging) {
      this.network.emit(new message.output.StopLogging());
    } else {
      this.network.emit(new message.output.StartLogging());
    }
  }
}
```

The `toggleLogging()` method can then be called from a controller or view, to send the appropriate message to the server.

## Making RPC calls

An RPC call can be used to send a message to the server when a response is expected. The type-safe `Network.call()` method can be used to make an RPC call, from the tab or component-specific network class.

This example adds a `searchLogs()` method to the `LogNetwork` class, which will send a `SearchLogsRequest` message to the server when called:

```ts
// Assumes the following protobuf messages are available:
//   - message.output.SearchLogsRequest
//   - message.output.SearchLogsRequest.Response
// To be used with RPC calls, the message types must meet these requirements:
//   - the request message must have a `rpc` field of type `RpcRequestMeta`
//   - the response message must have a `rpc` field of type `RpcResponseMeta`

export class LogNetwork {
  // [...] (see above for constructor, listeners, etc.)

  async searchLogs(query: string) {
    const result = await this.network.call(new message.output.SearchLogsRequest({ query: query }));

    // If the RPC call was successful, `result.ok` will be true, and `result.response` will be the response message
    if (result.ok) {
      // Use `result.response` here to update the model for rendering in the tab...
    }
    // Otherwise, `result.ok` will be false, and `result.error` will be an instance of `RpcError`,
    // which has a `cause` property that can be used to determine the cause of the error
    else {
      // Here we call the default error handler, which ignores cancellation errors and re-throws all other errors
      result.error.defaultHandler();
    }
  }
}
```

The `searchLogs()` method can then be called from a controller or view, to send the request to the server.
# ResizeContainer Component

This folder exports a `ResizeContainer` component from [`resize_container.tsx`](./resize_container.tsx) and `ResizePanel` component from [`resize_panel.tsx`](./resize_panel.tsx) which combine to create a layout that can be resized at runtime by dragging the resize handles rendered between the panels.

The `ResizeContainer` component can have `ResizePanel`s as its children and is responsible for managing the size of the panels and rendering the handles between them.

The `ResizePanel` provides props for managing attributes of each individual panel such as sizing requirements.

## Usage

A resize container must contain `<ResizePanel>` elements as direct children. To nest containers, the order of elements should be `<ResizeContainer>` → `<ResizePanel>` → `<ResizeContainer>` → `<ResizePanel>`.

The `<ResizePanel>` component exposes a custom ref object with a method for toggling the panel's state between "minimized", "maximized" and "default".

```tsx
import { ResizeContainer } from './src/components/resize_container/resize_container';
import { ResizePanel } from './src/components/resize_container/resize_panel';
import { Button } from './src/components/button/button';

// Container with an ID to save its children's positions between page reloads
<ResizeContainer saveKey="main-layout">
  <ResizePanel>Content 1</ResizePanel>
  <ResizePanel>Content 2</ResizePanel>
</ResizeContainer>

// Container with two panels of different minimum and maximum sizes
<ResizeContainer>
  <ResizePanel minSize={100} maxSize={400}>Content 1</ResizePanel>
  <ResizePanel minSize={200} maxSize={500}>Content 2</ResizePanel>
</ResizeContainer>

// Nested container, where the inner container's children are laid out horizontally
<ResizeContainer>
  <ResizePanel minSize={200}>
    <ResizeContainer horizontal>
      <ResizePanel minSize={100}>Content 1.1</ResizePanel>
      <ResizePanel minSize={200}>Content 1.2</ResizePanel>
    </ResizeContainer>
  </ResizePanel>

  <ResizePanel minSize={200}>Content 2</ResizePanel>
</ResizeContainer>

// Render buttons in a panel to toggle it between its possible states,
// and show a message displaying the panel's current state
const panelRef = useRef<ResizePanelRef>(null);
const [currentState, setCurrentState] = useState("default");
<ResizeContainer>
  <ResizePanel ref={panelRef} minSize={100} onStateChange={setCurrentState}>
    <Button onClick={() => panelRef.current?.setState("minimized")}>
      Set Minimized
    </Button>
    <Button onClick={() => panelRef.current?.setState("maximized")}>
      Set Maximized
    </Button>
    <Button onClick={() => panelRef.current?.setState("default")}>
      Set Default
    </Button>
    <span>Current: {currentState}</span>
  </ResizePanel>
  <ResizePanel minSize={200}>Content 2</ResizePanel>
</ResizeContainer>
```
# Icon component

The [`view.tsx`](./view.tsx) file in this folder exports an `Icon` component that can be used to show an icon from the [Material Symbols](https://fonts.google.com/icons?icon.style=Outlined) icon set. The icons used are from the "Outlined" style.

Icons are rendered using a variable font, which is loaded in NUsight's root `index.html` file. This allows for dynamically adjusting the following properties of an icon, without having to load and switch between different fonts:

- `fill` - whether the icon is visually "filled in". Default is `false` for no fill.
- `weight` - the stroke weight (i.e. thickness of the icon's lines). Ranges from `100` to `700`. Default weight is `300`.
- `grade` - the "emphasis" of the icon - lower grades are less visually prominent. Default grade is `0`, for no emphasis.
- `opticalSize` - provides a way to automatically adjust the stroke weight when the icon is rendered at smaller or larger sizes. Default optical size is `24`, assuming most icons will be rendered at `24px`.
- `size` - the size of the icon, in pixels. This value is converted to `rem` when set. Default size is `24`, which is `1.5rem`.
- `flip` - whether the icon is flipped horizontally, vertically, or both. Default is `none`, for no flipping.
- `rotate` - the angle (in degrees) to rotate the icon. Default is `0`, for no rotation.

The icon's color and size can be adjusted using CSS `color` and `font-size` properties, respectively.

See https://m3.material.io/styles/icons/applying-icons for more information on these adjustable properties, including examples.

## Usage

An icon is shown by rendering the `<Icon>` component with the icon's name as the child. The icon's name can be found in the [Material Symbols](https://fonts.google.com/icons?icon.style=Outlined) icon set, converted to lowercase with spaces replaced by underscores. For example, the "Arrow Forward" icon from the set is rendered using `<Icon>arrow_forward</Icon>`.

```tsx
import { Icon } from './src/components/icon/view'

// Show a checkmark in a circle
<Icon>check_circle</Icon>

// Show a large checkmark in a circle
<Icon size="48">check_circle</Icon>

// Show a filled in checkmark in a circle
<Icon fill>check_circle</Icon>

// Show a thin checkmark in a circle
<Icon weight="200">check_circle</Icon>

// Show a green checkmark in a circle
<Icon className="text-green-500">check_circle</Icon>

// Show an arrow forward icon, rotated to point up
<Icon rotate={270}>arrow_forward</Icon>

// Show an arrow forward icon, flipped to point left
<Icon flip="horizontal">arrow_forward</Icon>
```

> **Note**
> If you find an icon in the library that doesn't work with the component, it could be a newer icon that is not available in the local copy of the font we have. If this is the case, you can update our font file (at `src/assets/fonts/material-symbols/material-symbols-outlined.woff2`) to the latest version of the file from [this repo](https://github.com/marella/material-symbols/tree/main/material-symbols), which tracks Google's latest releases of the font files.
# Camera Text Renderer

The [`text.ts`](./text.ts) file in this folder exports a `TextViewModel` class which can generate THREE.JS meshes of text from strings to render text in a camera view.

Text meshes generated by the renderer have the option of being positioned either by a ray from the camera's perspective or by a pixel in the camera's image. There are also multiple options for styling the text geometry including:

- `textColor` - The colour of the text. Defaults to `"white"`.
- `backgroundColor` - The colour of the background behind the text. Defaults to `"transparent"`.
- `height` - A height in pixels of the text geometry. Defaults to `20`px.
- `align` - Horizontal alignment of the text. Can be either `"start"`, `"middle"`, or `"end"`.
- `baseline` - Vertical alignment of the text. Can be either `"top"`, `"middle"`, or `"bottom"`.

## Usage

```ts
// Create a Text Renderer (from Camera Model attributes)
const renderer = new TextViewModel(canvas, params, image);

// Create options for text positioned by a ray
const rayTextOpts: TextOpts = {
  type: "ray",
  ray: Vector3.of(x, y, z), // Ray from camera space
  text: "Example Text",
};

// Create options for text positioned by an image pixel
const pixelTextOpts: TextOpts = {
  type: "pixel",
  pixel: Vector2.of(x, y), // Image pixel coordinate
  text: "Example Text",
};

// Create text geometry
const rayTextGeometry = renderer.text(rayTextOpts);
const pixelTextGeometry = renderer.text(pixelTextOpts);

// Use the geometry to draw the text... (see the story linked below)
```

For a complete example, view the [Text Renderer Story](./stories/text.stories.tsx).
Samples from [`nbsdecoder.js`](https://github.com/Fastcode/nbsdecoder.js/tree/d99c1b10332fce36ecc24e803368ce987c7779d6/tests/sample).

See [the `nbsdecoder.js` test](https://github.com/Fastcode/nbsdecoder.js/blob/d99c1b10332fce36ecc24e803368ce987c7779d6/tests/test.js#L29-L37) for details on what's in the sample files.
