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