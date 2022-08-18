package keeper

import (
	"encoding/binary"

	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"recipes/x/recipes/types"
)

func (k Keeper) AppendRecipe(ctx sdk.Context, recipe types.Recipe) uint64 {
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
