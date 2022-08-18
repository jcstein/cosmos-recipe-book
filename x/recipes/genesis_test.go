package recipes_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "recipes/testutil/keeper"
	"recipes/testutil/nullify"
	"recipes/x/recipes"
	"recipes/x/recipes/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.RecipesKeeper(t)
	recipes.InitGenesis(ctx, *k, genesisState)
	got := recipes.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
