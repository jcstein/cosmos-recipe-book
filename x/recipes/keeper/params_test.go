package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "recipes/testutil/keeper"
	"recipes/x/recipes/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.RecipesKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
