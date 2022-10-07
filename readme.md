# recipes
**recipes** is a blockchain built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli).

## Get started

```
ignite chain serve
```

`serve` command installs dependencies, builds, initializes, and starts your blockchain in development.

### Configure

Your blockchain in development can be configured with `config.yml`. To learn more, see the [Ignite CLI docs](https://docs.ignite.com).

### Web Frontend

Ignite CLI has scaffolded a Vue.js-based web app in the `vue` directory. Run the following commands to install dependencies and start the app:

```
cd vue
npm install
npm run serve
```

The frontend app is built using the `@starport/vue` and `@starport/vuex` packages. For details, see the [monorepo for Ignite front-end development](https://github.com/ignite/web).

## Release
To release a new version of your blockchain, create and push a new tag with `v` prefix. A new draft release with the configured targets will be created.

```
git tag v0.1
git push origin v0.1
```

After a draft release is created, make your final changes from the release page and publish it.

### Install
To install the latest version of your blockchain node's binary, execute the following command on your machine:

```
curl https://get.ignite.com/username/recipes@latest! | sudo bash
```
`username/recipes` should match the `username` and `repo_name` of the Github repository to which the source code was pushed. Learn more about [the install process](https://github.com/allinbits/starport-installer).

# Building a sovereign blockchain on Cosmos

# 🧱 What are we building?

This tutorial will cover setting up the Ignite CLI and building a Cosmos SDK application-specific blockchain. The [Cosmos SDK](https://github.com/cosmos/cosmos-sdk) is a framework for building blockchain applications using the [Tendermint Core (Byzantine-Fault Tolerant (BFT) Consensus)](https://github.com/tendermint/tendermint). BFT enables decentralized, trustless networks to function even in the presence of malfunctioning and malicious nodes.

Both the Tendermint Core and Cosmos SDK are written in the Golang programming language. The Cosmos Ecosystem uses [Inter-Blockchain Communication (IBC)](https://github.com/cosmos/ibc-go) to allow blockchains to communicate with one another.

## 🐇 Let’s go deeper

### ⚛️ Cosmos

Cosmos is known as an internet of blockchains, or a network of interoperable blockchains. It allows for a better decentralized application (dApp) user and development experience. In contrast to traditional, monolithic blockchains, Cosmos opens the door to facilitated scalability, increased sovereignty, speed, and fast finality.

The architecture of a blockchain can be divided into three layers as described in the [Cosmos docs](https://tutorials.cosmos.network/academy/1-what-is-cosmos/blockchain-and-cosmos.html):

- The network layer: discovers nodes, and propagates transactions and consensus-related messages between single nodes. In Ethereum, this is the Ethereum Virtual Machine
- The consensus layer: runs the consensus protocol between single nodes of a peer-to-peer network
- The application layer: running a state machine that defines the application’s state and updates it with the processing of transactions implementing the network’s consensus

### 🔥 Ignite CLI

The Ignite CLI is a tool to build, launch, and maintain decentralized applications on a sovereign and secure blockchain in the Cosmos ecosystem. Developers can:

- Create a modular blockchain written in Go with a single command
- Start a development server to experiment with token creation, allocation, and module configuration
- Allow for inter-chain token transfers by using a built-in IBC relayer to send value and data to different chains
- Benefit from fast-developed frontend with automatically generated APIs and webpages in JavaScript, TypeScript, and Vue

### 🐢 Contrast to traditional blockchains

While Ethereum added improvements to the developer and user experience in comparison to Bitcoin, there are still some blockers to expanding the traditional blockchain ecosystems: low flexibility for developers, difficulties with speed, throughput, scalability, state finality, and sovereignty. 

Let’s break these down:

- **Speed**: transaction speed. This is impacted by the delay between blocks. For Bitcoin, this is 10 minutes and for Ethereum, 15 seconds. Speed is also impacted by other pending transactions competing to be included in the next block(s).
- **Throughput**: how many transactions the network can handle per unit of time. Throughput may be limited due to physical network bandwidth, computer resources, or decisions built into the protocol. This limits the scalability of dApps.
- **State finality**: describes whether and when committed blocks with transactions can no longer be reverted or revoked. There are two types of state finality:
    - Probabilistic finality: describes the finality of a transaction depending on how probable reverting a block is, or the probability of removing a transaction.
    - Absolute finality: describes a trait of PoS protocols. As soon as the transaction and block are verified, finality is achieved. No scenarios allow for the transaction to be revoked after finality.
- Cosmos **solves the scalability issue** with two types of scalability:
    - Horizontal scalability: scaling out by adding similar machines to the network. More nodes can participate in state replication, consensus observation, and any activity that queries the state
    - Vertical scalability: scaling up by improving the network’s components to increase its computational power. This allows the network to accept more transactions and any activity that modifies the state
- Cosmos **promotes sovereignty**:
    - In a monolithic, general-purpose blockchain, changes in applications must align with both the governance structure of the underlying chain as well as the application. This is known as two-layer governance.
    - In a modular blockchain, governance is specific and tailored to the application. Every chain is maintained by its own set of validators and follows a one-layer governance model.

### 🧩 Introducing the modular blockchain paradigm

These reasons have led to the creation of multiple purpose- and application-specific blockchains, most notably in the Cosmos ecosystem.

The Cosmos SDK is an open-source framework for building Proof-of-Stake (PoS) and Proof-of-Authority (PoA) blockchains. These blockchains are usually application-specific blockchains or app chains. The Cosmos SDK allows developers to create natively interoperable blockchains. Integrating an existing blockchain on Cosmos is as easy as importing other chains into your blockchain application. It is also possible to deploy PoS blockchains that support Ethereum smart contracts.

Inter-Blockchain Communication Protocol (IBC) is the basis for the internet of blockchains in the Cosmos ecosystem. The instant finality of Tendermint allows the transfer of tokens and communication between heterogeneous chains. Blockchains with different applications and architecture specifications become interoperable even if they do not share a validator set. Without IBC, interoperability is difficult to achieve because implementations of consensus, networking, and application layers are different.

The modular architecture of Cosmos is implemented in hubs and zones.

- Zones: heterogeneous blockchains carrying out the authentication of accounts and transactions, the creation and distribution of tokens, and execution of changes to the chain.
- Hubs: blockchains designed to connect the zones. When a zone connects to a hub through an IBC connection, the zone gets access to the other zones connected to the hub. Data and value can be sent and received between the zones without risk.

![Untitled-2022-04-18-1848 (1).png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a722f904-ba5f-4300-998e-630c476d96ab/Untitled-2022-04-18-1848_(1).png)

For a more in-depth overview of the Cosmos SDK and ecosystem, see the [high-level overview](https://github.com/cosmos/cosmos-sdk/blob/main/docs/intro/overview.md).

# ⚙️ Setup

## 💻 System requirements

- Operating systems: GNU/Linux, macOS, or Windows Subsystem for Linux (WSL)
- [Go 1.18+](https://go.dev/dl/)
    - Be sure to [set the GOPATH environment variables correctly](https://go.dev/doc/gopath_code#GOPATH)
- [Ignite CLI](https://github.com/ignite/cli)

### 💨 Install [Go 1.18+](https://go.dev/dl/)

Verify that your version of Go is 1.18 or higher by running:

```bash
go version
```

I am working on a M1 MacBook Pro, so the response for me is:

```bash
go version go1.19 darwin/arm64
```

### 🔥 Install [Ignite CLI](https://github.com/ignite/cli)

Run this command in your terminal to install Ignite CLI:

```bash
curl https://get.ignite.com/cli@v0.22.2! | bash
```

<aside>
✋ On some machines, you may run into permissions errors. You can resolve these errors by following the guidance [here](https://docs.ignite.com/guide/install#write-permission).

</aside>

A successful install will return something similar the response below:

```bash
% Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  3967    0  3967    0     0   4122      0 --:--:-- --:--:-- --:--:--  4136
Installing ignite v0.22.2.....
######################################################################## 100.0%
Installed at /usr/local/bin/ignite
```

Verify you’ve installed Ignite CLI by running:

```bash
ignite version
```

The response that you receive should look something like this:

```bash
·
· 🛸 Ignite CLI v0.23.0 is available!
·
· To upgrade your Ignite CLI version, see the upgrade doc: https://docs.ignite.com/guide/install.html#upgrading-your-ignite-cli-installation
·
··

Ignite CLI version:	v0.22.2
Ignite CLI build date:	2022-06-23T16:39:25Z
Ignite CLI source hash:	a22808a031b93c0c4065a303edea88bb90be6a10
Your OS:		darwin
Your arch:		arm64
Your go version:	go version go1.19 darwin/arm64
Your uname -a:		Darwin Joshs-MacBook-Pro-16.local 21.6.0 Darwin Kernel Version 21.6.0: Sat Jun 18 17:07:22 PDT 2022; root:xnu-8020.140.41~1/RELEASE_ARM64_T6000 arm64
Your cwd:		/Users/joshcs
Is on Gitpod:		false
```

<aside>
🆒 We can disregard the message to upgrade to `v0.23.0`, because this tutorial is based on `v0.22.2`.

</aside>

# ☀️ gm, Ignite CLI

Now that we are set with Go and the Ignite CLI installed on our machine, we’re ready to build, test, and launch our own sovereign blockchain.

The Ignite CLI comes with scaffolding commands to make development of blockchains quicker by creating everything that is needed to start a new Cosmos SDK blockchain.

Open your terminal and run this command to initiate your blockchain:

```bash
ignite scaffold chain gm
```

The response will look similar to below:

```bash
·
· 🛸 Ignite CLI v0.23.0 is available!
·
· To upgrade your Ignite CLI version, see the upgrade doc: https://docs.ignite.com/guide/install.html#upgrading-your-ignite-cli-installation
·
··

⭐️ Successfully created a new blockchain 'gm'.
👉 Get started with the following commands:

 % cd gm
 % ignite chain serve

Documentation: https://docs.ignite.com
```

This command has created a Cosmos SDK blockchain in the `gm` directory. The `gm` directory contains a fully functional blockchain. The following standard Cosmos SDK [modules](https://docs.cosmos.network/master/modules/) have been imported:

- `staking` - for delegated Proof-of-Stake (PoS) consensus mechanism
- `bank` - for fungible token transfers between accounts
- `gov` - for on-chain governance
- `mint` - for minting new units of staking token
- `nft` - for creating, transferring, and updating NFTs
- and [more](https://docs.cosmos.network/master/architecture/adr-043-nft-module.html)

Switch to the `gm` directory:

```bash
cd gm
```

You can learn more about the `gm` directory’s file structure [here](https://docs.ignite.com/guide/hello#blockchain-directory-structure). Most of our work in this tutorial will happen in the `x` directory.

## 🎬 Starting a blockchain

Now that we have our fully-functional blockchain scaffolded, we can start our chain on our machine by running this command in the `gm` directory:

```bash
ignite chain serve
```

The response in your terminal will look similar to below, be sure to leave it **open**:

```bash
·
· 🛸 Ignite CLI v0.23.0 is available!
·
· To upgrade your Ignite CLI version, see the upgrade doc: https://docs.ignite.com/guide/install.html#upgrading-your-ignite-cli-installation
·
··

Cosmos SDK's version is: stargate - v0.45.4

🛠️  Building proto...
📦 Installing dependencies...
🛠️  Building the blockchain...
💿 Initializing the app...
🙂 Created account "alice" with address "cosmos1cm5x4y8pkt0fvqtznx8xp6rhad52zqfpsggxsc" with mnemonic: "knee gather true rose antenna various build cushion enlist daring soul polar range strategy soap orphan ahead rapid cruel reward mango place jar urban"
🙂 Created account "bob" with address "cosmos1tjwdg0q7u0ahreuh7ll2rc4uecgt4te02gqtlf" with mnemonic: "six claw coffee giant head door service donate casino ladder scorpion present sunny repair skate roast wolf audit mule much bottom cousin goat wolf"
🌍 Tendermint node: http://0.0.0.0:26657
🌍 Blockchain API: http://0.0.0.0:1317
🌍 Token faucet: http://0.0.0.0:4500
```

The `ignite chain serve` command downloads dependencies and compiles the source code into a binary called `gmd` (repo + `d`). From now on, you will use `gmd` to run all of your chain commands.

Two API endpoints have been exposed while starting your `gm` chain:

- [http://localhost:26657](http://localhost:26657) - low-level Tendermint API
- [http://localhost:1317](http://localhost:1317) - high-level blockchain API

### 🛑 Stopping your blockchain

To stop your blockchain, press `Ctrl+C` in the terminal window where it is running. However, there is no need to restart your development environment for every update. Hot reloading will automatically detect all changes that you make in the `gm` directory’s files.

## 💬 Say “gm, Ignite CLI!”

Now, we’re going to get our blockchain to say “gm, Ignite CLI” and in order to do so we need to make the following changes:

- Modify a protocol buffer file
- Create a keeper query function that returns data
- Register a query function

Protocol buffer files contain proto RPC calls that define Cosmos SDK queries and message handlers, and proto messages that define Cosmos SDK types. The RPC calls are also responsible for exposing an HTTP API.

The Keeper is required for each Cosmos SDK module and is an abstraction for modifying the state of the blockchain. Keeper functions allow you to query or write to the state. After you add a query to your chain, you need to register the query. You’ll only need to register a query once.

A typical Cosmos blockchain developer workflow looks something like this:

- Start with proto files to define Cosmos SDK [messages](https://docs.cosmos.network/master/building-modules/msg-services.html)
- Define and register [queries](https://docs.cosmos.network/master/building-modules/query-services.html)
- Define message handler logic
- Finally, implement the logic of these queries and message handlers in keeper functions

### 🙋‍♀️ Create your first query

For this part of the tutorial, open a new terminal window that is not the same that you started the chain in.

In your new terminal window, `cd` into the `gm` directory and run this command to create a `gm` query:

```bash
ignite scaffold query gm --response text
```

Response:

```bash
modify proto/gm/query.proto
modify x/gm/client/cli/query.go
create x/gm/client/cli/query_gm.go
create x/gm/keeper/grpc_query_gm.go

🎉 Created a query `gm`.
```

What just happened? `query` accepts the name of the query (`gm`), an optional list of request parameters (empty in this tutorial), and an optional comma-separated list of response field with a `--response` flag (`text` in this tutorial).

Navigate to the `proto/gm/query.proto` file, you’ll see that `Gm` RPC has been added to the `Query` service:

```protobuf
service Query {
  rpc Params(QueryParamsRequest) returns (QueryParamsResponse) {
    option (google.api.http).get = "/gm/gm/params";
  }
	rpc Gm(QueryGmRequest) returns (QueryGmResponse) {
		option (google.api.http).get = "/gm/gm/gm";
	}
}
```

The `Gm` RPC for the `Query` service:

- is responsible for returning a `text` string
- Accepts request parameters (`QueryGmRequest`)
- Returns response of type `QueryGmResponse`
- The `option` defines the endpoint that is used by gRPC to generate an HTTP API

### 📨 Query request and response types

```protobuf
message QueryGmRequest {
}

message QueryGmResponse {
  string text = 1;
}
```

- `QueryGmRequest` is empty because it does not require parameters
- `QueryGmResponse` contains `text` that is returned from the chain

## 👋 Gm keeper function

The `x/gm/keeper/grpc_query_gm.go` file contains the `Gm` keeper function that handles the query and returns data.

```go
func (k Keeper) Gm(goCtx context.Context, req *types.QueryGmRequest) (*types.QueryGmResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)
	_ = ctx
	return &types.QueryGmResponse{}, nil
}
```

The `Gm` function performs the following actions:

- Makes a basic check on the request and throws an error if it’s `nil`
- Stores context in a `ctx` variable that contains information about the environment of the request
- Returns a response of type `QueryGmResponse`

Currently, the response is empty. Let’s update the keeper function.

Our `query.proto` file defines that the response accepts `text`. Use your text editor to modify the keeper function in `x/gm/keeper/grpc_query_gm.go` . 

```go
func (k Keeper) Gm(goCtx context.Context, req *types.QueryGmRequest) (*types.QueryGmResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)
	_ = ct
	return &types.QueryGmResponse{Text: "gm, Ignite CLI!"}, nil
}
```

Save the file to restart your chain. 

Visit the `gm` endpoint in your browser at [http://localhost:1317/gm/gm/gm](http://localhost:1317/gm/gm/gm). The query handler is not registered with gRPC, so you will see `not implemented` or `localhost cannot connect` error.

![scrot 2022-08-15 at 11.52.07 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/45046a64-5133-46b3-b572-b8319aa1bfca/scrot_2022-08-15_at_11.52.07_PM.png)

## ✍️ Register query handlers

Now we will make the following changes to our `x/gm/module.go` file to handle queries:

1. Add `"context"` to the list of packages in the import statement. (don’t save your file until after step 2)
    
    ```go
    import (
      "encoding/json"
      "fmt"
      //...
      "context"
    ```
    
2. Find `RegisterGRPCGatewayRoutes` and register the query handlers:
    
    ```go
    func (AppModuleBasic) RegisterGRPCGatewayRoutes(clientCtx client.Context, mux *runtime.ServeMux) {
      types.RegisterQueryHandlerClient(context.Background(), mux, types.NewQueryClient(clientCtx))
    }
    ```
    
3. After your chain has restarted, visit [http://localhost:1317/gm/gm/gm](http://localhost:1317/gm/gm/gm) to see your `QueryGmResponse`
    
    ![scrot 2022-08-16 at 12.31.12 AM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7adf3f3c-6e70-4d8c-83b7-40ca27801820/scrot_2022-08-16_at_12.31.12_AM.png)
    

The `query` command has also scaffolded `x/gm/client/cli/query_gm.go` that implements a CLI equivalent of the gm query and mounted this command in `x/gm/client/cli/query.go` . Run the following command and get the same JSON response:

```bash
gmd q gm gm
```

Response:

```bash
text: gm, Ignite CLI!
```

### ✌️ Adding a gn query

Still in your second terminal, run the following command:

```bash
ignite scaffold query gn --response text
```

Our `query.proto` file defines that the response accepts `text`. Use your text editor to modify the keeper function in `x/gm/keeper/grpc_query_gn.go` . 

```go
func (k Keeper) Gn(goCtx context.Context, req *types.QueryGmRequest) (*types.QueryGmResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}
	ctx := sdk.UnwrapSDKContext(goCtx)
	_ = ct
	return &types.QueryGmResponse{Text: "gn ✌️"}, nil
}
```

Head to your browser at [http://localhost:1317/gm/gm/gn](http://localhost:1317/gm/gm/gn) to see your second query:

![scrot 2022-08-16 at 11.51.26 PM.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7dca06c6-743f-4719-a3cc-c2a80f46e1c8/scrot_2022-08-16_at_11.51.26_PM.png)

Run this command in your terminal to query using the gmd CLI: 

```bash
gmd q gm gn
```

Response:

```bash
text: gm, Ignite CLI!
```

Congratulations, you’ve built your first blockchain and your first Cosmos SDK modules! 🎉

# 🥗 Kicking it up a notch: Building your own blockchain recipe book

Next, we’re going to build a blockchain for your favorite recipes. The goal of this portion of the tutorial is to create a blockchain with a module that allows you to write and read data from your application-specific blockchain. The end user will also be able to submit new recipes and read them from the blockchain.

### 🏗 First, scaffold your `recipes` chain:

```bash
ignite scaffold chain recipes --address-prefix recipes
```

Your new `recipes` chain has been scaffolded and `--address-prefix recipes` allows the address prefix to be `recipes` instead of `cosmos`. 

Change into the `recipes` directory:

```bash
cd recipes
```

On the `gm` blockchain, we defined a new API endpoint and modified a keeper query function to return static data. This is only the first step. In this section, we’ll be modifying the state with transactions (Cosmos SDK messages) that are routed to a module and its message handlers, which are sent to the `recipes` blockchain.

### 💬 Create message types

Create a message type and its handler with the `message` command:

```bash
ignite scaffold message createRecipe dish ingredients
```

Response:

```bash
modify proto/recipes/tx.proto
modify x/recipes/client/cli/tx.go
create x/recipes/client/cli/tx_create_recipe.go
modify x/recipes/handler.go
create x/recipes/keeper/msg_server_create_recipe.go
modify x/recipes/module_simulation.go
create x/recipes/simulation/create_recipe.go
modify x/recipes/types/codec.go
create x/recipes/types/message_create_recipe.go
create x/recipes/types/message_create_recipe_test.go

🎉 Created a message `createRecipe`.
```

Head to your `proto/recipes/tx.proto` file and you’ll see the `MsgCreateRecipe` has been created. Add `uint64 id = 1;` to the `MsgCreateRecipeResponse` function:

```protobuf
message MsgCreateRecipeResponse {
  uint64 id = 1;
}
```

Looking further into the message, we can see that `MsgCreateRecipe` has 3 fields: creator, dish, and ingredients.

```protobuf
message MsgCreateRecipe {
  string creator = 1;
  string dish = 2;
  string ingredients = 3;
}
```

### 🤿 Diving deeper into the message code

We can also see that the `CreateRecipe` RPC has already been added to the `Msg` service:

```protobuf
service Msg {
  rpc CreateRecipe(MsgCreateRecipe) returns (MsgCreateRecipeResponse);
}
```

Now, navigate to the `x/recipes/handler.go` file. Ignite CLI added a `case` to the `switch` statement inside the `NewHandler` function. This function routes messages and calls the correct keeper method based on the type of message:

```go
func NewHandler(k keeper.Keeper) sdk.Handler {
//...
	return func(ctx sdk.Context, msg sdk.Msg) (*sdk.Result, error) {
    //...
		switch msg := msg.(type) {
		case *types.MsgCreateRecipe:
			res, err := msgServer.CreateRecipe(sdk.WrapSDKContext(ctx), msg)
			return sdk.WrapServiceResult(ctx, res, err)
	  //...
		}
	}
}
```

The `case *types.MsgCreateRecipe` statement handles messages with type `MsgCreateRecipe`, calls `CreateRecipe` method, and returns the response.

### 📕 Define messages logic

Navigate to `x/recipes/keeper/msg_server_create_recipe.go`. For our recipes chain, we want the dish and ingredients to be written to the blockchain’s state as a new recipe.

```go
func (k msgServer) CreateRecipe(goCtx context.Context, msg *types.MsgCreateRecipe) (*types.MsgCreateRecipeResponse, error) {
  // Get the context
  ctx := sdk.UnwrapSDKContext(goCtx)

  // Create variable of type Recipe
  var recipe = types.Recipe{
     Creator: msg.Creator,
     Dish: msg.Dish,
     Ingredients: msg.Ingredients,
  }

  // Add a recipe to the store and get back the ID
  id := k.AppendRecipe(ctx, recipe)

  // Return the ID of the recipe
  return &types.MsgCreateRecipeResponse{Id: id}, nil
}
```

### 📗 Define Recipe type and AppendRecipe keeper method

Create a file `proto/recipes/recipe.proto` and define the `Recipe` message:

```go
syntax = "proto3";

package recipes.recipes;

option go_package = "recipes/x/recipes/types";

message Recipe {
  string creator = 1;
  uint64 id = 2;
  string dish = 3; 
  string ingredients = 4; 
}
```

### 📘 Define keeper methods

Now you’ll define your `AppendRecipe` keeper method.

Create the `x/recipes/keeper/recipe.go` file. The `AppendRecipe` function is a placeholder to brainstorm how to implement it:

```go
package keeper

import (
  "encoding/binary"

  "github.com/cosmos/cosmos-sdk/store/prefix"
  sdk "github.com/cosmos/cosmos-sdk/types"

  "recipes/x/recipes/types"
)

// func (k Keeper) AppendRecipe() uint64 {
//    count := k.GetRecipeCount()
//    store.Set()
//    k.SetRecipeCount()
//    return count
// }
```

Add these prefixes to the `x/blog/types/keys.go` file in the `const` and add a comment for your reference:

```go
const (
  //...

  // Keep track of the index of recipes  
  RecipeKey      = "Recipe-value-"
  RecipeCountKey = "Recipe-count-"
)
```

Next, implement `GetRecipeCount`:

```go
func (k Keeper) GetRecipeCount(ctx sdk.Context) uint64 {
	// Get the store using storeKey (which is "recipes") and RecipeCountKey (which is "Recipe-count-")
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.RecipeCountKey))
  
	// Convert the RecipeCountKey to bytes
	byteKey := []byte(types.RecipeCountKey)
  
	// Get the value of the count
	bz := store.Get(byteKey)
  
	// Return zero if the count value is not found (for example, it's the first recipe)
	if bz == nil {
	  return 0
	}
  
	// Convert the count into a uint64
	return binary.BigEndian.Uint64(bz)
}
```

And then `SetRecipeCount`:

```go
func (k Keeper) SetRecipeCount(ctx sdk.Context, count uint64) {
	// Get the store using storeKey (which is "recipes") and RecipeCountKey (which is "Recipe-count-")
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.RecipeCountKey))
  
	// Convert the RecipeCountKey to bytes
	byteKey := []byte(types.RecipeCountKey)
  
	// Convert count from uint64 to string and get bytes
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
  
	// Set the value of Recipe-count- to count
	store.Set(byteKey, bz)
}
```

Now you’re ready to implement the `AppendRecipe` function at the top of the file above `GetRecipeCount` and `SetRecipeCount`:

```go
func (k Keeper) AppendRecipe (ctx sdk.Context, recipe types.Recipe) uint64 {
	// Get the current number of recipes in the store
	count := k.GetRecipeCount(ctx)
  
	// Assign an ID to the recipe based on the number of recipes in the store
	recipe.Id = count
  
	// Get the store
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte(types.RecipeKey))
  
	// Convert the recipe ID into bytes
	byteKey := make([]byte, 8)
	binary.BigEndian.PutUint64(byteKey, recipe.Id)
  
	// Marshal the recipe into bytes
	appendedValue := k.cdc.MustMarshal(&recipe)
  
	// Insert the recipe bytes using recipe ID as a key
	store.Set(byteKey, appendedValue)
  
	// Update the recipe count
	k.SetRecipeCount(ctx, count+1)
	return count
}
```

Now you have implemented all the code required to create new recipes and store them on-chain. When a transaction that contains a message type `MsgCreateRecipe` is broadcast, the message is routed to the recipes module.

- `x/recipes/handler.go` calls `k.CreateRecipe` which calls `AppendRecipe`, which gets the recipe count, adds a recipe using the count as the ID, increments the count, and returns the ID

### 🖥 Display recipes

In order to display recipes, scaffold a query:

```bash
ignite scaffold query dishes --response dish,ingredients
```

In the `proto/recipes/query.proto` file import:

```protobuf
import "recipes/recipe.proto";
```

Add pagination to the recipe request:

```protobuf
message QueryDishesRequest {
  // Adding pagination to request
  cosmos.base.query.v1beta1.PageRequest pagination = 1;
}
```

Add pagination to the recipe response:

```protobuf
message QueryDishesResponse {
  // Returning a list of recipes
  repeated Recipe Recipe = 1;

  // Adding pagination to response
  cosmos.base.query.v1beta1.PageResponse pagination = 2;
}
```

In order to implement recipe querying logic in `x/recipes/keeper/grpc_query_dishes.go`, delete the file contents and replace them with:

```go
package keeper

import (
	"context"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/query"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"recipes/x/recipes/types"
)

func (k Keeper) Dishes(c context.Context, req *types.QueryDishesRequest) (*types.QueryDishesResponse, error) {
  // Throw an error if request is nil
  if req == nil {
    return nil, status.Error(codes.InvalidArgument, "invalid request")
  }

  // Define a variable that will store a list of recipes
  var dishes []*types.Recipe

  // Get context with the information about the environment
  ctx := sdk.UnwrapSDKContext(c)

  // Get the key-value module store using the store key (in our case store key is "chain")
  store := ctx.KVStore(k.storeKey)

  // Get the part of the store that keeps recipes (using recipe key, which is "Recipe-value-")
  recipeStore := prefix.NewStore(store, []byte(types.RecipeKey))

  // Paginate the recipes store based on PageRequest
  pageRes, err := query.Paginate(recipeStore, req.Pagination, func(key []byte, value []byte) error {
    var dish types.Recipe
    if err := k.cdc.Unmarshal(value, &dish); err != nil {
      return err
    }

    dishes = append(dishes, &dish)

    return nil
  })

  // Throw an error if pagination failed
  if err != nil {
    return nil, status.Error(codes.Internal, err.Error())
  }

  // Return a struct containing a list of recipes and pagination info
  return &types.QueryDishesResponse{Recipe: dishes, Pagination: pageRes}, nil
}
```

### ☎️ Add gRPC to the module handler

In the `x/recipes/module.go` add `"context"` to the imports, do not save the file yet:

```go
import (
    "context"

    // ... other imports
)
```

Then update the `RegisterGRPCGatewayRoutes` function to register the query handler client and save the file:

```go
// RegisterGRPCGatewayRoutes registers the gRPC Gateway routes for the module.
func (AppModuleBasic) RegisterGRPCGatewayRoutes(clientCtx client.Context, mux *runtime.ServeMux) {
    types.RegisterQueryHandlerClient(context.Background(), mux, types.NewQueryClient(clientCtx))
}
```

### 👩‍💻 Use the CLI to create your first recipe

Start the chain with:

```bash
ignite chain serve
```

Create your first recipe in the command line, when prompted, confirm the transaction by entering `y`:

```bash
recipesd tx recipes create-recipe salad vegetables --from alice
```

![2022-08-18 02.11.06.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d26c5841-5a94-4967-8990-b42f6b1ed324/2022-08-18_02.11.06.gif)

### ⌨️ Query your recipes with the CLI

To query all of the on-chain recipes:

```bash
recipesd q recipes dishes
```

![2022-08-18 02.20.29.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c9d62006-62a3-4179-9b36-821cc1d89c36/2022-08-18_02.20.29.gif)

🎉 Congratulations, again! You have now successfully built a recipe book blockchain!

### 🐈 GitHub Repository

Here is the full repository for your reference: https://github.com/jcstein/cosmos-recipe-book

# 👀 What’s next?

Now that you’ve built your first Cosmos blockchain using the Cosmos SDK and Ignite CLI, you are ready to take your skills to the next level.

[Celestia](https://celestia.org) is an upcoming Cosmos blockchain that addresses the data availability problem and scalability.

What would you want you build on Celestia? Learn more [here](https://celestia.org/learn)

# 📚 Additional Resources

- [Celestia](https://celestia.org)
- [Developer Portal](https://tutorials.cosmos.network/)
- [GitHub - cosmos/sdk-tutorials: Tutorials for building modules for the Cosmos SDK](https://github.com/cosmos/sdk-tutorials)
- [GitHub - cosmos/cosmos-sdk: A Framework for Building High Value Public Blockchains](https://github.com/cosmos/cosmos-sdk)
- [What is Tendermint | Tendermint Core](https://docs.tendermint.com/v0.35/introduction/what-is-tendermint.html)
- [Ignite CLI](https://ignite.com/cli)
- [Tutorials](https://docs.ignite.com/guide)
- [Ignite CLI docs](https://docs.ignite.com)
- [Cosmos SDK docs](https://docs.cosmos.network)
- [Developer Chat](https://discord.gg/ignite)
